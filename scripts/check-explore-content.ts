import { exploreGuides } from "../lib/explore";
import { highPriorityTourEvidence20261016 } from "../lib/explore-high-priority-2026-10-16";
import { tourAccessDecisions20261016C } from "../lib/explore-access-decisions-2026-10-16-c";
import { tourLeadFixes20261016 } from "../lib/explore-tour-lead-fixes-2026-10-16";
import { tourRealityChecks20261016 } from "../lib/explore-tour-reality-2026-10-16";
import { tourPracticalDecisions20261016 } from "../lib/explore-practical-decisions-2026-10-16";
import { explorePlaces, getExplorePlacesForGuide } from "../lib/explore-places";

const errors: string[] = [];
const guideSlugs = new Set<string>();
const placeSlugs = new Set<string>();

for (const guide of exploreGuides) {
  if (guideSlugs.has(guide.slug)) errors.push(`duplicate guide slug: ${guide.slug}`);
  guideSlugs.add(guide.slug);

  if (guide.intro.length < 2) errors.push(`${guide.slug}: expected at least 2 useful intro paragraphs`);
  if (guide.bestFor.length < 3) errors.push(`${guide.slug}: expected at least 3 best-for signals`);
  if (guide.highlights.length < 4) errors.push(`${guide.slug}: expected at least 4 substantive highlights`);
  if (guide.planning.length < 4) errors.push(`${guide.slug}: expected at least 4 planning decisions`);
  if (!guide.source?.href.startsWith("https://")) errors.push(`${guide.slug}: needs an https verification source`);
  if (!/^2026-\d{2}-\d{2}$/.test(guide.lastReviewed)) errors.push(`${guide.slug}: invalid lastReviewed`);

  // Do not incentivise filler: a researched destination can have one real
  // landmark or no independently established public venue. Relevance and
  // source truth matter more than a quota of three unrelated attractions.
  const places = getExplorePlacesForGuide(guide.slug);
  const seenGuidePlaces = new Set(places.map(place => place.slug));
  if (seenGuidePlaces.size !== places.length) {
    errors.push(`${guide.slug}: duplicate location cards add no independent reader value`);
  }
}

// Source and route assertions are deliberately restricted to the 12 changed
// guides. Automatic validity cannot establish live admission, prices or safety.
const checkedGuideSlugs = Object.keys(tourPracticalDecisions20261016);
if (checkedGuideSlugs.length !== 12 || new Set(checkedGuideSlugs).size !== 12) {
  errors.push("The 16 October Tour correction batch must cover 12 distinct guide URLs.");
}
for (const slug of checkedGuideSlugs) {
  const guide = exploreGuides.find(item => item.slug === slug);
  const update = tourPracticalDecisions20261016[slug];
  if (!guide || !guide.intro.includes(update.intro ?? "") ||
      !guide.planning.some(step => step.label === update.planning.label && step.detail === update.planning.detail) ||
      guide.lastReviewed !== "2026-10-16" ||
      ![guide.source?.href, ...(guide.sources ?? []).map(source => source.href)].includes(update.source.href)) {
    errors.push(slug + ": missing dated institution-backed visitor decision, planning or reference.");
  }
}

// Change-scoped source-and-experience assertions for 10 guides. These are
// NOT a claim of local visits, safe travel, rights clearance or ticket prices.
const highPriorityChecked = Object.keys(highPriorityTourEvidence20261016);
if (highPriorityChecked.length !== 10 || new Set(highPriorityChecked).size !== 10)
  errors.push("16 October primary-source Tour batch must cover ten actual guide slugs.");
