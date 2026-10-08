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
  if (!item.posting || !item.jobPostingAuthorization || item.kind !== "vacancy" || !isEffectivelyOpen(item, todayIso)) return null;

  const posting = item.posting;
  // Only describe a physical worksite when the employer has identified its locality.
  // State-wide recruitment without an actual city remains an ordinary indexed guide,
  // rather than creating Google's "missing addressLocality" JobPosting warnings.
  if (!posting.locations.length && !posting.remote) return null;
  if (posting.locations.some((location) => !location.country.trim() || !location.locality?.trim())) return null;
  if (posting.remote && (!posting.remote.applicantCountries.length || posting.remote.applicantCountries.some((country) => !country.trim()))) return null;
  const jobLocation = posting.locations.map((location) => ({
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      ...(location.streetAddress ? { streetAddress: location.streetAddress } : {}),
      addressLocality: location.locality,
      ...(location.region ? { addressRegion: location.region } : {}),
      ...(location.postalCode ? { postalCode: location.postalCode } : {}),
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
    ...(jobLocation.length ? { jobLocation: jobLocation.length === 1 ? jobLocation[0] : jobLocation } : {}),
    ...(posting.remote ? {
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: posting.remote.applicantCountries.map((name) => ({ "@type": "Country", name })),
    } : {}),
    // Google's baseSalary is not a guess, a market average, or an allowance-inclusive gross package.
    ...(item.remuneration?.payType === "base" ? {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: item.remuneration.currency,
        value: { "@type": "QuantitativeValue", value: item.remuneration.amount, unitText: item.remuneration.period },
      },
    } : {}),
    identifier: {
      "@type": "PropertyValue",
      name: item.organization,
      value: item.slug,
    },
    url: pageUrl,
  };
}
