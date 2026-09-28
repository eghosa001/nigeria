"use client";

import { useEffect, useMemo, useState } from "react";
import { ServiceCard } from "@/components/service-card";
import { searchServices } from "@/lib/search";
import type { PublicServiceListing } from "@/lib/data";

const PAGE_SIZE = 24;

export function ServiceDirectory({ services, initialQuery = "", initialCategory = "all" }: { services: PublicServiceListing[]; initialQuery?: string; initialCategory?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = useMemo(
    () => [...new Set(services.map((service) => service.category))].sort(),
    [services],
  );

  useEffect(() => {
    function syncFromUrl() {
      const params = new URLSearchParams(window.location.search);
      const nextQuery = params.get("q") ?? "";
      const requestedCategory = params.get("category") ?? "all";
      setQuery(nextQuery);
      setCategory(requestedCategory === "all" || categories.includes(requestedCategory) ? requestedCategory : "all");
    }

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [categories]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, category, status, sort]);

  const filtered = useMemo(() => {
    let rows = services.filter((service) =>
      (category === "all" || service.category === category) &&
      (status === "all" || service.status === status),
    );

    if (query.trim()) {
      rows = searchServices(rows, query, rows.length).map(({ service }) => service);
    } else if (sort === "az") {
      rows = [...rows].sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
    } else if (sort === "recent") {
      rows = [...rows].sort((a, b) => b.lastVerified.localeCompare(a.lastVerified));
    }

    return rows;
  }, [services, query, category, status, sort]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <div className="directory-controls">
        <label className="directory-search">
          <span>Search guides</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="passport, CAC, result, NIN…" />
        </label>
        <label>
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All public statuses</option>
            <option value="verified">Verified</option>
            <option value="conflict">Needs confirmation</option>
          </select>
        </label>
        <label>
          <span>Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)} disabled={Boolean(query.trim())}>
            <option value="relevance">Featured</option>
            <option value="az">A–Z</option>
            <option value="recent">Recently checked</option>
          </select>
        </label>
      </div>

      <div className="directory-summary" aria-live="polite">
        <strong>{filtered.length}</strong> guide{filtered.length === 1 ? "" : "s"} shown
        {(query || category !== "all" || status !== "all") ? (
          <button type="button" onClick={() => { setQuery(""); setCategory("all"); setStatus("all"); setSort("relevance"); }}>
            Clear filters
          </button>
        ) : null}
      </div>

      {filtered.length ? (
        <div className="service-grid">
          {visible.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>
      ) : (
        <div className="empty-state">
          <strong>No matching verified guide.</strong>
          <p>Try a broader search or clear one of the filters.</p>
        </div>
      )}

      {visibleCount < filtered.length ? (
        <div className="directory-load-more">
          <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Show more guides</button>
          <small>Showing {visible.length} of {filtered.length}</small>
        </div>
      ) : null}
    </>
  );
}
