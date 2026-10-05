import type { CareerOpportunity, JobStatus } from "@/lib/jobs";

export function todayIsoUtc(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

export function getEffectiveJobStatus(item: CareerOpportunity, todayIso = todayIsoUtc()): JobStatus {
  if (item.status === "open" && item.deadline && item.deadline < todayIso) return "closed";
  return item.status;
}

export function getEffectiveStatusLabel(item: CareerOpportunity, todayIso = todayIsoUtc()) {
  if (item.status === "open" && item.deadline && item.deadline < todayIso) {
    return "Deadline passed — verify current status";
  }
  return item.statusLabel;
}

export function isEffectivelyOpen(item: CareerOpportunity, todayIso = todayIsoUtc()) {
  return getEffectiveJobStatus(item, todayIso) === "open";
}

export function daysSinceIsoDate(dateIso: string, todayIso = todayIsoUtc()) {
  const start = Date.parse(dateIso + "T00:00:00Z");
  const end = Date.parse(todayIso + "T00:00:00Z");
  if (!Number.isFinite(start) || !Number.isFinite(end)) return Number.POSITIVE_INFINITY;
  return Math.max(0, Math.floor((end - start) / 86_400_000));
}

export function daysUntilIsoDate(dateIso: string, todayIso = todayIsoUtc()) {
  const start = Date.parse(todayIso + "T00:00:00Z");
  const end = Date.parse(dateIso + "T00:00:00Z");
  if (!Number.isFinite(start) || !Number.isFinite(end)) return Number.POSITIVE_INFINITY;
  return Math.ceil((end - start) / 86_400_000);
}

export function getClosingSoonJobs(items: CareerOpportunity[], days = 7, todayIso = todayIsoUtc()) {
  return items
    .filter((item) => isEffectivelyOpen(item, todayIso) && item.deadline)
    .filter((item) => {
      const remaining = daysUntilIsoDate(item.deadline as string, todayIso);
      return remaining >= 0 && remaining <= days;
    })
    .sort((a, b) => (a.deadline ?? "").localeCompare(b.deadline ?? ""));
}

export function getRecentlyPostedJobs(items: CareerOpportunity[], days = 7, todayIso = todayIsoUtc()) {
  return items
    .filter((item) => item.posting && isEffectivelyOpen(item, todayIso))
    .filter((item) => daysSinceIsoDate(item.posting?.datePosted ?? "", todayIso) < days)
    .sort((a, b) => (b.posting?.datePosted ?? "").localeCompare(a.posting?.datePosted ?? ""));
}

export function getJobFreshnessLabel(item: CareerOpportunity, todayIso = todayIsoUtc()) {
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

export function buildJobPostingJsonLd(item: CareerOpportunity, pageUrl: string, todayIso = todayIsoUtc()) {
  if (!item.posting || item.kind !== "vacancy" || !isEffectivelyOpen(item, todayIso)) return null;

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