for (const slug of highPriorityChecked) {
  const record = exploreGuides.find(guide => guide.slug === slug);
  const evidence = highPriorityTourEvidence20261016[slug];
  if (!record || !record.intro.includes(evidence.intro ?? "") ||
      !record.planning.some(part => part.label === evidence.planning.label && part.detail === evidence.planning.detail) ||
      ![record.source?.href, ...(record.sources ?? []).map(source => source.href)].includes(evidence.source.href) ||
      record.lastReviewed !== "2026-10-16")
    errors.push(slug + ": missing source-linked and dated, actionable visitor access guidance.");
}
for (const slug of ["imo-state-travel-guide","kaltungo-hills-guide","katsina-heritage-weekend-itinerary","katsina-state-travel-guide"]) {
  const guide = exploreGuides.find(item => item.slug === slug);
  const evidence = highPriorityTourEvidence20261016[slug];
  const note = [evidence?.intro, evidence?.planning.detail].filter(Boolean).join(" ");
  if (!guide || !/advises against (all|all but essential) travel/i.test(note))
    errors.push(slug + ": preserve documented current UK government travel warning.");
}

// Changed-scope evidence contract. Do not certify prices, safe travel,
// visits, copyright or AdSense with this automated check.
const accessSlugs = Object.keys(tourAccessDecisions20261016C);
if (accessSlugs.length !== 20 || new Set(accessSlugs).size !== 20)
  errors.push("Tour batch 2026-10-16 C must have 20 unique canonical guides.");
for (const slug of accessSlugs) {
  const guide = exploreGuides.find(g => g.slug === slug);
  const note = tourAccessDecisions20261016C[slug];
  if (!guide || !guide.intro.includes(note.intro ?? "") ||
      !guide.planning.some(p => p.label === note.planning.label && p.detail === note.planning.detail) ||
      ![guide.source?.href, ...(guide.sources ?? []).map(s => s.href)].includes(note.source.href) ||
      guide.lastReviewed !== "2026-10-16")
    errors.push(slug + ": missing dated source-checked visitor task.");
  const text = [note.intro, note.planning.detail].filter(Boolean).join(" ");
  if (/\bFCDO\b/.test(text)) {
    if (!guide?.sources?.some(s => s.href === "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks") &&
        guide?.source?.href !== "https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks")
      errors.push(slug + ": lacks directly cited official travel warning.");
  }
  const urls = [guide?.source?.href, ...(guide?.sources ?? []).map(s => s.href)].filter(Boolean);
  if (new Set(urls).size !== urls.length)
    errors.push(slug + ": source links duplicated after update.");
}

// Hero copy may not contradict checked visit permissions or official safety
// advice; preserve the substantive guide and existing canonical identifiers.
const heroSlugs = Object.keys(tourLeadFixes20261016);
if (heroSlugs.length !== 17 || new Set(heroSlugs).size !== 17)
  errors.push("17 distinct Tour hero corrections expected from source-backed research.");
for (const slug of heroSlugs) {
  const guide = exploreGuides.find(item => item.slug === slug);
  const correction = tourLeadFixes20261016[slug];
  if (!guide || guide.summary !== correction.summary ||
      (correction.title && guide.title !== correction.title) ||
      (correction.shortTitle && guide.shortTitle !== correction.shortTitle))
    errors.push(slug + ": source-corrected public title, short title or summary missing.");
  for (const [label, detail] of Object.entries(correction.highlightChanges)) {
    if (!guide?.highlights.some(h => h.name === label && h.detail === detail))
      errors.push(slug + ": unsourced original highlight still surfaced: " + label);
  }
}
const kiriji = exploreGuides.find(item => item.slug === "kiriji-war-museum-guide");
if (!kiriji || kiriji.title.includes("Museum") || !kiriji.summary.includes("no current operating museum"))
  errors.push("Kiriji site must not be presented to visitors as an established staffed museum.");

