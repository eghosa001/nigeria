"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { JobDirectoryResult } from "@/lib/job-query";
import type { JobSector, JobStatus } from "@/lib/jobs";
import { jobLocationFacets, jobProfessionFacets } from "@/lib/job-facets";

type Props = { initialResult: JobDirectoryResult };

const statusLabels: Record<JobStatus | "all", string> = {
  all: "All statuses",
  open: "Open",
  closed: "Closed",
  screening: "Screening",
  training: "Training",
  "career-page": "Career pages",
  upcoming: "Upcoming",
};

export function JobsDirectory({ initialResult }: Props) {
  const [result, setResult] = useState(initialResult);
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<JobSector | "All">("All");
  const [status, setStatus] = useState<JobStatus | "all">("all");
  const [location, setLocation] = useState("all");
  const [profession, setProfession] = useState("all");
  const [page, setPage] = useState(initialResult.page);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
    setSector((params.get("sector") as JobSector | "All" | null) ?? "All");
    setStatus((params.get("status") as JobStatus | "all" | null) ?? "all");
    setLocation(params.get("location") ?? "all");
    setProfession(params.get("profession") ?? "all");
    setPage(Math.max(1, Number(params.get("page") ?? "1") || 1));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (sector !== "All") params.set("sector", sector);
      if (status !== "all") params.set("status", status);
      if (location !== "all") params.set("location", location);
      if (profession !== "all") params.set("profession", profession);
      if (page > 1) params.set("page", String(page));
      params.set("pageSize", String(initialResult.pageSize));

      const visibleParams = new URLSearchParams(params);
      visibleParams.delete("pageSize");
      const visibleQuery = visibleParams.toString();
      window.history.replaceState(null, "", "/jobs" + (visibleQuery ? "?" + visibleQuery : "") + "#opportunities");

      try {
        const response = await fetch("/api/jobs?" + params.toString(), {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Jobs query failed with HTTP " + response.status);
        const next = await response.json() as JobDirectoryResult;
        setResult(next);
        if (next.page !== page) setPage(next.page);
      } catch (error) {
        if ((error as { name?: string }).name !== "AbortError") console.error(error);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, query ? 250 : 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [ready, query, sector, status, location, profession, page, initialResult.pageSize]);

  const resetPage = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="jobs-directory">
      <div className="jobs-controls" aria-label="Filter jobs and career opportunities">
        <label className="jobs-search">
          <span>Search opportunities</span>
          <input type="search" value={query} onChange={(event) => resetPage(setQuery, event.target.value)} placeholder="e.g. engineering, graduate, Customs, SIWES" />
        </label>
        <label>
          <span>Sector</span>
          <select value={sector} onChange={(event) => resetPage(setSector, event.target.value as JobSector | "All")}>
            <option value="All">All sectors</option>
            <option value="Government">Government</option>
            <option value="Private">Private employers</option>
            <option value="International">International / NGO</option>
          </select>
        </label>
        <label>
          <span>Status</span>
          <select value={status} onChange={(event) => resetPage(setStatus, event.target.value as JobStatus | "all")}>
            {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label>
          <span>Location</span>
          <select value={location} onChange={(event) => resetPage(setLocation, event.target.value)}>
            <option value="all">All locations</option>
            {jobLocationFacets.map((facet) => <option key={facet.slug} value={facet.slug}>{facet.shortTitle}</option>)}
          </select>
        </label>
        <label>
          <span>Profession</span>
          <select value={profession} onChange={(event) => resetPage(setProfession, event.target.value)}>
            <option value="all">All professions</option>
            {jobProfessionFacets.map((facet) => <option key={facet.slug} value={facet.slug}>{facet.shortTitle}</option>)}
          </select>
        </label>
      </div>

      <div className="jobs-results-line" aria-live="polite">
        <strong>{result.total}</strong> verified {result.total === 1 ? "pathway" : "pathways"}
        {loading ? <span> · Updating…</span> : null}
      </div>

      <div className="jobs-card-grid">
        {result.items.map((item) => (
          <article className="job-card" key={item.slug}>
            <div className="job-card-top">
              <span className={"job-status job-status-" + item.effectiveStatus}>{item.effectiveStatusLabel}</span>
              <span>{item.sector}</span>
            </div>
            <div className="job-card-body">
              <p className="job-organisation">{item.organization}</p>
              <h3><Link href={"/jobs/" + item.slug}>{item.title}</Link></h3>
              <p>{item.summary}</p>
              <div className="job-tags">
                {item.audiences.map((tag) => <span key={tag}>{tag}</span>)}
                {item.fields.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
            <div className="job-card-footer">
              <span>{item.deadline ? "Deadline " + new Date(item.deadline + "T00:00:00Z").toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "Checked " + new Date(item.verifiedAt + "T00:00:00Z").toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</span>
              <Link href={"/jobs/" + item.slug}>View requirements →</Link>
            </div>
          </article>
        ))}
      </div>

      {result.items.length === 0 ? (
        <div className="jobs-empty">
          <strong>No verified pathway matches those filters yet.</strong>
          <p>Try a broader qualification, employer or sector. We only publish opportunities that can be tied to a responsible official source.</p>
        </div>
      ) : null}

      {result.totalPages > 1 ? (
        <nav className="jobs-pagination" aria-label="Jobs directory pages">
          <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((value) => Math.max(1, value - 1))}>← Previous</button>
          <span>Page {result.page} of {result.totalPages}</span>
          <button type="button" disabled={page >= result.totalPages || loading} onClick={() => setPage((value) => Math.min(result.totalPages, value + 1))}>Next →</button>
        </nav>
      ) : null}
    </div>
  );
}
