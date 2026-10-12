import assert from "node:assert/strict";
import { test } from "node:test";
import { adamawaHeritageMuseums20261012 } from "../lib/explore-adamawa-museums-2026-10-12";
import { ncmmRegionalMuseums20261012 } from "../lib/explore-regional-museums-2026-10-12";

test("ten distinct national museum listings have real primary-source links and access cautions", () => {
  const entries = ncmmRegionalMuseums20261012;
  assert.equal(entries.length, 10);
  assert.equal(new Set(entries.map((p) => p.slug)).size, entries.length);
  for (const p of entries) {
    assert.equal(p.source.href, "https://museum.ng/museums/national-museums/");
    assert.equal(p.checkedAt, "2026-10-12");
    assert.ok(p.summary.length > 130, p.slug);
    assert.ok(p.address.includes("State"), p.slug);
    assert.ok(p.mapQuery && p.tags.length >= 4, p.slug);
    assert.match((p.hours || ""), /confirm|contact|check|ask|do not|defer|permission/i, p.slug);
    assert.match(p.cost, /no current.*verified/i, p.slug);
  }
  assert.equal(entries.filter(p => p.guideSlug === "adamawa-museums-heritage-route").length, 4);
  assert.ok(!entries.some(p => /owo|koko|owerri|kanta/i.test(p.slug)), "Existing museums must not be cloned.");
});

test("Adamawa route distinguishes Yola's museum cluster from remote Hong and Sukur", () => {
  assert.equal(adamawaHeritageMuseums20261012.length, 1);
  const g = adamawaHeritageMuseums20261012[0];
  assert.equal(g.region, "Adamawa State");
  assert.equal(g.kind, "itinerary");
  assert.ok(g.highlights.length >= 4 && g.planning.length >= 4);
  assert.ok(g.intro.join(" ").includes("not four stops"));
  assert.ok(g.planning.some(p => /Sukur/.test(p.label)));
});
