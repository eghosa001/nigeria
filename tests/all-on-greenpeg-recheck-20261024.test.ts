import assert from "node:assert/strict";
import test from "node:test";
import { jobOpportunities } from "../lib/jobs";
import { getEffectiveJobStatus } from "../lib/job-runtime";

const allOn = [
  ["all-on-finance-operations-analyst-2026", "2026-10-09"],
  ["all-on-finance-operations-intern-2026", "2026-10-09"],
  ["all-on-finance-controller-2026", "2026-10-11"],
] as const;

for (const [slug, deadline] of allOn) {
  test(`All On ${slug} is a closed, issuer-dated original recruitment`, () => {
    const job = jobOpportunities.find(j => j.slug === slug);
    assert.ok(job, slug);
    assert.equal(job.kind, "vacancy");
    assert.equal(job.status, "closed");
    assert.equal(getEffectiveJobStatus(job, "2026-10-24"), "closed");
    assert.equal(job.deadline, deadline);
    assert.equal(job.verifiedAt, "2026-10-24");
    assert.match(job.summary, /has passed/);
    assert.match(job.statusLabel, /closed/);
    assert.match(job.applicationSteps.join(" "), /archived|original|past/i);
    assert.doesNotMatch(job.applicationSteps.join(" "), /Submit before (9|11) October 2026|Email the application to the HR address/i);
    assert.equal(job.sources[0].lastChecked, "2026-10-24");
    assert.ok(job.qualifications.length > 0);
  });
}

test("Greenpeg 2026 trainee source has conflicting deadline evidence, not asserted closed or open", () => {
  const job = jobOpportunities.find(j => j.slug === "greenpeg-technical-trainee-programme-2026");
  assert.ok(job);
  assert.equal(job.kind, "programme");
  assert.equal(job.status, "unverified");
  assert.equal(getEffectiveJobStatus(job, "2026-10-24"), "unverified");
  assert.equal(job.deadline, undefined);
  assert.equal(job.verifiedAt, "2026-10-24");
  assert.match(job.summary, /16 September–9 October 2026/);
  assert.match(job.summary, /16 October 2026/);
  assert.match(job.statusLabel, /conflicting/i);
  assert.match(job.nextMilestone ?? "", /unambiguous current deadline/i);
  assert.equal(job.fields.length, 7);
  assert.ok(job.sources.some(s => s.url === "https://greenpeg.com/graduate-trainee/" && s.lastChecked === "2026-10-24"));
  assert.doesNotMatch(job.applicationSteps.join(" "), /submit before 9 October|submit before 9 October 2026/i);
});
