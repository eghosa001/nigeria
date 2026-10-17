import test from "node:test";
import assert from "node:assert/strict";
import { getJobOpportunity } from "../lib/jobs";
import { remainingDirectoryReviews20261017,hasCompletedRemainingDirectoryReview } from "../lib/job-final-directory-reviews-2026-10-17";
test("eighteen original employer-specific guides meet strict source-matched review",()=>{
 const ids=Object.keys(remainingDirectoryReviews20261017);assert.equal(ids.length,18);
 for(const slug of ids){
  const job=getJobOpportunity(slug); assert.ok(job,slug);
  assert.ok(hasCompletedRemainingDirectoryReview(job,"2026-10-17"),slug);
  assert.equal(hasCompletedRemainingDirectoryReview({...job,verifiedAt:"2026-08-01"},"2026-10-17"),false);
  assert.equal(hasCompletedRemainingDirectoryReview({...job,applicationSteps:[]},"2026-10-17"),false);
  assert.equal(hasCompletedRemainingDirectoryReview({...job,posting:{jobTitle:"fake",datePosted:"2026-10-17",locations:[{country:"NG"}]}},"2026-10-17"),false);
  assert.equal(hasCompletedRemainingDirectoryReview({...job,sources:[]},"2026-10-17"),false);
  assert.equal(hasCompletedRemainingDirectoryReview(job,"2026-11-30"),false);
 }
});
test("insufficiently sourced PalmPay and Promasidor remain flagged",()=>{
 for(const slug of ["palmpay-careers","promasidor-nigeria-careers"]){
  const job=getJobOpportunity(slug);assert.ok(job);assert.equal(hasCompletedRemainingDirectoryReview(job,"2026-10-17"),false);
 }
});
