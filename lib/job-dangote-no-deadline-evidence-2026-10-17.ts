import type { CareerOpportunity } from "@/lib/jobs";
import { officialJobPostingEvidence20261015 } from "@/lib/job-official-posting-evidence-2026-10-15";

// These three original issuer-owned SuccessFactors pages were checked on
// 17 October 2026. Each displayed an exact role, a dated posting and
// an "Apply now" control, but NONE published a closing date.
// A missing date must never be rewritten as "rolling" or "always open".
type ConfirmedNoDeadline = {
  sourceUrl: string;
  title: string;
  datePosted: string;
  location: string;
};

export const dangoteUndatedDeadlineEvidence20261017: Record<string, ConfirmedNoDeadline> = {
  "dangote-ibese-mechanical-technician-l12-2026": {
    sourceUrl: "https://careers.dangote.com/job/Ibese-Plant-Technician%2C-Mechanical-L1%262-Ibes/820138802/",
    title: "Technician, Mechanical L1&2",
    datePosted: "2026-10-10",
    location: "Ibese Plant",
  },
  "dangote-ibese-power-plant-mechanical-engineer-2026": {
    sourceUrl: "https://careers.dangote.com/job/Ibese-Plant-Mechanical-Engineer-Power-Plant-Ibes/820440602/",
    title: "Mechanical Engineer - Power Plant",
    datePosted: "2026-10-07",
    location: "Ibese Plant",
  },
  "dangote-lagos-audit-analyst-2026": {
    sourceUrl: "https://careers.dangote.com/job/Head-Office-Lagos-Audit-Analyst-Head/1374485457/",
    title: "Audit Analyst for Nigeria",
    datePosted: "2026-10-09",
    location: "Head Office - Lagos",
  },
};

export const dangoteDeadlineReviewNote20261017 =
  "Original Dangote job page individually checked on 17 October 2026: it lists the exact job title, location, posting date and Apply now entry point, but no closing date. Deadline is NOT confirmed, and this is NOT evidence of rolling or perpetual hiring. Recheck the named employer role before applying.";

export function applyDangoteDocumentedNoDeadline20261017(item: CareerOpportunity): CareerOpportunity {
  const checked = dangoteUndatedDeadlineEvidence20261017[item.slug];
  const posted = officialJobPostingEvidence20261015[item.slug];
  if (!checked || !posted || item.kind !== "vacancy" || item.status !== "open" ||
      item.officialUrl !== checked.sourceUrl || posted.sourceUrl !== checked.sourceUrl ||
      posted.posting.jobTitle !== checked.title || posted.posting.datePosted !== checked.datePosted ||
      item.deadline) return item;

  const sources = item.sources.map(source => source.url === checked.sourceUrl
    ? { ...source, lastChecked: "2026-10-17" } : source);
  if (!sources.some(source => source.url === checked.sourceUrl)) sources.push({
    label: "Dangote Industries — named job, original dated listing and Apply now control",
    url: checked.sourceUrl, lastChecked: "2026-10-17",
  });
  return {
    ...item,
    verifiedAt: "2026-10-17",
    sources,
    nextMilestone: "Dangote's exact role page had an Apply now control on 17 October 2026 but no closing date. This does not establish a rolling intake; recheck the employer notice before submission.",
    sourceNotes: [...item.sourceNotes, dangoteDeadlineReviewNote20261017],
  };
}

function fresh(date: string, today: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{4}-\d{2}-\d{2}$/.test(today)) return false;
  const now = Date.parse(today + "T00:00:00Z");
  const then = Date.parse(date + "T00:00:00Z");
  return Number.isFinite(now) && Number.isFinite(then) && then <= now &&
    now - then <= 14 * 86400000;
}

/**
 * Resolve only the already-examined absence-of-deadline issue.
 * Never infer that a generic careers board, missing deadline, or stale
 * role proves perpetual hiring. All other Jobs audit findings still apply.
 */
export function hasDocumentedDangoteDeadlineOmission(
  item: CareerOpportunity, today: string,
): boolean {
  const checked = dangoteUndatedDeadlineEvidence20261017[item.slug];
  const employer = officialJobPostingEvidence20261015[item.slug];
  if (!checked || !employer || !fresh(item.verifiedAt, today) ||
      item.kind !== "vacancy" || item.status !== "open" || item.deadline ||
      item.officialUrl !== checked.sourceUrl || employer.sourceUrl !== checked.sourceUrl ||
      item.posting?.jobTitle !== checked.title ||
      item.posting?.datePosted !== checked.datePosted ||
      item.posting?.locations[0]?.country !== "NG" ||
      !item.location.includes(checked.location.startsWith("Head Office") ? "Lagos" : "Ibese") ||
      !item.sourceNotes.includes(dangoteDeadlineReviewNote20261017) ||
      !item.nextMilestone?.includes("does not establish a rolling intake")) return false;
  return item.sources.some(source => source.url === checked.sourceUrl &&
    fresh(source.lastChecked, today));
}
