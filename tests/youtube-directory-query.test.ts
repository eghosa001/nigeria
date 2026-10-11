import assert from "node:assert/strict";
import { test } from "node:test";
import { discoverableYouTubeMovies } from "@/lib/youtube-library";
import { YOUTUBE_CATALOG_PAGE_SIZE } from "@/lib/youtube-config";
import { queryYouTubeDirectory, youtubePublisherOptions } from "@/lib/youtube-directory-query";

function legacyQuery(q = "", channel = "", requestedPage = 1) {
  const query = q.trim().toLowerCase();
  const filtered = discoverableYouTubeMovies
    .filter((movie) => {
      const searchable = [movie.title, movie.synopsis, ...movie.cast, movie.channelName].join(" ").toLowerCase();
      return (!query || searchable.includes(query)) && (!channel || movie.channelName === channel);
    })
    .sort((a, b) => {
      if (!query) return b.publishedAt.localeCompare(a.publishedAt);
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const rank = (title: string) => title === query ? 3 : title.startsWith(query) ? 2 : title.includes(query) ? 1 : 0;
      return rank(bTitle) - rank(aTitle) || b.publishedAt.localeCompare(a.publishedAt);
    });
  const pageCount = Math.max(1, Math.ceil(filtered.length / YOUTUBE_CATALOG_PAGE_SIZE));
  const page = Math.min(Math.max(1, requestedPage), pageCount);
  const start = (page - 1) * YOUTUBE_CATALOG_PAGE_SIZE;
  return {
    page,
    pageCount,
    total: filtered.length,
    videoIds: filtered.slice(start, start + YOUTUBE_CATALOG_PAGE_SIZE).map((m) => m.videoId),
  };
}

test("indexed YouTube directory returns identical pages for text and publisher filters", () => {
  assert.ok(discoverableYouTubeMovies.length > 0);
  const publishers = [...new Set(discoverableYouTubeMovies.map((m) => m.channelName))]
    .sort((a, b) => a.localeCompare(b));
  assert.deepEqual(youtubePublisherOptions, publishers);

  const queries = ["", "LOVE", "  love  ", "movie", "maurice", "zzmissingmovie999"];
  const channels = ["", ...publishers.slice(0, 2), publishers[publishers.length - 1], "nonexistent-publisher999"];
  for (const q of queries) {
    for (const channel of channels) {
      for (const requestedPage of [1, 2, 5, 999]) {
        const expected = legacyQuery(q, channel, requestedPage);
        const actual = queryYouTubeDirectory({ q, channel, page: requestedPage });
        const label = JSON.stringify({ q, channel, requestedPage });
        assert.equal(actual.page, expected.page, label);
        assert.equal(actual.pageCount, expected.pageCount, label);
        assert.equal(actual.total, expected.total, label);
        assert.deepEqual(actual.movies.map((m) => m.videoId), expected.videoIds, label);
        assert.equal(actual.filteredMode, Boolean(q.trim() || channel), label);
      }
    }
  }
});

test("unfiltered directory matches original published order and only returns one page", () => {
  const unfiltered = queryYouTubeDirectory();
  assert.equal(unfiltered.total, discoverableYouTubeMovies.length);
  assert.equal(unfiltered.movies.length, Math.min(YOUTUBE_CATALOG_PAGE_SIZE, discoverableYouTubeMovies.length));
  assert.deepEqual(unfiltered.movies.map((m) => m.videoId),
    discoverableYouTubeMovies.slice(0, YOUTUBE_CATALOG_PAGE_SIZE).map((m) => m.videoId));
  assert.equal(unfiltered.filteredMode, false);
});
