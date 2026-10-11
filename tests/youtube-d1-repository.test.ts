import assert from "node:assert/strict";
import { test } from "node:test";
import { getPublishedYouTubeD1Movie, inspectStagedYouTubeD1Movie, getStagedYouTubeD1Counts } from "../lib/youtube-d1-repository";

const movie = {
  videoId: "aBCdefG1234",
  title: "A Nigerian Film",
  channelName: "Verified Publisher",
  videoUrl: "https://www.youtube.com/watch?v=aBCdefG1234",
  publishedAt: "2026-10-10T10:00:00Z",
  lastChecked: "2026-10-11",
  cast: ["Actor One"],
  featuredCast: ["Actor One"],
};

function database(status: string, value: object = movie) {
  const calls: Array<{ sql: string; params: unknown[] }> = [];
  const db = {
    prepare(sql: string) {
      return {
        bind(...params: (string | number | null)[]) {
          calls.push({ sql, params });
          return {
            async first<T extends object>(): Promise<T | null> {
              if (sql.includes("editorial_status = 'published'") && status !== "published") return null;
              return {
                payload_json: JSON.stringify(value),
                editorial_status: status,
                canonical_path: "/entertainment/youtube/" + movie.videoId,
              } as T;
            },
            async all<T extends object>(): Promise<{ results: T[] }> {
              return { results: [{ status, quantity: 1 }] as T[] };
            },
          };
        },
      };
    },
  };
  return { db, calls };
}

test("public D1 reader excludes draft, verified and stale rows", async () => {
  for (const status of ["draft", "verified", "stale", "expired", "archived"]) {
    const { db, calls } = database(status);
    assert.equal(await getPublishedYouTubeD1Movie(db, movie.videoId), null);
    assert.match(calls[0].sql, /editorial_status = 'published'/);
    assert.deepEqual(calls[0].params, [
      "movies_entertainment", "youtube-movie", movie.videoId,
      "/entertainment/youtube/" + movie.videoId,
    ]);
    assert.equal((await inspectStagedYouTubeD1Movie(db, movie.videoId))?.editorialStatus, status);
  }
});

test("published D1 reader preserves source payload and canonical URL", async () => {
  const { db } = database("published");
  const result = await getPublishedYouTubeD1Movie(db, movie.videoId);
  assert.ok(result);
  assert.deepEqual(result.movie, movie);
  assert.equal(result.canonicalPath, "/entertainment/youtube/" + movie.videoId);
  assert.equal(result.editorialStatus, "published");
});

test("D1 reader validates IDs and recorded publisher details", async () => {
  let prepared = 0;
  const guarded = {
    prepare() { prepared++; throw new Error("Invalid ID should not make a query"); },
  };
  assert.equal(await getPublishedYouTubeD1Movie(guarded, "invalid_id"), null);
  assert.equal(await inspectStagedYouTubeD1Movie(guarded, ""), null);
  assert.equal(prepared, 0);
  for (const invalid of [
    { ...movie, videoId: "short" },
    { ...movie, videoUrl: "https://example.com/watch?v=aBCdefG1234" },
    { ...movie, videoUrl: "https://www.youtube.com/watch?v=notMatch123" },
    { ...movie, cast: null },
  ]) {
    const { db } = database("published", invalid);
    await assert.rejects(getPublishedYouTubeD1Movie(db, movie.videoId), /D1 YouTube/);
  }
});

test("D1 staging status probes return aggregate counts", async () => {
  const { db, calls } = database("draft");
  const counts = await getStagedYouTubeD1Counts(db);
  assert.equal(counts.draft, 1);
  assert.deepEqual(calls[0].params, ["movies_entertainment", "youtube-movie"]);
  assert.match(calls[0].sql, /GROUP BY editorial_status/);
});
