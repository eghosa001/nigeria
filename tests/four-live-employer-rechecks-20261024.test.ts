import assert from "node:assert/strict";
import test from "node:test";
import { jobOpportunities } from "../lib/jobs";
import { getEffectiveJobStatus, getJobAvailabilityNotice } from "../lib/job-runtime";

const checks = [
  ["eha-registered-nurse-yaba-lagos-2026", "https://erp.eha.ng/jobs"],
  ["eha-pharmacist-abuja-2026", "https://erp.eha.ng/jobs"],
  ["coronation-graduate-trainee-2026", "https://www.coronation.ng/coronation-academies/"],
  ["nigerian-navy-batch-39-recruitment-2026", "https://joinnigeriannavy.navy.mil.ng/"],
] as const;

for (const [slug, expectedIssuer] of checks) {
  test(`individual live issuer review preserved for ${slug}`, () => {
    const item = jobOpportunities.find(x => x.slug === slug);
    assert.ok(item);
    assert.equal(item.verifiedAt, "2026-10-24");
    assert.equal(getEffectiveJobStatus(item, "2026-10-24"), "open");
    assert.ok(item.sources.some(s => s.lastChecked === "2026-10-24" && s.url === expectedIssuer));
    assert.match(item.statusLabel ?? "", /24 October|31 October/);
    assert.equal(getJobAvailabilityNotice(item, "2026-10-24"), null);
  });
}

test("EHA nurse and pharmacist keep real original posting dates separate from October board updates", () => {
  const nurse = jobOpportunities.find(x => x.slug === "eha-registered-nurse-yaba-lagos-2026");
  const pharmacist = jobOpportunities.find(x => x.slug === "eha-pharmacist-abuja-2026");
  assert.ok(nurse); assert.ok(pharmacist);
  assert.equal(nurse.posting?.datePosted, "2026-09-27");
  assert.equal(pharmacist.posting?.datePosted, "2026-09-29");
  assert.match(nurse.summary, /20 October 2026/);
  assert.match(pharmacist.sourceNotes.join(" "), /19 October 2026/);
  assert.match(pharmacist.summary, /181,440/);
  assert.match(pharmacist.qualifications.join(" "), /PCN|Pharmacists Council/i);
  assert.equal(getEffectiveJobStatus(nurse, "2026-11-10"), "unverified", "a 24 Oct check must not license a permanent open claim");
});

test("Navy exact 31 October closing time and subsequent aptitude stage remain separate", () => {
  const navy = jobOpportunities.find(x => x.slug === "nigerian-navy-batch-39-recruitment-2026");
  assert.ok(navy);
  assert.equal(navy.deadline, "2026-10-31");
  assert.match(navy.summary, /23:59 WAT/);
  assert.match(navy.nextMilestone ?? "", /21 November/);
  assert.equal(getEffectiveJobStatus(navy, "2026-11-01"), "closed");
  assert.ok(getJobAvailabilityNotice(navy, "2026-11-01")?.includes("deadline"));
});

test("Coronation official academy remains date-unbounded, not a fabricated deadline", () => {
  const item = jobOpportunities.find(x => x.slug === "coronation-graduate-trainee-2026");
  assert.ok(item);
  assert.equal(item.kind, "programme");
  assert.equal(item.deadline, undefined);
  assert.match(item.nextMilestone ?? "", /No closing date was verified/);
});
