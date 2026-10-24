import assert from "node:assert/strict";
import test from "node:test";
import { jobOpportunities } from "../lib/jobs";
import { getEffectiveJobStatus } from "../lib/job-runtime";

test("the Zenith Zecathon 6.0 archive has no live 2026 application instructions", () => {
  const job = jobOpportunities.find(x => x.slug === "zenith-bank-zecathon-6-hackathon-2026");
  assert.ok(job);
  assert.equal(job.status, "closed");
  assert.equal(job.deadline, "2026-10-13");
  assert.equal(getEffectiveJobStatus(job, "2026-10-24"), "closed");
  assert.equal(job.verifiedAt, "2026-10-24");
  assert.match(job.summary, /application window closed/);
  assert.match(job.nextMilestone ?? "", /28 October 2026/);
  assert.doesNotMatch(job.summary + job.applicationSteps.join(" "), /Free applications close 13 October|submit by 13 October|Read rules and apply through/);
  assert.ok(job.sources.some(source => source.url === "https://beyondlimits.global/zecathonhackathon/" && source.lastChecked === "2026-10-24"));
  assert.equal(job.kind, "programme");
});
