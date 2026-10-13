"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { JobDirectoryItem, JobDirectoryResult } from "@/lib/job-query";
import { trackEvent } from "@/lib/client-analytics";

export type JobWatchFilters = {
  q: string; sector: string; status: string; location: string; profession: string;
};
type SavedSearch = { id: string; filters: JobWatchFilters; seen: string[]; createdAt: string };
type Checked = { id: string; items: JobDirectoryItem[]; fresh: JobDirectoryItem[]; total: number };
const storageKey = "mynigeriaguide:job-search-watches:v1";
const maximum = 5;

function normalize(filters: JobWatchFilters): JobWatchFilters {
  return {
    q: filters.q.trim().slice(0, 80),
    sector: filters.sector.slice(0, 60),
    status: filters.status.slice(0, 30),
    location: filters.location.slice(0, 80),
    profession: filters.profession.slice(0, 80),
  };
}
function identity(filters: JobWatchFilters) { return JSON.stringify(normalize(filters)); }
function read(): SavedSearch[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is SavedSearch =>
      Boolean(item && typeof item.id === "string" && item.filters && typeof item.filters.q === "string" &&
        typeof item.filters.sector === "string" && typeof item.filters.status === "string" &&
        typeof item.filters.location === "string" && typeof item.filters.profession === "string" &&
        Array.isArray(item.seen)))
      .slice(0, maximum)
      .map((item) => ({
        id: item.id.slice(0, 70),
        filters: normalize(item.filters),
        seen: item.seen.filter((slug): slug is string => typeof slug === "string" && /^[a-z0-9-]{1,150}$/.test(slug)).slice(-300),
        createdAt: item.createdAt,
      }));
  } catch { return []; }
}
function describe(filters: JobWatchFilters) {
  const parts = [
    filters.q ? "“" + filters.q + "”" : "Any keyword",
    filters.status !== "all" ? filters.status : "",
    filters.sector !== "All" ? filters.sector : "",
    filters.location !== "all" ? filters.location.replaceAll("-", " ") : "",
    filters.profession !== "all" ? filters.profession.replaceAll("-", " ") : "",
  ];
  return parts.filter(Boolean).join(" · ");
}
async function query(filters: JobWatchFilters): Promise<JobDirectoryResult> {
  const params = new URLSearchParams();
  const input = normalize(filters);
  if (input.q) params.set("q", input.q);
  if (input.status !== "all") params.set("status", input.status);
  if (input.sector !== "All") params.set("sector", input.sector);
  if (input.location !== "all") params.set("location", input.location);
  if (input.profession !== "all") params.set("profession", input.profession);
  params.set("pageSize", "12");
  const response = await fetch("/api/jobs?" + params.toString(), { cache: "no-store", headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error("Could not check jobs right now");
  return await response.json() as JobDirectoryResult;
}
function persist(next: SavedSearch[]): boolean {
  try { localStorage.setItem(storageKey, JSON.stringify(next)); return true; }
  catch { return false; }
}

export function JobSearchWatch({ filters }: { filters?: JobWatchFilters }) {
  const [saved, setSaved] = useState<SavedSearch[]>([]);
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(false);
  const [checks, setChecks] = useState<Checked[]>([]);
  const [notice, setNotice] = useState("");
  const current = filters ? normalize(filters) : null;
  const alreadySaved = current ? saved.some((item) => identity(item.filters) === identity(current)) : false;

  useEffect(() => {
    const refresh = () => { setSaved(read()); setReady(true); };
    refresh();
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  function change(next: SavedSearch[]) {
    if (!persist(next)) { setNotice("Unable to save on this browser. Check your storage settings."); return false; }
    setSaved(next);
    return true;
  }
  async function save() {
    if (!current || alreadySaved || saved.length >= maximum || checking) return;
    setChecking(true);
    setNotice("");
    try {
      const response = await query(current);
      const next = [...saved, {
        id: String(Date.now()) + "-" + String(Math.floor(Math.random() * 100000)),
        filters: current,
        seen: response.items.map((item) => item.slug),
        createdAt: new Date().toISOString(),
      }];
      if (change(next)) {
        trackEvent("job_watch_add", { watch_count: next.length });
        setNotice("Search saved. Return here or to Saved to check for new matches.");
      }
    } catch {
      setNotice("Could not save this search because the latest results could not be checked. Try again.");
    } finally { setChecking(false); }
  }
  async function checkAll() {
    if (checking || !saved.length) return;
    setChecking(true);
    setChecks([]);
    setNotice("");
    try {
      const latest: Checked[] = [];
      for (const item of saved) {
        const response = await query(item.filters);
        latest.push({
          id: item.id,
          items: response.items,
          fresh: response.items.filter((job) => !item.seen.includes(job.slug)),
          total: response.total,
        });
      }
      setChecks(latest);
      trackEvent("job_watch_check", { watch_count: saved.length, new_matches: latest.reduce((sum, item) => sum + item.fresh.length, 0) });
      if (!latest.some((item) => item.fresh.length)) setNotice("No new opportunities among the latest 12 results for each saved search.");
    } catch { setNotice("The job directory could not be checked. Your saved searches are safe; try again."); }
    finally { setChecking(false); }
  }
  function markSeen(checked: Checked) {
    const next = saved.map((item) => item.id === checked.id
      ? { ...item, seen: [...new Set([...item.seen, ...checked.items.map((job) => job.slug)])].slice(-300) }
      : item);
    if (change(next)) setChecks((previous) => previous.filter((item) => item.id !== checked.id));
  }
  function remove(id: string) {
    const next = saved.filter((item) => item.id !== id);
    if (change(next)) {
      setChecks((previous) => previous.filter((item) => item.id !== id));
      trackEvent("job_watch_remove", { watch_count: next.length });
    }
  }

  return <section className="job-watch-panel" aria-label="Saved job searches">
    <h3>Follow the opportunities that matter to you</h3>
    <p>Save up to five job searches. When you return, check for new matches among the first 12 results for each search. Your choices stay on this device.</p>
    <div className="job-watch-actions">
      {current ? <button type="button" disabled={!ready || alreadySaved || saved.length >= maximum || checking} onClick={save}>
        {alreadySaved ? "Search saved" : "Save these filters"}
      </button> : <Link href="/jobs#opportunities">Find and save a job search →</Link>}
      {saved.length ? <button type="button" disabled={checking} onClick={checkAll}>{checking ? "Checking…" : "Check saved searches"}</button> : null}
    </div>
    {ready && saved.length > 0 ? <ul className="job-watch-list">{saved.map((item) => {
      const checked = checks.find((result) => result.id === item.id);
      return <li key={item.id}>
        <strong>{describe(item.filters)}</strong>
        <button type="button" onClick={() => remove(item.id)} disabled={checking} aria-label={"Remove saved search: " + describe(item.filters)}>Remove</button>
        {checked ? <div className="job-watch-results" role="status">
          <strong>{checked.fresh.length ? checked.fresh.length + " new in the latest 12 matches" : "No new matches in the latest 12"}</strong>
          <p>{checked.total} matching pathways currently listed. Confirm each deadline at the official source.</p>
          {checked.fresh.length ? <ul>{checked.fresh.slice(0, 6).map((job) => <li key={job.slug}><Link href={"/jobs/" + job.slug}>{job.organization} — {job.title}</Link></li>)}</ul> : null}
          <button type="button" onClick={() => markSeen(checked)}>Mark results checked</button>
        </div> : null}
      </li>;
    })}</ul> : null}
    {ready && saved.length === 0 ? <p>No saved job searches yet. Set your filters in Jobs & Careers and select “Save these filters”.</p> : null}
    {ready && saved.length >= maximum && !alreadySaved ? <p>Five saved searches reached. Remove one to save another.</p> : null}
    {notice ? <p role="status">{notice}</p> : null}
    <p className="feature-guide-note">Checks are manual and do not send email, push notifications or applications. <Link href="/features">See everything you can do →</Link></p>
  </section>;
}
