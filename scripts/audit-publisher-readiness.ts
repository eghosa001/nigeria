/**
 * Publisher-readiness inventory. READ-ONLY. Source-body word counts exclude
 * templates, navigation, badges and auto-generated FAQs. They are NOT a
 * rendered-page word count or a verdict on usefulness, originality or approval.
 *
 * Run: npm run audit:publisher
 *      npm run audit:publisher -- --json
 */
import { publicServices } from "../lib/data";
import { entertainmentTitles } from "../lib/entertainment";
import { seriesTitles } from "../lib/series";
import { indexableYouTubeMovies, youtubeMovieLibrary } from "../lib/youtube-library";
import { exploreGuides } from "../lib/explore";
import { explorePlaces } from "../lib/explore-places";
import { assessEditorialCandidate, sortEditorialCandidates } from "../lib/editorial-triage";
import { jobOpportunities } from "../lib/jobs";
import { isIndexableJobOpportunity } from "../lib/jobs";
import { readFileSync, existsSync } from "node:fs";

type Kind = "Services" | "Tour" | "Movies" | "Series" | "Jobs" | "YouTube";
type RecordAudit = {
  pillar: Kind;
  url: string;
  title: string;
  words: number;
  sourceCount: number;
  issues: string[];
  pageType: "editorial-guide" | "profile" | "listing";
};

function words(...parts: (string | undefined | null)[]): number {
  return (parts.join(" ").match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) ?? []).length;
}
function fragments(...parts: Array<string | undefined | null | Array<string | undefined | null>>): string[] {
  return parts.flatMap((value) => Array.isArray(value) ? value : [value])
    .filter((value): value is string => typeof value === "string");
}

const rows: RecordAudit[] = [];
function add(pillar: Kind, url: string, title: string, parts: string[], sources: number, pageType: RecordAudit["pageType"], issues: string[] = []) {
  rows.push({ pillar, url, title, words: words(...parts), sourceCount: sources, issues, pageType });
}

for (const s of publicServices) {
  add("Services", "/services/" + s.slug, s.title,
    fragments(s.summary, s.steps, s.requirements, s.notes, s.feeNote, s.timeline),
    s.sources.length, "editorial-guide",
    [...(s.sources.length === 1 ? ["single-primary-source-review"] : []),
      ...(s.status === "conflict" ? ["official-information-conflict"] : []),
      ...(!s.timeline ? ["timeline-not-published"] : [])]);
}
for (const g of exploreGuides) {
  add("Tour", "/explore/" + g.slug, g.title,
    fragments(g.summary, g.intro, g.highlights.map((h) => h.detail),
      g.planning.map((p) => p.detail)),
    g.source ? 1 : 0, "editorial-guide",
    g.source ? ["single-primary-source-review"] : ["no-source"]);
}
for (const m of entertainmentTitles) {
  const citations = (m.references?.length ?? 0) + m.watchLinks.length + (m.trailer ? 1 : 0) +
    (m.artwork || m.sourcePreview ? 1 : 0);
  add("Movies", "/entertainment/movies/" + m.slug, m.title,
    fragments(m.synopsis, m.watchLinks.map((x) => x.note), m.references?.map((x) => x.note)),
    citations, "profile", [...(citations ? [] : ["no-source"]),
      ...(!m.cast.length && !(m.subjects?.length ?? 0) ? ["missing-cast-verification"] : [])]);
}
for (const s of seriesTitles) {
  add("Series", "/entertainment/series/" + s.slug, s.title,
    fragments(s.synopsis, s.episodeInfo, s.premiereLabel, s.watchLinks.map((x) => x.note)),
    s.sources.length, "profile", s.sources.length ? [] : ["no-source"]);
}
for (const j of jobOpportunities.filter(isIndexableJobOpportunity)) {
  add("Jobs", "/jobs/" + j.slug, j.title,
    fragments(j.summary, j.qualifications, j.requirements, j.documents,
      j.applicationSteps, j.feeNote, j.nextMilestone, j.sourceNotes),
    j.sources.length, "listing",
    [...(j.sources.length === 1 ? ["single-primary-source-review"] : []),
      ...(j.status === "career-page" ? ["career-page-depth-review"] : [])]);
}
for (const m of indexableYouTubeMovies.filter((movie) => movie.source !== "curated")) {
  add("YouTube", "/entertainment/youtube/" + m.videoId, m.title,
    fragments(m.synopsis), m.videoUrl ? 1 : 0, "profile",
    ["video-detail-originality-review"]);
}

