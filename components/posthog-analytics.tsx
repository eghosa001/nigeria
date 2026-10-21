"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { shouldEnableAnalytics } from "@/lib/analytics-safety";

export function PostHogAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Admin, automated tests and preview hosts should not download an SDK
    // that is forbidden to collect analytics on these routes anyway.
    if (!shouldEnableAnalytics(pathname, navigator.webdriver, navigator.userAgent, window.location.hostname)) return;

    let current = true;
    let idleId: number | null = null;
    let fallbackId: number | null = null;

    // First paint and initial interactions take priority over downloading the
    // optional PostHog SDK on slower devices. GA4's initial pageview remains
    // immediate and unchanged; PostHog captures this route at the first idle
    // period, or after a bounded timeout when the main thread is busy.
    const capture = () => {
      void import("@/lib/posthog-client")
        .then(({ capturePostHogPageView }) => {
          if (current) capturePostHogPageView(pathname);
        })
        .catch(() => undefined);
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(capture, { timeout: 2500 });
    } else {
      fallbackId = window.setTimeout(capture, 750);
    }

    return () => {
      current = false;
      if (idleId !== null && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
      if (fallbackId !== null) window.clearTimeout(fallbackId);
    };
  }, [pathname]);

  return null;
}
