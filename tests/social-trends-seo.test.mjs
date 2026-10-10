import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("social trends have sourced, dated chart data and a canonical route", () => {
  const page = read("app/entertainment/social-trends/page.tsx");
  assert.match(page, /canonical: "\/entertainment\/social-trends"/);
  assert.match(page, /2026-10-10/);
  assert.match(page, /kworb\.net\/youtube\/trending\/ng\.html/);
  assert.match(page, /soundcharts\.com\/en\/charts\/youtube\/nigeria/);
  assert.match(page, /datareportal\.com\/reports\/digital-2026-nigeria/);
  assert.match(page, /late.2025/);
});

test("social guide is reachable from discovery and indexed once", () => {
  assert.match(read("app/entertainment/page.tsx"), /href="\/entertainment\/social-trends"/);
  assert.match(read("data/home-social-trends.ts"), /href: "\/entertainment\/social-trends"/);
  const sitemap = read("lib/sitemap-sections.ts");
  assert.equal(sitemap.split('url: base + "/entertainment/social-trends"').length - 1, 1);
});
