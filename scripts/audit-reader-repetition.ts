/**
 * Read-only across-pillar repetition inventory. Catalogue fields are inspected
 * without claiming that source records alone prove actual rendered duplication.
 * Run: npm run audit:repetition [-- --json]
 */
import { collectVoiceCorpus } from "../lib/editorial-voice-corpus";
import { collectPublicPageVoice } from "./public-page-voice-corpus";
import { publicServices } from "../lib/data";
import { exploreGuides } from "../lib/explore";
import { jobOpportunities } from "../lib/jobs";
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
    presentationDedup,
    byPillar,
    duplicates,
    limitation: "Static catalogue and public-page prose inventory, not a full HTML crawl. Related concepts, repeated figures and duplicated shared JSX sections require rendered-page review; findings are not automatically deleted.",
  };
}

if (process.argv[1]?.endsWith("audit-reader-repetition.ts")) {
  const result = auditPublicCatalogues();
  if (process.argv.includes("--json")) console.log(JSON.stringify(result, null, 2));
  else {
    console.log("PAGE_REPETITION_AUDIT " + JSON.stringify({
      sourceRecordsInspected: result.sourceRecordsInspected,
      uniqueCataloguedRoutes: result.uniqueCataloguedRoutes,
      exactRepeatFindings: result.exactRepeatFindings, presentationDedup: result.presentationDedup, byPillar: result.byPillar,
      limitation: result.limitation,
    }));
    for (const row of result.duplicates.slice(0, 35)) {
      console.log(row.url + " (" + row.appearances + " copies, " + row.recordKinds.join(", ") + "): " + row.sample);
    }
  }
}
