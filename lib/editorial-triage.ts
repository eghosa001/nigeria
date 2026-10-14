export type EditorialKind = "Services" | "Tour" | "Movies" | "Series" | "Jobs" | "YouTube";
export type EditorialReviewInput = {
  pillar: EditorialKind;
  url: string;
  title: string;
  words: number;
  sourceCount: number;
  issues: string[];
  pageType: "editorial-guide" | "profile" | "listing";
  checkedAt?: string;
};

const WARN_AFTER_DAYS: Record<EditorialKind, number> = {
  Services: 30,
  Tour: 21,
  Movies: 21,
  Series: 21,
  Jobs: 14,
  YouTube: 21,
};

function reviewedAge(value: string, todayIso: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = Date.parse(value + "T00:00:00Z");
  const now = Date.parse(todayIso + "T00:00:00Z");
  if (!Number.isFinite(date) || !Number.isFinite(now) || new Date(date).toISOString().slice(0, 10) !== value) return null;
  return Math.floor((now - date) / 86_400_000);
}

/**
 * Screening priorities only: not an external source check, a plagiarism finding,
 * or evidence that the visible rendered page is thin.
 */
export function assessEditorialCandidate(input: EditorialReviewInput, todayIso: string) {
  const flags: string[] = [...input.issues];
  const add = (value: string) => { if (!flags.includes(value)) flags.push(value); };
  if (input.sourceCount === 0) add("no-recorded-source");
  else if (input.sourceCount === 1) add("single-source-check");

  if (input.checkedAt !== undefined) {
    const age = reviewedAge(input.checkedAt, todayIso);
    if (age === null) add("invalid-review-date");
    else if (age < 0) add("future-review-date");
    else if (age > WARN_AFTER_DAYS[input.pillar]) add("source-date-recheck");
  }

  if (input.pageType === "editorial-guide" && input.words < 220) add("brief-authored-guide");
  if (input.pageType === "profile" && input.words < 65) add("brief-profile-fields");
  if (input.pageType === "listing" && input.words < 90) add("brief-job-listing-fields");

  const weight = (flag: string) => {
    if (flag === "official-information-conflict" || flag === "future-review-date" || flag === "no-recorded-source") return 100;
    if (flag === "invalid-review-date") return 80;
    if (flag === "source-date-recheck" || flag === "brief-authored-guide") return 45;
    if (flag === "brief-profile-fields" || flag === "brief-job-listing-fields" || flag === "missing-cast-verification") return 35;
    if (flag === "single-source-check") return 8;
    return 20;
  };
  const score = flags.reduce((sum, flag) => sum + weight(flag), 0);
  return {
    ...input,
    reviewFlags: flags,
    priority: score >= 80 ? "urgent" : score >= 40 ? "high" : "routine",
    score,
  };
}

export function sortEditorialCandidates<T extends {score: number; url: string; title: string}>(items: T[]) {
  return [...items].sort((a, b) => b.score - a.score || a.url.localeCompare(b.url) || a.title.localeCompare(b.title));
}
