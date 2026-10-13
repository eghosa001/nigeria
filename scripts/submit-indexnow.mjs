import { readFile, writeFile, appendFile } from "node:fs/promises";
import { parseSitemap, parseSitemapRecords } from "./indexnow-sitemap.mjs";
import { selectIndexNowChanges } from "./indexnow-state.mjs";

const site = (process.env.LIVE_BASE_URL || "https://mynigeriaguide.com").replace(/\/+$/, "");
const host = new URL(site).host;
const key = "6ce5a25890f63884432abbd2a7223bd6";
const keyLocation = site + "/" + key + ".txt";
const userAgent = "MyNigeriaGuide-IndexNow/2.0";
const stateFile = process.env.INDEXNOW_STATE_FILE || ".indexnow-state.json";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, options, label, attempts = 4) {
  let lastResponse, lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { ...options, signal: AbortSignal.timeout(20000) });
      lastResponse = response;
      if (response.ok || ![429, 500, 502, 503, 504].includes(response.status)) return response;
      console.warn(label + " HTTP " + response.status + " (attempt " + attempt + "/" + attempts + ")");
    } catch (error) {
      lastError = error;
      console.warn(label + " request error (attempt " + attempt + "/" + attempts + "): " + error.message);
    }
    if (attempt < attempts) await sleep(1500 * attempt);
  }
  if (lastResponse) return lastResponse;
  throw lastError ?? new Error(label + " request failed.");
}
async function fetchSitemap(url) {
  const response = await fetchWithRetry(url, { headers: { "User-Agent": userAgent } }, "Sitemap");
  if (!response.ok) throw new Error("Unable to fetch sitemap " + url + ": HTTP " + response.status);
  return parseSitemapRecords(await response.text());
}
async function main() {
  const index = await fetchSitemap(site + "/sitemap-index.xml");
  let records = [];
  if (index.kind === "urls") records = index.entries;
  else {
    const children = index.entries.filter((url) => {
      try { return new URL(url).origin === new URL(site).origin && new URL(url).pathname.endsWith(".xml"); }
      catch { return false; }
    });
    if (children.length !== index.entries.length || children.length > 1000)
      throw new Error("Untrusted or oversized sitemap index.");
    for (let i = 0; i < children.length; i += 4) {
      const sections = await Promise.all(children.slice(i, i + 4).map(fetchSitemap));
      for (const section of sections) {
        if (section.kind !== "urls") throw new Error("Child sitemap is not a URL set.");
        records.push(...section.entries);
      }
    }
  }
  if (!records.length) throw new Error("Published sitemap has no URLs; refusing to submit.");
  const keyResponse = await fetchWithRetry(keyLocation, { headers: { "User-Agent": userAgent } }, "IndexNow key");
  if (!keyResponse.ok || (await keyResponse.text()).trim() !== key)
    throw new Error("Production IndexNow ownership key is missing or invalid.");

  let oldState = null;
  try { oldState = JSON.parse(await readFile(stateFile, "utf8")); }
  catch (error) { if (error.code !== "ENOENT") throw error; }

  const changedPaths = (process.env.INDEXNOW_CHANGED_PATHS || "").split(",").filter(Boolean);
  const result = selectIndexNowChanges(records, site, oldState, changedPaths,
    process.env.INDEXNOW_FORCE_ALL === "true");
  const urls = [...new Set([...result.changed, ...result.removed])];
  console.log("IndexNow: " + result.changed.length + " new/updated, " +
    result.removed.length + " removed, " + result.unchanged + " unchanged.");
  for (let i = 0; i < urls.length; i += 10000) {
    const batch = urls.slice(i, i + 10000);
    const response = await fetchWithRetry("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8", "User-Agent": userAgent },
      body: JSON.stringify({ host, key, keyLocation, urlList: batch }),
    }, "IndexNow batch");
    const body = await response.text();
    if (![200, 202].includes(response.status)) {
      throw new Error("IndexNow HTTP " + response.status + ": " + body.slice(0, 300));
    }
    console.log("IndexNow accepted " + batch.length + " URLs with HTTP " + response.status + ".");
  }
  // Advance the checkpoint only after every batch was accepted.
  await writeFile(stateFile, JSON.stringify(result.snapshot), "utf8");
  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY,
      "### IndexNow discovery\n\n- Added/updated: " + result.changed.length +
      "\n- Removed: " + result.removed.length +
      "\n- Unchanged/skipped: " + result.unchanged +
      "\n- Batches accepted: " + Math.ceil(urls.length / 10000) +
      "\n\nHTTP acceptance is **not** an indexing guarantee.\n");
  }
}
await main();
