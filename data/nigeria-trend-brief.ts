/** A small human-verified editorial brief, not an automated X trend feed.
 * Each signal has a dated primary source, a real canonical destination, and a
 * short relevance window. Do not import unverified social posts as facts.
 */
export type NigeriaTrendBriefItem = {
  id: string;
  pillar: "Movies & Entertainment" | "Services" | "Tour Nigeria" | "Jobs & Careers";
  signal: "Nigeria X trend observation" | "Verified agency update" | "Verified programme" | "Verified release" | "Official application";
  title: string;
  summary: string;
  href: string;
  sourceName: string;
  sourceUrl: string;
  checkedAt: string;
  expiresAt: string;
};

export const nigeriaTrendBrief: NigeriaTrendBriefItem[] = [
  {
    id: "x-ng-hallelujah-challenge-2026-10-11",
    pillar: "Movies & Entertainment",
    signal: "Nigeria X trend observation",
    title: "Hallelujah Challenge appeared in Nigeria's X trend history",
    summary: "The hashtag appeared in the early hours of 11 October. That is one dated observation, not a verified nationwide post count or an all-day ranking. The organiser independently confirms the October broadcasts.",
    href: "/entertainment/hallelujah-challenge-october-2026",
    sourceName: "Trends24 Nigeria public timeline — single observation",
    sourceUrl: "https://trends24.in/nigeria/",
    checkedAt: "2026-10-11",
    expiresAt: "2026-10-15",
  },
  {
    id: "nysc-travel-feeding-october-2026",
    pillar: "Services",
    signal: "Verified agency update",
    title: "NYSC DG reiterates 6 pm travel advice and discusses future camp feeding increase",
    summary: "The NYSC Director-General advised corps members to break long journeys before 6 pm. A higher orientation-camp feeding budget was reported as approved but expected to take effect in 2027, not already paid in October 2026.",
    href: "/services/nysc-registration-local",
    sourceName: "Voice of Nigeria — NYSC DG report, 11 October",
    sourceUrl: "https://von.gov.ng/nysc-approves-increased-feeding-budget-for-corps-members/",
    checkedAt: "2026-10-11",
    expiresAt: "2026-10-25",
  },
  {
    id: "ember-to-remember-tourism-season-2026",
    pillar: "Tour Nigeria",
    signal: "Verified programme",
    title: "Nigeria's Ember to Remember tourism season runs September–December 2026",
    summary: "The Ministry of Tourism announced a national programme linking festivals, culture, travel and hospitality. The season is not a promise that every listed attraction or event is open; verify each organiser and venue separately.",
    href: "/explore",
    sourceName: "Federal Ministry of Information — official tourism announcement",
    sourceUrl: "https://fmino.gov.ng/tourism-ministry-and-mycityapp-announce-ember-to-remember-2026-nigerias-100-day-tourism-season/",
    checkedAt: "2026-10-11",
    expiresAt: "2026-12-31",
  },
  {
    id: "afdb-internship-deadline-2026-10-12",
    pillar: "Jobs & Careers",
    signal: "Official application",
    title: "AfDB 2027 Internship Session 1: application deadline is 12 October",
    summary: "The African Development Bank vacancy page confirms the deadline and master's-degree eligibility rules. A public social post is not a valid alternative to the official application route.",
    href: "/jobs/afdb-2027-internship-session-one",
    sourceName: "African Development Bank — official vacancy",
    sourceUrl: "https://www.afdb.org/en/vacancy/2027-internship-program-session-1-97099",
    checkedAt: "2026-10-11",
    expiresAt: "2026-10-12",
  },
  {
    id: "tele-zikora-trailer-2026",
    pillar: "Movies & Entertainment",
    signal: "Verified release",
    title: "Tele x Zikora trailer: 23 October cinema date",
    summary: "An October 8 entertainment report confirms the film's official trailer and planned cinema release. It does not establish that the full film can already be watched online.",
    href: "/entertainment/movies/tele-x-zikora-2026",
    sourceName: "OyaMag — trailer and distributor report",
    sourceUrl: "https://www.oyamag.com/tele-x-zikora-official-trailer/",
    checkedAt: "2026-10-11",
    expiresAt: "2026-10-24",
  },
];

export function getCurrentNigeriaTrendBrief(today = new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 10)) {
  return nigeriaTrendBrief.filter((item) => item.checkedAt <= today && item.expiresAt >= today);
}
