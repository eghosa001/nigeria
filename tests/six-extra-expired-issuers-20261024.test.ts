import assert from "node:assert/strict";
import test from "node:test";
import { jobOpportunities } from "../lib/jobs";
import { getEffectiveJobStatus } from "../lib/job-runtime";

const closed = [
  ["snv-energy-advisor-abuja-2026", "2026-10-08"],
  ["snv-project-manager-abuja-2026", "2026-10-08"],
  ["nigerian-air-force-airmen-airwomen-recruitment-2026", "2026-10-14"],
  ["uniben-teaching-non-teaching-recruitment-2026", "2026-10-08"],
  ["unilag-professorial-chair-2026", "2026-10-20"],
  ["deloitte-nigeria-early-careers", "2026-10-09"],
] as const;
for (const [slug, deadline] of closed) {
  test(`expired issuer-specific 2026 guide ${slug} has no late application instructions`, () => {
    const item = jobOpportunities.find(j => j.slug === slug);
    assert.ok(item);
    assert.equal(item.deadline, deadline);
    assert.equal(item.status, "closed");
    assert.equal(getEffectiveJobStatus(item, "2026-10-24"), "closed");
    assert.equal(item.verifiedAt, "2026-10-24");
    assert.match(item.statusLabel ?? "", /(closed|ended|passed)/i);
    assert.match(item.summary, /(has ended|has passed|ended|expired|closed|closing date.*passed)/i);
    assert.ok(item.sources.some(src => src.lastChecked === "2026-10-24"));
    assert.doesNotMatch(item.applicationSteps.join(" "), /Start a new application|Complete submission on or before|Submit before 8 October 2026|Complete the official application before 9 October 2026/);
    assert.ok(item.applicationSteps.some(step => /(original|archiv|published|closed|expired|deadline|past|old)/i.test(step)));
  });
}
test("NAF 22 October official aptitude notice is selection, not new registration", () => {
  const item = jobOpportunities.find(j => j.slug === "nigerian-air-force-airmen-airwomen-recruitment-2026");
  assert.ok(item);
  assert.match(item.summary, /24 October 2026 at 7:00 a\.m\./);
  assert.match(item.summary, /specific eligible applicants/i);
  assert.match(item.applicationSteps.join(" "), /specifically invited|original intake|original acknowledgement/i);
  assert.ok(item.sources.some(s => s.url === "https://nafrecruitment.airforce.mil.ng/updates/" && s.lastChecked === "2026-10-24"));
  assert.doesNotMatch(item.summary, /recruitment is open|applications are open/i);
});
