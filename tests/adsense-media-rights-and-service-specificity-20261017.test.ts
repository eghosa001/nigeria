import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getPublicService } from "../lib/data";
import { getStepDetails } from "../lib/step-details";
import { getRightsSafeEntertainmentImageUrl, entertainmentTitles, canDisplayEntertainmentArtwork } from "../lib/entertainment";
import { hasExplicitServiceGuidance } from "../lib/service-guidance";

test("movie images require licensed rights records or first-party original posters", () => {
  const base = "https://mynigeriaguide.com";
  for (const film of entertainmentTitles) {
    const image = getRightsSafeEntertainmentImageUrl(film, base);
    assert.equal(image, canDisplayEntertainmentArtwork(film) && film.artwork
      ? film.artwork.url
      : base + "/entertainment/poster/" + encodeURIComponent(film.slug), film.slug);
  }
});

test("movie cards do not embed external thumbnails without rights evidence", () => {
  const src = readFileSync("components/entertainment-artwork.tsx", "utf8");
  assert.doesNotMatch(src, /i\.ytimg\.com|src=\{preview\.url\}|src=\{thumbnail\}/);
  assert.match(src, /canDisplayEntertainmentArtwork/);
  assert.match(src, /data-poster-rendered="inline"/);
  assert.match(src, /className="generated-movie-art"/);
  assert.match(src, /role="img"/);
  assert.doesNotMatch(src, /src=\\{generatedPosterHref/);
});

test("generated artwork is embedded per title without depending on a poster HTTP request", () => {
  const src = readFileSync("components/entertainment-artwork.tsx", "utf8");
  assert.match(src, /<strong>\{title\.title\}<\/strong>/);
  assert.match(src, /posterPalette\(title\.slug\)/);
  assert.match(src, /aria-label=\{"Original illustrated poster for "/);
  assert.match(src, /data-artwork-source="generated-original"/);
  assert.match(src, /not official film artwork/);
  assert.doesNotMatch(src, /<img[\\s\\S]*?generatedPosterHref/);
});

test("generic service aftercare is omitted, with no broken quick-navigation target", () => {
  const service = getPublicService("nin-sim-linkage");
  assert.ok(service);
  assert.equal(hasExplicitServiceGuidance(service.slug), false);
  const aftercare = readFileSync("components/service-aftercare.tsx", "utf8");
  assert.match(aftercare, /if \(!hasExplicitServiceGuidance\(service\.slug\)\) return null/);
  assert.match(readFileSync("components/guide-quick-nav.tsx", "utf8"), /showAftercare \?/);
});

test("mentioning a fee, document or SIM cannot fabricate payment or evidence steps", () => {
  const original = getPublicService("nin-sim-linkage");
  assert.ok(original);
  const service = { ...original, steps: [
    "Read information about fees and account documents.",
    "Review the SIM subscriber's details.",
    "Upload only the files specified by the official portal.",
    "Make payment only if the actual service requires it.",
  ] };
  const steps = getStepDetails(service);
  assert.equal(steps[0].checkpoint, undefined);
  assert.equal(steps[0].keep, undefined);
  assert.equal(steps[1].keep, undefined);
  assert.match(steps[2].checkpoint ?? "", /file type/);
  assert.match(steps[3].checkpoint ?? "", /payment screen/);
});