// A heritage map pin must not falsely certify a staffed museum. This page's
// canonical URL and place identifier are intentionally preserved.
const kirijiPin = explorePlaces.find(p => p.slug === "kiriji-war-museum");
const owa = exploreGuides.find(g => g.slug === "owa-obokun-statue-guide");
const warHistory = exploreGuides.find(g => g.slug === "nigeria-war-history-guide");
if (!kirijiPin || kirijiPin.kind !== "landmark" ||
    kirijiPin.guideSlug !== "kiriji-war-museum-guide" ||
    kirijiPin.name.includes("Museum") ||
    !kirijiPin.mapQuery?.includes("Imesi-Ile") ||
    !kirijiPin.source.href.includes("osun-community-tasks-aregbesola-development") ||
    kirijiPin.checkedAt !== "2026-10-16" ||
    !owa?.summary.includes("a public Kiriji museum has not been verified") ||
    !warHistory?.highlights.some(h => h.name === "Kiriji war site")) {
  errors.push("Kiriji place card and all linked Tour guides must not claim an unverified public museum.");
}

// Change-scoped editorial release checks. A green test is not a claim of
// human visits, working admissions, safe travel, originality or AdSense trust.
const realitySlugs = Object.keys(tourRealityChecks20261016);
if (realitySlugs.length !== 18 || new Set(realitySlugs).size !== 18)
  errors.push("18 distinct Tour decision records required in the source-verification batch.");
for (const slug of realitySlugs) {
  const guide = exploreGuides.find(record => record.slug === slug);
  const correction = tourRealityChecks20261016[slug];
  if (!guide || guide.summary !== correction.summary ||
      !guide.intro.includes(correction.intro ?? "") ||
      !guide.planning.some(step => step.label === correction.planning.label && step.detail === correction.planning.detail) ||
      ![guide.source?.href, ...(guide.sources ?? []).map(source => source.href)].includes(correction.source.href) ||
      guide.lastReviewed !== "2026-10-16")
    errors.push(slug + ": insufficient real visitor-task, primary evidence or checked-date updates.");
  const allText = [correction.intro, correction.planning.detail].join(" ");
  if (/\bFCDO\b/.test(allText) && ![guide?.source?.href, ...(guide?.sources ?? []).map(source => source.href)]
    .includes("https://www.gov.uk/foreign-travel-advice/nigeria/regional-risks"))
    errors.push(slug + ": travel warning not directly linked to visitor-facing guide.");
}
const ngwoGuide = exploreGuides.find(guide => guide.slug === "ngwo-pine-forest-guide");
if (!ngwoGuide?.summary.includes("not a verified operating ride"))
  errors.push("Ngwo must not promote a future zipline/cable car as live.");
const gombeGuide = exploreGuides.find(guide => guide.slug === "nafada-riverside-guide");
if (!gombeGuide?.summary.includes("advises against all travel"))
  errors.push("Nafada must not lead with a proposed nature excursion despite Gombe all-travel warning.");

// Regression: publication screening and the actual Tour guide page must agree
// about already sourced, shared, canonical place cards. A guide should not be
// marked 'unmapped' solely because a card's primary owner is another guide.
const establishedSharedGuideMaps: Record<string, string[]> = {
  "nigeria-lakes-waterfronts-guide": ["jabi-lake-abuja", "oguta-lake", "agulu-lake"],
  "nigeria-textile-craft-guide": ["itoku-adire-market", "igun-street"],
  "abuja-national-landmarks-day": ["abuja-national-mosque", "national-christian-centre-abuja"],
  "agodi-gardens-guide": ["agodi-gardens-ibadan"],
  "alake-palace-abeokuta-guide": ["alake-palace-abeokuta"],
  "ara-rock-guide": ["ara-rock-nasarawa"],
  "ataoja-palace-osogbo-guide": ["ataoja-palace-osogbo", "osun-osogbo-sacred-grove"],
};
for (const [guideSlug, placeSlugs] of Object.entries(establishedSharedGuideMaps)) {
  const rendered = getExplorePlacesForGuide(guideSlug);
  const bySlug = new Map(rendered.map(place => [place.slug, place]));
  for (const slug of placeSlugs) {
    const place = bySlug.get(slug);
    if (!place || !place.area.trim() || !place.address.trim() ||
        !place.source?.href.startsWith("https://")) {
      errors.push(`${guideSlug}: canonical mapped stop ${slug} needs a real on-page card with address and cited source`);
    }
  }
}

