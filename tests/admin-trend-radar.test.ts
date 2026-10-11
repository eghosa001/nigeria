import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseTrendFeed, buildTrendSnapshot, X_REVIEW_LINKS } from "../lib/editorial-trend-reader";

const first = `<rss version="2.0"><channel>
<item><title>New Nollywood &amp; Nigerian movie</title><link>https://trends.google.com/trending?geo=NG</link>
<pubDate>Sun, 11 Oct 2026 12:00:00 GMT</pubDate><ht:approx_traffic>5K+</ht:approx_traffic></item>
</channel></rss>`;
const second = `<rss version="2.0"><channel>
<item><title><![CDATA[NYSC portal registration update]]></title><link>https://news.google.com/story?item=1</link>
<pubDate>Sun, 11 Oct 2026 11:00:00 GMT</pubDate><source url="https://example.org">Verified publisher pending</source></item>
</channel></rss>`;

test("RSS parsing records dated original sources and decodes XML", () => {
  assert.equal(parseTrendFeed(first)[0].title, "New Nollywood & Nigerian movie");
  assert.equal(parseTrendFeed(second)[0].publisher, "Verified publisher pending");
  assert.equal(parseTrendFeed(first)[0].searchTraffic, "5K+");
  assert.throws(() => parseTrendFeed("<html>No RSS</html>"), /No RSS/);
  const unsafe = first.replace("https://trends.google.com/trending?geo=NG", "javascript:alert(1)");
  assert.equal(parseTrendFeed(unsafe).length, 0, "Only HTTPS sources may appear");
});

test("source sampling distinguishes Google search demand from news headlines", () => {
  const snapshot = buildTrendSnapshot([
    {
      source: { id: "trends", name: "Google Trends Nigeria", type: "Google Search trend", url: "https://trends.google.com/trending/rss?geo=NG" },
      records: parseTrendFeed(first),
    },
    {
      source: { id: "services", name: "Nigerian Services", pillar: "Services", type: "Google News headline", url: "https://news.google.com/rss" },
      records: parseTrendFeed(second),
    },
    {
      source: { id: "broken", name: "Unavailable", pillar: "Tour Nigeria", type: "Google News headline", url: "https://news.google.com/rss" },
      error: "HTTP 429",
    },
  ], new Date("2026-10-11T15:00:00Z"));
  assert.equal(snapshot.leads.length, 2);
  assert.equal(snapshot.leads[0].pillar, "Movies & Entertainment");
  assert.equal(snapshot.leads[0].approximateSearchTraffic, "5K+");
  assert.equal(snapshot.leads[1].pillar, "Services");
  assert.equal(snapshot.leads[1].approximateSearchTraffic, undefined);
  assert.equal(snapshot.reports[2].state, "error");
  assert.match(snapshot.reports[2].issue || "", /429/);
  assert.equal(new Set(snapshot.leads.map((lead) => lead.id)).size, snapshot.leads.length);
  const stale = buildTrendSnapshot([
    { source: { id: "trends", name: "Google Trends", type: "Google Search trend", url: "https://trends.google.com" }, records: parseTrendFeed(first) },
  ], new Date("2026-10-20T15:00:00Z"));
  assert.equal(stale.leads.length, 0);
});

test("X research is editor-only and carries all four separate pillar searches", () => {
  assert.equal(X_REVIEW_LINKS.length, 4);
  assert.equal(new Set(X_REVIEW_LINKS.map((item) => item.label)).size, 4);
  assert.ok(X_REVIEW_LINKS.every((item) => item.url.startsWith("https://x.com/search?")));
});

test("admin route has an additional auth gate and no public publishing handler", () => {
  const page = readFileSync(new URL("../app/admin/trends/page.tsx", import.meta.url), "utf8");
  const client = readFileSync(new URL("../components/admin-trend-review-board.tsx", import.meta.url), "utf8");
  const home = readFileSync(new URL("../app/admin/page.tsx", import.meta.url), "utf8");
  const nav = readFileSync(new URL("../components/admin-nav.tsx", import.meta.url), "utf8");
  assert.match(page, /hasAdminSession\(\)/);
  assert.match(page, /readAdminTrends\(\)/);
  assert.match(page, /not an import of/);
  assert.match(client, /private to this browser/i);
  assert.match(page, /workflows\/free-nigeria-trend-radar\.yml/);
  assert.match(client, /window\.localStorage/);
  assert.match(client, /EDITORIAL_SHORTLIST_NOT_APPROVAL/);
  assert.doesNotMatch(client, /fetch\(\s*["']\/admin\/api\//);
  assert.match(home, /href="\/admin\/trends"/);
  assert.match(nav, /href: "\/admin\/trends"/);
});
