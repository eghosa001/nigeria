import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { isIndexableJobOpportunity, jobOpportunities } from "../lib/jobs";
import { buildJobPostingJsonLd, getEffectiveJobStatus, getRecentlyPostedJobs } from "../lib/job-runtime";

const oldUrl = "https://erp.eha.ng/jobs/medical-doctor-abuja-549";
const boardUrl = "https://erp.eha.ng/jobs";

test("retired EHA Abuja doctor link is not presented as an accepting vacancy", () => {
  const job = jobOpportunities.find((item) => item.slug === "eha-medical-doctor-abuja-2026");
  assert.ok(job);
  assert.equal(job.status, "unverified");
  assert.equal(getEffectiveJobStatus(job, "2026-10-23"), "unverified");
  assert.equal(job.officialUrl, boardUrl);
  assert.equal(job.verifiedAt, "2026-10-23");
  assert.equal(job.sources.length, 1);
  assert.equal(job.sources[0]?.url, boardUrl);
  assert.equal(job.sources[0]?.lastChecked, "2026-10-23");
  assert.doesNotMatch(JSON.stringify(job), /medical-doctor-abuja-549/);
  assert.match(job.summary, /HTTP 404.*jobs board did not list this role/);
  assert.match(job.sourceNotes.join(" "), /Issuer check 23 October 2026/);
  assert.ok(job.qualifications.some((item) => /MDCN/.test(item)));
  assert.ok(job.applicationSteps.some((item) => /new employer-issued vacancy/.test(item)));
  assert.equal(isIndexableJobOpportunity(job), false);
  assert.equal(buildJobPostingJsonLd(job, "https://mynigeriaguide.com/jobs/eha-medical-doctor-abuja-2026", "2026-10-23"), null);
  assert.ok(!getRecentlyPostedJobs(jobOpportunities, 30, "2026-10-23").some((item) => item.slug === job.slug));
});

test("the dead EHA source is absent from the Jobs link audit input", () => {
  const source = readFileSync(new URL("../lib/jobs.ts", import.meta.url), "utf8");
  assert.ok(!source.includes(oldUrl));
  assert.ok(source.includes(boardUrl));
});