const exactBodies = new Map<string, string[]>();
for (const row of rows) {
  // Only exact same descriptive summary represented by title+kind is detectable
  // from records; external plagiarism and semantic near-duplicates need review.
  const key = row.pillar + ":" + row.title.toLocaleLowerCase("en").replace(/[^a-z0-9]+/g, "");
  exactBodies.set(key, [...(exactBodies.get(key) ?? []), row.url]);
}
const duplicateTitles = [...exactBodies.values()].filter((urls) => urls.length > 1);
const suspiciousRepeatedPhrases = /\b(?:lorem ipsum|as an ai language model|insert details here|add your text|coming soon: content)\b/i;
const repeatedFlags: Array<{url: string; issue: string}> = [];
for (const row of rows) {
  if (suspiciousRepeatedPhrases.test(row.title)) repeatedFlags.push({ url: row.url, issue: "placeholder title" });
}

const byPillar = (["Services", "Tour", "Movies", "Series", "Jobs", "YouTube"] as Kind[])
  .map((name) => {
    const group = rows.filter((r) => r.pillar === name);
    const sorted = group.map((r) => r.words).sort((a, b) => a - b);
    return {
      pillar: name,
      records: group.length,
      below150: group.filter((r) => r.words < 150).length,
      below300: group.filter((r) => r.words < 300).length,
      atLeast500: group.filter((r) => r.words > 500).length,
      atLeast800: group.filter((r) => r.words >= 800).length,
      medianSourceWords: sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0,
      singleSource: group.filter((r) => r.sourceCount === 1).length,
      sourceMissing: group.filter((r) => r.sourceCount === 0).length,
    };
  });
const trustFiles = [
  "app/about/page.tsx", "app/privacy/page.tsx", "app/terms/page.tsx",
  "app/contact/page.tsx", "app/editorial-policy/page.tsx", "app/corrections/page.tsx",
];
const missingTrustPages = trustFiles.filter((file) => !existsSync(file));
// The named queue is a review shortlist, not a claim that any external fact is wrong.
// Preserve the full catalogue and distinguish record fields from rendered-page depth.
const reviewDates = new Map<string, string>([
  ...publicServices.map((s) => ["/services/" + s.slug, s.lastVerified] as const),
  ...exploreGuides.map((g) => ["/explore/" + g.slug, g.lastReviewed] as const),
  ...jobOpportunities.filter(isIndexableJobOpportunity).map((j) => ["/jobs/" + j.slug, j.verifiedAt] as const),
]);
const assessedRecords = rows.map((record) => assessEditorialCandidate({
  ...record,
  checkedAt: reviewDates.get(record.url),
}, new Date().toISOString().slice(0, 10)));
const reviewQueueByPillar = Object.fromEntries(
  (["Services", "Tour", "Movies", "Series", "Jobs", "YouTube"] as Kind[]).map((pillar) => [
    pillar,
    sortEditorialCandidates(assessedRecords.filter((r) => r.pillar === pillar && r.reviewFlags.length > 0))
      .slice(0, 15).map(({ url, title, words, sourceCount, checkedAt, priority, reviewFlags, score }) =>
        ({ url, title, words, sourceCount, checkedAt, priority, reviewFlags, score })),
  ]),
);
const placeCandidates = explorePlaces.map((place) => assessEditorialCandidate({
  pillar: "Tour",
  url: "/explore/" + place.guideSlug,
  title: place.name + " [" + place.slug + "]",
  words: words(place.summary, place.cost, place.costNote, place.hours),
  sourceCount: place.source?.href ? 1 : 0,
  pageType: "profile",
  issues: !place.address.trim() ? ["missing-place-address"] : [],
  checkedAt: place.checkedAt,
}, new Date().toISOString().slice(0, 10)));
const tourPlaceReviewQueue = sortEditorialCandidates(placeCandidates.filter((r) =>
  r.reviewFlags.some((flag) => flag !== "single-source-check")))
  .slice(0, 20).map(({ url, title, words, sourceCount, checkedAt, priority, reviewFlags, score }) =>
    ({ url, title, words, sourceCount, checkedAt, priority, reviewFlags, score }));


