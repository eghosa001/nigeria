import test from "node:test";
import assert from "node:assert/strict";
import { exploreGuides } from "../lib/explore";
import { independentlyCheckedVisitorRoutesBatch4 } from "../lib/explore-independent-heritage-water-batch4-2026-10-17";

test("fourteen heritage and water guides retain source-specific visitor decisions", () => {
  const updates = Object.entries(independentlyCheckedVisitorRoutesBatch4);
  assert.equal(updates.length, 14);
  for (const [slug, updated] of updates) {
    const matches = exploreGuides.filter(item => item.slug === slug);
    assert.equal(matches.length, 1, slug + " must have exactly one canonical");
    const guide = matches[0];
    assert.ok(guide.sources?.some(x => x.href === updated.source.href), slug + " independent link");
    assert.ok(guide.intro.includes(updated.context), slug + " independently sourced context");
    assert.ok(guide.planning.some(x => x.label === updated.planning.label && x.detail === updated.planning.detail), slug + " visitor decision");
    assert.equal(guide.lastReviewed, "2026-10-17", slug + " dated review");
    const urls = [guide.source?.href, ...(guide.sources ?? []).map(x => x.href)];
    assert.equal(urls.length, new Set(urls).size, slug + " unique sources");
  }
});
