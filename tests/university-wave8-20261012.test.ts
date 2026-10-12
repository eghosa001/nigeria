import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const guides = JSON.parse(readFileSync(new URL("../data/services-universities-wave8.json", import.meta.url), "utf8"));

test("UNIOSUN, UNIJOS and UNIZIK guides have original actionable 2026 sources", () => {
  assert.equal(guides.length, 3);
  assert.equal(new Set(guides.map((s: { slug:string }) => s.slug)).size, 3);
  assert.equal(new Set(guides.map((s: { agencySlug:string }) => s.agencySlug)).size, 3);
  for (const guide of guides) {
    assert.equal(guide.status, "verified");
    assert.equal(guide.category, "Education");
    assert.equal(guide.lastVerified, "2026-10-12");
    assert.ok(guide.officialPortal.startsWith("https://"));
    assert.ok(guide.requirements.length >= 3 && guide.steps.length >= 6);
    assert.ok(guide.sources.length >= 3 && guide.sources.every((s: { url: string }) => s.url.startsWith("https://")));
    assert.ok(guide.searchTerms.some((term: string) => /school fees/i.test(term)));
    assert.ok(guide.related.includes("jamb-caps"));
  }
  assert.match(guides[0].summary, /₦65,000/);
  assert.match(guides[0].feeNote, /₦3,000.*₦2,000/);
  assert.match(guides[1].timeline, /12 September 2026/);
  assert.match(guides[1].notes.join(" "), /2025\/26/);
  assert.match(guides[2].summary, /applications are closed/);
  assert.match(guides[2].feeNote, /NOT evidence of a 2026\/27 fee/);
});
