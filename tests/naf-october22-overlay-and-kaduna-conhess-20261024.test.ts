import assert from "node:assert/strict";
import test from "node:test";
import { jobOpportunities } from "../lib/jobs";
import { applyNafAndUnilorinIssuerChecks20261020 } from "../lib/job-naf-unilorin-checks-2026-10-20";

test("old October 20 overlay must preserve the newer NAF 22 October aptitude-test bulletin", () => {
  const item = jobOpportunities.find(x => x.slug === "nigerian-air-force-airmen-airwomen-recruitment-2026");
  assert.ok(item);
  const effective = applyNafAndUnilorinIssuerChecks20261020(item);
  assert.equal(effective.verifiedAt, "2026-10-24");
  assert.equal(effective.status, "closed");
  assert.match(effective.summary, /22 October/);
  assert.match(effective.summary, /24 October 2026 at 7:00 a\.m\./);
  assert.ok(effective.sources.some(s => s.url === "https://nafrecruitment.airforce.mil.ng/updates/"));
  assert.doesNotMatch(effective.summary, /no exercise is currently ongoing\. Its Basic Military Training Course/);
});

test("all ten Kaduna PHCB cadres display official CONHESS grade typography", () => {
  const entries = jobOpportunities.filter(x => x.slug.startsWith("kaduna-phcb-") && x.slug !== "kaduna-phcb-recruitment-2026");
  assert.equal(entries.length, 10);
  for (const entry of entries) {
    assert.match(entry.summary, /CONHESS (?:\d|\d\/\d)/);
    assert.doesNotMatch(entry.summary, /conhess/);
    assert.equal(entry.status, "closed");
  }
});
