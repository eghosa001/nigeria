import assert from "node:assert/strict";
import test from "node:test";
import { jobOpportunities } from "../lib/jobs";
import { getEffectiveJobStatus } from "../lib/job-runtime";

test("oilserv-ingenious-graduate-trainee-2027 is an archived intake, not an open application", () => {
  const job = jobOpportunities.find(item => item.slug === "oilserv-ingenious-graduate-trainee-2027");
  assert.ok(job, "canonical programme was removed");
  assert.equal(job.kind, "programme");
  assert.equal(job.status, "closed");
  assert.equal(getEffectiveJobStatus(job, "2026-10-24"), "closed");
  assert.equal(job.deadline, "2026-10-10");
  assert.equal(job.verifiedAt, "2026-10-24");
  assert.match(job.nextMilestone ?? "", /published 2027 trainee application window ended/i);
  assert.match(job.summary, /(application deadline.*pass|application.*window.*ended|expired|published application deadline was)/i);
  assert.doesNotMatch([...job.applicationSteps, ...job.requirements].join(" "), /Submit before (10|18) October 2026|Complete the application before 10 October 2026/);
  assert.ok(job.sources.some(src => src.url.includes("oilservcareers.seamlesshiring.com/job/view/10943")));
  assert.match(job.officialUrlLabel, /(view expired|vacancy archive)/i);
});
