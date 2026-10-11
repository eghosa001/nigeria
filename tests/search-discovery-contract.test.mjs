import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

test("site search records aggregate analytics without raw terms", () => {
  const component = readFileSync("components/analytics.tsx", "utf8");
  const results = readFileSync("components/search-results-analytics.tsx", "utf8");
  assert.match(component, /search_submitted/);
  assert.match(component, /suggestion_selected/);
  assert.match(component, /result_clicked/);
  assert.match(results, /search_no_results/);
  assert.doesNotMatch(results, /query:\\s*query/);
});
