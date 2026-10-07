"use client";

import { useEffect, useMemo, useState } from "react";
import type { LiveJobListing, LiveJobsResult } from "@/lib/live-job-feed";

const PAGE_SIZE = 12;

export function LiveJobsDirectory() {
  const [jobs, setJobs] = useState<LiveJobListing[]>([]);
  const [batch, setBatch] = useState(1);
  const [visiblePage, setVisiblePage] = useState(1);
  const [maxBatches, setMaxBatches] = useState(25);
  const [approximateAvailable, setApproximateAvailable] = useState(2460);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");

  async function load(nextBatch: number) {
    setLoading(true);
    setFailed(false);
    try {
      const response = await fetch("/api/jobs/live?batch=" + nextBatch, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Live jobs request failed");
      const result = await response.json() as LiveJobsResult;
      setJobs(result.items);
      setBatch(result.batch);
      setVisiblePage(1);
      setMaxBatches(result.batches);
      setApproximateAvailable(result.approximateAvailable);
      setLocation("all");
    } catch (error) {
      console.error(error);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load(1);
  }, []);

  const locations = useMemo(() => {
    return [...new Set(jobs.map((job) => job.location).filter(Boolean))].sort();
  }, [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      if (location !== "all" && job.location !== location) return false;
      if (!q) return true;
      return [job.title, job.company, job.location].some((value) => value.toLowerCase().includes(q));
    });
  }, [jobs, query, location]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((visiblePage - 1) * PAGE_SIZE, visiblePage * PAGE_SIZE);

  return (
    <div className="jobs-directory">
      <div className="jobs-controls" aria-label="Filter live Nigeria jobs">
        <label className="jobs-search">
          <span>Search this live batch</span>
          <input value={query} onChange={(event) => { setQuery(event.target.value); setVisiblePage(1); }} placeholder="Role, company or location…" />
        </label>
        <label>
          <span>Location</span>
          <select value={location} onChange={(event) => { setLocation(event.target.value); setVisiblePage(1); }}>
            <option value="all">All loaded locations</option>
            {locations.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>

      <div className="jobs-results-line" aria-live="polite">
        <strong>{filtered.length}</strong> listings in this batch · showing {visible.length ? (visiblePage - 1) * PAGE_SIZE + 1 : 0}–{(visiblePage - 1) * PAGE_SIZE + visible.length}
        <span> · about {approximateAvailable.toLocaleString("en-NG")} current-month source listings across {maxBatches} batches</span>
        {loading ? <span> · Updating…</span> : null}
      </div>

      {jobs.length ? (
        <div className="jobs-card-grid">
          {visible.map((job) => (
            <article className="job-card" key={job.sourceUrl}>
              <div className="job-card-top">
                <span className="job-status job-status-open">Source listing</span>
                <span>{job.location}</span>
              </div>
              <div className="job-card-body">
                <p className="job-organisation">{job.company}</p>
                <h3>{job.title}</h3>
                <p>Found via {job.sourceName}. Check eligibility, deadline and application instructions at the source.</p>
              </div>
              <div className="job-card-footer">
                <span>{job.postedAt ? "Posted " + new Date(job.postedAt + "T00:00:00Z").toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "Current-month listing"}</span>
                <a href={job.sourceUrl} target="_blank" rel="noreferrer">Check source & apply ↗</a>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {failed && !jobs.length ? (
        <div className="jobs-empty">
          <strong>Live market feed is temporarily unavailable.</strong>
          <p>The curated MyNigeriaGuide directory below remains available and source-verified.</p>
        </div>
      ) : null}

      {pages > 1 ? (
        <nav className="jobs-pagination" aria-label="Page through jobs in this batch">
          <button type="button" disabled={visiblePage <= 1} onClick={() => setVisiblePage((page) => Math.max(1, page - 1))}>← Previous</button>
          <span>Page {visiblePage} of {pages}</span>
          <button type="button" disabled={visiblePage >= pages} onClick={() => setVisiblePage((page) => Math.min(pages, page + 1))}>Next →</button>
        </nav>
      ) : null}

      <nav className="jobs-pagination" aria-label="Live jobs batches">
        <button type="button" onClick={() => void load(Math.max(1, batch - 1))} disabled={loading || batch <= 1}>← Previous 100</button>
        <label>
          <span className="sr-only">Live jobs batch</span>
          <select value={batch} onChange={(event) => void load(Number(event.target.value))} disabled={loading}>
            {Array.from({ length: maxBatches }, (_, index) => index + 1).map((value) => (
              <option value={value} key={value}>Batch {value} of {maxBatches}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={() => void load(Math.min(maxBatches, batch + 1))} disabled={loading || batch >= maxBatches}>Next 100 →</button>
      </nav>

      <p className="job-muted">
        Only 12 listings appear per screen; use the page buttons to see the rest of each 100-job source batch. Search and location filters apply to the batch currently loaded. These are lightweight discovery records, not standalone MyNigeriaGuide SEO pages; MyNigeriaGuide does not copy full job descriptions or accept applications for these roles.
      </p>
    </div>
  );
}
