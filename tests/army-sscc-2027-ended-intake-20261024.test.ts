import assert from "node:assert/strict";
import test from "node:test";
import { jobOpportunities } from "../lib/jobs";
import { getEffectiveJobStatus } from "../lib/job-runtime";

test("Army SSCC 50/2027 presents the past 17 October window, not live registration", () => {
  const item = jobOpportunities.find(job => job.slug === "nigerian-army-sscc-50-2027");
  assert.ok(item);
  assert.equal(item.kind, "recruitment-exercise");
  assert.equal(item.status, "closed");
  assert.equal(item.deadline, "2026-10-17");
  assert.equal(item.verifiedAt, "2026-10-24");
  assert.equal(getEffectiveJobStatus(item, "2026-10-24"), "closed");
  assert.match(item.summary, /has now ended/);
  assert.match(item.nextMilestone ?? "", /Applications closed/);
  assert.doesNotMatch(item.applicationSteps.join(" "), /select Apply Now|Submit no later than|Complete the form carefully:/);
  assert.match(item.applicationSteps.join(" "), /do not pay/i);
  assert.ok(item.sources.some(source => source.url.includes("punchng.com/how-to-apply-for-nigerian-army-2027-short-service-recruitment/")));
  assert.match(item.officialUrlLabel, /intake record/);
});