// Four pages were verified individually against current primary heritage,
// state tourism and official travel-security material. Preserve those source
// routes and materially useful advice rather than accepting empty padding.
const independentlyCheckedDestinations = [
  { slug: "agulu-lake-guide", hosts: ["caica.anambrastate.gov.ng", "mocet.anambrastate.gov.ng"], words: 340 },
  { slug: "sukur-hidi-palace-guide", hosts: ["whc.unesco.org", "museum.ng", "smartraveller.gov.au"], words: 380 },
  { slug: "moremi-statue-ile-ife-guide", hosts: ["oonirisa.org", "osunstate.gov.ng"], words: 330 },
  { slug: "nigeria-archaeology-guide", hosts: ["museum.ng", "whc.unesco.org"], words: 360 },
  { slug: "abeokuta-day-trip-itinerary", hosts: ["abeokutasouthlga.og.gov.ng", "invest.ogunstate.gov.ng", "egbamuseum.org"], words: 370 },
  { slug: "okigwe-hills-guide", hosts: ["isipa.im.gov.ng", "smartraveller.gov.au"], words: 360 },
  { slug: "dufuna-canoe-heritage-guide", hosts: ["yobeinvest.ng", "museum.ng", "si.edu", "smartraveller.gov.au"], words: 700 },
];
for (const { slug, hosts, words } of independentlyCheckedDestinations) {
  const guide = exploreGuides.find((item) => item.slug === slug);
  if (!guide) { errors.push(slug + ": missing researched destination guide."); continue; }
  const sourceUrls = [guide.source?.href, ...(guide.sources ?? []).map(source => source.href)]
    .filter((url): url is string => Boolean(url));
  if (hosts.some(host => !sourceUrls.some(url => new URL(url).hostname.endsWith(host)))) {
    errors.push(slug + ": an original, independently corroborating source is missing.");
  }
  const readerText = [guide.summary, ...guide.intro,
    ...guide.highlights.map(x => x.detail), ...guide.planning.map(x => x.detail)].join(" ");
  if (readerText.trim().split(/\s+/).length < words || guide.planning.length < 5) {
    errors.push(slug + ": lost destination-specific practical explanation or visitor decisions.");
  }
}
const sukur = exploreGuides.find(x => x.slug === "sukur-hidi-palace-guide");
if (!sukur || !/do not travel/i.test([sukur.summary, ...sukur.intro, ...sukur.planning.map(x => x.detail)].join(" ")) ||
    !/erosion|stone.paved.*damage|damaged.*path/i.test(sukur.intro.join(" "))) {
  errors.push("Sukur guide must explicitly disclose Adamawa travel warning and UNESCO's documented walkway erosion.");
}
const agulu = exploreGuides.find(x => x.slug === "agulu-lake-guide");
if (!agulu || /\/directory\/agulu-lake\//.test(agulu.source?.href ?? "") ||
    !agulu.planning.some(x => /crocodile|wildlife/i.test(x.detail) && /do not|distance|stay clear/i.test(x.detail))) {
  errors.push("Agulu guide must not use the broken government-directory source or omit wildlife-safety advice.");
}
const archaeology = exploreGuides.find(x => x.slug === "nigeria-archaeology-guide");
if (!archaeology || !/tentative/i.test(archaeology.summary) ||
    !archaeology.planning.some(x => /not the same|different|tentative/i.test(x.detail) && /inscri/i.test(x.detail))) {
  errors.push("Nigerian archaeology guide must distinguish UNESCO tentative-listed sites from World Heritage inscriptions.");
}

