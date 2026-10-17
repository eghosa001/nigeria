import type { ExploreGuide } from "@/lib/explore";

/** Individually checked site evidence and concrete access decisions, 17 October 2026.
 * A source's historical account is not a current ticket, safety or opening permit.
 */
type IndependentReview = {
  source: { label: string; href: string };
  context: string;
  planning: ExploreGuide["planning"][number];
};
export const independentlyCheckedVisitorRoutesBatch4: Record<string, IndependentReview> = {
  "alok-ikom-monoliths-guide": {
    source: { label: "NCMM — Nigeria's gazetted national monuments (Alok and Emaghabe monoliths)", href: "https://museum.ng/national-monuments-in-nigeria/list-of-national-monuments/" },
    context: "The National Commission for Museums and Monuments separately identifies carved monolith groups at Alok and Emaghabe on its national-monument register. UNESCO's 2007 Alok Ikom entry is on the Tentative List, not the inscribed World Heritage List; the carved stones occur across multiple Ejagham communities and are not one unrestricted museum courtyard.",
    planning: { label: "Choose the community and request protected-site permission", detail: "Ask NCMM or authorised local custodians which Alok or Emaghabe stones may be visited, and arrange a knowledgeable community guide. Do not touch, climb, move or make rubbings from carvings, and request photography permission: monument protection does not prove everyday public access or a published admission fee." },
  },
  "oloibiri-oil-heritage-guide": {
    source: { label: "NCDMB — Oloibiri Museum project handover to contractor, 18 June 2025", href: "https://ncdmb.gov.ng/execution-of-oloibiri-museum-project-to-commence-as-promoters-hand-over-site-to-julius-berger/" },
    context: "Nigeria's Content Development and Monitoring Board reported in June 2025 that the proposed Oloibiri Museum and Research Centre in Otuabagi was being handed over to its construction contractor. The museum design includes an exhibition centre and research-testing facilities near the country's pioneering oil-well site, but a contractor handover does not establish a finished museum or tickets sold to the public.",
    planning: { label: "Do not book a museum tour from a construction announcement", detail: "Before travelling from Yenagoa, ask the museum project stakeholders or relevant Bayelsa authorities whether any heritage site, exhibition, community interpretation or road approach is presently authorised and accessible. Keep the old oil-well history distinct from the future Oloibiri museum; do not publish a museum opening or ticket price without a dated operation notice." },
  },
  "araromi-seaside-guide": {
    source: { label: "Voice of Nigeria — April 2026 Araromi investment and beach plans", href: "https://von.gov.ng/ondo-governor-seeks-investment-to-transform-araromi-coastline/" },
    context: "Independent April 2026 reporting confirms that the proposed Araromi seaside resort was an investment and construction plan announced during a beach carnival, not a completed hotel, staffed swimming beach or bookable accommodation package. The government was seeking private investment on the Ilaje coastline.",
    planning: { label: "Treat a planned resort differently from today's beach", detail: "Confirm current road access, shore conditions and permitted public sections locally before setting out; bring a daylight return plan. Do not rely on the proposed resort's future facilities, lifeguards, transport or rooms. Avoid swimming unless a trustworthy local operator specifically confirms conditions and supervision." },
  },
  "kusugu-well-daura-guide": {
    source: { label: "Daura Emirate Council — Bayajidda legend and Kusugu Well heritage", href: "https://dauraemiratecouncil.com/" },
    context: "The Daura Emirate Council describes the Kusugu Well as a heritage site associated with the Bayajidda origin narrative. Its account is a traditional historical legend rather than a literal archaeological proof of each event, and the council website does not specify current opening hours or a tourist-ticketing system.",
    planning: { label: "Seek local interpretation of the Bayajidda tradition", detail: "If a heritage visit in Daura is appropriate under current regional security advice, ask an authorised community or emirate guide about access to the protected well and photography boundaries. Present the story as an oral tradition, not a verified historical event or an invitation to enter ceremonial areas without permission." },
  },
  "jabi-lake-abuja-guide": {
    source: { label: "Federal Capital Development Authority — Jabi Lake flood-control and ecology, April 2025", href: "https://fcda.gov.ng/jabi-lake-should-be-protected-returned-to-its-original-purpose-says-fcdas-executive-secretary/" },
    context: "The Federal Capital Development Authority reported in April 2025 that Jabi Lake plays an important role in flood and erosion management and that protection work was under discussion. This water-management function is not the same as permission for boating, swimming, watersports or operation of every waterside concession.",
    planning: { label: "Decide on lakeside leisure separately from water access", detail: "A walk or restaurant visit does not require accepting a boat offer. For any boat activity, confirm the actual operator's current permission, life-jacket provision, weather and boarding rules; avoid entering the water independently. FCDA's conservation briefing does not certify leisure operators or water quality." },
  },
  "fajuyi-memorial-park-guide": {
    source: { label: "The Guardian — Adekunle Fajuyi and Aguiyi-Ironsi in the July 1966 coup", href: "https://guardian.ng/saturday-magazine/cover/50-years-after-remembering-ironsi-fajuyi/" },
    context: "The Guardian's historical reporting confirms that Francis Adekunle Fajuyi and Head of State Johnson Aguiyi-Ironsi were killed during the July 1966 counter-coup, in the Ibadan area. Fajuyi Park in Ado-Ekiti commemorates his life and burial; it is not the Ibadan assassination site and should not be described as such.",
    planning: { label: "Understand the memorial rather than inventing a museum exhibition", detail: "Use the Ado-Ekiti park for civic remembrance, but check whether the memorial and grounds are actually open, their physical condition and any ceremony restrictions. Do not advertise a permanent gallery, timed guided tour or photography entitlement without evidence from the current park manager." },
  },
  "dagona-bird-sanctuary-guide": {
    source: { label: "Convention on Wetlands — Nguru Lake and Marma Channel Ramsar recognition", href: "https://www.ramsar.org/news/ramsar-convention-welcomes-nigeria-its-123rd-party" },
    context: "The Convention on Wetlands identifies the Nguru Lake–Marma Channel complex as Nigeria's first Ramsar wetland, part of the wider Hadejia–Nguru floodplain across Yobe and Jigawa. Its habitat supports waterbirds and traditional fishing livelihoods, but Dagona sanctuary and Nguru Lake are not interchangeable gates or a guaranteed birding package.",
    planning: { label: "Distinguish the Ramsar wetland from Dagona visitor access", detail: "Before any birding excursion, obtain current security advice and the particular reserve manager's permission, location and guide availability. The Ramsar designation is conservation evidence, not proof that Dagona has an operating visitor desk or that an unguided route near waterways is safe." },
  },
  "centenary-hall-abeokuta-guide": {
    source: { label: "Nigerian Heritage — Centenary Hall, Ake and Egba civic history", href: "https://www.nigerianheritage.ng/tour-detail.php?id=315" },
    context: "An independently published heritage entry locates Abeokuta's Centenary Hall opposite the Ake Palace and links the hall with the commemorations of a century of Egba settlement. The building is a civic heritage landmark; the directory's zero-price placeholder does not establish today's free public admission or guarantee access to interior rooms.",
    planning: { label: "Pair Ake Palace and Centenary Hall without assuming entry", detail: "The Ake area makes a useful short heritage walking cluster after transport to central Abeokuta, but palace protocol and hall events can affect access. Confirm whether you may enter the hall or only view its frontage; do not copy an unverified directory price into a ticket recommendation." },
  },
  "ladi-kwali-pottery-centre-guide": {
    source: { label: "Smithsonian National Museum of African Art — Suleja pottery workshop provenance", href: "https://africa.si.edu/collection/object/nmafa_2002-14-13" },
    context: "The Smithsonian's object record traces an early Abuja Pottery Training Centre workshop to Michael Cardew in 1951 and explains its later connection with Gbagyi ceramist Ladi Kwali. 'Abuja pottery' in a 1950s museum label refers to the historic workshop now associated with Suleja, not necessarily a functioning class inside today's Federal Capital Territory.",
    planning: { label: "Ask for a working pottery demonstration, not just a historic name", detail: "The Ladi Kwali centre belongs to Suleja's craft heritage. Check whether teaching, workshops, sales or a visitor gallery are running on the chosen day; a Smithsonian object provenance does not confirm an open demonstration, same-day training slot or an authorised photography policy." },
  },
  "abuja-arts-crafts-village-guide": {
    source: { label: "Radio Nigeria — 2025 NCAC International Arts and Crafts Expo venue", href: "https://radionigerialagos.gov.ng/ncac-csea-partner-to-boost-nigerias-creative-economy/" },
    context: "Radio Nigeria reported that the National Council for Arts and Culture's International Arts and Crafts Expo opened at Abuja's Arts and Crafts Village in October 2025. That independently anchors the village as a real cultural venue, but a dated exposition is not a standing daily performance schedule or a guarantee that every craft stall is open.",
    planning: { label: "Shop at the village; check events separately", detail: "Ask the venue or individual artisans which workshops and stalls are operating before travelling for a particular craft. If you want a performance or expo, obtain an organiser's programme for the exact date; the 2025 expo notice must not be recycled as a 2026 event ticket." },
  },
  "farin-ruwa-waterfalls-guide": {
    source: { label: "Voice of Nigeria — Nasarawa waterfall and access-development reporting", href: "https://von.gov.ng/minister-urges-private-sector-to-invest-in-tourism-development/" },
    context: "Voice of Nigeria's coverage of federal and Nasarawa tourism discussions describes roads, a proposed resort and a possible film village at Farin Ruwa as development ambitions. None of those statements certifies a finished visitor complex. The separate multi-purpose dam works also affect how the wider area is described.",
    planning: { label: "Confirm actual road and dam-work restrictions before driving", detail: "Obtain current directions and site permission locally in Wamba, ask whether water and dam construction work restricts the approach, and plan for daylight conditions. Do not promise the planned resort, film village, guided trail or a fixed waterfall ticket on the strength of older development proposals." },
  },
  "dadin-kowa-dam-guide": {
    source: { label: "Federal Ministry of Information — irrigation works and Dadin-Kowa project status", href: "https://fmino.gov.ng/water-and-sanitation-minister-rolls-out-two-year-landmark-achievements-in-the-water-sector/" },
    context: "A federal water-sector report describes Dadin-Kowa's irrigation programme in Gombe among completed water-management works. An irrigation-project completion statement does not establish that the dam crest, spillway, reservoir or hydro infrastructure is a freely accessible public recreation facility.",
    planning: { label: "Get lawful dam viewpoints instead of entering works", detail: "Ask the managing water or power authority where an authorised public viewpoint, if any, is located. Never assume access through restricted control structures, water intakes or spillways; verify current security arrangements, rainfall effects and road conditions before a landscape visit." },
  },
  "okposi-salt-lakes-guide": {
    source: { label: "The Sun — interviews with women making salt at Okposi and Uburu", href: "https://thesun.ng/salt-making-in-ebonyi/" },
    context: "A field report documents women collecting and processing saline water at Okposi and distinguishes this from separate traditional processes near Uburu. Salt-making is an active community livelihood and cultural practice, not simply an empty lake where every visitor may enter and photograph workers at will.",
    planning: { label: "Arrange consent before observing salt-making", detail: "Ask community contacts about safe shore access and whether a salt-maker wants to explain her work. Agree any demonstration or purchase directly rather than assuming the historic article's prices remain current; do not enter production areas, handle tools or photograph workers without permission." },
  },
  "tafawa-balewa-square-guide": {
    source: { label: "The Guardian — restored Independence Memorial Obelisk at TBS, December 2025", href: "https://guardian.ng/news/firm-restores-independence-obelisk-reaffirms-commitment-to-sustainability/" },
    context: "Independent reporting on the 2025 restoration describes structural and accessibility work on Tafawa Balewa Square's Independence Memorial Obelisk. The monument is distinct from the square's event areas, and restoration of one landmark does not mean the entire TBS complex is an unrestricted daily visitor attraction.",
    planning: { label: "Confirm access to the monument and event grounds separately", detail: "Check TBS Management Board or the day's official event notice before planning an interior visit. Where the obelisk can be viewed publicly, follow posted security and photography rules; a December 2025 restoration report is not a universal entry pass or a current event calendar." },
  },
};
