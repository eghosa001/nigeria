import { Buffer } from "node:buffer";
import { ANALYTICS_CLEAN_START, ANALYTICS_PRODUCTION_HOSTS, analyticsStartDate } from "@/lib/analytics-safety";
import { GA_MEASUREMENT_ID } from "@/lib/analytics-config";
import {
  POSTHOG_COLLECTION_START,
  POSTHOG_PROJECT_ID,
  POSTHOG_WEB_URL,
} from "@/lib/posthog-config";
import { getPostHogOverview, type PostHogOverview } from "@/lib/posthog-data";
import {
  summarizeSearchConsoleHours,
  classifySearchConsoleApiError,
  type SearchConsoleApiIssue,
  firstIncompleteHourFromMetadata,
  firstIncompleteDateFromMetadata,
  type SearchConsoleHourlyReport,
} from "@/lib/search-console-hourly";
import {
  SEARCH_CONSOLE_HISTORY_THROUGH,
  historicalSearchConsoleSummary,
} from "@/data/search-console-history";

export type AnalyticsRange = "7d" | "30d" | "90d";
export type AnalyticsTrafficMode = "all" | "clean";

export type SearchPerformanceSummary = {
  available: boolean;
  source: "live" | "historical-snapshot" | "unavailable";
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
  /** Present only with fresh daily GSC API data; snapshots cannot be reconciled. */
  dailyClicks?: Array<{ date: string; clicks: number }>;
};

export type SearchTrafficComparison = {
  startDate: string;
  endDate: string;
  gscClicks: number;
  ga4OrganicSessions: number;
};

export type AnalyticsConnectionStatus = {
  status: "verified" | "mismatch" | "unavailable";
  verified: boolean;
  measurementId: string;
  propertyId: string;
  streams: Array<{ measurementId: string; defaultUri: string; displayName: string }>;
  error?: string;
};

export type GA4KeyEventStatus = {
  available: boolean;
  events: Array<{ name: string; configured: boolean; countingMethod?: string }>;
  error?: string;
};

export const IMPORTANT_GA4_KEY_EVENTS = ["job_apply_click", "official_link_click"] as const;

export function describeGA4KeyEvents(configuredEvents: Array<{ eventName?: string; countingMethod?: string }>): GA4KeyEventStatus {
  return {
    available: true,
    events: IMPORTANT_GA4_KEY_EVENTS.map((name) => {
      const match = configuredEvents.find((event) => event.eventName === name);
      return { name, configured: Boolean(match), ...(match?.countingMethod ? { countingMethod: match.countingMethod } : {}) };
    }),
  };
}

export type AnalyticsDashboardData = {
  range: AnalyticsRange;
  mode: AnalyticsTrafficMode;
  propertyId: string;
  generatedAt: string;
  dataStartDate: string;
  cleanStartDate: string;
  ga4Available: boolean;
  ga4Error: string | null;
  summary: {
    totalUsers: number;
    activeUsers: number;
    sessions: number;
    pageViews: number;
    engagedSessions: number;
    engagementRate: number;
  };
  realtimeActiveUsers: number | null;
  realtimePageViews: number | null;
  daily: Array<{ date: string; users: number; sessions: number; pageViews: number }>;
  countries: Array<{ country: string; users: number; sessions: number; pageViews: number }>;
  pages: Array<{ path: string; title: string; users: number; pageViews: number }>;
  referrers: Array<{ source: string; medium: string; sessions: number; users: number }>;
  interactions: Array<{ event: string; count: number }>;
  searchPerformance: SearchPerformanceSummary;
  /** Same reported calendar dates, only before Google's first incomplete GSC day. */
  searchTrafficComparison: SearchTrafficComparison | null;
  hourlySearchPerformance: SearchConsoleHourlyReport;
  connection: AnalyticsConnectionStatus;
  keyEvents: GA4KeyEventStatus;
  posthog: {
    trackingConfigured: boolean;
    reportingConfigured: boolean;
    projectId: number;
    webUrl: string;
    collectionStartDate: string;
    overview: PostHogOverview;
  };
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
  metadata?: {
    firstIncompleteDate?: string;
    firstIncompleteHour?: string;
    first_incomplete_date?: string;
    first_incomplete_hour?: string;
  };
};

type DataStream = {
  type?: string;
  displayName?: string;
  webStreamData?: {
    measurementId?: string;
    defaultUri?: string;
  };
};