// No sourced current operator/fee/route has been established for Okigwe;
// a tourism investment description must not become an unsafe climbing plan.
const okigwe = exploreGuides.find(x => x.slug === "okigwe-hills-guide");
if (!okigwe || !/do not travel/i.test([okigwe.summary, ...okigwe.intro, ...okigwe.planning.map(x => x.detail)].join(" ")) ||
    !okigwe.planning.some(x => /no verified|neither|not.*verify/i.test(x.detail) && /ticket|trail|fee|operator/i.test(x.detail))) {
  errors.push("Okigwe guide must retain Imo travel warning and avoid inventing a bookable hiking facility.");
}
const abeokuta = exploreGuides.find(x => x.slug === "abeokuta-day-trip-itinerary");
if (!abeokuta || /olumorock\\.ng/.test([abeokuta.source?.href,...(abeokuta.sources??[]).map(x=>x.href)].join(" ")) ||
    !abeokuta.planning.some(x => /verify|confirm/i.test(x.detail) && /access|entry|hours|price/i.test(x.detail))) {
  errors.push("Abeokuta itinerary must use independently reachable sources and clarify real access/fees.");
}

// Dufuna's old, generic 'ancient heritage trip' text hid the original
// location-versus-conservation question and current Yobe travel risks.
const dufuna = exploreGuides.find(x => x.slug === "dufuna-canoe-heritage-guide");
if (!dufuna || !/do not travel/i.test([dufuna.summary, ...dufuna.intro].join(" ")) ||
    !dufuna.intro.some(x => /1987/.test(x) && /1994/.test(x)) ||
    !dufuna.planning.some(x => /hours|ticket|admission/i.test(x.detail) && /not|no|unknown|unverified/i.test(x.detail)) ||
    !dufuna.planning.some(x => /second.oldest|third.oldest|rank/i.test(x.detail) && /different|cautious|sources|claim/i.test(x.detail))) {
  errors.push("Dufuna Canoe must retain date-specific excavation history, Yobe safety warning and honest unknown exhibit access.");
}

// A prehistoric findspot cannot be represented as the museum entrance.
// Dufuna was previously padded with unrelated wildlife and fishing festivals
// to satisfy a three-card quota. Its only mapped reference is now the
// historically documented Damaturu preservation area, explicitly unbookable.
const dufunaCards = getExplorePlacesForGuide("dufuna-canoe-heritage-guide");
if (dufunaCards.length !== 1 || dufunaCards[0]?.slug !== "dufuna-canoe-heritage-yobe" ||
    !/Damaturu/.test(dufunaCards[0]?.address ?? "") ||
    /Dufuna, Yobe State, Nigeria/.test(dufunaCards[0]?.address ?? "") ||
    !/unverified|not verified|no verified|not a verified/i.test(
      [dufunaCards[0]?.summary, dufunaCards[0]?.cost].join(" ")) ||
    dufunaCards[0]?.source.href !== "https://yobeinvest.ng/wp-content/uploads/2025/09/Invest-in-Yobe.pdf") {
  errors.push("Dufuna mapped card must cite actual Damaturu preservation, not imply public exhibition or add unrelated Yobe attractions.");
}

// Search Console already has impressions for the older URL. Keep one
// Kainji Dam canonical, with the richer location/history material retained.
// Avoid publishing a generic bunker tourist blurb or claiming a 2026
// restoration-completion estimate is confirmed public access.
const ojukwu = exploreGuides.find((g) => g.slug === "ojukwu-bunker-guide");
if (!ojukwu || ojukwu.intro.length < 4 || ojukwu.planning.length < 5 ||
    (ojukwu.sources?.length ?? 0) < 2 ||
    !ojukwu.planning.some((x) => /stair|ventilation|mobility|accessibility/i.test(x.detail)) ||
    !ojukwu.planning.some((x) => /confirm|contact|check/i.test(x.detail) && /open|entry|access/i.test(x.detail))) {
  errors.push("Ojukwu Bunker needs unique cited history, independently actionable access planning, and restoration caveats.");
}

const kainji = exploreGuides.filter((guide) => /^(kainji-dam|kainji-dam-guide)$/.test(guide.slug));
if (kainji.length !== 1 || kainji[0]?.slug !== "kainji-dam-guide") {
  errors.push("Kainji Dam must have one canonical at /explore/kainji-dam-guide");
}
if (!kainji[0]?.intro.some((paragraph) => paragraph.includes("1968"))) {
  errors.push("Kainji Dam canonical lost its verified engineering-history details");
}


