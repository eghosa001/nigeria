import assert from "node:assert/strict";
import test from "node:test";
import { publicServices } from "../lib/data";
import { getJobOpportunity } from "../lib/jobs";
import { getEffectiveJobStatus } from "../lib/job-runtime";
import { getEntertainmentTitle } from "../lib/entertainment";
import { exploreGuides } from "../lib/explore";

test("passport tracker removes only repeated notes and keeps distinct receipt and collection guidance", () => {
  const guide = publicServices.find(item => item.slug === "passport-application-tracking");
  assert.ok(guide);
  assert.equal(guide.notes.length, 3);
  assert.ok(guide.notes.some(note => /Payment Status\/Print Receipt/i.test(note)));
  assert.ok(guide.notes.some(note => /PRODUCED.*READY FOR COLLECTION/i.test(note)));
  assert.equal(new Set(guide.notes).size, guide.notes.length);
});

test("Reckitt Trailblazers is closed in runtime and source wording", () => {
  const job = getJobOpportunity("reckitt-nigeria-management-trainee-2026");
  assert.ok(job);
  assert.equal(getEffectiveJobStatus(job, "2026-10-21"), "closed");
  assert.match(job.summary, /position has been filled/i);
  assert.match(job.nextMilestone ?? "", /filled/i);
  assert.ok(job.sources.some(source => /reckitt\.com/i.test(source.url)));
});

test("Ondo itinerary and statewide guide have distinct titles", () => {
  const itinerary = exploreGuides.find(item => item.slug === "ondo-nature-heritage");
  const statewide = exploreGuides.find(item => item.slug === "ondo-state-highlights");
  assert.ok(itinerary && statewide);
  assert.notEqual(itinerary.title, statewide.title);
  assert.equal(itinerary.kind, "itinerary");
  assert.equal(statewide.kind, "destination");
  assert.match(itinerary.title, /Idanre.*Owo.*Akure/i);
  assert.match(itinerary.summary, /separate visits.*Check access/i);
  assert.match(statewide.title, /Ondo State Nature & Heritage Guide/i);
});

test("Oversabi keeps evidence separate from viewing availability", () => {
  const movie = getEntertainmentTitle("oversabi-aunty");
  assert.ok(movie);
  assert.equal(movie.watchLinks.some(link => link.platform === "Netflix"), false);
  assert.ok(movie.references?.some(ref => ref.href === "https://www.netflix.com/tudum/top10/nigeria"));
  assert.ok(movie.references?.every(ref => !ref.href.includes("/ng/title/82741545")));
});
