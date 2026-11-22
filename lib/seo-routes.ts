/**
 * MyNigeriaGuide's new public guide identity.
 *
 * All old article URLs are retired as independently served pages. 308s take
 * existing readers to the newly published canonical URLs. The same mapping
 * powers metadata and XML sitemaps so Google sees only one new destination.
 * Category and directory landing pages remain reader-facing entry points.
 */
export type GuideMove = {
  legacy: string;
  current: string;
  reserved?: readonly string[];
};

export const guideMoves: readonly GuideMove[] = [
  { legacy: "/entertainment/youtube/channels", current: "/guides/youtube-channels" },
  { legacy: "/entertainment/movies", current: "/guides/movies", reserved: ["page", "october-2026"] },
  { legacy: "/entertainment/series", current: "/guides/series" },
  { legacy: "/entertainment/youtube", current: "/guides/videos", reserved: ["channels", "page"] },
  { legacy: "/entertainment/people", current: "/guides/people" },
  { legacy: "/entertainment/platforms", current: "/guides/platforms" },
  { legacy: "/jobs/employers", current: "/guides/employers" },
  { legacy: "/jobs/locations", current: "/guides/job-locations" },
  { legacy: "/jobs/professions", current: "/guides/job-professions" },
  { legacy: "/jobs/categories", current: "/guides/job-categories" },
  { legacy: "/jobs/guides", current: "/guides/careers" },
  { legacy: "/services", current: "/guides/services", reserved: ["page"] },
  { legacy: "/explore", current: "/guides/travel",
    reserved: ["events", "trip-planner", "things-to-do-lagos", "things-to-do-abuja"] },
  { legacy: "/jobs", current: "/guides/jobs",
    reserved: ["open-now", "nysc", "government", "private", "deadlines", "graduate", "internships",
      "engineering", "remote", "employers", "locations", "professions", "categories",
      "guides", "new-this-week", "closing-this-week"] },
  { legacy: "/categories", current: "/guides/categories" },
  { legacy: "/agencies", current: "/guides/agencies" },
  { legacy: "/topics", current: "/guides/topics" },
  { legacy: "/locations", current: "/guides/locations" },
];

export function canonicalGuidePath(path: string): string {
  const match = /^([^?#]*)([?#].*)?$/.exec(path);
  if (!match) return path;
  const pathname = match[1].replace(/\/$/, "");
  for (const move of guideMoves) {
    if (!pathname.startsWith(move.legacy + "/")) continue;
    const slug = pathname.slice(move.legacy.length + 1);
    if (!slug || slug.includes("/") || move.reserved?.includes(slug)) continue;
    return move.current + "/" + slug + (match[2] || "");
  }
  return path;
}

export function canonicalGuideUrl(url: string): string {
  // Call only for generated first-party URLs, never for third-party links.
  const parsed = new URL(url);
  const canonical = canonicalGuidePath(parsed.pathname);
  if (canonical === parsed.pathname) return url;
  parsed.pathname = canonical;
  return parsed.toString();
}

export function guideRedirects() {
  return guideMoves.map(({ legacy, current, reserved }) => {
    const excluded = reserved?.length
      ? "((?!(?:" + reserved.join("|") + ")$)[^/]+)"
      : "";
    return {
      source: legacy + "/:slug" + excluded,
      destination: current + "/:slug",
      permanent: true,
    };
  });
}

export function guideRewrites() {
  return guideMoves.map(({ legacy, current }) => ({
    source: current + "/:slug",
    destination: legacy + "/:slug",
  }));
}
