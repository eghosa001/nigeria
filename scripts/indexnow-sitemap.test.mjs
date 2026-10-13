import test from "node:test";
import assert from "node:assert/strict";
import { parseSitemap, canonicalPageUrls } from "./indexnow-sitemap.mjs";

test("index entries are child sitemap URLs, not page URLs", () => {
  const index = parseSitemap('<?xml version="1.0"?><sitemapindex><sitemap><loc>https://mynigeriaguide.com/sitemaps/services.xml</loc></sitemap><sitemap><loc>https://mynigeriaguide.com/sitemaps/jobs.xml</loc></sitemap></sitemapindex>');
  assert.equal(index.kind, "index");
  assert.equal(index.entries.length, 2);
});

test("urlset resolves canonical pages and excludes sitemap/offsite duplicates", () => {
  const urlset = parseSitemap('<urlset><url><loc>https://mynigeriaguide.com/services/waec-check-result</loc></url><url><loc>https://mynigeriaguide.com/services/nin?x=1&amp;y=2</loc></url></urlset>');
  assert.equal(urlset.kind, "urls");
  assert.deepEqual(canonicalPageUrls([
    ...urlset.entries, urlset.entries[0],
    "https://mynigeriaguide.com/sitemaps/services.xml",
    "https://other.example/page",
  ], "https://mynigeriaguide.com"), ["https://mynigeriaguide.com/services/waec-check-result"]);
});

test("invalid sitemap root is refused", () => {
  assert.throws(() => parseSitemap('<html>not a sitemap</html>'), /Expected a sitemapindex/);
});
