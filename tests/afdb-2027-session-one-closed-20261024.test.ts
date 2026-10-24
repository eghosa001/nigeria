import assert from "node:assert/strict";
import test from "node:test";
import { jobOpportunities } from "../lib/jobs";
import { getEffectiveJobStatus } from "../lib/job-runtime";

test("AfDB Session 1 records the expired 12 October 2026 window", () => {
  const job = jobOpportunities.find(item => item.slug === "afdb-2027-internship-session-one");
  assert.ok(job);
  assert.equal(job.status, "closed");
  assert.equal(job.deadline, "2026-10-12");
  assert.equal(getEffectiveJobStatus(job, "2026-10-24"), "closed");
  assert.equal(job.verifiedAt, "2026-10-24");
  assert.match(job.summary, /application window.*closed/i);
  assert.doesNotMatch(job.summary + " " + job.applicationSteps.join(" "), /is recruiting for the first|Submit by midnight|Create or access your candidate account/);
  assert.ok(job.sources.some(s => s.url.includes("/selection-cycle") && s.lastChecked === "2026-10-24"));
  assert.match(job.nextMilestone ?? "", /30 November 2026/);
  assert.match(job.applicationSteps.join(" "), /selection-cycle page says all applicants.*terms say no response/i);
});
