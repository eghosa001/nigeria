/**
 * Google's Search Analytics "hourly_all" response parser.
 * These figures are Google Search impressions/clicks, not website pageviews.
 * Each hour is a property-wide aggregate: never sum query/page breakdowns into it.
 * Source hours include an explicit Pacific-time offset; keep that offset when
 * converting to Nigeria time in the UI.
 */
export type SearchConsoleApiHour = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

export type SearchConsoleHourlyRow = {
  hour: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  provisional: boolean;
};

/**
 * Turn Google errors into actionable, deliberately non-sensitive diagnostics.
 * A disabled Cloud API and missing Search Console property permission both
 * return HTTP 403, but require entirely different fixes.
 */
export type SearchConsoleApiIssueCode =
  | "api-disabled"
  | "property-permission"
  | "authorization"
  | "quota"
  | "bad-request"
  | "unknown";

export type SearchConsoleApiIssue = {
  code: SearchConsoleApiIssueCode;
  message: string;
  projectNumber: string | null;
};

export function classifySearchConsoleApiError(status: number, raw: string): SearchConsoleApiIssue {
  let parsed: {
    error?: {
      message?: string;
      details?: Array<{ reason?: string; metadata?: { consumer?: string; service?: string } }>;
    };
  } = {};
  try { parsed = JSON.parse(raw) as typeof parsed; } catch { /* Non-JSON errors are possible. */ }
  const message = parsed.error?.message ?? raw;
  const details = parsed.error?.details ?? [];
  const disabled = /Search Console API has not been used in project|searchconsole\.googleapis\.com.*disabled|it is disabled/i.test(message) ||
    details.some((part) => part.reason === "SERVICE_DISABLED" && part.metadata?.service === "searchconsole.googleapis.com");
  const projectFromMessage = message.match(/\bproject\s+(\d{5,20})\b/i)?.[1];
  const projectFromDetails = details.map((part) => part.metadata?.consumer?.match(/^projects\/(\d{5,20})$/)?.[1]).find(Boolean);
  const projectNumber = projectFromMessage ?? projectFromDetails ?? null;

  if (status === 403 && disabled) {
    return {
      code: "api-disabled",
      projectNumber,
      message: "The Google Search Console API is disabled in the Google Cloud project used by this website's service account. Enable the API in that project, then retry. No search data has been fetched.",
    };
  }
  if (status === 403) {
    return {
      code: "property-permission", projectNumber: null,
      message: "Google denied access to the Search Console property. Grant the configured service-account email read access to sc-domain:mynigeriaguide.com under Search Console → Settings → Users and permissions.",
    };
  }
  if (status === 401) {
    return { code: "authorization", projectNumber: null, message: "Google could not authorize the reporting service account. Check its server-only credentials." };
  }
  if (status === 429) {
    return { code: "quota", projectNumber: null, message: "Google Search Console is temporarily rate-limiting requests. Retry later." };
  }
  if (status === 400) {
    return { code: "bad-request", projectNumber: null, message: "Google rejected the Search Console query. Check the request parameters." };
  }
  return {
    code: "unknown", projectNumber: null,
    message: "Google Search Console reporting failed (HTTP " + status + "). Check the connection in Google Cloud.",
  };
}

export type SearchConsoleHourlyReport = {
  available: boolean;
  source: "direct-google-api" | "unavailable";
  siteUrl: string;
  startDate: string;
  endDate: string;
  fetchedAt: string;
  latestHour: string | null;
  firstIncompleteHour: string | null;
  lagHours: number | null;
  clicks: number | null;
  impressions: number | null;
  // Explicitly partial: summed only across received hours in the last 24h.
  impressions24h: number | null;
  clicks24h: number | null;
  hoursReported24h: number;
  rows: SearchConsoleHourlyRow[];
  error?: string;
  issue?: SearchConsoleApiIssue;
};

const validHour = (hour: unknown): hour is string =>
  typeof hour === "string" &&
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(hour) &&
  Number.isFinite(Date.parse(hour));

const nonNegativeNumber = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : 0;

export function firstIncompleteHourFromMetadata(
  metadata?: { firstIncompleteHour?: string; first_incomplete_hour?: string },
): string | undefined {
  // Google Search Console sends camelCase JSON, even though field docs use snake_case.
  return metadata?.firstIncompleteHour ?? metadata?.first_incomplete_hour;
}

export function firstIncompleteDateFromMetadata(
  metadata?: { firstIncompleteDate?: string; first_incomplete_date?: string },
): string | undefined {
  return metadata?.firstIncompleteDate ?? metadata?.first_incomplete_date;
}

export function summarizeSearchConsoleHours(
  apiRows: SearchConsoleApiHour[],
  incompleteHour: string | undefined,
  now: Date = new Date(),
) {
  const firstIncompleteHour = validHour(incompleteHour) ? incompleteHour : null;
  const boundary = firstIncompleteHour == null ? null : Date.parse(firstIncompleteHour);
  // Search Console can omit hours with no data. Do not invent zero rows.
  const rows: SearchConsoleHourlyRow[] = apiRows
    .filter((row) => validHour(row.keys?.[0]))
    .map((row) => {
      const hour = row.keys![0];
      return {
        hour,
        clicks: nonNegativeNumber(row.clicks),
        impressions: nonNegativeNumber(row.impressions),
        ctr: nonNegativeNumber(row.ctr),
        position: nonNegativeNumber(row.position),
        provisional: boundary != null && Date.parse(hour) >= boundary,
      };
    })
    .sort((a, b) => Date.parse(a.hour) - Date.parse(b.hour));
  const latestHour = rows.at(-1)?.hour ?? null;
  const last24Hours = rows.filter((row) => {
    const timestamp = Date.parse(row.hour);
    return timestamp >= now.getTime() - 24 * 3_600_000 && timestamp <= now.getTime();
  });
  const lagHours = latestHour == null
    ? null
    : Math.max(0, Math.floor((now.getTime() - Date.parse(latestHour)) / 3_600_000));

  return {
    rows,
    latestHour,
    firstIncompleteHour,
    lagHours,
    clicks: rows.reduce((sum, row) => sum + row.clicks, 0),
    impressions: rows.reduce((sum, row) => sum + row.impressions, 0),
    clicks24h: last24Hours.length
      ? last24Hours.reduce((sum, row) => sum + row.clicks, 0)
      : null,
    impressions24h: last24Hours.length
      ? last24Hours.reduce((sum, row) => sum + row.impressions, 0)
      : null,
    hoursReported24h: last24Hours.length,
  };
}
