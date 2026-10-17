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

test("previously linked producer thumbnails are not hidden by missing optional publisher profiles", () => {
  // All 20 titles were displayed before the Oct 17 #563 artwork regression.
  // They still have source-checked direct YouTube full-film links, but the
  // initial #578 restoration accidentally required publisherUrl as well.
  const restored = [
    "irreplaceable", "plus-one", "love-and-legacy-2026",
    "sister-agatha", "forever-found", "all-things-equal",
    "love-on-credit-2026", "onte-final-chapter-2026", "love-and-ruin-2026",
    "celebrity-crush-2024", "a-hold-on-me-2024", "a-ride-forever-2026",
    "stuck-with-you-2025", "for-richer-for-poorer-2026", "lost-connection-2026",
    "the-kings-matchmaker-2026", "oil-and-water-2025", "unusual-love-2024",
    "forever-isnt-long-enough-2025", "terms-of-attraction-2026",
  ];
  for (const slug of restored) {
    const film = entertainmentTitles.find((item) => item.slug === slug);
    assert.ok(film, "missing title " + slug);
    const source = getVerifiedYouTubePreview(film);
    assert.equal(source?.kind, "full-movie", slug);
    assert.match(source?.videoId ?? "", /^[a-zA-Z0-9_-]{11}$/, slug);
    assert.equal(source?.href, film.watchLinks.find((link) =>
      link.platform === "YouTube" && link.access === "full-movie")?.href, slug);
    assert.ok(film.watchLinks.some((link) => Boolean(link.lastChecked?.trim())), slug);
  }

  // The optional profile must not be replaced with guesswork, and removing
  // genuine source evidence must still disable the thumbnail.
  const sample = entertainmentTitles.find((item) => item.slug === "love-on-credit-2026");
  assert.ok(sample);
  const missingSourceCheck = { ...sample,
    watchLinks: sample.watchLinks.map((link) => ({ ...link, lastChecked: "" })) };
  assert.equal(getVerifiedYouTubePreview(missingSourceCheck), null);
  const wrongAccess = { ...sample,
    watchLinks: sample.watchLinks.map((link) => ({ ...link, access: "subscription" as const })) };
  assert.equal(getVerifiedYouTubePreview(wrongAccess), null);
});

test("the entire movie catalogue retains every eligible pre-regression video or credited visual source", () => {
  // PR #563 displayed a checked official poster, sourcePreview or video
  // thumbnail; source-linked images must not disappear merely because a
  // separate channel profile URL is absent. Film-db image mirrors still
  // need a reuse basis, and are not silently treated as approved rights.
  assert.ok(entertainmentTitles.length >= 147, "catalogue records unexpectedly disappeared");

  const externalBefore = entertainmentTitles.filter((film) =>
    Boolean(film.sourcePreview) ||
    Boolean(film.trailer) ||
    film.watchLinks.some((link) => link.platform === "YouTube" && link.access === "full-movie") ||
    canDisplayEntertainmentArtwork(film),
  );
  const newlyDisplayable = externalBefore.filter((film) =>
    canDisplayEntertainmentArtwork(film) ||
    Boolean(getSourceLinkedFilmPreview(film)) ||
    Boolean(getVerifiedYouTubePreview(film)),
  );
  const withheld = externalBefore.filter((film) => !newlyDisplayable.includes(film));
  console.log("Full-film media reconciliation", JSON.stringify({
    catalogSize: entertainmentTitles.length,
    hadPreRegressionMedia: externalBefore.length,
    recovered: newlyDisplayable.length,
    withheld: withheld.map((film) => film.slug),
    hadNoExternalImageBefore: entertainmentTitles.length - externalBefore.length,
  }));
  assert.ok(externalBefore.length >= 112, "source-backed titles unexpectedly disappeared");
  assert.equal(newlyDisplayable.length, externalBefore.length - 1,
    "every film except the documented mirror-only title needs its prior image pathway");
  assert.deepEqual(withheld.map((film) => film.slug), ["wire-transfer-2026"],
    "no other previously pictured movie may silently lose its poster");

  // These are current film-specific source citations for original video
  // previews, not grants to reuse the mirrored third-party promo posters.
  assert.equal(getVerifiedYouTubePreview(entertainmentTitles.find(
    (film) => film.slug === "a-land-apart-2026")!)?.videoId, "qMoZdjkCAb4");
  assert.equal(getVerifiedYouTubePreview(entertainmentTitles.find(
    (film) => film.slug === "phoenix-fury-2026")!)?.videoId, "TGFvzpk27s4");

  const noExternalBefore = entertainmentTitles.filter((film) => !externalBefore.includes(film));
  assert.equal(noExternalBefore.length, entertainmentTitles.length - externalBefore.length,
    "separate genuinely new artwork work from regressions");
  const cards = readFileSync("components/entertainment-artwork.tsx", "utf8");
  const home = readFileSync("app/page.tsx", "utf8");
  const filmDirectory = readFileSync("components/entertainment-catalog.tsx", "utf8");
  const filmPage = readFileSync("app/entertainment/movies/[slug]/page.tsx", "utf8");
  assert.match(cards, /getSourceLinkedFilmPreview/);
  assert.match(cards, /getVerifiedYouTubePreview/);
  for (const surface of [home, filmDirectory, filmPage]) {
    assert.match(surface, /<EntertainmentArtwork/, "a key movie surface bypassed the shared repaired component");
  }
});

test("YouTube movie cards and all remote previews fail visibly, not with blank boxes", () => {
  const preview = readFileSync("components/remote-movie-preview-image.tsx", "utf8");
  const movieCards = readFileSync("components/youtube-movie-card.tsx", "utf8");
  const styles = readFileSync("app/globals.css", "utf8");
  assert.match(movieCards, /RemoteMoviePreviewImage/);
  assert.ok(movieCards.includes("i.ytimg.com"));
  assert.ok(preview.includes("onError={() => setAttempt"));
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
