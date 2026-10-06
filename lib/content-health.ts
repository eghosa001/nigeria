import youtubeChannelCache from "@/data/youtube-channel-cache.json";
import { publicServices } from "@/lib/data";
import { entertainmentTitles } from "@/lib/entertainment";
import { cinemaGuides, platformGuides, releaseItems } from "@/lib/entertainment-extras";
import { exploreGuides } from "@/lib/explore";
import { explorePlaces } from "@/lib/explore-places";
import { jobOpportunities } from "@/lib/jobs";
import { freshnessPolicy, getFreshnessState, type FreshnessState } from "@/lib/content-freshness";

export type ContentHealthIssue = {
  pillar: "Services" | "Jobs" | "Movies" | "Tour" | "System";
  label: string;
  href: string;
  checkedAt: string;
  state: FreshnessState;
  detail: string;
};

function issue(
  pillar: ContentHealthIssue["pillar"],
  label: string,
  href: string,
  checkedAt: string,
  policy: { warnAfterDays: number; staleAfterDays: number },
  detail: string,
  now: Date,
): ContentHealthIssue | null {
  const state = getFreshnessState(checkedAt, policy, now);
  return state === "fresh" ? null : { pillar, label, href, checkedAt, state, detail };
}

export function getContentHealth(now = new Date()) {
  const issues: ContentHealthIssue[] = [];

  for (const service of publicServices) {
    const found = issue("Services", service.shortTitle, "/admin/services/" + service.slug, service.lastVerified, freshnessPolicy.services, "Service verification is due.", now);
    if (found) issues.push(found);
  }

  for (const job of jobOpportunities) {
    const found = issue("Jobs", job.organization + ": " + job.title, "/jobs/" + job.slug, job.verifiedAt, freshnessPolicy.jobs, "Job or employer-pathway verification is due.", now);
    if (found) issues.push(found);
  }

  for (const title of entertainmentTitles) {
    const checks = [
      ...title.watchLinks.map((link) => ({ date: link.lastChecked, detail: link.platform + " availability" })),
      ...(title.trailer ? [{ date: title.trailer.lastChecked, detail: "Trailer" }] : []),
      ...(title.sourcePreview ? [{ date: title.sourcePreview.lastChecked, detail: "Artwork source" }] : []),
      ...(title.artwork ? [{ date: title.artwork.lastChecked, detail: "Artwork rights" }] : []),
      ...(title.references ?? []).map((reference) => ({ date: reference.lastChecked, detail: reference.label })),
    ];
    for (const check of checks) {
      const found = issue("Movies", title.title, "/entertainment/movies/" + title.slug, check.date, freshnessPolicy.movies, check.detail + " check is due.", now);
      if (found) issues.push(found);
    }
  }

  for (const guide of platformGuides) {
    const found = issue("Movies", guide.name, "/entertainment/platforms/" + guide.slug, guide.lastChecked, freshnessPolicy.entertainmentGuide, "Streaming/platform guide check is due.", now);
    if (found) issues.push(found);
  }
  for (const cinema of cinemaGuides) {
    const found = issue("Movies", cinema.name, "/entertainment/cinemas", cinema.lastChecked, freshnessPolicy.entertainmentGuide, "Cinema booking/showtime guide check is due.", now);
    if (found) issues.push(found);
  }
  for (const release of releaseItems) {
    const found = issue("Movies", release.title, "/entertainment/releases", release.lastChecked, freshnessPolicy.releases, "Release/event source check is due.", now);
    if (found) issues.push(found);
  }

  for (const guide of exploreGuides) {
    const found = issue("Tour", guide.shortTitle, "/explore/" + guide.slug, guide.lastReviewed, freshnessPolicy.tour, "Travel guide review is due.", now);
    if (found) issues.push(found);
  }
  for (const place of explorePlaces) {
    const found = issue("Tour", place.name, "/explore/" + place.guideSlug, place.checkedAt, freshnessPolicy.tour, "Place details/cost check is due.", now);
    if (found) issues.push(found);
  }

  for (const [slug, value] of Object.entries(youtubeChannelCache as Record<string, { channelTitle?: string; lastScannedAt?: string }>)) {
    const checkedAt = value.lastScannedAt?.slice(0, 10) ?? "";
    const found = issue("System", value.channelTitle ?? slug, "/admin/entertainment", checkedAt, freshnessPolicy.youtube, "Approved YouTube channel scan is due.", now);
    if (found) issues.push(found);
  }

  const order: Record<FreshnessState, number> = { stale: 0, due: 1, unknown: 2, future: 3, fresh: 4 };
  issues.sort((a, b) => order[a.state] - order[b.state] || a.checkedAt.localeCompare(b.checkedAt) || a.label.localeCompare(b.label));

  return {
    issues,
    stale: issues.filter((entry) => entry.state === "stale"),
    due: issues.filter((entry) => entry.state === "due"),
    unknown: issues.filter((entry) => entry.state === "unknown"),
  };
}
