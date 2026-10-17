import type { CareerOpportunity, JobPostingLocation } from "@/lib/jobs";

// The original Greenhouse board API is Moniepoint's issuer-linked recruitment
// system. 'first_published' often predates 2026; 'updated_at' is NOT the
// original posting date. The five exact ATS forms displayed an application
// section on 17 Oct 2026, but no personal data was submitted. Every entry's
// application_deadline was null, meaning *not published*, not rolling hiring.
type AtsProof = {
  id: string;
  issuerUrl: string;
  atsUrl: string;
  apiUrl: string;
  title: string;
  firstPublished: string;
  updatedAt: string;
  locations: JobPostingLocation[];
};
export const originalMoniepointAtsProof20261017: Record<string, AtsProof> = {
  "moniepoint-early-careers-talent-acquisition-specialist": {
    id: "4981411101",
    issuerUrl: "https://moniepoint.com/careers/roles/4981411101",
    atsUrl: "https://job-boards.eu.greenhouse.io/moniepoint/jobs/4981411101",
    apiUrl: "https://boards-api.greenhouse.io/v1/boards/moniepoint/jobs/4981411101?content=true", title: "Early Careers Talent Acquisition Specialist",
    firstPublished: "2026-09-22", updatedAt: "2026-09-22",
    locations: [{ locality: "Lagos", country: "NG" }],
  },
  "moniepoint-business-relationship-manager-anambra": {
    id: "4105673101",
    issuerUrl: "https://moniepoint.com/careers/roles/4105673101",
    atsUrl: "https://job-boards.eu.greenhouse.io/moniepoint/jobs/4105673101",
    apiUrl: "https://boards-api.greenhouse.io/v1/boards/moniepoint/jobs/4105673101?content=true", title: "Business Relationship Manager (Anambra)",
    firstPublished: "2022-12-16", updatedAt: "2026-09-10",
    locations: [{ region: "Anambra", country: "NG" }],
  },
  "moniepoint-talent-acquisition-specialist": {
    id: "4056914101",
    issuerUrl: "https://moniepoint.com/careers/roles/4056914101",
    atsUrl: "https://job-boards.eu.greenhouse.io/moniepoint/jobs/4056914101",
    apiUrl: "https://boards-api.greenhouse.io/v1/boards/moniepoint/jobs/4056914101?content=true", title: "Talent Acquisition Specialist",
    firstPublished: "2022-07-01", updatedAt: "2026-08-31",
    locations: [{ locality: "Lagos", country: "NG" }],
  },
  "moniepoint-financial-planning-analyst": {
    id: "4355709101",
    issuerUrl: "https://moniepoint.com/careers/roles/4355709101",
    atsUrl: "https://job-boards.eu.greenhouse.io/moniepoint/jobs/4355709101",
    apiUrl: "https://boards-api.greenhouse.io/v1/boards/moniepoint/jobs/4355709101?content=true", title: "Financial Planning Analyst",
    firstPublished: "2024-06-21", updatedAt: "2026-08-13",
    locations: [{ country: "NG" }],
  },
  "moniepoint-team-lead-site-reliability-engineering": {
    id: "4369828101",
    issuerUrl: "https://moniepoint.com/careers/roles/4369828101",
    atsUrl: "https://job-boards.eu.greenhouse.io/moniepoint/jobs/4369828101",
    apiUrl: "https://boards-api.greenhouse.io/v1/boards/moniepoint/jobs/4369828101?content=true", title: "Team Lead, Site Reliability Engineering",
    firstPublished: "2025-01-03", updatedAt: "2026-07-24",
    locations: [{ locality: "Lagos", country: "NG" }],
  },
};

const checkDate = "2026-10-17";
const statusLabel = "Named Greenhouse application form checked 17 Oct; closing date not published";
const applicantCaution =
  "Open the exact Moniepoint Greenhouse application form again before applying; the form was visible on 17 October but submission was not tested and no fixed or rolling deadline was published.";

const provenance = (proof: AtsProof) =>
  "Moniepoint's official Greenhouse API for requisition " + proof.id +
  " records first_published " + proof.firstPublished + ", updated_at " + proof.updatedAt +
  " and application_deadline null. The first date is original ATS publication, not a fresh October 2026 posting; null is not a rolling-hiring promise.";

export const sourceReviewedMoniepointVacancySlugs20261017 = Object.keys(originalMoniepointAtsProof20261017);

export function applyOriginalMoniepointAtsProof20261017(item: CareerOpportunity): CareerOpportunity {
  const proof = originalMoniepointAtsProof20261017[item.slug];
  if (!proof || item.kind !== "vacancy" || item.status !== "open" ||
      item.deadline || item.posting || item.officialUrl !== proof.issuerUrl) return item;

  const application = proof.atsUrl;
  return {
    ...item,
    posting: { jobTitle: proof.title, datePosted: proof.firstPublished, locations: proof.locations },
    officialUrl: application,
    officialUrlLabel: "Apply through Moniepoint's exact Greenhouse requisition",
    statusLabel,
    verifiedAt: checkDate,
    nextMilestone: "Original Greenhouse form visible 17 October 2026; no stated employer closing date. Confirm that it still accepts applications before submitting.",
    applicationSteps: [...item.applicationSteps, applicantCaution],
    sourceNotes: [...item.sourceNotes, provenance(proof),
      "Direct employer-linked Greenhouse form displayed its applicant fields and Submit application control on 17 October. This does not prove a completed form, interview, extension or guaranteed opening."],
    sources: [
      ...item.sources,
      { label: "Moniepoint — exact employer Greenhouse application", url: application, lastChecked: checkDate },
      { label: "Moniepoint employer-linked Greenhouse API — original publication/update/deadline", url: proof.apiUrl, lastChecked: checkDate },
    ],
  };
}

/** Exact source-matched clearance, never an authorisation to publish JobPosting schema. */
export function hasCompletedMoniepointAtsReview20261017(item: CareerOpportunity, today: string): boolean {
  const proof = originalMoniepointAtsProof20261017[item.slug];
  if (!proof || item.kind !== "vacancy" || item.status !== "open" ||
      item.deadline || item.jobPostingAuthorization ||
      item.officialUrl !== proof.atsUrl || item.statusLabel !== statusLabel ||
      !item.posting || item.posting.datePosted !== proof.firstPublished ||
      item.posting.jobTitle !== proof.title ||
      JSON.stringify(item.posting.locations) !== JSON.stringify(proof.locations) ||
      item.nextMilestone !== "Original Greenhouse form visible 17 October 2026; no stated employer closing date. Confirm that it still accepts applications before submitting." ||
      !item.applicationSteps.includes(applicantCaution) ||
      !item.sourceNotes.includes(provenance(proof))) return false;

  const recent = (date: string): boolean => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{4}-\d{2}-\d{2}$/.test(today) || date > today) return false;
    const delta = Date.parse(today + "T00:00:00Z") - Date.parse(date + "T00:00:00Z");
    return Number.isFinite(delta) && delta >= 0 && delta / 86400000 <= 14;
  };
  return recent(item.verifiedAt) &&
    item.sources.some(s => s.url === proof.atsUrl && recent(s.lastChecked)) &&
    item.sources.some(s => s.url === proof.apiUrl && recent(s.lastChecked)) &&
    item.sources.some(s => s.url === proof.issuerUrl && recent(s.lastChecked));
}
