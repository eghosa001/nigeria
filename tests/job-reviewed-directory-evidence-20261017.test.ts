import test from "node:test";
import assert from "node:assert/strict";
import { getJobOpportunity } from "../lib/jobs";
import { thirdAgentIssuerReviews20261017 } from "../lib/job-issuer-third-agent-reviews-2026-10-17";
import { hasCompletedIssuerDirectoryReview } from "../lib/job-reviewed-directory-evidence-2026-10-17";

const checkedDate = "2026-10-17";
test("twenty exact, independently sourced issuer directory reviews close depth-only findings", () => {
  const ids = Object.keys(thirdAgentIssuerReviews20261017);
  assert.equal(ids.length, 20);
  for (const slug of ids) {
    const record = getJobOpportunity(slug);
    assert.ok(record, slug + " does not exist");
    assert.ok(hasCompletedIssuerDirectoryReview(record, checkedDate), slug + " needs actual issuer review evidence");
  }
});
test("no broad directory, unverified job or weakened review qualifies", () => {
  const unsupported = getJobOpportunity("dangote-group-careers");
  assert.ok(unsupported);
  assert.equal(hasCompletedIssuerDirectoryReview(unsupported, checkedDate), false);
  const verified = getJobOpportunity("faan-careers");
  assert.ok(verified && hasCompletedIssuerDirectoryReview(verified, checkedDate));
  assert.equal(hasCompletedIssuerDirectoryReview({...verified,verifiedAt:"2026-08-01"},checkedDate),false);
  assert.equal(hasCompletedIssuerDirectoryReview({...verified,kind:"vacancy",status:"open"},checkedDate),false);
  assert.equal(hasCompletedIssuerDirectoryReview({...verified,posting:{datePosted:"2026-10-17"} as typeof verified.posting},checkedDate),false);
  assert.equal(hasCompletedIssuerDirectoryReview({...verified,applicationSteps:verified.applicationSteps.slice(0,2)},checkedDate),false);
  assert.equal(hasCompletedIssuerDirectoryReview({...verified,sources:verified.sources.filter(s=>s.url !== thirdAgentIssuerReviews20261017[verified.slug].url)},checkedDate),false);
});
