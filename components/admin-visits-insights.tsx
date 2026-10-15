"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { InsightRange, InsightsReport, SearchPage } from "@/lib/admin-visits-insights";
import { metricDelta, type TrafficDay } from "@/lib/analytics-period-rollups";

const mobileLabels: Record<InsightRange, string> = { "1d": "1D", "7d": "7D", "30d": "30D", "90d": "90D", all: "All" };
const ranges: InsightRange[] = ["1d", "7d", "30d", "90d", "all"];
const labels: Record<InsightRange, string> = {
  "1d": "1 day", "7d": "7 days", "30d": "30 days", "90d": "90 days", all: "All available",
};
const count = (n: number | null | undefined) => n == null ? "—" : new Intl.NumberFormat("en-NG").format(n);
const percent = (n: number | null) => n == null ? "—" : (n * 100).toFixed(2) + "%";
const reportedHour = (value: string | null) => {
  if (!value) return "Not yet reported";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleString("en-NG", {
    timeZone: "Africa/Lagos", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  }) + " WAT";
};

function Delta({ current, previous }: { current: number | null; previous: number | null }) {
  const delta = metricDelta(current, previous);
  if (delta == null) return null;
  return <small className={"visits-delta " + (delta > 0 ? "positive" : delta < 0 ? "negative" : "")}>
    {delta > 0 ? "+" : ""}{delta.toFixed(1)}% vs prior period
  </small>;
}

type Granularity = "day" | "week" | "month";
function groupDays(rows: TrafficDay[], granularity: Granularity) {
  const groups = new Map<string, { label: string; views: number | null; impressions: number | null; clicks: number | null }>();
  for (const row of rows) {
    let key = row.date;
    if (granularity === "month") key = row.date.slice(0, 7);
    if (granularity === "week") {
      const date = new Date(row.date + "T12:00:00Z");
      date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
      key = date.toISOString().slice(0, 10);
    }
    const existing = groups.get(key) ?? { label: key, views: null, impressions: null, clicks: null };
    for (const [source, target] of [
      ["pageViews", "views"], ["impressions", "impressions"], ["clicks", "clicks"],
    ] as const) {
      if (row[source] != null) existing[target] = (existing[target] ?? 0) + row[source];
    }
    groups.set(key, existing);
  }
  return [...groups.values()].sort((a, b) => b.label.localeCompare(a.label));
}

