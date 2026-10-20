import type { Metadata } from "next";

/**
 * Prevent content pages from inheriting the homepage's Open Graph title,
 * description and URL. Call only with the route's already-validated copy:
 * this helper never invents keywords, facts, images or freshness dates.
 */
export function pageSocialMetadata(
  title: string,
  description: string,
  canonical: string,
  type: "website" | "article" = "website",
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: { title, description, url: canonical, type },
    twitter: { card: "summary_large_image", title, description },
  };
}
