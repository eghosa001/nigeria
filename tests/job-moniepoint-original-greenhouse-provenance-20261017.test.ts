import test from "node:test";
import assert from "node:assert/strict";
import { getJobOpportunity } from "../lib/jobs";
import { buildJobPostingJsonLd } from "../lib/job-runtime";
import {
  originalMoniepointAtsProof20261017 as evidence,
  hasCompletedMoniepointAtsReview20261017 as verified,
} from "../lib/job-moniepoint-greenhouse-publication-2026-10-17";

test("five original ATS timestamps and live forms require unchanged issuer evidence", () => {
  assert.equal(Object.keys(evidence).length, 5);
  for (const [slug, proof] of Object.entries(evidence)) {
    const job = getJobOpportunity(slug);
    assert.ok(job, slug);
    assert.equal(job.posting?.datePosted, proof.firstPublished, slug);
    assert.equal(verified(job, "2026-10-17"), true, slug);
    assert.equal(job.deadline, undefined);
    assert.equal(buildJobPostingJsonLd(job, "https://mynigeriaguide.com/jobs/" + slug), null);
    assert.equal(verified({ ...job, sources: [] }, "2026-10-17"), false);
    assert.equal(verified({ ...job, posting: { ...job.posting!, datePosted: "2026-10-17" } }, "2026-10-17"), false);
    assert.equal(verified({ ...job, applicationSteps: [] }, "2026-10-17"), false);
    assert.equal(verified(job, "2026-11-02"), false);
  }
});
