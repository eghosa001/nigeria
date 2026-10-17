import { ANALYTICS_CLEAN_START, ANALYTICS_PRODUCTION_HOSTS } from "@/lib/analytics-safety";
import { runReport, searchConsoleQuery, getHourlySearchPerformance, runRealtime, dateInTimeZone, analyticsReadConfigured, verifyAnalyticsConnection, type AnalyticsConnectionStatus } from "@/lib/analytics-data";
import { buildPeriodRows, shiftIsoDay, type PeriodRow, type TrafficDay } from "@/lib/analytics-period-rollups";
import { getPostHogOverview, type PostHogOverview } from "@/lib/posthog-data";
import { getPostHogDailyViews, type PostHogDailyViews } from "@/lib/posthog-daily-views";
import { POSTHOG_COLLECTION_START } from "@/lib/posthog-config";
import type { SearchConsoleHourlyReport } from "@/lib/search-console-hourly";

export type InsightRange = "1d" | "7d" | "30d" | "90d" | "all";
export type SearchPage = { page: string; clicks: number; impressions: number; ctr: number; position: number };
export type VisitedPage = { path: string; title: string; views: number; users: number };
export type InsightsReport = {
  generatedAt: string;
  selectedRange: InsightRange;
  periods: PeriodRow[];
  daily: TrafficDay[];
  ga4StartDate: string;
  gscStartDate: string;
  detailStartDate: string;
  detailGscStartDate: string;
  latestGA4Date: string | null;
  latestGSCDate: string | null;
  ga4Connection: AnalyticsConnectionStatus | null;
  /** Unfiltered GA4 count is diagnostic only: it can include tests and preview hosts. */
  ga4RawPageViews: number | null;
  pageViewsByPage: VisitedPage[];
  searchPages: SearchPage[];
  pageListsTruncated: { ga4: boolean; gsc: boolean };
  errors: { ga4: string | null; gsc: string | null; ga4Pages: string | null; gscPages: string | null };
  realtime: { activeUsers: number; pageViews: number } | null;
  hourly: SearchConsoleHourlyReport;
  posthog: PostHogOverview;
  posthogDaily: PostHogDailyViews;
};

const dayCounts: Record<Exclude<InsightRange, "all">, number> = { "1d": 1, "7d": 7, "30d": 30, "90d": 90 };
const cache = new Map<InsightRange, { expiresAt: number; value: InsightsReport }>();
let overviewCache: { expiresAt: number; value: Awaited<ReturnType<typeof queryOverview>> } | null = null;

function earliestSearchDay(day: string) {
  const date = new Date(day + "T12:00:00Z");
  date.setUTCMonth(date.getUTCMonth() - 16);
  return date.toISOString().slice(0, 10);
}

/** Preserve the exact production-only GA4 exclusions used by existing admin analytics. */
const cleanFilter = {
  dimensionFilter: {
    andGroup: {
      expressions: [
        { filter: { fieldName: "hostName", inListFilter: { values: [...ANALYTICS_PRODUCTION_HOSTS], caseSensitive: false } } },
        { notExpression: { orGroup: { expressions: [
          { filter: { fieldName: "pagePath", stringFilter: { matchType: "BEGINS_WITH", value: "/admin", caseSensitive: false } } },
          { filter: { fieldName: "pagePath", stringFilter: { matchType: "BEGINS_WITH", value: "/api", caseSensitive: false } } },
          { filter: { fieldName: "pagePath", stringFilter: { matchType: "BEGINS_WITH", value: "/_next", caseSensitive: false } } },
        ] } } },
      ],
    },
  },
};

function value(row: { metricValues?: Array<{ value?: string }> }, index: number): number {
  return Number(row.metricValues?.[index]?.value ?? 0);
}
function textValue(row: { dimensionValues?: Array<{ value?: string }> }, index: number): string {
  return row.dimensionValues?.[index]?.value ?? "";
}
const reason = (error: unknown) => error instanceof Error ? error.message : "Reporting source unavailable.";
function resultError<T>(result: PromiseSettledResult<T>): string | null {
  return result.status === "rejected" ? reason(result.reason) : null;
}

