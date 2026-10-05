import assert from "node:assert/strict";
import { analyticsStartDate, shouldEnableAnalytics } from "../lib/analytics-safety";

const adsenseInfeedUserAgent =
  "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/537.36 (KHTML, like Gecko; GoogleAdSenseInfeed) Chrome/153.0.8010.52 Mobile Safari/537.36";

assert.equal(shouldEnableAnalytics("/", false), true);
assert.equal(shouldEnableAnalytics("/services/passport-renewal", false), true);
assert.equal(shouldEnableAnalytics("/admin", false), false);
assert.equal(shouldEnableAnalytics("/admin/visits", false), false);
assert.equal(shouldEnableAnalytics("/", true), false);
assert.equal(shouldEnableAnalytics("/", false, adsenseInfeedUserAgent), false);
assert.equal(shouldEnableAnalytics("/", false, "Mozilla/5.0 Chrome/153.0"), true);

console.log("Analytics safety checks passed.");

assert.equal(analyticsStartDate(90, "2026-09-29"), "2026-09-29");
assert.equal(analyticsStartDate(7, "2026-10-10"), "2026-10-04");
