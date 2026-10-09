"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/client-analytics";

type SearchResult = { slug: string; shortTitle: string; category: string; status: string };

export function ServiceSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const value = query.trim();
    setResults([]);
    setFailed(false);
    if (!value) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams({ q: value, pageSize: "7" });
        const response = await fetch("/api/services?" + params, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Search temporarily unavailable");
        const result = await response.json() as { items: SearchResult[] };
        if (!controller.signal.aborted) setResults(result.items);
      } catch {
        if (!controller.signal.aborted) setFailed(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 180);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="search-shell">
      <label htmlFor="service-search">What do you want to do?</label>
      <div className="search-input-wrap">
        <span aria-hidden="true">⌕</span>
        <input id="service-search" value={query} onChange={(event) => setQuery(event.target.value)}
          placeholder="e.g. my passport expired, I lost my JAMB profile code" autoComplete="off" />
      </div>
      {query.trim() ? (
        <div className="search-results" aria-live="polite">
          {loading ? <div className="search-empty">Finding relevant guides…</div> :
            failed ? <div className="search-empty">
              Search is temporarily unavailable. <Link href={"/services?q=" + encodeURIComponent(query.trim())}>Search the full directory →</Link>
            </div> : results.length ? results.map((service) => (
              <Link key={service.slug} href={"/services/" + service.slug}
                onClick={() => trackEvent("service_search_click", { service_slug: service.slug, search_term: query.trim().slice(0, 80) })}>
                <span><strong>{service.shortTitle}</strong><small>{service.category} · {service.status === "conflict" ? "official-source conflict" : "verified"}</small></span>
                <span aria-hidden="true">→</span>
              </Link>
            )) : <div className="search-empty">No matching guide yet. Try fewer words or browse the service directory.</div>}
        </div>
      ) : null}
    </div>
  );
}