async function queryOverview() {
  const lagosDay = dateInTimeZone("Africa/Lagos");
  const pacificDay = dateInTimeZone("America/Los_Angeles");
  const ga4StartDate = ANALYTICS_CLEAN_START;
  const gscStartDate = earliestSearchDay(pacificDay);
  const [ga4Daily, ga4Lifetime, gscDaily, gscLifetime] = await Promise.allSettled([
    analyticsReadConfigured() ? runReport({
      dateRanges: [{ startDate: ga4StartDate, endDate: "today" }],
      dimensions: [{ name: "date" }], metrics: [{ name: "screenPageViews" }, { name: "sessions" }],
      orderBys: [{ dimension: { dimensionName: "date" } }], limit: 2000, ...cleanFilter,
    }) : Promise.reject(new Error("GA4 Data API not configured.")),
    analyticsReadConfigured() ? runReport({
      dateRanges: [{ startDate: ga4StartDate, endDate: "today" }],
      metrics: [{ name: "screenPageViews" }, { name: "sessions" }],
      metricAggregations: ["TOTAL"], ...cleanFilter,
    }) : Promise.reject(new Error("GA4 Data API not configured.")),
    searchConsoleQuery({
      startDate: gscStartDate, endDate: pacificDay,
      type: "web", dataState: "all", dimensions: ["date"],
      aggregationType: "byProperty", rowLimit: 1000,
    }),
    searchConsoleQuery({
      startDate: gscStartDate, endDate: pacificDay,
      type: "web", dataState: "all", aggregationType: "byProperty", rowLimit: 1,
    }),
  ]);

  const ga4Days: TrafficDay[] = ga4Daily.status === "fulfilled"
    ? (ga4Daily.value.rows ?? []).map((row) => ({
        date: textValue(row, 0).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"),
        pageViews: value(row, 0), sessions: value(row, 1),
      })).filter((row) => /^\d{4}-\d{2}-\d{2}$/.test(row.date)) : [];
  const gscDays: TrafficDay[] = gscDaily.status === "fulfilled"
    ? (gscDaily.value.rows ?? []).map((row) => ({
        date: row.keys?.[0] ?? "", impressions: row.impressions ?? 0, clicks: row.clicks ?? 0,
        position: row.position ?? 0,
      })).filter((row) => /^\d{4}-\d{2}-\d{2}$/.test(row.date)) : [];
  const ga4Totals = ga4Lifetime.status === "fulfilled"
    ? (ga4Lifetime.value.totals?.[0] ?? ga4Lifetime.value.rows?.[0] ?? null) : null;
  // When filtered traffic appears empty, probe the unfiltered property to
  // diagnose host/path-filter mistakes. NEVER display raw data as public visits.
  const cleanViews = ga4Totals ? value(ga4Totals, 0) : null;
  let ga4RawPageViews: number | null = null;
  if (ga4Daily.status === "fulfilled" && cleanViews !== null && cleanViews <= 1) {
    try {
      const raw = await runReport({
        dateRanges: [{ startDate: ga4StartDate, endDate: "today" }],
        metrics: [{ name: "screenPageViews" }],
      });
      const rawRow = raw.totals?.[0] ?? raw.rows?.[0];
      if (rawRow) ga4RawPageViews = value(rawRow, 0);
    } catch { /* Diagnostics must not break the Visits dashboard. */ }
  }
  const gscTotals = gscLifetime.status === "fulfilled" ? gscLifetime.value.rows?.[0] : null;

  const periods = buildPeriodRows(ga4Days, gscDays, lagosDay, {
    ga4StartDate, gscStartDate,
    pageViews: ga4Totals ? value(ga4Totals, 0) : null,
    sessions: ga4Totals ? value(ga4Totals, 1) : null,
    clicks: gscLifetime.status === "fulfilled" ? (gscTotals?.clicks ?? 0) : null,
    impressions: gscLifetime.status === "fulfilled" ? (gscTotals?.impressions ?? 0) : null,
    position: gscLifetime.status === "fulfilled" ? (gscTotals?.position ?? null) : null,
  }, pacificDay);
  const daily = new Map<string, TrafficDay>();
  for (const row of ga4Days) daily.set(row.date, row);
  for (const row of gscDays) daily.set(row.date, { ...(daily.get(row.date) ?? { date: row.date }), ...row });

  return {
    ga4StartDate, gscStartDate, periods,
    daily: [...daily.values()].sort((a, b) => a.date.localeCompare(b.date)).filter((row) => row.date >= ga4StartDate || row.date >= gscStartDate),
    latestGA4Date: ga4Days.at(-1)?.date ?? null,
    latestGSCDate: gscDays.at(-1)?.date ?? null,
    ga4Error: resultError(ga4Daily) || resultError(ga4Lifetime),
    ga4RawPageViews,
    gscError: resultError(gscDaily) || resultError(gscLifetime),
  };
}

