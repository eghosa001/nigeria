import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";

const source = readFileSync("lib/movie-editorial-source-repairs-2026-10-16.ts", "utf8");
const catalog = readFileSync("lib/entertainment.ts", "utf8");
const registry = readFileSync("lib/movie-editorial-profile-registry.ts", "utf8");

test("the eight existing film guides use the source-backed correction layer", () => {
  for (const slug of [
    "oil-and-water-2025", "for-richer-for-poorer-2026",
    "one-more-night", "a-place-with-you", "where-love-lives",
    "monica", "fruit-covenant", "sister-agatha",
  ]) assert.ok(source.includes('"' + slug + '": {'), slug);
  assert.match(catalog, /reviewedMovieRecords20261016\[title\.slug\]/);
  assert.match(registry, /movieEditorialProfilesRemainingB,[\s\S]*reviewedMovieDossiers20261016,/);
});

test("documented corrections do not silently reinstate contested facts", () => {
  assert.match(source, /Olubunmi Akingbola/);
  assert.match(source, /discrepancy/);
  assert.match(source, /Uche Montana plays Monica/);
  assert.match(source, /Chidiomimi/);
  assert.match(source, /Nollywire instead lists 144 minutes/);
  assert.match(source, /2025-02-07/);
  assert.match(source, /sourceQuestion\("Who plays Adun and Adekunle/);
});
