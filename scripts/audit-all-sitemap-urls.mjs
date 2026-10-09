import { mkdir, writeFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";

const base = process.env.SEO_BASE_URL || "https://mynigeriaguide.com";
const host = new URL(base).host;
const sitemapUrl = process.env.SEO_SITEMAP || base + "/sitemap-index.xml";
const concurrency = Math.max(1, Math.min(8, Number(process.env.SEO_CONCURRENCY || 5)));
const maxUrls = Math.max(0, Number(process.env.SEO_MAX_URLS || 0));
const output = process.env.SEO_REPORT_DIR || "seo-audit-results";
const userAgent = "MyNigeriaGuide-SEOAuditBot/1.0 (+https://mynigeriaguide.com/about)";

function cleanUrl(value) {
  try {
    const url = new URL(value, base);
    if (url.protocol !== "https:" || url.host !== host) return null;
    url.search = ""; url.hash = "";
    return url.origin + (url.pathname.replace(/\/+$/, "") || "/");
  } catch { return null; }
}
function attribute(tag, name) {
  const match = tag.match(new RegExp("(?:\\s|<)" + name + "\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^\\s>]+))", "i"));
  return match ? (match[1] ?? match[2] ?? match[3] ?? "") : null;
}
function tags(html, tag) {
  return [...html.matchAll(new RegExp("<" + tag + "(?=[\\s/>])[^>]*>", "gi"))].map((m) => m[0]);
}
function meta(head, name) {
  const tag = tags(head, "meta").find((t) => attribute(t, "name")?.toLowerCase() === name);
  return tag ? attribute(tag, "content") : null;
}
function plain(text) {
  return text.replace(/&(?:nbsp|amp|lt|gt|quot|#39);/gi, " ").replace(/\s+/g, " ").trim();
}
function schemas(html) {
  const matches = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let valid = 0, invalid = 0;
  for (const match of matches) {
    try { JSON.parse(match[1]); valid++; } catch { invalid++; }
  }
  return { valid, invalid };
}
function auditHtml(html, url, status, ms, finalUrl) {
  const issues = [];
  const issue = (code, severity, detail) => issues.push({ code, severity, detail });
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || "";
  const title = plain((head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").replace(/<[^>]*>/g, " "));
  const description = meta(head, "description") || "";
  const canonical = attribute(tags(head, "link").find((t) => /\bcanonical\b/i.test(attribute(t, "rel") || "")) || "", "href");
  const canonicalUrl = canonical ? cleanUrl(canonical) : null;
  const robots = (meta(head, "robots") || "").toLowerCase();
  const noindex = /(^|[,\s])noindex([,\s]|$)/.test(robots);
  const h1Count = tags(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ""), "h1").length;
  const img = tags(html, "img");
  const imageMissingAlt = img.filter((t) => attribute(t, "alt") === null).length;
  const imageEmptyAlt = img.filter((t) => attribute(t, "alt") === "").length;
  const imageMissingDimensions = img.filter((t) => !attribute(t, "width") || !attribute(t, "height")).length;
  const schema = schemas(html);
  const body = (html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html)
    .replace(/<(script|style|svg|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ");
  const wordCount = plain(body).split(/\s+/).filter(Boolean).length;
  const internalLinks = [...new Set(tags(html, "a").map((t) => attribute(t, "href"))
    .filter(Boolean).map(cleanUrl).filter(Boolean))];
  if (status !== 200) issue("http-status", "critical", "HTTP " + status);
  if (finalUrl && cleanUrl(finalUrl) !== cleanUrl(url)) issue("unexpected-redirect", "high", finalUrl);
  if (!head) issue("missing-head", "critical", "HTML head absent");
  if (!title) issue("missing-title-in-head", "critical", "Title not inside HTML head");
  if (!description) issue("missing-description", "high", "Meta description missing");
  if (!canonical) issue("missing-canonical", "high", "Canonical absent");
  else if (!canonicalUrl) issue("invalid-canonical", "high", canonical);
  else if (canonicalUrl !== cleanUrl(url)) issue("canonical-differs", "high", canonicalUrl);
  if (noindex) issue("sitemap-noindex", "critical", robots);
  if (h1Count !== 1) issue("h1-count", "medium", String(h1Count));
  if (schema.invalid) issue("invalid-jsonld", "high", String(schema.invalid));
  if (imageMissingAlt) issue("image-no-alt-attribute", "medium", String(imageMissingAlt));
  if (imageMissingDimensions) issue("image-no-dimensions", "medium", String(imageMissingDimensions));
  if (Buffer.byteLength(html) > 1024 * 1024) issue("html-over-1mb", "high", String(Buffer.byteLength(html)));
  if (ms > 8000) issue("response-over-8s", "high", String(ms));
  else if (ms > 3000) issue("response-over-3s", "medium", String(ms));
  return { url, status, finalUrl, durationMs: ms, htmlBytes: Buffer.byteLength(html),
    title, description, canonical: canonicalUrl, indexable: !noindex, robots,
    h1Count, wordCount, imageCount: img.length, imageMissingAlt, imageEmptyAlt,
    imageMissingDimensions, schema, internalLinks, issues };
}
async function get(url) {
  for (let n = 0; n < 3; n++) {
    const began = Date.now();
    try {
      const resp = await fetch(url, { headers: {
        "user-agent": userAgent, accept: "text/html,application/xml,text/xml;q=0.9,*/*;q=0.8"
      }, redirect: "follow", signal: AbortSignal.timeout(22000) });
      const text = await resp.text();
      if ([429, 500, 502, 503, 504].includes(resp.status) && n < 2) {
        await sleep((n + 1) * (n + 1) * 900); continue;
      }
      return { status: resp.status, html: text, ms: Date.now() - began, finalUrl: resp.url };
    } catch (error) {
      if (n === 2) return { status: 0, html: "", ms: Date.now() - began, error: String(error) };
      await sleep((n + 1) * (n + 1) * 800);
    }
  }
}
async function loadSitemaps(start) {
  const seen = new Set(), pages = new Map(), errors = [];
  async function walk(url, depth = 0) {
    if (seen.has(url) || depth > 4) return;
    seen.add(url);
    const fetched = await get(url);
    if (fetched.status !== 200) {
      errors.push({ url, status: fetched.status, error: fetched.error }); return;
    }
    const locs = [...fetched.html.matchAll(/<loc(?:\s[^>]*)?>([\s\S]*?)<\/loc>/gi)]
      .map((m) => m[1].trim().replace(/&amp;/g, "&"));
    if (/<sitemapindex[\s>]/i.test(fetched.html)) {
      for (const loc of locs) if (cleanUrl(loc)) await walk(loc, depth + 1);
    } else if (/<urlset[\s>]/i.test(fetched.html)) {
      for (const loc of locs) { const clean = cleanUrl(loc); if (clean) pages.set(clean, url); }
    } else errors.push({ url, error: "Unrecognized sitemap XML" });
    console.log("Sitemap " + url + ": " + locs.length);
  }
  await walk(start);
  return { seen: [...seen], pages, errors };
}
function counts(rows, prop) {
  const value = {};
  for (const row of rows) value[row[prop]] = (value[row[prop]] || 0) + 1;
  return value;
}
function pctl(numbers, p) {
  if (!numbers.length) return null;
  const arr = [...numbers].sort((a, b) => a - b);
  return arr[Math.ceil(arr.length * p) - 1] || arr[0];
}
async function main() {
  await mkdir(output, { recursive: true });
  const { seen, pages, errors } = await loadSitemaps(sitemapUrl);
  const all = [...pages.keys()].sort();
  const toAudit = maxUrls ? all.slice(0, maxUrls) : all;
  if (!toAudit.length) throw new Error("Published sitemap returned zero URLs");
  console.log("Discovered " + all.length + " unique URLs. Full audit target: " + toAudit.length);
  const records = new Array(toAudit.length);
  let cursor = 0, finished = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (cursor < toAudit.length) {
      const i = cursor++, url = toAudit[i];
      await sleep(180);
      const f = await get(url);
      records[i] = auditHtml(f.html, url, f.status, f.ms, f.finalUrl);
      if (f.error) records[i].issues.push({ code: "fetch-error", severity: "critical", detail: f.error });
      finished++;
      if (finished % 100 === 0) console.log("Crawled " + finished + "/" + toAudit.length);
    }
  }));
  const problems = records.flatMap((r) => r.issues.map((x) => ({ url: r.url, ...x })));
  const duplicates = (field) => {
    const index = new Map();
    for (const r of records) if (r[field]) {
      const key = r[field].toLowerCase();
      index.set(key, [...(index.get(key) || []), r.url]);
    }
    return [...index.entries()].filter(([, urls]) => urls.length > 1)
      .map(([text, urls]) => ({ text, urls }));
  };
  const missingSitemapLinks = new Map();
  for (const r of records) for (const link of r.internalLinks)
    if (!pages.has(link) && !missingSitemapLinks.has(link)) missingSitemapLinks.set(link, r.url);
  const summary = {
    scannedAt: new Date().toISOString(), startSitemap: sitemapUrl, sitemaps: seen,
    discovered: all.length, audited: records.length, statusCodes: counts(records, "status"),
    noindexInSitemap: records.filter((r) => !r.indexable).length,
    flaggedUrls: records.filter((r) => r.issues.length).length,
    issueInstances: problems.length, issuesByCode: counts(problems, "code"),
    issuesBySeverity: counts(problems, "severity"),
    responseMs: { median: pctl(records.map((r) => r.durationMs), .5),
      p95: pctl(records.map((r) => r.durationMs), .95) },
    duplicateTitles: duplicates("title"), duplicateDescriptions: duplicates("description"),
    missingSitemapLinks: [...missingSitemapLinks.entries()].map(([url, from]) => ({ url, from })),
    sitemapErrors: errors
  };
  await writeFile(output + "/all-pages.json", JSON.stringify({ summary, pages: records }, null, 2));
  const headline = [
    "# Full-sitemap SEO/HTTP crawl", "Generated: " + summary.scannedAt,
    "Scope: " + summary.audited + "/" + summary.discovered + " public sitemap URLs.",
    "This is independent crawler evidence, not a Lighthouse score or Google indexing guarantee.",
    "Sitemaps: " + seen.join(", "), "HTTP status totals: " + JSON.stringify(summary.statusCodes),
    "URLs with warnings: " + summary.flaggedUrls + "; issue instances: " + summary.issueInstances,
    "Issues by code: " + JSON.stringify(summary.issuesByCode),
    "Sitemap noindex: " + summary.noindexInSitemap,
    "Duplicate titles: " + summary.duplicateTitles.length + "; descriptions: " + summary.duplicateDescriptions.length,
    "Median / p95 response time (ms): " + JSON.stringify(summary.responseMs),
    "Out-of-sitemap link destinations (not necessarily broken): " + summary.missingSitemapLinks.length,
    "Sitemap errors: " + JSON.stringify(errors),
    "## First 150 high/critical issues",
    ...problems.filter((x) => x.severity === "high" || x.severity === "critical")
      .slice(0, 150).map((x) => "- **" + x.code + "** " + x.url + " — " + x.detail),
    "\nComplete per-URL findings (including clean pages) are in all-pages.json."
  ].join("\n");
  await writeFile(output + "/summary.md", headline);
  if (process.env.GITHUB_STEP_SUMMARY) await writeFile(process.env.GITHUB_STEP_SUMMARY, headline + "\n", { flag: "a" });
  console.log("FINAL_SUMMARY " + JSON.stringify({
    discovered: summary.discovered, audited: summary.audited, statusCodes: summary.statusCodes,
    flaggedUrls: summary.flaggedUrls, issueInstances: summary.issueInstances,
    issuesByCode: summary.issuesByCode, responseMs: summary.responseMs,
    sitemapErrors: summary.sitemapErrors.length
  }));
  if (errors.length || records.some((r) => r.status === 0)) process.exitCode = 1;
}
await main().catch((e) => { console.error(e); process.exitCode = 1; });
