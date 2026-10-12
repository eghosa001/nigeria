import { test } from "node:test";
import assert from "node:assert/strict";
import { verifiedFmnOperationsJobs20261012 } from "../lib/job-growth-wave-12";

test("five distinct live FMN job advertisements preserve official credentials",()=>{
  const jobs=verifiedFmnOperationsJobs20261012;
  assert.equal(jobs.length,5);
  assert.equal(new Set(jobs.map(x=>x.slug)).size,5);
  for(const job of jobs){
    assert.equal(job.kind,"vacancy");
    assert.equal(job.status,"open");
    assert.equal(job.verifiedAt,"2026-10-12");
    assert.equal(job.sources[0].url,job.officialUrl);
    assert.match(job.officialUrl,/^https:\/\/fmnplc\.e-recruiter\.ng\/vacancy\/details\/\d+$/);
    assert.ok(job.qualifications.length>=3&&job.requirements.length>=3);
    assert.ok(job.sourceNotes.length>=2&&job.applicationSteps.length>=4);
    assert.equal(job.deadline,undefined);
    assert.equal(job.jobPostingAuthorization,undefined);
  }
  assert.ok(jobs.some(x=>x.location.includes("Cross River State")));
  assert.ok(jobs.some(x=>x.qualifications.join(" ").includes("NABTEB")));
});
