import { parseSitemap, canonicalPageUrls } from "./indexnow-sitemap.mjs";

const site = (process.env.LIVE_BASE_URL || "https://mynigeriaguide.com").replace(/\/+$/, "");
const host = new URL(site).host;
const key = "6ce5a25890f63884432abbd2a7223bd6";
const keyLocation = site + "/" + key + ".txt";
const userAgent = "MyNigeriaGuide-IndexNow/1.0";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, options, label, attempts = 4) {
  let lastResponse;
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, options);
      lastResponse = response;
      if (response.ok || ![429, 500, 502, 503, 504].includes(response.status)) return response;
      console.warn(label + " returned HTTP " + response.status + " (attempt " + attempt + "/" + attempts + ").");
    } catch (error) {
      lastError = error;
      console.warn(label + " request failed (attempt " + attempt + "/" + attempts + "): " + error.message);
    }
    if (attempt < attempts) await sleep(1000 * attempt);
  }
  if (lastResponse) return lastResponse;
  throw lastError ?? new Error(label + " request failed.");
}

async function fetchSitemap(url) {
  const response = await fetchWithRetry(url, { headers: { "User-Agent": userAgent } }, "Sitemap");
  if (!response.ok) throw new Error("Unable to fetch sitemap " + url + ": HTTP " + response.status);
  return parseSitemap(await response.text());
}

const index = await fetchSitemap(site + "/sitemap-index.xml");
let pages = [];
if (index.kind === "urls") {
  pages = index.entries;
} else {
  // Do not crawl off-site sitemap locations supplied by accident.
  const children = index.entries.filter((url) => {
    try {
      const parsed = new URL(url);
      return parsed.origin === new URL(site).origin && parsed.pathname.endsWith(".xml");
    } catch { return false; }
  });
  if (children.length !== index.entries.length) throw new Error("Sitemap index contains an invalid child URL.");
  if (children.length > 1000) throw new Error("Too many sitemap shards; check the site index.");
  for (let i = 0; i < children.length; i += 4) {
    const sections = await Promise.all(children.slice(i, i + 4).map(fetchSitemap));
    for (const section of sections) {
      if (section.kind !== "urls") throw new Error("A child sitemap did not contain page URLs.");
      pages.push(...section.entries);
    }
  }
}

const urls = canonicalPageUrls(pages, site);
if (!urls.length) throw new Error("No same-host canonical page URLs found in published sitemap shards.");
console.log("IndexNow: resolved " + urls.length + " canonical pages (not sitemap files).");

for (let i = 0; i < urls.length; i += 10000) {
  const batch = urls.slice(i, i + 10000);
  const response = await fetchWithRetry(
    "https://api.indexnow.org/indexnow",
    {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8", "User-Agent": userAgent },
      body: JSON.stringify({ host, key, keyLocation, urlList: batch }),
    },
    "IndexNow batch",
  );
  const body = await response.text();
  if (![200, 202].includes(response.status)) {
    throw new Error("IndexNow submission failed: HTTP " + response.status + (body ? " " + body.slice(0, 300) : ""));
  }
  console.log("IndexNow accepted batch of " + batch.length + " URLs with HTTP " + response.status + ".");
}
console.log("Key location: " + keyLocation);
