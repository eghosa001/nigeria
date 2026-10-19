import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const detail = readFileSync(new URL("../app/entertainment/youtube/[videoId]/page.tsx", import.meta.url), "utf8");
const film = readFileSync(new URL("../app/entertainment/movies/[slug]/page.tsx", import.meta.url), "utf8");
const series = readFileSync(new URL("../app/entertainment/series/[slug]/page.tsx", import.meta.url), "utf8");

test("official full-video pages answer watch intent separately from cast profile pages", () => {
  assert.match(detail, /"y2RkBwUYSvo": \{ title: "Watch Forever Isn't Long Enough — Royal Arts TV"/);
  assert.match(detail, /"X3HaWmJoSRU": \{ title: "Watch Once Upon a Village 3 — RuthKadiri247"/);
  assert.match(detail, /\? `Watch \$\{movie\.title\} — Official Full Movie \(\$\{movie\.year\}\)`/);
  assert.match(film, /"forever-isnt-long-enough-2025": \{ title: "Forever Isn/);
  assert.match(series, /const castLead = item\.cast\.slice\(0, 3\)/);
});

test("video indexing and originals remain guarded by verification, canonical and rights logic", () => {
  assert.match(detail, /isIndexableYouTubeDetailMovie\(movie\)/);
  assert.match(detail, /robots: indexable && !aliasToCuratedMovie \? undefined : \{ index: false, follow: true \}/);
  assert.match(detail, /alternates: \{ canonical \}/);
  assert.match(detail, /hasValidVideoPublishDate\(movie\.publishedAt\)/);
});
