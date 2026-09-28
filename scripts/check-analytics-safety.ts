import assert from "node:assert/strict";
import { shouldEnableAnalytics } from "../lib/analytics-safety";

assert.equal(shouldEnableAnalytics("/", false), true);
assert.equal(shouldEnableAnalytics("/services/passport-renewal", false), true);
assert.equal(shouldEnableAnalytics("/admin", false), false);
assert.equal(shouldEnableAnalytics("/admin/visits", false), false);
assert.equal(shouldEnableAnalytics("/", true), false);

console.log("Analytics safety checks passed.");
