import test from "node:test";
import assert from "node:assert/strict";
import { exploreGuides } from "../lib/explore";
import { independentHeritageDecisions20261017 } from "../lib/explore-heritage-source-followups-2026-10-17";

test("25 source-backed heritage decisions keep correct canonical guides", () => {
  assert.equal(Object.keys(independentHeritageDecisions20261017).length, 25);
  for (const [slug, reviewed] of Object.entries(independentHeritageDecisions20261017)) {
    const guide = exploreGuides.find(item => item.slug === slug);
    assert.ok(guide, slug);
    assert.ok(guide.sources?.some(source => source.href === reviewed.source.href), slug + " source");
    assert.ok(guide.planning.some(item => item.label === reviewed.planning.label && item.detail === reviewed.planning.detail), slug + " decision");
    assert.ok(guide.intro.includes(reviewed.detail), slug + " context");
    assert.equal(guide.lastReviewed, "2026-10-17", slug);
  }
});
