import { exploreGuides } from "../lib/explore";
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
