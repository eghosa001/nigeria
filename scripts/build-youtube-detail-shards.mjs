import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const generatedPath = path.join(root, "data/youtube-movies.generated.json");
const reviewPath = path.join(root, "data/youtube-movies-review.generated.json");
const outputDir = path.join(root, "data/youtube-detail-shards");
const SHARD_COUNT = 16;

function shardFor(videoId) {
  let hash = 2166136261;
  for (let index = 0; index < videoId.length; index++) {
    hash ^= videoId.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) % SHARD_COUNT;
}

const generated = JSON.parse(fs.readFileSync(generatedPath, "utf8"));
const review = JSON.parse(fs.readFileSync(reviewPath, "utf8"));
const shards = Array.from({ length: SHARD_COUNT }, () => ({ movies: [], reviews: [] }));

for (const movie of generated.movies ?? []) {
  shards[shardFor(String(movie.videoId))].movies.push(movie);
}
for (const candidate of review.candidates ?? []) {
  shards[shardFor(String(candidate.videoId))].reviews.push(candidate);
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

const emittedMovieCount = shards.reduce((total, shard) => total + shard.movies.length, 0);
const emittedReviewCount = shards.reduce((total, shard) => total + shard.reviews.length, 0);
if (emittedMovieCount !== (generated.movies ?? []).length || emittedReviewCount !== (review.candidates ?? []).length) {
  throw new Error("YouTube detail sharding lost catalog records.");
}

for (let index = 0; index < SHARD_COUNT; index++) {
  const payload = {
    generatedAt: generated.generatedAt ?? null,
    reviewGeneratedAt: review.generatedAt ?? null,
    movies: shards[index].movies,
    reviews: shards[index].reviews,
  };
  fs.writeFileSync(path.join(outputDir, index + ".json"), JSON.stringify(payload) + "\n");
}

console.log(
  "YouTube detail shards rebuilt:",
  SHARD_COUNT,
  "shards for",
  (generated.movies ?? []).length,
  "movies and",
  (review.candidates ?? []).length,
  "review candidates.",
);
