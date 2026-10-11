import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { packRuntimeCatalog, unpackRuntimeCatalog } from "../scripts/build-youtube-runtime-catalog.mjs";

const fromData = (name) => JSON.parse(readFileSync(new URL("../data/" + name, import.meta.url), "utf8"));

test("packed runtime input is current, lossless and smaller than both raw sources", () => {
  const generated = fromData("youtube-movies.generated.json");
  const review = fromData("youtube-movies-review.generated.json");
  const packed = fromData("youtube-runtime-catalog.generated.json");
  const rebuilt = packRuntimeCatalog(generated, review);

  assert.deepEqual(packed, rebuilt, "Packed runtime catalog is stale; rebuild after YouTube sync.");
  assert.equal(packed.sourceMovieCount, generated.movies.length);
  assert.equal(packed.sourceReviewCount, review.candidates.length);
  const decoded = unpackRuntimeCatalog(packed);
  assert.deepEqual(decoded.generated.movies, generated.movies, "Raw movie fields changed after packing.");

  const expectedReview = review.candidates
    .filter((candidate) => candidate.reason === "missing-cast" && Number(candidate.durationMinutes) >= 55);
  assert.equal(decoded.review.candidates.length, expectedReview.length);
  for (let index = 0; index < expectedReview.length; index++) {
    const source = expectedReview[index];
    const decodedRow = decoded.review.candidates[index];
    for (const key of ["videoId", "rawTitle", "title", "channelName", "channelUrl",
      "publishedAt", "durationMinutes", "reason", "descriptionExcerpt", "videoUrl"]) {
      assert.equal(decodedRow[key], source[key], source.videoId + ": " + key);
    }
  }

  const rawSize = Buffer.byteLength(JSON.stringify(generated) + JSON.stringify(review));
  const packedSize = Buffer.byteLength(JSON.stringify(packed));
  assert.ok(packedSize < rawSize * 0.65,
    "Packed directory must save at least 35% of source JSON bytes.");
});

test("packing supports changed featured cast, publisher details and nonstandard URLs", () => {
  const source = {
    generatedAt: "2026-10-11", pendingQualityCount: 0,
    movies: [{
      videoId: "sample1", title: "Film", rawTitle: "FILM",
      synopsis: "Story", cast: ["A", "B", "C", "D"], featuredCast: ["C", "A"],
      channelName: "Channel", publishedAt: "2026-10-01", year: 2026,
      durationMinutes: 95, videoUrl: "https://youtu.be/sample1", lastChecked: "2026-10-11",
      metadataStatus: "complete",
    }],
  };
  const review = { generatedAt: "2026-10-11", candidates: [] };
  const decoded = unpackRuntimeCatalog(packRuntimeCatalog(source, review));
  assert.deepEqual(decoded.generated.movies, source.movies);
});
