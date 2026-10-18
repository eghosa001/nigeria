/**
 * Source-checked Nigeria editorial backfill, covering 11–18 October 2026.
 * Editorial and issuer reports are not X/TikTok ranked trends. No automated
 * copying of social media posts, fabricated engagement, or unverified dates.
 * Link to canonical guides and original evidence; preserve historical dates.
 */
export type NigeriaBackfillPillar = "Movies & Entertainment" | "Services" | "Tour Nigeria" | "Jobs & Careers";
export type NigeriaBackfillEvidence = "reported social activity" | "independent editorial coverage" | "official agency notice" | "organiser announcement" | "employer programme";
export type NigeriaBackfillItem = {
  id: string;
  pillar: NigeriaBackfillPillar;
  observedOn: string;
  evidence: NigeriaBackfillEvidence;
  title: string;
  takeaway: string;
  readerAction: string;
  sourceName: string;
  sourceUrl: string;
  href: string;
  label: string;
};

export const nigeriaTrendsBackfill20261018: NigeriaBackfillItem[] = [
  {
    id: "oct11-x-hallelujah",
    pillar: "Movies & Entertainment", observedOn: "2026-10-11",
    evidence: "reported social activity",
    title: "Hallelujah Challenge hashtag appears in an archived Nigeria X-trends observation",
    takeaway: "MyNigeriaGuide's 11 October source check recorded #HallelujahChallenge on a Nigeria X trend-history page during the early hours. This is a dated, limited observation; no all-day rank or nationwide engagement number is established.",
    readerAction: "Use the organiser's programme to confirm October broadcast details instead of assuming every hashtag post is official.",
    sourceName: "Trends24 Nigeria — historical observation originally checked 11 October",
    sourceUrl: "https://trends24.in/nigeria/",
    href: "/entertainment/hallelujah-challenge-october-2026", label: "See organiser-checked programme",
  },
  {
    id: "oct12-nollywood-horror",
    pillar: "Movies & Entertainment", observedOn: "2026-10-12",
    evidence: "independent editorial coverage",
    title: "Nollywood horror titles return to Halloween watchlists",
    takeaway: "YNaija's 12 October retrospective revisits Nigerian supernatural cinema, including Koto Aye (1989) and Living in Bondage (1992). It is a critic's selection, not a measured TikTok ranking or proof of streaming rights.",
    readerAction: "Use the film directory to identify the exact film before checking an authorised publisher or streaming provider.",
    sourceName: "YNaija — 12 October film retrospective",
    sourceUrl: "https://ynaija.com/8-nollywood-horror-films-to-keep-you-spooked-this-coming-halloween/",
    href: "/entertainment/movies", label: "Browse film guides",
  },
  {
    id: "oct12-box-office-analysis",
    pillar: "Movies & Entertainment", observedOn: "2026-10-12",
    evidence: "independent editorial coverage",
    title: "A new comparison of Nigerian box-office hits sparks a rankings question",
    takeaway: "YNaija re-ranked 50 Nigerian films by estimated dollar receipts. Currency-converted historical comparisons are not the same as an official current Nigerian admissions chart, so figures need methodological context.",
    readerAction: "Check each film's release information independently; do not confuse gross receipts, ticket admissions and streaming popularity.",
    sourceName: "YNaija — 12 October box-office comparison",
    sourceUrl: "https://ynaija.com/nigerias-top-50-box-office-hits-re-ranked/",
    href: "/entertainment/movies", label: "Explore individual films",
  },
  {
    id: "oct16-weekend-watchlist",
    pillar: "Movies & Entertainment", observedOn: "2026-10-16",
    evidence: "independent editorial coverage",
    title: "16 October film watchlist includes First Lady and Crawlers",
    takeaway: "YNaija's dated weekend viewing roundup mentions these titles. Its recommendation is not an issuer-confirmed screening schedule; showtimes and territorial availability must be checked with a cinema or platform.",
    readerAction: "Compare the advertised title and cinema programme before making a booking.",
    sourceName: "YNaija — 16 October watchlist",
    sourceUrl: "https://ynaija.com/the-weekend-watchlist-these-are-films-series-to-watch-this-weekend-66/",
    href: "/entertainment/movies", label: "Check movie guides",
  },
  {
    id: "oct18-short-video-audio",
    pillar: "Movies & Entertainment", observedOn: "2026-10-18",
    evidence: "reported social activity",
    title: "TikTok and Instagram sounds: Comfort and Loketo feature in a Nigerian roundup",
    takeaway: "YNaija's 18 October creator-audio roundup names Mr Eazi and Moliy's Comfort and MIK's Loketo, with examples of short-video use. These are publisher-observed sounds, not platform-reported national rankings or verified play counts.",
    readerAction: "Follow the original creator links and distinguish user-generated clips from authorised music releases.",
    sourceName: "YNaija — 18 October creator sounds",
    sourceUrl: "https://ynaija.com/10-trending-sounds-on-tiktok-and-instagram-in-nigeria-this-week/",
    href: "/entertainment/social-trends", label: "See social-media source context",
  },
  {
    id: "oct15-nysc-camp-inquiry",
    pillar: "Services", observedOn: "2026-10-15",
    evidence: "official agency notice",
    title: "Senate orders inquiry into NYSC orientation-camp healthcare",
    takeaway: "An official 15 October government release says Senate committees will investigate the death of a corps member in Enugu and assess orientation-camp medical and emergency services. An inquiry is not a finding of responsibility or a newly introduced NYSC registration requirement.",
    readerAction: "For immediate safety concerns, follow NYSC's published support channels; do not mistake circulating claims for investigation findings.",
    sourceName: "Federal Ministry of Information — 15 October",
    sourceUrl: "https://fmino.gov.ng/corps-members-death-senate-to-probe-state-of-health-facilities-at-nysc-camps-nationwide/",
    href: "/services/nysc-registration-local", label: "NYSC service guidance",
  },
  {
    id: "oct18-nysc-part-time-window",
    pillar: "Services", observedOn: "2026-10-18",
    evidence: "official agency notice",
    title: "NYSC portal lists a part-time Batch C registration window through 20 October",
    takeaway: "NYSC's registration portal shows 7 September–20 October for Part-Time Mobilization Batch C, 2026. This listing must not be presented as an open general full-time Batch C registration window.",
    readerAction: "Confirm the candidate's correct mobilisation category on the official NYSC portal.",
    sourceName: "NYSC — official registration portal, checked 18 October",
    sourceUrl: "https://portal.nysc.org.ng/nysC/Home",
    href: "/services/nysc-registration-local", label: "Understand NYSC registration routes",
  },
  {
    id: "oct18-neco-external",
    pillar: "Services", observedOn: "2026-10-18",
    evidence: "official agency notice",
    title: "NECO External 2026: 26 October normal-registration deadline",
    takeaway: "NECO's official 2026 External notice says normal registration closes at midnight on 26 October; the published late-registration phase runs 27 October–3 November with an extra ₦5,000 charge. That extra charge is not the total examination fee.",
    readerAction: "Read the current external-candidate instructions and choose the official portal, not the separate school-based internal examination.",
    sourceName: "NECO — official 2026 SSCE External notice",
    sourceUrl: "https://neco.gov.ng/?page_id=27",
    href: "/services/neco-2026-ssce-external-registration", label: "External candidate registration steps",
  },
  {
    id: "oct12-18-felabration",
    pillar: "Tour Nigeria", observedOn: "2026-10-12",
    evidence: "organiser announcement",
    title: "Felabration 2026 runs 12–18 October at New Afrika Shrine",
    takeaway: "The festival's advertised week celebrates Fela Kuti, with performers including Femi, Made and Seun Kuti. Main Shrine programming should not be confused with the separately organised Freedom Park events.",
    readerAction: "Check the relevant venue's own access and timetable before travel; an announced performance is not proof a gate is open now.",
    sourceName: "Voice of Nigeria — festival programme, 10 October",
    sourceUrl: "https://von.gov.ng/lagos-hosts-felabration-2026-october-12-18/",
    href: "/explore/felabration-2026", label: "Compare Lagos festival venues",
  },
  {
    id: "oct13-18-ofala",
    pillar: "Tour Nigeria", observedOn: "2026-10-13",
    evidence: "organiser announcement",
    title: "Ofala Onitsha: art exhibition, youth carnival and 16–17 October royal events",
    takeaway: "Ofala organisers scheduled Oreze Art Exhibition for 13–18 October, Youth Carnival for 14 October and the two main Iru/Azu Ofala days for 16–17 October. Those events have distinct programmes; arrival and media restrictions differ.",
    readerAction: "Use the festival's original programme to distinguish the concluded royal days from the exhibition's final day.",
    sourceName: "Ofala Steering Committee — published programme",
    sourceUrl: "https://ofala.org/press-release/ofala-2026-onitsha-announces-programme-for-festival-igba-mbo-iga-niru-strive-and-advance/",
    href: "/explore/ofala-onitsha-2026", label: "Ofala visitor guide",
  },
  {
    id: "oct17-smfest-abuja",
    pillar: "Tour Nigeria", observedOn: "2026-10-17",
    evidence: "organiser announcement",
    title: "SMFest Abuja holds its 17–18 October creator and technology programme",
    takeaway: "The organiser lists the AdvantageX event at Family Worship Centre, Wuye, Abuja. This is a confirmed scheduled gathering for creators and businesses, not proof of viral social engagement or exact visitor attendance.",
    readerAction: "Use the organiser's event page to check the relevant session, ticket category and venue directions.",
    sourceName: "SMFest — Abuja 2026 organiser",
    sourceUrl: "https://smfest.org/",
    href: "/explore/smfest-abuja-2026", label: "SMFest Abuja visitor guide",
  },
  {
    id: "oct18-design-week",
    pillar: "Tour Nigeria", observedOn: "2026-10-18",
    evidence: "organiser announcement",
    title: "Design Week Lagos begins its 18–25 October programme",
    takeaway: "The official festival site lists 18–25 October, with National Theatre, Lagos as its principal location. The programme spans design, architecture, craft and industry; a citywide festival label does not mean every session occurs at one venue.",
    readerAction: "Check the official session registration and location before visiting.",
    sourceName: "Design Week Lagos — organiser's 2026 programme",
    sourceUrl: "https://designweeklagos.com/",
    href: "/explore/design-week-lagos-2026", label: "Design Week Lagos guide",
  },
  {
    id: "oct16-nauth-vacancies",
    pillar: "Jobs & Careers", observedOn: "2026-10-16",
    evidence: "official agency notice",
    title: "Nnamdi Azikiwe University Teaching Hospital recruitment listed 16 October",
    takeaway: "The Federal Character Commission's listing carries NAUTH's advert for consultants, resident doctors, dental officers, nurses and other professions, with separate eligibility requirements. The notice says six weeks from publication; verify the issuing date with the hospital rather than inventing a closing date.",
    readerAction: "Read the full role-specific criteria and stated application form on the original government listing; do not pay recruitment agents.",
    sourceName: "Federal Character Commission — NAUTH posting",
    sourceUrl: "https://fcc.gov.ng/job-listings/nnamdi-azikiwe-university-teaching-hospital-p-m-b-5025-nnewi-anambra-state-nigeria/",
    href: "/jobs", label: "Compare verified career paths",
  },
  {
    id: "oct16-aefunai-vacancies",
    pillar: "Jobs & Careers", observedOn: "2026-10-16",
    evidence: "official agency notice",
    title: "Alex Ekwueme Federal University advertises academic and other posts",
    takeaway: "The Federal Character Commission posted an internal and external AE-FUNAI advertisement on 16 October, covering teaching and non-teaching roles. Grade, discipline and application route must be checked against the original full advert.",
    readerAction: "Check the employer's requirements before submitting; the listing is not a universal graduate recruitment scheme.",
    sourceName: "Federal Character Commission — AE-FUNAI posting",
    sourceUrl: "https://fcc.gov.ng/job-listings/alex-ekwueme-federal-university-ndufu-alike-ebonyi-state-p-m-b-1010-abakaliki-ebonyi-state/",
    href: "/jobs", label: "Browse careers by eligibility",
  },
  {
    id: "oct18-founder-dojo",
    pillar: "Jobs & Careers", observedOn: "2026-10-18",
    evidence: "employer programme",
    title: "Founder Dojo Imo: 19 October first consideration, 2 November final date",
    takeaway: "The official programme accepts applicants across Nigeria and describes a zero-fee founder-development cohort based in Owerri. It trains prospective founders; it is not a paid employment contract or a guaranteed startup grant.",
    readerAction: "Prepare the required founder answers and video using the organiser's form; distinguish the first-consideration date from the final cutoff.",
    sourceName: "Imo Digital City — Cohort 2",
    sourceUrl: "https://www.imodigitalcity.com/founder-dojo/cohort-2",
    href: "/jobs/founder-dojo-imo-cohort-two-2026", label: "Founder Dojo eligibility",
  },
  {
    id: "oct18-capitalsage",
    pillar: "Jobs & Careers", observedOn: "2026-10-18",
    evidence: "employer programme",
    title: "CapitalSage SageForge graduate programme: applications close 31 October",
    takeaway: "The official twelve-month programme includes a six-week Ibadan foundation block, accepts graduates across disciplines and requires NYSC completion before starting. The employer says a substantive position after the programme depends on performance and business needs.",
    readerAction: "Read the employer's official qualifications and location commitments before applying.",
    sourceName: "CapitalSage Holdings — SageForge",
    sourceUrl: "https://capitalsageholdings.com/sageforge",
    href: "/jobs/deadlines", label: "Other verified application deadlines",
  },
  {
    id: "oct16-ebid-young-professionals",
    pillar: "Jobs & Careers", observedOn: "2026-10-16",
    evidence: "employer programme",
    title: "ECOWAS Bank Young Professionals Programme advertises 30 October deadline",
    takeaway: "The ECOWAS Bank for Investment and Development's employment page lists its Young Professionals advertisement. Its official LinkedIn post cites 30 October, under-30 eligibility and a postgraduate qualification; verify the full recruitment document before applying.",
    readerAction: "Use the EBID employment page and confirm the correct vacancy, language and qualification requirements.",
    sourceName: "ECOWAS Bank for Investment and Development — employment",
    sourceUrl: "https://www.bidc-ebid.org/en/employment/",
    href: "/jobs/ebid-young-professionals-2026", label: "EBID eligibility and deadline",
  },
];

export const nigeriaBackfillCounts = {
  start: "2026-10-11",
  end: "2026-10-18",
  checkedAt: "2026-10-18",
  // This is a selected verified editorial catch-up, not all posts on all platforms.
};
