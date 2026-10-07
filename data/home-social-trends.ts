export type HomeSocialTrend = {
  pillar: "Movies" | "Services" | "Tour Nigeria" | "Jobs & Careers";
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
    pillar: "Movies",
    title: "My 30th Wedding — viral Nollywood release",
    href: "/entertainment/movies/my-30th-wedding",
    checkedAt: "2026-10-07",
    expiresAt: "2026-10-21",
  },
  {
    pillar: "Services",
    title: "INEC voter-register display & claims — 9–15 October",
    href: "/services/inec-claims-objections-october-2026",
    checkedAt: "2026-10-07",
    expiresAt: "2026-10-15",
  },
  {
    pillar: "Tour Nigeria",
    title: "Detty December 2026 — Wizkid opens 18 December",
    href: "/explore/detty-december-lagos-2026",
    checkedAt: "2026-10-07",
    expiresAt: "2026-12-30",
  },
  {
    pillar: "Jobs & Careers",
    title: "Oilserv 2027 Graduate Trainee — closes 10 October",
    href: "/jobs/oilserv-ingenious-graduate-trainee-2027",
    checkedAt: "2026-10-07",
    expiresAt: "2026-10-10",
  },
];

export function getCurrentHomeSocialTrends(today = new Date().toISOString().slice(0, 10)) {
  return homeSocialTrends
    .filter((item) => item.checkedAt <= today && item.expiresAt >= today)
    .slice(0, 4);
}
