import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import packedCatalog from "@/data/youtube-runtime-catalog.generated.json";
import {
  getYouTubeMovieById, youtubeMovieLibrary, youtubeReviewVisibleCount,
  generatedYouTubeMovies, indexableYouTubeMovies,
  hasSubstantiveYouTubeSynopsis, isPublisherPromoSynopsis,
} from "@/lib/youtube-library";
import { isApprovedYouTubeMoviePublisher } from "@/lib/youtube-movie-channels";

type PendingReviewRow = [
  string, string, string, string, string | null, string, number, string,
  string | null, string | null
];

const excludedTitle = /\b(trailer|teaser|concert|live\s*stream|livestream|watch\s+party|webinar|episode\s*\d+|\bep\.?\s*\d+|season\s*\d+|interview|reaction|music\s+video|making\s+of)\b/i;

test("on-demand pending YouTube records preserve all prior approved-ID lookup semantics", () => {
  const published = new Map(youtubeMovieLibrary.map((movie) => [movie.videoId, movie]));
  const eligible = new Map<string, PendingReviewRow>();
  for (const raw of packedCatalog.reviews) {
    const row = raw as unknown as PendingReviewRow;
    const [videoId, rawTitle, title, channelName, , , durationMinutes, reason] = row;
    if (reason === "missing-cast" &&
      Number(durationMinutes) >= 55 &&
      !excludedTitle.test(rawTitle ?? title) &&
      isApprovedYouTubeMoviePublisher(channelName)) {
      eligible.set(videoId, row);
    }
  }

  assert.ok(eligible.size > 100, "expected approved review records from the checked-in source");
  assert.equal(youtubeReviewVisibleCount, 0);
  assert.ok(youtubeMovieLibrary.every((movie) => movie.source !== "youtube-review"));

  let pendingChecked = 0;
  for (const [videoId, row] of eligible) {
    const movie = getYouTubeMovieById(videoId);
    assert.ok(movie, "known video unavailable: " + videoId);
    if (published.has(videoId)) {
      assert.equal(movie, published.get(videoId), "public record must take precedence");
      continue;
    }
    const [, rawTitle, , channelName, channelUrl, publishedAt, durationMinutes,
      , , videoUrlOverride] = row;
    assert.equal(movie.source, "youtube-review", videoId);
    assert.equal(movie.rawTitle, rawTitle);
    assert.equal(movie.channelName, channelName);
    assert.equal(movie.channelUrl, channelUrl ?? undefined);
    assert.equal(movie.publishedAt, publishedAt);
    assert.equal(movie.year, Number(publishedAt.slice(0, 4)));
    assert.equal(movie.durationMinutes, durationMinutes);
    assert.equal(movie.videoUrl, videoUrlOverride ?? "https://www.youtube.com/watch?v=" + videoId);
    assert.equal(movie.metadataStatus, "cast-pending");
    assert.equal(movie.viewCount, 0);
    assert.equal(movie.lastChecked, String(packedCatalog.reviewGeneratedAt ?? "").slice(0, 10));
    assert.equal(movie.internalHref, "/entertainment/youtube/" + videoId);
    assert.deepEqual(movie.cast, []);
    assert.deepEqual(movie.alternateSources, []);
    assert.ok(movie.synopsis.length > 0);
    assert.equal(getYouTubeMovieById(videoId), movie, "repeat lookup should retain record identity");
    pendingChecked++;
  }
  assert.ok(pendingChecked > 100);
});

test("absent video IDs stay absent and published records keep their original object", () => {
  assert.equal(getYouTubeMovieById("missing999xx"), undefined);
  const first = youtubeMovieLibrary[0];
  assert.ok(first);
  assert.equal(getYouTubeMovieById(first.videoId), first);
  assert.equal(getYouTubeMovieById(first.videoId), first);
});

test("publisher promotion and notification requests cannot become indexable movie plots", () => {
  const invalid = [
    "And if you are a subscriber, please turn on NOTIFICATIONS by clicking the bell symbol to get updates on our new videos uploaded.",
    "On this channel, you will enjoy the best of Nollywood movies, emotional African stories and powerful performances from our cast.",
    "IFYEZE NOLLY TV PRODUCES BEST NOLLYWOOD MOVIES THAT ENTERTAINS AND EDUCATES ABOUT LIFE, MARRIAGE AND THE REAL AFRICAN CULTURE.",
  ];
  for (const copy of invalid) {
    assert.equal(isPublisherPromoSynopsis(copy), true, copy);
    assert.equal(hasSubstantiveYouTubeSynopsis({ synopsis: copy }), false, copy);
  }
  const realPlot = "Hannah enters a wealthy family with a concealed plan for revenge and begins to fracture the relationships between three brothers as the past returns to haunt them.";
  assert.equal(isPublisherPromoSynopsis(realPlot), false);
  assert.equal(hasSubstantiveYouTubeSynopsis({ synopsis: realPlot }), true);

  // Keep discovered video records available, but use neutral publisher/cast
  // metadata rather than asserting a plot or publishing promotion as a story.
  for (const id of ["0ujEzReLcP8", "-0i2iEvMtgI", "mBl5wdukWjs"]) {
    const movie = generatedYouTubeMovies.find((item) => item.videoId === id);
    if (!movie) continue; // A later publisher sync may legitimately retire it.
    assert.equal(isPublisherPromoSynopsis(movie.synopsis), false, id);
    assert.equal(hasSubstantiveYouTubeSynopsis(movie), false, id);
    assert.equal(indexableYouTubeMovies.some((item) => item.videoId === id), false, id);
    assert.match(movie.synopsis, /published by/i);
  }
});

test("local Cloudflare smoke uses the static YouTube adapter without mutating production D1 cutover", () => {
  const config = readFileSync(new URL("../playwright.cloudflare.config.ts", import.meta.url), "utf8");
  assert.match(config, /--var YOUTUBE_D1_CUTOVER:disabled/);
  // Production continues to use the explicit D1 setting; only the
  // local Playwright webServer's Wrangler arguments override it.
  const workerConfig = readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8");
  assert.match(workerConfig, /"YOUTUBE_D1_CUTOVER": "enabled"/);
});
