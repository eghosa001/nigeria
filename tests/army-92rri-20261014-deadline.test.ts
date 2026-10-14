import assert from "node:assert/strict";
import test from "node:test";
import { jobOpportunities } from "../lib/jobs";
import { getClosingSoonJobs, getEffectiveJobStatus } from "../lib/job-runtime";

test("Army 92RRI has the announced October cutoff, not November screening as application deadline", () => {
  const job = jobOpportunities.find((item) => item.slug === "nigerian-army-92rri-2026");
  assert.ok(job);
  assert.equal(job.deadline, "2026-10-21");
  assert.match(job.nextMilestone ?? "", /21 October 2026.*17 November/s);
  assert.ok(job.sources.some((s) => s.url.startsWith("https://recruit.army.mil.ng/")));
  assert.ok(job.sources.some((s) => s.url.startsWith("https://von.gov.ng/")));
  assert.match(job.applicationSteps.join(" "), /NINAuth/);
  assert.equal(getEffectiveJobStatus(job, "2026-10-21"), "open");
  assert.equal(getEffectiveJobStatus(job, "2026-10-22"), "closed");
  assert.ok(getClosingSoonJobs(jobOpportunities, 7, "2026-10-14").some((item) => item.slug === job.slug));
  assert.ok(!getClosingSoonJobs(jobOpportunities, 7, "2026-10-22").some((item) => item.slug === job.slug));
});
