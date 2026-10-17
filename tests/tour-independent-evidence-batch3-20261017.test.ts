import test from "node:test";
import assert from "node:assert/strict";
import { exploreGuides } from "../lib/explore";
import { furtherIndependentVisitorEvidence20261017 } from "../lib/explore-independent-reviews-batch3-2026-10-17";

test("twenty existing Tour guides retain canonical and independent decision context", () => {
  const reviews = Object.entries(furtherIndependentVisitorEvidence20261017);
  assert.equal(reviews.length, 20, "batch size");
  for (const [slug, review] of reviews) {
    const matches = exploreGuides.filter(guide => guide.slug === slug);
    assert.equal(matches.length, 1, slug + ": one canonical");
    const guide = matches[0];
    assert.ok(guide.sources?.some(source => source.href === review.source.href), slug + ": source");
    assert.ok(guide.intro.includes(review.context), slug + ": context");
    assert.ok(guide.planning.some(p => p.label === review.decision.label && p.detail === review.decision.detail), slug + ": practical decision");
    assert.equal(guide.lastReviewed, "2026-10-17", slug + ": freshness");
  }
});
