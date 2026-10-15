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

  const places = getExplorePlacesForGuide(guide.slug);
  if (places.length < 3) errors.push(`${guide.slug}: expected at least 3 mapped places, found ${places.length}`);
}

// Four pages were verified individually against current primary heritage,
// state tourism and official travel-security material. Preserve those source
// routes and materially useful advice rather than accepting empty padding.
const independentlyCheckedDestinations = [
  { slug: "agulu-lake-guide", hosts: ["caica.anambrastate.gov.ng", "mocet.anambrastate.gov.ng"], words: 340 },
  { slug: "sukur-hidi-palace-guide", hosts: ["whc.unesco.org", "museum.ng", "smartraveller.gov.au"], words: 380 },
  { slug: "moremi-statue-ile-ife-guide", hosts: ["oonirisa.org", "osunstate.gov.ng"], words: 330 },
  { slug: "nigeria-archaeology-guide", hosts: ["museum.ng", "whc.unesco.org"], words: 360 },
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
