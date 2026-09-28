import assert from "node:assert/strict";
import { analyticsStartDate, shouldEnableAnalytics } from "../lib/analytics-safety";

assert.equal(shouldEnableAnalytics("/", false), true);
assert.equal(shouldEnableAnalytics("/services/passport-renewal", false), true);
assert.equal(shouldEnableAnalytics("/admin", false), false);
assert.equal(shouldEnableAnalytics("/admin/visits", false), false);
assert.equal(shouldEnableAnalytics("/", true), false);

console.log("Analytics safety checks passed.");

assert.equal(analyticsStartDate(90, "2026-09-29"), "2026-09-29");
assert.equal(analyticsStartDate(7, "2026-10-10"), "2026-10-04");
