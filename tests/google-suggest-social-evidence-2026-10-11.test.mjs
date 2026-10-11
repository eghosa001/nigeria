import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("localized Google Suggest source is explicit and stores raw evidence", () => {
  const research = source("tools/google-autocomplete-research.mjs");
  assert.match(research, /gl: "ng"/);
  assert.match(research, /hl: "en"/);
  assert.match(research, /artifacts\/google-autocomplete-ng\.json/);
});

test("city search pages use all canonical linked attractions", () => {
  for (const city of ["lagos", "abuja"]) {
    const page = source("app/explore/things-to-do-" + city + "/page.tsx");
    assert.match(page, new RegExp('getExplorePlacesForGuide\\("' + city + '"\\)'));
    assert.doesNotMatch(page, /explorePlaces\.filter/);
  }
});

test("suggestion-led search copy points to existing canonical services and keeps social claims qualified", () => {
  const services = source("app/services/page.tsx");
  for (const slug of ["cac-business-name-registration", "passport-renewal", "check-nin-number", "nysc-registration-local", "waec-check-result"]) {
    assert.ok(services.includes('href: "/services/' + slug + '"'), slug);
  }
  const socials = source("app/entertainment/social-trends/page.tsx");
  assert.match(socials, /not an official impression count/);
  assert.match(socials, /NOT a live Nigeria-wide TikTok ranking/);
});
