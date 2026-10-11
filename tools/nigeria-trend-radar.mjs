import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

/**
 * Free Nigeria editorial signal collector. Source labels mean exactly:
 *  - Google Trends RSS: search interest, NOT X/Twitter trends.
 *  - Google News RSS: indexed publisher headlines, NOT verified events or social engagement.
 *  - X: manual review links only; do not scrape unofficial trend sites.
 *
 * Never publish items automatically or call unverified impressions "traffic".
 */
export const FEEDS = [
  {
    id: "google-trends-ng",
    pillar: "unclassified",
    kind: "google-search-trend",
    url: "https://trends.google.com/trending/rss?geo=NG",
    source: "Google Trends — Nigeria Trending Now RSS",
  },
  {
    id: "nigeria-entertainment",
    pillar: "Movies & Entertainment",
    kind: "news-headline",
    url: "https://news.google.com/rss/search?q=Nollywood%20OR%20%22Nigerian%20movie%22%20OR%20Afrobeats%20when%3A2d&hl=en-NG&gl=NG&ceid=NG%3Aen",
    source: "Google News — Nigerian entertainment search",
  },
  {
    id: "nigeria-services",
    pillar: "Services",
    kind: "news-headline",
    url: "https://news.google.com/rss/search?q=Nigeria%20NIN%20OR%20NYSC%20OR%20passport%20OR%20CAC%20OR%20JAMB%20when%3A2d&hl=en-NG&gl=NG&ceid=NG%3Aen",
    source: "Google News — Nigerian services search",
  },
  {
    id: "nigeria-tourism",
    pillar: "Tour Nigeria",
    kind: "news-headline",
    url: "https://news.google.com/rss/search?q=Nigeria%20tourism%20OR%20festival%20OR%20travel%20events%20when%3A2d&hl=en-NG&gl=NG&ceid=NG%3Aen",
    source: "Google News — Nigerian tourism search",
  },
  {
    id: "nigeria-jobs",
    pillar: "Jobs & Careers",
    kind: "news-headline",
    url: "https://news.google.com/rss/search?q=Nigeria%20recruitment%20OR%20internship%20OR%20graduate%20trainee%20when%3A2d&hl=en-NG&gl=NG&ceid=NG%3Aen",
    source: "Google News — Nigerian opportunities search",
  },
];

export const X_MANUAL_RESEARCH = [
  {
    pillar: "Movies & Entertainment",
    url: "https://x.com/search?q=Nollywood%20OR%20Afrobeats&f=live",
  },
  {
    pillar: "Services",
    url: "https://x.com/search?q=NYSC%20OR%20NIMC%20OR%20JAMB%20OR%20CAC&f=live",
  },
  {
    pillar: "Tour Nigeria",
    url: "https://x.com/search?q=Nigeria%20festival%20OR%20tourism%20OR%20Lagos%20events&f=live",
  },
  {
    pillar: "Jobs & Careers",
    url: "https://x.com/search?q=Nigeria%20recruitment%20OR%20graduate%20jobs&f=live",
  },
];

const PILLARS = ["Movies & Entertainment", "Services", "Tour Nigeria", "Jobs & Careers"];
const SEARCH_RULES = [
  {
    pillar: "Movies & Entertainment",
    test: /\b(nollywood|movie|movies|film|cinema|actor|actress|series|afrobeats?|singer|song|music|album|concert|comedy|festival performer)\b/i,
  },
  {
    pillar: "Services",
    test: /\b(nysc|nin|nimc|ninauth|passport|jamb|waec|neco|bvn|cac|inec|immigration|customs portal|birth certificate|driver.s licence|tax id)\b/i,
  },
  {
    pillar: "Tour Nigeria",
    test: /\b(tourism|tourist|attractions?|resort|travel guide|carnival|felabration|lagos fashion|lagos festival|calabar|obudu|beach|hotel|heritage|art gallery)\b/i,
  },
  {
    pillar: "Jobs & Careers",
    test: /\b(recruitment|vacancy|graduate trainee|hiring|internship|job|career|scholarship|fellowship|application deadline|startup accelerator)\b/i,
  },
];

export function xmlDecode(value) {
  return String(value)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, digits) => {
      const code = Number.parseInt(digits, 16);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : "";
    })
    .replace(/&#([0-9]+);/g, (_, digits) => {
      const code = Number.parseInt(digits, 10);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : "";
    })
    .replace(/&(?:amp|lt|gt|quot|apos|nbsp);/g, (entity) => ({
      "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": "\"",
      "&apos;": "'", "&nbsp;": " ",
    })[entity] ?? entity)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(item, name) {
  const match = item.match(new RegExp("<" + name + "(?:\\s[^>]*)?>([\\s\\S]*?)<\\/" + name + ">", "i"));
  return match ? xmlDecode(match[1]) : "";
}

export function parseRss(xml) {
  if (typeof xml !== "string" || !/<(?:rss|feed)\b/i.test(xml)) {
    throw new Error("Response is not a recognized RSS or Atom feed");
  }
  const items = [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].slice(0, 110);
  if (!items.length) throw new Error("RSS response has no item elements");
  return items.map((match) => {
    const body = match[1];
    return {
      title: tag(body, "title"),
      url: tag(body, "link"),
      publishedAt: tag(body, "pubDate") || tag(body, "published") || tag(body, "updated"),
      publisher: tag(body, "source"),
      approximateTraffic: tag(body, "ht:approx_traffic"),
    };
  }).filter((item) => item.title && /^https?:\/\/\S+/i.test(item.url));
}

