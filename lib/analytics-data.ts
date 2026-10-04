import { Buffer } from "node:buffer";
import { ANALYTICS_CLEAN_START, analyticsStartDate } from "@/lib/analytics-safety";

export type AnalyticsRange = "7d" | "30d" | "90d";
export type AnalyticsTrafficMode = "all" | "clean";

export type SearchPerformanceSummary = {
  available: boolean;
  siteUrl: string;
  startDate: string;
  endDate: string;
  latestDate: string | null;
  firstIncompleteDate: string | null;
  impressions: number | null;
  clicks: number | null;
  ctr: number | null;
  position: number | null;
  error?: string;
};

export type AnalyticsDashboardData = {
  range: AnalyticsRange;
  mode: AnalyticsTrafficMode;
  propertyId: string;
  generatedAt: string;
  dataStartDate: string;
  cleanStartDate: string;
  summary: {
    totalUsers: number;
    activeUsers: number;
    sessions: number;
    pageViews: number;
    engagedSessions: number;
    engagementRate: number;
  };
  realtimeActiveUsers: number | null;
  daily: Array<{ date: string; users: number; sessions: number; pageViews: number }>;
  countries: Array<{ country: string; users: number; sessions: number; pageViews: number }>;
  pages: Array<{ path: string; title: string; users: number; pageViews: number }>;
  referrers: Array<{ source: string; medium: string; sessions: number; users: number }>;
  interactions: Array<{ event: string; count: number }>;
  searchPerformance: SearchPerformanceSummary;
};

type ReportRow = {
  dimensionValues?: Array<{ value?: string }>;
  metricValues?: Array<{ value?: string }>;
};

type RunReportResponse = {
  rows?: ReportRow[];
  totals?: Array<{ metricValues?: Array<{ value?: string }> }>;
};

type BatchRunReportsResponse = {
  reports?: RunReportResponse[];
};

type SearchAnalyticsRow = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

type SearchAnalyticsResponse = {
  rows?: SearchAnalyticsRow[];
  metadata?: { first_incomplete_date?: string };
};

const interactionEvents = [
  "service_search_click",
  "official_link_click",
  "official_source_click",
  "guide_share",
  "guide_watch_add",
  "guide_watch_remove",
  "process_start",
  "process_complete",
];

const tokenCache = new Map<string, { token: string; expiresAt: number }>();
const tokenPromises = new Map<string, Promise<string>>();
const reportCache = new Map<string, { expiresAt: number; data: AnalyticsDashboardData }>();

function config() {
  const propertyId = process.env.GA4_PROPERTY_ID?.trim();
  const clientEmail = process.env.GA4_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GA4_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();
  return { propertyId, clientEmail, privateKey };
}

function searchConsoleConfig() {
  const analytics = config();
  return {
    siteUrl: process.env.GSC_SITE_URL?.trim() || "sc-domain:mynigeriaguide.com",
    clientEmail: process.env.GSC_SERVICE_ACCOUNT_EMAIL?.trim() || analytics.clientEmail,
    privateKey: process.env.GSC_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n").trim() || analytics.privateKey,
  };
}

export function analyticsReadConfigured() {
  const value = config();
  return Boolean(value.propertyId && value.clientEmail && value.privateKey);
}

export function analyticsTrackingConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim());
}

function base64Url(input: string | Uint8Array) {
  const bytes = typeof input === "string" ? Buffer.from(input) : Buffer.from(input);
  return bytes.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function getAccessToken(
  scope = "https://www.googleapis.com/auth/analytics.readonly",
  credentials: { clientEmail?: string; privateKey?: string } = config(),
) {
  const clientEmail = credentials.clientEmail;
  const privateKey = credentials.privateKey;
  if (!clientEmail || !privateKey) throw new Error("Google service-account credentials are not configured.");

  const cacheKey = clientEmail + "|" + scope;
  const now = Math.floor(Date.now() / 1000);
  const cached = tokenCache.get(cacheKey);
  if (cached && cached.expiresAt - 120 > now) return cached.token;
  const pending = tokenPromises.get(cacheKey);
  if (pending) return pending;

  const promise = (async () => {
    const issuedAt = Math.floor(Date.now() / 1000);
    const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const payload = base64Url(JSON.stringify({
      iss: clientEmail,
      scope,
      aud: "https://oauth2.googleapis.com/token",
      iat: issuedAt - 30,
      exp: issuedAt + 3600,
    }));
    const signingInput = header + "." + payload;

    const der = Buffer.from(
      privateKey
        .replace("-----BEGIN PRIVATE KEY-----", "")
        .replace("-----END PRIVATE KEY-----", "")
        .replace(/\s/g, ""),
      "base64",
    );
    const key = await crypto.subtle.importKey(
      "pkcs8",
      der,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      new TextEncoder().encode(signingInput),
    );
    const assertion = signingInput + "." + base64Url(new Uint8Array(signature));

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion,
      }),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Google authentication failed.");
    const body = await response.json() as { access_token?: string; expires_in?: number };
    if (!body.access_token) throw new Error("Google did not return an access token.");

    tokenCache.set(cacheKey, { token: body.access_token, expiresAt: issuedAt + (body.expires_in ?? 3600) });
    return body.access_token;
  })();

  tokenPromises.set(cacheKey, promise);
  try {
    return await promise;
  } finally {
    tokenPromises.delete(cacheKey);
  }
}
function daysForRange(range: AnalyticsRange) {
  return range === "7d" ? 7 : range === "90d" ? 90 : 30;
}

