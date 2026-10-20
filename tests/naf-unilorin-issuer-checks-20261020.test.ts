import assert from "node:assert/strict";
import test from "node:test";
import { getJobOpportunity } from "../lib/jobs";
import { getEffectiveJobStatus } from "../lib/job-runtime";

test("NAF closed 2026 BMTC and DSSC recruitment is never advertised as open", () => {
  const job = getJobOpportunity("nigerian-air-force-airmen-airwomen-recruitment-2026");
  assert.ok(job);
  assert.equal(job.status, "closed");
  assert.equal(job.deadline, "2026-10-14");
  assert.equal(job.verifiedAt, "2026-10-20");
  assert.equal(getEffectiveJobStatus(job,"2026-10-20"), "closed");
  assert.match(job.summary, /no exercise is currently ongoing/i);
  assert.match(job.summary, /acknowledgement cards/i);
  assert.ok(job.applicationSteps.every(step => !/start a fresh form.*apply now/i.test(step)));
  assert.ok(job.sources.some(source => source.url === "https://nafrecruitment.airforce.mil.ng/" &&
    source.lastChecked === "2026-10-20"));
});

test("UNILORIN application categories and technical test come from the issuer", () => {
  const job = getJobOpportunity("unilorin-careers");
  assert.ok(job);
  assert.equal(job.kind, "career-page");
  assert.equal(job.status, "career-page");
  assert.equal(job.verifiedAt, "2026-10-20");
  assert.equal(job.deadline, undefined);
  assert.match(job.summary, /computer proficiency test/i);
  assert.match(job.nextMilestone ?? "", /no.*universal closing date/i);
  assert.ok(job.sources.some(source => source.url === "https://careers.unilorin.edu.ng/" &&
    source.lastChecked === "2026-10-20"));
});
