import type { ExplorePlace } from "@/lib/explore-places";

/** Curated visitor stops in existing canonical guides.
 * Government listings support location/heritage claims, not current admission or hours.
 * Source evidence and editorial decisions: docs/research/evergreen-keyword-integration-2026-10-11.md
 */
export const verifiedEvergreenCityStops20261011: ExplorePlace[] = [
  {
    slug: "ogbete-main-market-enugu",
    guideSlug: "enugu",
    name: "Ogbete Main Market",
    kind: "shopping",
    area: "Central Enugu",
    address: "Ogbete Main Market, Enugu, Enugu State, Nigeria",
    summary: "Historic central market and a useful stop for experiencing Enugu's commercial life. It is a busy trading area rather than a managed tourist attraction; confirm suitable visiting times and keep personal belongings secure.",
    source: {
      label: "Enugu State Government — Hospitality",
      href: "https://enugustate.gov.ng/hospitality/"
    },
    tags: [
      "Enugu",
      "market",
      "local commerce",
      "culture"
    ],
    cost: "Verify current admission, access and any guiding charges locally",
    hours: "Opening or site access is not independently confirmed; contact the relevant operator or authority before visiting.",
    mapQuery: "Ogbete Main Market Central Enugu Nigeria",
    checkedAt: "2026-10-11"
  },
  {
    slug: "palms-polo-park-mall-enugu",
    guideSlug: "enugu",
    name: "The Palms Polo Park Mall",
    kind: "shopping",
    area: "Old GRA",
    address: "The Palms Polo Park Mall, Old GRA, Abakaliki Expressway, Enugu, Enugu State, Nigeria",
    summary: "Shopping and dining stop in Enugu's Old GRA. The mall operator lists this Enugu location along Abakaliki Expressway; check individual shops, cinema programmes and current hours directly before travelling.",
    source: {
      label: "The Palms — official Enugu mall listing",
      href: "https://www.thepalmsmall.com/the-palms-enugu"
    },
    website: "https://www.thepalmsmall.com/the-palms-enugu",
    tags: ["Enugu", "mall", "shopping", "dining"],
    cost: "Individual shopping, dining and entertainment prices vary; check with tenants",
    hours: "Mall and individual tenant hours may differ; check the mall operator before visiting.",
    mapQuery: "The Palms Polo Park Mall Old GRA Enugu Nigeria",
    checkedAt: "2026-10-11"
  },
  {
    slug: "kagoro-hills-kaduna",
    guideSlug: "kaduna-state-travel-guide",
    name: "Kagoro Hills",
    kind: "nature",
    area: "Kagoro / Zangon Kataf",
    address: "Kagoro Hills, Kagoro, Zangon Kataf, Kaduna State, Nigeria",
    summary: "Scenic hill country identified in Kaduna State's tourism planning. It is outside Kaduna city; confirm local access, security advice and a suitable guide before making a day trip.",
    source: {
      label: "Kaduna State Government — tourism development budget",
      href: "https://kdsg.gov.ng/download/2945/budgets/22312/kaduna-state-revised-fy-2024-budget-publication"
    },
    tags: [
      "Kaduna State",
      "hills",
      "landscape",
      "access check"
    ],
    cost: "Verify current admission, access and any guiding charges locally",
    hours: "Opening or site access is not independently confirmed; contact the relevant operator or authority before visiting.",
    mapQuery: "Kagoro Hills Kagoro / Zangon Kataf Nigeria",
    checkedAt: "2026-10-11"
  },
  {
    slug: "national-museum-nok-kwoi",
    guideSlug: "kaduna-state-travel-guide",
    name: "National Museum Nok",
    kind: "landmark",
    area: "Kwoi / Jaba",
    address: "National Museum Nok, Kwoi, Jaba Local Government Area, Kaduna State, Nigeria",
    summary: "The National Commission for Museums and Monuments lists National Museum Nok in Kwoi, Jaba LGA. It is relevant to the region’s archaeological history; confirm exhibitions and actual visitor access with the museum before making the trip.",
    source: {
      label: "National Commission for Museums and Monuments — museum directory",
      href: "https://museum.ng/national-museums-list/"
    },
    tags: [
      "Kaduna State",
      "Nok",
      "heritage",
      "museum"
    ],
    cost: "Verify current admission, access and any guiding charges locally",
    hours: "Opening or site access is not independently confirmed; contact the relevant operator or authority before visiting.",
    mapQuery: "National Museum Nok Kwoi Jaba Kaduna Nigeria",
    checkedAt: "2026-10-11"
  },
  {
    slug: "motna-architecture-museum-jos",
    guideSlug: "jos",
    name: "Museum of Traditional Nigerian Architecture (MOTNA)",
    kind: "attraction",
    area: "Jos museum district",
    address: "Museum of Traditional Nigerian Architecture (MOTNA), opposite High Court, Jos, Plateau State, Nigeria",
    summary: "A specialist National Commission for Museums and Monuments site presenting Nigerian architectural heritage. It is distinct from the adjacent Jos National Museum and zoo; confirm exhibit access with the museum before travelling.",
    source: {
      label: "National Commission for Museums and Monuments — national museum locations",
      href: "https://museum.ng/museums/national-museums/"
    },
    tags: ["Jos", "architecture", "museum", "heritage"],
    cost: "Confirm current museum admission, guided visit policy and any student concessions",
    hours: "NCMM publishes national museum hours, but confirm MOTNA's individual visiting arrangements before travel.",
    mapQuery: "Museum of Traditional Nigerian Architecture MOTNA Jos Plateau Nigeria",
    checkedAt: "2026-10-11"
  }

];
