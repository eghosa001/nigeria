import type { ExploreGuide } from "@/lib/explore";
import { applyAiff2026ConfirmedSessionDecisions } from "@/lib/explore-aiff-programme-decisions-2026-10-19";

// 19 October 2026: individually re-opened NIFAFEST's 15–17 October programme,
// Design Week Lagos organiser's full-week calendar, and the National Theatre's
// distinct 22–25 October Hall schedule. These are desk checks, NOT attendance.
export const reviewedEventSlugs20261019 = [
  "nifafest-abuja-2026",
  "design-week-lagos-2026",
] as const;

export function applyCurrentEventVisitorDecisions20261019(guide: ExploreGuide): ExploreGuide {
  if (guide.slug === "smfest-abuja-2026") {
    // The organiser still advertises tickets, but its explicitly dated October
    // 2026 edition has passed. Do not claim confirmed attendance or a new edition.
    return {
      ...guide,
      title: "SMFest Abuja 2026: Past Event, Venue & Programme Record",
      summary: "SMFest Abuja advertised its AdvantageX conference for 17–18 October 2026 at Family Worship Centre, Wuye. Those dates have passed. This is a reference to the organiser's published programme, not an open ticket offer or confirmation of the event's outcome.",
      intro: [
        "The SMFest organiser listed the Abuja edition for Saturday 17 and Sunday 18 October 2026 from 9am at Family Worship Centre in Wuye. It promoted technology, business, social media and creator sessions under the AdvantageX theme; this describes the published programme rather than verified attendance or delivered sessions.",
        "The official main website and About FAQ list 17–18 October, while its Contact FAQ lists 16–18 October. The discrepancy may relate to Friday activities, but the organiser has not established that in the cited pages. All of these dates are now past.",
        "Ticket and volunteering buttons may still appear on the organiser's site. They are not evidence that the October edition is accepting new registrations or that a new Abuja date has been announced. Seek a fresh dated event notice, not an old checkout link."
      ],
      highlights: [
        { name: "Advertised dates", detail: "The main organiser programme identified 17–18 October 2026; its separate Contact FAQ also mentioned 16 October." },
        { name: "Advertised venue", detail: "Family Worship Centre (FWC), Plot 648 Idris Gidado Street, Wuye, Abuja. This is a past event address, not a current admission instruction." },
        { name: "AdvantageX programme", detail: "The organiser promoted speakers and sessions in social media, technology, entrepreneurship and business." },
        { name: "Original ticket options", detail: "The event originally advertised different ticket tiers. These are historical prices, not a current purchase recommendation." }
      ],
      planning: [
        { label: "Can I still attend the 2026 event?", detail: "No future attendance window is established by the official 17–18 October schedule. Avoid using archived ticket or volunteer registration links for this concluded edition." },
        { label: "Were all sessions delivered?", detail: "The published speaker list and ticket descriptions are not independent evidence of attendance, delivery or event outcomes. Look for dated organiser recordings or reports before attributing results." },
        { label: "What was the venue?", detail: "Family Worship Centre, Wuye, was the advertised Abuja venue. Do not travel there expecting the 2026 conference; routine church opening is separate from event access." },
        { label: "How do I find a later edition?", detail: "Use the organiser's official website for a newly dated SMFest announcement and verify the city, venue and registration deadline before payment." }
      ],
      sources: [
        ...(guide.sources ?? []),
        { label: "SMFest — official 2026 event dates and AdvantageX programme", href: "https://smfest.org/" },
        { label: "SMFest — organiser About FAQ with 17–18 October dates", href: "https://smfest.org/about/" },
        { label: "SMFest — organiser Contact FAQ with differing 16–18 October dates", href: "https://smfest.org/contact/" }
      ],
      lastReviewed: "2026-10-24",
    };
  }
  if (guide.slug === "nifafest-abuja-2026") {
    return {
      ...guide,
      summary: "NIFAFEST Abuja's published programme ran from 15 to 17 October 2026, so its advertised opening, seminar and finale dates have passed. This page preserves the official Garki-versus-Maitama venue record; it is not an invitation to attend a continuing festival or a claim that every scheduled event took place.",
      intro: [
        "The NIFAFEST organiser advertised a 15 October trade and fashion exhibition and a 16 October grant/empowerment seminar at the Cyprian Ekwensi Centre for Arts and Culture, Area 10, Garki. Its distinct 17 October awards finale was scheduled at the National Universities Commission auditorium in Maitama. These are the organiser's published plans, not independently verified attendance or post-event results.",
        "As of 19 October, all three advertised dates are over. Do not pay for an old event-registration offer or travel to the Garki seminar address expecting the Maitama finale. If seeking the festival's award results, recordings or next edition, ask the organiser for an official post-event announcement; the published programme alone cannot verify winners, completed grants or the timing of another edition.",
      ],
      planning: [
        { label: "Has the 2026 festival ended?", detail: "Yes, the organiser's advertised 15–17 October 2026 dates have elapsed. This is a historical schedule reference; no further 2026 attendance window was found in the official programme checked on 19 October." },
        { label: "Which venue was scheduled for which day?", detail: "15–16 October: Cyprian Ekwensi Centre for Arts and Culture in Area 10, Garki. 17 October: National Universities Commission Event Auditorium in Maitama. Those locations are separate; the Wuse secretariat is an office address, not another festival session." },
        { label: "Were the grants or awards actually delivered?", detail: "The organiser describes an empowerment seminar, a grand finale and awards. A schedule is not evidence that grants were awarded or every event occurred; verify any winner, benefit or award claim against a subsequent official result or an independently reported event." },
        { label: "Where should a prospective participant go next?", detail: "For a future edition, follow an updated organiser schedule with a new date, venue and participant registration. Do not reuse a payment request, WhatsApp instruction or old ticket link from the concluded October 2026 programme." },
      ],
      sources: (guide.sources ?? []).some(s => s.href === "https://nifafest.com/")
        ? guide.sources : [...(guide.sources ?? []), { label: "NIFAFEST — official 15–17 October 2026 schedule and Garki/Maitama venues", href: "https://nifafest.com/" }],
      lastReviewed: "2026-10-19",
    };
  }
  if (guide.slug === "design-week-lagos-2026") {
    const newSource = { label: "Design Week Lagos — organiser 18–25 October calendar and National Theatre main hub", href: "https://designweeklagos.com/" };
    const faq = { label: "Design Week Lagos — official venue and programme FAQ", href: "https://designweeklagos.com/faq/" };
    const sources = [...(guide.sources ?? [])];
    for (const s of [newSource, faq]) {
      if (guide.source?.href !== s.href && !sources.some(existing => existing.href === s.href)) sources.push(s);
    }
    return {
      ...guide,
      planning: [
        { label: "Which hall date should you book?", detail: "The National Theatre lists 22 October for industry/architecture sessions, 23 October for products/interiors/textiles, 24 October for African design networks and 25 October for the student competition. These are the main Hall events, not automatic entry to every citywide activation from 18 October." },
        { label: "How do you confirm a valid ticket and venue?", detail: "Open the National Theatre's exact Design Week listing and follow its named organiser-linked registration partner. Match your receipt to the event date, session and Hall at Iganmu. The provisional 10:00–18:00 times vary by day and a ticket for one session is not a universal festival pass." },
        { label: "What if your session or entry price is not shown?", detail: "Use designweeklagos.com for the specific organiser session and nationaltheatre.gov.ng for the relevant Hall listing. If the programme is absent or the ticket destination changes, ask the organisers to confirm before paying or arranging transport; neither site establishes one flat admission charge." },
        { label: "Are all exhibitions at the National Theatre?", detail: "No. The organiser describes a citywide festival with partner galleries, studios and showrooms; the National Theatre is its central hub. Confirm the address for your individual booking instead of assuming an Iganmu entry covers partner sites." },
        { label: "If you cannot attend the main Hall programme", detail: "The festival organiser's programme separates citywide showcases from the 22–25 October Hall sessions. Look only for a separately published, still-current partner activation that explicitly accepts visitors; otherwise use the festival site for future announcements." },
      ],
      sources,
      lastReviewed: "2026-10-19",
    };
  }
  return applyAiff2026ConfirmedSessionDecisions(guide);
}
