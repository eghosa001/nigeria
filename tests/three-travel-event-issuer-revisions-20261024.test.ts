import assert from "node:assert/strict";
import test from "node:test";
import { getExploreGuide } from "../lib/explore";
import { featuredEventEndDates, getUpcomingEventGuides } from "../lib/explore-event-featured";

test("CAC BOAR postponed November meeting cannot be treated as a live November conference", () => {
  const guide = getExploreGuide("beneficial-ownership-asset-recovery-conference-2026");
  assert.ok(guide);
  assert.equal(guide.lastReviewed, "2026-10-24");
  assert.equal(guide.source?.href, "https://boconference.cac.gov.ng/notice");
  assert.match(guide.summary, /postponed|June 2027/i);
  assert.match(guide.summary, /Exact June dates have not been announced/);
  assert.match(guide.planning.map(x => x.detail).join(" "), /registrations? and payment|registration.*payment|registrations and payments/i);
  assert.doesNotMatch(guide.summary, /Plan for the CAC-led.*8–11 November/i);
  assert.ok(guide.highlights.every(x => !/Early bird to 15 October/.test(x.name)));
  assert.equal(featuredEventEndDates[guide.slug], undefined, "unknown rescheduled dates cannot be featured as November event");
});

test("African traditional food fair 2026 keeps Friday context but does not advertise a concluded fair", () => {
  const guide = getExploreGuide("african-traditional-food-fair-abuja-2026");
  assert.ok(guide);
  assert.equal(guide.lastReviewed, "2026-10-24");
  assert.match(guide.summary, /over|past/i);
  assert.match(guide.intro.join(" "), /16–17 October/);
  assert.match(guide.planning.map(x => x.detail).join(" "), /has passed|already past|passed/i);
  assert.ok(guide.sources?.some(x => x.href.startsWith("https://nannews.ng/african-food-fair")));
  assert.ok(!guide.planning.some(x => /Register using the organiser/.test(x.label)));
  assert.ok(!getUpcomingEventGuides([guide], "2026-10-24").length);
});

test("Creator conference shows Friday ticket and unresolved Saturday, not imaginary two-day access", () => {
  const guide = getExploreGuide("african-creators-conference-abuja-2026");
  assert.ok(guide);
  assert.equal(guide.lastReviewed, "2026-10-24");
  assert.match(guide.summary, /30–31 October/);
  assert.match(guide.summary, /Friday 30 October/);
  assert.match(guide.summary, /7:30 a\.m\./);
  assert.match(guide.planning.map(x => x.detail).join(" "), /Saturday|31 October/);
  assert.ok(guide.sources?.some(x => x.href.includes("eventbrite.com/e/african-creators-conference-20")));
  assert.equal(featuredEventEndDates[guide.slug], "2026-10-30");
  assert.deepEqual(getUpcomingEventGuides([guide], "2026-10-24").map(x => x.slug), [guide.slug]);
});
