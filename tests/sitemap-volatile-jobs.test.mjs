import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("rolling job collections cannot become noindex while still advertised in static sitemaps", () => {
  const sitemap = readFileSync("lib/sitemap-sections.ts", "utf8");
  const newJobs = readFileSync("app/jobs/new-this-week/page.tsx", "utf8");
  const closing = readFileSync("app/jobs/closing-this-week/page.tsx", "utf8");

  // Both are rolling, seven-day collections. Their indexability changes when
  // there are no results; generated static XML cannot follow that change.
  for (const [slug, source] of [
    ["new-this-week", newJobs],
    ["closing-this-week", closing],
  ]) {
    assert.match(source, /items\.length \? undefined : \{ index: false, follow: true \}/, slug);
    assert.ok(!sitemap.includes('base + "/jobs/' + slug + '"'), slug + " must not appear in the static sitemap");
  }
  assert.match(sitemap, /base \+ "\/jobs\/open-now"/);
  assert.match(sitemap, /base \+ "\/jobs\/deadlines"/);
});

test("open Jobs canonical title does not exceed search display length", () => {
  const openNow = readFileSync("app/jobs/open-now/page.tsx", "utf8");
  assert.match(openNow, /title: \{ absolute: "Open Jobs in Nigeria \| MyNigeriaGuide" \}/);
  assert.match(openNow, /canonical: "\/jobs\/open-now"/);
});
