import { POSTHOG_COLLECTION_START, POSTHOG_PROJECT_ID, posthogServerReportingConfigured } from "@/lib/posthog-config";

export type PostHogOverview = {
  available: boolean;
  startDate: string;
  endDate: string;
  visitors: number | null;
  views: number | null;
  sessions: number | null;
  averageSessionDurationSeconds: number | null;
  bounceRate: number | null;
  error?: string;
};

type WebOverviewMetric = {
  key?: string;
  value?: number | null;
};

type WebOverviewResponse = {
  results?: WebOverviewMetric[];
};

function metricValue(rows: WebOverviewMetric[], key: string) {
  const value = rows.find((row) => row.key === key)?.value;
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export async function getPostHogOverview(
  requestedStartDate: string,
  endDate: string,
  forceFresh = false,
): Promise<PostHogOverview> {
  const startDate = requestedStartDate > POSTHOG_COLLECTION_START ? requestedStartDate : POSTHOG_COLLECTION_START;
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY?.trim();

  if (!posthogServerReportingConfigured() || !apiKey) {
    return {
      available: false,
      startDate,
      endDate,
      visitors: null,
      views: null,
      sessions: null,
      averageSessionDurationSeconds: null,
      bounceRate: null,
      error: "POSTHOG_PERSONAL_API_KEY is not configured on the server.",
    };
  }

  try {
    const response = await fetch(
      "https://eu.posthog.com/api/projects/" + POSTHOG_PROJECT_ID + "/query/",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: {
            kind: "WebOverviewQuery",
            dateRange: { date_from: startDate, date_to: endDate },
            properties: [
              {
                key: "$raw_user_agent",
                type: "event",
                operator: "not_icontains",
                value: ["GoogleAdSenseInfeed"],
              },
            ],
            filterTestAccounts: true,
            doPathCleaning: true,
          },
          refresh: forceFresh ? "force_blocking" : "blocking",
          name: "mynigeriaguide admin web overview",
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error("PostHog query failed (" + response.status + "): " + message.slice(0, 240));
    }

    const body = await response.json() as WebOverviewResponse;
    const rows = body.results ?? [];

    return {
      available: true,
      startDate,
      endDate,
      visitors: metricValue(rows, "visitors") ?? 0,
      views: metricValue(rows, "views") ?? 0,
      sessions: metricValue(rows, "sessions") ?? 0,
      averageSessionDurationSeconds: metricValue(rows, "session duration"),
      bounceRate: metricValue(rows, "bounce rate"),
    };
  } catch (error) {
    return {
      available: false,
      startDate,
      endDate,
      visitors: null,
      views: null,
      sessions: null,
      averageSessionDurationSeconds: null,
      bounceRate: null,
      error: error instanceof Error ? error.message : "PostHog reporting is unavailable.",
    };
  }
}
