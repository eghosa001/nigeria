import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const seo = readFileSync(new URL("../data/service-seo-overrides.ts", import.meta.url), "utf8");
const movie = readFileSync(new URL("../app/entertainment/movies/[slug]/page.tsx", import.meta.url), "utf8");
const services = JSON.parse(readFileSync(new URL("../data/services.json", import.meta.url), "utf8"));

function templates(name) {
  const body = seo.split(`export const ${name}: Record<string, string> = {`)[1]?.split("\n};")[0];
  assert.ok(body, `Missing ${name}`);
  return Object.fromEntries([...body.matchAll(/^  "([^"]+)": "([^"]+)",?$/gm)].map((match) => [match[1], match[2]]));
}

test("GSC opportunity snippets stay complete and within SERP limits", () => {
  const titles = templates("serviceSeoTitleTemplates");
  const descriptions = templates("serviceSeoDescriptionTemplates");
  const slugs = [
    "passport-application-tracking", "anambra-asin-registration",
    "ninauth-nin-verification", "nin-date-of-birth-modification",
    "nigeria-landing-exit-card", "nrs-individual-tax-registration",
    "inec-replace-lost-damaged-pvc", "lagos-lasrra-registration",
  ];
  for (const slug of slugs) {
    const service = services.find((item) => item.slug === slug);
    assert.ok(service?.sources?.length && service.status === "verified", slug);
    assert.ok(titles[slug] && descriptions[slug], slug);
    assert.ok(titles[slug].replaceAll("{year}", service.lastVerified.slice(0, 4)).length <= 60, slug);
    assert.ok(descriptions[slug].replaceAll("{year}", service.lastVerified.slice(0, 4)).length <= 155, slug);
  }
  assert.ok(titles["nin-date-of-birth-modification"].includes(
    services.find((item) => item.slug === "nin-date-of-birth-modification").feeLabel
  ), "NIN DOB title must use the source-checked fee");
});

test("high-impression movie snippet retains verifiable cast and watch intent", () => {
  const snippet = movie.match(/"oversabi-aunty": \{\s*title: "([^"]+)",\s*description: "([^"]+)"/);
  assert.ok(snippet);
  assert.ok(snippet[1].length <= 60);
  assert.ok(snippet[2].length <= 155);
  assert.match(snippet[1], /Oversabi Aunty.*Where to Watch/);
  assert.match(snippet[2], /Toyin Abraham/);
  assert.match(snippet[2], /official trailer and where-to-watch status/i);
});

test("October zero-click service snippets reflect official routes and fit search results", () => {
  const titles = templates("serviceSeoTitleTemplates");
  const descriptions = templates("serviceSeoDescriptionTemplates");
  for (const slug of ["ibedc-map-refund", "western-union-track-transfer-nigeria", "spotify-premium-nigeria"]) {
    assert.ok(titles[slug] && descriptions[slug], slug);
    assert.ok(titles[slug].length <= 60, slug + " title");
    assert.ok(descriptions[slug].length <= 155, slug + " description");
  }
  assert.match(descriptions["ibedc-map-refund"], /meter number.*electricity-credit tokens/i);
  assert.match(descriptions["western-union-track-transfer-nigeria"], /10-digit MTCN/);
  assert.match(titles["spotify-premium-nigeria"], /Individual ₦1,600.*Student ₦800/);
  const questions = readFileSync(new URL("../lib/search-answers.ts", import.meta.url), "utf8");
  assert.match(questions, /"ibedc-map-refund": \[/);
  assert.match(questions, /"western-union-track-transfer-nigeria": \[/);
  assert.match(questions, /ascending order, from the earliest issue date to the latest/);
  const tour = readFileSync(new URL("../app/explore/page.tsx", import.meta.url), "utf8");
  assert.match(tour, /href="\/explore\/kainji-dam-guide"/);
});
