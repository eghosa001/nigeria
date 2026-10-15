import type { InsightsReport } from "./admin-visits-insights";

/**
 * Download everything actually supplied to the protected Visits dashboard.
 * These exports use the *all-available* report so the page tables aren't
 * restricted to whichever time tab happens to be selected.
 *
 * "All" is subject to Google retention, API row limits and the website's
 * clean GA4 tracking start. The report's daily array is a 90-day window.
 */
export function completeVisitsReport(report: InsightsReport) {
  return {
    schemaVersion: 1,
    website: "mynigeriaguide.com",
    description: "Complete machine-readable Visits dashboard source snapshot. All rows returned by the connected APIs, including provider status and reporting limits.",
    reporting: {
      exportedRange: report.selectedRange,
      generatedAt: report.generatedAt,
      gscTimezone: "America/Los_Angeles",
      ga4Timezone: "Africa/Lagos",
      sourceDifferences: "Search impressions/clicks, GA4 sessions/page views and PostHog visitors are distinct measures; do not sum them.",
      availableHistory: "GSC limited to up to 16 months of Google history, GA4 to clean production tracking. Daily trend is the latest 90 days; lifetime metrics are separately included in periods.",
      searchPageRowsReturned: report.searchPages.length,
      websitePageRowsReturned: report.pageViewsByPage.length,
      gscRowsTruncated: report.pageListsTruncated.gsc,
      ga4RowsTruncated: report.pageListsTruncated.ga4,
      note: "Unavailable metrics are null rather than zero. Today's reporting, hourly Search Console and provider figures may be provisional or delayed.",
    },
    report,
  };
}

type CsvRecord = Record<string, unknown>;
const headers = [
  "section", "source", "period", "start_date", "end_date", "date_or_hour",
  "page_or_field", "page_title", "impressions", "clicks", "ctr_ratio", "average_position",
  "page_views", "sessions", "active_users", "visitors",
  "previous_impressions", "previous_clicks", "previous_page_views",
  "previous_sessions", "previous_position", "value", "note",
] as const;

function csvValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  const string = typeof value === "object" ? JSON.stringify(value) : String(value);
  // Spreadsheet formula injection: untrusted GSC pages/titles and error text
  // must remain inert even after opening the export in Excel or Sheets.
  const safe = typeof value === "string" && /^[\s\u0000-\u001f]*[=+\-@]/.test(string)
    ? "'" + string : string;
  return '"' + safe.replace(/"/g, '""') + '"';
}

export function completeVisitsCsv(report: InsightsReport): string {
  const records: CsvRecord[] = [];
  const addMeta = (name: string, value: unknown, source = "dashboard", note = "") =>
    records.push({ section: "metadata", source, period: report.selectedRange,
      page_or_field: name, value, note });
  addMeta("website", "mynigeriaguide.com");
  addMeta("generatedAt", report.generatedAt);
  addMeta("reportingPeriod", report.selectedRange);
  addMeta("ga4TimeZone", "Africa/Lagos");
  addMeta("gscTimeZone", "America/Los_Angeles");
  addMeta("ga4StartDate", report.ga4StartDate, "GA4");
  addMeta("gscStartDate", report.gscStartDate, "GSC", "GSC rolling retention, up to 16 months");
  addMeta("detailStartDate", report.detailStartDate, "GA4");
  addMeta("detailGscStartDate", report.detailGscStartDate, "GSC");
  addMeta("latestGA4Date", report.latestGA4Date, "GA4");
  addMeta("latestGSCDate", report.latestGSCDate, "GSC");
  addMeta("gscSearchPagesTruncated", report.pageListsTruncated.gsc, "GSC", "Provider rows may be capped at 25,000");
  addMeta("ga4ViewedPagesTruncated", report.pageListsTruncated.ga4, "GA4", "Provider rows may be capped at 2,500");
  addMeta("gscSearchPageRowsReturned", report.searchPages.length, "GSC");
  addMeta("ga4ViewedPageRowsReturned", report.pageViewsByPage.length, "GA4");
  addMeta("dailyTrendCoverage", "Latest 90 reported days", "dashboard", "Lifetime totals are independently available below");
  addMeta("measurementWarning",
    "Never add GA4 views/sessions, GSC impressions/clicks, or PostHog visitors: different measures.");
  addMeta("unavailableWarning", "Blank metric cells are unavailable and must not be interpreted as zero.");

  for (const row of report.periods) {
    records.push({
      section: "period_summary", source: "GSC + GA4", period: row.key,
      start_date: row.startDate, end_date: row.endDate, date_or_hour: row.gscStartDate + " to " + row.gscEndDate,
      impressions: row.impressions, clicks: row.clicks,
      ctr_ratio: row.impressions && row.clicks !== null ? row.clicks / row.impressions : null,
      average_position: row.position,
      page_views: row.pageViews, sessions: row.sessions,
      previous_impressions: row.previousImpressions,
      previous_clicks: row.previousClicks,
      previous_page_views: row.previousPageViews,
      previous_sessions: row.previousSessions,
      previous_position: row.previousPosition,
      note: "start_date/end_date = GA4 Lagos; date_or_hour = GSC Pacific range",
    });
  }
  for (const day of report.daily) {
    records.push({
      section: "daily_trend", source: "GSC + GA4", period: "latest_90_days",
      date_or_hour: day.date, impressions: day.impressions, clicks: day.clicks,
      ctr_ratio: day.impressions && day.clicks !== undefined ? day.clicks / day.impressions : null,
      average_position: day.position, page_views: day.pageViews, sessions: day.sessions,
    });
  }
  for (const page of report.searchPages) {
    records.push({
      section: "search_page", source: "GSC", period: report.selectedRange,
      start_date: report.detailGscStartDate, page_or_field: page.page,
      impressions: page.impressions, clicks: page.clicks, ctr_ratio: page.ctr,
      average_position: page.position,
    });
  }
  for (const page of report.pageViewsByPage) {
    records.push({
      section: "visited_page", source: "GA4", period: report.selectedRange,
      start_date: report.detailStartDate, page_or_field: page.path, page_title: page.title,
      page_views: page.views, active_users: page.users,
    });
  }
  if (report.realtime) {
    for (const [name, value] of Object.entries(report.realtime)) {
      addMeta("last30Minutes." + name, value, "GA4", "Realtime 30 minutes, not a full day");
    }
  } else {
    addMeta("last30Minutes", null, "GA4", "Not available");
  }
  for (const [name, value] of Object.entries(report.hourly)) {
    if (name !== "rows") addMeta("hourly." + name, value, "GSC", "Hourly search data may be partial");
  }
  for (const hour of report.hourly.rows ?? []) {
    records.push({
      section: "gsc_hour", source: "GSC", period: "hourly",
      date_or_hour: hour.hour, impressions: hour.impressions, clicks: hour.clicks,
      ctr_ratio: hour.ctr, average_position: hour.position,
      note: hour.provisional ? "Provisional" : "Reported",
    });
  }
  for (const [name, value] of Object.entries(report.posthog)) {
    addMeta("posthog." + name, value, "PostHog", "Production-filtered and source-specific");
  }
  for (const [name, value] of Object.entries(report.errors)) {
    addMeta("errors." + name, value, "dashboard", "Null indicates no reported error");
  }

  const lines = [headers.map(csvValue).join(",")];
  for (const record of records) lines.push(headers.map((field) => csvValue(record[field])).join(","));
  return lines.join("\r\n") + "\r\n";
}
