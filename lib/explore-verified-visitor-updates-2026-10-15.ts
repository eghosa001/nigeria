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
  "osogbo": {
    source: {"label":"UNESCO World Heritage Centre — Osun-Osogbo Sacred Grove","href":"https://whc.unesco.org/en/list/1118/"},
    intro: "UNESCO identifies the Osun-Osogbo Sacred Grove outside Osogbo as a living Yoruba religious landscape, not simply a city park. Active shrines and sanctuaries share the forest with sculpture and the Osun River; the setting is part of its cultural significance.",
    planning: {"label":"Plan the grove visit around worship and conservation","detail":"The UNESCO-listed grove is on the outskirts of Osogbo, and religious rites occur throughout the year. Seek the current access route and visiting conditions from the National Commission for Museums and Monuments or authorised custodians, allow time for travel from central Osogbo, respect active worship and restrictions on photography, and do not assume festival-day arrangements or admission charges apply on ordinary days."},
  },
  "kano": {
    source: {"label":"UNESCO tentative listing — Ancient Kano City Walls and Associated Sites","href":"https://whc.unesco.org/en/tentativelists/5171/L"},
    intro: "UNESCO's tentative heritage listing connects ancient Kano's surviving city-wall sections with Dala Hill, Kurmi Market and the Emir's Palace. They are separate parts of a large historic urban landscape, not rooms within a single museum or one ticketed attraction. The nomination remains a tentative listing, not a UNESCO World Heritage inscription.",
    planning: {"label":"Check access separately for the walls, market and palace","detail":"Plan Dala Hill, the remaining gates/walls and Kurmi Market as distinct stops, allowing for urban travel between them. UNESCO's historic inventory confirms their identities but not current guided-tour access, vendor-market visiting rules, entrance fees or safe travel routes. Confirm these locally with responsible site custodians and respect restricted palace areas."},
  },
  "sukur-cultural-landscape": {
    source: {"label":"NCMM — Sukur Cultural Landscape and Hidi Palace","href":"https://museum.ng/sukur-cultural-landscape/"},
    intro: "Nigeria's National Commission for Museums and Monuments describes Sukur as a living hilltop cultural landscape in Madagali, Adamawa State, with stone-paved paths, farming terraces, iron-smelting heritage and the Hidi Palace. It is not a conventional museum compound where published office hours guarantee unrestricted entry.",
    planning: {"label":"Seek NCMM and community permission before planning hilltop access","detail":"NCMM places Sukur on the Mandara Mountains near the Cameroon border. Stone paths lead uphill and the Hidi Palace and surrounding shrines remain community heritage spaces. Confirm travel security, weather, physical access, site management and community permission before departing; heritage designation alone does not establish that visitor routes are currently safe or open."},
  },
  "abia-state-travel-guide": {
    source: {"label":"NCMM — Nigeria's national museum and monument directory","href":"https://museum.ng/museums/"},
    intro: "The National Commission for Museums and Monuments lists the National War Museum in Umuahia as a managed museum at Ugunchara Road, Amafor-Isinawu. This official listing provides a specific contactable heritage stop rather than assuming all Abia State historic sites are freely open.",
    planning: {"label":"Verify the Umuahia War Museum visit with NCMM","detail":"Use the museum's official NCMM directory listing to confirm the current Umuahia premises and visitor contact before setting out; the national museum directory is evidence of a registered site, not of today's ticket price or opening schedule. Plan Arochukwu and Umuahia as separate visits instead of assuming their heritage attractions are next door or covered by one admission."},
  },
  "erin-ijesha-waterfall": {
    source: {"label":"Punch — Erin-Ijesa waterfall infrastructure and visitor interviews (2024)","href":"https://punchng.com/erin-ijesa-waterfall-tourist-gem-in-ruins-as-neglect-persists/"},
    intro: "Erin-Ijesha Waterfall is also called Olumirin Waterfall. Punch's reporting, based on interviews with Erin-Ijesa residents and local vendors, described inadequate visitor infrastructure and locally managed entry collection. Those reported amounts and conditions were historical observations, not a reliable admission tariff or guarantee of facilities in October 2026.",
    planning: {"label":"Treat trail access and entry charges as local, date-specific facts","detail":"Erin-Ijesa is in Oriade LGA, Osun State. Arrive with time for the outdoor route, ask recognised local attendants which waterfall levels are safely accessible, and confirm today's legitimate entry and guide charges before paying. Rain and worn or steep trails can make upper sections unsafe; decline unsupported claims that every level is always accessible. Punch documented visitor complaints about facilities and access, not an independently audited current operating timetable."},
  },
  "kainji-lake-national-park": {
    source: {"label":"Premium Times — February 2026 security operation involving Kainji National Park","href":"https://www.premiumtimesng.com/regional/north-central/858132-oluyede-launches-operation-savannah-shield-to-tackle-insecurity-in-kwara.html"},
    intro: "A February 2026 report on Operation Savannah Shield quotes Nigeria's military leadership saying security forces intended to sweep Kainji National Park because of armed groups operating in nearby forested areas. This is a material travel-safety consideration: park designation and older wildlife-tour descriptions do not prove an area is safe or accepting visitors today.",
    planning: {"label":"Do not plan a wildlife safari without current safety clearance","detail":"The park spans separated Borgu and Zugurma sectors around Kainji Lake. Before arranging a trip, verify the specific sector and entrance, whether the park authority currently operates supervised visits, the actual road and escort requirements, and the security situation from relevant official sources. If a credible local park contact cannot confirm conditions, postpone rather than interpreting a map pin or an old tourism listing as clearance to travel. Do not try to enter by an unapproved track."},
  },
  "yankari-game-reserve": {
    source: {"label":"Punch — Bauchi tourism agency's May 2026 security and reserve-upgrade briefing","href":"https://punchng.com/bauchi-strengthens-security-upgrades-facilities-at-tourism-sites/"},
    intro: "In May 2026 Bauchi's tourism authorities said they had improved ranger security and visitor infrastructure at Yankari following past threats from poaching and wider regional insecurity. This is an attributed government progress claim reported by Punch, not an independent certification that every approach road, game-drive route or lodging facility is safe in October 2026.",
    planning: {"label":"Confirm guided safari routes and security directly","detail":"Bauchi State locates Yankari about 115 km southeast of Bauchi city in Alkaleri LGA. Before booking, obtain a recent confirmation from the reserve about open gates, a qualified ranger-led game drive, Wikki Warm Spring access, lodging, payment and road safety. Confirm who will guide you and what emergency support is available. A 2026 announcement of ranger improvements does not replace a current security and operating check for your travel dates."},
  },
  "enugu": {
    source: {"label":"Independent — July 2026 reporting on approved Enugu tourism infrastructure","href":"https://independent.ng/enugu-govt-approves-road-tourism-and-other-projects/"},
    intro: "Independent's July 2026 coverage describes approved tourism infrastructure, including an Okpatu–Awhum cable-car proposal, alongside further planned destination projects. Approval or construction announcements are not confirmation of a working cable car, open boardwalk or bookable visitor attraction.",
    planning: {"label":"Separate existing sites from works still under development","detail":"Make an Enugu city day distinct from trips to Ngwo Pine Forest, Awhum Waterfall and the Nsude area; their routes and visiting arrangements are not interchangeable. Check whether works affect the actual entrance, whether religious or community permission is required, and whether a guide is recommended. Independent's July 2026 report covers project approvals, not guaranteed completion or an officially published ticket for any planned cable car or new park."},
  },
  "port-harcourt": {
    source: {"label":"The Guardian — August 2026 Bonny Island tourism and infrastructure reporting","href":"https://guardian.ng/saturday-magazine/travel-a-tourism/rivers-bonny-island-bets-on-tourism-beyond-oil/"},
    intro: "The Guardian's August 2026 reporting described plans by Bonny Island stakeholders to develop tourism beyond its oil and gas economy. The coverage documents ambitions and community involvement; it does not establish that every island heritage attraction has a public schedule, reliable boat connection or tourist entry permission.",
    planning: {"label":"Do not treat Bonny Island as an automatic Port Harcourt day trip","detail":"Use Port Harcourt for urban stops first. If considering a separate Bonny visit, verify the exact passenger route, approved embarkation point, operator, life jackets, tide or weather restrictions and daylight return before reserving accommodation or paying. Check locally whether any specific island site accepts visitors; a 2026 investment summit and tourism plans are not evidence of a currently bookable package."},
  },
  "obudu-mountain-resort": {
    source: {"label":"Premium Times — July 2026 signed 25-year Obudu concession","href":"https://www.premiumtimesng.com/news/more-news/897958-cross-river-concessions-obudu-ranch-resort-for-25-years.html"},
    intro: "Premium Times' July 2026 report identifies Living Curation Real Estate Limited as the party in a newly signed 25-year Obudu concession for rehabilitation. Earlier concession arrangements and historic cable-car photos must not be treated as proof of today's operator, completed work or accommodation availability.",
    planning: {"label":"Verify the 2026 concession operator and completed facilities","detail":"The signed concession covers plans for resort redevelopment and related assets. Ask a current authorised operator for dated proof of room service, vehicle access and any operational cable car; only use a booking route confirmed by the responsible management. The July 2026 deal and August state announcements describe intended investment, not a guarantee that the entire resort is restored or ready for prepaid visits."},
  },
};
