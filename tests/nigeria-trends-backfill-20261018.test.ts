import assert from "node:assert/strict";
import test from "node:test";
import { nigeriaTrendsBackfill20261018 } from "../data/nigeria-trends-backfill-2026-10-18";
import { getCurrentHomeSocialTrends } from "../data/home-social-trends";
import { getExploreGuide } from "../lib/explore";
import { getPublicService } from "../lib/data";
import { jobOpportunities } from "../lib/jobs";

test("11–18 October editorial backfill is attributed, bounded and spans all four pillars", () => {
  const records = nigeriaTrendsBackfill20261018;
  assert.ok(records.length >= 15, "Significant documented coverage, not a single teaser");
  assert.equal(new Set(records.map(item => item.id)).size, records.length);
  for (const pillar of ["Movies & Entertainment", "Services", "Tour Nigeria", "Jobs & Careers"]) {
    assert.ok(records.filter(item => item.pillar === pillar).length >= 2, pillar);
  }
  assert.ok(records.some(item => item.observedOn === "2026-10-11"));
  assert.ok(records.some(item => item.observedOn === "2026-10-18"));
  for (const item of records) {
    assert.ok(item.observedOn >= "2026-10-11" && item.observedOn <= "2026-10-18", item.id);
    assert.match(item.sourceUrl, /^https:\/\//, item.id);
    assert.match(item.href, /^\/(?:entertainment|services|explore|jobs)/, item.id);
    assert.ok(item.title.length >= 20 && item.takeaway.length >= 85, item.id);
    assert.ok(item.readerAction.length >= 30, item.id);
    assert.doesNotMatch(item.title + item.takeaway, /[0-9,]+ (?:million )?(?:views|likes|shares|impressions)(?! are not)/i, item.id);
  }
});

test("backfill links to actual canonical services, events and opportunity listings", () => {
  for (const record of nigeriaTrendsBackfill20261018) {
    if (record.href.startsWith("/explore/") && record.href !== "/explore/events") {
      assert.ok(getExploreGuide(record.href.slice("/explore/".length)), record.id + " missing tour canonical");
    }
    if (record.href.startsWith("/services/")) {
      assert.ok(getPublicService(record.href.slice("/services/".length)), record.id + " missing service canonical");
    }
    if (record.href.startsWith("/jobs/") && record.href !== "/jobs/deadlines") {
      assert.ok(jobOpportunities.some(item => item.slug === record.href.slice("/jobs/".length)), record.id + " missing jobs canonical");
    }
  }
});

test("18 October homepage shelf has a fresh unique verified item for every pillar", () => {
  const cards = getCurrentHomeSocialTrends("2026-10-18");
  assert.equal(cards.length, 4);
  assert.equal(new Set(cards.map(item => item.pillar)).size, 4);
  assert.ok(cards.every(item => item.checkedAt === "2026-10-18"));
});
