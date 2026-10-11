/**
 * Admin-only, read-time view of the same free RSS sources collected by
 * tools/nigeria-trend-radar.mjs. No API keys and no automatic publication.
 *
 * This page samples sources on demand. The independent twice-daily Actions
 * research report remains in workflow artifacts; do not imply it has been
 * ingested into a durable review database.
 */
export type TrendPillar = "Movies & Entertainment" | "Services" | "Tour Nigeria" | "Jobs & Careers";
export type TrendSourceState = { id: string; name: string; state: "ok" | "error"; received: number; issue?: string };
export type TrendLead = {
  id: string;
  title: string;
  href: string;
  pillar: TrendPillar;
  source: string;
  sourceType: "Google Search trend" | "Google News headline";
  publishedAt: string;
  approximateSearchTraffic?: string;
};

const SOURCES: Array<{ id: string; name: string; pillar?: TrendPillar; type: TrendLead["sourceType"]; url: string }> = [
  {
    id: "google-trends-ng", name: "Google Trends Nigeria RSS", type: "Google Search trend",
    url: "https://trends.google.com/trending/rss?geo=NG",
  },
  {
    id: "nigeria-entertainment", name: "Google News: Nigerian entertainment", pillar: "Movies & Entertainment", type: "Google News headline",
    url: "https://news.google.com/rss/search?q=Nollywood%20OR%20%22Nigerian%20movie%22%20OR%20Afrobeats%20when%3A2d&hl=en-NG&gl=NG&ceid=NG%3Aen",
  },
  {
    id: "nigeria-services", name: "Google News: Nigerian services", pillar: "Services", type: "Google News headline",
    url: "https://news.google.com/rss/search?q=Nigeria%20NIN%20OR%20NYSC%20OR%20passport%20OR%20CAC%20OR%20JAMB%20when%3A2d&hl=en-NG&gl=NG&ceid=NG%3Aen",
  },
  {
    id: "nigeria-tourism", name: "Google News: Nigerian tourism", pillar: "Tour Nigeria", type: "Google News headline",
    url: "https://news.google.com/rss/search?q=Nigeria%20tourism%20OR%20festival%20OR%20travel%20events%20when%3A2d&hl=en-NG&gl=NG&ceid=NG%3Aen",
  },
  {
    id: "nigeria-jobs", name: "Google News: Nigerian opportunities", pillar: "Jobs & Careers", type: "Google News headline",
    url: "https://news.google.com/rss/search?q=Nigeria%20recruitment%20OR%20internship%20OR%20graduate%20trainee%20when%3A2d&hl=en-NG&gl=NG&ceid=NG%3Aen",
  },
];

export const X_REVIEW_LINKS: Array<{ label: TrendPillar; url: string }> = [
  { label: "Movies & Entertainment", url: "https://x.com/search?q=Nollywood%20OR%20Afrobeats&f=live" },
  { label: "Services", url: "https://x.com/search?q=NYSC%20OR%20NIMC%20OR%20JAMB%20OR%20CAC&f=live" },
  { label: "Tour Nigeria", url: "https://x.com/search?q=Nigeria%20festival%20OR%20tourism%20OR%20Lagos%20events&f=live" },
  { label: "Jobs & Careers", url: "https://x.com/search?q=Nigeria%20recruitment%20OR%20graduate%20jobs&f=live" },
];

const RULES: Array<{ pillar: TrendPillar; rx: RegExp }> = [
  { pillar: "Movies & Entertainment", rx: /\b(nollywood|movie|film|cinema|actor|actress|afrobeats?|singer|song|music|album|comedy)\b/i },
  { pillar: "Services", rx: /\b(nysc|nin|nimc|ninauth|passport|jamb|waec|neco|bvn|cac|inec|immigration|birth certificate|driver.s licence)\b/i },
  { pillar: "Tour Nigeria", rx: /\b(tourism|tourist|attractions?|resort|travel guide|carnival|felabration|lagos festival|calabar|obudu|beach|heritage|art gallery)\b/i },
  { pillar: "Jobs & Careers", rx: /\b(recruitment|vacancy|graduate trainee|hiring|internship|job|career|scholarship|fellowship|application deadline|startup accelerator)\b/i },
];

function xmlText(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_all, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#([0-9]+);/g, (_all, code: string) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (s) => ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'", "&nbsp;": " " })[s] || s)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(item: string, name: string) {
  const rx = new RegExp("<" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?:\\s[^>]*)?>([\\s\\S]*?)<\\/" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ">", "i");
  return xmlText(item.match(rx)?.[1] ?? "");
}

function safeLink(link: string) {
  try {
    const url = new URL(link);
    if (url.protocol !== "https:" || !url.hostname || url.username || url.password) return "";
    return url.toString();
  } catch { return ""; }
}

export function parseTrendFeed(xml: string) {
  if (!/<rss\b/i.test(xml) || !/<item\b/i.test(xml)) throw new Error("No RSS records received");
  return [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].slice(0, 65).map((match) => ({
    title: tag(match[1], "title"),
    href: safeLink(tag(match[1], "link")),
    date: tag(match[1], "pubDate"),
    publisher: tag(match[1], "source"),
    searchTraffic: tag(match[1], "ht:approx_traffic"),
  })).filter((item) => item.title && item.href);
}

function recent(date: string, now: number) {
  const ms = Date.parse(date);
  return Number.isFinite(ms) && ms <= now + 10 * 60_000 && ms >= now - 72 * 60 * 60_000;
}

export function buildTrendSnapshot(
  received: Array<{ source: typeof SOURCES[number]; records?: ReturnType<typeof parseTrendFeed>; error?: string }>,
  now = new Date(),
) {
  const reports: TrendSourceState[] = [];
  const leads: TrendLead[] = [];
  const seen = new Set<string>();
  for (const { source, records, error } of received) {
    reports.push({ id: source.id, name: source.name, state: error ? "error" : "ok", received: records?.length || 0, issue: error });
    for (const item of records || []) {
      if (!recent(item.date, now.getTime())) continue;
      const targets = source.pillar ? [source.pillar] : RULES.filter(r => r.rx.test(item.title)).map(r => r.pillar);
      for (const pillar of targets) {
        const fingerprint = pillar + "|" + item.title.toLocaleLowerCase().replace(/\W/g, "");
        if (seen.has(fingerprint)) continue;
        seen.add(fingerprint);
        leads.push({
          id: source.id + "|" + pillar + "|" + encodeURIComponent(item.href).slice(0, 370),
          title: item.title.slice(0, 190),
          href: item.href,
          pillar,
          source: item.publisher || source.name,
          sourceType: source.type,
          publishedAt: new Date(item.date).toISOString(),
          ...(source.type === "Google Search trend" && item.searchTraffic ? { approximateSearchTraffic: item.searchTraffic } : {}),
        });
      }
    }
  }
  return { checkedAt: now.toISOString(), reports, leads: leads.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 100) };
}

export async function readAdminTrends() {
  const incoming = await Promise.all(SOURCES.map(async (source) => {
    try {
      const response = await fetch(source.url, {
        headers: { "Accept": "application/rss+xml, application/xml, text/xml" },
        cache: "no-store",
        signal: AbortSignal.timeout(6500),
      });
      if (!response.ok) throw new Error("Source HTTP " + response.status);
      const xml = (await response.text()).slice(0, 1_200_000);
      return { source, records: parseTrendFeed(xml) };
    } catch (error) {
      return { source, error: error instanceof Error ? error.message : "Source unavailable" };
    }
  }));
  return buildTrendSnapshot(incoming);
}
