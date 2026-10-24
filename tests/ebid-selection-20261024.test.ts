import assert from "node:assert/strict";
import test from "node:test";
import { jobOpportunities } from "../lib/jobs";

test("EBID Young Professionals guide states issuer selection requirements without job-portal invention", () => {
  const job = jobOpportunities.find(j => j.slug === "ebid-young-professionals-2026");
  assert.ok(job);
  assert.equal(job.kind, "programme");
  assert.equal(job.deadline, "2026-10-30");
  assert.equal(job.verifiedAt, "2026-10-24");
  assert.ok(job.qualifications.some(s => s.includes("working knowledge of another")));
  assert.ok(job.requirements.some(s => s.includes("written and oral selection assessments")));
  assert.ok(job.sources.some(s => s.url.includes("Advertise-Young-Professional_2026_en.pdf")));
  assert.ok(job.applicationSteps.some(s => s.includes("recrutbidc@bidc-ebid.org")));
});
