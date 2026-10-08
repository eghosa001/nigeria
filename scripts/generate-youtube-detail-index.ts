import fs from "node:fs";
import path from "node:path";
import reviewData from "../data/youtube-movies-review.generated.json";
import {
  getYouTubeMovieById,
  isIndexableYouTubeMovie,
  youtubeMovieLibrary,
} from "../lib/youtube-library";

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

const ids = new Set<string>(youtubeMovieLibrary.map((movie) => movie.videoId));
for (const candidate of reviewData.candidates ?? []) {
  if (candidate?.videoId) ids.add(String(candidate.videoId));
}

const indexableMovies = youtubeMovieLibrary.filter(isIndexableYouTubeMovie);
const byChannel = new Map<string, string[]>();
const byYear = new Map<number, string[]>();
const byCast = new Map<string, string[]>();

for (const movie of indexableMovies) {
  const push = <K,>(map: Map<K, string[]>, key: K) => {
    const list = map.get(key) ?? [];
    list.push(movie.videoId);
    map.set(key, list);
  };
  push(byChannel, movie.channelName);
  push(byYear, movie.year);
  for (const name of movie.cast) push(byCast, name.trim().toLowerCase());
}

const relatedById = new Map<string, string[]>();
for (const movie of indexableMovies) {
  const candidates = new Set<string>([
    ...(byChannel.get(movie.channelName) ?? []),
    ...(byYear.get(movie.year) ?? []),
    ...movie.cast.flatMap((name) => byCast.get(name.trim().toLowerCase()) ?? []),
  ]);
  candidates.delete(movie.videoId);

  const related = [...candidates]
    .map((videoId) => {
      const item = getYouTubeMovieById(videoId);
      if (!item || !isIndexableYouTubeMovie(item)) return null;
      const movieCast = new Set(movie.cast.map((name) => name.trim().toLowerCase()));
      const sharedCast = item.cast.filter((name) => movieCast.has(name.trim().toLowerCase())).length;
      const score =
        (item.channelName === movie.channelName ? 4 : 0) +
        sharedCast * 2 +
        (item.year === movie.year ? 1 : 0);
      return score > 0 ? { videoId, score, publishedAt: item.publishedAt } : null;
    })
    .filter((entry): entry is { videoId: string; score: number; publishedAt: string } => Boolean(entry))
    .sort((a, b) => b.score - a.score || b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 4)
    .map((entry) => entry.videoId);

  relatedById.set(movie.videoId, related);
}

const records: Record<string, CompactRecord> = {};
let indexableCount = 0;

for (const videoId of ids) {
  const movie = getYouTubeMovieById(videoId);
  if (!movie) continue;

  const indexable = isIndexableYouTubeMovie(movie);
  if (indexable) indexableCount++;

  records[videoId] = [
    indexable ? 1 : 0,
    movie.title,
    movie.synopsis,
    movie.cast,
    movie.featuredCast,
    movie.channelName,
    movie.channelUrl ?? null,
    movie.publishedAt,
    movie.year,
    movie.durationMinutes,
    movie.lastChecked,
    movie.source,
    movie.internalHref,
    movie.alternateSources.map((source) => [
      source.videoId,
      source.channelName,
      source.channelUrl ?? null,
      source.publishedAt,
      source.lastChecked,
    ]),
    relatedById.get(videoId) ?? [],
  ];
}

const output = JSON.stringify({ version: 1, records });
const outputPath = path.join(process.cwd(), "data/youtube-detail-index.generated.json");
fs.writeFileSync(outputPath, output + "\n");

console.log(
  "Generated compact YouTube detail index:",
  Object.keys(records).length,
  "records,",
  indexableCount,
  "indexable,",
  Buffer.byteLength(output),
  "bytes.",
);
