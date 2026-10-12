import assert from "node:assert/strict";
import { test } from "node:test";
import { beninKanoHeritagePlaces20261012 as places } from "../lib/explore-benin-kano-heritage-2026-10-12";

test("seven distinct sourced city stops map to existing canonical guides", () => {
  assert.equal(places.length, 7);
  assert.equal(new Set(places.map(p => p.slug)).size, 8);
  assert.equal(places.filter(p => p.guideSlug === "benin-city").length, 4);
  assert.equal(places.filter(p => p.guideSlug === "kano").length, 3);
  for (const p of places) {
    assert.ok(p.source.href.startsWith("https://"), p.slug);
    assert.equal(p.checkedAt, "2026-10-12");
    assert.ok(p.mapQuery && p.address && p.tags.length >= 4, p.slug);
    assert.ok(p.summary.length >= 130, p.slug);
    assert.match(p.hours || "", /confirm|verify|permission|hours|enquire|ask|access|variable/i, p.slug);
  }
  assert.ok(places.find(p => p.slug === "kano-ancient-city-walls-gates")?.summary.includes("Tentative List"));
  assert.ok(places.find(p => p.slug === "royal-palace-oba-of-benin")?.summary.includes("not an unrestricted museum"));
});
