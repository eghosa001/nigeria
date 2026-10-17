import test from "node:test";
import assert from "node:assert/strict";
import { exploreGuides } from "../lib/explore";
import { tourSourceSafetyDecisions20261017 } from "../lib/explore-tour-evidence-safety-2026-10-17";

test("15 existing Tour guides present source-backed access decisions", () => {
  assert.equal(Object.keys(tourSourceSafetyDecisions20261017).length, 15);
  for (const [slug, decision] of Object.entries(tourSourceSafetyDecisions20261017)) {
    const guide = exploreGuides.find(item => item.slug === slug);
    assert.ok(guide, slug);
    assert.equal(guide.intro[0], decision.context, slug + " first useful context");
    if (decision.summary) assert.equal(guide.summary, decision.summary, slug + " summary");
    assert.ok(guide.planning.some(item => item.label === decision.planning.label && item.detail === decision.planning.detail), slug + " plan");
    for (const source of [decision.source, ...(decision.additionalSources ?? [])]) {
      assert.ok(guide.sources?.some(item => item.href === source.href) || guide.source?.href === source.href, slug + " source");
    }
    assert.equal(guide.lastReviewed, decision.reviewedAt ?? "2026-10-17", slug);
  }
});
