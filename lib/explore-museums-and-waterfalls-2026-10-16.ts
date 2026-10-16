import type { VerifiedVisitAddition } from "@/lib/explore-verified-visitor-updates-2026-10-15";
// Source-attributed desk research, 16 Oct 2026. No firsthand visits,
// verified live prices, licensed imagery, bookable dates or safe routes implied.
type EditorialReview = VerifiedVisitAddition & {
  summary?: string;
  additionalSources?: Array<{ label: string; href: string }>;
};
export const museumAndVisitorReviews20261016: Record<string, EditorialReview> = {
  "agbokim-waterfalls-guide": {
    summary: "Agbokim's Ikom–Etomi road was reported difficult to access in June 2026; a September road-financing agreement is not evidence that rehabilitation or current public entry is complete.",
    source: {label: "Cross River State — 9 June 2026 access-road inspection", href: "https://news.crossriverstate.gov.ng/criver-tourism-ministry-embarks-on-familiarization-tour-of-agbokim-waterfalls-alok-ikom-monoliths/"},
    additionalSources: [{"label":"CrossRiverWatch — September 2026 road rehabilitation funding discussion","href":"https://crossriverwatch.com/2026/09/progress-report-on-the-ikom-etomi-agbokim-waterfalls-road-minister-of-state-for-industry/"}],
    intro: "Cross River's tourism ministry recorded a traditional ruler's complaint about Agbokim's poor approach roads on 9 June 2026. Separate September reporting outlined a funding structure for completing the Ikom–Etomi–Agbokim road, subject to construction restarting after rain. Neither report confirms completed repairs, an authorised swimming area or today's entrance fee.",
    planning: {label: "Check roadworks and the named Agbokim entrance, not just a government promise", detail: "Ask the site's custodian or tourism authority whether roadworks, guide requirements or seasonal water flow restrict access. Request the approved approach before booking any vehicle. Ikom's carved-stone sites are separately controlled and should not be presumed included in one ticket."},
  },
  "bowers-tower-guide": {
    summary: "Bower's Tower in Ibadan is subject to phased redevelopment: Oyo's April 2026 concession allowed a rehabilitation period, not an immediate opening of new facilities.",
    source: {label: "Punch — Oyo signs Bower's Tower redevelopment concession, April 2026", href: "https://punchng.com/oyo-signs-deal-to-redevelop-bowers-tower-boost-tourism/"},
    intro: "Oyo State signed a concession with SystemSpecs Whatadeal in April 2026 to rehabilitate Bower's Tower in phases. Reporting from the signing states the company was allowed up to 24 months for rehabilitation and modernisation, with work also envisaged on access roads. A concession signature, promised future amenities or a government projection must not be presented as completed facilities or an October 2026 ticket price.",
    planning: {label: "Verify access to the original hilltop tower during redevelopment", detail: "Ask the concessionaire or Oyo tourism office whether visitors can presently reach the old lookout, whether construction changes the climb, and who collects legitimate fees. Leave the proposed café, stage and landscaped trails out of a practical itinerary until the operator announces their opening."},
  },
  "national-museum-unity-ibadan-guide": {
    source: {label: "NCMM — Ibadan National Museum station", href: "https://museum.ng/museums/national-museums/"},
    additionalSources: [{"label":"IFRA-Nigeria — June 2026 Build Your Museum pop-up","href":"https://www.ifra-nigeria.org/events-news/exhibitions-screenings/793-build-your-museum"}],
    intro: "NCMM locates the National Museum of Unity in Ibadan's Alesinloye area and publishes an individual station contact. On 3 June 2026, IFRA-Nigeria and the museum ran a participatory pop-up exhibition called Build Your Museum. That temporary programme is evidence of a completed collaboration, not that the installation will be on view in October or that an advertised future event includes ordinary museum entry.",
    planning: {label: "Ask Ibadan museum which galleries and temporary exhibitions are actually present", detail: "Contact the Alesinloye station about specific collections, accessibility, photography and fees. Do not advertise the June IFRA event as still running or assume a conference organiser's registration grants independent museum entry."},
  },
  "national-museum-ile-ife-guide": {
    source: {label: "NCMM — Ile-Ife museum official address", href: "https://museum.ng/museums/national-museums/"},
    intro: "NCMM lists National Museum Ile-Ife at Enuwa Square. This formal museum station is distinct from the Ooni's working royal palace; being in a heritage-rich neighbourhood does not grant museum visitors admission to private or ceremonial palace sections. An artefact's Ife provenance likewise does not establish that it is displayed in this particular gallery today.",
    planning: {label: "Separate Enuwa museum access from the Ooni palace", detail: "Confirm the museum's current collections, guide service, opening and photography conditions directly with NCMM. If the palace is your aim, request its custodians' permission independently rather than transferring museum operating hours or fees to the royal compound."},
  },
  "national-museum-lagos-guide": {
    source: {label: "NCMM — National Museum Lagos, Onikan", href: "https://museum.ng/museums/national-museums/"},
    additionalSources: [{"label":"NCMM — Owo terracotta object's Lagos collection location","href":"https://collection.museum.ng/owo-terracotta-bust/"}],
    intro: "NCMM places National Museum Lagos on King George V Road, Onikan. An NCMM digital collection entry for an Owo terracotta bust records Lagos as the object's collection location even though it originated at Owo. The database's location field is not proof the object is presently exhibited, and the Lagos museum is not a substitute for visiting Owo's own station.",
    planning: {label: "Check the requested object or collection at Onikan before departure", detail: "Enquire at the NCMM Lagos station whether a named object is on display, which rooms admit visitors, and what current photography or research conditions apply. Nearby Freedom Park is a separate venue with independent access rather than part of one universal Lagos Island heritage ticket."},
  },
  "benin-city-national-museum-guide": {
    source: {label: "NCMM — Benin National Museum, Ring Road", href: "https://museum.ng/museums/national-museums/"},
    intro: "NCMM lists National Museum Benin at Ring Road in Benin City. That gallery is separate from the active metalworking workshops of Igun Street and any new cultural development in Edo. A guide should identify the visitor's exact objective—viewing a currently displayed artefact, learning the bronze-casting tradition or accessing a special exhibition—instead of promising the same collection or ticket at all three.",
    planning: {label: "Confirm the Ring Road museum gallery independently of Igun Street", detail: "Contact NCMM for accessible rooms, named artefacts and current photo rules. For a bronze-casting demonstration, ask individual Igun Street artisans for an appropriate time and permission; do not infer workshop entrance rights from a national museum ticket."},
  },
  "kanta-museum-argungu-guide": {
    source: {label: "NCMM — Kanta Museum Argungu", href: "https://museum.ng/museums/national-museums/"},
    additionalSources: [{"label":"UNESCO — Argungu 2016 intangible heritage inscription","href":"https://ich.unesco.org/en/RL/argungu-international-fishing-and-cultural-festival-00901"},{"label":"UK FCDO — Kebbi regional travel advice","href":"https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks"}],
    intro: "NCMM identifies National Museum Kanta as a museum station in Argungu. UNESCO separately inscribed Argungu's fishing and cultural festival as living intangible heritage in 2016; that honour does not make the Kanta Museum itself an inscribed World Heritage monument. The February 2026 festival's conclusion is not evidence of any October event or daily museum admission.",
    planning: {label: "Keep the Argungu museum enquiry separate from the concluded festival", detail: "UK FCDO advises against all but essential travel to Kebbi. For essential travel, contact the NCMM museum station to confirm gallery access. Check any future festival programme with its organiser rather than copying February dates; no combined festival-and-museum pass was confirmed."},
  },
  "kebbi-heritage-weekend-itinerary": {
    summary: "The 2026 Argungu festival ended in February; Kebbi museum and royal heritage remain research topics, not a bookable October cultural weekend under current regional travel advice.",
    source: {label: "Sokoto State — completed 2026 Argungu finale", href: "https://sokotostate.gov.ng/argungu-fishing-finale-sokoto-governor-rewards-winners/"},
    additionalSources: [{"label":"UNESCO — Argungu intangible heritage history","href":"https://ich.unesco.org/en/RL/argungu-international-fishing-and-cultural-festival-00901"},{"label":"UK FCDO — Kebbi regional advice","href":"https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks"}],
    intro: "Sokoto State's February 15 report confirms the conclusion of Argungu's 2026 fishing festival. UNESCO's 2016 recognition protects an intangible community tradition, not a permanently bookable attraction at Matan Fada. Kanta Museum, Gwandu heritage and any Zuru-area visit have different custodians and locations; a festival headline cannot establish one combined heritage pass.",
    planning: {label: "Do not copy February festival admission into a future weekend plan", detail: "UK FCDO advises against all but essential travel to Kebbi. For essential journeys, check local security and each custodianship separately. The next festival date must come from a new organiser announcement; a finished February 2026 programme is not proof of another edition."},
  },
  "kebbi-state-travel-guide": {
    summary: "Argungu's February 2026 festival and Kanta Museum remain important Kebbi heritage references, but the festival has ended and UK FCDO advises against all but essential travel to Kebbi.",
    source: {label: "UNESCO — Argungu heritage inscription, 2016", href: "https://ich.unesco.org/en/RL/argungu-international-fishing-and-cultural-festival-00901"},
    additionalSources: [{"label":"Sokoto State — February 2026 festival finale","href":"https://sokotostate.gov.ng/argungu-fishing-finale-sokoto-governor-rewards-winners/"},{"label":"UK FCDO — Kebbi travel risks","href":"https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks"}],
    intro: "UNESCO's 2016 inscription of the Argungu international fishing and cultural festival recognises knowledge of the river, fishing, canoe events and community practices, not all of Kebbi's tourism sites as World Heritage properties. Separate official reporting confirms the 61st edition took place in February 2026, meaning it must not be advertised as an ongoing October programme.",
    planning: {label: "Distinguish Kebbi's actual stations, event dates and travel restrictions", detail: "UK FCDO advises against all but essential travel to the state. Avoid recommending an unverified Gwandu–Argungu–Zuru leisure driving circuit. The Argungu museum has an NCMM station contact; festival organisers control future dates, and the two cannot be treated as a single ticket."},
  },
  "benue-state-travel-guide": {
    summary: "Makurdi's River Benue is significant to local history, but UK FCDO advises against all but essential travel to Benue and a June 2026 boat tragedy led to an official investigation.",
    source: {label: "Guardian — NSIB investigation into June 2026 Wadata boat accident", href: "https://guardian.ng/news/benue-boat-mishap-nsib-begins-investigation-seeks-safer-waterways/"},
    additionalSources: [{"label":"UK FCDO — Benue regional violence and travel warning","href":"https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks"}],
    intro: "Reporting on 18 June 2026 described the Nigerian Safety Investigation Bureau's investigation into a serious River Benue boat accident near Makurdi's Wadata district. A riverfront view and transport boat are not certified leisure cruises; water levels, operator licensing and life-jacket availability are materially different considerations. Travel advice also cites serious intercommunal and criminal violence in Benue State.",
    planning: {label: "Do not turn River Benue sightseeing into an unsourced boat recommendation", detail: "Do not recommend a casual boat outing while the regional travel warning applies. For necessary local transport, passengers should use accountable, lawful services with appropriate safety equipment and independent current conditions; old tourism brochures, map pins or prices cannot establish water safety."},
  },
  "nigeria-museums-guide": {
    source: {label: "NCMM — national stations and galleries", href: "https://museum.ng/museums/national-museums/"},
    intro: "NCMM's official inventory identifies 53 national museum stations and outlets. Onikan in Lagos, Alesinloye in Ibadan, Enuwa Square in Ile-Ife and Kanta Museum in Argungu are separate addresses with separate curators. A nationwide museum directory does not provide universal tickets, verify an object at every station or guarantee that a planned or past special exhibition is still installed.",
    planning: {label: "Start with one exact museum and the collection you wish to see", detail: "Use the NCMM station directory to confirm a site's name, phone or email, and current exhibition, fee, gallery and photography terms. General museum opening hours are not a booked slot or proof of holiday operations. Account for region-specific safety advice before travelling outside the user's immediate city."},
  },
  "nigeria-waterfalls-guide": {
    source: {label: "Cross River State — Agbokim access roads", href: "https://news.crossriverstate.gov.ng/criver-tourism-ministry-embarks-on-familiarization-tour-of-agbokim-waterfalls-alok-ikom-monoliths/"},
    additionalSources: [{"label":"Cross River State — Kwa Falls infrastructure and safety inspection","href":"https://news.crossriverstate.gov.ng/tourism-ministry-inspects-kwa-falls-engages-traditional-rulers-in-aningeje/"}],
    intro: "Cross River's tourism ministry inspected both Agbokim and Kwa Falls in June 2026. At Agbokim a traditional ruler identified poor access roads; at Kwa Falls the official team examined infrastructure and safety. Their distinct roads, site managers and current readiness should not disappear inside one national 'best waterfalls' ranking or be replaced by unsupported uniform ticket prices.",
    planning: {label: "Ask for a named waterfall's road condition and controlled visitor area", detail: "At Agbokim confirm whether Ikom–Etomi road rehabilitation has actually been completed; financing alone cannot prove this. At Kwa Falls seek current access and safety guidance after the 2026 inspection. Neither report certifies swimming or a staffed lifeguard, and each site needs an independent trip decision."},
  },
  "nigeria-archaeology-guide": {
    source: {label: "UNESCO — Alok Ikom 2007 Tentative List", href: "https://whc.unesco.org/en/tentativelists/5173/"},
    additionalSources: [{"label":"Cross River State — 2026 inspection including Ikom stone monuments","href":"https://news.crossriverstate.gov.ng/criver-tourism-ministry-embarks-on-familiarization-tour-of-agbokim-waterfalls-alok-ikom-monoliths/"}],
    intro: "UNESCO's World Heritage Centre records the Alok Ikom carved stone monoliths as a 2007 Tentative List submission. Their stone circles, inscriptions and stylised human designs occur in dispersed Cross River communities rather than one national museum room. The 2026 tourism-ministry familiarisation tour did not convert that tentative designation into formal World Heritage inscription or authorise unlimited access to community sites.",
    planning: {label: "Separate archaeological evidence, museum collections and a custodian-approved site visit", detail: "For an Ikom-focused research trip, start with UNESCO's named community contexts and ask custodians before seeing or photographing stones. A tentative-list dossier is neither visitor access clearance nor a safe road itinerary; avoid claiming any uniform admission fee or that every carved stone is in one collection."},
  },
  "nigeria-royal-palaces-guide": {
    source: {label: "NCMM — separate museum station addresses", href: "https://museum.ng/museums/national-museums/"},
    intro: "NCMM locates National Museum Ile-Ife at Enuwa Square and National Museum Kano opposite the Emir's Palace. Those references are proof of distinct museum stations, not general authority to enter a working royal residence. Public palace exteriors, curatorial museum galleries and private ceremonial areas are controlled differently.",
    planning: {label: "Check palace etiquette independently of a neighbouring national museum", detail: "Contact an authorised palace custodian to ask which sections, visitor days, photography and ceremonies are public. Do not transfer an NCMM museum's hours or ticket price to the palace. For northern cities under specific travel advisories, avoid presenting palace tours as a safe unescorted leisure activity."},
  },
  "southwest-museum-road-trip": {
    source: {label: "NCMM — southwestern museum stations", href: "https://museum.ng/museums/national-museums/"},
    intro: "The southwestern NCMM comparison spans separate stations at Onikan in Lagos, Alesinloye in Ibadan, Enuwa Square in Ile-Ife and Olowo's Palace in Owo. Objects associated with one town may belong to collections in another, so object provenance and current display location need separate checks. The four city stops are not covered by one museum pass.",
    planning: {label: "Build a research itinerary around one specific museum response at a time", detail: "Confirm each requested display, current entry, photography and accessibility with the relevant NCMM station. Do not assume each gallery is open at the same time or that the four cities can realistically be toured in one day. Choose an independent alternative within a city if the exhibit you wanted is unavailable."},
  },
  "osogbo-ile-ife-weekend-itinerary": {
    source: {label: "NCMM — Enuwa Ile-Ife museum station", href: "https://museum.ng/museums/national-museums/"},
    additionalSources: [{"label":"UNESCO — Osun-Osogbo Sacred Grove listing","href":"https://whc.unesco.org/en/list/1118/"}],
    intro: "UNESCO's Osun-Osogbo Sacred Grove is a protected living shrine landscape near Osogbo, while NCMM's National Museum Ile-Ife sits at Enuwa Square in a separate city. Neither one's listed heritage significance confirms access to the other's galleries, royal areas or ritual activities; no combined ticket is established.",
    planning: {label: "Separate protected grove rules from Ile-Ife museum and palace admission", detail: "For Osogbo, use the approved grove trail, respect shrine and photography restrictions and do not enter river water. For Ile-Ife, confirm the museum's current exhibit and hours directly with NCMM, and contact palace custodians separately if your objective is royal history. Allow independent time blocks instead of guaranteeing a two-city tour."},
  },
};
