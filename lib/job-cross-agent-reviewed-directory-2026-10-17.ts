import type { CareerOpportunity } from "@/lib/jobs";
import { nineCareerIssuerDecisions20261017 } from "@/lib/job-nine-issuer-application-decisions-2026-10-17";
import { twentyIssuerCareerRoutes20261017 } from "@/lib/job-issuer-twenty-reviews-2026-10-17";
import { remainingIssuerResearch20261017 } from "@/lib/job-remaining-issuer-research-2026-10-17";

/**
 * Match an original issuer's previously completed, date-stamped review
 * against the FINAL displayed page record, not merely a registry membership.
 * Other review categories (open deadline, JobPosting provenance and human
 * source checks) are never affected. The original issuer review is not
 * a guarantee that a current vacancy or its form remains available.
 */
export function hasDocumentedCrossAgentIssuerReview(job: CareerOpportunity, today: string): boolean {
  if (job.kind !== "career-page" || job.status !== "career-page" || job.deadline || job.posting) return false;
  const validDate = (iso: string): boolean => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(today) || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
    const age = (Date.parse(today + "T00:00:00Z") - Date.parse(iso + "T00:00:00Z")) / 86400000;
    return Number.isFinite(age) && age >= 0 && age <= 21;
  };
  if (!validDate(job.verifiedAt) || job.requirements.length < 3 || job.qualifications.length < 2 ||
      job.applicationSteps.length < 5 || job.sourceNotes.length < 2) return false;
  const normalized = job.applicationSteps.map(step => step.trim().toLowerCase());
  if (new Set(normalized).size !== normalized.length) return false;
  if (!job.applicationSteps.every(step => step.length >= 35) ||
      !job.applicationSteps.some(step => /apply|submit|vacanc|job|recruit|opportunit|position/i.test(step))) return false;
  if (!job.applicationSteps.some(step => /fee|pay|intermediar|unauthoris|shortlist|recruitment scam/i.test(step)))
    return false;

  const proofSource = (url: string): boolean =>
    url.startsWith("https://") && job.sources.some(source => source.url === url && validDate(source.lastChecked));
  const actionMatches = (steps: readonly string[]): boolean =>
    steps.length === 3 && steps.every(step => step.length >= 45 && job.applicationSteps.includes(step));

  const twenty = twentyIssuerCareerRoutes20261017[job.slug];
  if (twenty) return (
    job.officialUrl === twenty.source &&
    job.summary === twenty.answer && twenty.answer.length >= 160 &&
    twenty.caveat.length >= 80 && job.nextMilestone === twenty.caveat &&
    job.sourceNotes.includes(twenty.caveat) &&
    actionMatches(twenty.steps) && proofSource(twenty.source)
  );

  const remaining = remainingIssuerResearch20261017[job.slug];
  if (remaining) return (
    job.officialUrl === remaining.originalUrl &&
    job.summary === remaining.answer && remaining.answer.length >= 160 &&
    remaining.caution.length >= 80 && job.sourceNotes.includes(remaining.caution) &&
    actionMatches(remaining.actions) &&
    proofSource(remaining.evidenceUrl ?? remaining.originalUrl) &&
    proofSource(remaining.originalUrl)
  );

  const nine = nineCareerIssuerDecisions20261017[job.slug];
  if (nine) return (
    job.officialUrl === nine.originalUrl &&
    job.summary === nine.answer && nine.answer.length >= 160 &&
    nine.caution.length >= 80 && job.sourceNotes.includes(nine.caution) &&
    actionMatches(nine.actions) &&
    proofSource(nine.evidenceUrl)
  );
  return false;
}
