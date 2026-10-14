import assert from "node:assert/strict";
import test from "node:test";
import { assessEditorialCandidate, sortEditorialCandidates } from "../lib/editorial-triage";
import { getJobFreshnessLabel } from "../lib/job-runtime";

const base = {
  pillar: "Services" as const,
  url: "/services/test",
  title: "Test guide",
  words: 350,
  sourceCount: 2,
  issues: [],
  pageType: "editorial-guide" as const,
};

test("editorial queue flags conflicting, future and old evidence without declaring facts false", () => {
  const future = assessEditorialCandidate({ ...base, checkedAt: "2026-10-15" }, "2026-10-14");
  const stale = assessEditorialCandidate({ ...base, checkedAt: "2026-09-01" }, "2026-10-14");
  const conflict = assessEditorialCandidate({ ...base, issues: ["official-information-conflict"] }, "2026-10-14");
  assert.equal(future.priority, "urgent");
  assert.ok(future.reviewFlags.includes("future-review-date"));
  assert.ok(stale.reviewFlags.includes("source-date-recheck"));
  assert.equal(conflict.priority, "urgent");
  assert.equal(sortEditorialCandidates([stale, future])[0].url, future.url); // stable tie
});

test("brief records and missing sources are review leads, not automatic factual verdicts", () => {
  const result = assessEditorialCandidate({ ...base, words: 80, sourceCount: 0 }, "2026-10-14");
  assert.ok(result.reviewFlags.includes("brief-authored-guide"));
  assert.ok(result.reviewFlags.includes("no-recorded-source"));
  assert.ok(!result.reviewFlags.includes("factually-wrong"));
});

test("job check labels never treat future or invalid dates as verified today", () => {
  const job = (verifiedAt: string) => ({ verifiedAt } as Parameters<typeof getJobFreshnessLabel>[0]);
  assert.equal(getJobFreshnessLabel(job("2026-10-14"), "2026-10-14"), "Checked today");
  assert.equal(getJobFreshnessLabel(job("2026-10-13"), "2026-10-14"), "Checked yesterday");
  assert.match(getJobFreshnessLabel(job("2026-10-20"), "2026-10-14"), /employer's site/);
  assert.match(getJobFreshnessLabel(job("2026-02-30"), "2026-10-14"), /employer's site/);
  assert.match(getJobFreshnessLabel(job("invalid"), "2026-10-14"), /employer's site/);
});
