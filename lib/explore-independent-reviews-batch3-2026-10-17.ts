import type { ExploreGuide } from "@/lib/explore";

/**
 * Source-backed corrections for existing canonical heritage and nature guides,
 * 17 October 2026. This is not a museum opening-hours or security certification.
 * NCMM's directory documents institutions and addresses; UNESCO establishes
 * heritage classifications, not public access, ticket prices, or tour permits.
 */
type IndependentDecision = {
  source: { label: string; href: string };
  context: string;
  decision: { label: string; detail: string };
};
const museums = "https://museum.ng/museums/national-museums/";
const museumList = "https://museum.ng/national-museums-list/";
const sukur = "https://whc.unesco.org/en/list/938";
const idanre = "https://whc.unesco.org/en/tentativelists/5169/";
const crikot = "https://whc.unesco.org/en/tentativelists/6204/";
const gashaka = "https://whc.unesco.org/en/tentativelists/6918/";

export const furtherIndependentVisitorEvidence20261017: Record<string, IndependentDecision> = {
  "adamawa-museums-heritage-route": {
    source: { label: "UNESCO — Sukur Cultural Landscape (World Heritage property)", href: sukur },
    context: "UNESCO lists Sukur Cultural Landscape as an inscribed cultural property (1999), but that listing is different from a notice that the Madagali-area Sukur Interpretation Centre is open to visitors. Yola and Hong museum addresses are documented by NCMM; none establish safe onward travel.",
    decision: { label: "Do not infer a Sukur tour from World Heritage status", detail: "Use the UNESCO page to understand Sukur's hilltop palace, settlements and terraced landscape. Plan the Yola museum visits separately; only consider the remote Sukur leg after current official security advice, local permission and interpretation-centre access are verified. World Heritage inscription is not a booking." },
  },
  "jos-weekend-itinerary": {
    source: { label: "NCMM — National Museum Jos and Zoological Garden", href: museumList },
    context: "The federal museum authority lists National Museum Jos and the Zoological Garden opposite it as distinct facilities. A weekend itinerary should not treat the zoo, museum and Jos Wildlife Park as the same admission or the same experience.",
    decision: { label: "Choose one verified wildlife visit", detail: "If the museum is the first-day anchor, confirm its gallery admission directly. For day two, decide whether you mean Jos Zoological Garden opposite the museum or Jos Wildlife Park elsewhere: ask the relevant operator about actual opening, welfare and access; do not assume a single ticket covers both." },
  },
  "ibadan-weekend-itinerary": {
    source: { label: "NCMM — National Museum of Unity Ibadan", href: museumList },
    context: "NCMM locates the National Museum of Unity in the Alesinloye area. This is not Bower's Tower or Mapo Hall, so visitors who want the museum need a deliberate separate city journey.",
    decision: { label: "Do not put the museum at the old-city viewpoint", detail: "Choose a museum slot in Alesinloye after checking that the gallery is receiving visitors. Put Bower's Tower and old Ibadan's civic landmarks into a different route cluster and allow traffic margin between them; no federal directory provides today's museum admission fee." },
  },
  "uyo-weekend-itinerary": {
    source: { label: "NCMM — National Museum Uyo identity and location", href: museums },
    context: "The federal National Museum Uyo is listed at Ring Road II, Aka Offot, behind Ibom Hall. The separately advertised Ibom Unity Museum is not demonstrated by that listing to be the same building, programme or collection.",
    decision: { label: "Name the exact Uyo museum before travelling", detail: "The itinerary mentions Ibom Unity Museum; ask for that museum's verified address and admission rather than directing a driver to National Museum Uyo by default. The federal institution's NCMM entry is an alternative identity to check, not proof that both names share tickets or exhibitions." },
  },
  "ondo-nature-weekend-itinerary": {
    source: { label: "UNESCO — Oke Idanre cultural landscape, Tentative List 2007", href: idanre },
    context: "UNESCO's Oke Idanre record describes a historic hill settlement with cultural features beyond a viewpoint. It remains a Tentative List entry, not an inscribed World Heritage site or a source of current admission rules.",
    decision: { label: "Budget time for Idanre's cultural route", detail: "For the first day, plan footwear and daylight for both the climb and the historic settlement areas; confirm whether a local guide is required and which sections are currently accessible. Keep the forest or coast options for a separate day rather than relying on an old UNESCO nomination for today's visitor access." },
  },
  "edo-heritage-nature-itinerary": {
    source: { label: "NCMM — National Museum Benin, Ring Road", href: museums },
    context: "NCMM locates National Museum Benin on Ring Road; that independently verifies the museum itinerary anchor but says nothing about access to Igun bronze-casting workshops or the operating status of Okomu National Park.",
    decision: { label: "Verify three different kinds of access", detail: "Confirm the Ring Road museum's current gallery arrangements, ask Igun artisans about visiting and photography, and separately obtain current Okomu park access and ranger guidance before planning the forest day. A museum address cannot be used to infer national-park security or opening." },
  },
  "ogun-heritage-day": {
    source: { label: "NCMM — National Museum Abeokuta, Idi-Aba", href: museums },
    context: "NCMM locates National Museum Abeokuta inside Baptist Girls College at Idi-Aba. It is not the same place as Olumo Rock, Itoku Market, the Alake's Palace or Centenary Hall, so the wider city's cultural collection is an optional extra rather than a fifth stop on one short walking loop.",
    decision: { label: "Do not overpack the Olumo–Itoku–Ake circuit", detail: "Use daylight for Olumo's hill route and keep market and palace-area stops together. If you want National Museum Abeokuta as well, verify museum admission and permission at the college compound first, and allow a separate drive to Idi-Aba instead of promising all stops are next door." },
  },
  "birnin-kudu-heritage-guide": {
    source: { label: "NCMM — Rock Art Interpretive Centre, Birnin Kudu", href: museumList },
    context: "The NCMM list names a Rock Art Interpretive Centre along the Kano–Bauchi Road in Birnin Kudu, giving visitors a specific federal heritage institution to enquire about rather than an unspecified rock-art viewpoint.",
    decision: { label: "Ask about the interpretive centre and rock-art access separately", detail: "Before a Jigawa road trip, contact the centre about its actual exhibition and guide arrangements. Rock paintings or protected shelters may have different permissions from entering a museum building; do not approach rock faces or heritage surfaces without local authorisation." },
  },
  "dutse-rock-city-guide": {
    source: { label: "NCMM — Rock Art Interpretive Centre at Birnin Kudu", href: museumList },
    context: "The national museum directory puts the Jigawa rock-art interpretation facility in Birnin Kudu on the Kano–Bauchi Road, not in central Dutse. The difference matters when pairing Dutse's urban rocky landscape with an archaeology-focused side journey.",
    decision: { label: "Treat Birnin Kudu as an out-of-town heritage extension", detail: "Spend a short Dutse day around confirmed city viewpoints, and only add the Birnin Kudu interpretive centre after checking the road, actual museum access and a daylight return. A Dutse hill photograph is not itself evidence that visitors can reach protected rock paintings." },
  },
  "ooni-palace-ile-ife-guide": {
    source: { label: "NCMM — National Museum Ile-Ife at Enuwa Square", href: museums },
    context: "NCMM's National Museum Ile-Ife address is Enuwa Square. It is a public heritage institution to enquire about, while the Ooni's Palace is an active royal compound with its own permissions and ceremonial restrictions.",
    decision: { label: "Separate museum access from palace access", detail: "Confirm current access to the Enuwa Square museum if art and archaeology are your aim. For the palace, do not rely on museum opening as permission to enter any courtyard, ceremony or private space; request authorised guidance and respect photography rules." },
  },
  "imo-state-travel-guide": {
    source: { label: "NCMM — National Museum Owerri, off Orlu Road", href: museums },
    context: "The national museum authority lists National Museum Owerri at B65 Shell Camp, off Orlu Road. This is a separate cultural stop from the Mbari arts tradition and Oguta Lake, which require their own plans.",
    decision: { label: "Build different days for Owerri culture and Oguta water", detail: "Use an Owerri day for a museum visit only after confirming current admissions, and research Mbari access separately. If Oguta Lake is the trip anchor, arrange its transport and any water activities directly with legitimate local operators rather than assuming an urban museum listing covers lake facilities." },
  },
  "sultans-palace-sokoto-guide": {
    source: { label: "NCMM — National Museum Sokoto, Federal Secretariat", href: museums },
    context: "The federal museum registry identifies National Museum Sokoto within the Federal Secretariat Complex. That is an institutional heritage stop distinct from the Sultan's Palace and its living religious and traditional administration.",
    decision: { label: "Do not mistake a museum address for palace permission", detail: "Ask the federal museum about entry into its secretariat-complex premises before arranging a historical visit. Treat the Sultan's Palace vicinity as a separate public-boundary and etiquette question; seek current local access and security guidance, especially for religious or ceremonial periods." },
  },
  "emirs-palace-katsina-guide": {
    source: { label: "NCMM — National Museum Katsina, Kofa Uku", href: museums },
    context: "NCMM lists National Museum Katsina at Kofa Uku along Mohamadu Dikko Road. The museum location is not the Katsina Emir's Palace, and institutional museum entry does not grant access to royal rooms or courtyards.",
    decision: { label: "Visit the museum without implying royal access", detail: "For a non-ceremonial heritage stop, enquire about National Museum Katsina on Mohamadu Dikko Road. If the palace area is the purpose, ask locally where visitors are permitted and whether photography is allowed; confirm current travel-security conditions before proceeding." },
  },
  "sokoto-history-bureau-guide": {
    source: { label: "NCMM — federal National Museum Sokoto", href: museums },
    context: "The Sokoto State History Bureau's archival and research remit should not be confused with the federal National Museum Sokoto, which NCMM lists at the Federal Secretariat Complex. These are distinct kinds of institutions, not interchangeable visiting hours.",
    decision: { label: "Choose archive research or museum interpretation", detail: "Contact the History Bureau in advance about document consultation, research permissions and whether members of the public can visit. If a gallery visit is preferred, separately check the federal museum's availability and entrance into the secretariat; do not presume records held at the bureau are on public display there." },
  },
  "gobarau-minaret-katsina-guide": {
    source: { label: "NCMM — National Museum Katsina", href: museums },
    context: "NCMM locates National Museum Katsina at Kofa Uku, Mohamadu Dikko Road. The old-city Gobarau Minaret is a religious and historic landmark rather than an exhibition in that museum.",
    decision: { label: "Plan the minaret and museum as separate heritage stops", detail: "Respect prayer times and ask locally whether visitors may enter or photograph the minaret area; do not assume climbing is allowed. A museum visit requires its own admission check at Kofa Uku. Confirm current local security advice before combining old-city walking with other landmarks." },
  },
  "akwa-ibom-arts-culture-centre-guide": {
    source: { label: "NCMM — National Museum Uyo, Ring Road II", href: museums },
    context: "Uyo's State Centre for Arts and Culture is programme-led, while NCMM locates the federal National Museum Uyo at Ring Road II behind Ibom Hall. A scheduled cultural performance and a permanent museum collection are different visitor experiences.",
    decision: { label: "Check the performance schedule before choosing a cultural outing", detail: "Ask the State Centre about actual events, admission and public opening on your chosen day. If nothing is scheduled, consider contacting National Museum Uyo about its current gallery instead; the NCMM location is not an event calendar or evidence that any specific show is running." },
  },
  "afi-mountain-wildlife-guide": {
    source: { label: "UNESCO — Cross River–Korup–Takamanda park complex Tentative List", href: crikot },
    context: "UNESCO's Cross River–Korup–Takamanda proposal explicitly includes Afi Mountain Wildlife Sanctuary within Nigeria's Okwangwo cluster; it records the reserve's conservation importance, not a general public tourism concession.",
    decision: { label: "Prioritise conservation permission over a casual wildlife tour", detail: "UNESCO identifies sensitive habitat for Cross River gorillas, drills and Nigeria–Cameroon chimpanzees. Do not promise wildlife sightings or independent walking access. Arrange any lawful visit with the responsible conservation authority, obey area restrictions and confirm road/security conditions before leaving a town base." },
  },
  "gashaka-gumti-serti-guide": {
    source: { label: "UNESCO — Gashaka Gumti National Park Tentative List, September 2025", href: gashaka },
    context: "UNESCO's 2025 submission locates Gashaka Gumti National Park across Taraba and Adamawa and describes a large, varied protected landscape. Tentative List status does not mean it is inscribed on the World Heritage List or open for unescorted visits from Serti.",
    decision: { label: "Secure the park's actual entry process from Serti", detail: "Ask the Nigerian National Park Service for the appropriate entry point, ranger arrangements, current activity restrictions and route safety. The UNESCO record documents biodiversity but is not a booking platform; avoid promising a hike to Gangriwal or wildlife sightings without direct official permission." },
  },
  "nigeria-cultural-landscapes-guide": {
    source: { label: "NCMM — Sukur Interpretation Centre and museum network", href: museumList },
    context: "NCMM's museum list identifies an Interpretation Centre for Sukur on the Mubi–Maiduguri Road in Adamawa. This adds a concrete museum-administration perspective to UNESCO's cultural-landscape classification; it is not evidence of a presently accessible route into the remote Sukur site.",
    decision: { label: "Differentiate landscape protection from an interpretive visit", detail: "Sukur and Osun-Osogbo are World Heritage properties, whereas Idanre and Arochukwu appear on Nigeria's Tentative List. For Sukur, enquire with NCMM about interpretation-centre operation and local safety before discussing a visit; heritage status alone never verifies current transport, tours or permission." },
  },
  "nigeria-unesco-heritage-guide": {
    source: { label: "NCMM — official museum and Sukur Interpretation Centre locations", href: museumList },
    context: "UNESCO records Nigeria's inscribed heritage properties and tentative candidates; NCMM separately lists the Sukur Interpretation Centre on the Mubi–Maiduguri Road. The agency listing provides an institution to contact, not a guaranteed public tour of the hilltop landscape.",
    decision: { label: "Use World Heritage status correctly in a trip plan", detail: "Nigeria has two inscribed sites: Sukur Cultural Landscape and Osun-Osogbo Sacred Grove. Tentative nominations such as Oke Idanre and the 2025 Gashaka Gumti submission are not additional inscribed sites. Check the precise site authority and current security and visitor rules before treating an interpretation office or nomination as an open attraction." },
  },
  "rivers-state-coast-nature-guide": {
    source: { label: "Finima Nature Park — Bonny visitor and conservation information", href: "https://finimanaturepark.com/" },
    context: "Finima Nature Park's operator gives a specific visitor location behind NLNG RA3 at the NLNG Roundabout on Bonny Island, not on a Port Harcourt city beach. The park describes conservation education and guided nature activities; that does not establish a ferry ticket or access to other Bonny beaches.",
    decision: { label: "Separate Bonny Island logistics from Finima park admission", detail: "Confirm the park's current opening, guide requirements and available activities with Finima directly. Plan authorised transport to Bonny Island and a return independently; do not assume Finima's nature-walk programme includes ferries, swimming, accommodation or access to every coastal site." },
  },
  "ekiti-nature-circuit": {
    source: { label: "Federal Ministry of Information — Ekiti tourism field survey (2019)", href: "https://fmino.gov.ng/report-on-tourism-field-survey-of-ekiti-state-carried-out-on-13th-to-15th-may-2019/" },
    context: "A 2019 federal tourism field survey locates Arinta Waterfalls in Ipole-Iloro, Ekiti West LGA, and discusses Ikogosi separately. It reported that Arinta's facilities were not fully developed at that time; the historic observation is not evidence of its facility status in October 2026.",
    decision: { label: "Plan the warm spring and waterfall as separate operator enquiries", detail: "For Ikogosi, verify admission or resort-day-visit access with its operator; for Arinta, ask the Ipole-Iloro local authority or site guide which approach, parking and safety arrangements currently exist. The federal survey is a useful historical comparison, not a 2026 price list or a guarantee that planned visitor facilities were completed." },
  },
  "ekiti-nature-weekend-itinerary": {
    source: { label: "Ikogosi Warm Springs Resort — official contact and booking pages", href: "https://www.ikogosiresort.com/" },
    context: "Ikogosi Warm Springs Resort independently advertises accommodation with a dedicated room-availability search and lists its location on Ipole–Erijiyan Road. That reservation interface is not a verified room quote or permission to enter the spring area without a booking.",
    decision: { label: "Choose Ikogosi as an overnight only after checking the exact terms", detail: "Verify actual room inventory, check-in conditions, whether a day visit or spring visit is allowed and the total resort charge directly. Arinta at Ipole-Iloro is a different destination with separate guide and route enquiries; leave daylight and rain margin for the waterfall rather than assuming the resort books both stops." },
  },
  "arinta-waterfalls-guide": {
    source: { label: "Independent Nigeria — Arinta site infrastructure discussed at World Tourism Day, 28 September 2026", href: "https://independent.ng/world-tourism-day-virtual-tours-ai-will-sell-arinta-waterfall-to-the-world-ekiti-monarch-others/" },
    context: "At Arinta on World Tourism Day in September 2026, the traditional ruler of Ipole-Iloro publicly called for stronger infrastructure, professional management and digital booking. The report does not announce a live official online ticket system or establish a fixed 2026 entry charge.",
    decision: { label: "Do not mistake proposed online ticketing for a working system", detail: "Arinta still warrants direct local confirmation of current entry, guide support, road conditions and safe viewing areas. The September 2026 proposals for digital maps and booking are plans, not a verified checkout; avoid payment links offered by unverified third parties and do not enter slippery waterfall edges after heavy rain." },
  },
  "lekki-conservation-centre-guide": {
    source: { label: "Radio Nigeria Lagos — Lagos inspection after LCC canopy-walk safety report, February 2024", href: "https://radionigerialagos.gov.ng/lagos-govt-commends-ncf-for-high-maintenance-cultureswift-response-to-safety-issues/" },
    context: "Radio Nigeria reported Lagos State safety inspections at Lekki Conservation Centre after a January 2024 video showing a damaged canopy-walk brace. The report described the centre's maintenance response at that time; it is not a current engineering certificate for the canopy on your visit date.",
    decision: { label: "Confirm canopy-walk availability, not only the gate", detail: "Ask NCF whether the canopy walkway itself is running on your chosen day, whether age and weather restrictions apply and what the present admission covers. A historically successful inspection is not a substitute for same-day operator safety notices, particularly after storms or maintenance closures." },
  },
  "becheve-nature-reserve-guide": {
    source: { label: "Radio Nigeria Lagos — Becheve named in NCF conservation revitalisation outlook, July 2025", href: "https://radionigerialagos.gov.ng/where-the-wild-breathes-how-lekki-conservation-centre-became-nigerias-model-for-climate-action-and-green-prosperity/" },
    context: "Radio Nigeria's July 2025 conservation report named Becheve Nature Reserve in Cross River among Nigerian Conservation Foundation projects considered for revitalisation. A proposed conservation improvement is not proof of an open visitor trail, completed repairs or a current Obudu tour product.",
    decision: { label: "Check Becheve's present conservation and visitor status", detail: "Request confirmation from the NCF or local community managers about lawful trail access, guide availability and any restoration restrictions. Becheve is a conservation reserve, not automatically an entry included in Obudu Mountain Resort; weather, transport and return-to-base safety require a separate plan." },
  },
  "wikki-warm-spring-guide": {
    source: { label: "Nigeria National Park Service — Yankari's transfer from federal park status in 2006", href: "https://nigeriaparkservice.gov.ng/about-us/" },
    context: "Nigeria's National Park Service explains that Yankari was removed from the federal national-park system in June 2006 at Bauchi State's request. Wikki Warm Spring sits within Yankari Game Reserve; an old source calling it a federal national park should not be used to locate the present entrance authority or pricing.",
    decision: { label: "Use the current Yankari Game Reserve operator for Wikki", detail: "Contact Bauchi State's reserve authority or current Yankari management about gate admission, Wikki pool rules and guide or vehicle requirements. The federal Park Service's historical page establishes administrative status, not a live spring opening, water-quality report or ticket price." },
  },
  "marshall-caves-yankari-guide": {
    source: { label: "Nigeria National Park Service — Yankari federal park delisting history", href: "https://nigeriaparkservice.gov.ng/about-us/" },
    context: "The Nigerian National Park Service records Yankari's 2006 removal from the federal national-park roster. Marshall Caves are a reserve archaeological excursion, not a freely accessible urban cave; the official park-history page does not issue visitor permission to enter them.",
    decision: { label: "Arrange Marshall Caves through Yankari's present reserve management", detail: "Ask the reserve's current operators about guide escort, wildlife and cave restrictions, safe transport and whether Marshall Caves visits are actually being conducted. A historic federal park designation should not be substituted for current Bauchi State reserve admission or archaeological-site authorisation." },
  },
};
