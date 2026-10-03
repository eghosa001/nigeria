const site = process.env.LIVE_BASE_URL || "https://mynigeriaguide.com";
const host = new URL(site).host;
const key = "6ce5a25890f63884432abbd2a7223bd6";
const keyLocation = site + "/" + key + ".txt";
const userAgent = "MyNigeriaGuide-IndexNow/1.0";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, options, label, attempts = 6) {
  let lastResponse;
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, options);
      lastResponse = response;

      if (response.ok || ![429, 500, 502, 503, 504].includes(response.status)) {
        return response;
      }

      console.warn(label + " returned HTTP " + response.status + " (attempt " + attempt + "/" + attempts + ").");
    } catch (error) {
      lastError = error;
      console.warn(label + " request failed (attempt " + attempt + "/" + attempts + "): " + error.message);
    }

    if (attempt < attempts) await sleep(5000 * attempt);
  }

  if (lastResponse) return lastResponse;
  throw lastError ?? new Error(label + " request failed.");
}

const sitemap = await fetchWithRetry(
  site + "/sitemap.xml",
  { headers: { "User-Agent": userAgent } },
  "Live sitemap",
);

if (!sitemap.ok) throw new Error("Unable to fetch live sitemap after retries: HTTP " + sitemap.status);

const xml = await sitemap.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const uniqueUrls = [...new Set(urls)].filter((url) => url.startsWith(site + "/") || url === site);

if (!uniqueUrls.length) throw new Error("No URLs found in live sitemap.");
if (uniqueUrls.length > 10000) throw new Error("IndexNow batch is too large.");

const response = await fetchWithRetry(
  "https://api.indexnow.org/indexnow",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "User-Agent": userAgent,
    },
    body: JSON.stringify({
      host,
      key,
      keyLocation,
      urlList: uniqueUrls,
    }),
  },
  "IndexNow submission",
);

const body = await response.text();
if (![200, 202].includes(response.status)) {
  throw new Error("IndexNow submission failed: HTTP " + response.status + (body ? " " + body.slice(0, 300) : ""));
}

console.log("IndexNow accepted " + uniqueUrls.length + " URLs with HTTP " + response.status + ".");
console.log("Key location: " + keyLocation);
