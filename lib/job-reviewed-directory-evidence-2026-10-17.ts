import type { CareerOpportunity } from "@/lib/jobs";
import { thirdAgentIssuerReviews20261017 } from "@/lib/job-issuer-third-agent-reviews-2026-10-17";

/**
 * Recognise a genuinely completed, issuer-specific careers-directory review.
 *
 * Unlike an employer's generic portal listing, the review must document
 * the particular employer's current state, at least five distinct useful
 * actions and a dated original-issuer source. This is NOT a successful
 * applicant submission, vacancy confirmation, copyright review or human
 * editorial sign-off. All other Jobs findings still apply independently.
 */
export function hasCompletedIssuerDirectoryReview(item: CareerOpportunity, now: string): boolean {
  const review = thirdAgentIssuerReviews20261017[item.slug];
  if (!review || item.kind !== "career-page" || item.status !== "career-page" || item.deadline || item.posting)
    return false;

  const age = (iso: string): number => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso) || iso > now) return Infinity;
    const days = (Date.parse(now + "T00:00:00Z") - Date.parse(iso + "T00:00:00Z")) / 86400000;
    return Number.isFinite(days) && days >= 0 ? days : Infinity;
  };

  if (age(item.verifiedAt) > 30 ||
      item.summary !== review.answer || item.statusLabel !== review.label ||
      review.guard.length < 90 || review.answer.length < 145) return false;
  if (item.applicationSteps.length < 5 ||
      new Set(item.applicationSteps.map(s => s.trim().toLowerCase())).size !== item.applicationSteps.length ||
      item.applicationSteps.some(s => s.trim().length < 45) ||
      review.steps.some(step => !item.applicationSteps.includes(step))) return false;
  if (item.requirements.length < 4 || item.qualifications.length < 2 ||
      !item.nextMilestone?.includes(review.guard) ||
      !item.sourceNotes.includes(review.guard) ||
      !item.sourceNotes.some(note => note.includes("Specific issuer page: " + review.url))) return false;
  const issuerSource = item.sources.find(s => s.url === review.url);
  if (!issuerSource || age(issuerSource.lastChecked) > 30) return false;
  return true;
}
