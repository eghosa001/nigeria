/**
 * Bounded, read-only CPU comparison for the YouTube directory.
 * It is not a Worker cold-start, client bundle, SEO or Web Vitals benchmark.
 */
import { performance } from "node:perf_hooks";
import assert from "node:assert/strict";
import { discoverableYouTubeMovies } from "@/lib/youtube-library";
import { queryYouTubeDirectory, youtubePublisherOptions } from "@/lib/youtube-directory-query";
import { YOUTUBE_CATALOG_PAGE_SIZE } from "@/lib/youtube-config";

type Query = { q?: string; channel?: string; page?: number };
const queries: Query[] = [
  {}, { page: 2 }, { channel: youtubePublisherOptions[0] },
  { q: "love" }, { q: "movie" }, { q: "maurice", page: 2 },
  { q: "love", channel: youtubePublisherOptions[1] },
];
const iterations = 30;

function legacy(input: Query) {
  const q = (input.q ?? "").trim().toLowerCase();
  const channel = (input.channel ?? "").trim();
  const filtered = discoverableYouTubeMovies.filter((movie) => {
    const searchable = [movie.title, movie.synopsis, ...movie.cast, movie.channelName].join(" ").toLowerCase();
    return (!q || searchable.includes(q)) && (!channel || movie.channelName === channel);
  }).sort((a, b) => {
    if (!q) return b.publishedAt.localeCompare(a.publishedAt);
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    const rank = (title: string) => title === q ? 3 : title.startsWith(q) ? 2 : title.includes(q) ? 1 : 0;
    return rank(titleB) - rank(titleA) || b.publishedAt.localeCompare(a.publishedAt);
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / YOUTUBE_CATALOG_PAGE_SIZE));
  const page = Math.min(Math.max(1, input.page ?? 1), pageCount);
  return filtered.slice((page - 1) * YOUTUBE_CATALOG_PAGE_SIZE, page * YOUTUBE_CATALOG_PAGE_SIZE);
}

function oldWork() {
  let checksum = 0;
  for (let i = 0; i < iterations; i++)
    for (const input of queries) checksum += legacy(input).length;
  return checksum;
}

function newWork() {
  let checksum = 0;
  for (let i = 0; i < iterations; i++)
    for (const input of queries) checksum += queryYouTubeDirectory(input).movies.length;
  return checksum;
}
assert.equal(newWork(), oldWork());

function medianMs(fn: () => number) {
  fn();
  const samples: number[] = [];
  for (let j = 0; j < 5; j++) {
    const start = performance.now();
    fn();
    samples.push(performance.now() - start);
  }
  return samples.sort((a, b) => a - b)[2];
}

const baseline = medianMs(oldWork);
const optimized = medianMs(newWork);
console.log(JSON.stringify({
  kind: "warm-node-youtube-directory-cpu-only",
  node: process.version,
  discoverableMovieRecords: discoverableYouTubeMovies.length,
  casesPerIteration: queries.length,
  iterations,
  oldMedianMs: Number(baseline.toFixed(3)),
  newMedianMs: Number(optimized.toFixed(3)),
  relativeSpeedup: Number((baseline / optimized).toFixed(2)),
  limitation: "Server-side catalog filtering/pagination CPU only; does not include module import cost or actual browser/Worker latency.",
}, null, 2));
