"use client";

import { GA_MEASUREMENT_ID } from "@/lib/analytics-config";
import { shouldEnableAnalytics } from "@/lib/analytics-safety";
// Load PostHog only when an analytics event is actually needed.

type AnalyticsWindow = Window & typeof globalThis & {
  gtag?: (...args: unknown[]) => void;
};

export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as AnalyticsWindow;
  const enabled = shouldEnableAnalytics(
    window.location.pathname,
    navigator.webdriver,
    navigator.userAgent,
    window.location.hostname,
  );
  if (!enabled) return;

  const id = GA_MEASUREMENT_ID;
  if (id && !Reflect.get(analyticsWindow, "ga-disable-" + id)) {
    analyticsWindow.gtag?.("event", name, params);
  }

  void import("@/lib/posthog-client")
    .then(({ capturePostHogEvent }) => capturePostHogEvent(name, params))
    .catch(() => undefined); // Tracking failures must never block navigation.
}
