import test from "node:test";
import assert from "node:assert/strict";
import { getJobOpportunity } from "../lib/jobs";
import { hasDocumentedCrossAgentIssuerReview } from "../lib/job-cross-agent-reviewed-directory-2026-10-17";
import { twentyIssuerCareerRoutes20261017 } from "../lib/job-issuer-twenty-reviews-2026-10-17";
import { nineCareerIssuerDecisions20261017 } from "../lib/job-nine-issuer-application-decisions-2026-10-17";
import { remainingIssuerResearch20261017 } from "../lib/job-remaining-issuer-research-2026-10-17";

const groups = [Object.keys(twentyIssuerCareerRoutes20261017), Object.keys(nineCareerIssuerDecisions20261017), Object.keys(remainingIssuerResearch20261017)];
test("all reviewed issuer registries refer to unique existing career directories", () => {
  const ids=groups.flat();
  assert.equal(ids.length, 42);
  assert.equal(new Set(ids).size, 42);
  for (const slug of ids) {
    const job = getJobOpportunity(slug);
    assert.ok(job, slug);
    assert.equal(job.kind, "career-page");
  }
});
test("cross-agent evidence closure requires issuer fact, actions and current source", () => {
  const ids=groups.flat();
  const passing=ids.filter(slug=>hasDocumentedCrossAgentIssuerReview(getJobOpportunity(slug)!, "2026-10-17"));
  // The list of passing slugs is shown in the log. If a record no longer
  // matches its verified issuer review, it must remain flagged. Do not
  // weaken the validator to force a desired count.
  console.log("Evidence-matched cross-agent issuer directory guides:",passing.length,passing.join(", "));
  assert.ok(passing.length >= 1);
  for(const slug of passing) {
    const job=getJobOpportunity(slug)!;
    assert.equal(hasDocumentedCrossAgentIssuerReview({...job,verifiedAt:"2026-07-01"},"2026-10-17"),false);
    assert.equal(hasDocumentedCrossAgentIssuerReview({...job,deadline:"2026-12-31"},"2026-10-17"),false);
    assert.equal(hasDocumentedCrossAgentIssuerReview({...job,posting:{jobTitle:"Made up",datePosted:"2026-10-17",locations:[{country:"NG"}]}},"2026-10-17"),false);
    assert.equal(hasDocumentedCrossAgentIssuerReview({...job,applicationSteps:job.applicationSteps.slice(0,2)},"2026-10-17"),false);
    assert.equal(hasDocumentedCrossAgentIssuerReview({...job,sources:[]},"2026-10-17"),false);
    assert.equal(hasDocumentedCrossAgentIssuerReview(job,"2026-11-30"),false);
  }
  const unrelated=getJobOpportunity("dangote-group-careers");
  assert.ok(unrelated);
  assert.equal(hasDocumentedCrossAgentIssuerReview(unrelated,"2026-10-17"),false);
});
