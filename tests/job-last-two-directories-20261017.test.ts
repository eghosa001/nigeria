import test from "node:test";
import assert from "node:assert/strict";
import { getJobOpportunity } from "../lib/jobs";
import { hasCompletedTwoRemainingDirectoryReviews20261017 } from "../lib/job-last-two-directories-2026-10-17";
test("two original issuer career guides have verified answers without advertised vacancies",()=>{
for (const slug of ["promasidor-nigeria-careers","palmpay-careers"]){
 const job=getJobOpportunity(slug);assert.ok(job,slug);
 assert.ok(hasCompletedTwoRemainingDirectoryReviews20261017(job,"2026-10-17"),slug);
 assert.equal(job.posting,undefined);assert.equal(job.deadline,undefined);
 assert.equal(hasCompletedTwoRemainingDirectoryReviews20261017({...job,applicationSteps:job.applicationSteps.slice(0,2)},"2026-10-17"),false);
 assert.equal(hasCompletedTwoRemainingDirectoryReviews20261017({...job,sources:[]},"2026-10-17"),false);
 assert.equal(hasCompletedTwoRemainingDirectoryReviews20261017(job,"2026-11-12"),false);
}
});