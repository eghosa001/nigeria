import type { ExploreGuide } from "@/lib/explore";

// 17 October 2026 desktop research, applied only to EXISTING canonical guides.
// Sources establish the specific claims below, not operational hours,
// admission, venue reopening, permission to enter, or safe road access.
// UK FCDO travel advice is identified as UK-government advice to its travellers,
// not described as a Nigerian legal travel prohibition.
type Decision = {
  reviewedAt?: string;
  summary?: string;
  source: { label: string; href: string };
  additionalSources?: Array<{ label: string; href: string }>;
  context: string;
  planning: ExploreGuide["planning"][number];
};
const ncmm = "https://museum.ng/museums/national-museums/";
const regionalRisks = "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks";
const nigerInvestment = "https://nsipa.nigerstate.gov.ng/tourism/";

export const tourSourceSafetyDecisions20261017: Record<string, Decision> = {
  "delta-state-travel-guide": {
    reviewedAt: "2026-10-16", // Retain prior date-sensitive heritage review metadata.
    summary: "Delta's heritage includes Asaba and Koko, but UK FCDO advice is against all travel to riverine Delta and all but essential travel elsewhere in the state; verify access and risk before planning.",
    source: { label: "NCMM — National Museum Asaba at Mungo Park House", href: ncmm },
    additionalSources: [{ label: "UK FCDO — Delta riverine and non-riverine travel risks", href: regionalRisks }],
    context: "The National Commission for Museums and Monuments identifies National Museum Asaba at Mungo Park House. This gives the Asaba heritage stop an institutional route to verify, but does not establish that every room is open. The UK FCDO advises against all travel to Delta's boat-access-only riverine areas and against all but essential travel to non-riverine Delta; a riverside photograph is not evidence that a boat excursion is safe.",
    planning: { label: "Decide whether the Delta journey should proceed at all", detail: "Consult current regional security advice before planning travel to Asaba, Koko or Abraka. The UK FCDO's advice is against all but essential travel to non-riverine Delta and against all travel to riverine areas. If travel is essential, ask NCMM about the Asaba museum separately; do not sell a water excursion or infer a museum ticket from its directory listing." },
  },
  "gombe-state-travel-guide": {
    summary: "Explore Gombe's geography and heritage from official sources; the UK FCDO currently advises against all travel to the state, so this is not an endorsed sightseeing itinerary.",
    source: { label: "NCMM — National Museum Gombe official institutional address", href: ncmm },
    additionalSources: [{ label: "UK FCDO — all-travel warning for Gombe State", href: regionalRisks }],
    context: "The National Commission for Museums and Monuments lists National Museum Gombe at offices in the Gombe Federal Secretariat Complex, not as a confirmed walk-in display hall or ticketed gallery. Separately, the UK FCDO advises against all travel to Gombe State. Official promotion of Kaltungo hills or Dadin Kowa scenery cannot be treated as clearance to take a leisure road trip.",
    planning: { label: "Do not treat Gombe attractions as a current leisure itinerary", detail: "The UK FCDO currently advises against all travel to Gombe. Keep this page useful for geography and heritage research, not a recommendation to drive to Kaltungo or the dam. If an essential trip is being organised independently, confirm the security situation and museum access with the responsible authorities; the NCMM address is not proof that an exhibition is admitting visitors." },
  },
  "zamfara-state-travel-guide": {
    summary: "Research Gusau, Kwatakashi Rocks and Zamfara's cultural heritage without assuming visitor access: the UK FCDO currently advises against all travel to Zamfara.",
    source: { label: "UK FCDO — all-travel warning for Zamfara State", href: regionalRisks },
    context: "The official state tourism inventory describes Kwatakashi Rocks, museums and traditional settlements, but identifying a landmark is different from confirming a safe visitor route. The UK FCDO explicitly advises against all travel to Zamfara State, citing widespread banditry and kidnapping risks across the north-west; a state tourism listing should not supersede that security assessment.",
    planning: { label: "Keep Zamfara heritage as research, not a bookable road trip", detail: "Do not present a Gusau–Kwatakashi or Kaura Namoda sightseeing circuit as a safe recreational itinerary. UK FCDO advice is against all travel to Zamfara; anyone with essential obligations should obtain up-to-date local authority and travel-security guidance and make their own risk assessment. Current access, guides and museum admission remain unverified." },
  },
  "ekiti-nature-circuit": {
    reviewedAt: "2026-10-16", // Preserve the earlier checked-date contract for this already-reviewed guide.
    source: { label: "Guardian Nigeria — 2026 visitor comparison of Ikogosi and Arinta", href: "https://guardian.ng/life/what-to-do-when-you-visit-ekiti-state/" },
    context: "A 2026 Guardian visitor guide treats Ikogosi as a developed resort experience and nearby Arinta Waterfalls as a less commercialised nature outing. This distinction helps travellers choose: accommodation and resort services at Ikogosi are not evidence of similar facilities or accessible upper paths at Arinta. The Ekiti tourism bureau remains the authoritative starting point for attraction identities.",
    planning: { label: "Choose resort facilities or a waterfall trail deliberately", detail: "If comfort, accessible accommodation or resort services are essential, confirm them with the Ikogosi operator. If visiting Arinta, contact the local site about guides, path conditions and admission rather than assuming the same facilities or payment cover both attractions. Reserve the upper waterfall route for weather, footwear and mobility conditions that genuinely allow it." },
  },
  "zuma-rock-gurara-falls": {
    reviewedAt: "2026-10-16", // Preserve the earlier checked-date contract for this already-reviewed guide.
    summary: "Zuma Rock and Gurara Falls are Niger State landmarks, not proof of an operating resort or cable car; UK FCDO advises against all but essential travel to Niger.",
    source: { label: "Niger State Investment Promotion Agency — Zuma and Gurara projects", href: nigerInvestment },
    additionalSources: [{ label: "UK FCDO — Niger State regional risk advice", href: regionalRisks }],
    context: "Niger State's investment agency advertises possible Zuma Rock tourism-resort and Gurara waterfall-resort projects as investment opportunities. Proposed cable cars, restaurants and amusement facilities are NOT evidence that such amenities are built or operating. The UK FCDO also advises against all but essential travel to Niger State; this makes a casual two-stop leisure drive an inappropriate default recommendation.",
    planning: { label: "Do not book an imagined resort or rely on an advertised lift", detail: "Treat the state investment list as a project proposal, not a ticketing, cable-car or resort-opening notice. The UK FCDO advises against all but essential travel to Niger State; review current conditions before any route decision. If travel is essential, independently establish legal access, road security, waterfall conditions and return transport rather than using old visitor photos as proof." },
  },
  "gashaka-gumti-national-park": {
    summary: "Gashaka-Gumti is a protected landscape across Taraba and Adamawa, but new ranger patrols do not mean visitor entry is safe or open; UK FCDO advises against travel to Adamawa and all but essential travel to Taraba.",
    source: { label: "News Agency of Nigeria — 42 Gashaka-Gumti rangers deployed in May 2026", href: "https://nannews.ng/foundation-parks-service-deploy-42-rangers-to-gashaka-gumti-national-parks/" },
    additionalSources: [{ label: "UK FCDO — Adamawa and Taraba travel warnings", href: regionalRisks }],
    context: "The News Agency of Nigeria reported the May 2026 deployment of 42 trained rangers to protect Gashaka-Gumti's Taraba–Adamawa landscape. A conservation patrol deployment does not confirm visitor reopening, ranger-led trekking sales or a safe entrance road. The UK FCDO advises against all travel to Adamawa and against all but essential travel to Taraba, so a leisure expedition must not be marketed as routine.",
    planning: { label: "Distinguish conservation news from permission to visit", detail: "Do not interpret new park rangers as proof that recreational entry or overnight accommodation is available. UK FCDO advice is against all travel to Adamawa and all but essential travel to Taraba. Seek official park access and security information for research or essential institutional travel; do not recommend an independent highland trek on the basis of an old map." },
  },
  "kainji-lake-national-park": {
    reviewedAt: "2026-10-16", // Preserve the earlier checked-date contract for this already-reviewed guide.
    summary: "Kainji Lake National Park has an official park office in New Bussa, but current recreational access is not established; UK FCDO advises against all but essential travel to Niger and Kwara.",
    source: { label: "Nigeria Park Service — Kainji Lake National Park contact in New Bussa", href: "https://nigeriaparkservice.gov.ng/contact-us/" },
    additionalSources: [{ label: "UK FCDO — Niger and Kwara travel warnings", href: regionalRisks }],
    context: "Nigeria Park Service's contact directory places Kainji Lake National Park administration in New Bussa, Niger State, with a specific park-conservator contact route. This helps distinguish the protected park from the hydroelectric dam and the broad lake region. A park office listing is not evidence of currently available wildlife drives, camps or tickets; UK FCDO advice is against all but essential travel to both Niger and Kwara states.",
    planning: { label: "Check the exact park sector before any essential journey", detail: "Ask the Park Service which sector or public access point a proposed visit concerns, whether supervised visitor services are currently offered and what conservation restrictions apply. The UK FCDO advises against all but essential travel to Niger and Kwara, so do not promise a safe recreational safari or a single admission that includes the dam." },
  },
  "erin-ijesha-waterfall": {
    source: { label: "Osun State Government — September 2025 waterfall PPP upgrade plan", href: "https://www.osunstate.gov.ng/2025/09/tourism-agenda-governor-adeleke-to-upgrade-cultural-tourist-sites-at-osogbo-ilesa-ife-and-ede/" },
    context: "Osun State announced plans in September 2025 to use a public–private partnership to upgrade Erin-Ijesha Waterfalls. An upgrade plan is not a dated completion certificate, and it does not prove that steps, safety barriers, toilets, guides or an entry gate are working in October 2026. The state's tourism directory also calls this place Olumirin Waterfall; the two names should not be treated as separate attractions.",
    planning: { label: "Verify which waterfall facilities actually exist today", detail: "Confirm current trail access, fees, any works restrictions and local guiding arrangements with the site before travel. Do not infer upgraded or universally accessible walkways from the 2025 government proposal. Wet rocks and steep sections still require suitable footwear and a willingness to stop short of higher levels." },
  },
  "sukur-cultural-landscape": {
    summary: "Sukur is a UNESCO World Heritage cultural landscape in Adamawa, where conservation and security concerns remain; UK FCDO currently advises against all travel to Adamawa.",
    source: { label: "UNESCO — 2025 Sukur conservation and security decision", href: "https://whc.unesco.org/en/decisions/8885" },
    additionalSources: [{ label: "UK FCDO — all-travel warning for Adamawa State", href: regionalRisks }],
    context: "UNESCO's 2025 World Heritage Committee decision describes damage to parts of the stone-paved walkway and terraced farmland after September 2024 flooding, alongside restoration and security-management work. A World Heritage inscription is not a safety clearance or a guarantee that the traditional approach trail has been repaired. The UK FCDO advises against all travel to Adamawa State.",
    planning: { label: "Treat Sukur as protected heritage, not a currently safe hike", detail: "Do not advertise the Sukur hilltop approach as an ordinary leisure trek. UNESCO asks for continued security stabilisation and conservation work, and UK FCDO advice is against all travel to Adamawa. Keep information on the Hidi's Palace, terraces and iron-working heritage accessible for study, but verify access only through responsible heritage authorities for essential, properly assessed activity." },
  },
  "enugu": {
    source: { label: "NCMM — National Museum of Unity, Enugu city location", href: ncmm },
    context: "The national museum authority lists the National Museum of Unity in Enugu at 65 Abakaliki Road, GRA. That is an in-city cultural-history stop, unlike Ngwo Pine Forest or Awhum Waterfall, which require separate out-of-town access and site-specific checks. The NCMM station list identifies the museum but is not an October 2026 exhibition schedule.",
    planning: { label: "Keep museum and forest days separate", detail: "If your time is limited or rainfall makes trails unsuitable, ask the National Museum of Unity about current gallery opening and admission before treating it as an alternative city stop. Forest and waterfall permissions, guiding and road access must each be checked independently; the museum's published address does not validate the safety or reopening of those nature routes." },
  },
  "anambra-heritage-circuit": {
    summary: "Anambra's archaeological and natural heritage includes the Igbo-Ukwu museum, lakes and caves; UK FCDO advises against all but essential travel to the state.",
    source: { label: "NCMM — National Museum Igbo-Ukwu official station address", href: ncmm },
    additionalSources: [{ label: "UK FCDO — Anambra travel and road-risk advice", href: regionalRisks }],
    context: "The national museum authority lists National Museum Igbo-Ukwu at Km 4 on the Umudege–Ezinifite Road, Igbo-Ukwu, in Aguata LGA. This is a specific archaeological museum location, not proof that every original Igbo-Ukwu bronze is displayed there. The UK FCDO advises against all but essential travel to Anambra State; the map of caves and lakes must not be presented as a routine self-drive route.",
    planning: { label: "Check museum collections and the road-security decision separately", detail: "The UK FCDO advises against all but essential travel to Anambra. Where travel is essential, use NCMM's Igbo-Ukwu station to establish whether a gallery is admitting visitors and which objects are on show; do not infer cave entry, lake access or bronze custody from one museum listing." },
  },
  "abia-state-travel-guide": {
    summary: "Abia's Umuahia war-history landmarks have restoration plans, not guaranteed reopening; UK FCDO advises against all but essential travel to Abia.",
    source: { label: "NCMM — National War Museum Umuahia station", href: ncmm },
    additionalSources: [{ label: "UK FCDO — Abia State travel-risk advice", href: regionalRisks }],
    context: "NCMM lists the National War Museum as a specific Umuahia museum station; the separately named Ojukwu Bunker should not be assumed to share the same admission, access or restoration timetable. The federal preservation announcement already cited by this guide is evidence of intervention, not completion. The UK FCDO advises against all but essential travel to Abia State.",
    planning: { label: "Do not presume the War Museum and bunker have reopened together", detail: "Check current museum access and conservation restrictions with NCMM and independently ask about the Ojukwu Bunker. The UK FCDO advises against all but essential travel to Abia, so do not treat an announced restoration as a reason for an unassessed tourist road trip or a guarantee of admission." },
  },
  "katsina-state-travel-guide": {
    reviewedAt: "2026-10-16", // Preserve the earlier checked-date contract for this already-reviewed guide.
    summary: "Katsina's historic sites and Daura emirate traditions remain important to research, but UK FCDO currently advises against all travel to Katsina.",
    source: { label: "UK FCDO — all-travel warning for Katsina State", href: regionalRisks },
    context: "Katsina's state tourism page describes Gobarau Minaret, Daura and emirate culture, but publication of a festival calendar is not an assessment of visitor security. The UK FCDO advises against all travel to Katsina State, including the routes a Katsina–Daura heritage circuit would depend upon.",
    planning: { label: "Avoid promising a bookable Katsina–Daura heritage weekend", detail: "Preserve the historical context of Gobarau Minaret, Kusugu Well and Durbar traditions without advertising a routine sightseeing circuit. UK FCDO advice is against all travel to Katsina; essential journeys require independent current security advice and local access confirmation, not an old festival poster." },
  },
  "niger-state-nature": {
    source: { label: "Niger State Investment Promotion Agency — proposed nature tourism projects", href: nigerInvestment },
    additionalSources: [{ label: "UK FCDO — Niger State essential-travel warning", href: regionalRisks }],
    context: "Niger State's investment catalogue lists proposed Zuma Rock and Gurara tourism projects, including concepts such as resort infrastructure. These are prospective investments, not verified completed attractions or visitor amenities. The UK FCDO advises against all but essential travel to Niger State, affecting any proposed waterfall or rock circuit.",
    planning: { label: "Read investment plans as plans, not operating park listings", detail: "Do not promise a cable car, opened resort, admission ticket or safe spontaneous scenic drive because it appears on a state development list. The UK FCDO advises against all but essential travel to Niger; if travel is essential, confirm access and security independently for every proposed stop." },
  },
  "asaba": {
    source: { label: "NCMM — National Museum Asaba at Mungo Park House", href: ncmm },
    additionalSources: [{ label: "UK FCDO — non-riverine Delta travel warning", href: regionalRisks }],
    context: "NCMM identifies National Museum Asaba at Mungo Park House, a useful precise institutional stop for the city's Niger River history. This is not proof that the whole heritage building can be entered or that a boat-based river experience is available. The UK FCDO advises against all but essential travel to non-riverine Delta and against all travel to its boat-access-only riverine areas.",
    planning: { label: "Verify the Asaba museum without assuming river access", detail: "Consider current regional security guidance before visiting Asaba. Where travel is essential, check NCMM's museum station for exhibition access and admission. A historic river association is not permission for a boat tour or an indication that the FCDO's Delta warnings have been lifted." },
  },
};
