import type { Metadata } from "next";

/**
 * Preserve the page's verified search copy, but do not inherit the homepage's
 * OG/X title, description or URL on distinct canonical routes.
 * The shared brand image is intentionally a fallback, not an invented photo.
 */
export function pageSocialMetadata(
  title: string,
  description: string,
  canonical: string,
  type: "website" | "article" = "website",
): Pick<Metadata, "openGraph" | "twitter"> {
  const brandImage = "/opengraph-image";
  return {
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      images: [{ url: brandImage, alt: "MyNigeriaGuide brand artwork" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [brandImage],
    },
  };
}

/**
 * Static sitewide/category pages already curate accurate HTML titles, short
 * descriptions and canonicals. Reuse those fields without copying strings,
 * rewriting search metadata or replacing existing custom media metadata.
 */
export function withStaticSocialMetadata(metadata: Metadata): Metadata {
  const title = metadata.title;
  const socialTitle = typeof title === "string"
    ? title
    : title && typeof title === "object" && "absolute" in title && typeof title.absolute === "string"
      ? title.absolute : null;
  const description = metadata.description;
  const canonical = metadata.alternates?.canonical;
  const canonicalUrl = typeof canonical === "string"
    ? canonical
    : canonical instanceof URL ? canonical.href : null;
  if (!socialTitle || !description || !canonicalUrl) return metadata;
  const defaults = pageSocialMetadata(socialTitle, description, canonicalUrl);
  return {
    ...metadata,
    openGraph: metadata.openGraph ?? defaults.openGraph,
    twitter: metadata.twitter ?? defaults.twitter,
  };
}
