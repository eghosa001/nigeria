import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("Moonshot's canonical Lagos guide is substantive and matches official 2026 dates", () => {
  const source = read("lib/explore-moonshot-techcabal-2026-10-14.ts");
  assert.match(source, /"slug": "moonshot-techcabal-lagos-2026"/);
  assert.match(source, /28–29 October 2026/);
  assert.match(source, /National Theatre/);
  assert.match(source, /"kind": "event"/);
  assert.match(source, /https:\/\/moonshot\.techcabal\.com\//);
  assert.match(source, /"lastReviewed": "2026-10-14"/);
  assert.ok(source.split(/\s+/).length >= 850, "event guide must answer substantive traveller questions");
});

test("Moonshot appears once through existing Tour Nigeria catalog and upcoming events", () => {
  const events = read("lib/explore-trend-events-2026-10-08.ts");
  const featured = read("lib/explore-event-featured.ts");
  assert.match(events, /moonshotTechCabalGuide20261014/);
  assert.match(featured, /"moonshot-techcabal-lagos-2026": "2026-10-29"/);
  const places = read("lib/explore-trend-event-places.ts");
  const mapped = places.match(/"guideSlug": "moonshot-techcabal-lagos-2026"/g) ?? [];
  assert.equal(mapped.length, 3, "Tour Nigeria requires three grounded visitor waypoints");
  assert.match(places, /National Theatre Blue Line Rail Station/);
  assert.match(places, /J\. Randle Centre for Yoruba Culture and History/);

});
