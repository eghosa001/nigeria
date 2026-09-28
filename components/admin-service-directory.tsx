"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Service } from "@/lib/types";

export function AdminServiceDirectory({ services }: { services: Service[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const categories = useMemo(() => [...new Set(services.map((service) => service.category))].sort(), [services]);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return services
      .filter((service) => category === "all" || service.category === category)
      .filter((service) => status === "all" || service.status === status)
      .filter((service) =>
        !needle ||
        [service.title, service.shortTitle, service.slug, service.category, service.agencySlug, ...service.searchTerms]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
      .sort((a, b) => a.category.localeCompare(b.category) || a.shortTitle.localeCompare(b.shortTitle));
  }, [services, query, category, status]);

  return (
    <>
      <div className="admin-filterbar">
        <label>
          <span>Search guides</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="visa, BVN, passport, JAMB…" />
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
            <option value="all">All statuses</option>
            <option value="verified">Verified</option>
            <option value="conflict">Conflict</option>
            <option value="review">Review</option>
          </select>
        </label>
      </div>

      <div className="admin-result-count" aria-live="polite">
        <strong>{rows.length}</strong> guide{rows.length === 1 ? "" : "s"}
      </div>

      <div className="admin-guide-table">
        <div className="admin-guide-row admin-guide-head">
          <span>Guide</span><span>Category</span><span>Status</span><span>Checked</span><span>Sources</span><span />
        </div>
        {rows.map((service) => (
          <Link className="admin-guide-row" href={"/admin/services/" + service.slug} key={service.slug}>
            <span><strong>{service.shortTitle}</strong><small>{service.agencySlug.toUpperCase()}</small></span>
            <span>{service.category}</span>
            <span className={"admin-status admin-status-" + service.status}>{service.status}</span>
            <span>{service.lastVerified}</span>
            <span>{service.sources.length}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </>
  );
}
