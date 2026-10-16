import type { VerifiedVisitAddition } from "@/lib/explore-verified-visitor-updates-2026-10-15";

// Individual October 16, 2026 desk checks against identified operators,
// NCMM's station inventory, UNESCO and independent reporting. The extra
// sources establish identity and historical context; they do NOT establish
// that a facility is admitting guests right now or that an older tariff holds.
// All visitor steps below are conditional, not claims of personal attendance.
type MoreEvidence = VerifiedVisitAddition & { additionalSources?: Array<{ label: string; href: string }> };
export const furtherVisitorDecisions20261016: Record<string, MoreEvidence> = {
  "olumo-rock-visitor-guide": {
    source: { label: "Punch — Ogun reopened the renovated rock centre on 31 July 2025", href: "https://punchng.com/dapo-abiodun-opens-newly-renovated-olumo-rock/" },
    additionalSources: [{ label: "Punch — Ogun ended Olumo free admission from 23 August 2025", href: "https://punchng.com/ogun-ends-free-entry-to-olumo-rock-august-23/" }],
    intro: "Ogun's Olumo Rock Tourist Centre reopened after its 2025 renovation, when the government announced lift upgrades, new visitor facilities and online as well as on-site ticketing. Although the July 2025 reopening announcement offered free admission until September, Ogun State subsequently ended the promotion on 23 August 2025 because of overcrowding concerns. Neither announcement establishes October 2026 admission prices. The rock's Egba history and the modern centre are related but different reasons to visit.",
    planning: { label: "Check today's Olumo ticket and lift service", detail: "Use the centre's own current booking or contact route for admission and guide terms, then verify that the lift operates before relying on it instead of the climb. Keep Itoku adire shopping as a separate, optional Abeokuta stop if rain, physical access or a sold-out session disrupts the rock visit. Neither the historic reopening promotion nor a third-party quote supplies today's exact price." },
  },
  "nike-art-gallery-lagos-guide": {
    source: { label: "Woya — independent 2026 Lekki venue listing (hours need operator confirmation)", href: "https://www.woya.me/place/nike-art-gallery-b00c0714-ce5c-4314-8793-50c57a6ff570" },
    intro: "ART X Lagos identifies Nike Art Gallery as a four-floor Lagos art space established in 2009 by Chief Nike Okundaye. Its 2026 exhibitor profile names artists including Bruce Onobrakpeya, Jimoh Buraimoh and Uche Edochie. A fair-booth exhibitor profile documents the gallery's participation, not the opening hours, availability or asking price of every artwork at its separate Lekki location.",
    planning: { label: "Separate gallery browsing from an exhibition or workshop booking", detail: "If seeing the permanent display is the goal, ask the Lekki gallery for that day's visitor rules; if you want a named artist, school group or textile demonstration, enquire whether that experience is actually scheduled. The ART X exhibitor page is not admission to an art fair, a private tour or a guarantee that works pictured there remain for sale." },
  },
  "owo-museum-guide": {
    source: { label: "NCMM — National Museum Owo official station listing", href: "https://museum.ng/museums/national-museums/" },
    additionalSources: [{ label: "NCMM collection — Owo terracotta bust, current location National Museum Lagos", href: "https://collection.museum.ng/owo-terracotta-bust/" }],
    intro: "The National Commission for Museums and Monuments lists National Museum Owo at Olowo's Palace in Owo. This is a distinct institutional address, not an annex of the National Museum Akure or the National Museum Lagos. NCMM's digital collection includes fifteenth-century Owo terracotta recovered around Igbo 'Laja; its entry records the example's current location as National Museum Lagos, so readers must not assume every published Owo object is physically exhibited in Owo.",
    planning: { label: "Confirm the Owo gallery, not just an object of Owo provenance", detail: "Ask NCMM's Owo station whether it is receiving visitors and which galleries or guided explanations are available on your date. If researching a particular terracotta, check the item's current collection location before travelling; the online Owo provenance is not proof of display at Olowo's Palace. The museum's general published hours are not a site-specific reservation or confirmed admission fee." },
  },
  "slave-history-museum-calabar-guide": {
    source: { label: "NCMM — national museum stations and Slave History Museum Calabar", href: "https://museum.ng/national-museums-list/" },
    intro: "NCMM's national museum inventory identifies the Slave History Museum in Calabar in the Marina Resort area, separately from the city's older colonial buildings and Carnival venues. The museum's subject is the history of enslavement and forced Atlantic migration; its Marina location is not proof that a pleasure cruise, waterfront attraction or historical reenactment is part of a museum ticket.",
    planning: { label: "Confirm Calabar's museum entrance and current gallery access", detail: "Contact the responsible museum station or Marina site management about current entry, age suitability, gallery access and whether a guided historical interpretation is offered. Allow time to read the interpretation respectfully and do not photograph people or sensitive displays without permission. NCMM's museum directory does not publish an October 2026 Calabar-specific fee or promise that all adjacent resort facilities are operating." },
  },
  "national-war-museum-umuahia-guide": {
    source: { label: "NCMM — National War Museum Umuahia station and contact", href: "https://museum.ng/museums/national-museums/" },
    additionalSources: [{ label: "UK FCDO — Abia regional travel advice", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" }],
    intro: "NCMM locates the National War Museum on the Ugwunchara/Isingwu side of Umuahia, not at a generic city-centre landmark. Its war-history exhibits and the separate Ojukwu Bunker may be affected differently by the 2026 federal preservation work already cited on this page; a restoration announcement must not be interpreted as a declaration that both have fully reopened.",
    planning: { label: "Check two access decisions and the Abia security warning", detail: "Confirm the War Museum's exact approach, exhibition access and any renovation restrictions with NCMM, then ask independently whether the Ojukwu Bunker accepts visitors. Do not promise the bunker is included in one ticket. The UK FCDO currently advises against all but essential travel to Abia State; this history reference should not be treated as approval of a recreational drive." },
  },
  "gidan-makama-museum-guide": {
    source: { label: "NCMM — Gidan Makama/National Museum Kano address", href: "https://museum.ng/national-museums-list/" },
    additionalSources: [{ label: "UK FCDO — Kano regional travel advice", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" }],
    intro: "NCMM's station list identifies Gidan Makama Museum opposite the Emir's Palace in old Kano. That makes it a different visitor task from Dala Hill's exterior viewpoint, the working Kurmi market and palace interiors whose access is controlled separately. The official listing verifies the museum's heritage identity and address; it does not confirm a currently open gallery or an unescorted palace tour.",
    planning: { label: "Do not package Gidan Makama into an automatic Kano walking circuit", detail: "The UK FCDO advises against all but essential travel to Kano. Preserve the museum as historical research and ask NCMM or local custodians about access only if travel is essential and appropriately risk-assessed. Do not infer admission to the Emir's Palace, a guide, photography rights, the museum's current fee or a safe walking route from the station's location." },
  },
  "southwest-museum-road-trip": {
    source: { label: "NCMM — official national museum stations, addresses and contacts", href: "https://museum.ng/national-museums-list/" },
    intro: "NCMM's national inventory separates National Museum Lagos at Onikan, the Museum of National Unity in Ibadan, National Museum Ile-Ife at Enuwa Square and National Museum Owo at Olowo's Palace. These are four independent institutions in different cities, not rooms covered by one admission pass. The trip's value is to compare distinct national collections and local heritage rather than assume a uniform exhibit or fee at each stop.",
    planning: { label: "Choose one city per museum block and verify each station", detail: "Start with the NCMM station addresses, then decide independently whether Lagos, Ibadan, Ile-Ife and Owo justify four separate visits; do not imply an all-in-one day trip or guaranteed access to every gallery. Confirm today's opening, collection restrictions, photography and fees with each museum. If one gallery is closed, retain that city's other verified public heritage options instead of inventing a substitute exhibit." },
  },
  "osun-heritage-road-trip": {
    source: { label: "UNESCO — 2026 Osun-Osogbo conservation decision", href: "https://whc.unesco.org/en/decisions/9099" },
    intro: "UNESCO's 2026 World Heritage Committee decision asks Nigeria to keep testing the Osun River for pollutants and to improve conservation planning around the Sacred Grove. This is a living ritual landscape, not a bathing spot automatically certified safe by World Heritage status. Osogbo's grove, Ile-Ife's museum and royal sites, and the Kiriji history around Imesi-Ile are separate heritage questions with different custodians and access rules.",
    planning: { label: "Treat the Osogbo grove as a protected, living site", detail: "For the Osogbo portion, request the current authorised visitor trail and comply with shrine and photography restrictions. Do not recommend entering or drinking river water: UNESCO has specifically requested regular pollution testing and safe-use measures. Set aside separate days or travel blocks for Ile-Ife and Ilesa-area history, and establish current museum or monument access before committing to each drive." },
  },
  "lagos-island-heritage-day": {
    source: { label: "NCMM — National Museum Lagos official contact and location", href: "https://museum.ng/museums/national-museums/" },
    intro: "The national museum's official station is on King George V Road, Onikan. Freedom Park and Tafawa Balewa Square are distinct Lagos Island heritage settings; a museum opening time does not establish access to a park programme or any special event in either place. Keeping the stops separate lets readers choose between formal collections, public memory and a current performance rather than treating every stop as the same admission experience.",
    planning: { label: "Verify the Onikan museum and every additional venue separately", detail: "Check the National Museum Lagos directly for its current gallery hours, photography rules and fee before leaving for Onikan. Choose Freedom Park or a published event as a second stop only after checking that venue's own calendar. Traffic, daylight and pedestrian security determine whether a short Lagos Island route is realistic; the UK FCDO warns about street crime and walking at night." },
  },
  "ogbunike-caves-guide": {
    source: { label: "UNESCO — 2007 Ogbunike Caves tentative-list dossier", href: "https://whc.unesco.org/en/tentativelists/5174/" },
    additionalSources: [
      { label: "Anambra culture ministry — Ogbunike and Owerre-Ezukala tourism partnership, 22 July 2026", href: "https://mocet.anambrastate.gov.ng/news/anambra-strengthens-tourism-partnership-with-nigerian-tourism-developm" },
      { label: "UK FCDO — current Anambra regional travel warning", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" },
    ],
    intro: "UNESCO's 2007 tentative-list account describes approximately 317 steps down to Ogbunike's wooded cave valley, traditionally barefoot at the reception point. That is a historical conservation and ritual description, not a 2026 staircase inspection, admission instruction or evidence of UNESCO World Heritage inscription. Anambra's July 2026 announcement confirms a tourism-development partnership, not that new walkways or professionally supervised cave routes are already operating.",
    planning: { label: "Separate UNESCO's cultural account from today's actual entrance", detail: "Before considering travel, seek direct confirmation of visitor permission, stair condition, footwear customs and whether cave tunnels are restricted. Avoid combining Ogbunike and Owerre-Ezukala as interchangeable nearby cave entrances; they are different sites. The UK FCDO advises against all but essential travel to Anambra, so this page is heritage research rather than a recommended recreational cave excursion." },
  },
  "awhum-waterfall-guide": {
    source: { label: "Enugu Ministry of Works — 25 September 2026 tourism-development update", href: "https://works.enugustate.gov.ng/news/27" },
    additionalSources: [{ label: "Enugu State — May 2025 announcement of proposed tourism facilities", href: "https://enugustate.gov.ng/2025/05/12/enugu-air-cng-buses-transport-terminals-take-off-in-may/" }],
    intro: "Enugu's 25 September 2026 government update describes an eco-tourism development programme at Awhum Waterfall, including proposed improved walkways, recreation areas and hospitality facilities. A separate project is proposed at Okpatu Hill, including a future cable-car connection to the Awhum corridor. Neither announcement verifies that a cable car, new boardwalk or resort ticket can be used today; construction may affect the traditional route.",
    planning: { label: "Ask whether construction blocks the existing Awhum approach", detail: "Distinguish the waterfall's traditional access through local custodians from the planned new resort. Obtain current operator or custodian confirmation of the entrance, any restricted construction area and weather conditions before scheduling a visit. Do not put a cable-car ride or paid resort stay into an itinerary until the operator independently confirms commencement, prices and tickets." },
  },
  "owerre-ezukala-cave-waterfall-guide": {
    source: { label: "Anambra Ministry of Culture — July 2026 tourism partnership", href: "https://mocet.anambrastate.gov.ng/news/anambra-strengthens-tourism-partnership-with-nigerian-tourism-developm" },
    additionalSources: [{ label: "UK FCDO — Anambra regional travel warning", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" }],
    intro: "Anambra's culture ministry explicitly names Owerre-Ezukala Cave and Waterfall as one of the sites to be promoted in its July 2026 partnership with the national tourism authority. A partnership statement does not verify completed stairways, a monitored cave interior, a ticket office or suitable conditions to enter water. Owerre-Ezukala and Ogbunike have different local approaches and should not be presented as parts of one cave complex.",
    planning: { label: "Treat proposed tourism development as unverified public access", detail: "Ask the relevant site custodian for the currently lawful approach, permission and any closed cave or waterfall areas. No verified guided-tour timetable, safe bathing assessment or October fee was published by the ministry. The UK FCDO advises against all but essential travel to Anambra, so do not market an informal cave-and-waterfall trip as a safe leisure route." },
  },
  "okomu-national-park-guide": {
    source: { label: "Nigeria National Park Service — Okomu ecology and establishment", href: "https://nigeriaparkservice.gov.ng/blog/2014/08/12/okomu-national-park/" },
    additionalSources: [{ label: "Nigeria National Park Service — park office enquiry channel", href: "https://nigeriaparkservice.gov.ng/contact-us/" }],
    intro: "Nigeria's National Park Service documents Okomu's evolution from forest reserve to protected wildlife sanctuary and finally national park in 1999. Its account identifies conservation of the white-throated guenon as a reason for protecting the Edo rainforest. The park's ecological history does not establish that any old treehouse, lodge, watchtower or special wildlife encounter is bookable in October 2026.",
    planning: { label: "Ask Okomu staff which visitor facilities actually operate", detail: "Contact the park's published management channel about the Udo-side arrival point, ranger escort, current trail restrictions, any visitor accommodation and authorised photography. Verify costs with the current operator and allow a separate forest block rather than assuming a casual same-day detour from Benin City. Do not present a rare primate sighting or a historical visitor facility as guaranteed." },
  },
  "cross-river-national-park-guide": {
    source: { label: "Nigeria National Park Service — Oban and Okwangwo divisions", href: "https://nigeriaparkservice.gov.ng/blog/2014/08/12/cross-river-national-park/" },
    additionalSources: [
      { label: "UNESCO — CRIKOT 2020 tentative-list proposal, not an inscribed World Heritage Site", href: "https://whc.unesco.org/en/tentativelists/6204/" },
      { label: "UK FCDO — Cross River riverine security warnings", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" },
    ],
    intro: "The National Park Service separates Cross River National Park into the non-contiguous Oban and Okwangwo divisions; UNESCO's CRIKOT proposal further distinguishes associated community forests and Cameroonian parks. The CRIKOT record is a 2020 World Heritage Tentative List entry, not an inscription or a combined tourist admission ticket. An Oban permit should never be assumed to cover access to Okwangwo or protected land in Cameroon.",
    planning: { label: "Verify the named division and park-authorised entry", detail: "Choose one of Oban or Okwangwo, contact its ranger administration and ask for legal access, approved guide, route and fee, then independently assess local security. Check border restrictions separately; the UNESCO map is not a public crossing permit. UK FCDO guidance warns against all travel to Cross River's boat-only riverine areas, but that does not mean a specific inland park route is approved or safe." },
  },
  "jos-wildlife-park-guide": {
    source: { label: "VisitPlateau — park description and visitor safety rules", href: "https://visitplateau.com/destinations/jos-wildlife-park" },
    additionalSources: [{ label: "UK FCDO — Plateau State regional risks", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" }],
    intro: "The VisitPlateau listing advertises opening hours, adult and child admission categories, and an estimated drive from Jos. These are a destination directory's published figures rather than a verified same-day transaction, staffing report or guarantee that every enclosure is accessible. The listing expressly tells visitors to remain on marked paths and not feed wildlife.",
    planning: { label: "Do not let a directory tariff override current security advice", detail: "Any essential traveller should confirm directly with park management whether the property and specific routes are operational, the current fee and whether a guide is required; do not reuse an older directory price without confirmation. The UK FCDO advises against all but essential travel to Plateau State, so this guide should not promote an optional family leisure visit as currently recommended." },
  },
  "assop-falls-guide": {
    source: { label: "VisitPlateau — Assop Falls location and water safety", href: "https://visitplateau.com/destinations/assop-falls" },
    additionalSources: [{ label: "UK FCDO — Plateau State regional risks", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" }],
    intro: "VisitPlateau identifies Assop Falls on the Jos–Abuja corridor near Assop junction and explicitly warns that wet rocks are slippery and the pool is not for swimming. The directory displays an entry amount and a drive estimate, but neither is current ticket-office confirmation or guaranteed travel time. The site is a waterfall-viewing location, not a certified bathing facility.",
    planning: { label: "Do not recommend the road stop without addressing Plateau travel warnings", detail: "The UK FCDO advises against all but essential travel to Plateau State. Treat Assop as geographic research while this warning applies. If travel is essential, confirm the exact accessible viewing area and local conditions with responsible contacts; do not suggest parking at an unverified highway turn-off, entering the pool or assuming a directory fee is today's charge." },
  },
  "arinta-waterfalls-guide": {
    source: { label: "Ekiti Bureau of Tourism — Arinta as a distinct official nature attraction", href: "https://www.ekitistate.gov.ng/bureau-of-tourism-development" },
    intro: "Ekiti's tourism bureau distinguishes Arinta Waterfalls from Ikogosi Warm Springs and Abanijorin Rock; these are separate attractions, even when travellers encounter them on one regional nature itinerary. The government page is evidence of the destination's identity, not that a single resort booking includes all three or that a waterfall safety attendant is on duty.",
    planning: { label: "Choose the waterfall only with a confirmed Ipole-Iloro approach", detail: "If Arinta rather than a resort visit is your goal, find a current local contact for the actual Ipole-Iloro access point and confirm permitted areas, rain conditions and any guide or entrance arrangements. Keep Ikogosi as an alternative, not a combined-ticket entitlement. No price, staffed swimming area or October 2026 opening time was independently confirmed by the bureau." },
  },
  "nike-art-centre-osogbo-guide": {
    source: { label: "Ogun State — Nike Art Centre's Osogbo origin in 1983", href: "https://invest.ogunstate.gov.ng/blogdetails?id=7" },
    additionalSources: [{ label: "ART X Lagos — Nike Art Gallery's historical Osogbo branch reference", href: "https://www.artxlagos.com/exhibitors/nike-art-gallery-2022" }],
    intro: "Ogun State's April 2025 report describes Nike Okundaye's Osogbo art centre as dating from 1983, whereas ART X's gallery description refers separately to Nike Art Gallery's Lagos flagship and other Nigerian locations. The Ogun announcement proposes a different Nike-branded gallery at Olumo Rock in Abeokuta; it must not be mistaken for a 2026 Osogbo workshop timetable or proof that an Olumo exhibition project is complete.",
    planning: { label: "Verify the specific Osogbo art centre and programme", detail: "For Osogbo, contact the centre itself about public collection access, textile instruction, demonstrations and permissions; do not book an Abeokuta Olumo attraction on the assumption that it covers Osogbo. Treat claims about the size of the collection or past trainees as historical reports, not a current invitation to join classes or a quoted workshop fee." },
  },
  "itoku-adire-market-guide": {
    source: { label: "Channels Television — Itoku maker and authenticity report", href: "https://www.channelstv.com/2023/03/17/inside-itoku-adire-market-culture-fashion-and-a-modern-challenge-community-report/" },
    additionalSources: [{ label: "Ogun State — 2025 Nike/Adire collaboration plans", href: "https://invest.ogunstate.gov.ng/blogdetails?id=7" }],
    intro: "Channels Television's market reporting describes Itoku's adire trade and local sellers' concerns about inferior mass-produced imitations. For a shopper that changes the task from 'buy any patterned fabric' to asking how a seller distinguishes hand-resist-dyed work, machine prints and other fabric techniques. Ogun's 2025 collaboration announcement concerns a proposed separate gallery at Olumo, not proof that every Itoku stall is part of a government-certified visitor tour.",
    planning: { label: "Ask fabric-specific questions before paying", detail: "Ask whether the cloth is actually hand-patterned, the technique and whether colourfastness or laundering guidance is supplied; inspect edges and pattern variation rather than accepting 'original adire' as an automatic guarantee. Agree a price and return terms with the specific trader before payment, and ask permission before recording workshops. No official fixed marketwide admission fee or universal certification was established." },
  },
  "alake-palace-abeokuta-guide": {
    source: { label: "Egba Museum — museum/library located in the Ake Palace complex", href: "https://egbamuseum.org/" },
    additionalSources: [{ label: "Guardian — 4 September 2026 opening of a distinct Adire Hub at Ake Palace", href: "https://guardian.ng/news/alake-opens-adire-hub-seeks-global-market-for-egba-textile/" }],
    intro: "The Egba Museum's own description places its museum library in the working Ake Palace complex. A September 2026 report separately documents the opening of an Adire Hub there for textile production, training and financing. These are different functions within a living royal institution: a new hub or a museum's presence is not evidence that palace apartments, ceremonies or every library collection are open to the public.",
    planning: { label: "Decide whether you need royal history, museum research or Adire training", detail: "Ask the Egba Museum/Palace office which of those three activities is available to visitors and whether an appointment, credentials or fees apply. Respect photography and traditional-custodian boundaries. Do not present the Adire Hub opening as a daily public palace tour or promise that its courses accept walk-in registrations." },
  },
  "gorgaram-festival-guide": {
    source: { label: "UK FCDO — Yobe travel restriction and regional security", href: "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks" },
    intro: "The existing Yobe tourism directory describes the Gorgaram fishing and cultural tradition, but it is not an organiser notice establishing a dated 2026 programme. A reference to Jakusko's fishing heritage must not be presented as a ticketed event, an annual date guarantee or a public swimming/fishing safety assessment. The UK FCDO advises against all travel to Yobe State.",
    planning: { label: "Do not market a Gorgaram festival trip without a current event and risk clearance", detail: "Retain the page as cultural and geographical research. Do not list a live festival ticket, recommended transport from Damaturu or public gathering without a dated organiser programme and independent safety verification. A third-party booking link or historical festival description is not evidence that an edition is proceeding now." },
  },

};
