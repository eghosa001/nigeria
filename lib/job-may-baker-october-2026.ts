import type { CareerOpportunity } from "@/lib/jobs";

/**
 * Source-verified 20 October 2026: https://may-bakerng.com/career
 *
 * Six DIFFERENT employer requisitions share the Consumer Healthcare Executive
 * title, so this canonical record is a multi-territory application guide, NOT
 * one JobPosting with a fictitious universal requisition number or deadline.
 *
 * Employer conflict: "within one week" from 15–16 October vs the page's
 * later "Apply by" labels (27/28 November). Neither instruction is silently
 * substituted for the other. Recheck the exact vacancy before sending a CV.
 */
export const mayBakerSourceCheck20261020 = {
  url: "https://may-bakerng.com/career",
  verifiedAt: "2026-10-20",
  locations: [
    "Lagos — posted 15 October; Apply by 28 November 2026",
    "Edo/Delta — JOB-20261016140436; posted 16 October; Apply by 27 November 2026",
    "Kogi/Benue — JOB-20261016140452; posted 16 October; Apply by 27 November 2026",
    "Sokoto/Zamfara/Katsina — JOB-20261016140546; posted 16 October; Apply by 27 November 2026",
    "Osun/Ekiti/Ondo — JOB-20261016135341; posted 16 October; Apply by 27 November 2026",
    "Calabar/Akwa Ibom/Abia — JOB-20261016140511; posted 16 October; Apply by 27 November 2026",
  ],
  summary: "May & Baker's official careers page carries six territory-specific Consumer Healthcare Executive requisitions dated 15–16 October 2026. Their Apply Now controls lead to a vacancy-selection form, but the job text says 'within one week' while the page displays later 27–28 November Apply by dates. Confirm the deadline for your own territory directly with the employer.",
} as const;

export function applyMayBakerOctoberLiveVacancy20261020(job: CareerOpportunity): CareerOpportunity {
  if (job.slug !== "may-baker-consumer-healthcare-executive-2026") return job;
  return {
    ...job,
    kind: "career-page",
    status: "career-page",
    statusLabel: "Six current employer listings — verify the exact territory",
    posting: undefined,
    jobPostingAuthorization: undefined,
    deadline: undefined,
    verifiedAt: mayBakerSourceCheck20261020.verifiedAt,
    summary: mayBakerSourceCheck20261020.summary,
    nextMilestone: "Choose the correct territorial vacancy and check its deadline conflict before submitting: the 15–16 October notices say 'within one week', but the live Apply by labels state 27 or 28 November 2026.",
    requirements: [
      "Choose the exact Lagos, Edo/Delta, Kogi/Benue, Sokoto/Zamfara/Katsina, Osun/Ekiti/Ondo or Calabar/Akwa Ibom/Abia posting.",
      "The October employer notices request a BSc in Biological or Applied Sciences and at least one year of medical field sales experience; NYSC experience counts toward that year.",
      "Be ready to promote assigned healthcare products to hospitals and institutions and work with Microsoft Office. Confirm any additional criteria on your territory's current form.",
      "The source has contradictory closing-date instructions; do not assume that one closing date governs all six requisitions.",
    ],
    applicationSteps: [
      "Open May & Baker's current official career board and select the Consumer Healthcare Executive posting for your territory.",
      "Check its posted date, role identifier where displayed, field-sales eligibility and both closing-date statements.",
      "Use that posting's Apply Now button and confirm the correct role is preselected in the employer's application form.",
      "Complete the personal, education and experience fields. The issuer form accepts a CV in PDF, DOC or DOCX format up to 5 MB and an optional supporting document up to 10 MB.",
      "Submit only through the employer's secure careers form; retain its on-screen confirmation. If the deadline labels disagree, ask May & Baker which applies before sending personal documents.",
    ],
    sourceNotes: [
      "Issuer recheck 20 October 2026: distinct 15–16 October Consumer Healthcare Executive entries show Apply Now. Five 16 October region postings identify requisitions JOB-20261016140436, JOB-20261016140452, JOB-20261016140546, JOB-20261016135341 and JOB-20261016140511.",
      "The 16 October territory postings show Apply by 27 November 2026 and the 15 October Lagos posting shows Apply by 28 November. Each also instructs candidates to apply 'within one week'. This conflict is disclosed, not resolved by guessing.",
      "The official employer form identifies the selected job, accepts a 5 MB PDF/DOC/DOCX CV and optional 10 MB supporting document, and describes an on-screen success message after submission. Its availability is not proof a particular candidate was accepted.",
    ],
    sources: job.sources.map(source => source.url === mayBakerSourceCheck20261020.url
      ? { ...source, lastChecked: mayBakerSourceCheck20261020.verifiedAt }
      : source),
  };
}

/** A strict, expiring check of actual employer evidence—not a magic audit waiver. */
export function hasSourceMatchedMayBakerMultiRoleReview20261020(item: CareerOpportunity, today: string): boolean {
  if (item.slug !== "may-baker-consumer-healthcare-executive-2026" ||
      item.kind !== "career-page" || item.status !== "career-page" ||
      item.officialUrl !== mayBakerSourceCheck20261020.url ||
      item.verifiedAt !== mayBakerSourceCheck20261020.verifiedAt ||
      item.summary !== mayBakerSourceCheck20261020.summary ||
      item.deadline !== undefined || item.posting || item.jobPostingAuthorization ||
      item.sourceNotes.length !== 3 ||
      !item.sourceNotes.some(note => note.includes("JOB-20261016140436") && note.includes("JOB-20261016140511")) ||
      !item.sourceNotes.some(note => note.includes("'within one week'") && note.includes("27 November")) ||
      !item.sources.some(source => source.url === mayBakerSourceCheck20261020.url &&
        source.lastChecked === mayBakerSourceCheck20261020.verifiedAt) ||
      item.applicationSteps.length !== 5 || item.requirements.length !== 4) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(today) || today < "2026-10-20") return false;
  const days = (Date.parse(today + "T00:00:00Z") - Date.parse("2026-10-20T00:00:00Z")) / 86400000;
  return Number.isFinite(days) && days >= 0 && days <= 14;
}
