import type { ExplorePlace } from "@/lib/explore-places";

// These are verified Ikeja visitor waypoints — NONE is the festival venue.
// The organiser has not published the festival street address yet.
export const verifiedTrendEventPlaces: ExplorePlace[] = [
  {
    slug: "lagos-airport-hallelujah-festival-2026",
    guideSlug: "hallelujah-festival-lagos-october-2026",
    name: "Murtala Muhammed International Airport",
    kind: "landmark",
    area: "Ikeja, Lagos",
    address: "Murtala Muhammed International Airport, Ikeja, Lagos, Nigeria",
    summary: "The festival organiser identifies Lagos international airport as the nearest airport for international visitors. This is an arrival waypoint, NOT the festival site; confirm the exact event address separately.",
    cost: "Airport fares and ground transport vary; confirm the correct terminal and onward pickup cost",
    mapQuery: "Murtala Muhammed International Airport Ikeja Lagos Nigeria",
    source: { label: "Festival official international visitor FAQ", href: "https://www.hallelujahchallengelive.com/int" },
    checkedAt: "2026-10-08",
    tags: ["Ikeja", "airport", "international arrivals", "not venue"]
  },
  {
    slug: "ikeja-city-mall-hallelujah-festival-2026",
    guideSlug: "hallelujah-festival-lagos-october-2026",
    name: "Ikeja City Mall",
    kind: "shopping",
    area: "Alausa / Ikeja",
    address: "Opposite Elephant Bus-stop, Obafemi Awolowo Way, Alausa Secretariat, Ikeja, Lagos, Nigeria",
    summary: "A verified Ikeja shopping and food stop for visitors who need supplies before an all-night gathering. This is NOT the festival venue and is not presented as being beside the eventual venue.",
    cost: "Mall entry is free; shopping, meals and entertainment are priced separately",
    hours: "Check current store and mall hours on the official website.",
    website: "https://newsites.ikejacitymall.com.ng/",
    mapQuery: "Ikeja City Mall Obafemi Awolowo Way Alausa Ikeja Lagos",
    source: { label: "Ikeja City Mall official contact and address", href: "https://newsites.ikejacitymall.com.ng/contact/" },
    checkedAt: "2026-10-08",
    tags: ["Ikeja", "shopping", "visitor essentials", "not venue"]
  },
  {
    slug: "sheraton-lagos-hallelujah-festival-2026",
    guideSlug: "hallelujah-festival-lagos-october-2026",
    name: "Sheraton Lagos Hotel",
    kind: "hotel",
    area: "Ikeja",
    address: "30 Mobolaji Bank Anthony Way, Ikeja, Lagos, Nigeria",
    summary: "An independently verifiable hotel in Ikeja for travellers comparing accommodation. No festival partnership, reservation availability or proximity to the unannounced festival location is implied.",
    cost: "Room rates and availability change; check the hotel's official booking page directly",
    website: "https://www.marriott.com/en-us/hotels/lossi-sheraton-lagos-hotel/overview/",
    mapQuery: "Sheraton Lagos Hotel 30 Mobolaji Bank Anthony Way Ikeja Lagos",
    source: { label: "Sheraton Lagos Hotel — Marriott official location page", href: "https://www.marriott.com/en-us/hotels/lossi-sheraton-lagos-hotel/overview/" },
    checkedAt: "2026-10-08",
    tags: ["Ikeja", "hotel", "accommodation", "not venue"]
  }
];
