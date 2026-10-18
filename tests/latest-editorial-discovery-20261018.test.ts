import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { selectRecentAcrossGroups } from "../lib/latest-editorial-selection";
import { getEffectiveJobStatus } from "../lib/job-runtime";
import { isIndexableJobOpportunity, jobOpportunities } from "../lib/jobs";
import { publicServices } from "../lib/data";
import { exploreGuides } from "../lib/explore";
import { indexableYouTubeMovies } from "../lib/youtube-library";

const date = "2026-10-18";
const src = readFileSync(new URL("../app/latest/page.tsx", import.meta.url), "utf8");

test("recent selections prefer verified dates, avoid future records and diversify issuers", () => {
  const records = [
    { slug: "a", agency: "Bank A", checked: "2026-10-17" },
    { slug: "b", agency: "Bank A", checked: "2026-10-17" },
    { slug: "c", agency: "Bank B", checked: "2026-10-16" },
    { slug: "d", agency: "Bank C", checked: "2026-10-19" },
    { slug: "e", agency: "Bank D", checked: "invalid" },
  ];
  const options = {
    date: (item: typeof records[number]) => item.checked,
    group: (item: typeof records[number]) => item.agency,
    key: (item: typeof records[number]) => item.slug,
    today: date,
  };
  assert.deepEqual(selectRecentAcrossGroups(records, options).map(x => x.slug), ["a", "c"]);
  assert.deepEqual(selectRecentAcrossGroups(records, {...options, fill: true}).map(x => x.slug), ["a", "c", "b"]);
});

test("real latest service, travel and YouTube shelves do not repeat one issuer, region or channel", () => {
  const services = selectRecentAcrossGroups(publicServices, {
    date: x => x.lastVerified, key: x => x.slug, group: x => x.agencySlug, today: date,
  });
  const travel = selectRecentAcrossGroups(exploreGuides, {
    date: x => x.lastReviewed, key: x => x.slug, group: x => x.kind + ":" + x.region, today: date,
  });
  const youtube = selectRecentAcrossGroups(indexableYouTubeMovies, {
    date: x => x.publishedAt.slice(0, 10), key: x => x.videoId, group: x => x.channelName, today: date,
  });
  assert.ok(services.length >= 5, "Service discovery should show meaningful variety");
  assert.ok(travel.length >= 5, "Tour discovery should show multiple regions / guide kinds");
  assert.ok(youtube.length >= 3, "YouTube should show more than one authorised publisher");
  for (const [name, values] of [
    ["service agencies", services.map(x => x.agencySlug)],
    ["tour group", travel.map(x => x.kind + ":" + x.region)],
    ["YouTube publishers", youtube.map(x => x.channelName)],
  ] as const) assert.equal(new Set(values).size, values.length, name);
});

test("only still-open indexable roles appear, with one slot per employer", () => {
  const selected = selectRecentAcrossGroups(
    jobOpportunities.filter(x => isIndexableJobOpportunity(x) && getEffectiveJobStatus(x, date) === "open"),
    { date: x => x.verifiedAt, key: x => x.slug, group: x => x.organization, today: date },
  );
  assert.ok(selected.length >= 3, "Available opportunities should be discoverable");
  assert.equal(new Set(selected.map(x => x.organization.trim().toLowerCase())).size, selected.length);
  assert.ok(selected.every(x => getEffectiveJobStatus(x, date) === "open" && x.verifiedAt <= date));
  assert.doesNotMatch(src, /job\.statusLabel/);
});

test("Latest renders request-time dates, correct check-date labels and archive below discovery", () => {
  assert.match(src, /export const dynamic = "force-dynamic"/);
  assert.match(src, /getEffectiveJobStatus\(item, today\) === "open"/);
  assert.match(src, /A verification date means/);
  assert.match(src, /source-checked/);
  assert.match(src, /One listing per employer|one listing per employer/i);
  assert.ok(src.indexOf('<div className="admin-two-column top-gap">') < src.indexOf("<NigeriaTrendsBackfill />"),
    "Readers should see current guides before the historical 17-item archive");
  assert.match(src, /href="#nigeria-october-trends"/);
});
