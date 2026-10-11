import assert from "node:assert/strict";
import { test } from "node:test";
import packedCatalog from "@/data/youtube-runtime-catalog.generated.json";
import {
  getYouTubeMovieById, youtubeMovieLibrary, youtubeReviewVisibleCount,
} from "@/lib/youtube-library";
import { isApprovedYouTubeMoviePublisher } from "@/lib/youtube-movie-channels";

const excludedTitle = /\b(trailer|teaser|concert|live\s*stream|livestream|watch\s+party|webinar|episode\s*\d+|\bep\.?\s*\d+|season\s*\d+|interview|reaction|music\s+video|making\s+of)\b/i;

test("on-demand pending YouTube records preserve all prior approved-ID lookup semantics", () => {
  const published = new Map(youtubeMovieLibrary.map((movie) => [movie.videoId, movie]));
  const eligible = new Map<string, (typeof packedCatalog.reviews)[number]>();
  for (const row of packedCatalog.reviews) {
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
