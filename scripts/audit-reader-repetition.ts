/**
 * Read-only across-pillar repetition inventory. Catalogue fields are inspected
 * without claiming that source records alone prove actual rendered duplication.
 * Run: npm run audit:repetition [-- --json]
 */
import { collectVoiceCorpus } from "../lib/editorial-voice-corpus";
import { collectPublicPageVoice } from "./public-page-voice-corpus";
import { publicServices } from "../lib/data";
import { exploreGuides } from "../lib/explore";
import { jobOpportunities, isIndexableJobOpportunity } from "../lib/jobs";
import { entertainmentTitles } from "../lib/entertainment";
import { seriesTitles } from "../lib/series";
import { indexableYouTubeMovies } from "../lib/youtube-library";
import { leadAlreadyStatesFee, uniqueIntroParagraphs, uniqueSupportingStatements } from "../lib/reader-content-dedup";

type Passage = { pillar: string; url: string; recordKind: string; text: string };
function comparable(value: string) {
  return value.toLocaleLowerCase("en").replace(/[^\p{L}\p{N}]+/gu, " ").replace(/\s+/g, " ").trim();
}

export function findDuplicatePassages(passages: Passage[]) {
  const grouped = new Map<string, Map<string, Passage[]>>();
  for (const entry of passages) {
    const normalized = comparable(entry.text);
    if (normalized.length < 85) continue;
    const byText = grouped.get(entry.url) ?? new Map<string, Passage[]>();
    byText.set(normalized, [...(byText.get(normalized) ?? []), entry]);
    grouped.set(entry.url, byText);
  }
  return [...grouped].flatMap(([url, phrases]) => [...phrases.values()]
    .filter((entries) => entries.length > 1)
    .map((entries) => ({
      url, pillar: entries[0].pillar, appearances: entries.length,
      recordKinds: [...new Set(entries.map((entry) => entry.recordKind))],
      sample: entries[0].text.slice(0, 210),
    }))).sort((a, b) => b.appearances - a.appearances || a.url.localeCompare(b.url));
}

/**
 * Same substantive paragraph reused on different canonical URLs.
 * This is an editorial REVIEW LEAD, not a plagiarism finding. Agency
 * disclaimers and legitimately identical legal text can be appropriate.
 */
export function findCrossPageDuplicatePassages(passages: Passage[]) {
  const groups = new Map<string, Passage[]>();
  for (const passage of passages) {
    const normalized = comparable(passage.text);
    if (normalized.length < 85) continue;
    groups.set(normalized, [...(groups.get(normalized) ?? []), passage]);
  }
  return [...groups.values()].flatMap((group) => {
    const byUrl = new Map<string, Passage>();
    for (const passage of group) if (!byUrl.has(passage.url)) byUrl.set(passage.url, passage);
    if (byUrl.size < 2) return [];
    const distinct = [...byUrl.values()];
    return [{
      affectedUrls: distinct.length,
      urls: distinct.map(({ url }) => url).sort(),
      pillars: [...new Set(distinct.map(({ pillar }) => pillar))].sort(),
      recordKinds: [...new Set(distinct.map(({ recordKind }) => recordKind))].sort(),
      sample: distinct[0].text.slice(0, 210),
      interpretation: "Needs editorial review; exact shared prose across URLs is not by itself copied-content proof.",
    }];
  }).sort((a, b) => b.affectedUrls - a.affectedUrls || a.urls[0].localeCompare(b.urls[0]));
}

