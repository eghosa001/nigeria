import type { ExploreGuide } from "@/lib/explore";
import { latestEventIssuerGuides20261024 } from "@/lib/explore-issuer-event-reviews-20261024";
import { applyAiff2026ConfirmedSessionDecisions } from "@/lib/explore-aiff-programme-decisions-2026-10-19";

// 19 October 2026: individually re-opened NIFAFEST's 15–17 October programme,
// Design Week Lagos organiser's full-week calendar, and the National Theatre's
// distinct 22–25 October Hall schedule. These are desk checks, NOT attendance.
export const reviewedEventSlugs20261019 = [
  "nifafest-abuja-2026",
  "design-week-lagos-2026",
] as const;

export function applyCurrentEventVisitorDecisions20261019(guide: ExploreGuide): ExploreGuide {
  // The newest source-specific event decisions must win over earlier layers.
  const current = latestEventIssuerGuides20261024[guide.slug];
  if (current) {
    const seen = new Set<string>();
    const sources = [...(current.sources ?? []), ...(guide.sources ?? [])].filter(item => {
      if (item.href === current.source?.href || seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    });
    return { ...guide, ...current, sources };
  }
  if (guide.slug === "smfest-abuja-2026") {
    // The official 17–18 October programme is over; ticket cards now say
    // 'Out of stock'. Historical details remain useful, but are not a booking.
    // The contact FAQ still differs on whether 16 October was an event day.
    const citations = [
      { label: "SMFest — official 2026 event dates and Wuye venue", href: "https://smfest.org/" },
      { label: "SMFest — 2026 ticket tiers marked out of stock", href: "https://smfest.org/ticket/" },
      { label: "SMFest — contact FAQ with differing 16–18 October dates", href: "https://smfest.org/contact/" },
    ];
    const sources = [...(guide.sources ?? [])];
    for (const citation of citations) {
      if (guide.source?.href !== citation.href && !sources.some(source => source.href === citation.href)) sources.push(citation);
    }
    return {
      ...guide,
      summary: "SMFest Abuja's advertised 17–18 October 2026 conference at Family Worship Centre, Wuye, has passed. This guide records the announced AdvantageX programme, venue and former ticket categories; it is not a current ticket offer or evidence that every planned session took place.",
      intro: [
        "The organiser's main event page advertised 17 and 18 October 2026 at Family Worship Centre in Wuye, Abuja, with a 9 AM start and the AdvantageX theme. Those dates have passed. The site still contains booking links, but the 2026 ticket page marks the listed tiers out of stock. Do not use an old checkout link to plan attendance.",
        "An unresolved discrepancy remains in the organiser's own pages: its contact FAQ says 16–18 October, whereas its event homepage and About FAQ say 17–18 October. That difference may reflect ancillary activities, but there is no source-backed reason to claim Friday was a public conference day. The published programme does not verify what actually took place.",
      ],
      highlights: [
        { name: "Advertised main dates: 17–18 October 2026", detail: "The event homepage listed Saturday and Sunday, with a 9 AM start. Both dates have passed." },
        { name: "Advertised venue: Family Worship Centre, Wuye", detail: "FWC Wuye, Abuja was the organiser's stated main conference location." },
        { name: "AdvantageX programme", detail: "The organiser advertised business, technology and creator sessions; actual speaker attendance and delivered sessions have not been independently verified." },
        { name: "Historical ticket tiers", detail: "The organiser displayed ₦15,000–₦250,000 categories. Its ticket page now shows them as out of stock; those amounts are not current offers." },
      ],
      planning: [
        { label: "Can you still buy a 2026 conference ticket?", detail: "The advertised event ended on 18 October. The organiser's 2026 ticket categories are marked out of stock. Do not pay a reseller or follow an undated invitation for this edition." },
        { label: "Where was the 2026 venue?", detail: "Family Worship Centre, Wuye, Abuja. This is a record of the announced location, not an upcoming event booking or assertion that every programme activity happened there." },
        { label: "Why do the organiser's dates disagree?", detail: "SMFest's homepage lists 17–18 October, but its contact FAQ says 16–18 October. Treat 17–18 as the advertised main conference dates and verify any separately claimed 16 October session with the organiser." },
        { label: "Looking for highlights or a future edition?", detail: "Check SMFest's new dated announcements or published recordings. Do not assume the 2026 ticket price, speaker roster, venue or programme will apply to a future event." },
      ],
      sources,
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
    // Checked 26 October 2026: the organiser still lists 18–25 October;
    // the National Theatre's What’s On page explicitly marks its Hall event ended.
    // The programme is historical, not evidence that every advertised session ran.
    const newSource = { label: "Design Week Lagos — organiser's 18–25 October 2026 programme", href: "https://designweeklagos.com/" };
    const faq = { label: "Design Week Lagos — organiser's multi-venue FAQ", href: "https://designweeklagos.com/faq/" };
    const ended = { label: "National Theatre — 2026 Hall event marked ended (checked 26 October)", href: "https://nationaltheatre.gov.ng/whatson" };
    const gallery = { label: "National Theatre — completed 2026 Hall event, gallery not yet published (checked 26 October)", href: "https://nationaltheatre.gov.ng/event/gallery/design-week-lagos-2026/XzBl38MQ" };
    const sources = [...(guide.sources ?? [])];
    for (const s of [newSource, faq, ended, gallery]) {
      if (guide.source?.href !== s.href && !sources.some(existing => existing.href === s.href)) sources.push(s);
    }
    return {
      ...guide,
      summary: "Design Week Lagos's advertised 18–25 October 2026 dates have passed. The National Theatre now marks its 22–25 October Hall programme as ended. This guide preserves the published schedule, not a current ticket offer or proof that every session took place.",
      intro: [
        "The organiser advertised an eight-day, citywide design festival from 18 to 25 October 2026. The National Theatre in Iganmu was the main hub, with a separate published Hall programme for 22–25 October. Those dates are now historical.",
        "The National Theatre's current What's On listing marks Design Week Lagos 2026 as ended. The dated session themes in the highlights below are the advertised programme, not evidence that every activity took place."
      ],
      planning: [
        { label: "Can you still book the 2026 Hall programme?", detail: "No. The National Theatre marks the 2026 event as ended. Do not pay through an old event-ticket link or assume that the former 10:00–18:00 provisional window is a current visiting schedule." },
        { label: "Was every festival activity at the National Theatre?", detail: "No. The organiser described separate galleries, showrooms and partner activations across Lagos. The National Theatre Hall dates did not cover every citywide event, and the old schedule does not establish current public access to those venues." },
        { label: "Where can you check a future edition?", detail: "Wait for a new dated announcement from designweeklagos.com and check the exact venue, session and admission route before planning travel. Neither the 2026 ticket link nor the old Hall timetable proves a future event is open." },
        { label: "Where are the 2026 results or event photos?", detail: "The National Theatre's completed-event gallery currently says no photos or videos are available. Do not claim that advertised talks, student awards or named appearances happened without a later organiser report or independently documented result." }
      ],
      sources,
      lastReviewed: "2026-10-26",
    };
  }
  return applyAiff2026ConfirmedSessionDecisions(guide);
}
