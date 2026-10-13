import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const read = (path) => readFileSync(resolve("public", path), "utf8");

test("canonical static sitemap index and shards are generated before build", () => {
  const canonical = "https://mynigeriaguide.com";
  const a = read("sitemap.xml");
  assert.equal(a, read("sitemap-index.xml"));
  assert.match(a, /^<\?xml version="1\.0"/);
  assert.match(a, /<sitemapindex /);
  assert.match(a, /https:\/\/mynigeriaguide\.com\/sitemaps\/services\.xml/);
  assert.match(a, /https:\/\/mynigeriaguide\.com\/sitemaps\/youtube\.xml/);
  assert.doesNotMatch(a, /workers\.dev|localhost/);

  const core = read("sitemaps/core.xml");
  assert.ok(core.includes("<url><loc>https://mynigeriaguide.com/privacy</loc></url>"));
  assert.ok(core.includes("<url><loc>https://mynigeriaguide.com/terms</loc></url>"));
  assert.ok(core.includes("<url><loc>https://mynigeriaguide.com</loc><lastmod>"));

  for (const name of readdirSync(resolve("public/sitemaps")).filter((name) => name.endsWith(".xml"))) {
    const xml = read("sitemaps/" + name);
    assert.match(xml, /<urlset /, name);
    assert.ok(xml.includes(canonical), name);
    assert.doesNotMatch(xml, /workers\.dev|localhost/, name);
    assert.ok((xml.match(/<url>/g) ?? []).length <= 20_000, name);
  }
});

test("AdSense has early head bootstrap and is excluded on admin paths", () => {
  const layout = readFileSync(resolve("app/layout.tsx"), "utf8");
  assert.match(layout, /adsenseBootstrap/);
  assert.match(layout, /data-mynigeriaguide-adsense/);
  assert.match(layout, /path === "\/admin"/);
  assert.ok(!layout.includes("<AdsenseScript />"), "do not double-load");
});

test("recently changed canonical page feed is emitted alongside sitemap", () => {
  const rss = read("recent-pages.xml");
  assert.match(rss, /<rss version="2\.0">/);
  assert.match(rss, /<item><title>/);
  assert.match(rss, /https:\/\/mynigeriaguide\.com\//);
  assert.doesNotMatch(rss, /workers\.dev|localhost|<loc>/);
  assert.ok((rss.match(/<item>/g) ?? []).length <= 200);
});

test("video sitemap only advertises verified YouTube movie detail pages", () => {
  const xml = read("video-sitemap.xml");
  assert.match(xml, /xmlns:video="http:\/\/www\.google\.com\/schemas\/sitemap-video\/1\.1"/);
  const count = (xml.match(/<video:video>/g) ?? []).length;
  assert.ok(count > 0 && count <= 20_000, "expected bounded validated videos");
  assert.equal(count, (xml.match(/<video:player_loc>/g) ?? []).length);
  assert.equal(count, (xml.match(/<video:thumbnail_loc>/g) ?? []).length);
  assert.equal(count, (xml.match(/<video:description>/g) ?? []).length);
  assert.match(xml, /https:\/\/mynigeriaguide\.com\/entertainment\/youtube\//);
  assert.doesNotMatch(xml, /workers\.dev|localhost|<\/?video:content_loc>/);
});
