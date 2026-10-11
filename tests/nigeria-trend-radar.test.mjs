import test from "node:test";
import assert from "node:assert/strict";
import {
  FEEDS, X_MANUAL_RESEARCH, classifySearch, fetchFeed, makeReport,
  parseRss, recentItems, toMarkdown, xmlDecode,
} from "../tools/nigeria-trend-radar.mjs";

const NOW = new Date("2026-10-11T15:00:00Z");
const google = '<rss version="2.0"><channel><item><title>Nollywood &amp; Nigerian movie</title><link>https://trends.google.com/trending?geo=NG</link><pubDate>Sun, 11 Oct 2026 12:00:00 GMT</pubDate><ht:approx_traffic>10K+</ht:approx_traffic></item></channel></rss>';
const news = '<rss version="2.0"><channel><item><title><![CDATA[NYSC &amp; NIMC programme update]]></title><link>https://example.org/story</link><pubDate>Sun, 11 Oct 2026 12:30:00 GMT</pubDate><source url="https://publisher.example">Example Publisher</source></item></channel></rss>';

test("XML parsing preserves attribution and discards HTML markup without fabricated metrics", () => {
  assert.equal(xmlDecode("<b> &amp; &#x26; </b>"), "& &");
  assert.deepEqual(parseRss(google).map((v) => v.title), ["Nollywood & Nigerian movie"]);
  assert.equal(parseRss(news)[0].publisher, "Example Publisher");
  assert.equal(parseRss(google)[0].approximateTraffic, "10K+");
  assert.throws(() => parseRss("<html><body>unsupported</body></html>"), /not a recognized RSS/);
});

test("reported Google searches are categorized but not mistaken for nationwide X trends", () => {
  assert.ok(classifySearch("Nigerian passport renewal").includes("Services"));
  assert.ok(classifySearch("Upcoming Lagos festival").includes("Tour Nigeria"));
  assert.ok(classifySearch("New Nollywood movie").includes("Movies & Entertainment"));
  assert.ok(classifySearch("graduate trainee recruitment").includes("Jobs & Careers"));
  assert.deepEqual(classifySearch("Liverpool 3-1 Manchester United"), []);
  assert.equal(X_MANUAL_RESEARCH.length, 4);
  assert.ok(X_MANUAL_RESEARCH.every((v) => v.url.startsWith("https://x.com/search?")));
});

test("evidence remains unpublished and per-source counts are never represented as X engagement", () => {
  const report = makeReport([
    { ...FEEDS[0], items: parseRss(google), error: null },
    { ...FEEDS[2], items: parseRss(news), error: null },
    { ...FEEDS[3], items: [], error: "HTTP 503" },
  ], NOW);
  assert.equal(report.byPillar["Movies & Entertainment"].length, 1);
  assert.equal(report.byPillar.Services.length, 1);
  assert.equal(report.byPillar.Services[0].approximateTraffic, null);
  assert.equal(report.byPillar["Movies & Entertainment"][0].approximateTraffic, "10K+");
  assert.ok(report.byPillar.Services[0].verifiedForPublication === false);
  assert.match(report.dataQuality, /NOT social-platform popularity/);
  assert.match(report.manualXResearch.reason, /No free official nationwide X trend API/);
  const md = toMarkdown(report);
  assert.match(md, /unverified lead/);
  assert.match(md, /manual editorial review/);
  assert.match(md, /HTTP 503/);
});

test("outdated and future-dated items are removed from trend selection", () => {
  const items = parseRss(google);
  assert.equal(recentItems(items, NOW).length, 1);
  assert.equal(recentItems(items, new Date("2026-10-20T15:00:00Z")).length, 0);
  assert.equal(recentItems([{ ...items[0], publishedAt: "2026-10-14" }], NOW).length, 0);
});

test("failed feeds return structured errors without inventing results", async () => {
  const result = await fetchFeed(FEEDS[0], async () => ({
    ok: false,
    status: 429,
    headers: new Headers(),
  }));
  assert.deepEqual(result.items, []);
  assert.match(result.error, /HTTP 429/);
});
