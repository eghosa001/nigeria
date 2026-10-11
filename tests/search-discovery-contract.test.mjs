import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, readdirSync } from "node:fs";

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
  // Sitemap routes come from catalog records at runtime. Literal-string checks
  // alone reject real canonical URLs produced by the sitemap's dynamic .map().
  // Resolve every verified services catalog imported by lib/data.ts, not just
  // the original services.json file. Curated links can target scaled catalogs.
  const serviceCatalogs = [
    "data/services.json",
    "data/services-scale-verified.json",
    "data/services-private-extended.json",
    "data/services-growth-wave-3.json",
    "data/services-growth-wave-5.json",
    "data/services-growth-wave-6.json",
    "data/services-growth-wave-7.json",
    "data/services-cac-partnerships.json",
  ];
  const serviceSlugs = new Set(serviceCatalogs.flatMap((file) =>
    JSON.parse(readFileSync(file, "utf8")).map((item) => item.slug),
  ));
  const careerGuides = readFileSync("lib/career-guides.ts", "utf8");
  const movieCatalog = readFileSync("lib/entertainment.ts", "utf8");
  const platformHubs = readFileSync("lib/entertainment-platform-hubs.ts", "utf8");
  const tourSources = readdirSync("lib")
    .filter((name) => /^explore(?:-growth-wave|-trend-events|-kainji|\.ts)/.test(name) && name.endsWith(".ts"))
    .map((name) => readFileSync("lib/" + name, "utf8"))
    .join("\n");
  const hasSlug = (source, slug) => source.includes('slug: "' + slug + '"') || source.includes('"slug": "' + slug + '"');
  const links = [...form.matchAll(/href: "([^"]+)"/g)].map((match) => match[1]);
  assert.ok(links.length >= 12);
  assert.equal(new Set(links).size, links.length);
  for (const link of links) {
    const path = link.split("?")[0];
    if (path.startsWith("/topics/")) assert.ok(hasSlug(topics, path.slice(8)), link);
    else if (path.startsWith("/services/")) assert.ok(serviceSlugs.has(path.slice(10)), link);
    else if (path.startsWith("/jobs/guides/")) assert.ok(hasSlug(careerGuides, path.slice(13)), link);
    else if (path.startsWith("/entertainment/platforms/")) assert.ok(hasSlug(platformHubs, path.slice(25)), link);
    else if (path.startsWith("/entertainment/movies/")) assert.ok(hasSlug(movieCatalog, path.slice(22)), link);
    else if (path.startsWith("/explore/") && path !== "/explore/events")
      assert.ok(hasSlug(tourSources, path.slice(9)) || sitemaps.includes('"' + path + '"'), link);
    else assert.ok(sitemaps.includes('"' + path + '"'), link);
  }
  assert.match(page, /<GlobalSearchForm initialQuery={query}/);
  assert.match(form, /aria-autocomplete="list"/);
  assert.match(form, /event.key === "ArrowDown"/);
  assert.match(form, /event.key === "Escape"/);
});
