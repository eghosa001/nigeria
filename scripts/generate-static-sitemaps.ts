/**
 * Generate public sitemap XML once in Node at build time.
 * Serving the XML directly as Cloudflare static assets avoids importing
 * the large Jobs/Movies/YouTube catalogs into a Worker just to list URLs.
 */
import { mkdir, readdir, unlink, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { productionSiteUrl } from "../lib/site";

// Staging and local builds must still advertise only the canonical production host.
process.env.NEXT_PUBLIC_SITE_URL = productionSiteUrl;
const { getSitemapEntries, sitemapSectionNames, SITEMAP_SHARD_SIZE } =
  await import("../lib/sitemap-sections");

const root = resolve("public");
const shardRoot = resolve(root, "sitemaps");
const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
const xmlns = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
const escapeXml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
const latest = (dates: string[]) => dates.reduce((max, date) => date > max ? date : max, "");

await mkdir(shardRoot, { recursive: true });
const sitemapFiles = new Set<string>();
const index: Array<{ url: string; lastModified: string }> = [];
let totalURLs = 0;

for (const section of sitemapSectionNames) {
  const entries = getSitemapEntries(section);
  for (let start = 0; start < entries.length; start += SITEMAP_SHARD_SIZE) {
    const shard = Math.floor(start / SITEMAP_SHARD_SIZE) + 1;
    const name = shard === 1 ? section : section + "-" + shard;
    const records = entries.slice(start, start + SITEMAP_SHARD_SIZE);
    const file = name + ".xml";
    const xml = xmlHeader + "<urlset " + xmlns + ">" +
      records.map(({ url, lastModified }) =>
        "<url><loc>" + escapeXml(url) + "</loc><lastmod>" +
        escapeXml(lastModified) + "</lastmod></url>").join("") +
      "</urlset>";

    if (records.some((entry) => !entry.url.startsWith(productionSiteUrl + "/") && entry.url !== productionSiteUrl)) {
      throw new Error("Non-canonical sitemap URL in " + file);
    }
    await writeFile(resolve(shardRoot, file), xml, "utf8");
    sitemapFiles.add(file);
    index.push({ url: productionSiteUrl + "/sitemaps/" + file, lastModified: latest(records.map((entry) => entry.lastModified)) });
    totalURLs += records.length;
  }
}

if (index.length === 0) throw new Error("No indexable URLs were generated");
const indexXml = xmlHeader + "<sitemapindex " + xmlns + ">" +
  index.map(({ url, lastModified }) =>
    "<sitemap><loc>" + escapeXml(url) + "</loc><lastmod>" +
    escapeXml(lastModified) + "</lastmod></sitemap>").join("") +
  "</sitemapindex>";

await Promise.all([
  writeFile(resolve(root, "sitemap.xml"), indexXml, "utf8"),
  writeFile(resolve(root, "sitemap-index.xml"), indexXml, "utf8"),
]);

// Avoid stale shards after a catalog shrinks or a shard threshold changes.
for (const file of await readdir(shardRoot)) {
  if (file.endsWith(".xml") && !sitemapFiles.has(file)) {
    await unlink(resolve(shardRoot, file));
  }
}
console.log("Static XML sitemaps:", index.length, "shards;", totalURLs, "canonical URLs");
