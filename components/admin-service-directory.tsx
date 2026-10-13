"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

export type AdminServiceListItem = {
  slug: string;
  title: string;
  shortTitle: string;
  agencySlug: string;
  category: string;
  status: "verified" | "conflict" | "review";
  lastVerified: string;
  sourceCount: number;
  searchTerms: string[];
};

const PAGE_SIZE = 30;

export function AdminServiceDirectory({ services }: { services: AdminServiceListItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const deferredQuery = useDeferredValue(query);

  const categories = useMemo(() => [...new Set(services.map((service) => service.category))].sort(), [services]);
  const rows = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    return services
      .filter((service) => (category === "all" || service.category === category) &&
        (status === "all" || service.status === status) &&
        (!needle || [service.title, service.shortTitle, service.slug, service.category,
          service.agencySlug, ...service.searchTerms].join(" ").toLowerCase().includes(needle)))
      .sort((a, b) => a.category.localeCompare(b.category) || a.shortTitle.localeCompare(b.shortTitle));
  }, [services, deferredQuery, category, status]);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, pages);
  const visible = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <div className="admin-filterbar">
        <label>
          <span>Search guides</span>
          <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }}
            placeholder="visa, BVN, passport, JAMB…" />
        </label>
        <label>
          <span>Category</span>
          <select value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }}>
            <option value="all">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Status</span>
          <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}>
            <option value="all">All statuses</option>
            <option value="verified">Verified</option>
            <option value="conflict">Conflict</option>
            <option value="review">Review</option>
          </select>
        </label>
      </div>

      <div className="admin-result-count" aria-live="polite">
        <strong>{rows.length}</strong> guide{rows.length === 1 ? "" : "s"} · Page {currentPage} of {pages}
      </div>

      <div className="admin-guide-table">
        <div className="admin-guide-row admin-guide-head">
          <span>Guide</span><span>Category</span><span>Status</span><span>Checked</span><span>Sources</span><span />
        </div>
        {visible.map((service) => (
          <Link className="admin-guide-row" href={"/admin/services/" + service.slug} key={service.slug}>
            <span><strong>{service.shortTitle}</strong><small>{service.agencySlug.toUpperCase()}</small></span>
            <span>{service.category}</span>
            <span className={"admin-status admin-status-" + service.status}>{service.status}</span>
            <span>{service.lastVerified}</span>
            <span>{service.sourceCount}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
      {pages > 1 ? (
        <nav className="admin-pagination" aria-label="Service result pages">
          <button type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Previous</button>
          <span>Page {currentPage} / {pages}</span>
          <button type="button" disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}>Next</button>
        </nav>
      ) : null}
    </>
  );
}
