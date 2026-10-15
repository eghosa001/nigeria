import assert from "node:assert/strict";
import test from "node:test";
import { findSearchOpportunities, searchPeriodStart, validateSearchPage } from "../lib/visits-search-opportunities";

test("only substantial low-CTR first/two-page opportunities rank by impressions", () => {
  const p = (impressions: number, ctr: number, position: number) => ({ page: "https://mynigeriaguide.com/a", impressions, ctr, position, clicks: 0 });
  assert.deepEqual(findSearchOpportunities([p(30, 0, 7), p(200, 0.02, 7), p(100, 0, 19), p(150, 0, 7), p(300, 0.005, 6)]).map(x => x.impressions), [300, 150]);
});

test("query drilldown rejects external and unsafe URLs", () => {
  assert.equal(validateSearchPage("https://mynigeriaguide.com/services/passport-application-tracking"), "https://mynigeriaguide.com/services/passport-application-tracking");
  assert.equal(validateSearchPage("https://mynigeriaguide.com.evil.org/path"), null);
  assert.equal(validateSearchPage("http://mynigeriaguide.com/"), null);
  assert.equal(validateSearchPage("https://evil.org/"), null);
});

test("query date ranges follow Pacific reporting days", () => {
  assert.equal(searchPeriodStart("7d", "2026-10-15"), "2026-10-09");
  assert.equal(searchPeriodStart("30d", "2026-10-15"), "2026-09-16");
});
