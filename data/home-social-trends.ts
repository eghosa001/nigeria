export type HomeSocialTrend = {
  pillar: "Movies" | "Movies & Entertainment" | "Services" | "Tour Nigeria" | "Jobs & Careers";
  title: string;
  href: string;
  checkedAt: string;
  expiresAt: string;
  /** Current measurable momentum, supported by a primary actor and independent reporting. */
  momentumEvidence?: { primaryUrl: string; corroborationUrl: string; verifiedAt: string };
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
  // The named artists' official music video was published in October; two
  // independent Nigeria video charts placed it at No. 1 on 25 October.
  // Chart rank is a dated observation, not a cross-platform reach metric.
  {
    pillar: "Movies & Entertainment",
    title: "Met You: Carterefe and Taylor Jasmine top Nigeria's 25 October video chart",
    href: "/entertainment/social-trends",
    checkedAt: "2026-10-26",
    expiresAt: "2026-10-28",
    momentumEvidence: {
      primaryUrl: "https://music.apple.com/us/music-video/met-you/6824769428",
      corroborationUrl: "https://kworb.net/youtube/trending/ng.html",
      verifiedAt: "2026-10-26",
    },
  },
  // Dated distributor announcements on 16 and 20 October (Nile Entertainment),
  // corroborated by PUNCH; this is measurable film momentum, not an event advert.
  // Reuse the existing film profile, and expire the homepage feature promptly.
  {
    pillar: "Movies & Entertainment",
    title: "Agbara Nla: Nile reports ₦354.5m Nigerian box office after a strong weekend",
    href: "/entertainment/movies/agbara-nla-the-return",
    checkedAt: "2026-10-23",
    expiresAt: "2026-10-28",
    momentumEvidence: {
      primaryUrl: "https://www.instagram.com/p/Dera0nJoS4N/",
      corroborationUrl: "https://punchng.com/agbara-nla-hits-n354-5m-leads-nigerian-box-office/",
      verifiedAt: "2026-10-23",
    },
  },
  // 19 Oct: original issuer evidence, corroborated with independent coverage.
  // Each story strengthens one existing canonical guide; no new thin pages.
  {
    pillar: "Services",
    title: "JAMB 2026 CAPS: a university offer is not the official JAMB admission letter",
    href: "/services/jamb-caps",
    checkedAt: "2026-10-19",
    expiresAt: "2026-10-26",
  },
  {
    pillar: "Tour Nigeria",
    title: "Design Week Lagos: National Theatre programme 22–25 October, confirm each ticket",
    href: "/explore/design-week-lagos-2026",
    checkedAt: "2026-10-19",
    expiresAt: "2026-10-25",
  },
  {
    pillar: "Movies & Entertainment",
    title: "Tele x Zikora: official teaser, cast and planned 23 October cinema opening",
    href: "/entertainment/movies/tele-x-zikora-2026",
    checkedAt: "2026-10-19",
    expiresAt: "2026-10-23",
  },
  {
    pillar: "Jobs & Careers",
    title: "Army 92RRI: official application ongoing; print AND submit the online form",
    href: "/jobs/nigerian-army-92rri-2026",
    checkedAt: "2026-10-19",
    expiresAt: "2026-10-21",
  },
  {
    pillar: "Movies & Entertainment",
    title: "18 October creator audio: Comfort and Loketo in Nigerian TikTok and Instagram coverage",
    href: "/entertainment/social-trends",
    checkedAt: "2026-10-18",
    expiresAt: "2026-10-25",
  },
  {
    pillar: "Services",
    title: "NYSC welfare update: Senate announces inquiry into orientation camp healthcare",
    href: "/services/nysc-registration-local",
    checkedAt: "2026-10-18",
    expiresAt: "2026-10-25",
  },
  {
    pillar: "Tour Nigeria",
    title: "Design Week Lagos runs 18–25 October; programme and venue details",
    href: "/explore/design-week-lagos-2026",
    checkedAt: "2026-10-18",
    expiresAt: "2026-10-25",
  },
  {
    pillar: "Jobs & Careers",
    title: "Imo Founder Dojo: first consideration 19 October, final 2 November",
    href: "/jobs/founder-dojo-imo-cohort-two-2026",
    checkedAt: "2026-10-18",
    expiresAt: "2026-10-19",
  },
  {
    "pillar": "Movies & Entertainment",
    "title": "Matters of the Heart (2026): Sarian Martin, Timini Egbuson, cast and official viewing",
    "href": "/entertainment/movies/matters-of-the-heart-2026",
    "checkedAt": "2026-10-13",
    "expiresAt": "2026-10-20"
  },
  {
    "pillar": "Tour Nigeria",
    "title": "Ofala Onitsha 2026: Iru & Azu Ofala on 16–17 October, venue and visitor guide",
    "href": "/explore/ofala-onitsha-2026",
    "checkedAt": "2026-10-13",
    "expiresAt": "2026-10-17"
  },
  {
    "pillar": "Services",
    "title": "NECO External 2026 registration: normal deadline 26 October and official portal",
    "href": "/services/neco-2026-ssce-external-registration",
    "checkedAt": "2026-10-13",
    "expiresAt": "2026-10-26"
  },
  {
    "pillar": "Jobs & Careers",
    "title": "NOVA Bank Graduate Trainee: official eligibility and 15 October deadline",
    "href": "/jobs/nova-bank-graduate-trainee-2026",
    "checkedAt": "2026-10-13",
    "expiresAt": "2026-10-15"
  },
  {
    "pillar": "Movies & Entertainment",
    "title": "Breaking Point (2026): Sandra Okunzuwa, Bolaji Ogunmola and Timini Egbuson",
    "href": "/entertainment/movies/breaking-point-2026",
    "checkedAt": "2026-10-13",
    "expiresAt": "2026-10-24"
  },
  {
    pillar: "Tour Nigeria",
    title: "ECOWAS Food & Cultural Festival 2026 — Benin City, 27–31 October; verify exact venue",
    href: "/explore/ecowas-food-cultural-festival-benin-2026",
    checkedAt: "2026-10-13",
    expiresAt: "2026-10-31",
  },
  {
    "pillar": "Tour Nigeria",
    "title": "Benin royal anniversary 2026: October ceremonies and November museum exhibition",
    "href": "/explore/benin-royal-coronation-anniversary-2026",
    "checkedAt": "2026-10-13",
    "expiresAt": "2026-11-21"
  },
  {
    pillar: "Movies & Entertainment",
    title: "My 30th Wedding: Bimbo Ademoye, Timini Egbuson and official full movie",
    href: "/entertainment/movies/my-30th-wedding",
    checkedAt: "2026-10-11",
    expiresAt: "2026-10-20",
  },
  {
    pillar: "Services",
    title: "NIN Share Code explained — NINAuth verification versus *346# retrieval",
    href: "/services/ninauth-nin-verification",
    checkedAt: "2026-10-11",
    expiresAt: "2026-10-25",
  },
  {
    pillar: "Movies & Entertainment",
    title: "YouTube Nigeria: Blaqbonez, OJISE trailer, Ayra Starr and social trends",
    href: "/entertainment/social-trends",
    checkedAt: "2026-10-10",
    expiresAt: "2026-10-12",
  },
  {
    pillar: "Movies & Entertainment",
    title: "Issakaba: The Return — cast and 13 November cinema date",
    href: "/entertainment/movies/issakaba-the-return-2026",
    checkedAt: "2026-10-10",
    expiresAt: "2026-11-13",
  },
  {
    pillar: "Tour Nigeria",
    title: "Felabration at Freedom Park — 12–18 October, 6 pm, announced ₦3,000 entry",
    href: "/explore/felabration-2026",
    checkedAt: "2026-10-10",
    expiresAt: "2026-10-18",
  },
  {
    pillar: "Jobs & Careers",
    title: "African Development Bank 2027 Internship — closes 12 October",
    href: "/jobs/afdb-2027-internship-session-one",
    checkedAt: "2026-10-10",
    expiresAt: "2026-10-12",
  },
  {
    pillar: "Jobs & Careers",
    title: "NOVA Bank Graduate Trainee Programme — closes 15 October",
    href: "/jobs/nova-bank-graduate-trainee-2026",
    checkedAt: "2026-10-10",
    expiresAt: "2026-10-15",
  },
  {
    pillar: "Jobs & Careers",
    title: "ECOWAS Bank Young Professionals — closes 30 October",
    href: "/jobs/ebid-young-professionals-2026",
    checkedAt: "2026-10-10",
    expiresAt: "2026-10-30",
  },
  {
    pillar: "Movies & Entertainment",
    title: "Lagos Life game — where to play, safety and the $500k funding story",
    href: "/entertainment/lagos-life-game-2026",
    checkedAt: "2026-10-09",
    expiresAt: "2026-10-15",
  },
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
    pillar: "Services",
    title: "NYSC Batch C Stream II — 4 November orientation and camp dates",
    href: "/services/nysc-registration-local",
    checkedAt: "2026-10-10",
    expiresAt: "2026-11-06",
  },
  {
    pillar: "Tour Nigeria",
    title: "Hallelujah Festival Lagos — free event on 30 October",
    href: "/explore/hallelujah-festival-lagos-october-2026",
    checkedAt: "2026-10-08",
    expiresAt: "2026-10-30",
  },
  {
    pillar: "Tour Nigeria",
    title: "Lagos travel guide expanded with museums, art centres and day trips",
    href: "/explore/lagos",
    checkedAt: "2026-10-11",
    expiresAt: "2026-11-10",
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
  {
    pillar: "Jobs & Careers",
    title: "Army SSCC 50/2027 officer applications — 17 October deadline",
    href: "/jobs/nigerian-army-sscc-50-2027",
    checkedAt: "2026-10-09",
    expiresAt: "2026-10-17",
  },
];

export function getCurrentHomeSocialTrends(today = new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 10)) {
  // A compact cross-pillar shelf: never push another pillar off the homepage
  // with two simultaneous jobs stories or repeat a canonical destination.
  const usedPillars = new Set<string>();
  const usedHrefs = new Set<string>();
  return homeSocialTrends.filter((item) => {
    // An issuer notice, release date or application deadline alone is not evidence of a trend.
    // Fail closed: leave the shelf sparse rather than promoting unsupported popularity.
    if (!item.momentumEvidence || item.momentumEvidence.verifiedAt > today) return false;
    if (item.checkedAt > today || item.expiresAt < today) return false;
    const pillar = item.pillar === "Movies" ? "Movies & Entertainment" : item.pillar;
    if (usedPillars.has(pillar) || usedHrefs.has(item.href)) return false;
    usedPillars.add(pillar);
    usedHrefs.add(item.href);
    return true;
  }).slice(0, 4);
}
