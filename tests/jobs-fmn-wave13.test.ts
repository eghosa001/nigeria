import test from "node:test";
import assert from "node:assert/strict";
import { verifiedFmnFinalBoardJobs20261012 } from "../lib/job-growth-wave-13";
test("new FMN vacancy records are distinct and role-specific",()=>{
  assert.equal(verifiedFmnFinalBoardJobs20261012.length,3);
  assert.equal(new Set(verifiedFmnFinalBoardJobs20261012.map(x=>x.slug)).size,3);
  for(const r of verifiedFmnFinalBoardJobs20261012){
    assert.equal(r.status,"open");
    assert.equal(r.kind,"vacancy");
    assert.equal(r.verifiedAt,"2026-10-12");
    assert.equal(r.sources[0].url,r.officialUrl);
    assert.match(r.officialUrl,/^https:\/\/fmnplc\.e-recruiter\.ng\/vacancy\/details\/\d+$/);
    assert.ok(r.qualifications.length>=3&&r.applicationSteps.length>=3&&r.sourceNotes.length>=2);
    assert.equal(r.deadline,undefined);
    assert.equal(r.jobPostingAuthorization,undefined);
  }
});
