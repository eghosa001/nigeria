import type { CareerOpportunity } from "@/lib/jobs";

/**
 * Exact official-source desk checks, 20 October 2026.
 * Revalidation is not evidence that a candidate submitted a form.
 * This batch contains only three issuer-confirmed records; do not
 * automatically stamp the rest of the employer catalogue as refreshed.
 */
const checkedSources: Record<string, string> = {
  "unilag-professorial-chair-2026":
    "https://unilag.edu.ng/call-for-applications-for-the-senator-douye-diri-professorial-chair-in-leadership-and-good-governance-department-of-political-science/",
  "uniben-teaching-non-teaching-recruitment-2026":
    "https://news.uniben.edu/advertisement-for-teaching-and-non-teaching-staff-positions-university-of-benin-2/",
  "coronation-graduate-trainee-2026":
    "https://www.coronation.ng/coronation-academies/",
};

export const issuerRecheckedRoles20261020 = Object.keys(checkedSources);

export function applyVerifiedOctoberJobSourceRechecks20261020(job: CareerOpportunity): CareerOpportunity {
  const official = checkedSources[job.slug];
  if (!official) return job;
  const base = {
    ...job,
    verifiedAt: "2026-10-20",
    sources: job.sources.map(source => source.url === official
      ? { ...source, lastChecked: "2026-10-20" }
      : source),
  };
  if (job.slug === "uniben-teaching-non-teaching-recruitment-2026") {
    return {
      ...base,
      status: "closed",
      statusLabel: "The published six-week application window has ended",
      summary: "UNIBEN's original 27 August 2026 teaching and non-teaching vacancy notice allowed six weeks for applications. That advertised window is now over; the university's historic notice remains useful for qualifications and applicant follow-up, but does not establish a new intake.",
      nextMilestone: "The published application period ended in October 2026. The notice also required referees to send confidential reports no later than one week after the closing date; that is not an extension for new applications.",
      applicationSteps: [
        "Read the original UNIBEN teaching and non-teaching advertisement for the applicable job category and document requirements.",
        "The advertised six-week application period has passed. Do not assume the old portal is accepting fresh applications.",
        "If you already applied, retain your acknowledgement and contact UNIBEN through its official employment or Registrar channels about the selection stage.",
        "Wait for a separately dated university vacancy notice before beginning another application.",
      ],
      sourceNotes: [
        ...job.sourceNotes,
        "Issuer rechecked on 20 October 2026: the 27 August UNIBEN notice specifies a six-week application window and confidential referee reports no later than one week after the close. No new application window is established by this notice.",
      ],
    };
  }
  if (job.slug === "unilag-professorial-chair-2026") {
    return {
      ...base,
      summary: "UNILAG's original call for the Senator Douye Diri Professorial Chair in Leadership and Good Governance specifies Tuesday 20 October 2026 as its application deadline. The notice requires online submission and delivery of the acknowledgement slip; an accessible announcement after that date does not extend the deadline.",
      nextMilestone: "20 October 2026 is the employer's published final application date. Do not infer an extension from the continuing visibility of the notice; confirm current acceptance with UNILAG directly.",
      sourceNotes: [
        ...job.sourceNotes,
        "UNILAG official notice rechecked 20 October 2026 expressly identifies Tuesday, 20 October as the final advertised application date and requires the online acknowledgement slip to be submitted to the named university office.",
      ],
    };
  }
  return {
    ...base,
    nextMilestone: "Coronation's 2026 Graduate Trainee Academy still displays Apply Now links for nine named pathways at the 20 October source check; no single application deadline was published on the page. Confirm the form's current acceptance before supplying documents.",
    sourceNotes: [
      ...job.sourceNotes,
      "Coronation Academies official page rechecked on 20 October 2026: nine named pathways and Apply Now controls remain published, but a functioning personal submission and programme-wide closing date were not independently established.",
    ],
  };
}
