"use client";

type AnalyticsWindow = Window & typeof globalThis & {
  gtag?: (...args: unknown[]) => void;
};

export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined") return;
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id) return;

  const analyticsWindow = window as AnalyticsWindow;
  if (Reflect.get(analyticsWindow, "ga-disable-" + id)) return;
  analyticsWindow.gtag?.("event", name, params);
}
