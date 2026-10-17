import type { ExploreGuide } from "@/lib/explore";

// Source-specific event reporting and visitor decisions, 17 October 2026.
// A date in a ticket or organizer listing does not establish that an event
// occurred, tickets remain available, or a quoted benefit is guaranteed.
type EventCorrection = {
  source: { label: string; href: string };
  context: string;
  planning: ExploreGuide["planning"][number];
  summary?: string;
};

export const independentlyCheckedEvents20261017: Record<string, EventCorrection> = {
  "abuja-festival-literature-ideas-2026": {
    source: {
      label: "The Guardian — Abuja Festival of Literature and Ideas announcement, 26 September 2026",
      href: "https://guardian.ng/art/abuja-festival-of-literature-ideas-set-for-october-9-10/",
    },
    summary: "The inaugural Abuja Festival of Literature and Ideas was announced for 9–10 October 2026 at The Nordic in Jabi. Those dates have now passed; use the Book Buzz Foundation for post-event material rather than trying to buy an expired ticket.",
    context: "The Guardian's 26 September report independently attributed the first Abuja Festival of Literature and Ideas to Book Buzz Foundation director Lola Shoneyin and confirmed the announced 9–10 October dates. Those dates are past as of 17 October 2026; a prerelease report is not proof of each scheduled session taking place or evidence of a new ticket window.",
    planning: {
      label: "After 10 October, look for confirmed reports rather than tickets",
      detail: "The Book Buzz Foundation said online sales closed on 5 October. If you want recordings, speaker talks or a future edition, check the foundation's official channels instead of paying for a supposed reopening of the 2026 event. The Guardian's September announcement establishes the advertised programme, not attendance or a 2027 date.",
    },
  },
  "fashion-fables-runway-africa-abuja-2026": {
    source: {
      label: "Fashion Fables Runway Africa — organiser's Eventbrite admission listing",
      href: "https://www.eventbrite.com/e/fashion-fables-runway-africa-tickets-1986174257671",
    },
    context: "The Fashion Fables Runway Africa organiser's own Eventbrite listing specifies Sunday 18 October, 2–9pm at The Blanc Grande Abuja, 269 Muhammadu Buhari Way. This is stronger evidence for that advertised slot than a separate listing placing a similar event at the Afreximbank centre on 9 October; it does not prove the programme will run without changes.",
    planning: {
      label: "Use the organiser's 18 October checkout rather than a conflicting flyer",
      detail: "Choose the precise Fashion Fables Runway Africa event by its Eventbrite organiser name and The Blanc Grande address. Check the final ticket status, venue and opening time directly before paying or travelling; do not treat the 9 October Afreximbank listing as an automatically rescheduled performance.",
    },
  },
  "legacy-building-conference-abuja-2026": {
    source: {
      label: "Vill Arena Concept Solutions — original Eventbrite programme for ManThinks conference",
      href: "https://www.eventbrite.com/e/the-legacy-building-conference-2026-mens-leadership-networking-tickets-2000894978744",
    },
    context: "Vill Arena Concept Solutions' original ticket listing gives a 1:30pm red carpet and 3–6pm main event on Friday 6 November at Novare Centre, Zone 5, Abuja. ManThinks is the event host, while Vill Arena is listed as the ticket organiser; a tourism calendar's shorter session description does not replace the different arrival time.",
    planning: {
      label: "Separate the 1:30pm arrival from the 3pm programme",
      detail: "If you intend to network at the red carpet, plan for 1:30pm rather than the 3pm main session. Use the Eventbrite organiser's current refund and attendee terms when purchasing; the ticket page currently describes refunds up to seven days before the event, not refunds on arrival.",
    },
  },
  "abuja-international-afrojazz-festival-2026": {
    source: {
      label: "T.O.E Guide — independent Abuja events calendar listing of Afrojazz programme",
      href: "https://toeguide.com/toe-events",
    },
    context: "T.O.E Guide independently lists Abuja International Afrojazz Festival activities across 16–21 November, including workshops, an industry market, a showcase concert and a main concert. It also marks the venue as to be announced: an event entry without a location cannot verify a concert hall or give a reliable last-mile route.",
    planning: {
      label: "Do not purchase flights on an invented festival venue",
      detail: "Before reserving non-refundable transport, ask the festival organiser for a specific hall and the relevant programme-day admission. The 21 November main concert is not automatically the ticket to masterclasses or the 19–20 November professional market; no currently verified venue is supplied by the independent calendar.",
    },
  },
  "investors-summit-nigeria-abuja-2026": {
    source: {
      label: "Business Summit — original Investors Summit Nigeria 2026 Eventbrite ticket listing",
      href: "https://www.eventbrite.ca/e/investors-summit-nigeria-2026-tickets-1977017519621",
    },
    context: "The original Business Summit Eventbrite listing shows an in-person session on Tuesday 10 November, 9am–6pm at Abuja Continental Hotel, 1 Ladi Kwali Street. A separate city guide spans 10–11 November while the ticket description also calls itself a four-day event. Those three descriptions conflict, so neither a second day nor four full days should be promised without an updated organiser programme.",
    planning: {
      label: "Confirm whether admission covers one day or several",
      detail: "Ask the Business Summit organiser to reconcile the 10 November ticket date with the tourism calendar's 10–11 November range and the four-day promotional copy before booking a hotel. The event's 'secure funding on the spot' pitch is not a guarantee of financing, investment approval or an introduction to specific financiers.",
    },
  },
  "african-creators-conference-abuja-2026": {
    source: {
      label: "Branddek Limited — African Creators Conference 2.0 original Eventbrite ticket",
      href: "https://www.eventbrite.com/e/african-creators-conference-20-tickets-1997149958287",
    },
    context: "Branddek Limited's Eventbrite entry independently identifies the conference as a Friday 30 October event at Abuja Trade & Convention Center, KM 8 Umaru Musa Yar'Adua Road, Lugbe. Its listed doors-open time is 7:30am, earlier than the conference's 8am timetable; some event listings instead refer to 8:30am as the programme start.",
    planning: {
      label: "Account for Lugbe travel and early admission",
      detail: "Plan arrival using the original venue address rather than a generic central-Abuja destination. The organiser lists doors at 7:30am and a full-day programme; check your admission category, whether registration is still available and the final start time before leaving.",
    },
  },
  "festmint-abuja-2026": {
    source: {
      label: "Made in Nigeria Textiles — FESTMINT 2026 organiser's own programme",
      href: "https://www.mintng.org/",
    },
    context: "Made in Nigeria Textiles' official site independently confirms that FESTMINT 2026 is planned for 2–6 November at the FCT Exhibition Pavilion, describing it as a follow-up to a 2025 edition with more than 100 exhibitors. Its sponsorship materials name a heritage and creative-industry programme but do not publish a reliable hour-by-hour public admission schedule.",
    planning: {
      label: "Use MiNT for exhibitor details, not a copied 2025 programme",
      detail: "If your purpose is shopping for Nigerian fabrics or arranging a stall, request the 2026 exhibitor and visitor rules directly from Made in Nigeria Textiles. The previous edition's exhibitor count and awards are not the 2026 confirmed line-up; do not promise free entry or daily opening times before the organiser publishes them.",
    },
  },
  "african-sdgs-film-festival-abuja-2026": {
    source: {
      label: "African SDGs Film Festival — organiser-linked Eventbrite ticket for 4 November",
      href: "https://www.eventbrite.co.uk/e/african-sdgs-film-festival-2026-tickets-1994313667866",
    },
    context: "The festival's organiser-linked Eventbrite page is a ticket route for Wednesday 4 November at Silverbird Cinemas Abuja. The separate city calendar advertises a 4–5 November festival, but explicitly says the Day 2 programme and venue are unpublished; the first day's ticket must not be presented as confirmation of a complete two-day cinema schedule.",
    planning: {
      label: "Treat 4 November as the ticketed day until Day 2 is verified",
      detail: "Check the 4 November Silverbird Cinemas ticket details and the named organiser before paying. If planning for Thursday 5 November, request a separately dated official Day 2 screening or venue programme; the reported 2025 submission volume does not confirm a 2026 screening line-up.",
    },
  },
  "all-africa-challenge-trophy-abuja-2026": {
    source: {
      label: "Ladies Golf Association of Nigeria — 2026 AACT championship registration",
      href: "https://ladiesgolfassociationofnigeria.com/",
    },
    context: "The Ladies Golf Association of Nigeria's official competition site describes a 2–10 November multi-event programme at IBB International Golf & Country Club. The All Africa Challenge Trophy team championship has its own competition and 6 November closing banquet, while a supporters game is advertised for 3 November and the Nigeria Ladies Open for 7–10 November. The longer event span is not eight days of the same team championship.",
    planning: {
      label: "Choose the correct golf competition or spectators' enquiry",
      detail: "National teams register through their golf associations, not a walk-in spectator ticket. If you want to watch the AACT, confirm the 4–6 November team-match tee times and spectator permission with LGAN or IBB club. The optional supporters game and 7–10 November stroke-play championship have separate eligibility and fees.",
    },
  },
  "art-meets-fashion-abuja-2026": {
    source: {
      label: "Africa Fashion Museum — original ART MEETS FASHION ABUJA Eventbrite page",
      href: "https://www.eventbrite.nl/e/art-meets-fashion-abuja-tickets-522537382377",
    },
    context: "The Africa Fashion Museum's Eventbrite page identifies National Gallery of Art, Abuja as the advertised venue for the Art Meets Fashion event and gives its organiser as Africa Fashion Museum / Musée de la Mode Africaine. The listing offers multiple dates, so a directory's 23 December entry is not itself proof of one unique 2026 performance or which ticket tranche applies.",
    planning: {
      label: "Select the precise date and gallery access at checkout",
      detail: "Use the original event ticket page to choose the 23 December 2026 slot and verify that it is available, the start time and the gallery entrance instructions. The organiser's refund window and date-specific terms matter more than a copied ticket price, which can change by currency, edition or tier.",
    },
  },
  "lagos-fashion-week-2026": {
    source: {
      label: "BellaNaija Style — 28 October–1 November Lagos Fashion Week announcement",
      href: "https://www.bellanaijastyle.com/lagos-fashion-week-2026/",
    },
    context: "BellaNaija Style independently reported the organiser's 28 October–1 November 2026 date announcement on 28 June, but noted that the specific venue, designer line-up and individual runway schedule were not then released. An older third-party fashion calendar instead displays 28–31 October, a mismatch visitors should resolve using Lagos Fashion Week's own latest programme.",
    planning: {
      label: "Distinguish runway admission from press accreditation",
      detail: "Lagos Fashion Week separately publishes a press-accreditation form for qualified journalists and creators; that is not a general public runway pass. Check the official final venue and house-by-house schedule rather than committing to the 2025 Federal Palace venue or a four-day timetable copied from an older calendar.",
    },
  },
  "detty-december-lagos-2026": {
    source: {
      label: "Channels Television — Wizkid headline concert and 13-day Detty December Fest announcement",
      href: "https://www.channelstv.com/2026/08/13/wizkid-to-headline-2026-detty-december-fest/",
    },
    context: "Channels Television's 13 August reporting independently attributes the 13-day Detty December Fest to Livespot360, with Wizkid announced for Friday 18 December and the festival running until 30 December. The organiser also advertises a second Pulse performance stage; its 2026 programme is not one Wizkid ticket covering every concert or party.",
    planning: {
      label: "Buy by concert date, not by the festival name alone",
      detail: "If you want the Wizkid opening, choose Friday 18 December and confirm the official promoter-linked ticket route; other stage shows and parties have separate listings. The independent news confirms the programme announcement, but not later guest appearances, door prices, permitted entry age or a guaranteed performance.",
    },
  },
  "beneficial-ownership-asset-recovery-conference-2026": {
    source: {
      label: "Corporate Affairs Commission — national registry's linked conference notice",
      href: "https://cac.gov.ng/",
    },
    context: "The Corporate Affairs Commission's official national-registry homepage independently links to the 8–11 November Global Conference on Beneficial Ownership and Asset Recovery. The conference programme treats 8 November as arrival/registration and 11 November as departure; the main technical panels are on 9 and 10 November, not all four days.",
    planning: {
      label: "Pick the right conference session before paying",
      detail: "For technical sessions, plan around 9–10 November at Sheraton Ikeja; 8 November is largely arrivals and 11 November departures. The organiser lists early-bird registration only through 15 October and a later registration period through 5 November. Confirm the actual delegate invoice and conference-secretariat address rather than paying an unofficial representative.",
    },
  },
};
