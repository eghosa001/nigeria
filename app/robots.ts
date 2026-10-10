import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

const restrictedPaths = ["/admin", "/api/"];

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: restrictedPaths,
      },
      // The default rule already permits these search crawlers. Keep an explicit
      // search-discovery policy so future bot changes do not accidentally hide
      // public guides, while retaining the same private-path restrictions.
      {
        userAgent: ["OAI-SearchBot", "PerplexityBot", "Claude-SearchBot", "Claude-User"],
        allow: "/",
        disallow: restrictedPaths,
      },
    ],
    sitemap: base + "/sitemap-index.xml",
  };
}
