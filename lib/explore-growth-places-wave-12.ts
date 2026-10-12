import type { ExplorePlace } from "@/lib/explore-places";

/**
 * Individually source-checked NCMM museums and Kogi State heritage stops.
 * Each is a place in an existing canonical guide, NOT a new indexable page.
 * State/venue listings never establish today's opening hours, prices or safety.
 * Evidence: docs/research/tour-heritage-expansion-2026-10-12.md
 */
export const officialHeritageStops20261012: ExplorePlace[] = [
  {
    "slug": "national-museum-uyo",
    "guideSlug": "uyo",
    "name": "National Museum Uyo",
    "kind": "attraction",
    "area": "Aka Offot / Ring Road II",
    "address": "Ring Road II, Aka Offot, behind Ibom Hall, Uyo, Akwa Ibom State, Nigeria",
    "summary": "NCMM lists a national museum on Uyo's Ring Road II near Ibom Hall. This is distinct from Ibom Unity Museum; confirm exhibitions and visitor hours separately before combining both into a city museum circuit.",
    "cost": "Confirm any admission, photography, local-guide or transport charge before visiting.",
    "hours": "Confirm visitor admission, operational status and opening hours with the listed operator before travelling; a directory listing is not a live schedule.",
    "mapQuery": "National Museum Uyo Ring Road II Aka Offot behind Ibom Hall",
    "source": {
      "label": "National Commission for Museums and Monuments — national museums directory",
      "href": "https://museum.ng/museums/national-museums/"
    },
    "checkedAt": "2026-10-12",
    "tags": [
      "National Museum Uyo",
      "Uyo museums",
      "Akwa Ibom culture",
      "heritage"
    ]
  },
  {
    "slug": "national-museum-yenagoa",
    "guideSlug": "yenagoa",
    "name": "National Museum Yenagoa",
    "kind": "attraction",
    "area": "Sani Abacha Expressway / Ijaw House",
    "address": "Ijaw House, Sani Abacha Expressway, Yenagoa, Bayelsa State, Nigeria",
    "summary": "NCMM lists its Yenagoa museum at Ijaw House on Sani Abacha Expressway. It is an urban heritage stop, not the separate oil-history project in Oloibiri; contact the museum about actual exhibitions and access.",
    "cost": "Confirm any admission, photography, local-guide or transport charge before visiting.",
    "hours": "Confirm visitor admission, operational status and opening hours with the listed operator before travelling; a directory listing is not a live schedule.",
    "mapQuery": "National Museum Yenagoa Ijaw House Sani Abacha Expressway",
    "source": {
      "label": "National Commission for Museums and Monuments — national museums directory",
      "href": "https://museum.ng/museums/national-museums/"
    },
    "checkedAt": "2026-10-12",
    "tags": [
      "Yenagoa museums",
      "Bayelsa heritage",
      "Ijaw House",
      "city culture"
    ]
  },
  {
    "slug": "national-museum-colonial-history-lokoja",
    "guideSlug": "lokoja",
    "name": "National Museum of Colonial History, Lokoja",
    "kind": "attraction",
    "area": "Lokoja city",
    "address": "Lokoja, Kogi State, Nigeria — confirm street entrance with NCMM",
    "summary": "The federal museum commission lists a National Museum of Colonial History in Lokoja. It provides a more specific heritage stop than the city's general colonial district; the national listing does not give a street entrance, so contact NCMM before setting off.",
    "cost": "Confirm any admission, photography, local-guide or transport charge before visiting.",
    "hours": "Confirm visitor admission, operational status and opening hours with the listed operator before travelling; a directory listing is not a live schedule.",
    "mapQuery": "National Museum of Colonial History Lokoja Kogi State",
    "source": {
      "label": "National Commission for Museums and Monuments — national museums directory",
      "href": "https://museum.ng/museums/national-museums/"
    },
    "checkedAt": "2026-10-12",
    "tags": [
      "Lokoja museum",
      "colonial history",
      "Kogi heritage",
      "visitor access"
    ]
  },
  {
    "slug": "national-museum-port-harcourt",
    "guideSlug": "port-harcourt",
    "name": "National Museum Port Harcourt",
    "kind": "attraction",
    "area": "Old GRA",
    "address": "Near No. 2 Hairle Street, Old GRA, opposite Delta Hotel, Port Harcourt, Rivers State, Nigeria",
    "summary": "NCMM lists its Port Harcourt museum in Old GRA near Delta Hotel. It makes a city-centre heritage stop; confirm that the gallery is admitting visitors and verify current security, hours and any admission fee.",
    "cost": "Confirm any admission, photography, local-guide or transport charge before visiting.",
    "hours": "Confirm visitor admission, operational status and opening hours with the listed operator before travelling; a directory listing is not a live schedule.",
    "mapQuery": "National Museum Port Harcourt Old GRA opposite Delta Hotel",
    "source": {
      "label": "National Commission for Museums and Monuments — national museums directory",
      "href": "https://museum.ng/museums/national-museums/"
    },
    "checkedAt": "2026-10-12",
    "tags": [
      "Port Harcourt museum",
      "Old GRA",
      "Rivers State culture",
      "heritage"
    ]
  },
  {
    "slug": "national-museum-sokoto",
    "guideSlug": "sokoto-state-travel-guide",
    "name": "National Museum Sokoto",
    "kind": "attraction",
    "area": "Federal Secretariat area",
    "address": "Federal Secretariat Complex, Sokoto, Sokoto State, Nigeria",
    "summary": "The federal museum commission lists a national museum within Sokoto's Federal Secretariat Complex. Allow for possible government-compound entry checks and confirm visitor access rather than assuming unrestricted public entry.",
    "cost": "Confirm any admission, photography, local-guide or transport charge before visiting.",
    "hours": "Confirm visitor admission, operational status and opening hours with the listed operator before travelling; a directory listing is not a live schedule.",
    "mapQuery": "National Museum Sokoto Federal Secretariat Complex",
    "source": {
      "label": "National Commission for Museums and Monuments — national museums directory",
      "href": "https://museum.ng/museums/national-museums/"
    },
    "checkedAt": "2026-10-12",
    "tags": [
      "Sokoto national museum",
      "museum",
      "Caliphate history",
      "Sokoto culture"
    ]
  },
  {
    "slug": "national-museum-oyo-town",
    "guideSlug": "oyo-state-travel-guide",
    "name": "National Museum Oyo",
    "kind": "attraction",
    "area": "Palace Road, Oyo town",
    "address": "No. 1 Palace Road, Alaafin of Oyo area, Oyo, Oyo State, Nigeria",
    "summary": "NCMM lists a museum on Palace Road in Oyo town. This is not in central Ibadan; combine it with an Oyo-town heritage visit rather than promising it as a quick Ibadan city stop.",
    "cost": "Confirm any admission, photography, local-guide or transport charge before visiting.",
    "hours": "Confirm visitor admission, operational status and opening hours with the listed operator before travelling; a directory listing is not a live schedule.",
    "mapQuery": "National Museum Oyo 1 Palace Road Oyo town",
    "source": {
      "label": "National Commission for Museums and Monuments — national museums directory",
      "href": "https://museum.ng/museums/national-museums/"
    },
    "checkedAt": "2026-10-12",
    "tags": [
      "Oyo town museum",
      "Alaafin",
      "Oyo heritage",
      "Palace Road"
    ]
  },
  {
    "slug": "ohinoyi-palace-okene",
    "guideSlug": "kogi-state-travel-guide",
    "name": "Ohinoyi's Palace, Okene",
    "kind": "landmark",
    "area": "Okene / Ebira heartland",
    "address": "Ohinoyi's Palace, Okene, Kogi State, Nigeria",
    "summary": "Kogi State identifies the Ohinoyi's Palace as a major landmark of Ebira kingship and contemporary royal architecture. It is a functioning royal residence, not a walk-in museum; view respectfully and seek permission for any interior visit.",
    "cost": "No public admission tariff verified; do not pay for an unofficial palace tour.",
    "hours": "Public viewing areas, photography and interior access require local confirmation.",
    "mapQuery": "Ohinoyi Palace Okene Kogi State",
    "source": {
      "label": "Kogi State Government — places to visit",
      "href": "https://kogistate.gov.ng/kogi-state-where-rivers-kiss-the-sky/"
    },
    "checkedAt": "2026-10-12",
    "tags": [
      "Ebira royal heritage",
      "Okene",
      "Kogi palace",
      "architecture"
    ]
  },
  {
    "slug": "attah-igala-palace-idah",
    "guideSlug": "kogi-state-travel-guide",
    "name": "Attah of Igala's Palace, Idah",
    "kind": "landmark",
    "area": "Idah / Igala kingdom",
    "address": "Attah's Palace, Idah, Kogi State, Nigeria",
    "summary": "Kogi State's visitor guide identifies Idah Royal Palace with the Igala monarchy and its cultural heritage. Idah is a separate excursion from Lokoja, and palace access or photography should only be arranged with permission.",
    "cost": "No independently verified public admission or guiding fee.",
    "hours": "Confirm royal-court visitor protocol and whether any part is open before travelling.",
    "mapQuery": "Attah Igala Royal Palace Idah Kogi",
    "source": {
      "label": "Kogi State Government — places to visit",
      "href": "https://kogistate.gov.ng/kogi-state-where-rivers-kiss-the-sky/"
    },
    "checkedAt": "2026-10-12",
    "tags": [
      "Igala kingdom",
      "Idah palace",
      "royal heritage",
      "Kogi traditions"
    ]
  },
  {
    "slug": "world-war-ii-cenotaph-lokoja",
    "guideSlug": "lokoja",
    "name": "World War II Cenotaph, Lokoja",
    "kind": "landmark",
    "area": "Historic Lokoja",
    "address": "World War II Cenotaph, Lokoja, Kogi State, Nigeria",
    "summary": "Kogi State's official development plan identifies a Second World War cenotaph among Lokoja's heritage markers. The plan is not a map or an opening-hours source; verify the exact visitor approach with a local museum or heritage contact.",
    "cost": "No ticket price established from the government heritage inventory.",
    "hours": "Outdoor monument access and precise meeting point require local verification.",
    "mapQuery": "World War II Cenotaph Lokoja Kogi",
    "source": {
      "label": "Kogi State Government — long-term development plan",
      "href": "https://mainbackup.kogistate.gov.ng/wp-content/uploads/Kogi-State-Development-Plan-2024-2056.pdf"
    },
    "checkedAt": "2026-10-12",
    "tags": [
      "Lokoja war memorial",
      "World War II",
      "Kogi heritage",
      "history"
    ]
  },
  {
    "slug": "inike-lake-okene",
    "guideSlug": "kogi-state-travel-guide",
    "name": "Inike Lake, Okene",
    "kind": "nature",
    "area": "Okene area",
    "address": "Inike Lake, Okene, Kogi State, Nigeria",
    "summary": "Kogi State's tourism guide names Inike Lake as an Okene-area landscape destination. Treat it as a locally arranged outdoor excursion: no official swimming provision, boating operator, safety cover or public opening timetable has been confirmed.",
    "cost": "No managed visitor fee or activity tariff verified.",
    "hours": "Go in daylight only after confirming local access; do not assume the water is safe for swimming.",
    "mapQuery": "Inike Lake Okene Kogi State",
    "source": {
      "label": "Kogi State Government — places to visit",
      "href": "https://kogistate.gov.ng/kogi-state-where-rivers-kiss-the-sky/"
    },
    "checkedAt": "2026-10-12",
    "tags": [
      "Okene lake",
      "Kogi natural attractions",
      "quiet nature",
      "outdoor trips"
    ]
  },
  {
    "slug": "ajaokuta-steel-complex-exterior",
    "guideSlug": "kogi-state-travel-guide",
    "name": "Ajaokuta Steel Complex heritage viewpoint",
    "kind": "landmark",
    "area": "Ajaokuta / industrial district",
    "address": "Ajaokuta Steel Complex, Ajaokuta, Kogi State, Nigeria",
    "summary": "The state tourism guide notes Ajaokuta's industrial-history significance. This is an operating or access-controlled industrial site, not an open tourist park. Treat it as an exterior heritage reference unless the authorised operator confirms a supervised visit.",
    "cost": "No public tour price confirmed; do not pay a third-party guide claiming guaranteed entry.",
    "hours": "Do not enter restricted plant, rail or construction areas; request written operator permission for any interior tour.",
    "mapQuery": "Ajaokuta Steel Complex Ajaokuta Kogi",
    "source": {
      "label": "Kogi State Government — places to visit",
      "href": "https://kogistate.gov.ng/kogi-state-where-rivers-kiss-the-sky/"
    },
    "checkedAt": "2026-10-12",
    "tags": [
      "Ajaokuta history",
      "industrial heritage",
      "steel complex",
      "Kogi industry"
    ]
  },
  {
    "slug": "royal-niger-flagpost-lokoja",
    "guideSlug": "lokoja",
    "name": "Royal Niger Flag Post, Lokoja",
    "kind": "landmark",
    "area": "Historic Lokoja",
    "address": "Historic Royal Niger flag-post area, Lokoja, Kogi State, Nigeria — exact marker position unverified",
    "summary": "Kogi State's development plan names the Royal Niger Flag Post among Lokoja's historic monuments. Treat it as a heritage research stop until the precise marker and public approach have been confirmed by local authorities.",
    "cost": "No verified public admission fee; confirm any local guide charge beforehand.",
    "hours": "Request an exact official meeting point; do not rely on an unverified automatic map pin.",
    "mapQuery": "Royal Niger Flag Post Lokoja Kogi",
    "source": {
      "label": "Kogi State Government — long-term development plan",
      "href": "https://mainbackup.kogistate.gov.ng/wp-content/uploads/Kogi-State-Development-Plan-2024-2056.pdf"
    },
    "checkedAt": "2026-10-12",
    "tags": [
      "Lokoja colonial landmarks",
      "Royal Niger Company",
      "heritage markers",
      "Kogi history"
    ]
  }
];
