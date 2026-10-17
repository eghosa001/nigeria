import test from "node:test";
import assert from "node:assert/strict";
import { getJobOpportunity } from "../lib/jobs";
import { hasVerifiedEarlierIssuerDirectoryReview } from "../lib/job-earlier-reviewed-directory-evidence-2026-10-17";
import { checkedIssuerCareers20261016 } from "../lib/job-issuer-more-reviewed-2026-10-16";
import { issuerPortalEvidence20261016 } from "../lib/job-issuer-portals-reviewed-2026-10-16";
import { careerEvidence } from "../lib/job-issuer-career-research-2026-10-16-b";
const all=[...Object.keys(checkedIssuerCareers20261016),...Object.keys(issuerPortalEvidence20261016),...Object.keys(careerEvidence)];
test("all 59 older issuer reviews have unique identity and canonical source records",()=>{
 assert.equal(all.length,59);assert.equal(new Set(all).size,59);
 for(const slug of all) assert.ok(getJobOpportunity(slug),slug);
});
test("review evidence is mandatory; stale records and fabricated vacancy metadata never pass",()=>{
 const passed=all.filter(slug=>hasVerifiedEarlierIssuerDirectoryReview(getJobOpportunity(slug)!,"2026-10-17"));
 console.log("Evidence-matched previous issuer reviews:",passed.length,passed.join(", "));
 assert.ok(passed.length>0,"none of the 59 previously reviewed issuer records passed verification");
 for(const slug of passed){
  const job=getJobOpportunity(slug)!;
  assert.equal(hasVerifiedEarlierIssuerDirectoryReview({...job,verifiedAt:"2026-07-01"},"2026-10-17"),false);
  assert.equal(hasVerifiedEarlierIssuerDirectoryReview({...job,deadline:"2027-05-01"},"2026-10-17"),false);
  assert.equal(hasVerifiedEarlierIssuerDirectoryReview({...job,posting:{jobTitle:"Fake",datePosted:"2026-10-17",locations:[{country:"NG"}]}},"2026-10-17"),false);
  assert.equal(hasVerifiedEarlierIssuerDirectoryReview({...job,applicationSteps:job.applicationSteps.slice(0,3)},"2026-10-17"),false);
  assert.equal(hasVerifiedEarlierIssuerDirectoryReview({...job,sources:[]},"2026-10-17"),false);
  assert.equal(hasVerifiedEarlierIssuerDirectoryReview(job,"2026-12-01"),false);
 }
});
