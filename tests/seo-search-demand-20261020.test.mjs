import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const service = readFileSync("app/services/[slug]/page.tsx", "utf8");
const tour = readFileSync("app/explore/[slug]/page.tsx", "utf8");
const collector = readFileSync("tools/google-autocomplete-research.mjs", "utf8");

test("evergreen service metadata does not turn verification dates into edition years or promise universal fees", () => {
  const fn = service.split("function getServiceSeoTitle(")[1].split("export async function generateMetadata")[0];
  assert.doesNotMatch(fn, /lastVerified|Fees & Steps|\+ year/);
  assert.match(fn, /Official Portal & Next Steps/);
  assert.match(fn, /Documents & Official Steps/);
  assert.match(fn, /Booking & Requirements/);
  assert.match(fn, /Eligibility & Official Process/);
  assert.match(service, /getServiceSeoTitleOverride\(service.slug, year\)/);
  assert.match(service, /alternates: \{ canonical: "\/services\/" \+ service.slug \}/);
});

test("travel metadata keeps specific event years but avoids fabricated freshness and count in generic pages", () => {
  const fn = tour.split("function getExploreSeoTitle(")[1].split("const exploreDescriptionOverrides")[0];
  assert.doesNotMatch(fn, /guide\.lastReviewed\.slice/);
  assert.doesNotMatch(fn, /getExplorePlacesForGuide\(guide.slug\)\.length/);
  assert.match(fn, /calabar-carnival-2026/);
  assert.match(fn, /Dates, Venue & Visit Guide/);
  assert.match(fn, /Things to Do & Places to Visit/);
});

test("fresh search research samples all four established pillars and never publishes or invents volumes", () => {
  for (const q of [
    "nigeria tax id retrieval nin cac",
    "nigerian passport tracking status",
    "detty december fest lagos tickets",
    "design week lagos october 2026",
    "nysc ppa opportunities nigeria",
    "graduate trainee nigeria applications 2026",
    "october 2026 nollywood cinema movies",
    "where to watch new nigerian movies legally",
  ]) assert.ok(collector.includes(q), q);
  assert.match(collector, /gl: "ng"/);
  assert.match(collector, /source: "Google Search Suggest/);
  assert.doesNotMatch(collector, /autoPublish|publishToWebsite|updatePage/);
});
