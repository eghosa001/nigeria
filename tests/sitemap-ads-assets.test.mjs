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
