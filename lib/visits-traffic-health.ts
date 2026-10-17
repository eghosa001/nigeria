import type { PostHogOverview } from "@/lib/posthog-data";

export type TrafficSource = "GA4" | "PostHog" | "unavailable";
export type TrafficDecision = {
  views: number | null;
  sessions: number | null;
  source: TrafficSource;
  sourceStartDate: string | null;
  warning: string | null;
};

/**
 * GA4 and PostHog are independent measurements; NEVER sum them.
 * Prefer GA4 when its data looks plausible. When GA4 is absent or clearly
 * undercounting relative to independently measured PostHog traffic, show
 * PostHog as its own labelled source, retaining the precise date coverage.
 */
export function decideTrafficSource(
  ga4Views: number | null,
  ga4Sessions: number | null,
  periodStart: string,
  periodEnd: string,
  posthog: PostHogOverview,
): TrafficDecision {
  const usablePosthog = posthog.available && posthog.views !== null && posthog.views >= 0;
  const sameWindow = usablePosthog && posthog.startDate <= periodStart && posthog.endDate >= periodEnd;
  const grossMismatch = usablePosthog && posthog.views! >= 10 &&
    (ga4Views === null || ga4Views <= 1 || (sameWindow && ga4Views < posthog.views! * 0.25));
  if (usablePosthog && (ga4Views === null || grossMismatch)) {
    return {
      views: posthog.views,
      sessions: posthog.sessions,
      source: "PostHog",
      sourceStartDate: posthog.startDate,
      warning: ga4Views !== null
        ? "GA4 reports " + ga4Views + " page views while PostHog records " + posthog.views +
          ". These sources disagree; confirm the GA4 property and tracking filters."
        : "GA4 views are unavailable. Displaying independently measured PostHog traffic instead.",
    };
  }
  if (ga4Views !== null) {
    return { views: ga4Views, sessions: ga4Sessions, source: "GA4", sourceStartDate: periodStart, warning: null };
  }
  return {
    views: null, sessions: null, source: "unavailable", sourceStartDate: null,
    warning: "Neither GA4 nor PostHog returned usable page-view data; this is not evidence of zero traffic.",
  };
}
