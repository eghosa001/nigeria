import { ANALYTICS_PRODUCTION_HOSTS } from "@/lib/analytics-safety";
import { POSTHOG_COLLECTION_START, POSTHOG_PROJECT_ID, posthogServerApiKey } from "@/lib/posthog-config";

export type PostHogDailyViews = {
  available: boolean;
  startDate: string;
  endDate: string;
  rows: Array<{ date: string; views: number }>;
  error: string | null;
};

/** Retain actual recorded days; do not replace absent data with zeros. */
export function parsePostHogDailyRows(body: unknown): PostHogDailyViews["rows"] {
  const response = body as { results?: Array<{ days?: unknown; data?: unknown }> };
  const series = response?.results?.[0];
  if (!Array.isArray(series?.days) || !Array.isArray(series?.data) ||
      series.days.length !== series.data.length) {
    throw new Error("PostHog returned no usable daily page-view series.");
  }
  const days: PostHogDailyViews["rows"] = [];
  for (let i = 0; i < series.days.length; i++) {
    const date = series.days[i];
    const raw = series.data[i];
    const views = typeof raw === "number" ? raw : typeof raw === "string" && raw.trim() ? Number(raw) : NaN;
    if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(views) && views >= 0) {
      days.push({ date, views });
    }
  }
  return days;
}

/** PostHog traffic is independent of GA4 and must never be added to GA4 totals. */
export async function getPostHogDailyViews(from: string, to: string, forceFresh = false): Promise<PostHogDailyViews> {
  const startDate = from < POSTHOG_COLLECTION_START ? POSTHOG_COLLECTION_START : from;
  const unavailable = (error: string): PostHogDailyViews =>
    ({ available: false, startDate, endDate: to, rows: [], error });
  const key = posthogServerApiKey();
  if (!key || key.startsWith("phc_")) return unavailable(
    "Server-only POSTHOG_PERSONAL_API_KEY with Query Read permission is required for daily PostHog views."
  );
  try {
    const response = await fetch("https://eu.posthog.com/api/projects/" + POSTHOG_PROJECT_ID + "/query/", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        query: {
          kind: "TrendsQuery",
          series: [{ kind: "EventsNode", event: "$pageview", math: "total" }],
          dateRange: { date_from: startDate, date_to: to },
          interval: "day",
          properties: [
            { key: "$host", type: "event", operator: "exact", value: [...ANALYTICS_PRODUCTION_HOSTS] },
            { key: "$virt_is_bot", type: "event", operator: "exact", value: ["false"] },
          ],
          filterTestAccounts: true,
        },
        refresh: forceFresh ? "force_blocking" : "blocking",
        name: "mynigeriaguide daily public page views",
      }),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("PostHog daily query failed (" + response.status + ").");
    const rows = parsePostHogDailyRows(await response.json())
      .filter((row) => row.date >= startDate && row.date <= to);
    return { available: true, startDate, endDate: to, rows, error: null };
  } catch (cause) {
    return unavailable(cause instanceof Error ? cause.message : "PostHog daily reporting is unavailable.");
  }
}
