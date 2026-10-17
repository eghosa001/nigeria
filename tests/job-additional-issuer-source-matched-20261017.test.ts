import assert from "node:assert/strict";
import test from "node:test";
import { jobOpportunities, getJobOpportunity, isIndexableJobOpportunity } from "../lib/jobs";
import { hasCompletedIssuerDirectoryReview } from "../lib/job-reviewed-directory-evidence-2026-10-17";
import {
  additionallyReviewedIssuerSlugs20261017,
  hasSourceMatchedAdditionalIssuerReview,
} from "../lib/job-additional-issuer-review-evidence-2026-10-17";
import { twentyIssuerCareerRoutes20261017 } from "../lib/job-issuer-twenty-reviews-2026-10-17";
import { remainingIssuerResearch20261017 } from "../lib/job-remaining-issuer-research-2026-10-17";
import { nineCareerIssuerDecisions20261017 } from "../lib/job-nine-issuer-application-decisions-2026-10-17";

const today = "2026-10-17";
test("42 distinct issuer-specific career pages contain preserved source-matched original reviews", () => {
  assert.equal(Object.keys(twentyIssuerCareerRoutes20261017).length, 20);
  assert.equal(Object.keys(remainingIssuerResearch20261017).length, 13);
  assert.equal(Object.keys(nineCareerIssuerDecisions20261017).length, 9);
  assert.equal(additionallyReviewedIssuerSlugs20261017.length, 42);
  assert.equal(new Set(additionallyReviewedIssuerSlugs20261017).size, 42);
  for (const slug of additionallyReviewedIssuerSlugs20261017) {
    const job = getJobOpportunity(slug);
    assert.ok(job && isIndexableJobOpportunity(job), slug);
    assert.ok(hasSourceMatchedAdditionalIssuerReview(job, today), slug + " missing independent issuer proof");
    assert.equal(job.kind, "career-page", slug);
    assert.equal(job.status, "career-page", slug);
    assert.equal(job.deadline, undefined, slug);
    assert.ok(!job.posting && !job.jobPostingAuthorization, slug);
  }
});

test("source/review tampering or mislabelled vacancies reopen directory review", () => {
  for (const slug of ["bcg-nigeria-careers", "ndlea-careers", "ecobank-careers"]) {
    const job = getJobOpportunity(slug);
    assert.ok(job && hasSourceMatchedAdditionalIssuerReview(job, today));
    const check = hasSourceMatchedAdditionalIssuerReview;
    assert.equal(check({ ...job, verifiedAt: "2026-07-01" }, today), false);
    assert.equal(check({ ...job, kind: "vacancy", status: "open" }, today), false);
    assert.equal(check({ ...job, posting: {jobTitle:"Invented", datePosted: today, locations: []} }, today), false);
    assert.equal(check({ ...job, summary: "Generic directory copy" }, today), false);
    assert.equal(check({ ...job, applicationSteps: job.applicationSteps.slice(0, 2) }, today), false);
    assert.equal(check({ ...job, sources: [] }, today), false);
    assert.equal(check({ ...job, sourceNotes: [] }, today), false);
    assert.equal(check({ ...job, officialUrl: "https://invalid.example" }, today), false);
  }
  const plain = getJobOpportunity("dangote-group-careers");
  assert.ok(plain && !hasSourceMatchedAdditionalIssuerReview(plain, today));
  assert.equal(hasCompletedIssuerDirectoryReview(plain, today), false);
});

test("original 20 completed-review decisions and all manual checks are preserved", () => {
  const originalCompleted = jobOpportunities.filter(job =>
    isIndexableJobOpportunity(job) && hasCompletedIssuerDirectoryReview(job, today));
  assert.equal(originalCompleted.length, 20);
  const additional = jobOpportunities.filter(job =>
    isIndexableJobOpportunity(job) && hasSourceMatchedAdditionalIssuerReview(job, today));
  assert.equal(additional.length, 42);
  assert.ok(additional.every(job => !originalCompleted.some(old => old.slug === job.slug)));
});
