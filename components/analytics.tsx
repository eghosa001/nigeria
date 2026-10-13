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
        page_location: pathname === "/search" ? window.location.origin + pathname : window.location.href,
        page_title: document.title,
      });
      analyticsWindow.__mngLastTrackedPath = pathname;
    }

    // Search interactions are aggregated without transmitting the typed query,
    // names, or full result URLs to GA4/PostHog.
    let searchStarted = false;
    function onSearchFocus(event: FocusEvent) {
      if (searchStarted || !(event.target instanceof HTMLInputElement)) return;
      if (event.target.id !== "global-search-input") return;
      searchStarted = true;
      trackEvent("search_started", { search_area: "sitewide" });
    }

    function onSearchSubmit(event: SubmitEvent) {
      if (!(event.target instanceof HTMLFormElement)) return;
      if (!event.target.matches(".global-search-form")) return;
      const input = event.target.elements.namedItem("q");
      if (!(input instanceof HTMLInputElement)) return;
      const queryLength = input.value.trim().length;
      if (!queryLength) return;
      trackEvent("search_submitted", {
        search_area: "sitewide",
        query_length_band: queryLength <= 4 ? "1-4" : queryLength <= 12 ? "5-12" : "13+",
      });
    }

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      if (pathname === "/search" && anchor.closest(".global-search-suggestions")) {
        trackEvent("suggestion_selected", { search_area: "sitewide", suggestion_type: "curated" });
      }
      if (pathname === "/search" && anchor.closest(".global-search-list")) {
        const resultType = anchor.closest(".global-search-group")
          ?.querySelector(".global-search-group-heading span")?.textContent?.trim() || "other";
        const destination = new URL(anchor.href, window.location.origin);
        if (destination.origin === window.location.origin) {
          trackEvent("result_clicked", {
            search_area: "sitewide",
            result_type: resultType.slice(0, 48),
            destination_pillar: destination.pathname.split("/")[1] || "home",
          });
        }
      }

      // One lightweight event measures whether related-content discovery creates a next page visit.
      // It is not a key event: reading more pages should not inflate conversion totals.
      if (anchor.closest(".movie-related-section, .jobs-related-results, .explore-place-suggestions, .related-section, .agency-strip, #related-jobs")) {
        try {
          const targetUrl = new URL(anchor.href);
          if (targetUrl.origin === window.location.origin && targetUrl.pathname !== pathname) {
            trackEvent("related_content_click", {
              source_path: pathname,
              destination_path: targetUrl.pathname,
              destination_pillar: targetUrl.pathname.split("/")[1] || "home",
            });
          }
        } catch {}
      }

      if (anchor.closest(".feature-quickstart, .feature-guide")) {
        const destination = new URL(anchor.href, window.location.origin);
        if (destination.origin === window.location.origin) trackEvent("feature_discovery_click", {
          destination_pillar: destination.pathname.split("/")[1] || "home",
          source_path: pathname,
        });
      }

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
    document.addEventListener("focusin", onSearchFocus);
    document.addEventListener("submit", onSearchSubmit);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onSearchFocus);
      document.removeEventListener("submit", onSearchSubmit);
    };
  }, [id, pathname]);

  return null;
}
