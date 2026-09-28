import { govGuideUpdates } from "@/data/updates";
import { getSiteUrl } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const base = getSiteUrl();
  const items = govGuideUpdates.map((update) => {
    const link = base + "/updates#" + update.id;
    const pubDate = new Date(update.date + "T12:00:00Z").toUTCString();

    return `<item>
<title>${escapeXml(update.title)}</title>
<link>${escapeXml(link)}</link>
<guid isPermaLink="true">${escapeXml(link)}</guid>
<pubDate>${pubDate}</pubDate>
<category>${escapeXml(update.agency)}</category>
<description>${escapeXml(update.summary)}</description>
<source url="${escapeXml(update.sourceUrl)}">${escapeXml(update.sourceLabel)}</source>
</item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>GovGuide Nigeria — Verified Updates</title>
<link>${escapeXml(base + "/updates")}</link>
<description>Verified changes to Nigerian government service fees, processes and official guidance.</description>
<language>en-ng</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
