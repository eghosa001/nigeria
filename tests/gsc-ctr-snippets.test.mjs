test("three GSC soft-404 guides retain distinct source-backed searchable answers", () => {
  const titles = templates("serviceSeoTitleTemplates");
  const descriptions = templates("serviceSeoDescriptionTemplates");
  const followUps = readFileSync(new URL("../lib/search-answers.ts", import.meta.url), "utf8");
  for (const slug of ["jamb-profile-code", "waec-collect-certificate", "nysc-correct-date-of-birth"]) {
    const service = services.find((item) => item.slug === slug);
    assert.ok(service?.status === "verified" && service.sources?.length, slug);
    assert.ok(titles[slug]?.length <= 60 && descriptions[slug]?.length <= 155, slug);
    assert.match(followUps, new RegExp('"' + slug + '": \\['));
  }
  assert.match(descriptions["jamb-profile-code"], /55019 or 66019/);
  assert.match(descriptions["waec-collect-certificate"], /private candidates contact the responsible WAEC office/);
  assert.match(descriptions["nysc-correct-date-of-birth"], /before service starts/);
});

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
  assert.match(snippet[2], /Mike Ezuruonye as Chidi/);
  assert.match(snippet[2], /Kava viewing options/i);
});

test("October 28 canonical search-demand routes keep targeted titles and homepage discovery", () => {
  const titles = templates("serviceSeoTitleTemplates");
  const descriptions = templates("serviceSeoDescriptionTemplates");
  const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(titles["passport-application-tracking"], /^Track Nigerian Passport Application: NIS Portal/);
  assert.match(descriptions["passport-application-tracking"], /Application Number and Reference Number/);
  assert.match(home, /label: "Passport application tracking", href: "\/services\/passport-application-tracking"/);
  assert.match(home, /href="\/jobs\/internships">Internships &amp; SIWES<\/Link>/);
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

test("Sibe search snippet answers observed cast and full-movie intent", () => {
  const snippet = movie.match(/"sibe": \{\s*title: "([^"]+)",\s*description: "([^"]+)"/);
  assert.ok(snippet);
  assert.ok(snippet[1].length <= 60 && snippet[2].length <= 155);
  assert.match(snippet[1], /Sibe.*Bimbo Ademoye/);
  assert.match(snippet[2], /Uche Montana.*official Bimbo Ademoye TV full movie/i);
});
