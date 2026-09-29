"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { shouldEnableAnalytics } from "@/lib/analytics-safety";
import { trackEvent } from "@/lib/client-analytics";

type AnalyticsWindow = Window & typeof globalThis & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __mngGaInitialized?: boolean;
};

export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();

  useEffect(() => {
    if (!id) return;

    const analyticsWindow = window as AnalyticsWindow;
    const disabledKey = `ga-disable-${id}`;
    const enabled = shouldEnableAnalytics(pathname, navigator.webdriver);
    Reflect.set(analyticsWindow, disabledKey, !enabled);
    if (!enabled) return;

    const dataLayer = analyticsWindow.dataLayer ?? (analyticsWindow.dataLayer = []);
    const gtag = analyticsWindow.gtag ?? ((...args: unknown[]) => { dataLayer.push(args); });
    analyticsWindow.gtag = gtag;

    if (!document.querySelector('script[data-mynigeriaguide-ga]')) {
      const script = document.createElement("script");
      script.async = true;
      script.dataset.mynigeriaguideGa = "true";
      script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
      document.head.appendChild(script);
    }

    if (!analyticsWindow.__mngGaInitialized) {
      gtag("js", new Date());
      gtag("config", id, { anonymize_ip: true, send_page_view: false });
      analyticsWindow.__mngGaInitialized = true;
    }

    gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });

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
    return () => document.removeEventListener("click", onClick);
  }, [id, pathname]);

  return null;
}
