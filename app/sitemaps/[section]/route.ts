import { getSitemapEntries, sitemapSectionNames, type SitemapSectionName } from "@/lib/sitemap-sections";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> },
) {
  const raw = (await params).section;
  const name = raw.endsWith(".xml") ? raw.slice(0, -4) : raw;
  if (!sitemapSectionNames.includes(name as SitemapSectionName)) {
    return new Response("Not found", { status: 404 });
  }

  const entries = getSitemapEntries(name as SitemapSectionName);
  const body = entries.map((entry) =>
    "<url><loc>" + escapeXml(entry.url) + "</loc><lastmod>" + escapeXml(entry.lastModified) + "</lastmod></url>"
  ).join("");

  const xml = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + body + '</urlset>';

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
