// Sourced, limited-scope visitor corrections. They are not firsthand visits.
// No unpublished admission fee, fixed opening time, route safety or ticket price
// is asserted. A dated event or restoration report is not proof of today's access.
export type VerifiedVisitAddition = {
  source: { label: string; href: string };
  planning: { label: string; detail: string };
  intro?: string;
};
export const verifiedVisitAdditions20261015: Record<string, VerifiedVisitAddition> = {
  "sukur-hidi-palace-guide": {
    source: { label: "UNESCO World Heritage Centre — Sukur Cultural Landscape and management", href: "https://whc.unesco.org/en/list/938" },
    intro: "UNESCO describes the Hidi Palace as part of a living cultural landscape in Madagali LGA, Adamawa State, not a standalone ticketed monument. The hilltop settlement, terraces and sacred places form one protected site with community and customary authority.",
    planning: { label: "Confirm community permission and security before any journey", detail: "Sukur lies in Madagali near the Cameroon border. UNESCO describes the site as a living palace/community landscape, while published conservation reports describe security and pathway restoration concerns. Do not infer that the palace compound is open daily, quote an unverified entry fee or travel unescorted; seek up-to-date security advice and contact the responsible heritage authority and community for approved access." },
  },
  "igun-street-guide": {
    source: { label: "Edo State Government — Igun Street bronze-casting guild", href: "https://edostate.gov.ng/visit-edo-explore-our-tourist-sites-treat-yourself-to-our-culture-hospitality/" },
    intro: "Edo State identifies Igun Street in Benin City as a longstanding street of bronze casters and skilled craftsmen. Workshops are working cultural spaces rather than one publicly managed museum with a universal entrance fee.",
    planning: { label: "Arrange workshop access respectfully", detail: "Go to the Igun Street craft area in Benin City in daylight and ask an individual workshop or guild representative whether visitors may observe casting. Photography, workshop tours and purchases require separate permission; no reliable universal workshop-opening schedule or admission charge was verified by the Edo State tourism report." },
  },
  "lokoja": {
    source: { label: "Radio Nigeria — Lokoja residents describe visitor-site infrastructure needs (27 Sep 2026)", href: "https://radionigerianorthcentral.gov.ng/2026/09/27/residents-seek-development-of-kogi-tourism-sites-to-boost-revenue/" },
    intro: "Independent interviews recorded by Radio Nigeria in September 2026 identify Mount Patti, Lugard Rest House and the Niger–Benue confluence as central Lokoja heritage stops while warning that tourism infrastructure and access need improvement.",
    planning: { label: "Treat Mount Patti and confluence stops as separate access checks", detail: "Mount Patti overlooks Lokoja and houses colonial heritage sites, while the Niger–Benue confluence is a separate river landscape. Radio Nigeria reported local requests for better access roads, visitor facilities and security in September 2026; confirm a legitimate viewpoint and current route locally instead of assuming a mapped pin means the rest house or waterfront is open." },
  },
  "national-theatre-lagos-guide": {
    source: { label: "National Theatre — official Wole Soyinka Centre calendar", href: "https://nationaltheatre.gov.ng/index" },
    intro: "The National Theatre's own site identifies the refurbished complex as the Wole Soyinka Centre for Culture and the Creative Arts and publishes an event calendar. This supports bookable event-specific visits, not unlimited tourist access to every hall.",
    planning: { label: "Use the official event calendar, not an invented general admission ticket", detail: "The theatre reopened in 2025 after refurbishment. Review the date, named hall and event-specific ticket/entry terms on the National Theatre's calendar before travelling to Iganmu, Lagos. Parliamentary reporting in February 2026 raised concerns about underuse; reopening alone does not prove that all interior venues offer unrestricted tours." },
  },
  "agulu-lake-guide": {
    source: { label: "Anambra State Culture Ministry — August 2026 Agulu Lake development announcement", href: "https://mocet.anambrastate.gov.ng/news/anambra-unveils-plan-to-transform-ogbunike-cave-agulu-lake-into-world-" },
    intro: "Anambra State announced plans in August 2026 to develop Agulu Lake into a visitor destination with improved leisure facilities. Those plans are not evidence that the proposed facilities are already operational.",
    planning: { label: "Do not assume planned lake facilities are operating", detail: "Agulu Lake is in Anambra State; the state government's August 2026 announcement describes planned recreational development, not a confirmed daily visitor programme. Verify lakeside access, boat activity, current operator permission and any charge with local authorities before travelling; avoid an unverified boating or resort booking." },
  },
  "moremi-statue-ile-ife-guide": {
    source: { label: "Ife Community Trust Foundation — Ile-Ife visitor site directory", href: "https://ifetrustfoundation.org/tourism/" },
    intro: "Ife Community Trust Foundation lists the Moremi Statue of Liberty among Ile-Ife visitor heritage sites. The listing confirms the site's identity but does not establish a universal current ticket, guide fee or operating timetable.",
    planning: { label: "Confirm site access and respectful heritage photography", detail: "Plan Ile-Ife as a heritage visit in Osun State rather than assuming the Moremi statue can be entered as a ticketed museum. Confirm the current location/entrance, photography etiquette, local guiding arrangements and any fee with a recognised local tourism contact before setting out." },
  },
  "abuja-national-mosque-guide": {
    source: { label: "Nigerian Supreme Council for Islamic Affairs — National Mosque complex contact", href: "https://nscia.com.ng/contact-us/" },
    intro: "The Nigerian Supreme Council for Islamic Affairs locates its headquarters at the National Mosque Complex in Abuja's Central Business District. The council's administrative contact hours are not verified public mosque-tour hours.",
    planning: { label: "Check worship access separately from office hours", detail: "The Abuja National Mosque is in the Central Business District. Contact the mosque or responsible authority before arranging an architectural visit, especially if not attending prayers. Respect worship activity and dress requirements; do not mistake NSCIA administrative office hours for a public visitor schedule or assume photography is permitted." },
  },
};
