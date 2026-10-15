/**
 * Pure traffic rollups for the protected Visits dashboard.
 * A missing API date is unknown, NOT a measured zero. Keep GA4 page views
 * separate from Search Console impressions/clicks (different phenomena).
 */
export type TrafficDay = {
  date: string;
  pageViews?: number;
  sessions?: number;
  impressions?: number;
  clicks?: number;
  position?: number;
};

export type PeriodRow = {
  key: "1d" | "7d" | "30d" | "90d" | "all";
  startDate: string;
  endDate: string;
  gscStartDate: string;
  gscEndDate: string;
  pageViews: number | null;
  sessions: number | null;
  clicks: number | null;
  impressions: number | null;
  position: number | null;
  previousPageViews: number | null;
  previousSessions: number | null;
  previousClicks: number | null;
  previousImpressions: number | null;
  previousPosition: number | null;
};

export function shiftIsoDay(day: string, offset: number): string {
  const date = new Date(day + "T12:00:00Z");
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}

export function aggregateMetric(
  rows: TrafficDay[],
  from: string,
  through: string,
  metric: "pageViews" | "sessions" | "impressions" | "clicks",
): number | null {
  const reported = rows.filter((row) =>
    row.date >= from && row.date <= through && typeof row[metric] === "number",
  );
  // Never render unavailable/unfinished API periods as zero.
  if (!reported.length) return null;
  return reported.reduce((total, row) => total + (row[metric] ?? 0), 0);
}

/** Search Console average position is impression-weighted, not a simple mean. */
export function averagePosition(rows: TrafficDay[], from: string, through: string): number | null {
  const valid = rows.filter((row) => row.date >= from && row.date <= through
    && typeof row.position === "number" && typeof row.impressions === "number" && row.impressions > 0);
  const impressions = valid.reduce((sum, row) => sum + (row.impressions ?? 0), 0);
  return impressions ? valid.reduce((sum, row) => sum + row.position! * row.impressions!, 0) / impressions : null;
}

export function buildPeriodRows(
  ga4Days: TrafficDay[],
  gscDays: TrafficDay[],
  todayLagos: string,
  all: { ga4StartDate: string; gscStartDate: string; pageViews: number | null; sessions: number | null; clicks: number | null; impressions: number | null; position?: number | null },
  todayPacific = todayLagos,
): PeriodRow[] {
  const periods: Array<{ key: PeriodRow["key"]; days: number }> = [
    { key: "1d", days: 1 },
    { key: "7d", days: 7 },
    { key: "30d", days: 30 },
    { key: "90d", days: 90 },
  ];
  const rows: PeriodRow[] = periods.map(({ key, days }) => {
    const startDate = shiftIsoDay(todayLagos, 1 - days);
    const previousEnd = shiftIsoDay(startDate, -1);
    const previousStart = shiftIsoDay(startDate, -days);
    const gscStartDate = shiftIsoDay(todayPacific, 1 - days);
    const gscPreviousEnd = shiftIsoDay(gscStartDate, -1);
    const gscPreviousStart = shiftIsoDay(gscStartDate, -days);
    return {
      key,
      startDate,
      endDate: todayLagos,
      gscStartDate,
      gscEndDate: todayPacific,
      pageViews: aggregateMetric(ga4Days, startDate, todayLagos, "pageViews"),
      sessions: aggregateMetric(ga4Days, startDate, todayLagos, "sessions"),
      impressions: aggregateMetric(gscDays, gscStartDate, todayPacific, "impressions"),
      clicks: aggregateMetric(gscDays, gscStartDate, todayPacific, "clicks"),
      position: averagePosition(gscDays, gscStartDate, todayPacific),
      previousPageViews: aggregateMetric(ga4Days, previousStart, previousEnd, "pageViews"),
      previousSessions: aggregateMetric(ga4Days, previousStart, previousEnd, "sessions"),
      previousClicks: aggregateMetric(gscDays, gscPreviousStart, gscPreviousEnd, "clicks"),
      previousImpressions: aggregateMetric(gscDays, gscPreviousStart, gscPreviousEnd, "impressions"),
      previousPosition: averagePosition(gscDays, gscPreviousStart, gscPreviousEnd),
    };
  });
  rows.push({
    key: "all",
    // Google and GA4 can have different valid retention/clean-traffic starts.
    startDate: all.ga4StartDate < all.gscStartDate ? all.ga4StartDate : all.gscStartDate,
    endDate: todayLagos,
    gscStartDate: all.gscStartDate,
    gscEndDate: todayPacific,
    pageViews: all.pageViews,
    sessions: all.sessions,
    clicks: all.clicks,
    impressions: all.impressions,
    position: all.position ?? null,
    previousPageViews: null,
    previousSessions: null,
    previousClicks: null,
    previousImpressions: null,
    previousPosition: null,
  });
  return rows;
}

export function metricDelta(current: number | null, previous: number | null): number | null {
  return current === null || previous === null || previous === 0 ? null : ((current - previous) / previous) * 100;
}
