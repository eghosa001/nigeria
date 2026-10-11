/**
 * Build the small, read-only listing index imported by Worker routes.
 *
 * The authoritative YouTube API responses and sharded detail records stay in
 * data/ unchanged. This lossless packing only removes repeated JSON keys,
 * repeated publisher details and reconstructible values from the hot import.
 *
 * Run after syncing the source files:
 *   node scripts/build-youtube-runtime-catalog.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "data/youtube-runtime-catalog.generated.json");
const sourcePath = path.join(root, "data/youtube-movies.generated.json");
const reviewPath = path.join(root, "data/youtube-movies-review.generated.json");

export function packRuntimeCatalog(generated, review) {
  if (!Array.isArray(generated.movies) || !Array.isArray(review.candidates)) {
    throw new Error("Malformed YouTube source data: missing movies or candidates.");
  }

  const channels = [];
  const channelIds = new Map();
  const checkDates = [];
  const dateIds = new Map();
  const channelId = (movie) => {
    const channel = [movie.channelName, movie.channelId ?? null, movie.channelUrl ?? null];
    const key = JSON.stringify(channel);
    if (!channelIds.has(key)) {
      channelIds.set(key, channels.length);
      channels.push(channel);
    }
    return channelIds.get(key);
  };
  const dateId = (lastChecked) => {
    if (!dateIds.has(lastChecked)) {
      dateIds.set(lastChecked, checkDates.length);
      checkDates.push(lastChecked);
    }
    return dateIds.get(lastChecked);
  };
  const urlOverride = (item) => {
    const canonical = "https://www.youtube.com/watch?v=" + item.videoId;
    return item.videoUrl === canonical ? null : item.videoUrl;
  };

  const movies = generated.movies.map((movie) => {
    if (!movie.videoId || !Array.isArray(movie.cast) || !Array.isArray(movie.featuredCast)) {
      throw new Error("Invalid YouTube movie input: " + String(movie.videoId));
    }
    const featuredIsCastPrefix = JSON.stringify(movie.cast.slice(0, 3)) === JSON.stringify(movie.featuredCast);
    const status = movie.metadataStatus === undefined ? 0
      : movie.metadataStatus === "complete" ? 1
      : movie.metadataStatus === "cast-pending" ? 2 : null;
    if (status === null) throw new Error("Unknown YouTube cast status: " + movie.metadataStatus);
    return [
      movie.videoId, movie.title, movie.rawTitle === movie.title ? null : movie.rawTitle,
      movie.synopsis, movie.cast, channelId(movie), movie.publishedAt,
      movie.year, movie.durationMinutes, movie.viewCount ?? null, status,
      dateId(movie.lastChecked), featuredIsCastPrefix ? null : movie.featuredCast,
      urlOverride(movie),
    ];
  });

  // The source review file may contain very long descriptions. Keep only
  // candidates the original library could ever accept; preserve raw snippets
  // for unchanged published fallback synopsis selection.
  const reviews = review.candidates
    .filter((candidate) => candidate.reason === "missing-cast" && Number(candidate.durationMinutes) >= 55)
    .map((candidate) => [
      candidate.videoId, candidate.rawTitle, candidate.title, candidate.channelName,
      candidate.channelUrl ?? null, candidate.publishedAt, candidate.durationMinutes,
      candidate.reason, candidate.descriptionExcerpt ?? null, urlOverride(candidate),
    ]);

  return {
    version: 1,
    generatedAt: generated.generatedAt ?? null,
    pendingQualityCount: generated.pendingQualityCount ?? 0,
    reviewGeneratedAt: review.generatedAt ?? null,
    sourceMovieCount: generated.movies.length,
    sourceReviewCount: review.candidates.length,
    channels,
    checkDates,
    movies,
    reviews,
  };
}

export function unpackRuntimeCatalog(packed) {
  if (packed.version !== 1 || !Array.isArray(packed.movies) ||
      !Array.isArray(packed.reviews) || !Array.isArray(packed.channels) ||
      !Array.isArray(packed.checkDates)) {
    throw new Error("Unsupported YouTube runtime catalog format.");
  }
  const canonicalUrl = (id) => "https://www.youtube.com/watch?v=" + id;
  const movies = packed.movies.map((row) => {
    const [videoId, title, rawTitle, synopsis, cast, channelIndex, publishedAt,
      year, durationMinutes, viewCount, status, checkedIndex, featuredOverride, videoUrlOverride] = row;
    const channel = packed.channels[channelIndex];
    if (!channel || !Array.isArray(cast) || !packed.checkDates[checkedIndex]) {
      throw new Error("Broken YouTube runtime catalog movie row: " + videoId);
    }
    const record = {
      videoId, title, rawTitle: rawTitle ?? title, synopsis, cast,
      featuredCast: featuredOverride ?? cast.slice(0, 3),
      channelName: channel[0],
      ...(channel[1] == null ? {} : { channelId: channel[1] }),
      ...(channel[2] == null ? {} : { channelUrl: channel[2] }),
      publishedAt, year, durationMinutes,
      ...(viewCount == null ? {} : { viewCount }),
      ...(status === 0 ? {} : { metadataStatus: status === 1 ? "complete" : "cast-pending" }),
      videoUrl: videoUrlOverride ?? canonicalUrl(videoId),
      lastChecked: packed.checkDates[checkedIndex],
    };
    return record;
  });
  const candidates = packed.reviews.map((row) => {
    const [videoId, rawTitle, title, channelName, channelUrl, publishedAt,
      durationMinutes, reason, descriptionExcerpt, videoUrlOverride] = row;
    return {
      videoId, rawTitle, title, channelName,
      ...(channelUrl == null ? {} : { channelUrl }),
      publishedAt, durationMinutes, reason,
      ...(descriptionExcerpt == null ? {} : { descriptionExcerpt }),
      videoUrl: videoUrlOverride ?? canonicalUrl(videoId),
    };
  });
  return {
    generated: {
      generatedAt: packed.generatedAt,
      pendingQualityCount: packed.pendingQualityCount,
      movies,
    },
    review: { generatedAt: packed.reviewGeneratedAt, candidates },
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const generated = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  const review = JSON.parse(fs.readFileSync(reviewPath, "utf8"));
  const packed = packRuntimeCatalog(generated, review);
  // Verify that compression is lossless for every movie, not merely a sample.
  const decoded = unpackRuntimeCatalog(packed);
  for (let i = 0; i < generated.movies.length; i++) {
    if (JSON.stringify(decoded.generated.movies[i]) !== JSON.stringify(generated.movies[i])) {
      // Optional field ordering is not significant; compare structured records below.
      const a = decoded.generated.movies[i], b = generated.movies[i];
      if (JSON.stringify(Object.entries(a).sort()) !== JSON.stringify(Object.entries(b).sort())) {
        throw new Error("Packed YouTube record does not round-trip: " + generated.movies[i].videoId);
      }
    }
  }
  fs.writeFileSync(output, JSON.stringify(packed) + "\n");
  const beforeBytes = fs.statSync(sourcePath).size + fs.statSync(reviewPath).size;
  const afterBytes = fs.statSync(output).size;
  console.log(JSON.stringify({
    sourceBytes: beforeBytes, runtimeBytes: afterBytes,
    sourceMovieCount: packed.sourceMovieCount,
    sourceReviewCount: packed.sourceReviewCount,
    runtimeReviewCount: packed.reviews.length,
    savedPercent: Math.round(100 * (1 - afterBytes / beforeBytes)),
  }));
}