// Targeted editorial regression: three flagged heritage routes must retain
// distinct independently attributable facts without claiming unverified access.
for (const [slug, sourceFragment, evidencePhrase, planningPhrase] of [
  ["badagry-heritage-guide", "research.birmingham.ac.uk/en/publications/localizing-the-narrative", "Seriki Williams Abass", "different museum narratives"],
  ["abia-war-history", "fmino.gov.ng/federal-governments-war-museum", "80 per cent", "during restoration"],
  ["anambra-heritage", "whc.unesco.org/en/tentativelists/5174", "317 steps", "Ogbunike descent"],
] as const) {
  const guide = exploreGuides.find(item => item.slug === slug);
  if (!guide ||
      !guide.sources?.some(item => item.href.includes(sourceFragment)) ||
      !guide.intro.some(item => item.includes(evidencePhrase)) ||
      !guide.planning.some(item => item.label.includes(planningPhrase)) ||
      guide.lastReviewed !== "2026-10-15") {
    errors.push(`${slug}: independently verified heritage research or visitor safeguards missing`);
  }
}


// Focused heritage source matching and independently sourced travel safeguards.
for (const [slug, officialUrl, additionalSource, distinctiveFact, action] of [
  ["arochukwu-long-juju-guide", "whc.unesco.org/en/tentativelists/5170/", "people.wku.edu/johnston.njoku/arochukwu/history", "tentative-list entry 5170", "Arochukwu custodians"],
  ["chad-basin-national-park-borno-guide", "nigeriaparkservice.gov.ng/blog/2014/08/12/chad-basin", "chathamhouse.org/events/all/standard-event/lake-chad-basin", "Chingurmi-Duguma", "Do not treat the Borno park sector"],
  ["anambra-heritage-circuit", "anambrastate.gov.ng/ministry-of-culture", "ajernet.net/ojs/index.php/ajernet/article/view/1078", "120 participants", "Separate Ogbunike conservation concerns"],
] as const) {
  const guide = exploreGuides.find(item => item.slug === slug);
  if (!guide ||
      !guide.source?.href.includes(officialUrl) ||
      !guide.sources?.some(source => source.href.includes(additionalSource)) ||
      !guide.intro.some(text => text.includes(distinctiveFact)) ||
      !guide.planning.some(item => item.label.includes(action))) {
    errors.push(`${slug}: exact-source identification or source-backed visitor decision regressed`);
  }
}
const badagry = exploreGuides.find(item => item.slug === "badagry-heritage-guide");
if (!badagry?.intro.some(item =>
  item.includes("Slave History Museum in Calabar") && item.includes("Seriki Williams Abass museum in Badagry"))) {
  errors.push("Badagry: Faye Sayer's two original study sites must not be misidentified");
}

// Correct source identity applies to rendered map cards, not only guide citations.
for (const [slug, expected] of [
  ["arochukwu-long-juju", "https://whc.unesco.org/en/tentativelists/5170/"],
  ["chad-basin-national-park-borno", "https://nigeriaparkservice.gov.ng/blog/2014/08/12/chad-basin-national-park/"],
] as const) {
  if (explorePlaces.find(place => place.slug === slug)?.source.href !== expected) {
    errors.push(`${slug}: mapped visitor source must open the exact named landmark`);
  }
}


