import generatedData from "@/data/youtube-movies.generated.json";
import { entertainmentTitles, getFeaturedCast } from "@/lib/entertainment";

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
  source: "curated" | "youtube-api";
  internalHref: string;
};

export type YouTubeMovieRecord = BaseYouTubeMovieRecord & {
  alternateSources: YouTubeMovieSource[];
};

type GeneratedRecord = Omit<BaseYouTubeMovieRecord, "source" | "internalHref">;

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

function castOverlap(a: BaseYouTubeMovieRecord, b: BaseYouTubeMovieRecord) {
  if (!a.cast.length || !b.cast.length) return false;
  const names = new Set(a.cast.map((name) => name.trim().toLowerCase()));
  return b.cast.some((name) => names.has(name.trim().toLowerCase()));
}

function likelySameMovie(a: BaseYouTubeMovieRecord, b: BaseYouTubeMovieRecord) {
  if (movieIdentity(a.title) !== movieIdentity(b.title)) return false;
  return a.year === b.year || castOverlap(a, b);
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

export const generatedYouTubeMovies = (generatedData.movies as GeneratedRecord[]).map((movie) => ({
  ...movie,
  source: "youtube-api" as const,
  internalHref: "/entertainment/youtube/" + movie.videoId,
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

const byVideoId = new Map<string, YouTubeMovieRecord>(
  youtubeMovieLibrary.map((movie) => [movie.videoId, movie]),
);

export const youtubeLibraryGeneratedAt = generatedData.generatedAt as string | null;
export const youtubePendingQualityCount = generatedData.pendingQualityCount ?? 0;

export function getYouTubeMovieById(videoId: string) {
  return byVideoId.get(videoId);
}

export function getYouTubeVideoId(url: string) {
  return videoIdFromUrl(url);
}
