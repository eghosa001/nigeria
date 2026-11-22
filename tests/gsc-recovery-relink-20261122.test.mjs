import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Protect the previously discoverable, established canonical guides that
// were later reported "Crawled - currently not indexed" in Search Console.
const home = readFileSync("app/page.tsx", "utf8");
const services = readFileSync("app/services/page.tsx", "utf8");
const entertainment = readFileSync("app/entertainment/page.tsx", "utf8");
const movies = readFileSync("app/entertainment/movies/page.tsx", "utf8");
const sitemap = readFileSync("lib/sitemap-sections.ts", "utf8");

test("homepage restores crawlable internal links to established guides", () => {
  const priority = [
    "/entertainment/movies/oversabi-aunty",
    "/entertainment/movies/millionaire-until-morning",
    "/entertainment/movies/agbara-nla-the-return",
    "/entertainment/series/afobaje-2026",
    "/services/ican-professional-exam-registration",
    "/services/mtn-sim-swap-replacement",
    "/services/passport-application-tracking",
    "/services/police-character-certificate",
    "/services/aedc-map-refund",
  ];
  for (const path of priority) assert.ok(home.includes(path), "Homepage missing " + path);
});

test("topic hubs visibly expose the recovered canonical routes", () => {
  for (const slug of ["ican-professional-exam-registration", "mtn-sim-swap-replacement",
    "police-character-certificate", "passport-application-tracking", "aedc-map-refund"]) {
    assert.ok(services.includes("/services/" + slug), "Services hub missing " + slug);
  }
  for (const slug of ["oversabi-aunty", "millionaire-until-morning", "agbara-nla-the-return"]) {
    assert.ok(entertainment.includes("/entertainment/movies/" + slug), "Entertainment hub missing " + slug);
  }
  for (const slug of ["millionaire-until-morning", "agbara-nla-the-return"]) {
    assert.ok(movies.includes("/entertainment/movies/" + slug), "Movie browse hub missing " + slug);
  }
  assert.ok(entertainment.includes("/entertainment/series/afobaje-2026"));
});

test("entertainment structured data only lists pages visibly linked from that hub", () => {
  assert.match(entertainment, /numberOfItems: visibleMovieLinks\.length/);
  assert.match(entertainment, /itemListElement: visibleMovieLinks\.map/);
  assert.doesNotMatch(entertainment, /numberOfItems: entertainmentTitles\.length/);
});

test("sitemap lastmod updates only the actually revised editorial hubs", () => {
  assert.match(sitemap, /path === "" \? latestDate\(\[latestHubModified, "2026-11-22"\]\)/);
  assert.match(sitemap, /base \+ "\/services", lastModified: latestDate\(\[serviceModified, "2026-11-22"\]\)/);
  assert.match(sitemap, /base \+ "\/entertainment\/movies", lastModified: latestDate\(\[movieCatalogModified, "2026-11-22"\]\)/);
});
