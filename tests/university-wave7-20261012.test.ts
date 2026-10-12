import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const guides = JSON.parse(readFileSync(new URL("../data/services-universities-wave7.json", import.meta.url), "utf8"));

test("three unique university guides have original sources and valid student actions", () => {
  assert.equal(guides.length, 3);
  assert.equal(new Set(guides.map((g: {slug: string}) => g.slug)).size, 3);
  for (const g of guides) {
    assert.equal(g.status, "verified");
    assert.equal(g.category, "Education");
    assert.equal(g.lastVerified, "2026-10-12");
    assert.ok(g.officialPortal.startsWith("https://"));
    assert.ok(g.requirements.length >= 3 && g.steps.length >= 6);
    assert.ok(g.sources.length >= 3 && g.sources.every((s: {url: string}) => s.url.startsWith("https://")));
    assert.ok(g.searchTerms.some((s: string) => /school fees/i.test(s)));
    assert.ok(g.related.includes("jamb-caps"));
  }
  assert.match(guides[0].feeNote, /does not establish/);
  assert.match(guides[1].notes.join(" "), /no separate Post-UTME SCREENING EXAM/);
  assert.match(guides[2].feeNote, /must not be treated as the 2026\/27 fee/);
});
