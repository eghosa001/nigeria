import assert from "node:assert/strict";
import test from "node:test";
import { exploreGuides } from "../lib/explore";

test("Ondo statewide road trip and hill-heritage itinerary communicate distinct visitor intents", () => {
  const hills = exploreGuides.find(x => x.slug === "ondo-nature-heritage");
  const state = exploreGuides.find(x => x.slug === "ondo-state-highlights");
  assert.ok(hills && state);
  assert.notEqual(hills.slug, state.slug);
  assert.notEqual(hills.title, state.title);
  assert.match(hills.title, /Hills and Heritage Route/);
  assert.match(state.title, /State Road Trip/);
  assert.ok(hills.highlights.some(x => /Igbokoda Waterfront/i.test(x.name)));
  assert.ok(state.highlights.some(x => /Dry-season travel/i.test(x.name)));
  assert.ok(state.summary.includes("Idanre Hills"));
  assert.ok(hills.source?.href && state.source?.href);
  assert.ok(hills.lastReviewed && state.lastReviewed);
});
