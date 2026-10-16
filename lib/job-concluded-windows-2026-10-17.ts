import type { CareerOpportunity } from "@/lib/jobs";

// 17 October 2026: direct public issuer notices checked. These decisions
// describe published windows, not a claim to have submitted an application,
// contacted recruiters, or verified an individual candidate's account.
type ClosedNotice = {
  summary: string;
  steps: string[];
  source: string;
  evidence: string;
  followUp: string;
};

const concludedNotices: Record<string, ClosedNotice> = {
  "kaduna-phcb-recruitment-2026": {
    summary: "Kaduna State Primary Health Care Board's 2026 recruitment window ran from 4 to 14 October. The official Kaduna State Job Bank now says no vacancy is currently open and profile creation is closed. This is an archive for candidates reviewing the ten advertised positions and tracking earlier applications, not a new application invitation.",
    steps: [
      "Check the Kaduna State Job Bank's current opportunities section first: its public notice now reports no open vacancy in this exercise.",
      "If you submitted before 14 October, use your existing applicant login to review your saved profile, application snapshot, or any screening/CBT updates. Do not create a duplicate claim that you have applied.",
      "For a regulated healthcare profession, keep your licence and qualifications available for screening, but follow only the documents requested on your specific job record.",
      "If a new Kaduna recruitment exercise is announced, select its newly published vacancy, conditions and deadline rather than reusing this closed 2026 form.",
      "Use the portal's authenticated support ticket route for an existing application question; avoid informal paid recruitment agents."
    ],
    source: "https://recruitment.kdsg.gov.ng/",
    evidence: "Official Kaduna Job Bank, checked 17 October 2026: the ten-position PHCB exercise is dated 4–14 October; its vacancies section states no vacancy is currently open and profile creation is closed, though existing applicants may log in. The advertised 1,800 workers total is for the exercise overall, not ten jobs or an allocation per job.",
    followUp: "Application deadline passed 14 October 2026. Existing candidates may log in to the official job bank for screening or support; no new PHCB vacancy is advertised there."
  },
  "deloitte-nigeria-early-careers": {
    summary: "Deloitte Nigeria's 2026 Tax & Legal Graduate Recruitment Refresh was a Lagos graduate application window with a published 9 October deadline. That deadline has passed. Its original issuer advert remains readable but does not establish a newly extended intake or permission to reapply if you already applied in the earlier April cycle.",
    steps: [
      "Read Deloitte's original Tax & Legal 2026 notice as an archive; its published application deadline is 9 October 2026.",
      "If you applied, retain your earlier SmartRecruiters acknowledgement and monitor the original candidate account or official recruitment emails for a response.",
      "Do not submit another application merely because the old advert remains online: Deloitte's notice specifically says prior applicants in the April 2026 cycle should not reapply.",
      "For future opportunities, open a newly dated Deloitte Nigeria role on its official SmartRecruiters employer board and check the correct service line, location and qualifications.",
      "Never pay an intermediary for a Deloitte assessment or interview; use only recruitment communications identifiable through the employer."
    ],
    source: "https://jobs.smartrecruiters.com/Deloitte6/744000153123709-2026-graduate-recruitment-refresh-tax-and-legal-unit-",
    evidence: "Deloitte's exact Tax & Legal Graduate Recruitment Refresh employer advert, checked 17 October 2026, prints 9 October 2026 as the deadline and instructs people who applied before its 10 April window closed not to apply again. A surviving advert or Apply interface is not proof the old deadline was extended.",
    followUp: "The published 9 October 2026 deadline has passed. Check the official Deloitte Nigeria job board for a separately dated new recruitment notice."
  },
  "snv-energy-advisor-abuja-2026": {
    summary: "SNV's Energy Advisor vacancy concerned a two-year national energy-project contract based in Abuja. Its original SmartRecruiters notice gives 8 October 2026 as the deadline. That application window has passed; an 'I'm interested' button still visible on an old page is not independent evidence of an extension.",
    steps: [
      "Treat the Abuja Energy Advisor posting as an archived October 2026 vacancy; the employer's written deadline is 8 October.",
      "If you already submitted, retain the SmartRecruiters reference and wait for communications from SNV rather than filing duplicates.",
      "For future energy roles, use SNV's current vacancies directory linked from its original advert, then choose an exact newly dated position.",
      "Compare any new role's technical focus, experience requirement and duty station separately; the former Energy Advisor criteria do not automatically apply to other SNV jobs.",
      "Do not pay anyone for recruitment or send identity documents through a forwarded social-media form."
    ],
    source: "https://jobs.smartrecruiters.com/snv/744000152591820",
    evidence: "SNV's original Energy Advisor SmartRecruiters notice, checked 17 October 2026, says the closing date was 8 October and the duty station is Abuja. The page may still display an interest control; the public text does not document a new deadline or a completed submission test.",
    followUp: "Published application deadline: 8 October 2026 (passed). Look for a fresh individually dated SNV vacancy."
  },
  "snv-project-manager-abuja-2026": {
    summary: "SNV's Abuja Energy Project Manager vacancy concerned leadership of an energy project on a two-year national contract. The original issuer advert gives 8 October 2026 as its deadline, and its SmartRecruiters Apply control currently reports that the job has expired.",
    steps: [
      "Do not attempt to submit this expired Energy Project Manager vacancy: its issuer-hosted application control says the job has expired.",
      "If you submitted before 8 October, use your previous SmartRecruiters confirmation for any legitimate follow-up.",
      "For future SNV energy project roles, navigate to the employer vacancies directory from its published notice and verify a new, role-specific application.",
      "Compare leadership experience, donor-reporting responsibilities, work location and contract type against the new advert rather than recycling this closed vacancy.",
      "Only enter personal details in a fresh employer-linked application, never an unofficial fee-paying recruitment form."
    ],
    source: "https://jobs.smartrecruiters.com/SNV/744000152590475-project-manager",
    evidence: "SNV's exact Abuja Energy Project Manager page, checked 17 October 2026, prints an 8 October closing date and the SmartRecruiters application control reads 'Sorry, this job has expired'.",
    followUp: "SNV's individual application is marked expired after its 8 October 2026 deadline. Check only newly advertised SNV vacancies."
  }
};

export const concludedIssuerWindowSlugs20261017 = Object.keys(concludedNotices);

export function applyConcludedIssuerWindows20261017(item: CareerOpportunity): CareerOpportunity {
  const review = concludedNotices[item.slug];
  if (!review || !item.deadline || item.deadline >= "2026-10-17") return item;
  return {
    ...item,
    status: "closed",
    statusLabel: "Published application window ended — original notice archived",
    summary: review.summary,
    applicationSteps: review.steps,
    nextMilestone: review.followUp,
    verifiedAt: "2026-10-17",
    sourceNotes: [...item.sourceNotes, review.evidence],
    sources: item.sources.map(source => source.url === review.source
      ? { ...source, lastChecked: "2026-10-17" } : source),
  };
}
