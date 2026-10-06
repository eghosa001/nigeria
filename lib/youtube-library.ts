import generatedData from "@/data/youtube-movies.generated.json";
import reviewData from "@/data/youtube-movies-review.generated.json";
import { entertainmentTitles, getFeaturedCast } from "@/lib/entertainment";
import { isApprovedYouTubeMoviePublisher } from "@/lib/youtube-movie-channels";

export type YouTubeMovieSource = {
  videoId: string;
  channelName: string;
  channelUrl?: string;
  publishedAt: string;
  videoUrl: string;
  lastChecked: string;
};

type BaseYouTubeMovieRecord = {
  videoId: string;
  title: string;
  rawTitle: string;
  synopsis: string;
  cast: string[];
  featuredCast: string[];
  channelName: string;
  channelId?: string;
  channelUrl?: string;
  publishedAt: string;
  year: number;
  durationMinutes: number;
  videoUrl: string;
  lastChecked: string;
  viewCount?: number;
  metadataStatus?: "complete" | "cast-pending";
  source: "curated" | "youtube-api" | "youtube-review";
  internalHref: string;
};

export type YouTubeMovieRecord = BaseYouTubeMovieRecord & {
  alternateSources: YouTubeMovieSource[];
};

type GeneratedRecord = Omit<BaseYouTubeMovieRecord, "source" | "internalHref">;

