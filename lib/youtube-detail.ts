import { entertainmentTitles, getFeaturedCast } from "@/lib/entertainment";
import { isApprovedYouTubeMoviePublisher } from "@/lib/youtube-movie-channels";

export type YouTubeDetailSource = {
  videoId: string;
  channelName: string;
  channelUrl?: string;
  publishedAt: string;
  videoUrl: string;
  lastChecked: string;
};

export type YouTubeDetailMovie = {
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
  alternateSources: YouTubeDetailSource[];
};

type GeneratedRecord = Omit<YouTubeDetailMovie, "source" | "internalHref" | "alternateSources">;

type ReviewCandidate = {
  videoId: string;
  rawTitle: string;
  title: string;
  channelName: string;
  channelId?: string;
  channelUrl?: string;
  publishedAt: string;
  durationMinutes: number;
  videoUrl: string;
  reason: string;
  descriptionExcerpt?: string;
};

type DetailShard = {
  generatedAt?: string;
  reviewGeneratedAt?: string;
  movies: GeneratedRecord[];
  reviews: ReviewCandidate[];
};

const shardLoaders: Array<() => Promise<DetailShard>> = [
  async () => (await import("@/lib/youtube-detail-shard-modules/0")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/1")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/2")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/3")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/4")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/5")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/6")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/7")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/8")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/9")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/10")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/11")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/12")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/13")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/14")).default as DetailShard,
  async () => (await import("@/lib/youtube-detail-shard-modules/15")).default as DetailShard,
];

function shardFor(videoId: string) {
  let hash = 2166136261;
  for (let index = 0; index < videoId.length; index++) {
    hash ^= videoId.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) % shardLoaders.length;
}

async function loadDetailShard(videoId: string) {
  return shardLoaders[shardFor(videoId)]();
}

