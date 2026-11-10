import assert from "node:assert/strict";
import { test } from "node:test";
import { isRestrictedYouTubeVideoId } from "../lib/youtube-rights-blocklist";
import { getYouTubeDetailMovieById, getCuratedMovie } from "../lib/youtube-detail";
import {
  generatedYouTubeMovies, youtubeMovieLibrary, discoverableYouTubeMovies,
  indexableYouTubeMovies, getYouTubeMovieById,
} from "../lib/youtube-library";
import { queryYouTubeDirectory } from "../lib/youtube-directory-query";
import { getPublishedYouTubeD1Movie, youtubeD1QueryPlan } from "../lib/youtube-d1-repository";

const blockedId = "9TdtUwcwVpQ";

test("copyright hold excludes the specific video from all static publication surfaces", async () => {
  assert.equal(isRestrictedYouTubeVideoId(blockedId), true);
  assert.equal(isRestrictedYouTubeVideoId("KWIpR47N9hc"), false);
  for (const rows of [generatedYouTubeMovies, youtubeMovieLibrary, discoverableYouTubeMovies, indexableYouTubeMovies]) {
    assert.equal(rows.some((movie) => movie.videoId === blockedId), false);
    assert.equal(rows.some((movie) => movie.alternateSources?.some((source) => source.videoId === blockedId)), false);
  }
  assert.equal(getYouTubeMovieById(blockedId), undefined);
  assert.equal(getCuratedMovie(blockedId), undefined);
  assert.equal(await getYouTubeDetailMovieById(blockedId), undefined);
  assert.equal(queryYouTubeDirectory({q:"love and sacrifice"}).movies.some((movie) => movie.videoId === blockedId), false);
});

test("D1 public reads deny the video even if an imported row is published", async () => {
  const noDatabaseReads = { prepare() { throw new Error("restricted video reached database"); } };
  assert.equal(await getPublishedYouTubeD1Movie(noDatabaseReads, blockedId), null);
  const publicPlan = youtubeD1QueryPlan({});
  assert.match(publicPlan.countSql, /i\.slug <> \?/);
  assert.match(publicPlan.pageSql, /i\.slug <> \?/);
  assert.ok(publicPlan.params.includes(blockedId));
  // Staff-only staging inspection remains available for evidence retention.
  const stagingPlan = youtubeD1QueryPlan({}, true);
  assert.equal(stagingPlan.params.includes(blockedId), false);
});
