"use client";

import { useEffect, useMemo, useState } from "react";
import type { LiveJobListing, LiveJobsResult } from "@/lib/live-job-feed";

function mergeJobs(current: LiveJobListing[], next: LiveJobListing[]) {
  const byUrl = new Map(current.map((job) => [job.sourceUrl, job]));
  for (const job of next) byUrl.set(job.sourceUrl, job);
  return [...byUrl.values()];
}

export function LiveJobsDirectory() {
  const [jobs, setJobs] = useState<LiveJobListing[]>([]);
  const [batch, setBatch] = useState(0);
  const [maxBatches, setMaxBatches] = useState(3);
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
      setJobs((current) => mergeJobs(current, result.items));
      setBatch(result.batch);
      setMaxBatches(result.batches);
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

  return (
    <div className="jobs-directory">
      <div className="jobs-controls" aria-label="Filter live Nigeria jobs">
        <label className="jobs-search">
          <span>Search live jobs</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Role, company or location…" />
        </label>
        <label>
          <span>Location</span>
          <select value={location} onChange={(event) => setLocation(event.target.value)}>
            <option value="all">All loaded locations</option>
            {locations.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>

      <div className="jobs-results-line" aria-live="polite">
        <strong>{filtered.length}</strong> live source listings loaded
        {loading ? <span> · Updating…</span> : null}
      </div>

      {jobs.length ? (
        <div className="jobs-card-grid">
          {filtered.map((job) => (
            <article className="job-card" key={job.sourceUrl}>
              <div className="job-card-top">
                <span className="job-status job-status-open">Source listing</span>
                <span>{job.location}</span>
              </div>
              <div className="job-card-body">
                <p className="job-organisation">{job.company}</p>
                <h3>{job.title}</h3>
                <p>Current Nigeria vacancy discovered from {job.sourceName}. Open the source listing to review the full role, deadline and application method before submitting anything.</p>
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

      {batch < maxBatches ? (
        <div className="jobs-pagination">
          <button type="button" onClick={() => void load(batch + 1)} disabled={loading}>
            {loading ? "Loading…" : "Load about 100 more live jobs"}
          </button>
          <span>Batch {Math.max(batch, 1)} of {maxBatches}</span>
        </div>
      ) : null}

      <p className="job-muted">
        Live-market listings are lightweight discovery records, not standalone MyNigeriaGuide SEO pages. MyNigeriaGuide does not copy full job descriptions and does not accept applications for these roles.
      </p>
    </div>
  );
}
