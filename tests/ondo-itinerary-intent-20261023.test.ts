import assert from "node:assert/strict";
import test from "node:test";
import { exploreGuides } from "../lib/explore";

test("Ondo overview and Idanre–Owo road-trip page retain distinct intents and URLs", () => {
  const overview = exploreGuides.find(item => item.slug === "ondo-state-highlights");
  const itinerary = exploreGuides.find(item => item.slug === "ondo-nature-heritage");
  assert.ok(overview && itinerary);
  assert.equal(overview.kind, "destination");
  assert.equal(itinerary.kind, "itinerary");
  assert.notEqual(overview.title, itinerary.title);
  assert.match(itinerary.title, /Idanre.*Owo.*Akure/);
  assert.match(itinerary.summary, /separate visits.*Check access/i);
  assert.match(itinerary.intro.join(" "), /distinct day trips/);
  assert.ok(itinerary.planning.some(item => /Idanre/i.test(item.label)));
  assert.equal(itinerary.lastReviewed, "2026-10-07");
});
