import generatedData from "@/data/youtube-movies.generated.json";
import { entertainmentTitles, getFeaturedCast } from "@/lib/entertainment";

export type YouTubeMovieRecord = {
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

type GeneratedRecord = Omit<YouTubeMovieRecord, "source" | "internalHref">;

function videoIdFromUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

const curated: YouTubeMovieRecord[] = entertainmentTitles.flatMap((title) => {
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

const byVideoId = new Map<string, YouTubeMovieRecord>();
for (const movie of [...generatedYouTubeMovies, ...curated]) {
  byVideoId.set(movie.videoId, movie);
}

export const youtubeMovieLibrary = [...byVideoId.values()].sort(
  (a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title),
);

export const youtubeLibraryGeneratedAt = generatedData.generatedAt as string | null;
export const youtubePendingQualityCount = generatedData.pendingQualityCount ?? 0;

export function getYouTubeMovieById(videoId: string) {
  return byVideoId.get(videoId);
}
