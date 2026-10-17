import type { ExploreGuide } from "@/lib/explore";

// Individually relevant sources and visitor decisions added 17 October 2026.
// The NCMM's national museum directory verifies institution identities and
// locations, NOT current opening hours, exhibit schedules or admissions.
// UNESCO Tentative List documents do NOT confer World Heritage inscription.
type HeritageReview = {
  source: { label: string; href: string };
  planning: ExploreGuide["planning"][number];
  detail: string;
};
const ncmm = "https://museum.ng/museums/national-museums/";
const ncmmList = "https://museum.ng/national-museums-list/";
export const independentHeritageDecisions20261017: Record<string, HeritageReview> = {
  "jos": {
    source: { label: "National Commission for Museums and Monuments — Jos Museum and MOTNA locations", href: ncmm },
    planning: {
      label: "Separate the museum and highland days",
      detail: "NCMM lists National Museum Jos and the Museum of Traditional Nigerian Architecture in Jos as distinct sites. Confirm which galleries are actually accepting visitors and their fees before allocating a cultural morning; Shere Hills and Riyom are outdoor trips with independent access and weather conditions.",
    },
    detail: "The national museum authority lists both National Museum Jos and the separate Museum of Traditional Nigerian Architecture (MOTNA). Neither listing proves current hours or trail access at the highland attractions.",
  },
  "ibadan": {
    source: { label: "National Commission for Museums and Monuments — National Museum of Unity Ibadan", href: ncmmList },
    planning: {
      label: "Find the actual museum before the Mapo circuit",
      detail: "The National Commission for Museums and Monuments lists the National Museum of Unity in Ibadan's Alesinloye area, not at Mapo Hall or Bower's Tower. If museum access matters, confirm today's exhibition and entry conditions with the institution; group the older-city landmarks separately rather than assuming they are all one walk.",
    },
    detail: "Alesinloye is the NCMM-listed location for the National Museum of Unity. Its directory entry verifies the institution, not a current ticket amount or a guaranteed opening on your travel date.",
  },
  "abeokuta": {
    source: { label: "National Commission for Museums and Monuments — National Museum Abeokuta", href: ncmm },
    planning: {
      label: "Do not mistake the city museum for the rock attraction",
      detail: "NCMM places the National Museum Abeokuta inside the Baptist Girls College compound at Idi-Aba, while Olumo Rock, the Ake palace area and Itoku adire market form a different heritage circuit. Ask separately about museum access and Olumo admission before building a route; do not assume the college compound operates as an always-open tourist gate.",
    },
    detail: "The national museum directory gives the Abeokuta museum's Idi-Aba location. It does not supply a validated Olumo Rock ticket or guarantee public entry to the museum compound.",
  },
  "uyo": {
    source: { label: "National Commission for Museums and Monuments — National Museum Uyo visitor listing", href: ncmm },
    planning: {
      label: "Confirm which Uyo museum you are visiting",
      detail: "The NCMM listing gives National Museum Uyo as Ring Road II, Aka Offot, behind Ibom Hall. That is not evidence that another establishment advertised as Ibom Unity Museum is the same institution. Request the current exhibition, visiting arrangements and entry charge for the exact museum before taking a taxi.",
    },
    detail: "The federal NCMM address identifies National Museum Uyo behind Ibom Hall; visitor opening and fees must be checked independently of a location listing.",
  },
  "owerri": {
    source: { label: "National Commission for Museums and Monuments — National Museum Owerri", href: ncmm },
    planning: {
      label: "Use the correct Owerri museum stop",
      detail: "NCMM lists National Museum Owerri at B65 Shell Camp, off Orlu Road. That is a city heritage stop, not the Mbari cultural centre or the Oguta Lake excursion. Confirm that the museum gallery is open to visitors before adding it to an Owerri afternoon; plan Oguta as a separate day with a verified boat operator if needed.",
    },
    detail: "NCMM independently locates National Museum Owerri off Orlu Road, helping visitors distinguish it from Mbari heritage and Oguta Lake.",
  },
  "ilorin": {
    source: { label: "National Commission for Museums and Monuments — National Museum Ilorin", href: ncmm },
    planning: {
      label: "Distinguish Ilorin museum from the mosque and out-of-town heritage",
      detail: "The National Museum Ilorin is listed by NCMM at 14 Abdulkadri Road in the GRA. Check visitor admission and the current gallery display directly; it is a separate city stop from Ilorin Central Mosque and not a substitute for the longer journey to Esie Museum.",
    },
    detail: "NCMM independently records National Museum Ilorin in the GRA and National Museum Esie in Esie; these are different trips with separately unverified current visitor arrangements.",
  },
  "things-to-do-calabar": {
    source: { label: "National Commission for Museums and Monuments — Calabar museum locations", href: ncmmList },
    planning: {
      label: "Pick the right Calabar museum and entrance",
      detail: "NCMM lists National Museum Calabar on Ekpo Eyo Drive and the Slave History Museum inside Marina Resort. They are separate institutions, even though visitors often put both in one Calabar itinerary. Verify the opening, exhibits and any admission charges individually; the Marina Resort address does not prove that every leisure facility there is functioning.",
    },
    detail: "The national museum authority distinguishes Ekpo Eyo Drive's National Museum Calabar from the Slave History Museum at Marina Resort.",
  },
  "calabar-weekend-itinerary": {
    source: { label: "National Commission for Museums and Monuments — Calabar history and marina museums", href: ncmmList },
    planning: {
      label: "Book the heritage morning around the correct museum",
      detail: "For the Marina portion of a Calabar weekend, NCMM locates the Slave History Museum at Marina Resort. National Museum Calabar is a separate institution on Ekpo Eyo Drive. Confirm opening and ticket arrangements for whichever exhibition you want, then leave the afternoon flexible for waterfront access that may change by operator.",
    },
    detail: "NCMM's two distinct museum entries support a history-led city itinerary without treating the entire marina complex as one ticketed attraction.",
  },
  "benin-city-weekend-itinerary": {
    source: { label: "National Commission for Museums and Monuments — National Museum Benin", href: ncmm },
    planning: {
      label: "Start with the named museum, not an assumed palace entry",
      detail: "NCMM locates National Museum Benin on Ring Road in Benin City. This is a different stop from Igun bronze-casting workshops or any part of the Royal Palace complex. Confirm the museum's current exhibition and entry rules and seek workshop or palace permissions separately before committing both days of a heritage weekend.",
    },
    detail: "NCMM's Ring Road entry corroborates the museum part of the itinerary; it does not authorise photography, workshop entry or palace access elsewhere.",
  },
  "kaduna-state-travel-guide": {
    source: { label: "National Commission for Museums and Monuments — National Museum Kaduna", href: ncmm },
    planning: {
      label: "Keep Kaduna museum access separate from Zaria hiking",
      detail: "NCMM lists National Museum Kaduna at 33 Ali Akilu Road in Kaduna, while the Kufena Hills and Zaria heritage visits require a different journey. A museum address is not a trail permit. Check the museum's actual visitor arrangements, local security guidance and the condition of any distant road before including both areas in one trip.",
    },
    detail: "NCMM independently identifies the city museum at Ali Akilu Road; visits to Kufena and Zaria are separate and still depend on local access and security.",
  },
  "sokoto-state-travel-guide": {
    source: { label: "National Commission for Museums and Monuments — National Museum Sokoto", href: ncmm },
    planning: {
      label: "Verify museum access before promising a caliphate-history tour",
      detail: "NCMM places National Museum Sokoto within the Federal Secretariat Complex. This establishes an institutional location, not unrestricted entry into a government complex or current gallery hours. Contact the museum about permissions before travel and keep the mosque, markets, heritage sites and local security checks as separate decisions.",
    },
    detail: "The museum authority lists a Sokoto museum at the Federal Secretariat; ordinary tourism permission and opening details are not confirmed by the address.",
  },
  "bayelsa-state-travel-guide": {
    source: { label: "National Commission for Museums and Monuments — National Museum Yenagoa", href: ncmm },
    planning: {
      label: "Differentiate Yenagoa's museum from the unfinished Oloibiri project",
      detail: "NCMM identifies National Museum Yenagoa at Ijaw House on Sani Abacha Expressway. This is not a claim that the proposed Oloibiri oil-and-gas museum is complete or receiving public visits. Enquire about access at Ijaw House separately and check water transport and local conditions before adding riverine sites.",
    },
    detail: "The national authority lists the Yenagoa museum location independently of Bayelsa's oil-heritage development plans.",
  },
  "ebonyi-state-travel-guide": {
    source: { label: "National Commission for Museums and Monuments — National Museum Abakaliki", href: ncmm },
    planning: {
      label: "Separate Abakaliki heritage from rural salt-lake trips",
      detail: "NCMM locates National Museum Abakaliki at No. 6 St Patrick Road, Kiriri, Abakaliki. This provides a city-based cultural enquiry point, not a verified visiting timetable for the Okposi salt lakes, rock sites or waterfalls. Confirm the museum's availability and arrange local guides and road conditions individually for out-of-town stops.",
    },
    detail: "NCMM identifies a National Museum in Abakaliki; that does not establish access or prices at Ebonyi's outdoor attractions.",
  },
  "yobe-state-travel-guide": {
    source: { label: "National Commission for Museums and Monuments — National Museum Damaturu", href: ncmmList },
    planning: {
      label: "Verify Damaturu museum access and travel safety",
      detail: "NCMM lists National Museum Damaturu near Ben Kadio Housing Estate, behind the Cultural Centre on Maiduguri Road. Treat it as an address to confirm, not evidence of a currently open exhibition or safe onward journey to Dagona or Dufuna. Check authoritative security and road advice before travel and avoid unverified remote excursions.",
    },
    detail: "The federal museum authority names a Damaturu institution; its national directory does not certify opening, travel safety or historic canoe displays.",
  },
  "weekend-trips-from-lagos": {
    source: { label: "National Commission for Museums and Monuments — Ogun and Oyo museum listings", href: ncmm },
    planning: {
      label: "Check whether your heritage stop is actually on the route",
      detail: "NCMM places National Museum Abeokuta at Idi-Aba, inside the Baptist Girls College compound, and the National Museum of Unity in Ibadan's Alesinloye area. Neither is the same location as Olumo Rock or central Ibadan's Mapo Hall. Choose just one anchor institution for a short weekend, confirm permission and admission, then leave realistic Friday or Sunday return-road margin.",
    },
    detail: "NCMM's separately located museums illustrate why an Abeokuta or Ibadan weekend needs a distinct city route rather than a generic Lagos departure plan.",
  },
  "ondo-state-highlights": {
    source: { label: "UNESCO World Heritage Centre — Oke Idanre Tentative List (2007)", href: "https://whc.unesco.org/en/tentativelists/5169/" },
    planning: {
      label: "Understand Idanre's heritage status before the climb",
      detail: "UNESCO's Tentative List record describes the Idanre landscape as both a hill complex and an inhabited historical site, with old palace, court, shrines and other cultural features. It is on Nigeria's Tentative List, not an inscribed World Heritage property. For an actual climb, check the local gate, guide requirements, rain and visitor access; the UNESCO entry is historical evidence, not a current ticket office.",
    },
    detail: "UNESCO's 2007 Oke Idanre submission documents the landscape's heritage features, but does not certify present-day admissions or World Heritage inscription.",
  },
  "nigeria-landmarks-places-to-visit": {
    source: { label: "UNESCO — Gashaka-Gumti National Park Tentative List submission (2025)", href: "https://whc.unesco.org/en/tentativelists/6918/" },
    planning: {
      label: "Treat Gashaka-Gumti as a special-permission park, not a city attraction",
      detail: "Nigeria submitted Gashaka-Gumti National Park to UNESCO's Tentative List in September 2025, documenting habitats across Taraba and Adamawa. That is not World Heritage inscription or proof of a ranger-guided tour booking. Ask the park authority about entry, escorts and any security restrictions before allocating a trip; it should not be slotted into a rushed one-day highlights circuit.",
    },
    detail: "UNESCO's 2025 tentative submission independently supports the park's ecological significance, while current tourism operations remain unconfirmed.",
  },
  "nasarawa-state-travel-guide": {
    source: { label: "National Commission for Museums and Monuments — National Museum Lafia", href: ncmm },
    planning: {
      label: "Use Lafia for a separate culture stop, not a waterfall shortcut",
      detail: "NCMM lists National Museum Lafia behind the Deputy Governor's Office on Shendam Road. This could be a city-based cultural visit if the museum confirms visitor access; it is not the trailhead for Farin Ruwa Falls, Eggon Hills or Ara Rock. Arrange each outdoor site's local transport, conditions and any permissions independently.",
    },
    detail: "NCMM supplies a Lafia museum location distinct from the state's remote rock-and-waterfall itinerary.",
  },
};