type DataStreamsResponse = {
  dataStreams?: DataStream[];
};

const interactionEvents = [
  "feature_discovery_click",
  "feature_share",
  "trip_plan_share",
  "job_watch_add",
  "job_watch_remove",
  "job_watch_check",
  "job_apply_click",
  "related_content_click",
  "saved_page_add",
  "saved_page_remove",
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

/** Does the private server have credentials for direct Google Search Console access? */
export function searchConsoleReadConfigured() {
  const settings = searchConsoleConfig();
  return Boolean(settings.clientEmail && settings.privateKey);
}

/** Public within the authenticated admin UI only; never exposes any private key. */
export function searchConsoleServiceAccountIdentity() {
  const settings = searchConsoleConfig();
  return {
    email: settings.clientEmail ?? null,
    // The override takes precedence over the existing GA4 reporting identity.
    origin: process.env.GSC_SERVICE_ACCOUNT_EMAIL?.trim()
      ? "GSC_SERVICE_ACCOUNT_EMAIL"
      : "GA4_SERVICE_ACCOUNT_EMAIL",
    siteUrl: settings.siteUrl,
  };
}

export function analyticsReadConfigured() {
  const value = config();
  return Boolean(value.propertyId && value.clientEmail && value.privateKey);
}

export function analyticsTrackingConfigured() {
  return Boolean(GA_MEASUREMENT_ID);
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

export async function runReport(body: Record<string, unknown>) {
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

async function verifyAnalyticsConnection(): Promise<AnalyticsConnectionStatus> {
  const { propertyId = "" } = config();
  const measurementId = GA_MEASUREMENT_ID;

  if (!propertyId || !measurementId) {
    return {
      status: "unavailable",
      verified: false,
      measurementId,
      propertyId,
      streams: [],
      error: "GA4 property or measurement ID is not configured.",
    };
  }

  try {
    const token = await getAccessToken();
    const response = await fetch(
      "https://analyticsadmin.googleapis.com/v1beta/properties/" + encodeURIComponent(propertyId) + "/dataStreams?pageSize=200",
      {
        headers: { Authorization: "Bearer " + token },
        cache: "no-store",
      },
    );
    if (!response.ok) {
      const message = await response.text();
      const adminApiDisabled =
        response.status === 403 &&
        (message.includes("analyticsadmin.googleapis.com") ||
          message.includes("has not been used") ||
          message.includes("SERVICE_DISABLED"));
      if (adminApiDisabled) {
        return {
          status: "unavailable",
          verified: false,
          measurementId,
          propertyId,
          streams: [],
          error: "Google Analytics Admin API is disabled for the Google Cloud project used by this service account. The tracking/property match has not been tested yet; this is not a mismatch.",
        };
      }
      throw new Error("Analytics Admin API request failed (" + response.status + "): " + message.slice(0, 180));
    }

    const body = await response.json() as DataStreamsResponse;
    const streams = (body.dataStreams ?? [])
      .filter((stream) => stream.type === "WEB_DATA_STREAM" || Boolean(stream.webStreamData))
      .map((stream) => ({
        measurementId: stream.webStreamData?.measurementId ?? "",
        defaultUri: stream.webStreamData?.defaultUri ?? "",
        displayName: stream.displayName ?? "",
      }));

    const verified = streams.some((stream) => stream.measurementId === measurementId);
    return {
      status: verified ? "verified" : "mismatch",
      verified,
      measurementId,
      propertyId,
      streams,
    };
  } catch (error) {
    return {
      status: "unavailable",
      verified: false,
      measurementId,
      propertyId,
      streams: [],
      error: error instanceof Error ? error.message : "Unable to verify GA4 property wiring.",
    };
  }
}

async function getGA4KeyEventStatus(): Promise<GA4KeyEventStatus> {
  const { propertyId } = config();
  if (!propertyId) return { available: false, events: [], error: "GA4 property is not configured." };
  try {
    const token = await getAccessToken(); // Read-only OAuth scope; no property changes.
    const response = await fetch(
      "https://analyticsadmin.googleapis.com/v1beta/properties/" + encodeURIComponent(propertyId) + "/keyEvents?pageSize=200",
      { headers: { Authorization: "Bearer " + token }, cache: "no-store" },
    );
    if (!response.ok) {
      const message = await response.text();
      throw new Error("GA4 key-event verification unavailable (" + response.status + "): " + message.slice(0, 120));
    }
    const body = await response.json() as {
      keyEvents?: Array<{ eventName?: string; countingMethod?: string }>;
      nextPageToken?: string;
    };
    // More than 200 registered key events is exceptionally unlikely; never call a partial listing complete.
    if (body.nextPageToken) return { available: false, events: [], error: "Key-event listing is incomplete." };
    return describeGA4KeyEvents(body.keyEvents ?? []);
  } catch (error) {
    return {
      available: false,
      events: [],
      error: error instanceof Error ? error.message : "Could not verify key-event configuration.",
    };
  }
}

export async function runRealtime() {
  const { propertyId } = config();
  if (!propertyId) return null;
  const token = await getAccessToken();
  const response = await fetch(
    "https://analyticsdata.googleapis.com/v1beta/properties/" + encodeURIComponent(propertyId) + ":runRealtimeReport",
    {
      method: "POST",
      headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify({ metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }] }),
      cache: "no-store",
    },
  );
  if (!response.ok) return null;
  const body = await response.json() as RunReportResponse;
  const values = body.rows?.[0]?.metricValues ?? [];
  return {
    activeUsers: Number(values[0]?.value ?? 0),
    pageViews: Number(values[1]?.value ?? 0),
  };
}

export function dateInTimeZone(timeZone: string) {
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

class SearchConsoleRequestError extends Error {
  constructor(readonly issue: SearchConsoleApiIssue) {
    super(issue.message);
    this.name = "SearchConsoleRequestError";
  }
}

export async function searchConsoleQuery(body: Record<string, unknown>) {
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
    throw new SearchConsoleRequestError(classifySearchConsoleApiError(response.status, message));
  }
  return await response.json() as SearchAnalyticsResponse;
}

/**
 * Query Google directly, explicitly requesting preliminary hourly data.
 * The "hour" dimension REQUIRES dataState "hourly_all".
 * Freshness is measured using the last hour actually returned by Google,
 * never the requested end date or our fetch timestamp.
 */
export async function getHourlySearchPerformance(): Promise<SearchConsoleHourlyReport> {
  const settings = searchConsoleConfig();
  const fetchedAt = new Date().toISOString();
  // Search Console reporting days are Pacific Time, not Lagos time.
  const endDate = dateInTimeZone("America/Los_Angeles");
  const startDate = subtractDays(endDate, 9); // Google retains up to 10 PT days of hourly data
  const base = { siteUrl: settings.siteUrl, startDate, endDate, fetchedAt };
  try {
    const response = await searchConsoleQuery({
      startDate,
      endDate,
      type: "web",
      dataState: "hourly_all",
      dimensions: ["hour"],
      aggregationType: "byProperty",
      rowLimit: 260,
    });
    const report = summarizeSearchConsoleHours(
      response.rows ?? [],
      firstIncompleteHourFromMetadata(response.metadata),
    );
    return { available: true, source: "direct-google-api", ...base, ...report };
  } catch (error) {
    return {
      available: false,
      source: "unavailable",
      ...base,
      latestHour: null,
      firstIncompleteHour: null,
      lagHours: null,
      clicks: null,
      impressions: null,
      clicks24h: null,
      impressions24h: null,
      hoursReported24h: 0,
      rows: [],
      error: error instanceof Error ? error.message : "Hourly Search Console API is unavailable.",
      ...(error instanceof SearchConsoleRequestError ? { issue: error.issue } : {}),
    };
  }
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
      source: "live",
      siteUrl: settings.siteUrl,
      startDate,
      endDate,
      latestDate,
      firstIncompleteDate: firstIncompleteDateFromMetadata(byDate.metadata) ?? null,
      dailyClicks: datedRows
        .filter((row) => /^\d{4}-\d{2}-\d{2}$/.test(row.keys?.[0] ?? ""))
        .map((row) => ({ date: row.keys![0], clicks: row.clicks ?? 0 })),
      impressions: total?.impressions ?? 0,
      clicks: total?.clicks ?? 0,
      ctr: total?.ctr ?? 0,
      position: total?.position ?? 0,
    };
  } catch (error) {
    const historical = historicalSearchConsoleSummary(startDate, endDate);
    if (historical.rows.length) {
      return {
        available: true,
        source: "historical-snapshot",
        siteUrl: settings.siteUrl,
        startDate,
        endDate,
        latestDate: historical.latestDate,
        firstIncompleteDate: null,
        impressions: historical.impressions,
        clicks: historical.clicks,
        ctr: historical.ctr,
        position: historical.position,
        error: "Live Search Console API is unavailable to the server; showing preserved historical data through " + SEARCH_CONSOLE_HISTORY_THROUGH + ".",
      };
    }

    return {
      available: false,
      source: "unavailable",
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

/** GSC clicks and GA4 google/organic sessions are different events, not a capture-rate metric. */
export function compareSearchClicksToOrganicSessions(
  search: SearchPerformanceSummary,
  ga4Rows: ReportRow[],
): SearchTrafficComparison | null {
  if (search.source !== "live" || !search.available ||
      !search.firstIncompleteDate || !search.dailyClicks?.length) return null;

  const settled = search.dailyClicks.filter(({ date }) =>
    date >= search.startDate && date < search.firstIncompleteDate!
  );
  if (!settled.length) return null;

  // Don't claim a complete comparison when Search Console omitted days in the interval.
  const first = settled[0].date;
  const last = settled[settled.length - 1].date;
  const expectedDays = Math.round(
    (Date.parse(last + "T00:00:00Z") - Date.parse(first + "T00:00:00Z")) / 86400000
  ) + 1;
  if (first !== search.startDate || settled.length !== expectedDays) return null;

  const sessionsByDay = new Map(ga4Rows.map((row) => [
    dimension(row, 0).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"),
    metric(row, 0),
  ]));
  return {
    startDate: first,
    endDate: last,
    gscClicks: settled.reduce((total, day) => total + day.clicks, 0),
    ga4OrganicSessions: settled.reduce(
      (total, day) => total + (sessionsByDay.get(day.date) ?? 0), 0
    ),
  };
}

function metric(row: ReportRow, index: number) {
  return Number(row?.metricValues?.[index]?.value ?? 0);
}

function dimension(row: ReportRow, index: number) {
  return row?.dimensionValues?.[index]?.value ?? "";
}

export async function getAnalyticsDashboard(
  range: AnalyticsRange,
  mode: AnalyticsTrafficMode = "clean",
  forceFresh = false,
  includeDiagnostics = true,
): Promise<AnalyticsDashboardData> {
  const ga4Available = analyticsReadConfigured();
  const cacheKey = range + ":" + mode + ":" + (includeDiagnostics ? "detail" : "overview");
  const cached = reportCache.get(cacheKey);
  if (!forceFresh && cached && cached.expiresAt > Date.now()) {
    const realtime = ga4Available && includeDiagnostics ? await runRealtime().catch(() => null) : null;
    return {
      ...cached.data,
      // Preserve the actual GA4 report fetch time. Realtime is refreshed below,
      // but it does not make the cached daily report newly processed by Google.
      realtimeActiveUsers: realtime?.activeUsers ?? null,
      realtimePageViews: realtime?.pageViews ?? null,
    };
  }

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
  // Restrict clean historical reports to actual production-host events.
  // A reporting filter is intentionally reversible; the raw "all" view remains available.
  const cleanPublicFilter = {
    andGroup: {
      expressions: [
        {
          filter: {
            fieldName: "hostName",
            inListFilter: { values: [...ANALYTICS_PRODUCTION_HOSTS], caseSensitive: false },
          },
        },
        {
          notExpression: {
            orGroup: {
              expressions: [
                { filter: { fieldName: "pagePath", stringFilter: { matchType: "BEGINS_WITH", value: "/admin", caseSensitive: false } } },
                { filter: { fieldName: "pagePath", stringFilter: { matchType: "BEGINS_WITH", value: "/api", caseSensitive: false } } },
                { filter: { fieldName: "pagePath", stringFilter: { matchType: "BEGINS_WITH", value: "/_next", caseSensitive: false } } },
              ],
            },
          },
        },
      ],
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

  // Optional comparison must never disable the core GA4 dashboard if this request fails.
  const organicDailyRequest = {
    dateRanges,
    dimensions: [{ name: "date" }],
    metrics: [{ name: "sessions" }],
    dimensionFilter: {
      andGroup: {
        expressions: [
          ...(mode === "clean" ? [cleanPublicFilter] : []),
          { filter: { fieldName: "sessionSource", stringFilter: { matchType: "EXACT", value: "google", caseSensitive: false } } },
          { filter: { fieldName: "sessionMedium", stringFilter: { matchType: "EXACT", value: "organic", caseSensitive: false } } },
        ],
      },
    },
    orderBys: [{ dimension: { dimensionName: "date" } }],
    limit: 100,
  };

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

  const unavailableConnection: AnalyticsConnectionStatus = {
    status: "unavailable",
    verified: false,
    measurementId: GA_MEASUREMENT_ID,
    propertyId: config().propertyId ?? "",
    streams: [],
    error: "GA4 Data API is not configured. PostHog remains available independently.",
  };

  const deferredHourly: SearchConsoleHourlyReport = {
    available: false,
    source: "unavailable",
    siteUrl: searchConsoleConfig().siteUrl,
    startDate: "",
    endDate: "",
    fetchedAt: "",
    latestHour: null,
    firstIncompleteHour: null,
    lagHours: null,
    clicks: null,
    impressions: null,
    impressions24h: null,
    clicks24h: null,
    hoursReported24h: 0,
    rows: [],
    error: "Open detailed reports to fetch hourly Google Search Console data.",
  };

  // Every source is independent: a broken GA4 API must not blank the
  // PostHog and Search Console panels or prevent the private dashboard loading.
  const [ga4Batch, interactionReport, realtime, searchPerformance, hourlySearchPerformance, connection, posthogOverview, keyEvents, organicDailyReport] = await Promise.all([
    ga4Available
      ? batchRunReports(coreRequests)
          .then((batch) => ({ batch, error: null as string | null }))
          .catch((error: unknown) => ({
            batch: { reports: [] } as BatchRunReportsResponse,
            error: error instanceof Error ? error.message : "Google Analytics reporting failed.",
          }))
      : Promise.resolve({
          batch: { reports: [] } as BatchRunReportsResponse,
          error: "Google Analytics service account is not configured.",
        }),
    ga4Available && includeDiagnostics ? runReport(interactionRequest).catch(() => ({} as RunReportResponse)) : Promise.resolve({} as RunReportResponse),
    ga4Available && includeDiagnostics ? runRealtime().catch(() => null) : Promise.resolve(null),
    getSearchPerformance(dataStartDate),
    includeDiagnostics ? getHourlySearchPerformance() : Promise.resolve(deferredHourly),
    ga4Available && includeDiagnostics ? verifyAnalyticsConnection() : Promise.resolve({ ...unavailableConnection, error: "Open detailed reports to verify GA4 configuration." }),
    getPostHogOverview(dataStartDate, today, forceFresh),
    ga4Available && includeDiagnostics ? getGA4KeyEventStatus() : Promise.resolve({ available: false, events: [], error: "Open detailed reports to check configured key events." } as GA4KeyEventStatus),
    ga4Available && includeDiagnostics ? runReport(organicDailyRequest).catch(() => null) : Promise.resolve(null),
  ]);

  const { batch, error: ga4Error } = ga4Batch;
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
    ga4Available: ga4Available && ga4Error === null,
    ga4Error,
    summary: {
      totalUsers: Number(totalValues[0]?.value ?? 0),
      activeUsers: Number(totalValues[1]?.value ?? 0),
      sessions: Number(totalValues[2]?.value ?? 0),
      pageViews: Number(totalValues[3]?.value ?? 0),
      engagedSessions: Number(totalValues[4]?.value ?? 0),
      engagementRate: Number(totalValues[5]?.value ?? 0),
    },
    realtimeActiveUsers: realtime?.activeUsers ?? null,
    realtimePageViews: realtime?.pageViews ?? null,
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
    searchTrafficComparison: ga4Available && ga4Error === null && organicDailyReport
      ? compareSearchClicksToOrganicSessions(searchPerformance, organicDailyReport.rows ?? [])
      : null,
    hourlySearchPerformance,
    connection,
    keyEvents,
    posthog: {
      trackingConfigured: true,
      reportingConfigured: posthogOverview.available,
      projectId: POSTHOG_PROJECT_ID,
      webUrl: POSTHOG_WEB_URL,
      collectionStartDate: POSTHOG_COLLECTION_START,
      overview: posthogOverview,
    },
  };

  reportCache.set(cacheKey, { data, expiresAt: Date.now() + 5 * 60 * 1000 });
  return data;
}
