import assert from "node:assert/strict";
import test from "node:test";
import { getExploreGuide } from "../lib/explore";

test("SMFest Abuja 2026 is an event archive, not an active ticket invitation", () => {
  const guide = getExploreGuide("smfest-abuja-2026");
  assert.ok(guide);
  assert.equal(guide.kind, "event");
  assert.equal(guide.lastReviewed, "2026-10-24");
  assert.match(guide.summary, /dates have passed/);
  assert.match(guide.summary, /17–18 October 2026/);
  assert.doesNotMatch([guide.summary, ...guide.intro, ...guide.planning.map(p => p.detail)].join(" "), /ticket tiers currently run|before paying for an extra night|Buy only from the organiser/);
  assert.ok(guide.sources?.some(s => s.href === "https://smfest.org/contact/"));
  assert.ok(guide.sources?.some(s => s.href === "https://smfest.org/about/"));
  assert.match(guide.intro.join(" "), /16–18 October/);
  assert.match(guide.planning[0].detail, /concluded edition/);
});
