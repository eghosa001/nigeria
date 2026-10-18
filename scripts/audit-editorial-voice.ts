/**
 * Humanizer editorial triage. READ-ONLY and non-blocking by design.
 * For real editors: AI-ish wording is a *review signal*, not proof of authorship,
 * factual inaccuracy, or AdSense quality status.
 *
 * npm run audit:voice
 * npm run audit:voice -- --summary
 */
import { auditEditorialVoice } from "../lib/editorial-voice-audit";
import { publicServices } from "../lib/data";
import { entertainmentTitles } from "../lib/entertainment";
import { exploreGuides } from "../lib/explore";
import { jobOpportunities } from "../lib/jobs";

type Pillar = "Movies & Entertainment" | "Services" | "Tour Nigeria" | "Jobs & Careers";
type Record = { pillar: Pillar; slug: string; prose: string };
const records: Record[] = [
  ...entertainmentTitles.map(item => ({
    pillar: "Movies & Entertainment" as const,
    slug: "/entertainment/movies/" + item.slug,
    prose: [item.synopsis, ...item.watchLinks.map(link => link.note)].join(" "),
  })),
  ...publicServices.map(item => ({
    pillar: "Services" as const,
    slug: "/services/" + item.slug,
    prose: [item.summary, ...item.steps, ...item.notes].join(" "),
  })),
  ...exploreGuides.map(item => ({
    pillar: "Tour Nigeria" as const,
    slug: "/explore/" + item.slug,
    prose: [item.summary, ...item.intro, ...item.highlights.map(x => x.detail), ...item.planning.map(x => x.detail)].join(" "),
  })),
  ...jobOpportunities.map(item => ({
    pillar: "Jobs & Careers" as const,
    slug: "/jobs/" + item.slug,
    prose: [item.summary, ...item.applicationSteps, ...item.sourceNotes].join(" "),
  })),
];
const candidates = records.map(item => {
  const signals = auditEditorialVoice(item.prose);
  return { url: item.slug, pillar: item.pillar, signals, count: signals.reduce((sum, x) => sum + x.occurrences, 0) };
}).filter(item => item.count > 0);
const pillars: Pillar[] = ["Movies & Entertainment", "Services", "Tour Nigeria", "Jobs & Careers"];
const summary = pillars.map(pillar => ({
  pillar,
  inspected: records.filter(row => row.pillar === pillar).length,
  flagged: candidates.filter(row => row.pillar === pillar).length,
}));
if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ method: "heuristic shortlist, not AI detection", summary, candidates: candidates.sort((a,b)=>b.count-a.count).slice(0, 40) }, null, 2));
} else {
  console.log("MyNigeriaGuide humanization review — phrases needing editorial judgment");
  for (const line of summary) console.log("  " + line.pillar + ": " + line.flagged + " / " + line.inspected + " candidates");
  if (!process.argv.includes("--summary")) {
    for (const line of [...candidates].sort((a,b)=>b.count-a.count).slice(0, 12)) {
      console.log("  " + line.url + " [" + line.signals.map(s => s.label + " ×" + s.occurrences).join("; ") + "]");
    }
  }
  console.log("Heuristics do not assess originality, accuracy, authorship or approval. Review source context before editing.");
}
