export type HomeSocialTrend = {
  pillar: "Movies" | "Movies & Entertainment" | "Services" | "Tour Nigeria" | "Jobs & Careers";
  title: string;
  href: string;
  checkedAt: string;
  expiresAt: string;
};

/**
 * Owner rule:
 * - Verified social-media trends relevant to MyNigeriaGuide's four pillars must be surfaced on the homepage while current.
 * - Reuse an existing canonical page whenever one already covers the trend; never create a duplicate page just to feature it.
 * - Keep the homepage compact: only the strongest current items belong here.
 * - Remove or replace items when they are stale, expired, disproven, or no longer useful.
 * - Every item must point to a real MyNigeriaGuide page that already meets the site's source, freshness, SEO and quality standards.
 */
export const homeSocialTrends: HomeSocialTrend[] = [
  {
    pillar: "Movies & Entertainment",
    title: "Tele x Zikora — cast, official teaser & 23 October cinema release",
    href: "/entertainment/movies/tele-x-zikora-2026",
    checkedAt: "2026-10-08",
    expiresAt: "2026-10-24",
  },
  {
    pillar: "Services",
    title: "NECO External 2026 — register by 26 October",
    href: "/services/neco-2026-ssce-external-registration",
    checkedAt: "2026-10-08",
    expiresAt: "2026-10-26",
  },
  {
    pillar: "Tour Nigeria",
    title: "Hallelujah Festival Lagos — free event on 30 October",
    href: "/explore/hallelujah-festival-lagos-october-2026",
    checkedAt: "2026-10-08",
    expiresAt: "2026-10-30",
  },
  {
    pillar: "Jobs & Careers",
    title: "Deloitte Graduate Recruitment — Tax & Legal closes today",
    href: "/jobs/deloitte-nigeria-early-careers",
    checkedAt: "2026-10-09",
    expiresAt: "2026-10-09",
  },
  {
    pillar: "Jobs & Careers",
    title: "National AI Innovation Challenge — N-ATLAS builds due 12 October",
    href: "/jobs/guides/national-ai-innovation-challenge-2026",
    checkedAt: "2026-10-09",
    expiresAt: "2026-10-12",
  },
  {
    pillar: "Jobs & Careers",
    title: "Zecathon 6.0 Hackathon — 13 October application deadline",
    href: "/jobs/zenith-bank-zecathon-6-hackathon-2026",
    checkedAt: "2026-10-08",
    expiresAt: "2026-10-13",
  },
];

export function getCurrentHomeSocialTrends(today = new Date().toISOString().slice(0, 10)) {
  // A compact cross-pillar shelf: never push another pillar off the homepage
  // with two simultaneous jobs stories or repeat a canonical destination.
  const usedPillars = new Set<string>();
  const usedHrefs = new Set<string>();
  return homeSocialTrends.filter((item) => {
    if (item.checkedAt > today || item.expiresAt < today) return false;
    const pillar = item.pillar === "Movies" ? "Movies & Entertainment" : item.pillar;
    if (usedPillars.has(pillar) || usedHrefs.has(item.href)) return false;
    usedPillars.add(pillar);
    usedHrefs.add(item.href);
    return true;
  }).slice(0, 4);
}
