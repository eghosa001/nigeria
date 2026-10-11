import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const load = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("Founder Dojo Imo Cohort 2 uses the official November 2 deadline, not an inferred vacancy", () => {
  const job = load("lib/job-founder-dojo-imo-2026-10-11.ts");
  assert.match(job, /slug: "founder-dojo-imo-cohort-two-2026"/);
  assert.match(job, /kind: "programme"/);
  assert.match(job, /deadline: "2026-11-02"/);
  assert.match(job, /Monday 19 October/);
  assert.match(job, /https:\/\/www\.imodigitalcity\.com\/founder-dojo\/cohort-2/);
  assert.doesNotMatch(job, /\bposting:\s*\{/);
  assert.match(load("lib/jobs.ts"), /\.\.\.founderDojoImoCohortTwo/);
  assert.match(load("app/jobs/page.tsx"), /\/jobs\/founder-dojo-imo-cohort-two-2026/);
});

test("Lagos chess announcement clearly identifies October 2027, with no invented tickets", () => {
  const events = load("app/explore/events/page.tsx");
  assert.match(events, /Lagos International Chess Festival 2027/);
  assert.match(events, /October 2027/);
  assert.match(events, /confirmed venue, booking/);
  assert.match(events, /lifestyle\.thecable\.ng\/tunde-onakoya/);
  assert.match(events, /not part of the confirmed 2026 festival calendar/);
});

test("Felabration retains two separate Lagos venues and source-proven festival context", () => {
  const tour = load("lib/explore.ts");
  assert.equal(tour.split('slug: "felabration-2026"').length - 1, 1);
  assert.match(tour, /New Afrika Shrine main programme/);
  assert.match(tour, /different entry terms and should not be confused|Freedom Park — 6 pm, ₦3,000 announced/);
  const page = load("app/entertainment/social-trends/page.tsx");
  assert.match(page, /von\.gov\.ng\/lagos-hosts-felabration-2026/);
});

test("four editorial discoveries link canonical routes while refusing fake live X rankings", () => {
  const trends = load("app/entertainment/social-trends/page.tsx");
  for(const link of [
    "/explore/events",
    "/jobs/founder-dojo-imo-cohort-two-2026",
    "/explore/felabration-2026",
    "/services/ninauth-nin-verification"
  ]) assert.ok(trends.includes('href: "' + link + '"'), link);
  assert.match(trends, /not evidence of a particular post's impressions/);
  assert.match(load("app/jobs/page.tsx"), /\/jobs\/founder-dojo-imo-cohort-two-2026/);
  assert.doesNotMatch(load("data/home-social-trends.ts"), /href: "\/jobs\/founder-dojo-imo-cohort-two-2026"/);
});
