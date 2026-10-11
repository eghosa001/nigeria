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
  rows: SearchConsoleHourlyRow[];
  error?: string;
};

const validHour = (hour: unknown): hour is string =>
  typeof hour === "string" &&
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(hour) &&
  Number.isFinite(Date.parse(hour));

const nonNegativeNumber = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : 0;

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
  };
}
