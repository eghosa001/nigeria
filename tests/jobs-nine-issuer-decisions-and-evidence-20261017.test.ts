import assert from "node:assert/strict";
import test from "node:test";
import { jobOpportunities } from "../lib/jobs";
import { nineCareerIssuerDecisions20261017, nineCareerIssuerDecisionSlugs20261017 } from "../lib/job-nine-issuer-application-decisions-2026-10-17";
import { inspectEmployerDirectoryEvidence } from "../lib/job-directory-audit-evidence";

test("nine existing employer pages get distinct source-backed application decisions", () => {
  assert.equal(nineCareerIssuerDecisionSlugs20261017.length, 9);
  const leadTexts = new Set<string>();
  for (const slug of nineCareerIssuerDecisionSlugs20261017) {
    const item = jobOpportunities.find(x => x.slug === slug);
    const review = nineCareerIssuerDecisions20261017[slug];
    assert.ok(item, "existing canonical " + slug);
    assert.equal(item.kind, "career-page", slug);
    assert.equal(item.status, "career-page", slug);
    assert.equal(item.officialUrl, review.originalUrl, slug);
    assert.equal(item.deadline, undefined, slug);
    assert.equal(item.summary, review.answer, slug);
    assert.equal(item.applicationSteps.length, 5, slug);
    assert.equal(item.verifiedAt, "2026-10-17", slug);
    assert.ok(item.sources.some(source =>
      source.url === review.evidenceUrl && source.lastChecked === "2026-10-17"), slug);
    assert.ok(item.sourceNotes.some(note => note === review.caution), slug);
    leadTexts.add(item.summary);
  }
  assert.equal(leadTexts.size, 9);
});

test("directory evidence triage never equates recorded source with human approval", () => {
  const example = jobOpportunities.find(item => item.slug === "roche-nigeria-careers");
  assert.ok(example);
  const result = inspectEmployerDirectoryEvidence(example, "2026-10-17");
  assert.ok(result);
  assert.equal(result.checks.hasRecentDatedIssuerEvidence, true);
  assert.equal(result.requiresHumanSourceAndOriginalitySignoff, true);
  assert.equal(inspectEmployerDirectoryEvidence({ ...example, kind: "vacancy" }, "2026-10-17"), null);
  const stale = inspectEmployerDirectoryEvidence({
    ...example,
    sources: example.sources.map(source => ({ ...source, lastChecked: "2026-09-01" })),
  }, "2026-10-17");
  assert.ok(stale?.reviewFocus.includes("issuer-evidence-recheck-needed"));
});
