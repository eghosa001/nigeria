"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CareerOpportunity, JobSector, JobStatus } from "@/lib/jobs";

type Props = { opportunities: CareerOpportunity[] };

const statusLabels: Record<JobStatus | "all", string> = {
  all: "All statuses",
  open: "Open",
  closed: "Closed",
  screening: "Screening",
  training: "Training",
  "career-page": "Career pages",
  upcoming: "Upcoming"
};

export function JobsDirectory({ opportunities }: Props) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<JobSector | "All">("All");
  const [status, setStatus] = useState<JobStatus | "all">("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return opportunities.filter((item) => {
      if (sector !== "All" && item.sector !== sector) return false;
      if (status !== "all" && item.status !== status) return false;
      if (!needle) return true;
      return [
        item.title,
        item.organization,
        item.summary,
        item.location,
        ...item.audiences,
        ...item.fields,
        ...item.qualifications
      ].join(" ").toLowerCase().includes(needle);
    });
  }, [opportunities, query, sector, status]);

  return (
    <div className="jobs-directory">
      <div className="jobs-controls" aria-label="Filter jobs and career opportunities">
        <label className="jobs-search">
          <span>Search opportunities</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. engineering, graduate, Customs, SIWES"
          />
        </label>

        <label>
          <span>Sector</span>
          <select value={sector} onChange={(event) => setSector(event.target.value as JobSector | "All")}>
            <option value="All">Government & private</option>
            <option value="Government">Government</option>
            <option value="Private">Private institutions</option>
          </select>
        </label>

        <label>
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value as JobStatus | "all")}>
            {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
      </div>

      <div className="jobs-results-line" aria-live="polite">
        <strong>{filtered.length}</strong> verified {filtered.length === 1 ? "pathway" : "pathways"}
      </div>

      <div className="jobs-card-grid">
        {filtered.map((item) => (
          <article className="job-card" key={item.slug}>
            <div className="job-card-top">
              <span className={"job-status job-status-" + item.status}>{item.statusLabel}</span>
              <span>{item.sector}</span>
            </div>
            <div className="job-card-body">
              <p className="job-organisation">{item.organization}</p>
              <h3><Link href={"/jobs/" + item.slug}>{item.title}</Link></h3>
              <p>{item.summary}</p>
              <div className="job-tags">
                {item.audiences.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
                {item.fields.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
            <div className="job-card-footer">
              <span>Checked {new Date(item.verifiedAt + "T00:00:00Z").toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</span>
              <Link href={"/jobs/" + item.slug}>View requirements →</Link>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="jobs-empty">
          <strong>No verified pathway matches those filters yet.</strong>
          <p>Try a broader qualification, employer or sector. We only publish opportunities that can be tied to a responsible official source.</p>
        </div>
      ) : null}
    </div>
  );
}
