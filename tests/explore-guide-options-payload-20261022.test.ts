import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { exploreGuides } from "../lib/explore";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("compact Tour guide selectors preserve every guide, order and visible label", () => {
  const original = exploreGuides.map((guide) => ({
    slug: guide.slug, shortTitle: guide.shortTitle, kind: guide.kind,
  }));
  const compact = exploreGuides.map((guide) => [guide.slug, guide.shortTitle, guide.kind] as const);
  assert.equal(original.length, compact.length);
  assert.deepEqual(compact.map(([slug]) => slug), original.map((guide) => guide.slug));
  assert.deepEqual(compact.map(([, shortTitle]) => shortTitle), original.map((guide) => guide.shortTitle));
  assert.deepEqual(compact.map(([, , kind]) => kind), original.map((guide) => guide.kind));
  const originalBytes = Buffer.byteLength(JSON.stringify(original));
  const compactBytes = Buffer.byteLength(JSON.stringify(compact));
  assert.ok(compactBytes < originalBytes, "tuple props should send fewer bytes");
  console.info("[explore-guide-options] " + original.length + " guides: " +
    originalBytes + " bytes object props vs " + compactBytes + " bytes tuples; reduction " +
    ((1 - compactBytes / originalBytes) * 100).toFixed(1) + "%");
});

test("Tour directory keeps destination search and detail lookup using compact selector tuples", () => {
  const page = read("app/explore/page.tsx");
  const component = read("components/explore-place-directory.tsx");
  assert.ok(page.includes("guides={exploreGuides.map((guide) => [guide.slug, guide.shortTitle, guide.kind] as const)}"));
  assert.ok(component.includes("type GuideSummary = readonly ["));
  assert.ok(component.includes("new Map<string, string>(guides.map(([slug, shortTitle]) => [slug, shortTitle]))"));
  assert.ok(component.includes("new Map<string, GuideSummary[2]>(guides.map(([slug, , kind]) => [slug, kind]))"));
  assert.ok(component.includes('guides.map(([slug, shortTitle]) => <option key={slug} value={slug}>{shortTitle}</option>)'));
  assert.ok(component.includes('guideNames.get(place.guideSlug)'));
  assert.ok(component.includes('guideKinds.get(first.guideSlug)'));
  assert.ok(component.includes('fetch("/api/explore/places", { signal: controller.signal })'));
});
