export type FreshnessState = "fresh" | "due" | "stale" | "future" | "unknown";

export const freshnessPolicy = {
  services: { warnAfterDays: 14, staleAfterDays: 30 },
  jobs: { warnAfterDays: 7, staleAfterDays: 14 },
  tour: { warnAfterDays: 10, staleAfterDays: 21 },
  movies: { warnAfterDays: 10, staleAfterDays: 21 },
  entertainmentGuide: { warnAfterDays: 7, staleAfterDays: 14 },
  releases: { warnAfterDays: 5, staleAfterDays: 10 },
  youtube: { warnAfterDays: 2, staleAfterDays: 10 },
} as const;

const DAY_MS = 86_400_000;

function dateOnly(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : value.slice(0, 10);
}

export function isoToday(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

export function daysSinceIsoDate(value: string, now = new Date()) {
  const normalized = dateOnly(value);
  const parsed = Date.parse(normalized + "T00:00:00.000Z");
  if (!Number.isFinite(parsed)) return Number.POSITIVE_INFINITY;
  const today = Date.parse(isoToday(now) + "T00:00:00.000Z");
  return Math.floor((today - parsed) / DAY_MS);
}

export function getFreshnessState(
  value: string,
  policy: { warnAfterDays: number; staleAfterDays: number },
  now = new Date(),
): FreshnessState {
  if (!value || !/^\d{4}-\d{2}-\d{2}/.test(value)) return "unknown";
  const age = daysSinceIsoDate(value, now);
  if (!Number.isFinite(age)) return "unknown";
  if (age < 0) return "future";
  if (age > policy.staleAfterDays) return "stale";
  if (age > policy.warnAfterDays) return "due";
  return "fresh";
}

export type ReleaseLifecycle = "new" | "now-showing" | "upcoming" | "ended";

export type ReleaseLifecycleInput = {
  kind: "streaming" | "cinema" | "event";
  status: "new" | "now-showing" | "upcoming";
  startDate?: string;
  endDate?: string;
};

export function getEffectiveReleaseStatus(item: ReleaseLifecycleInput, now = new Date()): ReleaseLifecycle {
  if (!item.startDate) return item.status;

  const today = isoToday(now);
  if (item.startDate > today) return "upcoming";

  if (item.kind === "event") {
    if (item.endDate && item.endDate < today) return "ended";
    return "now-showing";
  }

  return item.kind === "cinema" ? "now-showing" : "new";
}
