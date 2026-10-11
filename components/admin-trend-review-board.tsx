"use client";

import { useEffect, useMemo, useState } from "react";
import type { TrendLead, TrendPillar, TrendSourceState } from "@/lib/editorial-trend-reader";
import styles from "./admin-trend-review-board.module.css";

type ReviewStatus = "new" | "shortlisted" | "dismissed";
type ReviewMap = Record<string, ReviewStatus>;
type Props = {
  snapshot: { checkedAt: string; leads: TrendLead[]; reports: TrendSourceState[] };
};
const STORAGE_KEY = "mynigeriaguide:editorial-rss-triage:v1";
const pillars: Array<TrendPillar | "All"> = ["All", "Movies & Entertainment", "Services", "Tour Nigeria", "Jobs & Careers"];

function displayDate(value: string) {
  return new Date(value).toLocaleString("en-NG", {
    timeZone: "Africa/Lagos",
    day: "numeric", month: "short", hour: "numeric", minute: "2-digit",
  }) + " WAT";
}

export function AdminTrendReviewBoard({ snapshot }: Props) {
  const [filterPillar, setFilterPillar] = useState<(typeof pillars)[number]>("All");
  const [filterStatus, setFilterStatus] = useState<ReviewStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [marks, setMarks] = useState<ReviewMap>({});
  const [loaded, setLoaded] = useState(false);
  const [exportMessage, setExportMessage] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : {};
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const clean = Object.fromEntries(
          Object.entries(parsed).filter(([k, v]) => k.length < 550 && (v === "shortlisted" || v === "dismissed")),
        );
        setMarks(clean);
      }
    } catch {
      // Incognito/storage-disabled browsing still has a working read-only board.
    }
    setLoaded(true);
  }, []);

  function updateMark(id: string, value: ReviewStatus) {
    const next = { ...marks };
    if (value === "new") delete next[id];
    else next[id] = value;
    setMarks(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setExportMessage("Storage unavailable in this browser. Export your shortlist before leaving.");
    }
  }

  const visible = useMemo(() => {
    const needle = query.toLocaleLowerCase().trim();
    return snapshot.leads.filter((item) => {
      const status = marks[item.id] ?? "new";
      return (filterPillar === "All" || item.pillar === filterPillar) &&
        (filterStatus === "all" || status === filterStatus) &&
        (!needle || (item.title + " " + item.source + " " + item.pillar).toLocaleLowerCase().includes(needle));
    });
  }, [snapshot.leads, marks, filterPillar, filterStatus, query]);

  const shortlisted = snapshot.leads.filter((lead) => marks[lead.id] === "shortlisted");
  const dismissed = snapshot.leads.filter((lead) => marks[lead.id] === "dismissed");
  const healthy = snapshot.reports.filter((source) => source.state === "ok").length;

  function exportResearch() {
    const payload = {
      exportedAt: new Date().toISOString(),
      kind: "EDITORIAL_SHORTLIST_NOT_APPROVAL",
      notice: "Items have not been independently verified, approved or published. Follow first-party sources and check duplicate canonical records.",
      sampledAt: snapshot.checkedAt,
      items: shortlisted,
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2) + "\n"], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "mynigeriaguide-editorial-shortlist.json";
    link.click();
    URL.revokeObjectURL(url);
    setExportMessage("Shortlist exported locally. No content was published.");
  }

  return (
    <div className={styles.board}>
      <div className={styles.banner} role="note">
        <strong>Research, not a live social listening API.</strong>
        <span>These leads are sampled on this admin page from free Nigeria-focused Google Trends and Google News RSS.
          Scheduled GitHub Actions reports are stored separately as downloadable workflow artifacts.
          No Twitter impressions, invented search volumes or unverified publication.</span>
      </div>

      <div className="metric-grid">
        <div><strong>{snapshot.leads.length}</strong><span>Recent candidate leads</span></div>
        <div><strong>{healthy}/{snapshot.reports.length}</strong><span>Sources responding</span></div>
        <div><strong>{loaded ? shortlisted.length : "—"}</strong><span>Shortlisted in this browser</span></div>
        <div><strong>{loaded ? dismissed.length : "—"}</strong><span>Dismissed in this browser</span></div>
      </div>

      <section className="admin-panel" aria-labelledby="trend-source-health">
        <div className="section-heading"><div><span className="eyebrow">Source status</span><h2 id="trend-source-health">Checked {displayDate(snapshot.checkedAt)}</h2></div></div>
        <div className={styles.sourceGrid}>
          {snapshot.reports.map((source) => (
            <div className={styles.source} key={source.id}>
              <span className={source.state === "ok" ? styles.ok : styles.down}>{source.state === "ok" ? "Available" : "Unavailable"}</span>
              <strong>{source.name}</strong>
              <small>{source.state === "ok" ? source.received + " records received before date filters" : source.issue || "Fetch failed"}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-panel top-gap" aria-labelledby="trend-queue-title">
        <div className="section-heading">
          <div><span className="eyebrow">Editorial triage</span><h2 id="trend-queue-title">Review candidate stories</h2></div>
        </div>
        <p className={styles.subtext}>Review source links before any website edit. Shortlist and dismiss marks are <strong>private to this browser</strong>, not synchronized between devices or saved to the site database.</p>

        <div className={styles.filters}>
          <label className={styles.search}>
            <span>Search the research queue</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Headline, publisher or keyword" />
          </label>
          <label>
            <span>Pillar</span>
            <select value={filterPillar} onChange={(event) => setFilterPillar(event.target.value as (typeof pillars)[number])}>
              {pillars.map((pillar) => <option key={pillar} value={pillar}>{pillar === "All" ? "All four pillars" : pillar}</option>)}
            </select>
          </label>
          <label>
            <span>Review status</span>
            <select value={filterStatus} onChange={(event) => setFilterStatus(event.target.value as ReviewStatus | "all")}>
              <option value="all">All statuses</option>
              <option value="new">Unreviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </label>
        </div>

        <div className={styles.actions}>
          <span aria-live="polite">{visible.length} matching lead{visible.length === 1 ? "" : "s"}</span>
          <button className="button inline-button" onClick={exportResearch} type="button" disabled={!loaded || !shortlisted.length}>
            Export shortlist JSON
          </button>
        </div>
        {exportMessage ? <p role="status" className={styles.note}>{exportMessage}</p> : null}

        {visible.length ? (
          <div className={styles.leads}>
            {visible.map((item) => {
              const status = marks[item.id] ?? "new";
              return (
                <article key={item.id} className={styles.lead}>
                  <div className={styles.row}>
                    <span className={styles.pillar}>{item.pillar}</span>
                    <span className={status === "shortlisted" ? styles.ok : status === "dismissed" ? styles.down : styles.pending}>
                      {loaded ? status : "unreviewed"}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.sourceType} · {item.source} · {displayDate(item.publishedAt)}</p>
                  {item.approximateSearchTraffic ? <p className={styles.note}>Google Trends approximate search traffic: {item.approximateSearchTraffic}. Not X post reach or a Google Ads keyword volume.</p> : null}
                  <div className={styles.row}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">Inspect original source ↗</a>
                    <div className={styles.controls}>
                      <button type="button" onClick={() => updateMark(item.id, status === "shortlisted" ? "new" : "shortlisted")} disabled={!loaded}>
                        {status === "shortlisted" ? "Undo shortlist" : "Shortlist"}
                      </button>
                      <button type="button" onClick={() => updateMark(item.id, status === "dismissed" ? "new" : "dismissed")} disabled={!loaded}>
                        {status === "dismissed" ? "Undo dismiss" : "Dismiss"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="admin-empty"><strong>No matching research leads.</strong><p>Try a different filter. If the sources are unavailable, use the archived scheduled report or check again later.</p></div>
        )}
      </section>
    </div>
  );
}
