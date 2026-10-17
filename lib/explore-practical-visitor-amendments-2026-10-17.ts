import type { ExploreGuide } from "@/lib/explore";

// Targeted visitor-facing follow-up for seven flagged guides and four additional single-source event guides.
// Retain unverified fees/hours as unknown. A local pricing or operating claim
// is not validated merely because a landmark appears on an official directory.
export type VisitorGuideAmendment = {
  planning: ExploreGuide["planning"];
  sources?: NonNullable<ExploreGuide["sources"]>;
  reviewedAt?: string;
};
export const practicalVisitorAmendments20261017: Record<string, VisitorGuideAmendment> = {
  "african-traditional-food-fair-abuja-2026": {
    planning: [
      {
        label: "Use the pavilion address, not a copied location pin",
        detail: "For transport, give the driver FCT Exhibition Pavilion, Herbert Macaulay Way, Central Area, beside the International Conference Centre. The organiser confirms that location; allow extra time for pickup and confirm public admission before setting out.",
      },
      {
        label: "Distinguish Friday policy activities from Saturday festivities",
        detail: "A 8 October News Agency of Nigeria report quoting the organisers describes a Friday 16 October 9 AM news conference, policy dialogue and stakeholder exhibitions, followed by the main food and cultural fiesta on Saturday 17 October. Do not assume a Friday public tasting ticket or a Saturday programme starting at 9 AM from that statement.",
      },
    ],
    sources: [
      { label: "News Agency of Nigeria — organisers clarify the 16–17 October programme (8 October 2026)", href: "https://nannews.ng/african-food-fair-to-celebrate-nigerian-culinary-heritage/" },
    ],
    reviewedAt: "2026-10-17",
  },
  "imo-state-travel-guide": {
    planning: [
      {
        label: "Get lake access and boat costs before leaving Owerri",
        detail: "The state's investment overview describes Oguta Lake but does not establish current resort opening hours, an operating boat schedule or a fixed visitor price. Contact an actual operator for the cost, life-jacket provision, boarding point and return time before paying for a road trip.",
      },
    ],
  },
  "jigawa-state-travel-guide": {
    planning: [
      {
        label: "Confirm palace permission and fees town by town",
        detail: "Dutse, Hadejia, Ringim, Gumel and Kazaure are distinct emirate destinations, not attractions covered by one admission ticket. The state overview does not verify visitor opening hours or entry fees at their palaces. Seek permission locally and confirm costs before relying on a public-access visit.",
      },
    ],
  },
  "igun-street-guide": {
    planning: [
      {
        label: "Arrange the actual craft-district stop",
        detail: "When planning transport within Benin City, ask for Igun-Eronmwon, the working bronze-casters' street. This is a lived-in workshop district, not a single ticketed gallery: confirm each workshop's access, any demonstration charge and whether makers welcome a visit before entering a workspace.",
      },
    ],
    sources: [
      { label: "Nigerian Heritage — Igun Street craft workshops and visitor etiquette", href: "https://nigerianheritage.ng/tour-detail.php?id=184" },
    ],
    reviewedAt: "2026-10-17",
  },
  "owa-obokun-statue-guide": {
    planning: [
      {
        label: "Treat the monument and staffed museums differently",
        detail: "Plan the statue as a brief Ilesa landmark stop rather than a scheduled museum visit. An official opening timetable or monument admission fee has not been verified; ask locally about access, parking or special-event restrictions, and do not advertise a bookable Kiriji museum.",
      },
    ],
  },
  "nigeria-hills-mountains-guide": {
    planning: [
      {
        label: "Separate trail costs and seasonal access by destination",
        detail: "The federal tourism overview does not publish one valid climbing fee, ticket or opening schedule for Dala, Idanre, Shere, Mambilla and Obudu. Before picking a climb, ask its local site manager about guide charges and access, then check rain, visibility and daylight for the particular route.",
      },
    ],
  },
  "smfest-abuja-2026": {
    planning: [
      {
        label: "Confirm venue and price against an independent Abuja calendar",
        detail: "Visit Abuja independently lists the 17–18 October event at Family Worship Centre, Plot 648 Idris Gidado Street, Wuye, with doors at 9 AM and a listed starting ticket tier of ₦15,000. Its listing does not resolve the separate organiser FAQ's reference to 16 October, nor guarantee the current checkout total or each day's closing time.",
      },
    ],
    sources: [
      { label: "Visit Abuja — SMFest 2026 venue, dates and listed prices, checked 12 October", href: "https://www.visitabuja.org/event/smfest-abuja-2026/" },
    ],
    reviewedAt: "2026-10-17",
  },
  "design-week-lagos-2026": {
    planning: [
      {
        label: "Cross-check full-week events with hall-only sessions",
        detail: "Design Week Lagos itself advertises 18–25 October with the National Theatre as main hub and other activities across the city; the theatre's separate venue programme specifically sets out 22–25 October Hall events. A festival pass or eight-day date range does not guarantee entry to every National Theatre session. Match your confirmation to the dated venue programme.",
      },
    ],
    sources: [
      { label: "Design Week Lagos — organiser's 18–25 October citywide schedule and hub", href: "https://designweeklagos.com/" },
    ],
    reviewedAt: "2026-10-17",
  },
  "abuja-international-film-festival-2026": {
    planning: [
      {
        label: "Use the festival's own programme for exact session dates",
        detail: "The festival organiser confirms 20–24 October and a 2026 theme addressing AI, ethics and filmmaking. Its programme page shows a broad agenda but says the full schedule is still coming; the Visit Abuja listing separately names Silverbird, Transcorp Hilton and the University of Abuja Mini Campus. Treat those as potential venue guides, not verified locations for every screening, and confirm the final screening timetable before booking transport.",
      },
    ],
    sources: [
      { label: "Abuja International Film Festival — official 2026 programme and outstanding timetable", href: "https://abujainternationalfilmfestival.org/aiff-2026-programme" },
    ],
    reviewedAt: "2026-10-17",
  },
  "ecowas-food-cultural-festival-benin-2026": {
    planning: [
      {
        label: "Check the updated October organiser claims against local reporting",
        detail: "InsideBusiness reported on 16 October that the Benin City programme remains announced for 27–31 October, highlighting food heritage, trade and regional cultural exchange. The reporting cites a festival communications director, not proof that a fixed public venue gate or daily admission price has been published. Obtain those particulars directly in writing before booking a drop-off.",
      },
    ],
    sources: [
      { label: "InsideBusiness — independent 16 October EFCF 2026 event reporting", href: "https://insidebusiness.ng/249219/ecowas-food-and-cultural-festival-2026-enters-final-phase/" },
    ],
    reviewedAt: "2026-10-17",
  },
  "nigeria-textile-craft-guide": {
    planning: [
      {
        label: "Plan a city-specific workshop route",
        detail: "Itoku is in Abeokuta, Igun Street is in Benin City, and pottery heritage in Suleja is a different trip again. Arrange transport between the actual cities rather than expecting one craft-market circuit. Confirm workshop entry, maker availability and any demonstration charge directly; prices are not standardised by the federal cultural overview.",
      },
    ],
  },
};
