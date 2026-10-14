import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { hasValidVideoPublishDate } from "../lib/youtube-video-publication-date";

test("YouTube video schema accepts real API dates and rejects malformed upload dates", () => {
  assert.equal(hasValidVideoPublishDate("2026-10-09T16:30:00Z"), true);
  assert.equal(hasValidVideoPublishDate("2026-10-09"), true);
  assert.equal(hasValidVideoPublishDate("2026-02-30T08:00:00Z"), false);
  assert.equal(hasValidVideoPublishDate("not-a-date"), false);
});

test("eligible video detail pages actually invoke the date validator for VideoObject", () => {
  const source = readFileSync("app/entertainment/youtube/[videoId]/page.tsx", "utf8");
  assert.match(source, /const videoLd = indexable && movie\.source !== "curated" && hasValidVideoPublishDate\(movie\.publishedAt\)/);
  assert.match(source, /"@type": "VideoObject"/);
});