export function classifySearch(title) {
  return SEARCH_RULES.filter((rule) => rule.test.test(title)).map((rule) => rule.pillar);
}

export function recentItems(items, now = new Date(), hours = 72) {
  const cutoff = now.getTime() - hours * 60 * 60 * 1000;
  return items.filter((item) => {
    const published = new Date(item.publishedAt).getTime();
    return Number.isFinite(published) &&
      published <= now.getTime() + 10 * 60 * 1000 && published >= cutoff;
  });
}

function normalizeTitle(value) {
  return value.toLowerCase().normalize("NFKC").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

export function makeReport(feedResults, now = new Date()) {
  const byPillar = Object.fromEntries(PILLARS.map((pillar) => [pillar, []]));
  const seen = new Set();
  for (const result of feedResults) {
    if (result.error) continue;
    for (const item of recentItems(result.items, now)) {
      const pillarMatches = result.pillar === "unclassified"
        ? classifySearch(item.title)
        : [result.pillar];
      if (!pillarMatches.length) continue;
      const key = normalizeTitle(item.title);
      if (seen.has(key)) continue;
      seen.add(key);
      for (const pillar of pillarMatches) {
        if (byPillar[pillar].length >= 18) continue;
        byPillar[pillar].push({
          title: item.title.slice(0, 190),
          url: item.url,
          publisher: item.publisher || result.source,
          observedFrom: result.source,
          evidenceType: result.kind,
          publishedAt: new Date(item.publishedAt).toISOString(),
          approximateTraffic: result.kind === "google-search-trend"
            ? item.approximateTraffic || null : null,
          verification: "editorial_review_required",
          verifiedForPublication: false,
        });
      }
    }
  }
  return {
    generatedAt: now.toISOString(),
    geography: "Nigeria (feed query geo=NG or gl=NG; individual stories still need checking)",
    dataQuality: "Search trends and news discovery, NOT social-platform popularity or X trends",
    feeds: feedResults.map(({ id, source, kind, error, items }) => ({
      id, source, kind, status: error ? "failed" : "ok",
      received: items.length, error: error || null,
    })),
    manualXResearch: {
      reason: "No free official nationwide X trend API connected. These are editor-only X Explore search links; never scrape third-party trend archives or pretend to have API counts.",
      requiresLogin: true,
      links: X_MANUAL_RESEARCH,
    },
    byPillar,
    publicationPolicy: "Do not import directly into published records. Verify dates, first-party announcements, authorisation, duplicate slugs, website policy and source URLs before editorial changes.",
  };
}

export async function fetchFeed(feed, fetchImpl = fetch) {
  try {
    const response = await fetchImpl(feed.url, {
      headers: { "User-Agent": "MyNigeriaGuideEditorialRadar/1.0 (source-linked headlines only)" },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const contentType = response.headers.get("content-type") || "";
    if (!/xml|rss|text\/plain/i.test(contentType)) {
      throw new Error("Not RSS/XML content-type: " + contentType.slice(0, 100));
    }
    const xml = (await response.text()).slice(0, 1_500_000);
    const items = parseRss(xml);
    return { ...feed, items, error: null };
  } catch (error) {
    return { ...feed, items: [], error: String(error) };
  }
}

export function toMarkdown(report) {
  const out = [
    "# MyNigeriaGuide — Free Nigeria trend research",
    "",
    "Generated (UTC): " + report.generatedAt,
    "",
    "## Evidence standards",
    "",
    "- Google Trends = rising Google search queries, NOT Twitter/X popularity.",
    "- Google News = publisher headlines, NOT independently verified facts.",
    "- X/Twitter links below are for manual editorial review only; no X API or automated scraping.",
    "- Nothing in this report is automatically added to the public website.",
    "",
    "## Source availability",
  ];
  for (const feed of report.feeds) {
    out.push("- " + feed.source + ": " + feed.status +
      " (" + feed.received + " items)" + (feed.error ? " — " + feed.error : ""));
  }
  for (const pillar of PILLARS) {
    out.push("", "## " + pillar, "");
    const rows = report.byPillar[pillar];
    if (!rows.length) out.push("No qualifying recent, attributed items found.");
    for (const row of rows) {
      out.push("- [" + row.title.replace(/[\[\]]/g, "") + "](" + row.url + ") (" +
        row.evidenceType + "; " + row.publishedAt + ") — **unverified lead**");
    }
  }
  out.push("", "## Twitter/X manual review (not a trend ranking)");
  for (const link of report.manualXResearch.links) {
    out.push("- [" + link.pillar + "](" + link.url + ")");
  }
  return out.join("\n") + "\n";
}

async function main() {
  const results = await Promise.all(FEEDS.map((feed) => fetchFeed(feed)));
  const report = makeReport(results);
  await mkdir("artifacts", { recursive: true });
  await Promise.all([
    writeFile("artifacts/nigeria-trend-radar.json", JSON.stringify(report, null, 2) + "\n"),
    writeFile("artifacts/nigeria-trend-radar.md", toMarkdown(report)),
  ]);
  console.log("NIGERIA_TREND_RADAR " + JSON.stringify({
    at: report.generatedAt,
    sources: report.feeds,
    leadsByPillar: Object.fromEntries(Object.entries(report.byPillar).map(([pillar, rows]) => [pillar, rows.length])),
    publicUpdates: 0,
    xMode: "manual_only",
  }));
  if (!results.some((result) => !result.error)) {
    console.error("All free feeds failed; saved error report instead of fabricating trends.");
    process.exitCode = 1;
  }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === fileURLToPath(new URL("file://" + process.argv[1]))) {
  await main();
}
