import { Buffer } from "node:buffer";

export type AnalyticsRange = "7d" | "30d" | "90d";

export type AnalyticsDashboardData = {
  range: AnalyticsRange;
  generatedAt: string;
  summary: {
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
};

type RunReportResponse = {
  rows?: Array<{
    dimensionValues?: Array<{ value?: string }>;
    metricValues?: Array<{ value?: string }>;
  }>;
  totals?: Array<{ metricValues?: Array<{ value?: string }> }>;
};

let tokenCache: { token: string; expiresAt: number } | null = null;
const reportCache = new Map<string, { expiresAt: number; data: AnalyticsDashboardData }>();

function config() {
  const propertyId = process.env.GA4_PROPERTY_ID?.trim();
  const clientEmail = process.env.GA4_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GA4_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();
  return { propertyId, clientEmail, privateKey };
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

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (tokenCache && tokenCache.expiresAt - 120 > now) return tokenCache.token;

  const { clientEmail, privateKey } = config();
  if (!clientEmail || !privateKey) throw new Error("Google Analytics service-account credentials are not configured.");

  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(JSON.stringify({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now - 30,
    exp: now + 3600,
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
  if (!response.ok) throw new Error("Google Analytics authentication failed.");
  const body = await response.json() as { access_token?: string; expires_in?: number };
  if (!body.access_token) throw new Error("Google Analytics did not return an access token.");

  tokenCache = { token: body.access_token, expiresAt: now + (body.expires_in ?? 3600) };
  return body.access_token;
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

function metric(row: RunReportResponse["rows"] extends Array<infer R> ? R : never, index: number) {
  return Number(row?.metricValues?.[index]?.value ?? 0);
}

function dimension(row: RunReportResponse["rows"] extends Array<infer R> ? R : never, index: number) {
  return row?.dimensionValues?.[index]?.value ?? "";
}

export async function getAnalyticsDashboard(range: AnalyticsRange): Promise<AnalyticsDashboardData> {
  if (!analyticsReadConfigured()) throw new Error("Google Analytics Data API is not configured.");
  const cached = reportCache.get(range);
  if (cached && cached.expiresAt > Date.now()) return cached.data;

  const days = daysForRange(range);
  const dateRanges = [{ startDate: (days - 1) + "daysAgo", endDate: "today" }];

  const [summaryReport, dailyReport, countryReport, pageReport, referrerReport, realtimeActiveUsers] = await Promise.all([
    runReport({
      dateRanges,
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "engagedSessions" },
        { name: "engagementRate" },
      ],
      metricAggregations: ["TOTAL"],
    }),
    runReport({
      dateRanges,
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }, { name: "sessions" }, { name: "screenPageViews" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
      limit: 100,
    }),
    runReport({
      dateRanges,
      dimensions: [{ name: "country" }],
      metrics: [{ name: "activeUsers" }, { name: "sessions" }, { name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 15,
    }),
    runReport({
      dateRanges,
      dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 20,
    }),
    runReport({
      dateRanges,
      dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 15,
    }),
    runRealtime(),
  ]);

  const totalValues = summaryReport.totals?.[0]?.metricValues ?? summaryReport.rows?.[0]?.metricValues ?? [];
  const data: AnalyticsDashboardData = {
    range,
    generatedAt: new Date().toISOString(),
    summary: {
      activeUsers: Number(totalValues[0]?.value ?? 0),
      sessions: Number(totalValues[1]?.value ?? 0),
      pageViews: Number(totalValues[2]?.value ?? 0),
      engagedSessions: Number(totalValues[3]?.value ?? 0),
      engagementRate: Number(totalValues[4]?.value ?? 0),
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
  };

  reportCache.set(range, { data, expiresAt: Date.now() + 5 * 60 * 1000 });
  return data;
}
