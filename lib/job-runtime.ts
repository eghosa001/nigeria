import type { CareerOpportunity, JobStatus } from "@/lib/jobs";

// Application windows follow the employer's published Nigerian calendar day
// (WAT, UTC+01:00), not UTC midnight. Nigeria has no daylight saving time.
export function todayIsoNigeria(now = new Date()) {
  return new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0, 10);
}

// Keep the historical export for existing callers; prefer todayIsoNigeria.
export const todayIsoUtc = todayIsoNigeria;

// Source freshness is independent of a published application deadline.
// One-off vacancy adverts with no employer-confirmed closing date should not
// continue saying "open" forever when the last actual source check gets old.
export const MAX_OPEN_VACANCY_SOURCE_AGE_DAYS = 14;

function hasStaleVacancyEvidence(item: CareerOpportunity, todayIso: string): boolean {
  if (item.status !== "open" || item.kind !== "vacancy") return false;
  // Invalid/future dates cannot be treated as confirmation of availability.
  if (!item.verifiedAt || !/^\d{4}-\d{2}-\d{2}$/.test(item.verifiedAt) ||
      item.verifiedAt > todayIso) return true;
  const sourceDate = Date.parse(item.verifiedAt + "T00:00:00Z");
  const reviewDate = Date.parse(todayIso + "T00:00:00Z");
  return !Number.isFinite(sourceDate) || !Number.isFinite(reviewDate) ||
    Math.floor((reviewDate - sourceDate) / 86_400_000) > MAX_OPEN_VACANCY_SOURCE_AGE_DAYS;
}

export function getEffectiveJobStatus(item: CareerOpportunity, todayIso = todayIsoNigeria()): JobStatus {
  if (item.status === "open" && item.deadline && item.deadline < todayIso) return "closed";
  if (hasStaleVacancyEvidence(item, todayIso)) return "unverified";
  return item.status;
}

export function getEffectiveStatusLabel(item: CareerOpportunity, todayIso = todayIsoNigeria()) {
  const state = getEffectiveJobStatus(item, todayIso);
  if (state === "closed" && item.status === "open") {
    return "Application deadline passed — closed unless officially extended";
  }
  if (state === "unverified" && item.status === "open") {
    return "Opening not reverified within 14 days — availability unverified";
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
    .filter((item) => {
      const posted = item.posting?.datePosted ?? "";
      // Missing, malformed or future-dated metadata must not appear as "recent".
      if (!/^\d{4}-\d{2}-\d{2}$/.test(posted) || posted > todayIso) return false;
      const timestamp = Date.parse(posted + "T00:00:00Z");
      if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== posted) return false;
      return daysSinceIsoDate(posted, todayIso) < days;
    })
    .sort((a, b) => (b.posting?.datePosted ?? "").localeCompare(a.posting?.datePosted ?? ""));
}

export function getJobFreshnessLabel(item: CareerOpportunity, todayIso = todayIsoNigeria()) {
  const checked = item.verifiedAt;
  const parsed = /^\d{4}-\d{2}-\d{2}$/.test(checked) ? Date.parse(checked + "T00:00:00Z") : Number.NaN;
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString().slice(0, 10) !== checked || checked > todayIso) {
    return "Check current status on the employer's site";
  }
  const age = daysSinceIsoDate(checked, todayIso);
  if (!Number.isFinite(age)) return "Check current status on the employer's site";
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

function evidenceDateIsValid(value: string, todayIso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value > todayIso) return false;
  const parsed = Date.parse(value + "T00:00:00Z");
  return Number.isFinite(parsed) && new Date(parsed).toISOString().slice(0, 10) === value;
}

export function buildJobPostingJsonLd(item: CareerOpportunity, pageUrl: string, todayIso = todayIsoNigeria()) {
  if (!item.posting || !item.jobPostingAuthorization || item.kind !== "vacancy" || !isEffectivelyOpen(item, todayIso)) return null;

  // Never claim a future employer publication or future completed verification
  // to search engines, even when stored status happens to say "open".
  if (!evidenceDateIsValid(item.posting.datePosted, todayIso) ||
      !evidenceDateIsValid(item.jobPostingAuthorization.verifiedAt, todayIso) ||
      !item.jobPostingAuthorization.publicEvidenceUrl.startsWith("https://")) return null;

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


/** Select varied employers for a compact preview without hiding any directory records. */
export function pickDistinctEmployerPreview<T extends { organization: string }>(items: readonly T[], limit = 3): T[] {
  const selected: T[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    const key = item.organization.trim().toLowerCase().replace(/\s+/g, " ");
    if (seen.has(key)) continue;
    seen.add(key);
    selected.push(item);
    if (selected.length >= Math.max(1, Math.floor(limit))) break;
  }
  return selected;
}
