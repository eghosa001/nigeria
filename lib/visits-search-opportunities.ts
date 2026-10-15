import type { InsightRange, SearchPage } from "./admin-visits-insights";
import { shiftIsoDay } from "./analytics-period-rollups";

/** A triage signal, not a prediction of how many clicks an edit will generate. */
export function findSearchOpportunities(pages: SearchPage[], limit = 12): SearchPage[] {
  return pages.filter((page) => page.impressions >= 100
    && page.position > 0 && page.position <= 15 && page.ctr < 0.01)
    .sort((a, b) => b.impressions - a.impressions || a.ctr - b.ctr)
    .slice(0, limit);
}

/** Only query pages that belong to the public website. */
export function validateSearchPage(value: string | null): string | null {
  if (!value || value.length > 2048) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      && (url.hostname === "mynigeriaguide.com" || url.hostname === "www.mynigeriaguide.com")
      && !url.hash ? url.href : null;
  } catch { return null; }
}

/** Search Console day boundaries are Pacific, unlike GA4's Lagos dates. */
export function searchPeriodStart(range: InsightRange, pacificDay: string): string {
  if (range === "all") {
    const date = new Date(pacificDay + "T12:00:00Z");
    date.setUTCMonth(date.getUTCMonth() - 16);
    return date.toISOString().slice(0, 10);
  }
  const days = { "1d": 1, "7d": 7, "30d": 30, "90d": 90 }[range];
  return shiftIsoDay(pacificDay, 1 - days);
}
