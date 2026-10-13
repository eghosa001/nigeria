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
const canonicalOwners = new Map<string, string>();
const changedPageRecords: Array<{ url: string; lastModified: string }> = [];

for (const section of sitemapSectionNames) {
  const entries = getSitemapEntries(section);
  changedPageRecords.push(...entries.filter((entry) => entry.lastModified));
  for (const entry of entries) {
    const previous = canonicalOwners.get(entry.url);
    if (previous) {
      throw new Error("Duplicate sitemap canonical URL in " + previous + " and " + section + ": " + entry.url);
    }
    canonicalOwners.set(entry.url, section);
  }
  for (let start = 0; start < entries.length; start += SITEMAP_SHARD_SIZE) {
    const shard = Math.floor(start / SITEMAP_SHARD_SIZE) + 1;
    const name = shard === 1 ? section : section + "-" + shard;
    const records = entries.slice(start, start + SITEMAP_SHARD_SIZE);
    const file = name + ".xml";
    const xml = xmlHeader + "<urlset " + xmlns + ">" +
      records.map(({ url, lastModified }) =>
        "<url><loc>" + escapeXml(url) + "</loc>" +
        (lastModified ? "<lastmod>" + escapeXml(lastModified) + "</lastmod>" : "") +
        "</url>").join("") +
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


const recentPages = changedPageRecords
  .filter((entry) => !Number.isNaN(Date.parse(entry.lastModified)) &&
    Date.parse(entry.lastModified) <= Date.now())
  .sort((a, b) => b.lastModified.localeCompare(a.lastModified) || a.url.localeCompare(b.url))
  .slice(0, 200);
const feedXml = xmlHeader +
  '<rss version="2.0"><channel>' +
  '<title>MyNigeriaGuide — Recently Updated Pages</title>' +
  '<link>' + escapeXml(productionSiteUrl) + '</link>' +
  '<description>Updated Nigerian services, entertainment, travel and careers guides.</description>' +
  '<language>en-ng</language>' +
  recentPages.map(({ url, lastModified }) => {
    const segment = new URL(url).pathname.split("/").filter(Boolean).pop() || "MyNigeriaGuide";
    const title = segment.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
    const pubDate = new Date(lastModified.length === 10 ? lastModified + "T12:00:00Z" : lastModified).toUTCString();
    return "<item><title>" + escapeXml(title) + "</title><link>" + escapeXml(url) +
      "</link><guid isPermaLink=\"true\">" + escapeXml(url) + "</guid><pubDate>" +
      escapeXml(pubDate) + "</pubDate></item>";
  }).join("") + "</channel></rss>";


const { indexableYouTubeMovies } = await import("../lib/youtube-library");
const videoRows = indexableYouTubeMovies
  // Curated titles point at their separate movie canonical, not this video route.
  .filter((movie) => movie.source !== "curated" &&
    /^[A-Za-z0-9_-]{11}$/.test(movie.videoId) &&
    movie.title.trim().length > 0 &&
    movie.synopsis.trim().length >= 30 &&
    /^\d{4}-\d{2}-\d{2}/.test(movie.publishedAt));
const videoXml = xmlHeader +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
  'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">' +
  videoRows.map((movie) => {
    const id = movie.videoId;
    const url = productionSiteUrl + "/entertainment/youtube/" + id;
    const seconds = Math.round(movie.durationMinutes * 60);
    return "<url><loc>" + escapeXml(url) + "</loc><video:video>" +
      "<video:thumbnail_loc>" + escapeXml("https://i.ytimg.com/vi/" + id + "/hqdefault.jpg") + "</video:thumbnail_loc>" +
      "<video:title>" + escapeXml(movie.title.slice(0, 100)) + "</video:title>" +
      "<video:description>" + escapeXml(movie.synopsis.slice(0, 2048)) + "</video:description>" +
      "<video:player_loc>" + escapeXml("https://www.youtube.com/embed/" + id) + "</video:player_loc>" +
      (seconds >= 1 && seconds <= 28800 ? "<video:duration>" + seconds + "</video:duration>" : "") +
      "<video:publication_date>" + escapeXml(movie.publishedAt.slice(0, 10)) + "</video:publication_date>" +
      "</video:video></url>";
  }).join("") + "</urlset>";
if (!videoRows.length) throw new Error("No verified, indexable YouTube detail movies for video discovery.");

await Promise.all([
  writeFile(resolve(root, "video-sitemap.xml"), videoXml, "utf8"),
  writeFile(resolve(root, "recent-pages.xml"), feedXml, "utf8"),
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
