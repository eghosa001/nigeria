import assert from "node:assert/strict";
import test from "node:test";
import { exploreGuides } from "../lib/explore";
import { explorePlaces } from "../lib/explore-places";

test("Design Week Lagos 2026 is an ended, sourced archive rather than a live ticket guide", () => {
  const guide = exploreGuides.find((item) => item.slug === "design-week-lagos-2026");
  assert.ok(guide, "preserve the existing canonical itinerary");
  assert.equal(guide.lastReviewed, "2026-10-26");
  assert.match(guide.summary, /18–25 October 2026 dates have passed/);
  assert.match(guide.summary, /Hall programme as ended/);
  assert.match(guide.summary, /not a current ticket offer or proof that every session took place/);
  assert.equal(guide.intro.length, 1, "do not repeat ended-event status in a second introduction");
  assert.match(guide.title, /Past Dates/);
  const hall = guide.highlights.find((item) => item.name === "National Theatre, Iganmu");
  assert.ok(hall);
  assert.match(hall.detail, /not current visiting hours or a bookable session/);
  assert.doesNotMatch(guide.highlights.map((item) => item.detail).join(" "), /verify the registration confirmation for your session|official website publishes this eight-day window/i);
  assert.doesNotMatch(guide.intro.join(" "), /industrialisation and architecture on 22 October/, "do not duplicate day-by-day highlights in the introduction");
  assert.match(guide.planning[0].detail, /marks the 2026 event as ended/);
  assert.equal(guide.planning.length, 4, "retain four distinct practical visitor decisions");
  assert.match(guide.planning[3].detail, /no photos or videos are available/);
  assert.doesNotMatch(guide.planning.map((p) => p.label).join(" "), /Which hall date should you book|Register with the official event partner/);
  assert.ok(guide.planning.every((p) => !/buy a ticket|book the 2026|pay for admission/i.test(p.detail) || /Do not pay|No\./.test(p.detail)));
  assert.equal(new Set(guide.planning.map((p) => p.label)).size, guide.planning.length);
  const urls = new Set([guide.source?.href, ...(guide.sources ?? []).map((source) => source.href)]);
  for (const url of [
    "https://designweeklagos.com/",
    "https://designweeklagos.com/faq/",
    "https://nationaltheatre.gov.ng/whatson",
    "https://nationaltheatre.gov.ng/event/gallery/design-week-lagos-2026/XzBl38MQ",
    "https://nationaltheatre.gov.ng/event/register/design-week-lagos-2026/XzBl38MQ",
  ]) assert.ok(urls.has(url), "missing issuer evidence: " + url);
  assert.equal(new Set(guide.intro).size, guide.intro.length);
  const theatre = explorePlaces.find((place) => place.slug === "national-theatre-design-week-lagos-2026");
  assert.ok(theatre, "retain the existing venue and shared-place canonical");
  assert.match(theatre.cost ?? "", /2026 festival has ended/);
  assert.match(theatre.hours ?? "", /not current National Theatre opening hours/);
  assert.equal(theatre.website, "https://nationaltheatre.gov.ng/whatson");
  assert.equal(theatre.checkedAt, "2026-10-28", "live venue source checked on 28 October");
});
