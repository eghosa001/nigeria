import test from "node:test";
import assert from "node:assert/strict";
import { parseSitemap, parseSitemapRecords, canonicalPageUrls } from "./indexnow-sitemap.mjs";
import { selectIndexNowChanges } from "./indexnow-state.mjs";

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

test("incremental notifications include only changed, new and removed canonical URLs", () => {
  const base = "https://mynigeriaguide.com";
  const records = parseSitemapRecords('<urlset>' +
    '<url><loc>' + base + '/services/keep</loc><lastmod>2026-10-10</lastmod></url>' +
    '<url><loc>' + base + '/jobs/new</loc><lastmod>2026-10-13</lastmod></url>' +
    '<url><loc>https://other.example/leak</loc></url></urlset>').entries;
  const before = {version: 1, origin: base, pages: {
    [base + "/services/keep"]: "2026-10-10", [base + "/jobs/old"]: "2026-10-11"
  }};
  const delta = selectIndexNowChanges(records, base, before);
  assert.deepEqual(delta.changed, [base + "/jobs/new"]);
  assert.deepEqual(delta.removed, [base + "/jobs/old"]);
  assert.equal(delta.unchanged, 1);
});
test("static route source changes notify without invented lastmod", () => {
  const base = "https://mynigeriaguide.com";
  const records = [{url: base + "/about", lastModified:""}];
  const previous = {version: 1, origin:base, pages:{[base + "/about"]:""}};
  assert.deepEqual(selectIndexNowChanges(records,base,previous,["app/about/page.tsx"]).changed, [base + "/about"]);
  assert.equal(selectIndexNowChanges(records,base,previous,["app/jobs/[slug]/page.tsx"]).changed.length,0);
});