// Review freshness across all source-backed catalogs instead of relying on
// word count as a proxy for trust. These are candidates for a new source check,
// not an automatic claim that an otherwise evergreen article is inaccurate.
const auditDate = new Date().toISOString().slice(0, 10);
const staleSourceReviewCandidates = rows
  .flatMap((row) => {
    const checkedAt = reviewDates.get(row.url);
    if (!checkedAt || !/^\d{4}-\d{2}-\d{2}$/.test(checkedAt)) return [];
    const checkedMillis = Date.parse(checkedAt + "T00:00:00Z");
    const ageDays = Math.floor((Date.parse(auditDate + "T00:00:00Z") - checkedMillis) / 86_400_000);
    return Number.isFinite(ageDays) && ageDays > 30
      ? [{ pillar: row.pillar, url: row.url, checkedAt, ageDays }]
      : [];
  })
  .sort((a, b) => b.ageDays - a.ageDays)
  .slice(0, 100);

const audit = {
  date: new Date().toISOString().slice(0, 10),
  methodology: "Approximate authored record-field words; NOT actual rendered article length or human editorial review",
  uniqueCatalogUrls: rows.length,
  byPillar,
  reviewQueueByPillar,
  staleSourceReviewCandidates,
  staleSourceReviewCandidateCount: rows.filter((r) => {
    const checkedAt = reviewDates.get(r.url);
    return checkedAt && /^\d{4}-\d{2}-\d{2}$/.test(checkedAt) &&
      Date.parse(auditDate + "T00:00:00Z") - Date.parse(checkedAt + "T00:00:00Z") > 30 * 86_400_000;
  }).length,
  tourPlaceReviewQueue,
  triageCaveat: "Flags are automated screening candidates, not proof of factual inaccuracy, plagiarism, thin rendered pages, or failed human review.",
  duplicateSameTitleWithinPillar: duplicateTitles.slice(0, 25),
  duplicateTitleGroupCount: duplicateTitles.length,
  placeholderTitleFlags: repeatedFlags,
  trustPageFilesMissing: missingTrustPages,
  catalogShortestCandidates: rows.filter((r) => r.pageType === "editorial-guide")
    .sort((a, b) => a.words - b.words).slice(0, 20)
    .map(({ pillar, url, words, sourceCount, issues }) => ({ pillar, url, words, sourceCount, issues })),
  classifiedCounts: {
    editorialGuides: rows.filter((r) => r.pageType === "editorial-guide").length,
    referenceProfiles: rows.filter((r) => r.pageType === "profile").length,
    listings: rows.filter((r) => r.pageType === "listing").length,
    youtubeRecordsVisible: youtubeMovieLibrary.length,
    youtubeIndexable: indexableYouTubeMovies.length,
  },
  manualChecksNotProven: [
    "Actual rendered article word counts and reader-visible originality",
    "Plagiarism or copyright clearance, rights for every image, and factual correctness",
    "Named author attribution and human editorial review",
    "Search-engine indexation, organic traffic, Ezoic application approval, Google MCM and consent compliance",
    "Real phone layout, page speed, source URL reachability and ad density"
  ],
};
if (process.argv.includes("--json")) {
  process.stdout.write(JSON.stringify(audit, null, 2) + "\n");
} else {
  console.log("MyNigeriaGuide publisher-readiness record audit " + audit.date);
  console.log("Method: " + audit.methodology + ".");
  console.log("Pillar | pages | <150 | <300 | >500 | >=800 | median | one-source | zero-source");
  for (const s of byPillar)
    console.log(`${s.pillar} | ${s.records} | ${s.below150} | ${s.below300} | ${s.atLeast500} | ${s.atLeast800} | ${s.medianSourceWords} | ${s.singleSource} | ${s.sourceMissing}`);
  console.log("Exact same-title groups in one pillar:", duplicateTitles.length);
  console.log("Trust-page files missing:", missingTrustPages.join(", ") || "none");
  console.log("Shortest authored guide records:", JSON.stringify(audit.catalogShortestCandidates));
  console.log("Priority named editorial queues:", JSON.stringify(reviewQueueByPillar));
  console.log("Priority named Tour place queue:", JSON.stringify(tourPlaceReviewQueue));
  console.log("Manual review still required:", audit.manualChecksNotProven.join("; "));
}
