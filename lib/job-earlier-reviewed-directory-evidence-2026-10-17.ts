import type { CareerOpportunity } from "@/lib/jobs";
import { checkedIssuerCareers20261016 } from "@/lib/job-issuer-more-reviewed-2026-10-16";
import { issuerPortalEvidence20261016, issuerPortalFollowUp20261016 } from "@/lib/job-issuer-portals-reviewed-2026-10-16";
import { careerEvidence } from "@/lib/job-issuer-career-research-2026-10-16-b";

/**
 * Previous agents have already researched these 59 career directories.
 * Reconcile a finding only if the CURRENT rendered record preserves the
 * exact issuer-origin details, source, warning and five individually authored
 * application decisions. Old, unsupported or altered records stay flagged.
 */
export function hasVerifiedEarlierIssuerDirectoryReview(job: CareerOpportunity, now: string): boolean {
  if (job.kind !== "career-page" || job.status !== "career-page" || job.deadline || job.posting) return false;
  const sourceAgeValid = (date: string): boolean => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(now) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
    const days=(Date.parse(now+"T00:00:00Z")-Date.parse(date+"T00:00:00Z"))/86400000;
    return Number.isFinite(days) && days>=0 && days<=21;
  };
  if (!sourceAgeValid(job.verifiedAt) || job.requirements.length<3 ||
      job.qualifications.length<2 || job.applicationSteps.length<5 ||
      job.summary.length<140 || job.sourceNotes.length<1) return false;
  if (new Set(job.applicationSteps.map(x=>x.trim().toLowerCase())).size!==job.applicationSteps.length) return false;
  const officialEvidence = (url:string):boolean =>
    url.startsWith("https://") && job.sources.some(source=>source.url===url&&sourceAgeValid(source.lastChecked));
  const exactActions = (all: readonly string[]):boolean =>
    all.length>=5 && all.every(s=>s.length>=30 && job.applicationSteps.includes(s)) &&
    job.applicationSteps.some(s=>/job|vacanc|career|role|open|recruit|application|submit/i.test(s));

  const twentyFive=checkedIssuerCareers20261016[job.slug];
  if (twentyFive) return (
    job.officialUrl===twentyFive.url &&
    job.summary===twentyFive.lead &&
    job.sourceNotes.includes(twentyFive.guard) &&
    twentyFive.guard.length>=80 &&
    job.applicationSteps.length===twentyFive.steps.length &&
    exactActions(twentyFive.steps) &&
    officialEvidence(twentyFive.url)
  );

  const nine=careerEvidence[job.slug];
  if (nine) {
    const actions=[...nine.steps,...nine.followUp];
    return (
      job.officialUrl===nine.url &&
      job.summary===nine.answer && nine.safety.length>=80 &&
      job.sourceNotes.includes(nine.safety) &&
      nine.notes.every(s=>job.sourceNotes.includes(s)) &&
      exactActions(actions) &&
      job.applicationSteps.length===actions.length &&
      officialEvidence(nine.url)
    );
  }
  const portals=issuerPortalEvidence20261016[job.slug];
  if (portals) {
    const followUp=issuerPortalFollowUp20261016[job.slug];
    if (!followUp || followUp.length!==2) return false;
    const steps=[...portals.actions,...followUp];
    return (
      job.officialUrl===portals.sourceUrl &&
      job.summary===portals.fact &&
      job.applicationSteps.length===steps.length &&
      exactActions(steps) &&
      officialEvidence(portals.sourceUrl)
    );
  }
  return false;
}
