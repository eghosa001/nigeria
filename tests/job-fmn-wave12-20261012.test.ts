import test from "node:test";
import assert from "node:assert/strict";
import { verifiedFmnPlantRoles20261012 } from "../lib/job-growth-wave-12";

test("five FMN roles are independently sourced, actionable and avoid fabricated benefits", () => {
  const jobs = verifiedFmnPlantRoles20261012;
  assert.equal(jobs.length, 5);
  assert.equal(new Set(jobs.map(job => job.slug)).size, jobs.length);
  assert.equal(new Set(jobs.map(job => job.officialUrl)).size, jobs.length);
  for (const item of jobs) {
    assert.equal(item.kind, "vacancy");
    assert.equal(item.status, "open");
    assert.equal(item.verifiedAt, "2026-10-12");
    assert.match(item.officialUrl, /^https:\/\/fmnplc\.e-recruiter\.ng\/vacancy\/details\/127/);
    assert.equal(item.sources[0]?.url, item.officialUrl);
    assert.ok(item.qualifications.length >= 3);
    assert.ok(item.applicationSteps.length >= 4);
    assert.ok(item.sourceNotes.length >= 2);
    assert.equal(item.deadline, undefined);
    assert.equal(item.jobPostingAuthorization, undefined);
    assert.match(item.feeNote, /not published/i);
  }
});
