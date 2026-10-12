import assert from "node:assert/strict";
import { test } from "node:test";
import { ifeIlorinOsogboDepth20261012 as places } from "../lib/explore-ife-ilorin-osogbo-2026-10-12";

test("six distinct place records attach to three existing city guides", () => {
  assert.equal(places.length, 6);
  assert.equal(new Set(places.map(p => p.slug)).size, places.length);
  for (const [guide, count] of [["ile-ife", 3], ["ilorin", 2], ["osogbo", 1]] as const) {
    assert.equal(places.filter(p => p.guideSlug === guide).length, count);
  }
  for (const p of places) {
    assert.equal(p.checkedAt, "2026-10-12", p.slug);
    assert.ok(p.source.href.startsWith("https://"), p.slug);
    assert.ok(p.address && p.mapQuery && p.tags.length >= 4, p.slug);
    assert.ok(p.summary.length > 150, p.slug);
    assert.match((p.hours || "").toLowerCase(), /confirm|contact|permission|custodian|verified/, p.slug);
  }
  assert.match(places.find(p => p.slug === "obatala-arts-centre-iragbiji")!.summary, /not Osogbo city centre/);
  assert.match(places.find(p => p.slug === "dada-pottery-ilorin")!.summary, /does not confirm/);
});
