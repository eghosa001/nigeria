import type { ExplorePlace } from "@/lib/explore-places";

// These are verified Ikeja visitor waypoints — NONE is the festival venue.
// The organiser has not published the festival street address yet.
export const verifiedTrendEventPlaces: ExplorePlace[] = [
  {
    "slug": "national-theatre-moonshot-2026",
    "guideSlug": "moonshot-techcabal-lagos-2026",
    "name": "National Theatre (Moonshot 2026 venue)",
    "kind": "landmark",
    "area": "Iganmu, Lagos",
    "address": "National Theatre, Iganmu, Lagos, Nigeria",
    "summary": "Official Moonshot conference venue for 28–29 October 2026. Confirm the organiser's entrance and security/arrival instructions; an ordinary visitor map pin does not guarantee access without a ticket.",
    "cost": "Moonshot admission depends on the pass category and current official checkout; general theatre admission is not the conference ticket",
    "website": "https://moonshot.techcabal.com/",
    "mapQuery": "National Theatre Iganmu Lagos",
    "source": {
      "label": "Moonshot official event venue; National Troupe of Nigeria Iganmu address",
      "href": "https://moonshot.techcabal.com/"
    },
    "checkedAt": "2026-10-14",
    "tags": [
      "Moonshot",
      "conference venue",
      "National Theatre",
      "Iganmu",
      "Lagos"
    ]
  },
  {
    "slug": "blue-line-national-theatre-moonshot-2026",
    "guideSlug": "moonshot-techcabal-lagos-2026",
    "name": "National Theatre Blue Line Rail Station",
    "kind": "landmark",
    "area": "National Theatre / Iganmu",
    "address": "National Theatre Station, Lagos Blue Line, Lagos, Nigeria",
    "summary": "Official Lagos Blue Line station serving the National Theatre area and a possible transport waypoint. Check current LAMATA timetable, service and the walk between station and event entrance; rail access does not include conference entry.",
    "cost": "Rail fare and operating hours vary; confirm today's details through Lagos transport authorities before travel",
    "website": "https://www.lamata-ng.com/train-services/",
    "mapQuery": "National Theatre Blue Line Station Lagos",
    "source": {
      "label": "Nigeria State House confirms National Theatre station on Lagos Blue Rail Line",
      "href": "https://statehouse.gov.ng/president-buhari-inaugurates-phase-1-of-lagos-blue-rail-line-takes-train-ride/"
    },
    "checkedAt": "2026-10-14",
    "tags": [
      "Moonshot",
      "rail",
      "Blue Line",
      "Lagos transport",
      "station",
      "not venue"
    ]
  },
  {
    "slug": "j-randle-lagos-moonshot-2026",
    "guideSlug": "moonshot-techcabal-lagos-2026",
    "name": "J. Randle Centre for Yoruba Culture and History",
    "kind": "attraction",
    "area": "Onikan, Lagos Island",
    "address": "Onikan Round About, Lagos Island, Lagos 102273, Nigeria",
    "summary": "An optional cultural visit on Lagos Island for conference travellers with additional time. This is a separate attraction in another district, NOT the National Theatre, not a Moonshot programme venue and not assumed to be within walking distance.",
    "cost": "The centre's own website lists adult admission; confirm current pricing, timed access and Tuesday closure with the centre before visiting",
    "hours": "Official listing: Wednesday–Monday 10 AM–6 PM, Tuesday closed; verify changes before visiting",
    "website": "https://www.jrandlecentre.com/",
    "mapQuery": "J Randle Centre Onikan Lagos",
    "source": {
      "label": "J. Randle Centre official visit information and address",
      "href": "https://www.jrandlecentre.com/"
    },
    "checkedAt": "2026-10-14",
    "tags": [
      "Moonshot",
      "optional culture",
      "museum",
      "Lagos Island",
      "not venue"
    ]
  },
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
