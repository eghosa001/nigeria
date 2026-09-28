"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getAgency } from "@/lib/data";
import type { Service } from "@/lib/types";

export function FeeDirectory({ services }: { services: Service[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const categories = useMemo(
    () => [...new Set(services.map((service) => service.category))].sort(),
    [services],
  );

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return services
      .filter((service) => category === "all" || service.category === category)
      .filter((service) => status === "all" || service.status === status)
      .filter((service) => {
        if (!normalized) return true;
        const agency = getAgency(service.agencySlug);
        return [
          service.title,
          service.shortTitle,
          service.category,
          service.feeLabel,
          service.feeNote ?? "",
          agency?.name ?? "",
          agency?.shortName ?? "",
        ].some((value) => value.toLowerCase().includes(normalized));
      })
      .sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
  }, [services, query, category, status]);

  return (
    <>
      <div className="fee-controls">
        <label>
          <span>Search fees</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="passport, NIN, JAMB, CAC…"
          />
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
            <option value="conflict">Official-source conflicts</option>
          </select>
        </label>
      </div>

      <div className="directory-summary" aria-live="polite">
        <strong>{rows.length}</strong> fee/service entr{rows.length === 1 ? "y" : "ies"}
        {(query || category !== "all" || status !== "all") ? (
          <button type="button" onClick={() => { setQuery(""); setCategory("all"); setStatus("all"); }}>
            Clear filters
          </button>
        ) : null}
      </div>

      <div className="fee-table" role="list">
        {rows.map((service) => {
          const agency = getAgency(service.agencySlug);
          return (
            <Link role="listitem" href={"/services/" + service.slug} key={service.slug} className="fee-row">
              <span className="fee-service">
                <strong>{service.shortTitle}</strong>
                <small>{agency?.shortName ?? service.agencySlug.toUpperCase()} · {service.category}</small>
              </span>
              <span className="fee-value">
                <strong>{service.feeLabel}</strong>
                {service.feeNote ? <small>{service.feeNote}</small> : null}
              </span>
              <span className={"fee-status fee-status-" + service.status}>
                {service.status === "verified" ? "Verified" : "Check conflict"}
              </span>
              <span className="fee-checked">Checked {service.lastVerified}</span>
              <span className="fee-arrow" aria-hidden="true">→</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
