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
];

const ids = new Set<string>(youtubeMovieLibrary.map((movie) => movie.videoId));
for (const candidate of reviewData.candidates ?? []) {
  if (candidate?.videoId) ids.add(String(candidate.videoId));
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
