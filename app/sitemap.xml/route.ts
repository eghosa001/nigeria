import { getSitemapSections } from "@/lib/sitemap-sections";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const sections = getSitemapSections();
  const body = sections
    .map(
      (section) =>
        "<sitemap><loc>" +
        escapeXml(section.url) +
        "</loc><lastmod>" +
        escapeXml(section.lastModified) +
        "</lastmod></sitemap>",
    )
    .join("");

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    body +
    "</sitemapindex>";

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