async function runReport(body: Record<string, unknown>) {
  const { propertyId } = config();
  if (!propertyId) throw new Error("GA4 property ID is not configured.");
  const token = await getAccessToken();
  const response = await fetch(
    "https://analyticsdata.googleapis.com/v1beta/properties/" + encodeURIComponent(propertyId) + ":runReport",
    {
      method: "POST",
      headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );
  if (!response.ok) {
    const message = await response.text();
    throw new Error("Google Analytics report request failed (" + response.status + "): " + message.slice(0, 300));
  }
  return await response.json() as RunReportResponse;
}

async function batchRunReports(requests: Array<Record<string, unknown>>) {
  const { propertyId } = config();
  if (!propertyId) throw new Error("GA4 property ID is not configured.");
  const token = await getAccessToken();
  const response = await fetch(
    "https://analyticsdata.googleapis.com/v1beta/properties/" + encodeURIComponent(propertyId) + ":batchRunReports",
    {
      method: "POST",
      headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify({ requests }),
      cache: "no-store",
    },
  );
  if (!response.ok) {
    const message = await response.text();
    throw new Error("Google Analytics batch report request failed (" + response.status + "): " + message.slice(0, 300));
  }
  return await response.json() as BatchRunReportsResponse;
}

async function runRealtime() {
  const { propertyId } = config();
  if (!propertyId) return null;
  const token = await getAccessToken();
  const response = await fetch(
    "https://analyticsdata.googleapis.com/v1beta/properties/" + encodeURIComponent(propertyId) + ":runRealtimeReport",
    {
      method: "POST",
      headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify({ metrics: [{ name: "activeUsers" }] }),
      cache: "no-store",
    },
  );
  if (!response.ok) return null;
  const body = await response.json() as RunReportResponse;
  return Number(body.rows?.[0]?.metricValues?.[0]?.value ?? 0);
}

function dateInTimeZone(timeZone: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function subtractDays(dateIso: string, days: number) {
  const date = new Date(dateIso + "T12:00:00Z");
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

async function searchConsoleQuery(body: Record<string, unknown>) {
  const settings = searchConsoleConfig();
  if (!settings.clientEmail || !settings.privateKey) throw new Error("Search Console credentials are not configured.");
  const token = await getAccessToken(
    "https://www.googleapis.com/auth/webmasters.readonly",
    settings,
  );
  const response = await fetch(
    "https://www.googleapis.com/webmasters/v3/sites/" + encodeURIComponent(settings.siteUrl) + "/searchAnalytics/query",
    {
      method: "POST",
      headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );
  if (!response.ok) {
    const message = await response.text();
    throw new Error("Search Console request failed (" + response.status + "): " + message.slice(0, 180));
  }
  return await response.json() as SearchAnalyticsResponse;
}

async function getSearchPerformance(startDate: string): Promise<SearchPerformanceSummary> {
  const settings = searchConsoleConfig();
  const endDate = dateInTimeZone("America/Los_Angeles");

  try {
    const [summary, byDate] = await Promise.all([
      searchConsoleQuery({
        startDate,
        endDate,
        type: "web",
        dataState: "all",
        aggregationType: "byProperty",
        rowLimit: 1,
      }),
      searchConsoleQuery({
        startDate,
        endDate,
        type: "web",
        dataState: "all",
        dimensions: ["date"],
        aggregationType: "byProperty",
        rowLimit: 100,
      }),
    ]);

    const total = summary.rows?.[0];
    const datedRows = byDate.rows ?? [];
    const latestDate = datedRows.length ? datedRows[datedRows.length - 1]?.keys?.[0] ?? null : null;

    return {
      available: true,
      siteUrl: settings.siteUrl,
      startDate,
      endDate,
      latestDate,
      firstIncompleteDate: byDate.metadata?.first_incomplete_date ?? null,
      impressions: total?.impressions ?? 0,
      clicks: total?.clicks ?? 0,
      ctr: total?.ctr ?? 0,
      position: total?.position ?? 0,
    };
  } catch (error) {
    return {
      available: false,
      siteUrl: settings.siteUrl,
      startDate,
      endDate,
      latestDate: null,
      firstIncompleteDate: null,
      impressions: null,
      clicks: null,
      ctr: null,
      position: null,
      error: error instanceof Error ? error.message : "Search Console data is unavailable.",
    };
  }
}

function metric(row: ReportRow, index: number) {
  return Number(row?.metricValues?.[index]?.value ?? 0);
}

function dimension(row: ReportRow, index: number) {
  return row?.dimensionValues?.[index]?.value ?? "";
}

export async function getAnalyticsDashboard(range: AnalyticsRange, mode: AnalyticsTrafficMode = "clean"): Promise<AnalyticsDashboardData> {
  if (!analyticsReadConfigured()) throw new Error("Google Analytics Data API is not configured.");
  const cacheKey = range + ":" + mode;
  const cached = reportCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.data;

  const days = daysForRange(range);
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const rollingDate = new Date(today + "T12:00:00Z");
  rollingDate.setUTCDate(rollingDate.getUTCDate() - Math.max(0, days - 1));
  const rollingStartDate = rollingDate.toISOString().slice(0, 10);
  const dataStartDate = mode === "clean" ? analyticsStartDate(days, today) : rollingStartDate;
  const dateRanges = [{ startDate: dataStartDate, endDate: "today" }];
  const cleanPublicFilter = {
    notExpression: {
      orGroup: {
        expressions: [
          {
            filter: {
              fieldName: "pagePath",
              stringFilter: { matchType: "BEGINS_WITH", value: "/admin", caseSensitive: false },
            },
          },
          {
            filter: {
              fieldName: "pagePath",
              stringFilter: { matchType: "BEGINS_WITH", value: "/api", caseSensitive: false },
            },
          },
          {
            filter: {
              fieldName: "pagePath",
              stringFilter: { matchType: "BEGINS_WITH", value: "/_next", caseSensitive: false },
            },
          },
        ],
      },
    },
  };
  const publicFilter = mode === "clean" ? { dimensionFilter: cleanPublicFilter } : {};

  const coreRequests = [
    {
      dateRanges,
      metrics: [
        { name: "totalUsers" },
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "engagedSessions" },
        { name: "engagementRate" },
      ],
      metricAggregations: ["TOTAL"],
      ...publicFilter,
    },
    {
      dateRanges,
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }, { name: "sessions" }, { name: "screenPageViews" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
      limit: 100,
      ...publicFilter,
    },
    {
      dateRanges,
      dimensions: [{ name: "country" }],
      metrics: [{ name: "activeUsers" }, { name: "sessions" }, { name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 15,
      ...publicFilter,
    },
    {
      dateRanges,
      dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 20,
      ...publicFilter,
    },
    {
      dateRanges,
      dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 15,
      ...publicFilter,
    },
  ];

  const interactionEventFilter = {
    filter: {
      fieldName: "eventName",
      inListFilter: { values: interactionEvents },
    },
  };

  const interactionRequest = {
    dateRanges,
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: mode === "clean"
      ? { andGroup: { expressions: [interactionEventFilter, cleanPublicFilter] } }
      : interactionEventFilter,
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    limit: 20,
  };

  const [batch, interactionReport, realtimeActiveUsers, searchPerformance] = await Promise.all([
    batchRunReports(coreRequests),
    runReport(interactionRequest).catch(() => ({} as RunReportResponse)),
    runRealtime().catch(() => null),
    getSearchPerformance(dataStartDate),
  ]);

  const [summaryReport = {}, dailyReport = {}, countryReport = {}, pageReport = {}, referrerReport = {}] = batch.reports ?? [];

  const totalValues = summaryReport.totals?.[0]?.metricValues ?? summaryReport.rows?.[0]?.metricValues ?? [];
  const { propertyId = "" } = config();
  const data: AnalyticsDashboardData = {
    range,
    mode,
    propertyId,
    generatedAt: new Date().toISOString(),
    dataStartDate,
    cleanStartDate: ANALYTICS_CLEAN_START,
    summary: {
      totalUsers: Number(totalValues[0]?.value ?? 0),
      activeUsers: Number(totalValues[1]?.value ?? 0),
      sessions: Number(totalValues[2]?.value ?? 0),
      pageViews: Number(totalValues[3]?.value ?? 0),
      engagedSessions: Number(totalValues[4]?.value ?? 0),
      engagementRate: Number(totalValues[5]?.value ?? 0),
    },
    realtimeActiveUsers,
    daily: (dailyReport.rows ?? []).map((row) => ({
      date: dimension(row, 0),
      users: metric(row, 0),
      sessions: metric(row, 1),
      pageViews: metric(row, 2),
    })),
    countries: (countryReport.rows ?? []).map((row) => ({
      country: dimension(row, 0) || "Unknown",
      users: metric(row, 0),
      sessions: metric(row, 1),
      pageViews: metric(row, 2),
    })),
    pages: (pageReport.rows ?? []).map((row) => ({
      path: dimension(row, 0) || "/",
      title: dimension(row, 1) || "Untitled page",
      users: metric(row, 0),
      pageViews: metric(row, 1),
    })),
    referrers: (referrerReport.rows ?? []).map((row) => ({
      source: dimension(row, 0) || "(direct)",
      medium: dimension(row, 1) || "(none)",
      sessions: metric(row, 0),
      users: metric(row, 1),
    })),
    interactions: (interactionReport.rows ?? []).map((row) => ({
      event: dimension(row, 0),
      count: metric(row, 0),
    })),
    searchPerformance,
  };

  reportCache.set(cacheKey, { data, expiresAt: Date.now() + 5 * 60 * 1000 });
  return data;
}
