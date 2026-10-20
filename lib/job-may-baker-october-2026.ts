import type { CareerOpportunity } from "@/lib/jobs";

/**
 * Issuer recheck: 20 October 2026.
 * https://may-bakerng.com/career lists new Consumer Healthcare Executive
 * territorial notices dated 15–16 October, after the old September batch
 * expired. The page shows inconsistent "within one week" versus later
 * "Apply by" dates; do not manufacture one shared closing date.
 */
export function applyMayBakerOctoberLiveVacancy20261020(job: CareerOpportunity): CareerOpportunity {
  if (job.slug !== "may-baker-consumer-healthcare-executive-2026") return job;
  return {
    ...job,
    status: "open",
    statusLabel: "Newer October employer vacancies listed — confirm each territory",
    deadline: undefined,
    verifiedAt: "2026-10-20",
    summary: "May & Baker's official careers page lists Consumer Healthcare Executive vacancies newly posted on 15–16 October 2026 across Lagos and multi-state territories. The employer provides Apply Now controls but displays inconsistent deadline instructions, so applicants should confirm the cut-off for their chosen territory before uploading a CV.",
    nextMilestone: "Confirm the selected territory's closing date: the 15–16 October postings show both a one-week instruction and later displayed Apply by dates. Neither is a verified single deadline for all territories.",
    requirements: [
      ...job.requirements.filter(text => !/submit by 7 October 2026/i.test(text)),
      "Check the official October vacancy and confirm its specific deadline before applying; do not rely on the previous September recruitment closing date.",
    ],
    applicationSteps: [
      ...job.applicationSteps.filter(text => !/submit before 7 October 2026/i.test(text)),
      "Use the live May & Baker Apply Now control for your territory and retain your submission confirmation. Ask the employer if the one-week notice conflicts with the date displayed for that opening.",
    ],
    sourceNotes: [
      ...job.sourceNotes.filter(text => !/23 September 2026|7 October 2026/i.test(text)),
      "Issuer recheck on 20 October 2026 found distinct October 15–16 Consumer Healthcare Executive vacancies across Lagos and named regional territories.",
      "The same official career page displays conflicting one-week instructions and later Apply by dates. A single cut-off date cannot be safely inferred.",
    ],
    sources: job.sources.map(source => source.url === "https://may-bakerng.com/career"
      ? { ...source, lastChecked: "2026-10-20" } : source),
  };
}
