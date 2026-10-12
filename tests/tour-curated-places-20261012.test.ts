import test from "node:test";
import assert from "node:assert/strict";
import { officialHeritageStops20261012 } from "../lib/explore-growth-places-wave-12";

test("new Tour heritage stops are distinct, sourced and safe to present as listings", () => {
  const places = officialHeritageStops20261012;
  assert.equal(places.length, 12);
  assert.equal(new Set(places.map((p) => p.slug)).size, places.length);
  for (const p of places) {
    assert.equal(p.checkedAt, "2026-10-12");
    assert.ok(p.name && p.address && p.summary.length > 100, p.slug);
    assert.ok(p.source.href.startsWith("https://"), p.slug);
    assert.ok(p.mapQuery && p.tags.length >= 3, p.slug);
    assert.match(p.hours ?? "", /confirm|request|do not/i, p.slug);
  }
  assert.equal(places.find((p) => p.slug === "national-museum-oyo-town")?.guideSlug, "oyo-state-travel-guide");
  assert.equal(places.find((p) => p.slug === "ajaokuta-steel-complex-exterior")?.guideSlug, "kogi-state-travel-guide");
});
