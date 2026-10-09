"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { shouldEnableAnalytics } from "@/lib/analytics-safety";
import { GA_MEASUREMENT_ID } from "@/lib/analytics-config";
import { trackEvent } from "@/lib/client-analytics";

type AnalyticsWindow = Window & typeof globalThis & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __mngLastTrackedPath?: string;
};

export function Analytics() {
  const id = GA_MEASUREMENT_ID;
  const pathname = usePathname();

  useEffect(() => {
    if (!id) return;

    const analyticsWindow = window as AnalyticsWindow;
    const disabledKey = `ga-disable-${id}`;
    const enabled = shouldEnableAnalytics(pathname, navigator.webdriver, navigator.userAgent, window.location.hostname);
    Reflect.set(analyticsWindow, disabledKey, !enabled);
    if (!enabled) return;

    const dataLayer = analyticsWindow.dataLayer ?? (analyticsWindow.dataLayer = []);
    const gtag = analyticsWindow.gtag ?? ((...args: unknown[]) => { dataLayer.push(args); });
    analyticsWindow.gtag = gtag;

    // The initial page_view is sent by the pre-hydration bootstrap in <head>.
    // Only send another page_view when Next.js changes routes client-side.
    if (analyticsWindow.__mngLastTrackedPath !== pathname) {
      gtag("event", "page_view", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
      analyticsWindow.__mngLastTrackedPath = pathname;
    }

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      if (anchor.classList.contains("official-service-link")) {
        let host = "";
        try { host = new URL(anchor.href).hostname; } catch {}
        trackEvent("official_link_click", {
          page_path: pathname,
          link_purpose: anchor.dataset.officialPurpose ?? "service",
          link_host: host,
        });
        return;
      }

      if (anchor.closest("#official-sources")) {
        let host = "";
        try { host = new URL(anchor.href).hostname; } catch {}
        trackEvent("official_source_click", {
          page_path: pathname,
          link_host: host,
        });
      }
    }

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [id, pathname]);

  return null;
}
