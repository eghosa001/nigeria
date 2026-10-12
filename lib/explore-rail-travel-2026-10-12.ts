import type { ExploreGuide } from "@/lib/explore";

/** Nigerian Railway Corporation timetable and booking, checked 12 October 2026. */
export const railTravelGuides20261012: ExploreGuide[] = [
  {
    slug: "lagos-abeokuta-ibadan-train-guide",
    title: "Lagos–Abeokuta–Ibadan Train: Stations, Timetable and Trip Planning",
    shortTitle: "Lagos–Ibadan by train",
    kind: "itinerary",
    region: "Lagos, Ogun and Oyo States",
    summary: "Use the official Nigerian Railway Corporation timetable to compare Lagos, Abeokuta and Ibadan stops, check the right day's departure and plan onward transport before booking.",
    intro: [
      "The Nigerian Railway Corporation lists the Lagos–Ibadan Train Service (LITS) with a stop at Abeokuta. A useful rail trip starts by choosing your departure day and station, then checking the official timetable and booking instructions again before you leave. Fridays and Saturdays have a different timetable from Sundays through Thursdays.",
      "For a city break, decide whether you want to spend your time in Abeokuta or continue to Ibadan. The train does not deliver you to every attraction: arrange a safe onward journey from the station, and avoid scheduling a tight connection that assumes there can never be a delay.",
      "This is a planning guide, not a real-time departure board or ticket seller. NRC can adjust journeys, seat inventory and operations; the operator's live notice and ticket confirmation take precedence."
    ],
    bestFor: ["Rail journeys", "City breaks", "Abeokuta", "Ibadan", "Transport"],
    highlights: [
      { name: "Lagos departure", detail: "NRC's published Sundays–Thursdays timetable shows Lagos departures at 08:00 and 16:00; its Fridays–Saturdays table shows 07:15, 13:40 and 16:00. These are published schedule times, not live operational guarantees." },
      { name: "Abeokuta stop", detail: "Abeokuta is an intermediate station, so check the correct direction and expected stop time. For an Ogun heritage day, plan separate transport for Olumo Rock and the Itoku adire area." },
      { name: "Ibadan arrival and return", detail: "NRC publishes separate Ibadan-to-Lagos services. Do not plan a same-day return from a Lagos departure without checking the exact reverse timetable for that day." },
      { name: "Ticket and station checks", detail: "Use NRC's official booking menu and verify the actual boarding station, ticket date, name and departure time. Do not rely on a social-media screenshot or unsolicited payment account." }
    ],
    planning: [
      { label: "Choose the day before choosing the time", detail: "NRC publishes different Lagos–Ibadan patterns for Fridays/Saturdays and Sundays–Thursdays. Check the current official timetable for your travel date; do not assume a screenshot from another day applies." },
      { label: "Use the operator's booking route", detail: "On nrc.gov.ng, open BOOK NOW and select Lagos Ibadan Train Service (LITS). Check live seat availability, accepted payment methods and boarding instructions there before paying anyone." },
      { label: "Allow a realistic city transfer", detail: "Build in time between station arrival and museums, accommodation or an onward bus. Check the station location in your ticket and agree on an identifiable pickup point." },
      { label: "Keep heritage visits manageable", detail: "For Abeokuta, focus on one heritage cluster; for Ibadan, select a few city stops rather than treating the train as an entire itinerary. See the Abeokuta and Ibadan city guides for those attractions." },
      { label: "Check safety, delays and changes", detail: "Review NRC service announcements and current local transport guidance immediately before travel. Prefer a daylight onward journey and keep your return option flexible." },
      { label: "Do not invent a fare", detail: "No universal current ticket price is listed here; classes, travel date and purchase conditions may change the amount. Confirm the actual checkout price with NRC." }
    ],
    source: { label: "Nigerian Railway Corporation — official Lagos–Ibadan schedules", href: "https://nrc.gov.ng/schedules/" },
    lastReviewed: "2026-10-12"
  }
];
