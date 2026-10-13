/**
 * Parse our generated XML sitemaps, differentiating sitemap indexes from URL sets.
 * IndexNow must receive page URLs, never the child-sitemap locations.
 */
const decodeXml = (value) => value.replace(/&(?:amp|lt|gt|quot|apos);/g, (entity) =>
  ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'" })[entity]);

export function parseSitemap(xml) {
  const kind = /<sitemapindex(?:\s|>)/i.test(xml) ? "index"
    : /<urlset(?:\s|>)/i.test(xml) ? "urls"
    : null;
  if (!kind) throw new Error("Expected a sitemapindex or urlset XML document.");

  const itemTag = kind === "index" ? "sitemap" : "url";
  const itemPattern = new RegExp("<" + itemTag + "(?:\\s[^>]*)?>([\\s\\S]*?)<\\/" + itemTag + ">", "gi");
  const entries = [];
  for (const item of xml.matchAll(itemPattern)) {
    const loc = item[1].match(/<loc>\s*([^<]+?)\s*<\/loc>/i);
    if (!loc) throw new Error("Sitemap item has no loc element.");
    entries.push(decodeXml(loc[1].trim()));
  }
  if (!entries.length) throw new Error("Sitemap contained no locations.");
  return { kind, entries };
}

export function canonicalPageUrls(urls, base) {
  const origin = new URL(base).origin;
  const selected = new Set();
  for (const candidate of urls) {
    let parsed;
    try { parsed = new URL(candidate); } catch { continue; }
    if (parsed.origin !== origin || parsed.username || parsed.password || parsed.search || parsed.hash ||
        parsed.pathname.startsWith("/sitemaps/") || parsed.pathname.endsWith(".xml")) continue;
    selected.add(parsed.href);
  }
  return [...selected];
}

/** Return per-URL meaningful-update timestamps without changing the legacy parser. */
export function parseSitemapRecords(xml) {
  const parsed = parseSitemap(xml);
  if (parsed.kind === "index") return parsed;
  const blocks = [...xml.matchAll(/<url(?:\s[^>]*)?>([\s\S]*?)<\/url>/gi)];
  if (blocks.length !== parsed.entries.length) throw new Error("Sitemap record count mismatch.");
  return {
    kind: "urls",
    entries: parsed.entries.map((url, i) => {
      const match = blocks[i][1].match(/<lastmod>\s*([^<]+?)\s*<\/lastmod>/i);
      return { url, lastModified: match ? decodeXml(match[1].trim()) : "" };
    }),
  };
}
