import type { EntertainmentTitle } from "@/lib/entertainment";

/**
 * Small, catalogue-independent image-permission check.
 *
 * This is intentionally the same strict policy as the server's
 * canDisplayEntertainmentArtwork. Keeping the client copy separate from the
 * 150k+ source-record module prevents every movie listing from importing
 * the complete editorial film database merely to check an image's rights.
 *
 * Any change to the server policy must preserve the parity regression test.
 */
export function canDisplayClientEntertainmentArtwork(title: EntertainmentTitle) {
  const artwork = title.artwork;
  return Boolean(
    artwork &&
    artwork.status === "approved" &&
    artwork.url &&
    artwork.sourceUrl &&
    artwork.credit &&
    artwork.licenseNote &&
    artwork.lastChecked &&
    ["press-kit-permission", "direct-permission", "licensed", "creative-commons"].includes(artwork.usageBasis),
  );
}