function pageLink(page: string) {
  try {
    const url = new URL(page);
    return (url.protocol === "https:" && (url.hostname === "mynigeriaguide.com" || url.hostname.endsWith(".mynigeriaguide.com")))
      ? url.href : null;
  } catch { return null; }
}
function shortPage(page: string) {
  try { const url = new URL(page); return url.pathname + url.search; } catch { return page; }
}
function download(filename: string, text: string, mime = "application/json") {
  const url = URL.createObjectURL(new Blob([text], { type: mime + ";charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
function csvCell(value: string | number) {
  const text = String(value);
  return '"' + text.replace(/"/g, '""') + '"';
}

export function AdminVisitsInsights() {
  const [range, setRange] = useState<InsightRange>("30d");
  const [report, setReport] = useState<InsightsReport | null>(null);
  const [state, setState] = useState<"loading" | "locked" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [granularity, setGranularity] = useState<Granularity>("day");
  const [sort, setSort] = useState<"impressions" | "clicks" | "opportunity" | "unclicked">("impressions");
  const [filter, setFilter] = useState("");
  const [showSearch, setShowSearch] = useState(20);
  const [showVisited, setShowVisited] = useState(15);
  const [showTrend, setShowTrend] = useState(14);
  const [mobileShowSearch, setMobileShowSearch] = useState(6);
  const [mobileShowVisited, setMobileShowVisited] = useState(6);
  const [mobileShowTrend, setMobileShowTrend] = useState(7);
  const [copied, setCopied] = useState(false);
  const active = useRef<AbortController | null>(null);

  function changeRange(nextRange: InsightRange) {
    if (nextRange === range) return;
    setRange(nextRange);
    setShowSearch(20);
    setShowVisited(15);
    setShowTrend(14);
    setMobileShowSearch(6);
    setMobileShowVisited(6);
    setMobileShowTrend(7);
  }

  async function fetchReport(selected: InsightRange, force = false) {
    active.current?.abort();
    const controller = new AbortController();
    active.current = controller;
    setRefreshing(true);
    setError("");
    try {
      const response = await fetch("/admin/api/visits-insights?range=" + selected + (force ? "&fresh=1" : ""), {
        cache: "no-store", signal: controller.signal,
      });
      const body = await response.json() as { data?: InsightsReport; error?: string };
      if (controller.signal.aborted) return;
      if (response.status === 401) { setState("locked"); setReport(null); return; }
      if (!response.ok || !body.data) {
        setError(body.error ?? "Insights are temporarily unavailable.");
        if (!report) setState("error");
        return;
      }
      setReport(body.data);
      setState("ready");
    } catch (cause) {
      if (controller.signal.aborted) return;
      setError(cause instanceof Error ? cause.message : "Unable to connect to analytics.");
      if (!report) setState("error");
    } finally {
      if (active.current === controller) { active.current = null; setRefreshing(false); }
    }
  }

  useEffect(() => {
    void fetchReport(range);
    return () => active.current?.abort();
    // Always cancel stale requests when changing ranges.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const password = new FormData(form).get("password");
    try {
      const response = await fetch("/admin/api/analytics-access", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({ error: "Incorrect passphrase." })) as { error?: string };
        setError(body.error ?? "Analytics access denied.");
        return;
      }
      form.reset(); setState("loading"); await fetchReport(range, true);
    } catch { setError("Unable to unlock analytics at the moment."); }
  }

  async function lock() {
    active.current?.abort();
    await fetch("/admin/api/analytics-access", { method: "DELETE" });
    setReport(null); setState("locked");
  }

  const current = report?.periods.find((row) => row.key === range);
  // GA4 days use Lagos time; GSC days use Pacific time. Do not lose
  // today's available Google reporting hour/day at the WAT midnight boundary.
  const selectedDays: TrafficDay[] = report?.daily.flatMap((row) => {
    if (range === "all") return [row];
    if (!current) return [];
    const ga4Included = row.date >= current.startDate && row.date <= current.endDate;
    const gscIncluded = row.date >= current.gscStartDate && row.date <= current.gscEndDate;
    if (!ga4Included && !gscIncluded) return [];
    return [{
      date: row.date,
      pageViews: ga4Included ? row.pageViews : undefined,
      sessions: ga4Included ? row.sessions : undefined,
      impressions: gscIncluded ? row.impressions : undefined,
      clicks: gscIncluded ? row.clicks : undefined,
    }];
  }) ?? [];
  const trends = useMemo(() => groupDays(selectedDays, granularity), [selectedDays, granularity]);
  const searchRows = useMemo(() => {
    let rows = report?.searchPages ?? [];
    const query = filter.trim().toLowerCase();
    if (query) rows = rows.filter((row) => row.page.toLowerCase().includes(query));
    if (sort === "unclicked") rows = rows.filter((row) => row.clicks === 0 && row.impressions > 0);
    return [...rows].sort((a, b) => sort === "clicks" ? b.clicks - a.clicks
      : sort === "opportunity" ? (b.impressions * (1 - b.ctr)) - (a.impressions * (1 - a.ctr))
      : b.impressions - a.impressions);
  }, [report, sort, filter]);

  function sharePayload() {
    if (!report) return null;
    return {
      website: "mynigeriaguide.com", reportingPeriod: labels[range],
      generatedAt: report.generatedAt, summaryByPeriod: report.periods,
      sourceCoverage: {
        ga4Start: report.ga4StartDate, gscStart: report.gscStartDate,
        latestGA4Day: report.latestGA4Date, latestGSCDay: report.latestGSCDate,
        errors: report.errors,
      },
      realtimeGA4Last30Min: report.realtime,
      gscLatestHour: report.hourly.latestHour,
      gscHourlyLagHours: report.hourly.lagHours,
      gscLast24HoursPartial: {
        impressions: report.hourly.impressions24h, clicks: report.hourly.clicks24h,
        hoursReported: report.hourly.hoursReported24h,
      },
      posthogFastTraffic: report.posthog,
      dailyTrend: selectedDays,
      topSearchPagesByImpressions: [...report.searchPages].sort((a, b) => b.impressions - a.impressions).slice(0, 100),
      topSearchPagesByClicks: [...report.searchPages].sort((a, b) => b.clicks - a.clicks).slice(0, 50),
      topViewedPages: report.pageViewsByPage.slice(0, 100),
      caveats: "GA4 page views, Search Console impressions/clicks, and PostHog traffic measure different events. Do not add their totals. GSC reports in Pacific date/time, GA4 in the website reporting timezone. Recent data can be incomplete. GSC all-time is limited to its rolling 16-month retention; GA4 is filtered to clean production visits from the supplied start date.",
    };
  }

  async function copyForAI() {
    const payload = sharePayload();
    if (!payload) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch { setError("Clipboard unavailable. Use Export JSON instead."); }
  }

  if (state === "loading" && !report) return <section className="admin-panel visits-insights"><h2>Loading traffic insights…</h2><p>Comparing Google search and website visits across five periods.</p></section>;
  if (state === "locked") return <section className="admin-panel visits-insights">
    <h2>Unlock private traffic analytics</h2>
    <p>Use your existing admin analytics passphrase. Your statistics remain behind the same protected session.</p>
    <form className="analytics-login-form" onSubmit={unlock}>
      <label><span>Analytics passphrase</span><input type="password" name="password" autoComplete="current-password" required /></label>
      <button type="submit">Unlock insights</button>
    </form>
    {error ? <p role="alert" className="form-message error">{error}</p> : null}
  </section>;
  if (!report || !current) return <section className="admin-panel visits-insights">
    <h2>Analytics could not be loaded</h2><p role="alert">{error || "No report returned."}</p>
    <button type="button" onClick={() => void fetchReport(range, true)}>Retry</button>
  </section>;

  const lifetime = report.periods.find((row) => row.key === "all")!;
  const sampledViews = report.pageViewsByPage;
  return <div className="visits-insights">
    <section className="admin-panel visits-hero">
      <div className="section-heading">
        <div><span className="eyebrow">Private reporting · Africa/Lagos</span><h2>Traffic intelligence</h2></div>
        <span className="visits-freshness">Report fetched {new Date(report.generatedAt).toLocaleString("en-NG", { timeZone: "Africa/Lagos" })} WAT</span>
      </div>
      <p className="visits-hero-intro">Search visibility and website traffic, organized to reveal what is growing and what needs attention.</p>
      <div className="visits-period-picker" role="group" aria-label="Analytics reporting period">
        {ranges.map((option) => <button key={option} type="button" className={option === range ? "active" : ""}
          aria-pressed={option === range} onClick={() => changeRange(option)}>
          <span className="visits-period-short">{mobileLabels[option]}</span>
          <span className="visits-period-full">{labels[option]}</span>
        </button>)}
      </div>
      <div className="visits-current-period-head">
        <strong>{labels[range]} performance</strong>
        <small>{range === "all" ? "All available reporting history" : "Compared with the preceding equal-length period"}</small>
      </div>
      <div className="visits-current-kpis" aria-label="Selected period key statistics">
        <div><span>Google impressions</span><strong>{count(current.impressions)}</strong><Delta current={current.impressions} previous={current.previousImpressions} /></div>
        <div><span>Google clicks</span><strong>{count(current.clicks)}</strong><Delta current={current.clicks} previous={current.previousClicks} /></div>
        <div><span>Website page views</span><strong>{count(current.pageViews)}</strong><Delta current={current.pageViews} previous={current.previousPageViews} /></div>
        <div><span>Website visits</span><strong>{count(current.sessions)}</strong><Delta current={current.sessions} previous={current.previousSessions} /></div>
      </div>
      <div className="visits-current-secondary">
        <span>CTR <strong>{current.impressions && current.clicks != null ? percent(current.clicks / current.impressions) : "—"}</strong></span>
        <span>Avg. position <strong>{current.position == null ? "—" : current.position.toFixed(1)}</strong></span>
        <span>GA4 last day <strong>{report.latestGA4Date ?? "—"}</strong></span>
      </div>
      <div className="visits-actions visits-primary-actions">
        <button type="button" disabled={refreshing} onClick={() => void fetchReport(range, true)}>{refreshing ? "Refreshing…" : "↻ Refresh"}</button>
        <button type="button" onClick={() => void copyForAI()}>{copied ? "✓ Copied" : "Copy for AI"}</button>
      </div>
      <details className="visits-export-tools">
        <summary>Exports & privacy</summary>
        <div className="visits-actions">
          <button type="button" onClick={() => download("nigeria-guide-analytics-" + range + ".json", JSON.stringify(sharePayload(), null, 2))}>Export JSON</button>
          <button type="button" onClick={() => {
            const rows = [["page","impressions","google_clicks","search_ctr","avg_position"],
              ...report.searchPages.map((p) => [p.page, p.impressions, p.clicks, p.ctr, p.position])];
            download("nigeria-guide-search-pages-" + range + ".csv", rows.map((row) => row.map(csvCell).join(",")).join("\r\n"), "text/csv");
          }}>Export search CSV</button>
          <button type="button" onClick={() => void lock()}>Lock insights</button>
        </div>
      </details>
      {error ? <p role="alert" className="form-message error">{error}</p> : null}
      {report.selectedRange !== range ? <p role="status">Loading {labels[range]} — figures below are from the previous selection.</p> : null}
    </section>

    <section className="admin-panel visits-lifetime-panel">
      <div className="section-heading"><div><span className="eyebrow">Cumulative · available history</span><h2>Website totals so far</h2></div></div>
      <div className="visits-total-grid">
        <div><span>Google impressions</span><strong>{count(lifetime.impressions)}</strong><small>Search Console · since {report.gscStartDate} (max. 16 months)</small></div>
        <div><span>Google search clicks</span><strong>{count(lifetime.clicks)}</strong><small>Search Console · same available history</small></div>
        <div><span>Website page views</span><strong>{count(lifetime.pageViews)}</strong><small>GA4 clean production traffic · since {report.ga4StartDate}</small></div>
        <div><span>Website visits</span><strong>{count(lifetime.sessions)}</strong><small>GA4 sessions · since {report.ga4StartDate}</small></div>
      </div>
      <p className="visits-footnote">These are separately sourced measurements, not additive totals. “All available” is limited by API retention and the clean-tracking start; it is not a claim of unlimited historical coverage.</p>
    </section>

    <section className="admin-panel visits-period-panel">
      <div className="section-heading"><div><span className="eyebrow">1 day · 1 week · 1 month · 90 days · history</span><h2>Performance by period</h2></div></div>
      <div className="visits-table-scroll"><table className="visits-data-table">
        <thead><tr><th scope="col">Period</th><th scope="col">Impressions (GSC)</th><th scope="col">Clicks (GSC)</th><th scope="col">CTR (GSC)</th><th scope="col">Avg. Google position</th><th scope="col">Page views (GA4)</th><th scope="col">Visits (GA4)</th></tr></thead>
        <tbody>{report.periods.map((row) => <tr key={row.key} className={row.key === range ? "selected" : ""}>
          <th scope="row"><button className="visits-range-link" type="button" onClick={() => { setRange(row.key); setShowSearch(20); setShowTrend(14); }}>{labels[row.key]}</button><small>{row.key === "all" ? "Available history" : "GA4: " + row.startDate + " – " + row.endDate}</small><small>{"GSC: " + row.gscStartDate + " – " + row.gscEndDate}</small></th>
          <td><strong>{count(row.impressions)}</strong><Delta current={row.impressions} previous={row.previousImpressions} /></td>
          <td><strong>{count(row.clicks)}</strong><Delta current={row.clicks} previous={row.previousClicks} /></td>
          <td>{row.impressions == null || row.clicks == null || row.impressions === 0 ? "—" : percent(row.clicks / row.impressions)}</td>
          <td><strong>{row.position == null ? "—" : row.position.toFixed(1)}</strong></td>
          <td><strong>{count(row.pageViews)}</strong><Delta current={row.pageViews} previous={row.previousPageViews} /></td>
          <td><strong>{count(row.sessions)}</strong><Delta current={row.sessions} previous={row.previousSessions} /></td>
        </tr>)}</tbody>
      </table></div>
      <p className="visits-footnote">Percentage changes compare each window with the immediately preceding window of equal length. Today may be incomplete; “—” means unavailable, not zero. The source-specific date ranges are listed in each row because GA4 uses Lagos dates while Google Search Console uses Pacific dates.</p>
      <p className="visits-footnote">Latest reported days: GA4 <strong>{report.latestGA4Date ?? "unavailable"}</strong>; Google Search Console <strong>{report.latestGSCDate ?? "unavailable"}</strong>.</p>
      {report.errors.ga4 || report.errors.gsc ? <p className="visits-source-warning">{report.errors.ga4 ? "GA4: " + report.errors.ga4 + ". " : ""}{report.errors.gsc ? "GSC: " + report.errors.gsc : ""}</p> : null}
    </section>

    <section className="admin-panel visits-live-panel">
      <div className="section-heading"><div><span className="eyebrow">Near realtime signals</span><h2>Latest available activity</h2></div></div>
      <div className="visits-live-grid">
        <div><span>GA4 active visitors · last 30 minutes</span><strong>{count(report.realtime?.activeUsers)}</strong></div>
        <div><span>GA4 page views · last 30 minutes</span><strong>{count(report.realtime?.pageViews)}</strong></div>
        <div><span>Google clicks · reported last 24h</span><strong>{count(report.hourly.clicks24h)}</strong></div>
        <div><span>Google impressions · reported last 24h</span><strong>{count(report.hourly.impressions24h)}</strong></div>
        <div><span>PostHog page views · {labels[range]}</span><strong>{report.posthog.available ? count(report.posthog.views) : "—"}</strong></div>
        <div><span>PostHog visitors · {labels[range]}</span><strong>{report.posthog.available ? count(report.posthog.visitors) : "—"}</strong></div>
      </div>
      <p className="visits-footnote">Latest Search Console hour: <strong>{reportedHour(report.hourly.latestHour)}</strong>{report.hourly.lagHours != null ? " · " + report.hourly.lagHours + "h behind" : ""}. {report.hourly.hoursReported24h}/24 hours returned; hourly counts are preliminary and partial. GA4 realtime covers the previous 30 minutes, not the complete day.</p>
      {!report.hourly.available || !report.posthog.available ? <p className="visits-source-warning">
        {!report.hourly.available ? "Google hourly API: " + (report.hourly.error ?? "unavailable") + ". " : ""}
        {!report.posthog.available ? "PostHog: " + (report.posthog.error ?? "unavailable") : ""}
      </p> : null}
    </section>

    <section className="admin-panel visits-trend-panel">
      <div className="section-heading"><div><span className="eyebrow">Detailed trend · {labels[range]}</span><h2>Daily, weekly and monthly progress</h2></div></div>
      <div className="visits-actions">{(["day", "week", "month"] as const).map((option) =>
        <button type="button" key={option} aria-pressed={granularity === option} className={granularity === option ? "active" : ""} onClick={() => { setGranularity(option); setShowTrend(14); }}>
          By {option}
        </button>)}</div>
      <div className="visits-table-scroll"><table className="visits-data-table">
        <thead><tr><th>Reporting {granularity}</th><th>Google impressions</th><th>Google clicks</th><th>Search CTR</th><th>Website page views</th></tr></thead>
        <tbody>{trends.slice(0, showTrend).map((row) => <tr key={row.label}><th>{row.label}</th><td>{count(row.impressions)}</td><td>{count(row.clicks)}</td><td>{row.impressions && row.clicks != null ? percent(row.clicks / row.impressions) : "—"}</td><td>{count(row.views)}</td></tr>)}</tbody>
      </table></div>
      {!trends.length ? <p>No processed trend dates are available in this period.</p> : null}
      {showTrend < trends.length ? <button type="button" className="visits-show-more" onClick={() => setShowTrend((v) => v + 28)}>Show more reporting periods ({trends.length - showTrend} remaining)</button> : null}
      {range === "all" ? <p className="visits-footnote">The trend lists the latest 90 reported days; cumulative totals above use the entire available history.</p> : null}
    </section>

    <section className="admin-panel visits-search-panel">
      <div className="section-heading"><div><span className="eyebrow">Search Console · {labels[range]}</span><h2>Pages shown in Google and pages clicked</h2></div></div>
      <div className="visits-search-tools">
        <label>Find a page<input type="search" value={filter} placeholder="Filter page URL or topic…" onChange={(event) => { setFilter(event.target.value); setShowSearch(20); }} /></label>
        <label>Analyze by<select value={sort} onChange={(event) => { setSort(event.target.value as typeof sort); setShowSearch(20); }}>
          <option value="impressions">Most impressions</option>
          <option value="clicks">Most clicks</option>
          <option value="opportunity">Potential missed clicks</option>
          <option value="unclicked">Impressions but zero clicks</option>
        </select></label>
      </div>
      {report.errors.gscPages ? <p className="visits-source-warning">{report.errors.gscPages}</p> : null}
      <div className="visits-table-scroll"><table className="visits-data-table">
        <thead><tr><th>Page</th><th>Impressions</th><th>Clicks</th><th>CTR</th><th>Avg. position</th></tr></thead>
        <tbody>{searchRows.slice(0, showSearch).map((row: SearchPage) => <tr key={row.page}>
          <th className="visits-page-title">{pageLink(row.page) ? <a href={pageLink(row.page)!} target="_blank" rel="noopener noreferrer">{shortPage(row.page)}</a> : shortPage(row.page)}<small>{row.page}</small></th>
          <td>{count(row.impressions)}</td><td>{count(row.clicks)}</td><td>{percent(row.ctr)}</td><td>{row.position.toFixed(1)}</td>
        </tr>)}</tbody>
      </table></div>
      {!searchRows.length ? <p>{report.errors.gscPages ? "Search page details are unavailable." : "No matching search pages in this period."}</p> : null}
      {showSearch < searchRows.length ? <button type="button" className="visits-show-more" onClick={() => setShowSearch((v) => v + 30)}>Show more search pages ({searchRows.length - showSearch} remaining)</button> : null}
      <p className="visits-footnote">{count(report.searchPages.length)} search pages returned. {report.pageListsTruncated.gsc ? "Google returned the 25,000-row limit: this list may be incomplete. " : ""}Page-specific Google impressions are not necessarily additive to property-wide totals. The missed-click ranking is an opportunity heuristic, not a prediction.</p>
    </section>

    <section className="admin-panel visits-viewed-panel">
      <div className="section-heading"><div><span className="eyebrow">GA4 · {labels[range]}</span><h2>Pages actually viewed on the website</h2></div></div>
      {report.errors.ga4Pages ? <p className="visits-source-warning">{report.errors.ga4Pages}</p> : null}
      <div className="visits-table-scroll"><table className="visits-data-table">
        <thead><tr><th>Visited page</th><th>Page views</th><th>Active users</th></tr></thead>
        <tbody>{sampledViews.slice(0, showVisited).map((row, index) => <tr key={row.path + index}>
          <th className="visits-page-title"><a href={row.path.startsWith("/") && !row.path.startsWith("//") ? row.path : "/"} target="_blank" rel="noopener noreferrer">{row.title}</a><small>{row.path}</small></th>
          <td>{count(row.views)}</td><td>{count(row.users)}</td>
        </tr>)}</tbody>
      </table></div>
      {showVisited < sampledViews.length ? <button type="button" className="visits-show-more" onClick={() => setShowVisited((v) => v + 30)}>Show more viewed pages ({sampledViews.length - showVisited} remaining)</button> : null}
      <p className="visits-footnote">{count(sampledViews.length)} GA4 page-title/path rows returned. {report.pageListsTruncated.ga4 ? "Reporting is limited to the top 2,500 rows. " : ""}Views count repeat visits; active users are not additive across different pages.</p>
    </section>

    <section className="admin-panel visits-share-panel">
      <div className="section-heading"><div><span className="eyebrow">Use these data for SEO improvements</span><h2>Share an evidence-based report</h2></div></div>
      <p><strong>Copy report for AI</strong> creates a structured JSON snapshot with all five reporting periods, prior-period changes, 90-day daily trends, source freshness, top pages, low-CTR opportunities, GA4 views and live signals. Paste it into ChatGPT or another analysis tool to identify and prioritize improvements.</p>
      <p className="visits-footnote">No API keys or admin passwords are included. The information covers only what the connected providers returned when refreshed; Google can revise recent data.</p>
    </section>
  </div>;
}
