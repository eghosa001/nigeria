import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("social trends have sourced, dated chart data and a canonical route", () => {
  const page = read("app/entertainment/social-trends/page.tsx");
  assert.match(page, /canonical: "\/entertainment\/social-trends"/);
  assert.match(page, /dateModified: "2026-10-26"/);
  assert.match(page, /recentNigeriaVideoSnapshot/);
  assert.match(page, /Taylor Jasmine & Carterefe/);
  assert.match(page, /Ruwan Dare — Season 2 trailer/);
  assert.match(page, /Ikunle 2 — trailer/);
  assert.match(page, /tubestats\.io\/trending-videos\/NG/);
  assert.match(page, /Archive: earlier October chart entries/);
  assert.match(page, /Those dates have passed/);
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


test("social discovery includes public research across major platforms without invented reach", () => {
  const page = read("app/entertainment/social-trends/page.tsx");
  for (const platform of ["TikTok", "Instagram", "Facebook", "Threads", "WhatsApp Channels"]) {
    assert.ok(page.includes('name: "' + platform + '"'), platform);
  }
  assert.match(page, /https:\/\/x\.com\/search\?q=/);
  assert.match(page, /not a Nigeria-only trend ranking/);
  assert.match(page, /not a live YouTube ranking/);
});

test("fresh homepage trend carries dated primary and independent chart sources", () => {
  const home = read("data/home-social-trends.ts");
  assert.match(home, /title: "Met You: Carterefe and Taylor Jasmine top Nigeria's 25 October video chart"/);
  assert.match(home, /primaryUrl: "https:\/\/music\.apple\.com\/us\/music-video\/met-you\/6824769428"/);
  assert.match(home, /corroborationUrl: "https:\/\/kworb\.net\/youtube\/trending\/ng\.html"/);
  assert.match(home, /expiresAt: "2026-10-28"/);
});
