"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/client-analytics";

/** Measures usefulness of global search without sending user-entered terms. */
export function SearchResultsAnalytics({ query, resultCount }: { query: string; resultCount: number }) {
  const previousView = useRef("");

  useEffect(() => {
    if (!query.trim()) return;
    const view = query + ":" + resultCount;
    if (previousView.current === view) return;
    previousView.current = view;

    trackEvent("search_results_viewed", {
      search_area: "sitewide",
      result_count_band: resultCount === 0 ? "0" : resultCount <= 5 ? "1-5" : resultCount <= 20 ? "6-20" : "21+",
    });
    if (resultCount === 0) {
      trackEvent("search_no_results", { search_area: "sitewide" });
    }
  }, [query, resultCount]);

  return null;
}
