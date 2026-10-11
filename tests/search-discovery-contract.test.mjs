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

test("curated autocomplete destinations match existing canonical catalogs", () => {
  const form = readFileSync("components/global-search-form.tsx", "utf8");
  const page = readFileSync("app/search/page.tsx", "utf8");
  const topics = readFileSync("lib/growth-hubs.ts", "utf8");
  const tours = readFileSync("lib/explore.ts", "utf8");
  const sitemaps = readFileSync("lib/sitemap-sections.ts", "utf8");
  const links = [...form.matchAll(/href: "([^"]+)"/g)].map((match) => match[1]);
  assert.ok(links.length >= 12);
  assert.equal(new Set(links).size, links.length);
  for (const link of links) {
    if (link.startsWith("/topics/")) assert.ok(topics.includes('slug: "' + link.slice(8) + '"'), link);
    else if (link.startsWith("/explore/") && link !== "/explore/events")
      assert.ok(tours.includes('slug: "' + link.slice(9) + '"') || sitemaps.includes('"' + link + '"'), link);
    else assert.ok(sitemaps.includes('"' + link + '"'), link);
  }
  assert.match(page, /<GlobalSearchForm initialQuery={query}/);
  assert.match(form, /aria-autocomplete="list"/);
  assert.match(form, /event.key === "ArrowDown"/);
  assert.match(form, /event.key === "Escape"/);
});
