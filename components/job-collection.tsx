"use client";

import { useState } from "react";
import Link from "next/link";
import type { CareerOpportunity } from "@/lib/jobs";
import { getEffectiveJobStatus, getEffectiveStatusLabel } from "@/lib/job-runtime";

const PAGE_SIZE = 12;

export function JobCollection({
  opportunities,
  emptyText = "No verified opportunities match this collection yet.",
}: {
  opportunities: CareerOpportunity[];
  emptyText?: string;
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(opportunities.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const visible = opportunities.slice(start, start + PAGE_SIZE);

  if (!opportunities.length) {
    return <div className="jobs-empty"><strong>{emptyText}</strong></div>;
  }

  return (
    <div className="jobs-collection">
      <p className="jobs-results-line" aria-live="polite">Showing {start + 1}–{start + visible.length} of {opportunities.length} verified opportunities</p>
      <div className="jobs-card-grid">
      {visible.map((item) => (
        <article className={"job-card" + (getEffectiveJobStatus(item) === "open" ? " job-card-open" : "")} key={item.slug}>
          <div className="job-card-top">
            <span className={"job-status job-status-" + getEffectiveJobStatus(item)}>{getEffectiveStatusLabel(item)}</span>
            <span>{item.sector}</span>
          </div>
          <div className="job-card-body">
            <p className="job-organisation">{item.organization}</p>
            <h2><Link href={"/jobs/" + item.slug}>{item.title}</Link></h2>
            <p>{item.summary.length > 180 ? item.summary.slice(0, 180).trimEnd() + "…" : item.summary}</p>
            <div className="job-tags">
              {item.fields.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
          <div className="job-card-footer">
            <span>
              {item.deadline
                ? "Deadline " + new Date(item.deadline + "T00:00:00Z").toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
                : "Checked " + item.verifiedAt}
            </span>
            <Link href={"/jobs/" + item.slug}>Requirements →</Link>
          </div>
        </article>
      ))}
      </div>
      {totalPages > 1 ? (
        <nav className="jobs-pagination" aria-label="Browse more verified opportunities">
          <button type="button" disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>← Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button type="button" disabled={page >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>Next →</button>
        </nav>
      ) : null}
    </div>
  );
}
