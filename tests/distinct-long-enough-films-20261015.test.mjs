import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const catalog = readFileSync("lib/entertainment-growth-wave-6.ts", "utf8");
const page = readFileSync("app/entertainment/movies/[slug]/page.tsx", "utf8");
const source2026 = catalog.split('slug: "long-enough-2026"')[1]?.split('slug: "forever-isnt-long-enough-2025"')[0] ?? "";
const source2025 = catalog.split('slug: "forever-isnt-long-enough-2025"')[1]?.split('slug: "terms-of-attraction-2026"')[0] ?? "";

test("distinct films cannot reuse the 2025 Royal Arts video", () => {
  assert.match(source2026, /year: 2026/);
  assert.match(source2026, /watchLinks: \[\]/);
  assert.doesNotMatch(source2026, /y2RkBwUYSvo/);
  assert.match(source2025, /year: 2025/);
  assert.match(source2025, /Royal Arts TV/);
  assert.match(source2025, /y2RkBwUYSvo/);
});

test("film pages have distinct SEO titles and related-film links", () => {
  assert.match(page, /"long-enough-2026": \{ title:/);
  assert.match(page, /"forever-isnt-long-enough-2025": \{ title:/);
  assert.match(page, /See the separate 2026 Long Enough film/);
});
