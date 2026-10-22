import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { exploreGuides } from "../lib/explore";
import { publicExplorePlaceDirectory } from "../lib/explore-directory-payload";
import { getFilterableExploreGuides } from "../lib/explore-directory-guide-options";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("compact Tour guide selectors preserve every filterable guide, order and visible label", () => {
  const all = exploreGuides.map((guide) => [guide.slug, guide.shortTitle, guide.kind] as const);
  const filtered = getFilterableExploreGuides(all, publicExplorePlaceDirectory);
  const active = new Set(publicExplorePlaceDirectory.map((place) => place.guideSlug));
  assert.deepEqual(filtered, all.filter(([slug]) => active.has(slug)));
  assert.ok(filtered.length < all.length, "guides without public places must not clutter the dropdown");
  const fullObjects = exploreGuides.map(({ slug, shortTitle, kind }) => ({ slug, shortTitle, kind }));
  const compactObjects = filtered.map(([slug, shortTitle, kind]) => ({ slug, shortTitle, kind }));
  assert.deepEqual(compactObjects, fullObjects.filter(({ slug }) => active.has(slug)));
  const originalBytes = Buffer.byteLength(JSON.stringify(fullObjects));
  const compactBytes = Buffer.byteLength(JSON.stringify(filtered));
  assert.ok(compactBytes < originalBytes, "only compact, useful options should reach client");
  console.info("[explore-guide-options]", all.length, "full guide options /",
    originalBytes, "bytes original vs", filtered.length, "actual choices /",
    compactBytes, "bytes compact; reduction",
    ((1 - compactBytes / originalBytes) * 100).toFixed(1) + "%");
});

test("Tour directory keeps destination search and detail lookup using compact selector tuples", () => {
  const page = read("app/explore/page.tsx");
  const component = read("components/explore-place-directory.tsx");
  assert.ok(page.includes("getFilterableExploreGuides("));
  assert.ok(page.includes("guides={filterableGuides}"));
  assert.ok(page.includes("cities.map((guide) =>"));
  assert.ok(page.includes("destinations.map((guide) =>"));
  assert.ok(page.includes("itineraries.map((guide) =>"));
  assert.ok(component.includes("type GuideSummary = readonly ["));
  assert.ok(component.includes("new Map<string, string>(guides.map(([slug, shortTitle]) => [slug, shortTitle]))"));
  assert.ok(component.includes("new Map<string, GuideSummary[2]>(guides.map(([slug, , kind]) => [slug, kind]))"));
  assert.ok(component.includes('guides.map(([slug, shortTitle]) => <option key={slug} value={slug}>{shortTitle}</option>)'));
  assert.ok(component.includes('guideNames.get(place.guideSlug)'));
  assert.ok(component.includes('guideKinds.get(first.guideSlug)'));
  assert.ok(component.includes('fetch("/api/explore/places", { signal: controller.signal })'));
});
