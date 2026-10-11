import assert from "node:assert/strict";
import { test } from "node:test";
import { exploreGuides, getExploreGuide } from "@/lib/explore";
import { explorePlaces, getExplorePlacesForGuide, sharedGuidePlaceSlugs } from "@/lib/explore-places";

test("Tour guide slug index matches Array.find including unknown slugs", () => {
  for (const guide of exploreGuides) {
    assert.equal(getExploreGuide(guide.slug), exploreGuides.find((item) => item.slug === guide.slug));
  }
  assert.equal(getExploreGuide("unlisted-destination-xyz999"), undefined);
});

test("Tour guide-place index matches the original filter for every published and shared guide", () => {
  const allSlugs = new Set([
    ...exploreGuides.map((guide) => guide.slug),
    ...Object.keys(sharedGuidePlaceSlugs),
    ...explorePlaces.map((place) => place.guideSlug),
    "unlisted-destination-xyz999",
  ]);
  for (const slug of allSlugs) {
    const shared = sharedGuidePlaceSlugs[slug];
    const selected = shared ? new Set(shared) : null;
    const expected = explorePlaces.filter((place) =>
      selected ? selected.has(place.slug) : place.guideSlug === slug,
    );
    const actual = getExplorePlacesForGuide(slug);
    assert.deepEqual(actual, expected, slug);
    assert.equal(actual.length, expected.length);
    for (let index = 0; index < expected.length; index++) {
      assert.equal(actual[index], expected[index], "record identity changed: " + slug);
    }
    if (actual.length) {
      actual.pop();
      assert.deepEqual(getExplorePlacesForGuide(slug), expected, "caller mutation leaked: " + slug);
    }
  }
});

test("shared guides preserve source ordering and do not return unselected places", () => {
  const slugs = Object.keys(sharedGuidePlaceSlugs);
  assert.ok(slugs.length > 0);
  for (const slug of slugs) {
    const listed = new Set(sharedGuidePlaceSlugs[slug]);
    const actual = getExplorePlacesForGuide(slug);
    assert.ok(actual.every((place) => listed.has(place.slug)), slug);
    const indexes = actual.map((place) => explorePlaces.indexOf(place));
    assert.deepEqual(indexes, [...indexes].sort((a, b) => a - b), slug);
  }
});