// Source-grounded 16 October editorial fixes: historical burial, protected forest,
// and a conflicting event calendar must never regress into unsafe visitor claims.
for (const [slug, primarySource, detail, decision] of [
  ["akwa-ibom-heritage-route", "akwaibomstate.gov.ng/about-akwa-ibom/", "burial at Duke Town cemetery in Calabar", "Choose the right Mary Slessor destination"],
  ["becheve-nature-reserve-guide", "ncfnigeria.org/forest-green-recovery-nigeria/", "canopy walkway here in 2006", "Do not assume the canopy walkway is open"],
  ["african-traditional-food-fair-abuja-2026", "afritraditionalfoodfair.org/", "16–17 October", "Resolve Friday versus Saturday"],
] as const) {
  const guide = exploreGuides.find(item => item.slug === slug);
  if (!guide ||
      !guide.source?.href.includes(primarySource) ||
      !guide.intro.some(paragraph => paragraph.includes(detail)) ||
      !guide.planning.some(item => item.label.includes(decision)) ||
      guide.lastReviewed !== "2026-10-16") {
    errors.push(`${slug}: the independently checked 16 October correction has regressed`);
  }
}
const akka = exploreGuides.find(item => item.slug === "akwa-ibom-heritage-route");
if (!akka?.sources?.some(source => source.href.includes("guardian.ng/sunday-magazine/mary-mitchell-slessor-a-catalyst-of-change/")) ||
    !akka?.sources?.some(source => source.href.includes("discoverakwaibom.com/heritage-sites/1929-women-war-memorial/")) ||
    akka.highlights.some(item => item.name === "Mary Slessor Tomb")) {
  errors.push("Akwa Ibom: historically incorrect Mary Slessor tomb must not return");
}
const fair = exploreGuides.find(item => item.slug === "african-traditional-food-fair-abuja-2026");
if (!fair?.sources?.some(source => source.href.includes("/register/")) ||
    !fair?.sources?.some(source => source.href.includes("visitabuja.org/events/"))) {
  errors.push("Abuja food fair: official attendee registration and conflicting calendar sources missing");
}
for (const [slug, expectedSource] of [
  ["becheve-nature-reserve", "https://ncfnigeria.org/forest-green-recovery-nigeria/"],
  ["fct-exhibition-pavilion-food-fair-2026", "https://afritraditionalfoodfair.org/"],
] as const) {
  const place = explorePlaces.find(item => item.slug === slug);
  if (place?.source.href !== expectedSource || place.checkedAt !== "2026-10-16") {
    errors.push(`${slug}: mapped place source or review date has regressed`);
  }
}


const gashaka = exploreGuides.find(item => item.slug === "gashaka-gumti-national-park");
if (!gashaka ||
    !gashaka.sources?.some(item => item.href === "https://whc.unesco.org/en/tentativelists/6918/") ||
    !gashaka.intro.some(text => text.includes("5,907") && text.includes("6,731") && text.includes("differ")) ||
    !gashaka.planning.some(item => item.label.includes("2025 UNESCO nomination") && item.detail.includes("not a ranger-led tour schedule"))) {
  errors.push("gashaka-gumti-national-park: verified 2025 UNESCO nomination or conflicting area clarification missing");
}

for (const place of explorePlaces) {
  if (placeSlugs.has(place.slug)) errors.push(`duplicate place slug: ${place.slug}`);
  placeSlugs.add(place.slug);
  if (!guideSlugs.has(place.guideSlug)) errors.push(`${place.slug}: unknown guide ${place.guideSlug}`);
  if (!place.address.trim()) errors.push(`${place.slug}: missing address`);
  if (!place.cost.trim()) errors.push(`${place.slug}: missing cost guidance`);
  if (!/^2026-\d{2}-\d{2}$/.test(place.checkedAt)) errors.push(`${place.slug}: invalid checkedAt`);
  if (place.kind === "restaurant" && !place.cost.includes("₦") && !/price|menu|cost/i.test(place.cost)) {
    errors.push(`${place.slug}: restaurant needs useful price/cost guidance`);
  }
  if (!place.source?.href) errors.push(`${place.slug}: every published place needs a verification source`);
  else if (!place.source.href.startsWith("https://")) errors.push(`${place.slug}: source must use https`);
}

if (errors.length) {
  console.error("Explore content validation failed:\n" + errors.map((error) => "- " + error).join("\n"));
  process.exit(1);
}

await Promise.all([
  import("../app/explore/page"),
  import("../app/explore/[slug]/page"),
  import("../app/explore/events/page"),
]);

console.log(`Explore content OK: ${exploreGuides.length} guides, ${explorePlaces.length} mapped places.`);
