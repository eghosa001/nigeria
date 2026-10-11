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
  assert.match(results, /result_count_band/);
  assert.ok(!results.includes("search_term:"));
  assert.ok(!results.includes("search_query:"));
});

test("site search bounds repeated and oversized query parameters", () => {
  const page = readFileSync("app/search/page.tsx", "utf8");
  assert.match(page, /Array\.isArray\(params\.q\)/);
  assert.match(page, /slice\(0, 120\)/);
});
