import type { ExploreGuide } from "@/lib/explore";

/**
 * Original visitor decisions from the festival's 19 October 2026 public
 * programme, homepage, date-specific 23rd-edition page, and Visit Abuja.
 * DO NOT interpret promotional pass buttons as verified payment or admission.
 * The organiser homepage says 20–25 Oct, while its detailed 2026 programme,
 * edition page, FilmFreeway and city listing give 20–24 Oct.
 */
export function applyAiff2026ConfirmedSessionDecisions(guide: ExploreGuide): ExploreGuide {
  if (guide.slug !== "abuja-international-film-festival-2026") return guide;

  return {
    ...guide,
    title: "Abuja Film Festival 2026: Daily Programme, Venue Checks & Tickets",
    shortTitle: "Abuja Film Festival 2026",
    summary: "The 23rd Abuja International Film Festival's dated programme covers 20–24 October 2026, including a 22 October filmmaking academy and 24 October awards. It has multiple Abuja venues, but its published screening-schedule page does not yet give reliable film-by-film times or prices. The official homepage separately says 20–25 October: confirm any 25 October event directly before travelling.",
    intro: [
      "A first-time visitor's most important decision is what kind of session to attend. AIFF's own 2026 programme groups 20 October around screenings, industry panels and the Academy unveiling; 21 October around the opening ceremony and film; 22 October around practical filmmaking training; 23 October around screenings and filmmaker discussions; and 24 October around closing-film and awards events. These are programme categories, NOT booked film names or guaranteed seat allocations.",
      "There is a date discrepancy in the organiser's own material: the festival homepage advertises 20–25 October, but the dedicated 23rd-edition page and day-by-day schedule end on 24 October, as does the event listing used by Visit Abuja. No named 25 October programme appears in those dated pages. Treat 24 October as the last specifically documented schedule day and ask the organiser before paying for a 25 October event.",
      "Visit Abuja identifies Silverbird Cinemas in Central Area, Transcorp Hilton and University of Abuja Mini Campus in Gwagwalada among festival locations. These are NOT interchangeable arrival points: the public programme's general dayparts do not assign every screening to a named hall. Confirm the exact film, hall, venue and session with the festival before committing to transport or registration."
    ],
    highlights: [
      { name: "20 October — screenings, panels and industry entry", detail: "The organiser's programme advertises from about noon: film screening, masterclass, panel discussion, Academy unveiling and networking. It does not publish a verified venue for each session or a precise opening-film seat time." },
      { name: "21 October — opening film and ceremony", detail: "Published theme: opening ceremony, welcome and keynote, red carpet, selected screenings and reception, under a broad 9 am–9 pm day window. The window is not a statement that a particular film plays continuously." },
      { name: "22 October — hands-on filmmaking sessions", detail: "The Academy/Industry day lists director, writing, producing, acting, cinematography, editing/post-production and film business sessions, plus industry panels. Ask which workshops require registration, an industry pass or selection." },
      { name: "23 October — screenings and filmmaker Q&A", detail: "The festival advertises cinema sessions, panel discussions, Q&A and networking. The downloadable full film-by-film screening programme is still described as coming soon in the organiser's public programme." },
      { name: "24 October — closing film and awards", detail: "The dated programme lists a closing film, jury presentation, awards, special recognition and reception in a 9 am–9 pm window. Neither award winners nor completed screenings should be claimed in advance." },
      { name: "Where to arrive: match a named venue first", detail: "Silverbird Cinemas (Central Business District), Transcorp Hilton (Maitama) and University of Abuja Mini Campus (Gwagwalada) are reported event locations. Do not travel to Gwagwalada for a Central Area screening or presume any one venue hosts every programme." },
    ],
    planning: [
      { label: "Can I see the exact movie lineup and screening time?", detail: "The organiser has a page called '23rd AIFF Screening Schedule', but as checked 19 October it does not provide an accessible list of individual films, rooms and starting times. Its day-by-day programme explicitly says the full festival programme is coming soon. Do not infer a screening from a nominee, teaser, flyer or general 9 am–9 pm day window." },
      { label: "Is the festival 20–24 October or 20–25 October?", detail: "AIFF's edition page and full daily programme explicitly run 20–24 October; its homepage displays 20–25. The 25th has no itemised official session in the dated programme, so verify any extension or separate 25 October screening with the organiser before travelling." },
      { label: "How do I buy a real ticket or reserve a masterclass?", detail: "Use a live link reached from the official AIFF programme or its own registration page, and confirm which named event, venue, session and price the organiser is actually offering. A generic 'Reserve Passes' or WhatsApp button is not evidence that all screenings are free, public or covered by one pass. Do not pay an unrelated number forwarded on social media." },
      { label: "Which day is best if I want to learn filmmaking?", detail: "The 22 October Academy day is the clearest dedicated training schedule: directing, writing, producing, acting, camera, editing and film-business tracks. Obtain the specific session location, eligibility, instructor and check-in time from the organisers; a broad festival listing is not a confirmed workshop seat." },
      { label: "Which place should a casual moviegoer visit?", detail: "Start with the festival's named screening and venue, not its headline location. Visit Abuja lists Silverbird Cinemas in Abuja's Central Area among the venues, but also lists Transcorp Hilton and University of Abuja Mini Campus in Gwagwalada. If the screening room and start time are not confirmed, avoid a speculative trip." },
      { label: "What is the official 2026 theme?", detail: "The dedicated 23rd-edition page calls it 'Frames Without Borders: AI, Ethics, and the Future of Filmmaking'. This frames discussions about authorship, intellectual property, jobs and creative control; it does not mean the screening lineup exclusively consists of AI-made films." },
      { label: "What counts as official award results?", detail: "The 24 October programme schedules jury presentations and awards. An official nominees page, festival publicity or an earlier edition's winner is not proof of the 2026 result. Wait for a dated issuer announcement or dependable post-event reporting before citing award winners." },
    ],
    source: {
      label: "Abuja International Film Festival — official 20–24 October day-by-day programme",
      href: "https://abujainternationalfilmfestival.org/aiff-2026-programme",
    },
    sources: [
      ...(guide.sources ?? []).filter(s => ![
        "https://abujainternationalfilmfestival.org/aiff-2026-programme",
        "https://abujainternationalfilmfestival.org/23rd-abuja-international-film-festival",
        "https://abujainternationalfilmfestival.org/",
        "https://abujainternationalfilmfestival.org/23rd-aiff-screening-schedule",
        "https://www.visitabuja.org/event/23rd-abuja-international-film-festival/",
      ].includes(s.href)),
      {
        label: "AIFF — official 23rd edition dates and theme",
        href: "https://abujainternationalfilmfestival.org/23rd-abuja-international-film-festival",
      },
      {
        label: "AIFF — homepage with conflicting 20–25 October headline",
        href: "https://abujainternationalfilmfestival.org/",
      },
      {
        label: "AIFF — screening-schedule page (no individual times listed at review)",
        href: "https://abujainternationalfilmfestival.org/23rd-aiff-screening-schedule",
      },
      {
        label: "Visit Abuja — venues and independent five-day event listing",
        href: "https://www.visitabuja.org/event/23rd-abuja-international-film-festival/",
      },
    ],
    lastReviewed: "2026-10-19",
  };
}
