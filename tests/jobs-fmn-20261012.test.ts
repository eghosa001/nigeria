import test from "node:test";
import assert from "node:assert/strict";
import { verifiedFmnRoles20261012 } from "../lib/job-growth-wave-11";
test("official FMN job records remain sourced and distinct", () => {
  assert.equal(verifiedFmnRoles20261012.length,3);
  assert.equal(new Set(verifiedFmnRoles20261012.map(r=>r.slug)).size,3);
  for(const job of verifiedFmnRoles20261012){
    assert.equal(job.kind,"vacancy");
    assert.equal(job.verifiedAt,"2026-10-12");
    assert.ok(job.officialUrl.startsWith("https://fmnplc.e-recruiter.ng/vacancy/details/"));
    assert.equal(job.sources[0].url,job.officialUrl);
    assert.ok(job.applicationSteps.length>=3 && job.sourceNotes.length>=2);
    assert.equal(job.deadline,undefined);
    assert.equal(job.jobPostingAuthorization,undefined);
  }
});
