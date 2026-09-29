import type { MetadataRoute } from "next";
import { getSitemapEntries, sitemapSectionNames } from "@/lib/sitemap-sections";

export default function sitemap(): MetadataRoute.Sitemap {
  const seen = new Set<string>();

  return sitemapSectionNames
    .flatMap((section) => getSitemapEntries(section))
    .filter((entry) => {
      if (seen.has(entry.url)) return false;
      seen.add(entry.url);
      return true;
    })
    .map((entry) => ({
      url: entry.url,
      lastModified: entry.lastModified,
    }));
}
