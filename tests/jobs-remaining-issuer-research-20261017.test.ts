import test from "node:test";
import assert from "node:assert/strict";
import { getJobOpportunity, isIndexableJobOpportunity } from "../lib/jobs";
import { remainingIssuerResearch20261017, remainingIssuerResearchSlugs20261017 } from "../lib/job-remaining-issuer-research-2026-10-17";

test("13 new employer-source research pages survive every earlier editorial layer", () => {
  assert.equal(remainingIssuerResearchSlugs20261017.length, 13);
  assert.equal(new Set(remainingIssuerResearchSlugs20261017).size, 13);
  for (const slug of remainingIssuerResearchSlugs20261017) {
    const item = getJobOpportunity(slug);
    const review = remainingIssuerResearch20261017[slug];
    assert.ok(item, slug);
    assert.equal(item.kind, "career-page", slug);
    assert.equal(item.status, "career-page", slug);
    assert.equal(item.deadline, undefined, slug);
    assert.equal(item.officialUrl, review.originalUrl, slug);
    assert.equal(item.verifiedAt, "2026-10-17", slug);
    assert.equal(item.summary, review.answer, slug);
    assert.equal(item.applicationSteps.length, 5, slug);
    assert.deepEqual(item.applicationSteps.slice(0, 3), review.actions, slug);
    assert.ok(item.sourceNotes.includes(review.caution), slug);
    assert.ok(item.sources.some(src => src.url === review.originalUrl && src.lastChecked === "2026-10-17"), slug);
    if (review.evidenceUrl) assert.ok(item.sources.some(src => src.url === review.evidenceUrl), slug);
    assert.equal(isIndexableJobOpportunity(item), true, slug);
  }
});

test("historic university recruitments and campus programmes cannot masquerade as open intakes", () => {
  const lasu = getJobOpportunity("lasucom-academic-careers");
  assert.ok(lasu);
  assert.match(lasu.summary, /24 August 2026/);
  assert.match(lasu.statusLabel, /passed/i);
  assert.equal(lasu.status, "career-page");
  const abu = getJobOpportunity("ahmadu-bello-university-careers");
  assert.ok(abu);
  assert.match(abu.statusLabel, /no vacancies/i);
  const unn = getJobOpportunity("university-nigeria-nsukka-careers");
  assert.ok(unn);
  assert.match(unn.summary, /2025/);
  assert.match(unn.statusLabel, /historical 2025/i);
  assert.match(getJobOpportunity("maersk-nigeria-careers")!.summary, /Danish/);
});
