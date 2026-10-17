import type { ExploreGuide } from "@/lib/explore";

// Independent supporting evidence reviewed on 17 October 2026 for EXISTING
// Tour Nigeria guides with only one cited perspective. Each note adds a real
// visitor decision. A historical record, tourism proposal or government address
// does NOT prove current opening, a safe road, a priced ticket, or admission.
type Evidence = {
  source: { label: string; href: string };
  context: string;
  planning: { label: string; detail: string };
  summary?: string;
};
const risks = "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks";
const advisory = "UK FCDO — Nigeria region-specific security guidance (for UK travellers)";

export const secondSourceTourDecisions20261017: Record<string, Evidence> = {
  "plateau-state-nature-guide": {
    source: { label: advisory, href: risks },
    summary: "Plateau's scenery is documented, but the UK FCDO advises against all but essential travel to Plateau State; this is a destination research guide, not a cleared nature-trip itinerary.",
    context: "Plateau's hill viewpoints and wildlife areas are not interchangeable with a verified safe leisure route. The UK FCDO's current region-by-region assessment advises against all but essential travel to Plateau State because of criminal and intercommunal violence. A named scenic landmark does not establish safe access or a staffed visitor gate.",
    planning: { label: "Make the Plateau security decision before choosing trails", detail: "Consult the UK FCDO's Plateau warning and local authorities rather than using a scenic guide as proof of safe recreational travel. Where travel is essential, confirm the specific location, legitimate access, road conditions and an informed return plan; do not promise a spontaneous hill hike." },
  },
  "ibeju-lekki-resorts-nature": {
    source: { label: "Lagos State — 2024–2044 Ibeju-Lekki Model City Plan, April 2025", href: "https://lagosstate.gov.ng/news/all/view/67fab0da5e4c9d6cec9d3ec6" },
    context: "Lagos State's 2025 Ibeju-Lekki Model City Plan identifies tourism, industry, coastal and marine development as distinct planning uses over a 2024–2044 horizon. It is a land-use plan, not a list of completed beach resorts or evidence that a particular private venue is open, accessible by every road, or free to enter.",
    planning: { label: "Confirm the precise resort and road, not just the development corridor", detail: "Ask the actual Ibeju-Lekki resort or beach operator whether its gate is open, what entry and parking cost and whether swimming is permitted. The model city plan forecasts future tourism development and cannot verify today's resort infrastructure, tide conditions or an Eleko-area road journey." },
  },
  "saminu-turaki-tower-guide": {
    source: { label: "Nigerian Heritage — Ibrahim Saminu Turaki Tower, Dutse", href: "https://nigerianheritage.ng/tour-detail.php?id=259" },
    context: "Nigerian Heritage describes Ibrahim Saminu Turaki Tower as a Dutse hilltop landmark and discusses possible reconstruction as an ICT hub. Proposed conversion or reconstruction is not evidence of an operating public ICT venue, working elevator or staffed viewpoint. Jigawa is also among states where the UK FCDO advises against all but essential travel.",
    planning: { label: "Verify tower condition and lawful entry separately", detail: "Ask a legitimate local custodian about current public access and any structural works before considering entry. Do not claim that a future ICT-hub concept is complete. If essential travel is contemplated, also consult current Jigawa regional-security guidance; do not infer safety from a tourism listing." },
  },
  "kwara-flower-garden-guide": {
    source: { label: "Nigerian Heritage — Flower Garden in Ilorin GRA", href: "https://nigerianheritage.ng/tour-detail.php?id=541" },
    context: "Nigerian Heritage places the Flower Garden in Ilorin's Government Residential Area and describes landscaped walks and community recreation. Its note that free entry occurs during festive periods must not become a promise of permanently free access, current opening hours or an event programme. UK FCDO advice is against all but essential travel to Kwara.",
    planning: { label: "Confirm the garden is accessible and the entry terms apply today", detail: "If travel is essential, consult Kwara regional-security advice and confirm the garden gate, staff, events and any current admission independently. Avoid extrapolating a festive-season free-entry claim to every date or arranging a casual long-distance leisure trip against the UK FCDO's warning." },
  },
  "ibom-tropicana-guide": {
    source: { label: "Akwa Ibom Government — inspection of Tropicana facilities and unfinished hotel", href: "https://akwaibomstate.gov.ng/governor-umo-eno-inspects-government-projects-facilities/" },
    context: "The Akwa Ibom government reported inspection of the Wet and Dry Park at the Ibom Tropicana Entertainment Centre AND a separate hotel project described as an ongoing construction project. The hotel, park, shopping or cinema components should not be combined into one guaranteed open booking.",
    planning: { label: "Confirm which Tropicana facility actually operates", detail: "Contact the particular cinema, park or accommodation operator for live admission and booking terms. Do not promise an active Tropicana Hotel, completed rooms or a single access ticket based on a government visit to the wider development site." },
  },
  "royal-niger-akassa-guide": {
    source: { label: advisory, href: risks },
    summary: "Akassa's Royal Niger Company trading-post history is significant, but UK FCDO advice is against all travel to Bayelsa's riverine areas; this is not an endorsed coastal boat itinerary.",
    context: "Akassa's nineteenth-century Royal Niger Company heritage sits in Bayelsa's coastal and estuary environment. UK FCDO advice is against all travel to riverine Bayelsa locations accessible by boat rather than road. A tourism listing about old trading buildings cannot confirm the survival, preservation, public opening or safe boat transfer of each structure.",
    planning: { label: "Separate archival Akassa history from an actual river journey", detail: "Do not advertise recreational boat transport to Akassa while the UK FCDO's riverine Bayelsa warning applies. For legitimate heritage research, first verify the exact site and preservation custodian; old trading-post photos do not establish current visitor access or safe tides." },
  },
  "abuja-national-landmarks-day": {
    source: { label: "FCT Administration — Moshood Abiola National Stadium civic history", href: "https://fcta.gov.ng/ova_por/moshood-abiola-national-stadium/" },
    context: "The FCT Administration identifies Moshood Abiola National Stadium as a sports and event venue built for the 2003 All Africa Games and renamed in 2019. It is an example of why Abuja's civic landmarks have event-specific access: stadium grounds, Eagle Square ceremonies and government precincts are not interchangeable open pedestrian parks.",
    planning: { label: "Separate publicly viewable monuments from restricted event venues", detail: "Choose daylight exterior viewpoints and verify each venue's own event calendar or security restrictions. The 2019 stadium renaming and older ceremony routes do not establish today’s tour admission, unrestricted entry or a walkable route across government compounds." },
  },
  "abuja": {
    source: { label: "Federal Capital Development Authority — Jabi Lake environmental management", href: "https://fcda.gov.ng/jabi-lake-should-be-protected-returned-to-its-original-purpose-says-fcdas-executive-secretary/" },
    context: "Abuja's urban lake areas serve more than recreation: FCDA's April 2025 report treats Jabi Lake as part of flood, erosion and water-resource management. That is a practical distinction from the city's national monuments, offices and government squares, which can have security-controlled access.",
    planning: { label: "Choose one real neighbourhood and confirm each activity", detail: "For a short Abuja break, keep Jabi waterfront and district dining together rather than linking them to a spontaneous government-precinct tour. Confirm any boat operator's authorisation and weather, and check national-landmark event restrictions independently; a city-wide attraction inventory does not supply one shared ticket." },
  },
  "enemabia-warm-spring-guide": {
    source: { label: "Benue Bureau for Arts, Culture and Tourism — Enemabia redevelopment aims, February 2026", href: "https://bact.benuestate.gov.ng/dr-ukuma-reechoes-the-bureaus-resolve-to-revive-the-tourism-sector-in-benue-through-collaborations-and-deliberate-action/" },
    context: "Benue State's culture and tourism bureau lists Enemabia Warm Spring among sites it aims to develop, along with other local water attractions. A February 2026 proposal to revamp visitor sites is not confirmation of finished pools, lifeguards, changing rooms or a functioning ticket office. UK FCDO advises against all but essential travel to Benue.",
    planning: { label: "Do not assume a staffed warm-spring resort exists", detail: "Verify the precise Enemabia location, whether any supervised bathing is allowed and what community permission applies. Benue's bureau was discussing prospective development, not certifying completion; with current UK FCDO regional warnings, do not promote an ordinary recreational road trip." },
  },
  "eggon-hills-guide": {
    source: { label: "Radio Nigeria FRCN — April 2026 Alogani/Eggon Hills cultural pilgrimage report", href: "https://radionigerianorthcentral.gov.ng/2026/04/30/headline/" },
    context: "Radio Nigeria reported an April 2026 diocesan pilgrimage to historic Alogani Hills, described as Eggon Hills, with heritage structures associated with early missionaries near Nasarawa Eggon. A pilgrimage at one recognised religious-heritage location does not establish public access to every cave, climb or rock formation in the broader Eggon hills.",
    planning: { label: "Do not confuse the pilgrimage centre with an unguided cave trail", detail: "Decide whether the purpose is a permitted Alogani heritage visit or a strenuous hill walk. Ask the relevant custodians about the exact site, access and route; a report that pilgrims visited in April 2026 does not document an unrestricted trekking programme, guides, prices or permission to enter caves." },
  },
  "ebomi-lake-guide": {
    source: { label: "Hotels.ng Places — historical independent listing of Ebomi Lake, Ipesi Akoko", href: "https://hotels.ng/places/nature/95-ebomi-lake" },
    context: "An independent destination entry locates Ebomi Lake at Ipesi Akoko in Ondo State; it describes the lake as a nature and photography destination. The listing is historical rather than a live water-quality survey or swimming, boating or ticket-authorisation notice. Cultural narratives about a 'bottomless' lake are not measurements of depth or an invitation to enter the water.",
    planning: { label: "Treat the lakeshore as a community-managed nature visit", detail: "Ask legitimate Ipesi Akoko contacts about any permitted viewpoint, access path and local custodianship. Do not assume boats, swimming, safe banks or admission from an older travel directory; visit only where local rules and present conditions permit." },
  },
};
export const secondSourceTourSlugs20261017 = Object.keys(secondSourceTourDecisions20261017);
