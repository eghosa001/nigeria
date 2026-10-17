import type { EntertainmentTitle } from "@/lib/entertainment";

export type VerifiedYouTubePreview = {
  videoId: string;
  href: string;
  publisher?: string;
  kind: "trailer" | "full-movie";
};

/** Never derive a video poster from an unverified, third-party or non-YouTube URL. */
export function getVerifiedYouTubePreview(title: EntertainmentTitle): VerifiedYouTubePreview | null {
  const fullMovie = title.watchLinks.find((link) =>
    link.platform === "YouTube" &&
    link.access === "full-movie" &&
    // Source-checked direct video links can be valid without a separate
    // publisher profile URL. Older reviewed records store the channel in
    // publisher or note, but not in the optional publisherUrl property.
    Boolean(link.lastChecked?.trim()) &&
    Boolean(link.href),
  );
  const choices = [
    title.trailer && title.trailer.lastChecked
      ? { href: title.trailer.href, publisher: title.trailer.publisher, kind: "trailer" as const }
      : null,
    fullMovie
      ? { href: fullMovie.href, publisher: fullMovie.publisher, kind: "full-movie" as const }
      : null,
  ];
  for (const source of choices) {
    if (!source) continue;
    try {
      const url = new URL(source.href);
      if (url.protocol !== "https:") continue;
      const domain = url.hostname.toLowerCase();
      let id = "";
      if (domain === "youtu.be") id = url.pathname.slice(1).split("/")[0];
      else if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(domain)) {
        if (url.pathname === "/watch") id = url.searchParams.get("v") ?? "";
        else if (url.pathname.startsWith("/shorts/") || url.pathname.startsWith("/live/")) id = url.pathname.split("/")[2] ?? "";
      }
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return { ...source, videoId: id };
    } catch {
      // A malformed or off-platform source is not a verified YouTube thumbnail.
    }
  }
  return null;
}

/**
 * This is a source-linked editorial preview, NOT a claim of a commercial
 * poster licence. The approved/licensed artwork branch takes precedence.
 * An arbitrary movie database image does not qualify.
 */
export function getSourceLinkedFilmPreview(title: EntertainmentTitle) {
  const preview = title.sourcePreview;
  if (!preview ||
      !["official-film-site", "official-distributor", "official-exhibitor", "press-supplied"].includes(preview.sourceKind) ||
      !preview.credit?.trim() ||
      !preview.lastChecked ||
      !preview.sourceUrl?.startsWith("https://") ||
      !preview.url?.startsWith("https://")) return null;
  return preview;
}
