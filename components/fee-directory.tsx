"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FeeDirectoryResult } from "@/lib/fee-query";

export function FeeDirectory({
  initialResult, categories,
}: {
  initialResult: FeeDirectoryResult;
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(initialResult);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const skipInitial = useRef(true);

  useEffect(() => {
    if (skipInitial.current) {
      skipInitial.current = false;
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    const timeout = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        if (query.trim()) params.set("q", query.trim());
        if (category !== "all") params.set("category", category);
        if (status !== "all") params.set("status", status);
        params.set("page", String(page));
        const response = await fetch("/api/fees?" + params, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Fee lookup unavailable");
        const next = await response.json() as FeeDirectoryResult;
        if (!controller.signal.aborted) {
          setResult(next);
          if (next.page !== page) setPage(next.page);
        }
      } catch {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, query ? 200 : 0);
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query, category, status, page]);

  function changeFilter(setter: (value: string) => void, value: string) {
    setter(value);
    setPage(1);
  }

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setStatus("all");
    setPage(1);
  }

  return (
    <>
      <div className="fee-controls">
        <label>
          <span>Search fees</span>
          <input type="search" value={query}
            onChange={(event) => changeFilter(setQuery, event.target.value)}
            placeholder="passport, NIN, JAMB, CAC…" />
        </label>
        <label>
          <span>Category</span>
          <select value={category} onChange={(event) => changeFilter(setCategory, event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Status</span>
          <select value={status} onChange={(event) => changeFilter(setStatus, event.target.value)}>
            <option value="all">All public statuses</option>
            <option value="verified">Verified</option>
            <option value="conflict">Needs confirmation</option>
          </select>
        </label>
      </div>

      <div className="directory-summary" aria-live="polite">
        <strong>{result.total}</strong> fee/service entr{result.total === 1 ? "y" : "ies"}
        {loading ? <span role="status"> · Updating…</span> : null}
        {(query || category !== "all" || status !== "all") ? (
          <button type="button" onClick={clearFilters}>Clear filters</button>
        ) : null}
      </div>

      {error ? (
        <div className="empty-state" role="alert">
          Fee results could not update. Change the search or filters to try again.
        </div>
      ) : null}

      <div className="fee-table" role="list" aria-busy={loading}>
        {result.items.map((service) => (
          <Link role="listitem" href={"/services/" + service.slug}
            key={service.slug} className="fee-row">
            <span className="fee-service">
              <strong>{service.shortTitle}</strong>
              <small>{service.agencyShortName} · {service.category}</small>
            </span>
            <span className="fee-value">
              <strong>{service.feeLabel}</strong>
              {service.feeNote ? <small>{service.feeNote}</small> : null}
            </span>
            <span className={"fee-status fee-status-" + service.status}>
              {service.status === "verified" ? "Verified" : "Confirm details"}
            </span>
            <span className="fee-checked">Checked {service.lastVerified}</span>
            <span className="fee-arrow" aria-hidden="true">→</span>
          </Link>
        ))}
        {!result.items.length ? <p className="empty-state">No matching fees. Try another search.</p> : null}
      </div>

      {result.totalPages > 1 ? (
        <nav className="movie-pagination" aria-label="Fee directory pages">
          <button type="button" disabled={result.page <= 1 || loading}
            onClick={() => setPage(Math.max(1, result.page - 1))}>← Previous</button>
          <span>Page {result.page} of {result.totalPages}</span>
          <button type="button" disabled={result.page >= result.totalPages || loading}
            onClick={() => setPage(result.page + 1)}>Next →</button>
        </nav>
      ) : null}
    </>
  );
}
