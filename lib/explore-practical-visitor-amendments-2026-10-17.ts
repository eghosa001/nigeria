import type { ExploreGuide } from "@/lib/explore";

// Targeted visitor-facing follow-up for seven specific flagged guides.
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
  "nigeria-textile-craft-guide": {
    planning: [
      {
        label: "Plan a city-specific workshop route",
        detail: "Itoku is in Abeokuta, Igun Street is in Benin City, and pottery heritage in Suleja is a different trip again. Arrange transport between the actual cities rather than expecting one craft-market circuit. Confirm workshop entry, maker availability and any demonstration charge directly; prices are not standardised by the federal cultural overview.",
      },
    ],
  },
};
