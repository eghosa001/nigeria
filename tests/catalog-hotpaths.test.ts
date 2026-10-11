import assert from "node:assert/strict";
import { test } from "node:test";
import { entertainmentTitles } from "@/lib/entertainment";
import { queryEntertainmentDirectory } from "@/lib/entertainment-query";
import { getEntertainmentCatalogPage, getEntertainmentCatalogPageCount, getEntertainmentCatalogTitles } from "@/lib/entertainment-pagination";
import registry from "@/data/youtube-movie-sources.json";
import {
  getVerifiedYouTubeMovieChannelByName,
  getVerifiedYouTubeMovieChannelBySlug,
  isApprovedYouTubeMoviePublisher,
  verifiedYouTubeMovieChannels,
} from "@/lib/youtube-movie-channels";

test("movie pagination reuses canonical ordering and returns an independent list", () => {
  const expected = [...entertainmentTitles].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  assert.deepEqual(getEntertainmentCatalogTitles().map((movie) => movie.slug), expected.map((movie) => movie.slug));
  const copy = getEntertainmentCatalogTitles();
  copy.pop();
  assert.equal(getEntertainmentCatalogTitles().length, expected.length);
  assert.deepEqual(getEntertainmentCatalogPage(1)?.titles.map((movie) => movie.slug), expected.slice(0, 30).map((movie) => movie.slug));
  assert.equal(getEntertainmentCatalogPage(getEntertainmentCatalogPageCount() + 1), null);
});

test("movie search remains insensitive to leading spaces and capitalization", () => {
  const title = entertainmentTitles[0]?.title;
  assert.ok(title);
  assert.deepEqual(
    queryEntertainmentDirectory({ q: title }).items.map((movie) => movie.slug),
    queryEntertainmentDirectory({ q: "   " + title.toUpperCase() + "  " }).items.map((movie) => movie.slug),
  );
});

test("approved YouTube alias indexing keeps the registry's first-match behavior", () => {
  assert.equal(isApprovedYouTubeMoviePublisher(undefined), false);
  assert.equal(isApprovedYouTubeMoviePublisher("unlisted channel name 999"), false);
  for (const source of registry.sources) {
    const expected = verifiedYouTubeMovieChannels.find((channel) => channel.slug === source.slug);
    assert.deepEqual(getVerifiedYouTubeMovieChannelBySlug(source.slug), expected);
    for (const alias of source.aliases) {
      assert.equal(isApprovedYouTubeMoviePublisher("  " + alias.toUpperCase() + " "), true);
      const normalized = alias.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      const first = verifiedYouTubeMovieChannels.find((channel) =>
        channel.aliases.some((candidate) => candidate.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() === normalized),
      );
      assert.deepEqual(getVerifiedYouTubeMovieChannelByName(alias), first);
    }
  }
});