export function auditPublicCatalogues() {
  const records = [...collectVoiceCorpus(), ...collectPublicPageVoice()];
  const seenPages = new Map<string, string>();
  const paragraphs: Passage[] = [];
  for (const record of records) {
    seenPages.set(record.url.split("#")[0], record.pillar);
    for (const text of record.prose.split(/\n\n+/g)) {
      if (!text.trim()) continue;
      paragraphs.push({ pillar: record.pillar, url: record.url.split("#")[0], recordKind: record.kind, text: text.trim() });
    }
  }
  const duplicates = findDuplicatePassages(paragraphs);
  const crossPageDuplicates = findCrossPageDuplicatePassages(paragraphs);
  // Separate publication-relevant canonical routes from nonindexable directory
  // discovery records; large shared career-portal templates are intentionally
  // kept out of Google indexing and must not dominate the AdSense priority list.
  const knownIndexableRoutes = new Set([
    ...publicServices.map(s => "/services/" + s.slug),
    ...exploreGuides.map(g => "/explore/" + g.slug),
    ...entertainmentTitles.map(m => "/entertainment/movies/" + m.slug),
    ...seriesTitles.map(s => "/entertainment/series/" + s.slug),
    ...jobOpportunities.filter(isIndexableJobOpportunity).map(j => "/jobs/" + j.slug),
    ...indexableYouTubeMovies.map(m => "/entertainment/youtube/" + m.videoId),
  ]);
  const indexableCrossPageDuplicates = findCrossPageDuplicatePassages(
    paragraphs.filter(p => knownIndexableRoutes.has(p.url)),
  );
  const presentationDedup = {
    serviceLeadsWithExistingFee: publicServices.filter((entry) =>
      leadAlreadyStatesFee(entry.summary, entry.feeLabel)).length,
    travelIntroParagraphsSuppressed: exploreGuides.reduce((total, guide) =>
      total + guide.intro.length - uniqueIntroParagraphs(guide.summary, guide.intro).length, 0),
    jobSourceNotesSuppressed: jobOpportunities.reduce((total, job) =>
      total + job.sourceNotes.length - uniqueSupportingStatements(
        [job.summary, job.nextMilestone ?? "", job.feeNote, ...job.qualifications,
          ...job.requirements, ...job.documents, ...job.applicationSteps],
        job.sourceNotes,
      ).length, 0),
  };
  const byPillar = [...new Set(seenPages.values())].map((pillar) => ({
    pillar, urls: [...seenPages.values()].filter((value) => value === pillar).length,
    exactRepeatFindings: duplicates.filter((row) => row.pillar === pillar).length,
  }));
  return {
    sourceRecordsInspected: records.length,
    uniqueCataloguedRoutes: seenPages.size,
    exactRepeatFindings: duplicates.length,
    crossPageRepeatFindings: crossPageDuplicates.length,
    crossPageDuplicates,
    knownIndexableCataloguedRoutes: [...seenPages.keys()].filter(url => knownIndexableRoutes.has(url)).length,
    indexableCrossPageRepeatFindings: indexableCrossPageDuplicates.length,
    indexableCrossPageDuplicates,
    presentationDedup,
    byPillar,
    duplicates,
    limitation: "Static catalogue and public-page prose inventory, not a full HTML crawl. Shared passages, including legitimate common legal text, are editorial review leads only; external copying, licensing and rendered JSX require separate proof. Findings never trigger automatic deletion.",
  };
}

if (process.argv[1]?.endsWith("audit-reader-repetition.ts")) {
  const result = auditPublicCatalogues();
  if (process.argv.includes("--json")) console.log(JSON.stringify(result, null, 2));
  else {
    console.log("PAGE_REPETITION_AUDIT " + JSON.stringify({
      sourceRecordsInspected: result.sourceRecordsInspected,
      uniqueCataloguedRoutes: result.uniqueCataloguedRoutes,
      exactRepeatFindings: result.exactRepeatFindings, crossPageRepeatFindings: result.crossPageRepeatFindings,
      indexableCrossPageRepeatFindings: result.indexableCrossPageRepeatFindings,
      knownIndexableCataloguedRoutes: result.knownIndexableCataloguedRoutes,
      presentationDedup: result.presentationDedup, byPillar: result.byPillar,
      limitation: result.limitation,
    }));
    for (const row of result.indexableCrossPageDuplicates.slice(0, 15)) {
      console.log("INDEXABLE_CROSS_PAGE_REVIEW " + row.affectedUrls + " routes " + row.urls.slice(0, 5).join(", ") + ": " + row.sample);
    }
    for (const row of result.crossPageDuplicates.slice(0, 20)) {
      console.log("CROSS_PAGE_REVIEW " + row.affectedUrls + " routes " + row.urls.slice(0, 5).join(", ") + ": " + row.sample);
    }
    for (const row of result.duplicates.slice(0, 35)) {
      console.log(row.url + " (" + row.appearances + " copies, " + row.recordKinds.join(", ") + "): " + row.sample);
    }
  }
}
