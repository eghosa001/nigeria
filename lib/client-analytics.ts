"use client";

import { GA_MEASUREMENT_ID } from "@/lib/analytics-config";
import { shouldEnableAnalytics } from "@/lib/analytics-safety";
import { capturePostHogEvent } from "@/lib/posthog-client";

type AnalyticsWindow = Window & typeof globalThis & {
  gtag?: (...args: unknown[]) => void;
};

export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as AnalyticsWindow;
  const enabled = shouldEnableAnalytics(window.location.pathname, navigator.webdriver);
  if (!enabled) return;

  const id = GA_MEASUREMENT_ID;
  if (id && !Reflect.get(analyticsWindow, "ga-disable-" + id)) {
    analyticsWindow.gtag?.("event", name, params);
  }

  capturePostHogEvent(name, params);
}