const generatedSynopsisHype = /\b(amazing(?:\s+masterpiece)?|captivating|masterpiece|blockbuster|ultimate|unmissable|must[- ]watch|edge of your seat|will (?:make your day|blow your mind)|don['’]?t miss|do not miss|watch now|subscribe|like and share|filled with|latest nigerian movies?|hottest|trending)\b/i;
const generatedSynopsisSeo = /\b(?:full movie|complete movie|official full movie|latest full movies?|nollywood movies?\s*20\d{2}|nigerian movies?\s*20\d{2})\b/i;

function cleanYouTubeDisplayTitle(value: string) {
  return value
    .replace(/\p{Extended_Pictographic}/gu, " ")
    .replace(/\s*\|\s*(?:nollywood|nigerian|african|latest|full)\b.*$/i, " ")
    .replace(/\s*;\s*[^;]*(?:,|20\d{2}).*$/i, " ")
    .replace(/\s*[-–—/]\s*(?:latest|lastest)\b.*$/i, " ")
    .replace(/\s+(?:latest|lastest)\s+(?:nigerian|nollywood|african)\b.*$/i, " ")
    .replace(/\s*\((?:full|complete)\s+movie\)\s*/gi, " ")
    .replace(/\s*(?:[-–—|/:]\s*)?(?:full|complete)\s+(?:nigerian\s+|nollywood\s+|african\s+)?movie\b.*$/i, " ")
    .replace(/\s+(?:latest\s+)?(?:nigerian|nollywood|african)\s+(?:full\s+)?movies?\b.*$/i, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeGeneratedCastName(value: string) {
  let name = String(value ?? "")
    .replace(/^[a-z]\s*[-–—]\s*/i, "")
    .replace(/\b(?:starring|featuring|feat\.?|ft\.?)\b\s*[:\-]?\s*/gi, "")
    .replace(/([A-Za-z])\.([A-Za-z])/g, "$1. $2")
    .replace(/[#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[,.;:!?\s]+|[,.;:!?\s]+$/g, "");

  if (name.split(/\s+/).length >= 2 && name === name.toUpperCase() && /[A-Z]/.test(name)) {
    name = name
      .toLowerCase()
      .replace(/(^|[\s.'’\-])([a-z])/g, (_, prefix: string, letter: string) => prefix + letter.toUpperCase());
  }

  return name;
}

function normalizeGeneratedCast(values: string[]) {
  return [...new Set(
    values
      .map(normalizeGeneratedCastName)
      .filter((name) =>
        name.length >= 3 &&
        name.length <= 60 &&
        !/\b(movie|film|latest|official|youtube|channel|subscribe|20\d{2})\b/i.test(name),
      ),
  )];
}

function generatedFallbackSynopsis(movie: GeneratedRecord) {
  const cast = movie.featuredCast.length ? movie.featuredCast : movie.cast;
  return movie.title + " is a full-length Nigerian film published by " + movie.channelName + "." +
    (cast.length ? " Featured cast includes " + cast.slice(0, 3).join(", ") + "." : "");
}

function normalizeGeneratedSynopsis(movie: GeneratedRecord) {
  let text = String(movie.synopsis ?? "")
    .replace(/\s+/g, " ")
    .replace(/,([A-Za-z])/g, ", $1")
    .replace(/([.!?])([A-Z])/g, "$1 $2")
    .replace(/^[A-Z0-9 '&’():-]{4,}:\s*/, "")
    .trim();

  const generatedSuffix = text.search(/\s+is a full-length Nigerian film published by /i);
  if (generatedSuffix >= 0) return generatedFallbackSynopsis(movie);

  if (
    !text ||
    text.length < 55 ||
    generatedSynopsisHype.test(text) ||
    generatedSynopsisSeo.test(text) ||
    /^\s*(?:it|this title|the phrase)\s+(?:signifies|means|refers to)\b/i.test(text) ||
    /\p{Extended_Pictographic}/u.test(text)
  ) {
    return generatedFallbackSynopsis(movie);
  }

  return text.slice(0, 360).trim();
}

function videoIdFromUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

function movieIdentity(value: string) {
  return value
    .toLowerCase()
    .replace(/\b(?:full|latest|official|nigerian|nollywood)\s+(?:movie|movies)\b/g, " ")
    .replace(/\b(?:full movie|nigerian movie|nollywood movie|latest full movie|official movie)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sharedCastCount(a: BaseYouTubeMovieRecord, b: BaseYouTubeMovieRecord) {
  if (!a.cast.length || !b.cast.length) return 0;
  const names = new Set(a.cast.map((name) => name.trim().toLowerCase()));
  return b.cast.filter((name) => names.has(name.trim().toLowerCase())).length;
}

function likelySameMovie(a: BaseYouTubeMovieRecord, b: BaseYouTubeMovieRecord) {
  if (movieIdentity(a.title) !== movieIdentity(b.title)) return false;
  const shared = sharedCastCount(a, b);
  const evidenceThreshold = Math.min(2, a.cast.length, b.cast.length);
  return evidenceThreshold > 0 && shared >= evidenceThreshold;
}

function asSource(movie: BaseYouTubeMovieRecord): YouTubeMovieSource {
  return {
    videoId: movie.videoId,
    channelName: movie.channelName,
    channelUrl: movie.channelUrl,
    publishedAt: movie.publishedAt,
    videoUrl: movie.videoUrl,
    lastChecked: movie.lastChecked,
  };
}

const curated: BaseYouTubeMovieRecord[] = entertainmentTitles.flatMap((title) => {
  const watch = title.watchLinks.find((link) => link.platform === "YouTube" && link.access === "full-movie");
  if (!watch) return [];
  const videoId = videoIdFromUrl(watch.href);
  if (!videoId) return [];
  return [{
    videoId,
    title: title.title,
    rawTitle: title.title,
    synopsis: title.synopsis,
    cast: title.cast,
    featuredCast: getFeaturedCast(title),
    channelName: watch.publisher ?? "Official YouTube channel",
    channelUrl: watch.publisherUrl,
    publishedAt: title.year + "-01-01T00:00:00.000Z",
    year: title.year,
    durationMinutes: 0,
    videoUrl: watch.href,
    lastChecked: watch.lastChecked,
    source: "curated" as const,
    internalHref: "/entertainment/movies/" + title.slug,
  }];
});

export const generatedYouTubeMovies = (generatedData.movies as GeneratedRecord[])
  .map((movie) => {
    const title = cleanYouTubeDisplayTitle(movie.title || movie.rawTitle) || "Untitled Nigerian movie";
    const cast = normalizeGeneratedCast(movie.cast ?? []);
    const featuredCast = normalizeGeneratedCast(movie.featuredCast ?? []).filter((name) => cast.includes(name));
    const normalizedMovie = {
      ...movie,
      title,
      cast,
      featuredCast: featuredCast.length ? featuredCast : cast.slice(0, 3),
      metadataStatus: cast.length ? "complete" as const : "cast-pending" as const,
    };
    return {
      ...normalizedMovie,
      synopsis: normalizeGeneratedSynopsis(normalizedMovie),
      source: "youtube-api" as const,
      internalHref: "/entertainment/youtube/" + movie.videoId,
    };
  })
  .filter((movie) => movie.metadataStatus !== "cast-pending" && movie.cast.length > 0 && movie.featuredCast.length > 0);

type ReviewCandidate = {
  videoId: string;
  rawTitle: string;
  title: string;
  channelName: string;
  channelUrl?: string;
  publishedAt: string;
  durationMinutes: number;
  videoUrl: string;
  reason: string;
  descriptionExcerpt?: string;
};

const reviewGeneratedAt = String(reviewData.generatedAt ?? "").slice(0, 10) || new Date().toISOString().slice(0, 10);
const reviewNonMovieTitle = /\b(trailer|teaser|concert|live\s*stream|livestream|watch\s+party|webinar|episode\s*\d+|\bep\.?\s*\d+|season\s*\d+|interview|reaction|music\s+video|making\s+of)\b/i;
const reviewPromoText = /\b(subscribe|follow\s+us|youtube\s+channel|watch\s+more|like\s*(?:,|and|&)\s*share|don['’]?t\s+forget|do\s+not\s+forget)\b/i;

function cleanReviewTitle(value: string) {
  return cleanYouTubeDisplayTitle(value);
}

function reviewSynopsis(candidate: ReviewCandidate) {
  const text = String(candidate.descriptionExcerpt ?? "").replace(/\s+/g, " ").trim();
  const firstUseful = text
    .split(/(?<=[.!?])\s+/)
    .find((sentence) =>
      sentence.length >= 70 &&
      !reviewPromoText.test(sentence) &&
      !generatedSynopsisHype.test(sentence) &&
      !generatedSynopsisSeo.test(sentence),
    );
  if (firstUseful) return firstUseful.slice(0, 360);
  return cleanReviewTitle(candidate.title) + " is a full-length Nigerian film published by " + candidate.channelName +
    ". The cast listing is still being expanded; watch through the publisher's official YouTube release.";
}

const reviewYouTubeMovies: BaseYouTubeMovieRecord[] = ((reviewData.candidates ?? []) as ReviewCandidate[])
  .filter((candidate) =>
    candidate.reason === "missing-cast" &&
    Number(candidate.durationMinutes) >= 55 &&
    !reviewNonMovieTitle.test(candidate.rawTitle ?? candidate.title) &&
    isApprovedYouTubeMoviePublisher(candidate.channelName),
  )
  .map((candidate) => ({
    videoId: candidate.videoId,
    title: cleanReviewTitle(candidate.title),
    rawTitle: candidate.rawTitle,
    synopsis: reviewSynopsis(candidate),
    cast: [],
    featuredCast: [],
    channelName: candidate.channelName,
    channelUrl: candidate.channelUrl,
    publishedAt: candidate.publishedAt,
    year: Number(candidate.publishedAt.slice(0, 4)),
    durationMinutes: candidate.durationMinutes,
    videoUrl: candidate.videoUrl,
    lastChecked: reviewGeneratedAt,
    viewCount: 0,
    metadataStatus: "cast-pending",
    source: "youtube-review" as const,
    internalHref: "/entertainment/youtube/" + candidate.videoId,
  }));

const byVideoIdBase = new Map<string, BaseYouTubeMovieRecord>();
for (const movie of generatedYouTubeMovies) byVideoIdBase.set(movie.videoId, movie);
for (const movie of curated) {
  const discovered = byVideoIdBase.get(movie.videoId);
  byVideoIdBase.set(movie.videoId, discovered ? {
    ...discovered,
    ...movie,
    channelName: movie.channelName === "Official YouTube channel" ? discovered.channelName : movie.channelName,
    channelId: movie.channelId ?? discovered.channelId,
    channelUrl: movie.channelUrl ?? discovered.channelUrl,
    publishedAt: discovered.publishedAt || movie.publishedAt,
    durationMinutes: discovered.durationMinutes || movie.durationMinutes,
    rawTitle: discovered.rawTitle || movie.rawTitle,
  } : movie);
}

const baseMovies = [...byVideoIdBase.values()];
const identityGroups = new Map<string, BaseYouTubeMovieRecord[]>();
for (const movie of baseMovies) {
  const key = movieIdentity(movie.title);
  if (!key) continue;
  const group = identityGroups.get(key) ?? [];
  group.push(movie);
  identityGroups.set(key, group);
}

export const youtubeMovieLibrary: YouTubeMovieRecord[] = baseMovies
  .map((movie) => ({
    ...movie,
    alternateSources: (identityGroups.get(movieIdentity(movie.title)) ?? [])
      .filter((other) => other.videoId !== movie.videoId && likelySameMovie(movie, other))
      .map(asSource)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
  }))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));

const reviewByVideoId = new Map<string, YouTubeMovieRecord>(
  reviewYouTubeMovies.map((movie) => [movie.videoId, { ...movie, alternateSources: [] }]),
);

const byVideoId = new Map<string, YouTubeMovieRecord>(
  youtubeMovieLibrary.map((movie) => [movie.videoId, movie]),
);
for (const [videoId, movie] of reviewByVideoId) {
  if (!byVideoId.has(videoId)) byVideoId.set(videoId, movie);
}

function trendScore(movie: YouTubeMovieRecord) {
  const published = Date.parse(movie.publishedAt);
  const ageDays = Number.isFinite(published) ? Math.max(0, (Date.now() - published) / 86_400_000) : 3650;
  const recency = Math.max(0, 120 - Math.min(ageDays, 120)) / 120;
  const popularity = Math.log10(Math.max(0, Number(movie.viewCount ?? 0)) + 1) / 8;
  return recency * 0.72 + Math.min(1, popularity) * 0.28;
}

export function isIndexableYouTubeMovie(movie: YouTubeMovieRecord) {
  return movie.metadataStatus !== "cast-pending" && movie.cast.length > 0 && movie.featuredCast.length > 0;
}

export const indexableYouTubeMovies = youtubeMovieLibrary.filter(isIndexableYouTubeMovie);

export const latestYouTubeMovies = indexableYouTubeMovies;
export const trendingYouTubeMovies = [...indexableYouTubeMovies].sort(
  (a, b) => trendScore(b) - trendScore(a) || b.publishedAt.localeCompare(a.publishedAt),
);

export const youtubeLibraryGeneratedAt = generatedData.generatedAt as string | null;
export const youtubePendingQualityCount = generatedData.pendingQualityCount ?? 0;
export const youtubeReviewVisibleCount = 0;

export function getYouTubeMovieById(videoId: string) {
  return byVideoId.get(videoId);
}

export function getYouTubeVideoId(url: string) {
  return videoIdFromUrl(url);
}
