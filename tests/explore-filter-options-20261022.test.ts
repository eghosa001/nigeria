import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { exploreGuides } from "../lib/explore";
import { publicExplorePlaceDirectory } from "../lib/explore-directory-payload";
import { getFilterableExploreGuides } from "../lib/explore-directory-guide-options";

const read = (file: string) => readFileSync(new URL("../" + file, import.meta.url), "utf8");

test("Tour Nigeria place filter includes only actual guide destinations without changing choices", () => {
  const before = exploreGuides.map(({ slug, shortTitle, kind }) => ({ slug, shortTitle, kind }));
  const active = new Set(publicExplorePlaceDirectory.map(({ guideSlug }) => guideSlug));
  const after = getFilterableExploreGuides(exploreGuides, publicExplorePlaceDirectory);
  assert.deepEqual(after, before.filter(({ slug }) => active.has(slug)),
    "filter must keep exactly the original matching choices and original order");
  assert.ok(after.length < before.length, "do not hydrate guides with no places in the directory");
  const originalBytes = Buffer.byteLength(JSON.stringify(before));
  const compactBytes = Buffer.byteLength(JSON.stringify(after));
  assert.ok(compactBytes < originalBytes);
  console.info("[explore-filter-options]", before.length, "options /", originalBytes,
    "bytes before; ", after.length, "options /", compactBytes, "bytes after;",
    ((1 - compactBytes / originalBytes) * 100).toFixed(1) + "% fewer bytes");
});

test("Tour Nigeria preserves every guide link and public directory feature", () => {
  const page = read("app/explore/page.tsx");
  const component = read("components/explore-place-directory.tsx");
  assert.ok(page.includes("getFilterableExploreGuides(exploreGuides, publicExplorePlaceDirectory)"));
  assert.ok(page.includes("guides={filterableGuides}"));
  assert.ok(page.includes("cities.map((guide) =>"));
  assert.ok(page.includes("destinations.map((guide) =>"));
  assert.ok(page.includes("itineraries.map((guide) =>"));
  assert.ok(page.includes("totalCount={publicExplorePlaceDirectory.length}"));
  assert.ok(component.includes('fetch("/api/explore/places"'));
  assert.ok(component.includes("guideNames.get(place.guideSlug)"));
});
