import type { CareerOpportunity } from "@/lib/jobs";
import { applyMayBakerOctoberLiveVacancy20261020 } from "@/lib/job-may-baker-october-2026";

// Direct issuer checks 19 October 2026. A general careers website, even when
// live, does NOT prove it accepts a named role's application.
type IssuerCheck = {
  source: string;
  note: string;
  summary: string;
  followUp: string;
  steps: string[];
  checkedAt?: string;
};

const closedRecruitments: Record<string, IssuerCheck> = {
  "reckitt-nigeria-management-trainee-2026": {
    source: "https://careers.reckitt.com/job/Lagos-Island-Reckitt-Nigeria-2026-Management-Trainee-Program-%28Trailblazers-5_0%29-Lago-NA/1439208533/",
    checkedAt: "2026-10-20",
    note: "The named Reckitt Trailblazers 5.0 vacancy page displayed 'Sorry, this position has been filled' on 20 October 2026. The earlier eligibility information is historical, not an invitation to apply.",
    summary: "Reckitt's official Trailblazers 5.0 job page now says the position has been filled. The previously advertised Lagos Island programme is not accepting applications through this listing. The original graduate-year, degree-class and NYSC requirements remain here only as historical context.",
    followUp: "The named Reckitt vacancy is filled as of the 20 October 2026 issuer check. Do not submit an application through a copied advert; check Reckitt's current careers listings for a separately published opportunity.",
    steps: [
      "Open the original Reckitt Trailblazers 5.0 vacancy and read its current filled-status message.",
      "Do not upload personal documents or pay an intermediary claiming to reopen this filled listing.",
      "For a future role, use Reckitt's own careers search and verify that the specific vacancy, location and application control are active before applying.",
    ],
  },
  "frsc-recruitment": {
    source: "https://recruitment.frsc.gov.ng/",
    note: "FRSC's official applicant portal says 'Applications Closed' and that existing applicants will be contacted for further steps. Checked 19 October 2026. This does not confirm a new recruitment round or its timetable.",
    summary: "The Federal Road Safety Corps recruitment portal currently displays 'Applications Closed'. It says previous applicants will be contacted about any further steps; it does not advertise a new application window. This guide is for checking the issuer's official status, not applying through a copied form.",
    followUp: "The portal reports applications closed. Existing applicants should preserve their earlier details and wait for an FRSC-issued update; no new closing date or assessment appointment has been confirmed.",
    steps: [
      "Open the FRSC recruitment portal and check its current status banner before supplying any personal information.",
      "The official application window is closed; do not complete a social-media form claiming to reopen this exercise.",
      "If you previously applied, retain your confirmation and the contact information you used. FRSC says existing applicants will be contacted about next steps.",
      "For a later round, wait for a newly dated official FRSC notice and read the exact cadre requirements before starting from its linked portal.",
      "No agent can sell a place on a shortlist; verify invitations against the issuer's genuine contact channels.",
    ],
  },
  "nnpc-limited-recruitment": {
    source: "https://careers.nnpcgroup.com/how-to",
    note: "NNPC's own application guide says 'Application submission is now closed'. The general careers and candidate journey pages remain accessible for reference, not as an open role-specific application. Checked 19 October 2026.",
    summary: "NNPC Limited's official recruitment application guide states that submissions are closed. Its graduate-trainee, experienced-hire and candidate-journey pages remain useful for eligibility research and previous applicants, but do not establish any newly accepting 2026 intake.",
    followUp: "The issuer's application guide says submission is closed. Existing candidates can use NNPC's own journey/status information; future applicants must wait for a newly published application window.",
    steps: [
      "Start from NNPC's owned careers portal and distinguish its graduate-trainee programme information from a named current vacancy.",
      "The application guide currently says submissions are closed. Do not upload credentials or pay an intermediary for a supposed reopening.",
      "If you already applied, consult NNPC's candidate journey and the recruitment account or communication associated with your existing application.",
      "When a new dated vacancy is announced, compare the particular role and location with its qualification, NYSC and experience requirements before completing that application's form.",
      "NNPC says it does not charge applicants. Do not treat a general corporate careers description as proof that an online application was accepted.",
    ],
  },
  "nigeria-police-constable-recruitment-2026": {
    source: "https://psc.gov.ng/2026/04/24/police-recruitment-written-examination-holds-28-30-april-as-psc-warns-against-scams/",
    note: "Police Service Commission's official 24 April 2026 announcement puts previously screened candidates at a 28–30 April written examination and warns about recruitment scams. Checked 19 October 2026; the old announcement cannot confirm a new application or fresh screening.",
    summary: "The 2026 Nigeria Police constable recruitment application window closed before the Police Service Commission's April 28–30 written-examination stage. The linked official April notice concerns people already screened, not newly accepting constable applications. Use this guide for archived eligibility and issuer-issued follow-up, not to apply today.",
    followUp: "PSC's located notice describes the April 2026 written examination. No new October 2026 constable application window was established by that notice; check newer dated PSC/NPF communications for later stages.",
    steps: [
      "Read the Police Service Commission's own dated recruitment updates rather than a forwarded application link.",
      "The previously advertised constable application window has ended. Do not submit a new paid or unofficial form claiming the April written test is a new recruitment.",
      "If you applied in that cycle, retain the original applicant details and follow any separately published PSC/NPF notice for your stage.",
      "Compare General Duty and Specialist requirements only with a newly announced intake before applying again; the earlier 2026 criteria may change.",
      "PSC warns recruitment is free. Report any purported fee-for-shortlist or examination invitation through official channels.",
    ],
  },
};

export const checkedClosedRecruitmentSlugs20261019 = Object.keys(closedRecruitments);

export function applyIssuerClosedRecruitmentChecks20261019(item: CareerOpportunity): CareerOpportunity {
  const review = closedRecruitments[item.slug];
  if (!review) return applyMayBakerOctoberLiveVacancy20261020(item);
  const checkedAt = review.checkedAt ?? "2026-10-19";
  const sources = item.sources.map(source =>
    source.url === review.source ? { ...source, lastChecked: checkedAt } : source);
  return {
    ...item,
    status: "closed",
    statusLabel: "Official application window closed — historical guide",
    verifiedAt: checkedAt,
    summary: review.summary,
    applicationSteps: review.steps,
    nextMilestone: review.followUp,
    sourceNotes: [...item.sourceNotes, review.note],
    sources,
  };
}
