import type { CareerOpportunity } from "@/lib/jobs";

// Two independently identifiable employer-controlled sources per requisition:
// Moniepoint's exact current role page and its public Greenhouse Job Board API.
// Greenhouse "first_published" is NOT "updated_at", and a years-old posting
// is not a newly launched October 2026 recruitment or guaranteed acceptance.
type SourceProof = {
  id: string;
  title: string;
  firstPublished: string;
  updatedAt: string;
  location: string;
  region?: string;
};

export const moniepointFirstPublishedEvidence20261017: Record<string, SourceProof> = {
  "moniepoint-early-careers-talent-acquisition-specialist": {
    id: "4981411101", title: "Early Careers Talent Acquisition Specialist",
    firstPublished: "2026-09-22", updatedAt: "2026-09-22", location: "Remote, Lagos, Nigeria", region: "Lagos",
  },
  "moniepoint-business-relationship-manager-anambra": {
    id: "4105673101", title: "Business Relationship Manager (Anambra)",
    firstPublished: "2022-12-16", updatedAt: "2026-09-10", location: "Remote, Nigeria",
  },
  "moniepoint-talent-acquisition-specialist": {
    id: "4056914101", title: "Talent Acquisition Specialist",
    firstPublished: "2022-07-01", updatedAt: "2026-08-31", location: "Remote, Lagos, Nigeria", region: "Lagos",
  },
  "moniepoint-financial-planning-analyst": {
    id: "4355709101", title: "Financial Planning Analyst",
    firstPublished: "2024-06-21", updatedAt: "2026-08-13", location: "Remote, Nigeria",
  },
  "moniepoint-team-lead-site-reliability-engineering": {
    id: "4369828101", title: "Team Lead, Site Reliability Engineering",
    firstPublished: "2025-01-03", updatedAt: "2026-07-24", location: "Lagos, Nigeria", region: "Lagos",
  },
};

export const moniepointPublicAtsCaution20261017 =
  "The exact Moniepoint job is listed on the employer's careers site and public Greenhouse job feed as of 17 October 2026. The Greenhouse first_published field records this job POST's original publication date, which may be YEARS earlier than its last update. Its application_deadline field is null. There is NO stated closing date or verified rolling/permanent intake; the presence of an Apply control does not prove a completed application. Recheck the exact role and form before relying on it.";

function originalRoleUrl(id: string) { return "https://moniepoint.com/careers/roles/" + id; }
function atsEvidenceUrl(id: string) { return "https://boards-api.greenhouse.io/v1/boards/moniepoint/jobs/" + id; }

export function applyMoniepointFirstPublishedEvidence20261017(item: CareerOpportunity): CareerOpportunity {
  const proof = moniepointFirstPublishedEvidence20261017[item.slug];
  if (!proof || item.kind !== "vacancy" || item.status !== "open" ||
      item.officialUrl !== originalRoleUrl(proof.id) || item.deadline || item.jobPostingAuthorization)
    return item;

  const urls = [originalRoleUrl(proof.id), atsEvidenceUrl(proof.id)];
  const sources = item.sources.map(src => urls.includes(src.url) ? {
    ...src, lastChecked: "2026-10-17",
  } : src);
  for (const url of urls) if (!sources.some(source => source.url === url)) {
    sources.push({
      label: url.includes("boards-api") ? "Greenhouse public ATS — exact Moniepoint first-published and deadline fields"
        : "Moniepoint careers — named active role with Apply control",
      url, lastChecked: "2026-10-17",
    });
  }
  const history = "This exact Greenhouse post was originally published " + proof.firstPublished +
    " and last updated " + proof.updatedAt +
    ". A later update or the employer's 2026 webpage heading does not make it a newly created 2026 vacancy.";
  return {
    ...item,
    posting: {
      jobTitle: proof.title,
      datePosted: proof.firstPublished,
      locations: [{ country: "NG", ...(proof.region ? { region: proof.region } : {}) }],
    },
    verifiedAt: "2026-10-17",
    sources,
    sourceNotes: [...item.sourceNotes, history, moniepointPublicAtsCaution20261017],
    nextMilestone: "No application deadline is published in the original Moniepoint/Greenhouse record. Role presence was checked 17 October 2026; this does NOT establish rolling or continuously open recruitment.",
  };
}

function recent(iso: string, now: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso) || !/^\d{4}-\d{2}-\d{2}$/.test(now)) return false;
  const elapsed = Date.parse(now + "T00:00:00Z") - Date.parse(iso + "T00:00:00Z");
  return Number.isFinite(elapsed) && elapsed >= 0 && elapsed <= 14 * 86400000;
}

export function hasSourceMatchedMoniepointNoDeadlineReview(item: CareerOpportunity, now: string) {
  const proof = moniepointFirstPublishedEvidence20261017[item.slug];
  if (!proof || item.kind !== "vacancy" || item.status !== "open" || item.deadline ||
      item.jobPostingAuthorization || item.officialUrl !== originalRoleUrl(proof.id) ||
      item.posting?.jobTitle !== proof.title || item.posting?.datePosted !== proof.firstPublished ||
      item.posting?.locations[0]?.country !== "NG" || !recent(item.verifiedAt, now) ||
      !item.sourceNotes.includes(moniepointPublicAtsCaution20261017) ||
      !item.sourceNotes.some(note => note.includes("originally published " + proof.firstPublished) &&
        note.includes("last updated " + proof.updatedAt)) ||
      !item.nextMilestone?.includes("does NOT establish rolling"))
    return false;
  return [originalRoleUrl(proof.id), atsEvidenceUrl(proof.id)]
    .every(url => item.sources.some(src => src.url === url && recent(src.lastChecked, now)));
}
