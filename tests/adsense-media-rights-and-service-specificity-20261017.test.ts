import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getPublicService } from "../lib/data";
import { getStepDetails } from "../lib/step-details";
import { getRightsSafeEntertainmentImageUrl, entertainmentTitles, canDisplayEntertainmentArtwork } from "../lib/entertainment";
import { hasExplicitServiceGuidance } from "../lib/service-guidance";
import { getVerifiedYouTubePreview, getSourceLinkedFilmPreview } from "../lib/movie-media-previews";

test("movie images require licensed rights records or first-party original posters", () => {
  const base = "https://mynigeriaguide.com";
  for (const film of entertainmentTitles) {
    const image = getRightsSafeEntertainmentImageUrl(film, base);
    assert.equal(image, canDisplayEntertainmentArtwork(film) && film.artwork
      ? film.artwork.url
      : base + "/entertainment/poster/" + encodeURIComponent(film.slug), film.slug);
  }
});

test("licensed art, credited official-source previews and video thumbnails are different rights categories", () => {
  const component = readFileSync("components/entertainment-artwork.tsx", "utf8");
  assert.match(component, /canDisplayEntertainmentArtwork/);
  assert.match(component, /data-rights-status="source-linked-editorial-preview"/);
  assert.match(component, /data-rights-status="linked-video-preview"/);
  assert.match(component, /getSourceLinkedFilmPreview/);
  assert.match(component, /getVerifiedYouTubePreview/);
  assert.match(component, /RemoteMoviePreviewImage/);
  assert.match(component, /data-poster-rendered="inline"/);
  assert.doesNotMatch(component, /src=\\{preview\\.url\\}/);
});

test("verified producer video thumbnails and official exhibitor posters are displayed again", () => {
  const myWedding = entertainmentTitles.find(film => film.slug === "my-30th-wedding");
  assert.ok(myWedding);
  const video = getVerifiedYouTubePreview(myWedding);
  assert.equal(video?.videoId, "0_JzNVzFukE");
  assert.equal(video?.publisher, "Bimbo Ademoye TV");
  assert.equal(video?.kind, "full-movie");
  const blackMarket = entertainmentTitles.find(film => film.slug === "black-market-2026");
  assert.ok(blackMarket);
  assert.equal(getSourceLinkedFilmPreview(blackMarket)?.credit, "Grand Cinemas");

  const unverified = {
    ...myWedding,
    trailer: undefined,
    watchLinks: [{ ...myWedding.watchLinks[0], href: "https://malicious.example/watch?v=0_JzNVzFukE" }],
    sourcePreview: {
      url: "https://example.com/image.jpg", sourceUrl: "https://example.com",
      credit: "A movie database", sourceKind: "editorial-database" as const,
      note: "Not licensed", lastChecked: "2026-10-17",
    },
  };
  assert.equal(getVerifiedYouTubePreview(unverified), null);
  assert.equal(getSourceLinkedFilmPreview(unverified), null);
});

test("YouTube movie cards and all remote previews fail visibly, not with blank boxes", () => {
  const preview = readFileSync("components/remote-movie-preview-image.tsx", "utf8");
  const movieCards = readFileSync("components/youtube-movie-card.tsx", "utf8");
  const styles = readFileSync("app/globals.css", "utf8");
  assert.match(movieCards, /RemoteMoviePreviewImage/);
  assert.match(movieCards, /i\\.ytimg\\.com/);
  assert.match(preview, /onError=\\{\\(\\) => setAttempt/);
  assert.match(preview, /remote-movie-preview-fallback/);
  assert.match(styles, /remote-movie-preview-picture/);
});

test("generated artwork is embedded per title without depending on a poster HTTP request", () => {
  const src = readFileSync("components/entertainment-artwork.tsx", "utf8");
  assert.match(src, /<strong>\{title\.title\}<\/strong>/);
  assert.match(src, /posterPalette\(title\.slug\)/);
  assert.match(src, /aria-label=\{"Original illustrated poster for "/);
  assert.match(src, /data-artwork-source="generated-original"/);
  assert.match(src, /not official film artwork/);
  assert.doesNotMatch(src, /generatedPosterHref/);
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
