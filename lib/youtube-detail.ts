import detailIndex from "@/data/youtube-detail-index.generated.json";

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
  synopsis: string;
  cast: string[];
  featuredCast: string[];
  channelName: string;
  channelUrl?: string;
  publishedAt: string;
  year: number;
  durationMinutes: number;
  videoUrl: string;
  lastChecked: string;
  source: "curated" | "youtube-api" | "youtube-review";
  internalHref: string;
  alternateSources: YouTubeDetailSource[];
  indexable: boolean;
  relatedIds: string[];
};

type CompactAlternate = [
  videoId: string,
  channelName: string,
  channelUrl: string | null,
  publishedAt: string,
  lastChecked: string,
];

type CompactRecord = [
  indexable: 0 | 1,
  title: string,
  synopsis: string,
  cast: string[],
  featuredCast: string[],
  channelName: string,
  channelUrl: string | null,
  publishedAt: string,
  year: number,
  durationMinutes: number,
  lastChecked: string,
  source: "curated" | "youtube-api" | "youtube-review",
  internalHref: string,
  alternateSources: CompactAlternate[],
  relatedIds: string[],
];

type CompactIndex = {
  version: number;
  records: Record<string, CompactRecord>;
};

const records = (detailIndex as unknown as CompactIndex).records;

function hydrate(videoId: string, row: CompactRecord): YouTubeDetailMovie {
  return {
    videoId,
    indexable: row[0] === 1,
    title: row[1],
    synopsis: row[2],
    cast: row[3],
    featuredCast: row[4],
    channelName: row[5],
    channelUrl: row[6] ?? undefined,
    publishedAt: row[7],
    year: row[8],
    durationMinutes: row[9],
    videoUrl: "https://www.youtube.com/watch?v=" + videoId,
    lastChecked: row[10],
    source: row[11],
    internalHref: row[12],
    alternateSources: row[13].map((source) => ({
      videoId: source[0],
      channelName: source[1],
      channelUrl: source[2] ?? undefined,
      publishedAt: source[3],
      videoUrl: "https://www.youtube.com/watch?v=" + source[0],
      lastChecked: source[4],
    })),
    relatedIds: row[14],
  };
}

export function getYouTubeDetailMovieById(videoId: string) {
  const row = records[videoId];
  return row ? hydrate(videoId, row) : undefined;
}

export function isIndexableYouTubeDetailMovie(movie: YouTubeDetailMovie) {
  return movie.indexable;
}

export function getRelatedYouTubeDetailMovies(movie: YouTubeDetailMovie, limit = 4) {
  return movie.relatedIds
    .slice(0, limit)
    .map((videoId) => {
      const row = records[videoId];
      return row ? hydrate(videoId, row) : undefined;
    })
    .filter((item): item is YouTubeDetailMovie => Boolean(item));
}
