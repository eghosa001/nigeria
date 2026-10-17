import test from "node:test";
import assert from "node:assert/strict";
import { exploreGuides } from "../lib/explore";
import { independentlyCheckedEvents20261017 } from "../lib/explore-independent-event-verification-2026-10-17";

test("thirteen canonical event guides include a distinct dated source and specific visitor action", () => {
  const reviewed = Object.entries(independentlyCheckedEvents20261017);
  assert.equal(reviewed.length, 13);
  for (const [slug, evidence] of reviewed) {
    const matches = exploreGuides.filter(item => item.slug === slug);
    assert.equal(matches.length, 1, slug + ": canonical page");
    const guide = matches[0];
    assert.equal(guide.kind, "event", slug + ": event type");
    assert.ok(guide.intro.includes(evidence.context), slug + ": independent research visible");
    assert.ok(guide.planning.some(item => item.label === evidence.planning.label && item.detail === evidence.planning.detail), slug + ": reader decision");
    assert.ok([guide.source?.href, ...(guide.sources ?? []).map(item => item.href)].includes(evidence.source.href), slug + ": checked source");
    assert.equal(guide.lastReviewed, "2026-10-17", slug + ": review date");
    const allUrls = [guide.source?.href, ...(guide.sources ?? []).map(item => item.href)];
    assert.equal(allUrls.length, new Set(allUrls).size, slug + ": no duplicate citations");
    if (evidence.summary) assert.equal(guide.summary, evidence.summary, slug + ": past event correction");
  }
});

test("expired literature ticket and conflicting investor summit dates are not advertised as verified", () => {
  const literature = exploreGuides.find(item => item.slug === "abuja-festival-literature-ideas-2026");
  const summit = exploreGuides.find(item => item.slug === "investors-summit-nigeria-abuja-2026");
  assert.ok(literature?.summary.includes("dates have now passed"));
  assert.ok(summit?.intro.some(item => item.includes("four-day event") && item.includes("conflict")));
});