async function getOverview(forceFresh: boolean) {
  if (!forceFresh && overviewCache && overviewCache.expiresAt > Date.now()) return overviewCache.value;
  const value = await queryOverview();
  overviewCache = { expiresAt: Date.now() + 5 * 60_000, value };
  return value;
}

export async function getVisitsInsights(range: InsightRange, forceFresh = false): Promise<InsightsReport> {
  const cached = cache.get(range);
  if (!forceFresh && cached && cached.expiresAt > Date.now()) {
    // Current realtime values may change without historical source reports changing.
    const [realtime, hourly] = await Promise.all([
      analyticsReadConfigured() ? runRealtime().catch(() => null) : Promise.resolve(null),
      getHourlySearchPerformance(),
    ]);
    return { ...cached.value, realtime, hourly };
  }

  const lagosDay = dateInTimeZone("Africa/Lagos");
  const gscDay = dateInTimeZone("America/Los_Angeles");
  const detailStartDate = range === "all" ? ANALYTICS_CLEAN_START : shiftIsoDay(lagosDay, 1 - dayCounts[range]);
  const detailGscStartDate = range === "all" ? earliestSearchDay(gscDay) : shiftIsoDay(gscDay, 1 - dayCounts[range]);
  const [overview, ga4Pages, gscPages, realtime, hourly, posthog, ga4Connection, posthogDaily] = await Promise.all([
    getOverview(forceFresh),
    analyticsReadConfigured() ? runReport({
      dateRanges: [{ startDate: detailStartDate, endDate: "today" }],
      dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
      metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 2500, ...cleanFilter,
    }).then((data) => ({ data, error: null as string | null })).catch((error: unknown) => ({
      data: null, error: reason(error),
    })) : Promise.resolve({ data: null, error: "GA4 Data API not configured." }),
    searchConsoleQuery({
      startDate: detailGscStartDate, endDate: gscDay,
      type: "web", dataState: "all", dimensions: ["page"], aggregationType: "byPage",
      rowLimit: 25000,
    }).then((data) => ({ data, error: null as string | null })).catch((error: unknown) => ({
      data: null, error: reason(error),
    })),
    analyticsReadConfigured() ? runRealtime().catch(() => null) : Promise.resolve(null),
    getHourlySearchPerformance(),
    getPostHogOverview(detailStartDate > POSTHOG_COLLECTION_START ? detailStartDate : POSTHOG_COLLECTION_START, lagosDay, forceFresh),
    analyticsReadConfigured() ? verifyAnalyticsConnection().catch(() => null) : Promise.resolve(null),
    getPostHogDailyViews(detailStartDate, lagosDay, forceFresh),
  ]);
  const report: InsightsReport = {
    generatedAt: new Date().toISOString(), selectedRange: range,
    periods: overview.periods, daily: overview.daily,
    ga4StartDate: overview.ga4StartDate, gscStartDate: overview.gscStartDate,
    detailStartDate, detailGscStartDate,
    latestGA4Date: overview.latestGA4Date, latestGSCDate: overview.latestGSCDate,
    ga4RawPageViews: overview.ga4RawPageViews, ga4Connection,
    pageViewsByPage: (ga4Pages.data?.rows ?? []).map((row) => ({
      path: textValue(row, 0) || "/", title: textValue(row, 1) || "Untitled page",
      views: value(row, 0), users: value(row, 1),
    })),
    searchPages: (gscPages.data?.rows ?? []).filter((row) => Boolean(row.keys?.[0])).map((row) => ({
      page: row.keys![0], clicks: row.clicks ?? 0,
      impressions: row.impressions ?? 0, ctr: row.ctr ?? 0, position: row.position ?? 0,
    })),
    pageListsTruncated: {
      ga4: (ga4Pages.data?.rows?.length ?? 0) >= 2500,
      gsc: (gscPages.data?.rows?.length ?? 0) >= 25000,
    },
    errors: { ga4: overview.ga4Error, gsc: overview.gscError, ga4Pages: ga4Pages.error, gscPages: gscPages.error },
    realtime, hourly, posthog, posthogDaily,
  };
  cache.set(range, { expiresAt: Date.now() + 5 * 60_000, value: report });
  return report;
}
