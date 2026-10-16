import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";

const source = readFileSync("lib/movie-editorial-source-repairs-2026-10-16.ts", "utf8");
const catalog = readFileSync("lib/entertainment.ts", "utf8");
const registry = readFileSync("lib/movie-editorial-profile-registry.ts", "utf8");

test("the five existing film guides use the source-backed correction layer", () => {
  for (const slug of [
    "oil-and-water-2025", "the-man-i-never-knew",
    "man-of-the-year-2026", "for-richer-for-poorer-2026", "one-more-night",
  ]) assert.ok(source.includes('"' + slug + '": {'), slug);
  assert.match(catalog, /reviewedMovieRecords20261016\[title\.slug\]/);
  assert.match(registry, /movieEditorialProfilesRemainingB,[\s\S]*reviewedMovieDossiers20261016,/);
});

test("documented corrections do not silently reinstate contested facts", () => {
  assert.match(source, /Olubunmi Akingbola/);
  assert.match(source, /pregnancy and parenting details/);
  assert.match(source, /Nollywire lists 101 minutes, while NollyMeter lists 126 minutes/);
  assert.match(source, /Nollywire instead lists 144 minutes/);
  assert.match(source, /2025-02-07/);
  assert.doesNotMatch(
    source.match(/synopsis: "Mila[^\n]*/)?.[0] ?? "",
    /pregnan|child|abandon/i,
  );
});
