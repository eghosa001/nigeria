"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ServiceCard } from "@/components/service-card";
import type {
  ServiceDirectoryResult,
  ServiceDirectorySort,
  ServiceDirectoryStatus,
} from "@/lib/service-query";

type Props = {
  initialResult: ServiceDirectoryResult;
  categories: string[];
  initialQuery?: string;
  initialCategory?: string;
  initialStatus?: ServiceDirectoryStatus;
  initialSort?: ServiceDirectorySort;
};

export function ServiceDirectory({
  initialResult,
  categories,
  initialQuery = "",
  initialCategory = "all",
  initialStatus = "all",
  initialSort = "relevance",
}: Props) {
  const [result, setResult] = useState(initialResult);
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [status, setStatus] = useState<ServiceDirectoryStatus>(initialStatus);
  const [sort, setSort] = useState<ServiceDirectorySort>(initialSort);
  const [page, setPage] = useState(initialResult.page);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const skipInitialFetch = useRef(true);

  useEffect(() => {
    setReady(true);

    function syncFromUrl() {
      const params = new URLSearchParams(window.location.search);
      const nextCategory = params.get("category") ?? "all";
      const nextStatus = params.get("status") ?? "all";
      const nextSort = params.get("sort") ?? "relevance";
      setQuery(params.get("q") ?? "");
      setCategory(nextCategory === "all" || categories.includes(nextCategory) ? nextCategory : "all");
      setStatus(["all", "verified", "conflict"].includes(nextStatus) ? nextStatus as ServiceDirectoryStatus : "all");
      setSort(["relevance", "az", "recent"].includes(nextSort) ? nextSort as ServiceDirectorySort : "relevance");
      setPage(Math.max(1, Number(params.get("page") ?? "1") || 1));
    }

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [categories]);

  useEffect(() => {
    if (!ready) return;
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (category !== "all") params.set("category", category);
      if (status !== "all") params.set("status", status);
      if (sort !== "relevance") params.set("sort", sort);
      if (page > 1) params.set("page", String(page));
      params.set("pageSize", String(initialResult.pageSize));

      const visibleParams = new URLSearchParams(params);
      visibleParams.delete("pageSize");
      const visibleQuery = visibleParams.toString();
      window.history.replaceState(null, "", "/services" + (visibleQuery ? "?" + visibleQuery : "") + "#service-directory");

      try {
        const response = await fetch("/api/services?" + params.toString(), {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Service query failed with HTTP " + response.status);
        const next = await response.json() as ServiceDirectoryResult;
        setResult(next);
        if (next.page !== page) setPage(next.page);
      } catch (error) {
        if ((error as { name?: string }).name !== "AbortError") console.error(error);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, query ? 200 : 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [ready, query, category, status, sort, page, initialResult.pageSize]);

  const resetPage = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    setPage(1);
  };

  const filtersActive = Boolean(query || category !== "all" || status !== "all" || sort !== "relevance");

  return (
    <>
      <div className="directory-controls">
        <label className="directory-search">
          <span>Search guides</span>
          <input
            type="search"
            value={query}
            onChange={(event) => resetPage(setQuery, event.target.value)}
            placeholder="passport, CAC, result, NIN…"
          />
        </label>
        <label>
          <span>Category</span>
          <select value={category} onChange={(event) => resetPage(setCategory, event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Status</span>
          <select value={status} onChange={(event) => resetPage(setStatus, event.target.value as ServiceDirectoryStatus)}>
            <option value="all">All public statuses</option>
            <option value="verified">Verified</option>
            <option value="conflict">Needs confirmation</option>
          </select>
        </label>
        <label>
          <span>Sort</span>
          <select
            value={sort}
            onChange={(event) => resetPage(setSort, event.target.value as ServiceDirectorySort)}
            disabled={Boolean(query.trim())}
          >
            <option value="relevance">Featured</option>
            <option value="az">A–Z</option>
            <option value="recent">Recently checked</option>
          </select>
        </label>
      </div>

      <div className="directory-summary" aria-live="polite">
        <strong>{result.total}</strong> guide{result.total === 1 ? "" : "s"} found
        {loading ? <span> · Updating…</span> : null}
        {filtersActive ? (
          <button type="button" onClick={() => {
            setQuery("");
            setCategory("all");
            setStatus("all");
            setSort("relevance");
            setPage(1);
          }}>
            Clear filters
          </button>
        ) : null}
      </div>

      {result.items.length ? (
        <div className="service-grid">
          {result.items.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>
      ) : (
        <div className="empty-state">
          <strong>No matching verified guide.</strong>
          <p>Try a broader search or clear one of the filters.</p>
        </div>
      )}

      {result.totalPages > 1 ? (
        filtersActive ? (
          <nav className="jobs-pagination" aria-label="Filtered service result pages">
            <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((value) => Math.max(1, value - 1))}>← Previous</button>
            <span>Page {result.page} of {result.totalPages}</span>
            <button type="button" disabled={page >= result.totalPages || loading} onClick={() => setPage((value) => Math.min(result.totalPages, value + 1))}>Next →</button>
          </nav>
        ) : (
          <nav className="jobs-pagination" aria-label="Service directory pages">
            <span>Page 1 of {result.totalPages}</span>
            <Link prefetch={false} href="/services/page/2">Next →</Link>
          </nav>
        )
      ) : null}
    </>
  );
}
