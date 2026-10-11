/**
 * Manually runnable, bounded in-process catalog-only CPU comparison.
 * This does NOT measure Worker cold starts, browser page loads or Web Vitals.
 * Run: npx tsx scripts/bench-tour-lookup.ts
 */
import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { exploreGuides, getExploreGuide } from "@/lib/explore";
import { explorePlaces, getExplorePlacesForGuide, sharedGuidePlaceSlugs } from "@/lib/explore-places";

const slugs = [...new Set([
  ...exploreGuides.map((guide) => guide.slug),
  ...Object.keys(sharedGuidePlaceSlugs),
  ...explorePlaces.map((place) => place.guideSlug),
])];
const cycles = 12;

function legacyLookup() {
  let sum = 0;
  for (let repeat = 0; repeat < cycles; repeat++) {
    for (const slug of slugs) {
      sum += exploreGuides.find((guide) => guide.slug === slug) ? 1 : 0;
      const shared = sharedGuidePlaceSlugs[slug];
      if (shared) {
        const selected = new Set(shared);
        sum += explorePlaces.filter((place) => selected.has(place.slug)).length;
      } else {
        sum += explorePlaces.filter((place) => place.guideSlug === slug).length;
      }
    }
  }
  return sum;
}

function indexedLookup() {
  let sum = 0;
  for (let repeat = 0; repeat < cycles; repeat++) {
    for (const slug of slugs) {
      sum += getExploreGuide(slug) ? 1 : 0;
      sum += getExplorePlacesForGuide(slug).length;
    }
  }
  return sum;
}

assert.equal(indexedLookup(), legacyLookup(), "indexed and original Tour lookup output differs");

function medianTimeMs(fn: () => number) {
  fn(); // Warm module/JIT and lazy shared-place buckets.
  const readings: number[] = [];
  for (let attempt = 0; attempt < 5; attempt++) {
    const start = performance.now();
    fn();
    readings.push(performance.now() - start);
  }
  return readings.sort((a, b) => a - b)[2];
}

const legacyMs = medianTimeMs(legacyLookup);
const indexedMs = medianTimeMs(indexedLookup);
console.log(JSON.stringify({
  type: "warm-node-in-process-tour-lookup",
  node: process.version,
  guideRecords: exploreGuides.length,
  placeRecords: explorePlaces.length,
  guideSlugsTested: slugs.length,
  cycles,
  previousMedianMs: Number(legacyMs.toFixed(3)),
  indexedMedianMs: Number(indexedMs.toFixed(3)),
  speedup: Number((legacyMs / indexedMs).toFixed(2)),
  scope: "Lookup/filter CPU only, not end-user page speed or Cloudflare cold starts.",
}, null, 2));
