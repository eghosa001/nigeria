import test from "node:test";
import assert from "node:assert/strict";
import { seriesTitles } from "../lib/series";
import { seriesReaderDecisions20261017 } from "../lib/series-reader-decisions-2026-10-17";
import { getJobOpportunity } from "../lib/jobs";
import { moniepointRoleFollowups20261017 } from "../lib/job-moniepoint-exact-roles-2026-10-16";

test("all ten existing series explain the actual official viewing route", () => {
  assert.equal(seriesTitles.length, 10);
  for (const show of seriesTitles) {
    const review = seriesReaderDecisions20261017[show.slug];
    assert.ok(review, show.slug);
    assert.ok(review.answer.length > 120 && review.decision.length > 95);
    assert.ok(review.limit.length > 105);
    assert.ok(show.watchLinks.every(link => link.href.startsWith("https://")));
  }
});

test("six Moniepoint role-specific checks preserve source, identity and uncertainty", () => {
  assert.equal(Object.keys(moniepointRoleFollowups20261017).length, 6);
  for (const [slug, review] of Object.entries(moniepointRoleFollowups20261017)) {
    const job = getJobOpportunity(slug);
    assert.ok(job, slug);
    assert.equal(job.officialUrl, "https://moniepoint.com/careers/roles/" + review.id);
    assert.equal(job.verifiedAt, "2026-10-17");
    assert.ok(job.sourceNotes.includes(review.decision));
    assert.ok(job.applicationSteps.includes(review.action));
    assert.ok(job.sourceNotes.some(note => note.includes("does not prove")));
    assert.equal(job.deadline, undefined);
  }
});
