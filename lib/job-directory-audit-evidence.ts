import type { CareerOpportunity } from "@/lib/jobs";

// Record-only evidence triage, not a live employer check and not a waiver of
// the publication audit's employer-directory-depth editorial-review flag.
type PortalRecord = Pick<CareerOpportunity,
  "slug" | "organization" | "kind" | "status" | "summary" | "officialUrl" |
  "applicationSteps" | "sourceNotes" | "sources" | "feeNote">;

function sourceAgeDays(date: string, today: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{4}-\d{2}-\d{2}$/.test(today)) return null;
  const day = Date.parse(date + "T00:00:00Z");
  const current = Date.parse(today + "T00:00:00Z");
  if (!Number.isFinite(day) || !Number.isFinite(current) ||
      new Date(day).toISOString().slice(0, 10) !== date) return null;
  const age = Math.floor((current - day) / 86_400_000);
  return age >= 0 ? age : null;
}

export function inspectEmployerDirectoryEvidence(job: PortalRecord, today: string) {
  if (job.kind !== "career-page") return null;
  const datedSources = job.sources
    .map(source => ({ url: source.url, date: source.lastChecked, ageDays: sourceAgeDays(source.lastChecked, today) }))
    .filter((source): source is { url: string; date: string; ageDays: number } => source.ageDays !== null);
  const latest = [...datedSources].sort((a, b) => a.ageDays - b.ageDays)[0];
  const allText = [job.summary, ...job.sourceNotes, ...job.applicationSteps].join(" ");
  const checks = {
    // These are signals visible in stored text, not proof the instructions are true.
    hasRecentDatedIssuerEvidence: datedSources.some(source => source.ageDays <= 14),
    distinguishesDirectoryFromVacancy: /(?:not (?:a |an |the )?(?:open |current |specific |live |actual )?(?:vacancy|job|application)|does not (?:prove|establish|imply|mean)|no (?:specific |single |current )?(?:vacancy|job|recruitment)|(?:role|opening|vacancy).{0,70}(?:confirm|verify|check|rather than|before applying))/i.test(allText),
    providesRoleSelectionAction: job.applicationSteps.some(step =>
      /(?:exact|named|specific|selected|individual|current).{0,65}(?:role|vacancy|requisition|opening)|(?:role|vacancy|requisition|opening).{0,65}(?:exact|named|specific|selected|individual|current)/i.test(step)),
    warnsAboutRecruitmentPayment: /(?:not pay|never pay|no (?:recruitment |application )?fee|does not (?:charge|request payment)|free of charge|scam|fraud|unofficial intermediary)/i.test(job.feeNote + " " + allText),
  };
  const reviewFocus: string[] = [];
  if (!job.sources.length) reviewFocus.push("record-source-missing");
  else if (!datedSources.length) reviewFocus.push("no-valid-recorded-source-date");
  else if (!checks.hasRecentDatedIssuerEvidence) reviewFocus.push("issuer-evidence-recheck-needed");
  if (!checks.distinguishesDirectoryFromVacancy) reviewFocus.push("directory-vacancy-distinction-review");
  if (!checks.providesRoleSelectionAction) reviewFocus.push("role-selection-instructions-review");
  if (!checks.warnsAboutRecruitmentPayment) reviewFocus.push("recruitment-fraud-guidance-review");
  return {
    slug: job.slug,
    url: "/jobs/" + job.slug,
    sourceCount: job.sources.length,
    lastRecordedSourceCheck: latest?.date ?? null,
    latestRecordedSourceAgeDays: latest?.ageDays ?? null,
    checks,
    reviewFocus,
    // Applies even when all superficial record checks pass.
    requiresHumanSourceAndOriginalitySignoff: true,
  };
}
