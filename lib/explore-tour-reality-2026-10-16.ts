import type { VerifiedVisitAddition } from "@/lib/explore-verified-visitor-updates-2026-10-15";

// Institution-backed page-specific visitor decisions; checked 16 October 2026.
// The source URLs prove identity, conservation, published event plans or travel
// advisories as stated. They cannot certify present tickets, safe entry or an
// eyewitness visit.
export const tourRealityChecks20261016: Record<string, VerifiedVisitAddition & { summary: string }> = {
  "ngwo-pine-forest-guide": {
    source: { label: "Enugu State Ministry of Works — 25 September 2026 tourism development statement", href: "https://works.enugustate.gov.ng/news/27" },
    summary: "Ngwo Pine Forest is an established natural landscape, but Enugu State is developing new adventure facilities there. The government's September 2026 report discusses a planned zipline and canopy activities, not a verified operating ride.",
    intro: "Ngwo is a real Enugu landscape destination; the proposed zipline and canopy activities are part of the state's tourism-development programme, not verified operational facilities. A separate Okpatu–Awhum cable-car concept should not be listed as a way to reach the forest.",
    planning: { label: "Separate existing forest paths from uncommissioned adventure rides", detail: "Confirm the ordinary forest entrance and construction status with the responsible operator. Treat any online 'ride the zipline' claim as unverified until there is a published opening and booking route. Ask whether paths or waterfall/cave approaches are restricted during works; do not assume completion from a forecast made before October 2026." },
  },
  "mbari-cultural-centre-guide": {
    source: { label: "NCMM — National Museum Owerri, Shell Camp contact details", href: "https://museum.ng/museums/national-museums/" },
    summary: "Mbari Cultural Centre and the federal National Museum Owerri are different cultural institutions. NCMM lists National Museum Owerri at B65 Shell Camp, off Orlu Road; the listing does not establish Mbari Centre's operator, admission or current exhibitions.",
    intro: "An official museum address cannot be repurposed into a Mbari Centre entrance or evidence that the centre is currently open. The federal Museum Owerri is a documented alternative enquiry, not an exhibition hall inside Mbari Centre.",
    planning: { label: "Confirm Mbari access independently; do not substitute a different museum", detail: "Verify Mbari's own operator and precise admission access separately from the NCMM Museum Owerri listing before going. The UK FCDO advises against all but essential travel to Imo State; a historic arts venue does not override this. If the centre is inaccessible, research Owerri's art history without promising a same-day cultural tour." },
  },
  "nafada-riverside-guide": {
    source: { label: "UK FCDO — north-eastern Nigeria and Gombe all-travel warning", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" },
    summary: "Nafada is a locality in Gombe State, not an established river resort with published boat operators or visitor facilities. UK FCDO advises against all travel to Gombe, so this page should be used for regional landscape research, not a self-guided riverside trip.",
    intro: "A Gombe State local-government listing can establish Nafada's administrative identity, but cannot establish a safe riverbank, open recreation facility or a maintained visitor trail. The UK FCDO's all-travel warning applies even if older tourism writing mentions the landscape.",
    planning: { label: "Withhold the proposed river visit under the current security warning", detail: "Do not recommend a Nafada river outing under the current advisory. No operator, verified water quality, monitored swimming point, daytime visitor gate or local rescue service was established. A reader researching river ecology should use maps and public institutional sources remotely, and review travel warnings if circumstances change." },
  },
  "national-christian-centre-abuja-guide": {
    source: { label: "UK FCDO — Abuja public gatherings, places of worship and security advice", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" },
    summary: "The National Christian Centre is a working worship venue in Abuja, not a general-access observation deck. Its accessibility for a service or an architecture visit must come from the site's custodians; UK FCDO advises extra caution in FCT public gatherings.",
    intro: "Architecture photography from an authorised external location and attending a scheduled worship service are different visit types. A city tourism directory cannot grant permission to enter restricted religious areas, climb a tower or photograph a congregation.",
    planning: { label: "Plan around actual worship access rather than a presumed tourist ticket", detail: "First check the centre's own current service/visitor instructions, entry security, dress and photography policies; do not assume a ticket, free guided tour or access outside religious functions. Monitor current Abuja security developments and avoid demonstrations and crowded approaches if conditions warrant." },
  },
  "millennium-park-abuja-guide": {
    source: { label: "UK FCDO — Abuja city security, demonstrations and travel constraints", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" },
    summary: "Millennium Park is a central Abuja green space; it is not the same institution or security zone as the National Christian Centre, National Mosque or Three Arms Zone. UK FCDO flags changing security conditions even within Abuja.",
    intro: "Visitors can compare an outdoor park outing against a prearranged indoor museum/gallery visit, but public-park identification alone does not confirm a particular gate, opening hours, park-event programme or zero-cost admission on a specific date.",
    planning: { label: "Verify the actual park entrance and keep government sites separate", detail: "Use an appropriate verified entrance, check any event-related restriction and rain/heat exposure before leaving. Do not describe embassies or sensitive government compounds as park activities. Follow FCT security guidance and do not assume that because a park is central, surrounding formal sites have identical access." },
  },
  "mungo-park-house-asaba-guide": {
    source: { label: "UK FCDO — Delta non-riverine versus riverine travel restrictions", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" },
    summary: "Mungo Park House is a historical landmark named in public Delta tourism references, but its identity does not establish a staffed public museum, working gallery or guided house tour in Asaba. The UK FCDO distinguishes advice for non-riverine Delta from riverine boat-access areas.",
    intro: "An Asaba historic building is a heritage-research destination, not the same as a ferry route or Delta's Koko national monument. A historical person associated with Niger exploration does not imply every claimed artefact is on display in the house.",
    planning: { label: "Treat a historic address as evidence of a place, not an open museum", detail: "Confirm the house's current custodian, exact access point, condition and public permission before planning entry. Do not quote a fee or promise photographs or interior exhibitions without a direct operator. FCDO advises against all but essential travel to non-riverine Delta and against all travel to riverine Delta areas; keep any river excursion separate." },
  },
  "nigeria-afrobeat-heritage-guide": {
    source: { label: "National Theatre — official 2026 events calendar", href: "https://www.nationaltheatre.gov.ng/index.php" },
    summary: "Afrobeat's music history involves Fela Kuti and Lagos's wider performing-arts culture, but a historical reference to the New Afrika Shrine is not a reservation for tonight's music. The National Theatre operates a separate, dated event calendar; it cannot validate bookings at the Shrine.",
    intro: "A Shrine concert, a National Theatre performance and studying Fela's history are three different visitor tasks. The official National Theatre website has specific October–December 2026 listings, including later events; no theatre ticket automatically grants admission to another Afrobeat venue.",
    planning: { label: "Choose a real current show; do not infer every Lagos venue shares a calendar", detail: "Select a specific performance on the appropriate venue's official programme, confirm date, actual organiser, admission method and return transport. If the artist or show cannot be verified, visit a separately confirmed heritage institution instead of inventing a live performance. Treat any expired Felabration week as past, not a current generic 'daily event'." },
  },
  "nigeria-caliphate-heritage-guide": {
    source: { label: "UK FCDO — Sokoto, Kano, Kaduna, Kebbi and Katsina state warnings", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" },
    summary: "Sokoto's caliphate history is closely connected to living emirs, historic scholarship and custodial sites, but the associated northern states have different FCDO travel-warning levels: all travel is advised against in Katsina; all but essential travel in Sokoto, Kano and Kebbi.",
    intro: "Royal-palace courtyards, mosques and shrines are active institutions. A regional heritage diagram should not be turned into a recommended cross-state road trip or interpreted as permission to enter prayer areas.",
    planning: { label: "Research connected traditions without recommending unsafe multi-state tours", detail: "Use museum collections and published scholarship for remote research where warnings apply. If conditions improve, check each palace and tomb with the specific custodian and obtain photography and public-entry rules; do not assume one itinerary, fee, daily programme or safe intercity connection covers all emirates." },
  },
  "nigeria-caves-guide": {
    source: { label: "UNESCO — Ogbunike Caves (2007 Tentative List)", href: "https://whc.unesco.org/en/tentativelists/5174" },
    summary: "Ogbunike Caves are on UNESCO's Tentative List, not Nigeria's two-site inscribed World Heritage List. UNESCO describes a historical descent of around 317 steps and an established custom of removing shoes near the reception area, but the 2007 dossier is not a present cave-opening announcement.",
    intro: "Ogbunike's sacred cave complex has a different access model and physical demand from Eggon Hills cave terrain or other rural grottoes. Historic UNESCO material documents geography and ritual context, not the safety of deep chambers, oxygen supply, flood risk or licensed guiding today.",
    planning: { label: "Separate ritual access, stair descent and tunnel safety", detail: "Choose the exact cave before travelling. For Ogbunike, ask the local custodians whether visitors may descend, what sections are permitted, and whether shoes and photography are restricted by tradition. Avoid self-guided tunnel exploration or assuming the Tentative List guarantees a staffed entrance or fixed admission price." },
  },
  "nigeria-city-parks-guide": {
    source: { label: "UK FCDO — city-specific and state-level travel risks", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" },
    summary: "A city green space in Abuja, Ibadan or Port Harcourt should be chosen by actual access and local security rather than marketed as interchangeable. FCDO advises against all but essential travel to the non-riverine parts of Rivers State and reports changing security conditions in Abuja.",
    intro: "Central urban parks are a very different undertaking from remote national parks, but a park being named on a tourist website does not mean its toilets, lights, security, entrances or events are operating today. Port Harcourt and Abuja require different practical risk checks.",
    planning: { label: "Pick by city and operating gate, not a generic national park list", detail: "Filter by city and exact site first; ask operators or authorities about admission, maintenance and public opening and do not send travellers across states merely to complete a park checklist. For a short break, prefer an accessible locally verified location and a daylight return plan where current advice allows travel." },
  },
  "nigeria-birdwatching-guide": {
    source: { label: "UNESCO — Gashaka Gumti natural heritage tentative submission (2025)", href: "https://whc.unesco.org/en/tentativelists/6918/" },
    summary: "UNESCO's September 2025 dossier identifies Gashaka Gumti as an Important Bird Area with more than 400 recorded bird species. That is an ecological inventory, not a guarantee of any species on a given day or an invitation to travel independently through Taraba/Adamawa borderlands.",
    intro: "The UNESCO nomination distinguishes northern Gumti lowlands from mountainous southern Gashaka habitats, which support different bird communities and require different access arrangements. The park remains on the Tentative List and is not an inscribed natural World Heritage site.",
    planning: { label: "Use the bird inventory for research; do not promise a park visit", detail: "Choose habitat and access constraints before making a species list. Use recognised conservation research and official park authorities, do not approach nesting sites or sensitive wildlife, and follow FCDO advisories (all travel to Adamawa; all but essential travel to Taraba). A guided park entry, accommodation and safe route have not been verified." },
  },
  "nigeria-dams-engineering-guide": {
    source: { label: "Nigeria National Park Service — Kainji Lake and park sectors", href: "https://nigeriaparkservice.gov.ng/blog/2023/11/17/nigeria-national-parks-service-brochure/" },
    summary: "Kainji Dam is critical working hydroelectric infrastructure, while Kainji Lake National Park comprises geographically separate Borgu and Zugurma sectors. A park map or nature brochure does not grant visitors access to power-station controls, dam interiors or restricted operational areas.",
    intro: "A visitor asking about hydroelectric engineering needs approved public interpretation, not a wildlife-park ticket. Dadin Kowa and Kainji are separate engineering assets in different states and cannot be presented as one hydropower tour.",
    planning: { label: "Keep hydropower plant access separate from park tourism", detail: "Ask the dam operator about any publicly authorised view or education appointment; assume restricted operations stay closed to casual entry. UK FCDO advises against all but essential travel to Niger State and all travel to Gombe State. Do not suggest unsupervised dam-top walks or cross-state sightseeing just because two facilities appear on one list." },
  },
  "nigeria-religious-heritage-guide": {
    source: { label: "UNESCO — Osun-Osogbo Sacred Grove and living worship landscape", href: "https://whc.unesco.org/en/list/1118/" },
    summary: "Osun-Osogbo Sacred Grove is an inscribed World Heritage cultural landscape used for living Yoruba worship, not a museum where every ritual shrine is always open. Nigerian mosque and church complexes are likewise active religious sites, not automatically ticketed tourist attractions.",
    intro: "Compare visitor etiquette by setting: a grove can have sacred areas governed by custodians, a mosque can restrict prayer spaces or photography, and a major church may have security checks and service-related access. A national list cannot authorise visits to each.",
    planning: { label: "Treat worship and sacred consent as the controlling visitor rules", detail: "Identify the specific site and ask responsible custodians about entry, dress, photographs, religious observance and any festival restrictions. UNESCO inscription of the grove gives historical recognition but publishes no real-time 2026 public admission tariff or access calendar." },
  },
  "nigeria-savanna-nature-guide": {
    source: { label: "UNESCO — Gashaka Gumti landforms and ecological zones (2025)", href: "https://whc.unesco.org/en/tentativelists/6918/" },
    summary: "Gashaka Gumti includes both savannah woodland and montane rainforests in a single protected area according to its 2025 UNESCO Tentative List dossier; a broad 'savanna adventure' label does not tell you which park sector or landscape a visitor would actually reach.",
    intro: "Choosing a savanna or plateau is not interchangeable with birdwatching, a safari game drive or a casual roadside viewpoint. UNESCO describes an important conservation area, but no current permit, protected trail or safe route is guaranteed by a map.",
    planning: { label: "Distinguish national-park geography from an open public viewpoint", detail: "Treat Taraba/Adamawa park travel as research under current FCDO advice (against all but essential travel to Taraba and all travel to Adamawa). For other savanna regions, independently verify the actual operator, acceptable season, wildlife route and safety; never promise sightings or a general day-entry price." },
  },
  "nigeria-historic-cities-guide": {
    source: { label: "NCMM — national museums by city and actual institution", href: "https://museum.ng/museums/national-museums/" },
    summary: "A historic city's public museums and palaces have different custodians, opening rules and collections. NCMM's current directory identifies National Museum Lagos at Onikan, National Museum Kano opposite the Emir's Palace, and National Museum Benin at Ring Road; these are not interchangeable attractions.",
    intro: "A general 'historic city' guide should not promote single museum objects from the digital catalogue as visible in every city. Historical palace and mosque settings may not admit tourists on a normal weekday.",
    planning: { label: "Choose a museum by collection and actual city address", detail: "Start from an actual interest: Benin art, Kano emirate history or Lagos museum collections. Check the matching museum's curator contact and opening separately, then evaluate the city's current security advice. Do not build an indiscriminate northern road circuit where the FCDO warns against non-essential travel." },
  },
  "nigeria-war-history-guide": {
    source: { label: "Federal Ministry of Information — Umuahia heritage restoration (15 September 2026)", href: "https://fmino.gov.ng/federal-governments-war-museum-and-ojukwu-bunker-get-major-historical-preservation-boost-in-abia/" },
    summary: "Umuahia's National War Museum and Ojukwu Bunker are distinct Civil War heritage institutions. A federal report dated 15 September 2026 described rehabilitation at approximately 80% completion; this does not establish which gallery or bunker rooms are now open.",
    intro: "Kiriji relates to nineteenth-century Yoruba conflict, while Umuahia tells part of Nigeria's twentieth-century Civil War story. The Kiriji battlefield documented near Imesi-Ile is not established as a staffed public museum by Osun's earlier site-development reporting.",
    planning: { label: "Compare two conflicts without conflating museum and battlefield access", detail: "Use the NCMM museum directory for War Museum curator contacts, and ask explicitly which exhibition rooms are open during restoration and whether bunker access is arranged separately. Do not market the Kiriji site as a completed gallery, and do not infer completed Abia restoration from a 2026 forecast. UK FCDO advises against all but essential travel to Abia." },
  },
  "nigeria-performing-arts-guide": {
    source: { label: "National Theatre — authoritative live 2026 What’s On programme", href: "https://www.nationaltheatre.gov.ng/index.php" },
    summary: "The National Theatre's official 2026 programme lists event-specific entries including an October 16 performance and later events in November and December; it does not offer one perpetual theatre show or a universal ticket for Lagos music venues.",
    intro: "A named National Theatre performance and a visit to an empty building are different reader tasks. The official event page also contains stale prior-year entries, so filtering by date is necessary before claiming a show is upcoming.",
    planning: { label: "Use the current event calendar rather than historic posters", detail: "Check the organiser's exact event page, date, hall, age conditions and booking link; on 16 October, a same-day listing is not proof seats remain available. Do not recommend a previously held 2025 event or assume ticket prices from an old flyer. Where no live programme is verified, describe the building and heritage without promising admission to a performance." },
  },
  "nigeria-river-landscapes-guide": {
    source: { label: "UK FCDO — Nigeria riverine versus inland travel advisories", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" },
    summary: "River confluences, working city waterfronts and mangrove waterways do not share a common safety profile. FCDO advises against all travel to boat-only riverine areas of Delta, Bayelsa, Rivers, Akwa Ibom and Cross River, and warns against non-essential travel in parts of the Niger Delta.",
    intro: "Lokoja's Niger–Benue confluence is a geographic landmark; Igbokoda's Ilaje waterfront is an inhabited riverine area; and Makurdi is a River Benue city. None of these names establishes a staffed river cruise, safe swimming beach or public jetty.",
    planning: { label: "Compare location and official risk categories before any boat plan", detail: "Begin with a land-based or museum interpretation where appropriate rather than inventing a bookable river trip. Verify operators, usable life jackets, tide and water conditions, legal landing points and current security advice before any boat journey; do not treat a state tourism page as safety certification." },
  },
};
