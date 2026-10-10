import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { recordSuccessfulChannelScan } from "../scripts/youtube-scan-freshness.mjs";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const sections = Object.fromEntries(
  [...read("lib/entertainment-extras.ts").matchAll(/id: "([^"]+)",([\s\S]*?)(?=\n  \},|$)/g)]
    .map((m) => [m[1], m[2]])
);

test("a successful API scan refreshes a channel even without new videos", () => {
  const previousTime = "2026-09-29T10:04:41.237Z";
  const currentTime = "2026-10-10T18:00:00.000Z";
  const cache = { approved: { channelId: "UC123", latestUploadVideoId: "xyz", lastScannedAt: previousTime } };
  const next = recordSuccessfulChannelScan(cache, { slug: "approved" }, cache.approved, {
    items: [], latestUploadVideoId: "xyz", reachedPreviousUpload: true,
  }, currentTime, false);
  assert.equal(next.lastScannedAt, currentTime);
  assert.equal(next.latestUploadVideoId, "xyz");
  assert.equal(next.lastScanMode, "incremental");
  assert.equal(next.reachedPreviousUpload, true);
});

test("a full successful scan records its mode even with zero accepted movies", () => {
  const cache = {};
  recordSuccessfulChannelScan(cache, { slug: "empty" }, { channelId: "UC789" }, {
    items: [], latestUploadVideoId: "abc", reachedPreviousUpload: false,
  }, "2026-10-10T18:01:00.000Z", true);
  assert.equal(cache.empty.lastScanMode, "full");
  assert.equal(cache.empty.lastScannedAt, "2026-10-10T18:01:00.000Z");
});

test("release snapshots have genuinely checked sources and precise lifecycle", () => {
  const aaiff = sections["aaiff-2026"];
  assert.match(aaiff, /startDate: "2026-11-28"/);
  assert.match(aaiff, /30 October 2026/);
  assert.match(aaiff, /www\.aaiffestival\.com\/festival/);
  const club = sections["after-credits-club"];
  assert.match(club, /status: "ended"/);
  assert.match(club, /completion.*not independently confirmed/);
  const cinema = sections["behind-the-scenes-viva"];
  assert.match(cinema, /web\.vivacinemas\.com\/movies/);
  assert.match(cinema, /lastChecked: "2026-10-10"/);
  for (const item of [aaiff, club, cinema]) assert.match(item, /lastChecked: "2026-10-10"/);
});

test("the sync workflow reruns on changes to its verification logic", () => {
  const sync = read("scripts/sync-youtube-entertainment.mjs");
  assert.match(sync, /recordSuccessfulChannelScan\(cache, source, channel, scan/);
  const action = read(".github/workflows/youtube-entertainment-sync.yml");
  assert.match(action, /scripts\/youtube-scan-freshness\.mjs/);
});
