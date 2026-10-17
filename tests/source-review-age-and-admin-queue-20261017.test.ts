import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { freshnessPolicy, getFreshnessState } from "../lib/content-freshness";
import { getServiceReviewStatus } from "../lib/service-review-status";

const now = new Date("2026-10-17T11:00:00Z");

test("service warnings begin after ten days without falsifying the source date", () => {
  assert.equal(freshnessPolicy.services.warnAfterDays, 10);
  assert.equal(getServiceReviewStatus("2026-10-07", now).state, "current");
  const due = getServiceReviewStatus("2026-10-06", now);
  assert.equal(due.state, "recheck-due");
  assert.equal(due.days, 11);
  assert.match(due.message, /not been reverified today/);
  const older = getServiceReviewStatus("2026-09-16", now);
  assert.equal(older.state, "older-review");
  assert.equal(older.days, 31);
  assert.equal(getServiceReviewStatus("2026-10-18", now).state, "invalid-date");
  assert.equal(getServiceReviewStatus("2026-02-30", now).state, "invalid-date");
  assert.equal(getFreshnessState("2026-10-06", freshnessPolicy.services, now), "due");
});

test("public service pages show real recorded dates and dynamically updated recheck context", () => {
  const page = readFileSync("app/services/[slug]/page.tsx", "utf8");
  const notice = readFileSync("components/service-review-notice.tsx", "utf8");
  assert.match(page, /ServiceReviewNotice lastVerified=\{service\.lastVerified\}/);
  assert.match(notice, /<time dateTime=\{lastVerified\}>\{lastVerified\}<\/time>/);
  assert.match(notice, /useEffect\(\(\) => setReview\(getServiceReviewStatus\(lastVerified\)\)/);
  assert.match(notice, /last reviewed against its cited sources/);
  assert.doesNotMatch(notice, /lastVerified:\s*new Date\(|lastVerified:\s*"2026-10-17"/);
});

test("admin can filter the source-review queue and inspect earliest check for shared URLs", () => {
  const health = readFileSync("app/admin/health/page.tsx", "utf8");
  const sources = readFileSync("app/admin/sources/page.tsx", "utf8");
  assert.match(health, /pillar === "All" \? allRecords : allRecords\.filter/);
  assert.match(health, /servicesDue/);
  assert.match(health, /servicesStale/);
  assert.match(sources, /source\.lastChecked < row\.lastChecked/);
  assert.match(sources, /oldest recorded check/);
});
