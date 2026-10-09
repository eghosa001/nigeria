import type { CareerOpportunity, JobStatus } from "@/lib/jobs";

// Application windows follow the employer's published Nigerian calendar day
// (WAT, UTC+01:00), not UTC midnight. Nigeria has no daylight saving time.
export function todayIsoNigeria(now = new Date()) {
  return new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0, 10);
}

// Keep the historical export for existing callers; prefer todayIsoNigeria.
export const todayIsoUtc = todayIsoNigeria;

export function getEffectiveJobStatus(item: CareerOpportunity, todayIso = todayIsoNigeria()): JobStatus {
  if (item.status === "open" && item.deadline && item.deadline < todayIso) return "closed";
  return item.status;
}

export function getEffectiveStatusLabel(item: CareerOpportunity, todayIso = todayIsoNigeria()) {
  if (item.status === "open" && item.deadline && item.deadline < todayIso) {
    return "Deadline passed — verify current status";
  }
  return item.statusLabel;
}

export function isEffectivelyOpen(item: CareerOpportunity, todayIso = todayIsoNigeria()) {
  return getEffectiveJobStatus(item, todayIso) === "open";
}

export function daysSinceIsoDate(dateIso: string, todayIso = todayIsoNigeria()) {
  const start = Date.parse(dateIso + "T00:00:00Z");
  const end = Date.parse(todayIso + "T00:00:00Z");
  if (!Number.isFinite(start) || !Number.isFinite(end)) return Number.POSITIVE_INFINITY;
  return Math.max(0, Math.floor((end - start) / 86_400_000));
}

export function daysUntilIsoDate(dateIso: string, todayIso = todayIsoNigeria()) {
  const start = Date.parse(todayIso + "T00:00:00Z");
  const end = Date.parse(dateIso + "T00:00:00Z");
  if (!Number.isFinite(start) || !Number.isFinite(end)) return Number.POSITIVE_INFINITY;
  return Math.ceil((end - start) / 86_400_000);
}

export function getClosingSoonJobs(items: CareerOpportunity[], days = 7, todayIso = todayIsoNigeria()) {
  return items
    .filter((item) => isEffectivelyOpen(item, todayIso) && item.deadline)
    .filter((item) => {
      const remaining = daysUntilIsoDate(item.deadline as string, todayIso);
      return remaining >= 0 && remaining <= days;
    })
    .sort((a, b) => (a.deadline ?? "").localeCompare(b.deadline ?? ""));
}

export function getRecentlyPostedJobs(items: CareerOpportunity[], days = 7, todayIso = todayIsoNigeria()) {
  return items
    .filter((item) => item.posting && isEffectivelyOpen(item, todayIso))
    .filter((item) => daysSinceIsoDate(item.posting?.datePosted ?? "", todayIso) < days)
    .sort((a, b) => (b.posting?.datePosted ?? "").localeCompare(a.posting?.datePosted ?? ""));
}

export function getJobFreshnessLabel(item: CareerOpportunity, todayIso = todayIsoNigeria()) {
  const age = daysSinceIsoDate(item.verifiedAt, todayIso);
  if (age === 0) return "Checked today";
  if (age === 1) return "Checked yesterday";
  return "Checked " + age + " days ago";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function listHtml(items: string[]) {
  return items.length
    ? "<ul>" + items.map((item) => "<li>" + escapeHtml(item) + "</li>").join("") + "</ul>"
    : "";
}

export function buildJobPostingJsonLd(item: CareerOpportunity, pageUrl: string, todayIso = todayIsoNigeria()) {
  if (!item.posting || !item.jobPostingAuthorization || item.kind !== "vacancy" || !isEffectivelyOpen(item, todayIso)) return null;

  const posting = item.posting;
  const jobLocation = posting.locations.map((location) => ({
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      ...(location.locality ? { addressLocality: location.locality } : {}),
      ...(location.region ? { addressRegion: location.region } : {}),
      addressCountry: location.country,
    },
  }));

  const description =
    "<p>" + escapeHtml(item.summary) + "</p>" +
    "<p>Qualifications</p>" + listHtml(item.qualifications) +
    "<p>Other requirements</p>" + listHtml(item.requirements) +
    "<p>How to apply</p>" + listHtml(item.applicationSteps);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: posting.jobTitle,
    description,
    datePosted: posting.datePosted,
    ...(item.deadline ? { validThrough: item.deadline + "T23:59:59+01:00" } : {}),
    ...(posting.employmentType ? { employmentType: posting.employmentType } : {}),
    hiringOrganization: {
      "@type": "Organization",
      name: item.organization,
    },
    jobLocation: jobLocation.length === 1 ? jobLocation[0] : jobLocation,
    identifier: {
      "@type": "PropertyValue",
      name: item.organization,
      value: item.slug,
    },
    url: pageUrl,
  };
}
