import type { CareerOpportunity } from "@/lib/jobs";
import { twentyIssuerCareerRoutes20261017 } from "@/lib/job-issuer-twenty-reviews-2026-10-17";
import { remainingIssuerResearch20261017 } from "@/lib/job-remaining-issuer-research-2026-10-17";
import { nineCareerIssuerDecisions20261017 } from "@/lib/job-nine-issuer-application-decisions-2026-10-17";

// Closure of a *specific, completed directory-depth desk review*, not proof of
// live vacancy, successful submission, copyright clearance or human approval.
// Only these three per-issuer original research registries are eligible.
// Unreviewed directories never qualify by generic text length or source count.
export const additionallyReviewedIssuerSlugs20261017 = [
  ...Object.keys(twentyIssuerCareerRoutes20261017),
  ...Object.keys(remainingIssuerResearch20261017),
  ...Object.keys(nineCareerIssuerDecisions20261017),
];

function validSourceAge(value: string, today: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !/^\d{4}-\d{2}-\d{2}$/.test(today)) return false;
  const date = Date.parse(value + "T00:00:00Z");
  const now = Date.parse(today + "T00:00:00Z");
  if (!Number.isFinite(date) || !Number.isFinite(now) ||
      new Date(date).toISOString().slice(0, 10) !== value) return false;
  const days = (now - date) / 86_400_000;
  return days >= 0 && days <= 30;
}

type Proof = {
  originalUrl: string;
  corroboratingUrl: string;
  lead: string;
  actions: readonly string[];
  qualification: string;
  sourceReviewNote: string;
};

/**
 * These proofs are grounded in the individually authored original issuer
 * review records, not in generic word count or an employer portal's existence.
 * Each published page must still match the corresponding reviewed evidence.
 */
function findProof(slug: string): Proof | null {
  const twenty = twentyIssuerCareerRoutes20261017[slug];
  if (twenty) return {
    originalUrl: twenty.source,
    corroboratingUrl: twenty.source,
    lead: twenty.answer,
    actions: twenty.steps,
    qualification: twenty.caveat,
    sourceReviewNote: "Specific career/application distinctions checked against this original issuer page on 17 October 2026",
  };
  const thirteen = remainingIssuerResearch20261017[slug];
  if (thirteen) return {
    originalUrl: thirteen.originalUrl,
    corroboratingUrl: thirteen.evidenceUrl ?? thirteen.originalUrl,
    lead: thirteen.answer,
    actions: thirteen.actions,
    qualification: thirteen.caution,
    sourceReviewNote: "This review checked the employer-controlled careers source and its application distinctions",
  };
  const nine = nineCareerIssuerDecisions20261017[slug];
  if (nine) return {
    originalUrl: nine.originalUrl,
    corroboratingUrl: nine.evidenceUrl,
    lead: nine.answer,
    actions: nine.actions,
    qualification: nine.caution,
    sourceReviewNote: "Employer-owned hiring instructions reviewed 17 October 2026",
  };
  return null;
}

export function hasSourceMatchedAdditionalIssuerReview(item: CareerOpportunity, today: string): boolean {
  const proof = findProof(item.slug);
  if (!proof || item.kind !== "career-page" || item.status !== "career-page" ||
      item.deadline !== undefined || item.posting || item.jobPostingAuthorization ||
      item.officialUrl !== proof.originalUrl) return false;
  // Do not let a later date or a dated general board page substitute for the
  // original reviewed record AND the separate supporting issuer reference.
  if (!validSourceAge(item.verifiedAt, today) ||
      ![proof.originalUrl, proof.corroboratingUrl].every(url =>
        item.sources.some(source => source.url === url && validSourceAge(source.lastChecked, today))))
    return false;
  if (item.summary !== proof.lead || proof.lead.length < 140 ||
      proof.qualification.length < 75 || proof.actions.length !== 3 ||
      proof.actions.some(step => step.length < 55)) return false;

  const actions = item.applicationSteps;
  if (actions.length < 5 ||
      new Set(actions.map(step => step.trim().toLowerCase())).size !== actions.length ||
      proof.actions.some(step => !actions.includes(step)) ||
      actions.filter(step => step.length >= 55).length < 4 ||
      item.qualifications.length < 2 || item.requirements.length < 4)
    return false;
  // The publisher's exact original caution and source-review provenance must
  // remain present; replacing them with a generic reassurance reopens review.
  if (!item.sourceNotes.includes(proof.qualification) ||
      !item.sourceNotes.some(note => note.includes(proof.sourceReviewNote)) ||
      !item.statusLabel || /application(s)? open|currently hiring|open vacancy/i.test(item.statusLabel))
    return false;
  return true;
}
