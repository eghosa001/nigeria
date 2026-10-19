import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { generateSitewideReview } from "../scripts/gsc-sitewide-review.mjs";

// Synthetic data only: never check private Search Console page/query exports
// into this public GitHub repository.
const fixture = {
  site: "sc-domain:example.com",
  period: { startDate: "2026-09-19", endDate: "2026-10-16" },
  coverage: { note: "Synthetic test rows." },
  pages: [
    ["https://example.com/services/registration", 1000, 2, 0.2, 8],
    ["https://example.com/entertainment/movies/film", 500, 8, 1.6, 6],
    ["https://example.com/jobs/graduate-role", 150, 1, 0.7, 10],
    ["https://example.com/explore/destination", 120, 0, 0, 10],
    ["https://example.com/services/high-ctr", 150, 20, 13.33, 5],
  ],
  queries: [
    ["how do I register", 900, 1, 0.11, 8],
    ["film cast", 600, 0, 0, 6],
  ],
  overlaps: [
    { query: "same search intent", impressions: 100, clicks: 0, entropy: 1.0,
      pages: [["https://example.com/services/registration", 60, 0, 10],
        ["https://example.com/services/second-route", 40, 0, 12]] },
  ],
};

test("review runs across all four pillars without deleting or assuming duplicates", () => {
  const result = generateSitewideReview(fixture);
  assert.equal(result.analyzed.pages, 5);
  assert.equal(result.analyzed.queries, 2);
  assert.equal(result.analyzed.overlappingQueries, 1);
  for (const pillar of ["Services", "Movies & Entertainment", "Tour Nigeria", "Jobs & Careers"]) {
    assert.ok(result.byPillar[pillar].measuredPages > 0);
    assert.ok(result.byPillar[pillar].priorityQueue.every(p => p.pillar === pillar));
  }
  assert.equal(result.byPillar.Services.reviewCandidates, 1);
  assert.match(result.overlappingQueriesToReview[0].reviewReason, /Compare visitor intent/);
});

test("public detail titles prevent repeated branded suffix", () => {
  for (const path of [
    "../app/entertainment/movies/[slug]/page.tsx",
    "../app/entertainment/series/[slug]/page.tsx",
    "../app/jobs/[slug]/page.tsx",
    "../app/entertainment/youtube/[videoId]/page.tsx"
  ]) assert.match(readFileSync(new URL(path, import.meta.url), "utf8"), /title:\s*\{\s*absolute:/);
});
