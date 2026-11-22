import NextLink from "next/link";
import type { ComponentProps } from "react";
import { canonicalGuidePath } from "@/lib/seo-routes";

/**
 * Render one-hop navigation to the public canonical guide URL.
 * This is an adapter around NextLink, not a new navigation client.
 *
 * Keep directory hubs, utility paths, fragments, query strings and external
 * destinations unchanged; only the retired single-slug article URLs move.
 */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const destination = typeof href === "string"
    ? canonicalGuidePath(href)
    : href.pathname
      ? { ...href, pathname: canonicalGuidePath(href.pathname) }
      : href;
  return <NextLink {...props} href={destination} />;
}