const generatedSynopsisHype = /\b(amazing(?:\s+masterpiece)?|captivating|masterpiece|blockbuster|ultimate|unmissable|must[- ]watch|edge of your seat|will (?:make your day|blow your mind)|don['’]?t miss|do not miss|watch now|subscribe|like and share|filled with|latest nigerian movies?|hottest|trending)\b/i;
const generatedSynopsisSeo = /\b(?:full movie|complete movie|official full movie|latest full movies?|nollywood movies?\s*20\d{2}|nigerian movies?\s*20\d{2})\b/i;
const reviewNonMovieTitle = /\b(trailer|teaser|concert|live\s*stream|livestream|watch\s+party|webinar|episode\s*\d+|\bep\.?\s*\d+|season\s*\d+|interview|reaction|music\s+video|making\s+of)\b/i;
const reviewPromoText = /\b(subscribe|follow\s+us|youtube\s+channel|watch\s+more|like\s*(?:,|and|&)\s*share|don['’]?t\s+forget|do\s+not\s+forget)\b/i;

function videoIdFromUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

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

function normalizeCastName(value: string) {
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

function normalizeCast(values: string[]) {
  return [...new Set(
    values
      .map(normalizeCastName)
      .filter((name) =>
        name.length >= 3 &&
        name.length <= 60 &&
        !/\b(movie|film|latest|official|youtube|channel|subscribe|20\d{2})\b/i.test(name),
      ),
  )];
}

function fallbackSynopsis(movie: Pick<GeneratedRecord, "title" | "channelName" | "cast" | "featuredCast">) {
  const cast = movie.featuredCast.length ? movie.featuredCast : movie.cast;
  return movie.title + " is a full-length Nigerian film published by " + movie.channelName + "." +
    (cast.length ? " Featured cast includes " + cast.slice(0, 3).join(", ") + "." : "");
}

function normalizeSynopsis(movie: GeneratedRecord) {
  let text = String(movie.synopsis ?? "")
    .replace(/\s+/g, " ")
    .replace(/,([A-Za-z])/g, ", $1")
    .replace(/([.!?])([A-Z])/g, "$1 $2")
    .replace(/^[A-Z0-9 '&’():-]{4,}:\s*/, "")
    .trim();

  if (text.search(/\s+is a full-length Nigerian film published by /i) >= 0) return fallbackSynopsis(movie);
  if (
    !text ||
    text.length < 55 ||
    generatedSynopsisHype.test(text) ||
    generatedSynopsisSeo.test(text) ||
    /^\s*(?:it|this title|the phrase)\s+(?:signifies|means|refers to)\b/i.test(text) ||
    /\p{Extended_Pictographic}/u.test(text)
  ) return fallbackSynopsis(movie);

  return text.slice(0, 360).trim();
}

function normalizeGenerated(movie: GeneratedRecord): YouTubeDetailMovie {
  const title = cleanYouTubeDisplayTitle(movie.title || movie.rawTitle) || "Untitled Nigerian movie";
  const cast = normalizeCast(movie.cast ?? []);
  const featuredCast = normalizeCast(movie.featuredCast ?? []).filter((name) => cast.includes(name));
  const normalized: GeneratedRecord = {
    ...movie,
    title,
    cast,
    featuredCast: featuredCast.length ? featuredCast : cast.slice(0, 3),
    metadataStatus: cast.length ? "complete" : "cast-pending",
  };
  return {
    ...normalized,
    synopsis: normalizeSynopsis(normalized),
    source: "youtube-api",
    internalHref: "/entertainment/youtube/" + movie.videoId,
    alternateSources: [],
  };
}

function movieIdentity(value: string) {
  return value
    .toLowerCase()
    .replace(/\b(?:full|latest|official|nigerian|nollywood)\s+(?:movie|movies)\b/g, " ")
    .replace(/\b(?:full movie|nigerian movie|nollywood movie|latest full movie|official movie)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sharedCastCount(a: YouTubeDetailMovie, b: YouTubeDetailMovie) {
  if (!a.cast.length || !b.cast.length) return 0;
  const names = new Set(a.cast.map((name) => name.trim().toLowerCase()));
  return b.cast.filter((name) => names.has(name.trim().toLowerCase())).length;
}

function addAlternateSources(movie: YouTubeDetailMovie, shardMovies: GeneratedRecord[]) {
  const identity = movieIdentity(movie.title);
  if (!identity || !movie.cast.length) return movie;
  const alternateSources: YouTubeDetailSource[] = [];

  for (const raw of shardMovies) {
    if (raw.videoId === movie.videoId || movieIdentity(raw.title || raw.rawTitle) !== identity) continue;
    const other = normalizeGenerated(raw);
    const threshold = Math.min(2, movie.cast.length, other.cast.length);
    if (!threshold || sharedCastCount(movie, other) < threshold) continue;
    alternateSources.push({
      videoId: other.videoId,
      channelName: other.channelName,
      channelUrl: other.channelUrl,
      publishedAt: other.publishedAt,
      videoUrl: other.videoUrl,
      lastChecked: other.lastChecked,
    });
  }

  alternateSources.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return { ...movie, alternateSources };
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
  return cleanYouTubeDisplayTitle(candidate.title) + " is a full-length Nigerian film published by " +
    candidate.channelName + ". The cast listing is still being expanded; watch through the publisher's official YouTube release.";
}

function getCuratedMovie(videoId: string): YouTubeDetailMovie | undefined {
  for (const title of entertainmentTitles) {
    const watch = title.watchLinks.find((link) => link.platform === "YouTube" && link.access === "full-movie");
    if (!watch || videoIdFromUrl(watch.href) !== videoId) continue;
    return {
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
      metadataStatus: "complete",
      source: "curated",
      internalHref: "/entertainment/movies/" + title.slug,
      alternateSources: [],
    };
  }
}

function getReviewMovie(candidate: ReviewCandidate | undefined, reviewGeneratedAt?: string): YouTubeDetailMovie | undefined {
  if (
    !candidate ||
    candidate.reason !== "missing-cast" ||
    Number(candidate.durationMinutes) < 55 ||
    reviewNonMovieTitle.test(candidate.rawTitle ?? candidate.title) ||
    !isApprovedYouTubeMoviePublisher(candidate.channelName)
  ) return undefined;

  return {
    videoId: candidate.videoId,
    title: cleanYouTubeDisplayTitle(candidate.title),
    rawTitle: candidate.rawTitle,
    synopsis: reviewSynopsis(candidate),
    cast: [],
    featuredCast: [],
    channelName: candidate.channelName,
    channelId: candidate.channelId,
    channelUrl: candidate.channelUrl,
    publishedAt: candidate.publishedAt,
    year: Number(candidate.publishedAt.slice(0, 4)),
    durationMinutes: candidate.durationMinutes,
    videoUrl: candidate.videoUrl,
    lastChecked: String(reviewGeneratedAt ?? "").slice(0, 10) || "2026-10-08",
    metadataStatus: "cast-pending",
    source: "youtube-review",
    internalHref: "/entertainment/youtube/" + candidate.videoId,
    alternateSources: [],
  };
}

export function hasSubstantiveYouTubeDetailSynopsis(movie: Pick<YouTubeDetailMovie, "synopsis">) {
  const synopsis = movie.synopsis.trim();
  return synopsis.length >= 110 &&
    !/ is a full-length Nigerian film published by /i.test(synopsis) &&
    !/^(?:watch|stream|subscribe|like and share)\b/i.test(synopsis);
}

export function isIndexableYouTubeDetailMovie(movie: YouTubeDetailMovie) {
  return movie.metadataStatus !== "cast-pending" &&
    movie.cast.length > 0 &&
    movie.featuredCast.length > 0 &&
    hasSubstantiveYouTubeDetailSynopsis(movie);
}

export async function getYouTubeDetailMovieById(videoId: string) {
  const curated = getCuratedMovie(videoId);
  if (curated) return curated;

  const shard = await loadDetailShard(videoId);
  const raw = shard.movies.find((movie) => movie.videoId === videoId);
  if (raw) {
    const normalized = normalizeGenerated(raw);
    if (normalized.metadataStatus !== "cast-pending") return addAlternateSources(normalized, shard.movies);
  }

  return getReviewMovie(
    shard.reviews.find((candidate) => candidate.videoId === videoId),
    shard.reviewGeneratedAt,
  );
}

export async function getRelatedYouTubeDetailMovies(movie: YouTubeDetailMovie, limit = 4) {
  const shard = await loadDetailShard(movie.videoId);
  const best: Array<{ item: YouTubeDetailMovie; score: number }> = [];
  const castKeys = new Set(movie.cast.map((name) => name.trim().toLowerCase()));

  for (const raw of shard.movies) {
    if (raw.videoId === movie.videoId) continue;
    const rawCast = Array.isArray(raw.cast) ? raw.cast : [];
    const shared = rawCast.reduce(
      (count, name) => count + (castKeys.has(String(name).trim().toLowerCase()) ? 1 : 0),
      0,
    );
    const score =
      (raw.channelName === movie.channelName ? 4 : 0) +
      shared * 2 +
      (raw.year === movie.year ? 1 : 0);
    if (score <= 0) continue;

    const item = normalizeGenerated(raw);
    if (!isIndexableYouTubeDetailMovie(item)) continue;
    best.push({ item, score });
    best.sort((a, b) => b.score - a.score || b.item.publishedAt.localeCompare(a.item.publishedAt));
    if (best.length > limit) best.pop();
  }

  return best.map((entry) => entry.item);
}
