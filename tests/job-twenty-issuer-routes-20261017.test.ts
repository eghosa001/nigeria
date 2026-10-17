import test from "node:test";
import assert from "node:assert/strict";
import { getJobOpportunity } from "../lib/jobs";
import { checkedIssuerCareerSlugs20261017, twentyIssuerCareerRoutes20261017 } from "../lib/job-issuer-twenty-reviews-2026-10-17";

test("twenty existing employer portals give distinct verified source-first applicant guidance", () => {
  assert.equal(checkedIssuerCareerSlugs20261017.length, 20);
  assert.equal(new Set(checkedIssuerCareerSlugs20261017).size, 20);
  for (const slug of checkedIssuerCareerSlugs20261017) {
    const expected = twentyIssuerCareerRoutes20261017[slug];
    const record = getJobOpportunity(slug);
    assert.ok(record, slug);
    assert.equal(record.kind, "career-page", slug);
    assert.equal(record.status, "career-page", slug);
    assert.equal(record.deadline, undefined, slug);
    assert.equal(record.officialUrl, expected.source, slug);
    assert.equal(record.summary, expected.answer, slug);
    assert.equal(record.verifiedAt, "2026-10-17", slug);
    assert.equal(record.applicationSteps.length, 4, slug);
    assert.deepEqual(record.applicationSteps.slice(0, 3), expected.steps, slug);
    assert.ok(record.sourceNotes.includes(expected.caveat), slug);
    assert.ok(record.sources.some(source => source.url === expected.source && source.lastChecked === "2026-10-17"), slug);
    assert.match(record.nextMilestone ?? "", /\S/, slug);
  }
});
