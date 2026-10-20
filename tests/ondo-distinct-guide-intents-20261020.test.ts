import assert from "node:assert/strict";
import test from "node:test";
import { exploreGuides } from "../lib/explore";

test("Ondo destination overview and road-trip itinerary have distinct reader intents", () => {
  const overview = exploreGuides.find(item => item.slug === "ondo-state-highlights");
  const trip = exploreGuides.find(item => item.slug === "ondo-nature-heritage");
  assert.ok(overview && trip);
  assert.equal(overview.kind, "destination");
  assert.equal(trip.kind, "itinerary");
  assert.notEqual(overview.title, trip.title);
  assert.match(trip.title, /Idanre.*Owo.*Akure/);
  assert.match(trip.summary, /separate visits.*Akure as a base/i);
  assert.ok(trip.planning.some(item => /Idanre/i.test(item.label + " " + item.detail)));
  assert.ok(trip.source?.href.includes("ondostate.gov.ng"));
  assert.ok(overview.highlights.some(item => /Owo/i.test(item.name)));
});
