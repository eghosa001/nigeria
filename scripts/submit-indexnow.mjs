const site = "https://mynigeriaguide.com";
const host = "mynigeriaguide.com";
const key = "6ce5a25890f63884432abbd2a7223bd6";
const keyLocation = site + "/" + key + ".txt";

const sitemap = await fetch(site + "/sitemap.xml", { headers: { "User-Agent": "MyNigeriaGuide-IndexNow/1.0" } });
if (!sitemap.ok) throw new Error("Unable to fetch live sitemap: HTTP " + sitemap.status);

const xml = await sitemap.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const uniqueUrls = [...new Set(urls)].filter((url) => url.startsWith(site + "/") || url === site);

if (!uniqueUrls.length) throw new Error("No URLs found in live sitemap.");
if (uniqueUrls.length > 10000) throw new Error("IndexNow batch is too large.");

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "User-Agent": "MyNigeriaGuide-IndexNow/1.0",
  },
  body: JSON.stringify({
    host,
    key,
    keyLocation,
    urlList: uniqueUrls,
  }),
});

const body = await response.text();
if (![200, 202].includes(response.status)) {
  throw new Error("IndexNow submission failed: HTTP " + response.status + (body ? " " + body.slice(0, 300) : ""));
}

console.log("IndexNow accepted " + uniqueUrls.length + " URLs with HTTP " + response.status + ".");
console.log("Key location: " + keyLocation);
