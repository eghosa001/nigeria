"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { AnalyticsDashboardData, AnalyticsRange } from "@/lib/analytics-data";
import { SearchConsoleConnectionHelp } from "@/components/search-console-connection-help";

type ApiResponse = {
  configured?: boolean;
  authenticated?: boolean;
  accessConfigured?: boolean;
  readConfigured?: boolean;
  trackingConfigured?: boolean;
  data?: AnalyticsDashboardData;
  error?: string;
};

function number(value: number) {
  return new Intl.NumberFormat("en-NG").format(value);
}

function duration(value: number | null) {
  if (value == null || !Number.isFinite(value)) return "—";
  if (value < 60) return Math.round(value) + "s";
  const minutes = Math.floor(value / 60);
  const seconds = Math.round(value % 60);
  return minutes + "m " + seconds + "s";
}

function readableDate(value: string) {
  if (!/^\d{8}$/.test(value)) return value;
  const date = new Date(Number(value.slice(0, 4)), Number(value.slice(4, 6)) - 1, Number(value.slice(6, 8)));
  return date.toLocaleDateString("en-NG", { month: "short", day: "numeric" });
}

function readableSearchHour(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString("en-NG", {
    timeZone: "Africa/Lagos", day: "numeric", month: "short",
    hour: "2-digit", minute: "2-digit", hour12: true,
  }) + " WAT";
}

function interactionLabel(event: string) {
  const labels: Record<string, string> = {
    job_apply_click: "Official job application clicked",
    related_content_click: "Related guide opened",
    saved_page_add: "Page saved",
    saved_page_remove: "Page unsaved",
    service_search_click: "Search result opened",
    official_link_click: "Official service link opened",
    official_source_click: "Official source opened",
    guide_share: "Guide shared",
    guide_watch_add: "Guide saved",
    guide_watch_remove: "Guide removed from saved",
    process_start: "Process checklist started",
    process_complete: "Process checklist completed",
  };
  return labels[event] ?? event;
}

export function AdminAnalyticsDashboard() {
  const [range, setRange] = useState<AnalyticsRange>("30d");
  const [state, setState] = useState<"loading" | "setup" | "locked" | "ready" | "error">("loading");
  const [data, setData] = useState<AnalyticsDashboardData | null>(null);
  const [setup, setSetup] = useState<ApiResponse>({});
  const [message, setMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const activeRequest = useRef<AbortController | null>(null);

  async function load(nextRange = range, forceFresh = false) {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    if (!data) setState("loading");
    setRefreshing(true);
    setMessage("");
    try {
      const response = await fetch(
        "/admin/api/analytics?range=" + nextRange + "&mode=clean" + (forceFresh ? "&fresh=1" : ""),
        { cache: "no-store", signal: controller.signal },
      );
      const body = await response.json().catch(() => ({ error: "Analytics server returned an invalid response." })) as ApiResponse;
      if (controller.signal.aborted) return;
      if (response.status === 503 && body.configured === false) {
        setSetup(body);
        setData(null);
        setState("setup");
      } else if (response.status === 401) {
        setData(null);
        setState("locked");
      } else if (!response.ok || !body.data) {
        setMessage(body.error ?? "Unable to load visit analytics.");
        if (!data) setState("error");
      } else {
        setData(body.data);
        setState("ready");
      }
    } catch (error) {
      if (controller.signal.aborted) return;
      setMessage(error instanceof Error ? error.message : "Unable to reach the analytics server.");
      if (!data) setState("error");
    } finally {
      if (activeRequest.current === controller) {
        activeRequest.current = null;
        setRefreshing(false);
      }
    }
  }

  useEffect(() => {
    void load(range);
    return () => activeRequest.current?.abort();
    // Data updates only when the requested range changes. The latest request
    // wins; Strict Mode navigation and fast range toggles cancel old requests.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setMessage("");
    const form = new FormData(formElement);
    const response = await fetch("/admin/api/analytics-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: form.get("password") }),
    });
    const body = await response.json() as { error?: string };
    if (!response.ok) {
      setMessage(body.error ?? "Access denied.");
      return;
    }
    formElement.reset();
    await load(range, true);
  }

  async function logout() {
    activeRequest.current?.abort();
    await fetch("/admin/api/analytics-access", { method: "DELETE" });
    setData(null);
    setState("locked");
  }

  const maxDailyViews = useMemo(() => Math.max(1, ...(data?.daily.map((row) => row.pageViews) ?? [1])), [data]);
  // GA4 standard reports omit dates with no processed traffic. This is the
  // last day with *recorded activity*, not Google's ingestion/completeness time.
  const lastReportedActivity = data?.daily.filter((row) => row.sessions > 0 || row.pageViews > 0).at(-1)?.date ?? null;

  if (state === "loading") {
    return <div className="admin-analytics-state"><strong>Loading visit analytics…</strong><p>Reading PostHog, GA4 and Search Console sources.</p></div>;
  }

  if (state === "setup") {
    return (
      <div className="admin-analytics-state setup">
        <strong>Visits dashboard needs one-time server configuration</strong>
        <p>The public tracker and the private reporting connection are separate. Add the missing environment values in the Cloudflare Worker before live data can appear here.</p>
        <div className="analytics-setup-grid">
          <div className={setup.trackingConfigured ? "ok" : "missing"}><strong>GA4 tracking</strong><span>{setup.trackingConfigured ? "Configured" : "NEXT_PUBLIC_GA_MEASUREMENT_ID missing"}</span></div>
          <div className={setup.readConfigured ? "ok" : "missing"}><strong>GA4 Data API</strong><span>{setup.readConfigured ? "Configured" : "Property/service account credentials missing"}</span></div>
          <div className={setup.accessConfigured ? "ok" : "missing"}><strong>Admin protection</strong><span>{setup.accessConfigured ? "Configured" : "Admin analytics passphrase missing"}</span></div>
        </div>
        <details>
          <summary>Environment variables required</summary>
          <code>NEXT_PUBLIC_GA_MEASUREMENT_ID</code>
          <code>GA4_PROPERTY_ID</code>
          <code>GA4_SERVICE_ACCOUNT_EMAIL</code>
          <code>GA4_SERVICE_ACCOUNT_PRIVATE_KEY</code>
          <code>MYNIGERIAGUIDE_ADMIN_ANALYTICS_KEY</code>
        </details>
      </div>
    );
  }

  if (state === "locked") {
    return (
      <div className="admin-analytics-state locked">
        <strong>Visits data is protected</strong>
        <p>Enter the private analytics passphrase. The session is stored in an HttpOnly cookie and expires after 12 hours.</p>
        <form onSubmit={login} className="analytics-login-form">
          <label><span>Analytics passphrase</span><input name="password" type="password" autoComplete="current-password" required /></label>
          <button type="submit">Unlock visits</button>
        </form>
        {message ? <p className="form-message error">{message}</p> : null}
      </div>
    );
  }

  if (state === "error" || !data) {
    return (
      <div className="admin-analytics-state error">
        <strong>Analytics could not be loaded</strong>
        <p>{message || "The reporting API returned an error."}</p>
        <button type="button" onClick={() => void load(range, true)}>Retry</button>
      </div>
    );
  }

  const posthog = data.posthog.overview;
  const primary = data.ga4Available ? "GA4" : posthog.available ? "PostHog" : "No source";
  const visitors = data.ga4Available ? data.summary.totalUsers ?? data.summary.activeUsers : posthog.visitors;
  const sessions = data.ga4Available ? data.summary.sessions : posthog.sessions;
  const views = data.ga4Available ? data.summary.pageViews : posthog.views;

  return (
    <div className="admin-visits-compact">
      <div className="analytics-toolbar">
        <div aria-label="Reporting period">
          {(["7d", "30d", "90d"] as const).map((option) => (
            <button key={option} type="button" className={range === option ? "active" : undefined}
              aria-pressed={range === option} onClick={() => setRange(option)}>
              {option === "7d" ? "7 days" : option === "30d" ? "30 days" : "90 days"}
            </button>
          ))}
        </div>
        <div>
          <button type="button" disabled={refreshing} onClick={() => void load(range, true)}>{refreshing ? "Updating…" : "Refresh"}</button>
          <button type="button" onClick={logout}>Lock analytics</button>
        </div>
      </div>

      {refreshing ? <p role="status" className="analytics-clean-note">Updating the report. The previous figures remain visible.</p> : null}
      {message ? <p role="alert" className="form-message error">{message}</p> : null}
      {data.range !== range ? <p role="status" className="analytics-clean-note">Showing the previous period while {range === "7d" ? "7" : range === "30d" ? "30" : "90"}-day figures load.</p> : null}

      <section className="admin-panel" aria-labelledby="admin-traffic-overview">
        <div className="section-heading">
          <div><span className="eyebrow">Audience · {data.range}</span><h2 id="admin-traffic-overview">Traffic overview</h2></div>
          <small>Visitors, sessions and views: {primary} · Search: Google Search Console</small>
        </div>
        <div className="analytics-metric-grid">
          <div><span>Visitors</span><strong>{visitors == null ? "—" : number(visitors)}</strong><small>{primary} · unique visitors</small></div>
          <div><span>Sessions</span><strong>{sessions == null ? "—" : number(sessions)}</strong><small>{primary} · visits</small></div>
          <div><span>Page views</span><strong>{views == null ? "—" : number(views)}</strong><small>{primary} · includes repeated views</small></div>
          <div><span>Google clicks</span><strong>{data.searchPerformance?.available ? number(data.searchPerformance.clicks ?? 0) : "—"}</strong><small>Search results, not site sessions</small></div>
          <div><span>Google impressions</span><strong>{data.searchPerformance?.available ? number(data.searchPerformance.impressions ?? 0) : "—"}</strong><small>Search appearances</small></div>
        </div>
        {!data.ga4Available && data.ga4Error ? (
          <p className="analytics-clean-note" role="status">GA4 reports unavailable: {data.ga4Error} {posthog.available ? "Showing PostHog traffic instead." : "Visitor totals cannot be confirmed."}</p>
        ) : null}
        {data.connection?.status === "mismatch" ? (
          <p className="analytics-clean-note" role="alert">GA4 property and public measurement ID do not match. Check connection details before trusting GA4 totals.</p>
        ) : null}
        <p className="analytics-clean-note">Last report request: {new Date(data.generatedAt).toLocaleString("en-NG")}. Search Console may be delayed; a missing recent day is not zero traffic.</p>
      </section>

      {data.ga4Available && data.daily.length ? (
        <section className="admin-panel analytics-trend" aria-label="Daily page views">
          <div className="section-heading"><div><span className="eyebrow">GA4 trend</span><h2>Page views by day</h2></div></div>
          <div className="analytics-bars" aria-label="Daily page views">
            {data.daily.map((row) => (
              <div key={row.date} title={readableDate(row.date) + ": " + number(row.pageViews) + " page views"}>
                <span style={{ height: Math.max(3, (row.pageViews / maxDailyViews) * 100) + "%" }} />
                <small>{data.daily.length <= 14 ? readableDate(row.date) : ""}</small>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="admin-analytics-two-column">
        <section className="admin-panel">
          <div className="section-heading"><div><span className="eyebrow">Top content</span><h2>Pages people visit</h2></div></div>
          {data.pages.length ? (
            <div className="analytics-ranking">
              {data.pages.slice(0, 5).map((row) => (
                <div key={row.path}><strong>{row.title || row.path}</strong><small>{row.path}</small><b>{number(row.pageViews)} views</b></div>
              ))}
            </div>
          ) : <p className="analytics-clean-note">No processed page records in this period.</p>}
        </section>
        <section className="admin-panel">
          <div className="section-heading"><div><span className="eyebrow">Acquisition</span><h2>Traffic sources</h2></div></div>
          {data.referrers.length ? (
            <div className="analytics-ranking">
              {data.referrers.slice(0, 5).map((row) => (
                <div key={row.source + row.medium}><strong>{row.source}</strong><small>{row.medium}</small><b>{number(row.sessions)} sessions</b></div>
              ))}
            </div>
          ) : <p className="analytics-clean-note">No processed acquisition data in this period.</p>}
        </section>
      </div>

      <div className="admin-analytics-expand">
        <button type="button" className="admin-refresh-button" aria-expanded={showDiagnostics}
          aria-controls="admin-analytics-diagnostics" onClick={() => setShowDiagnostics((open) => !open)}>
          {showDiagnostics ? "Hide detailed reports" : "Detailed reports & connection checks"}
        </button>
      </div>
      {showDiagnostics ? (
        <div id="admin-analytics-diagnostics">
          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Connections</span><h2>Analytics health</h2></div>
              <a href={data.posthog.webUrl} target="_blank" rel="noreferrer">Open PostHog ↗</a></div>
            <div className="analytics-ranking">
              <div><strong>GA4 reporting</strong><small>{data.propertyId || "No property ID"} · {data.connection?.measurementId || "No measurement ID"}</small><b>{data.ga4Available ? "Receiving processed reports" : "Unavailable"}</b></div>
              <div><strong>GA4 configuration</strong><small>{data.connection?.error || "Web-stream comparison"}</small><b>{data.connection?.status ?? "Unavailable"}</b></div>
              <div><strong>PostHog reporting</strong><small>{data.posthog.overview.error || data.posthog.collectionStartDate}</small><b>{posthog.available ? "Available" : "Unavailable"}</b></div>
              <div><strong>Google Search Console</strong><small>{data.searchPerformance?.source || "Unavailable"} · latest {data.searchPerformance?.latestDate || "unreported"}</small><b>{data.searchPerformance?.available ? "Available" : "Unavailable"}</b></div>
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Search details</span><h2>Visibility & recent hours</h2></div></div>
            <div className="analytics-metric-grid">
              <div><span>Search CTR</span><strong>{data.searchPerformance?.available ? ((data.searchPerformance.ctr ?? 0) * 100).toFixed(2) + "%" : "—"}</strong></div>
              <div><span>Average position</span><strong>{data.searchPerformance?.available ? (data.searchPerformance.position ?? 0).toFixed(1) : "—"}</strong></div>
              <div><span>Latest reported hour</span><strong>{data.hourlySearchPerformance?.latestHour ? readableSearchHour(data.hourlySearchPerformance.latestHour) : "—"}</strong></div>
              <div><span>24h reported impressions</span><strong>{data.hourlySearchPerformance?.impressions24h == null ? "—" : number(data.hourlySearchPerformance.impressions24h)}</strong></div>
            </div>
            <p className="analytics-clean-note">
              Hourly data is preliminary. {data.hourlySearchPerformance?.available
                ? "Missing hours are not zero; Google may revise incomplete reports."
                : data.hourlySearchPerformance?.error || "The Google hourly report is unavailable."}
            </p>
            {!data.hourlySearchPerformance?.available && data.hourlySearchPerformance?.issue ? (
              <SearchConsoleConnectionHelp issue={data.hourlySearchPerformance.issue} />
            ) : null}
            {data.searchTrafficComparison ? (
              <p className="analytics-clean-note">Comparable settled dates {data.searchTrafficComparison.startDate}–{data.searchTrafficComparison.endDate}: {number(data.searchTrafficComparison.gscClicks)} Google clicks vs {number(data.searchTrafficComparison.ga4OrganicSessions)} GA4 organic sessions. Different collection methods mean these figures need not match.</p>
            ) : null}
          </section>

          <div className="admin-analytics-two-column">
            <section className="admin-panel">
              <div className="section-heading"><div><h2>Visitor locations</h2></div></div>
              <div className="analytics-ranking">
                {data.countries.slice(0, 8).map((row) => (
                  <div key={row.country}><strong>{row.country}</strong><b>{number(row.users)} users</b></div>
                ))}
              </div>
            </section>
            <section className="admin-panel">
              <div className="section-heading"><div><h2>Visitor actions</h2></div></div>
              {data.interactions.length ? <div className="analytics-ranking">
                {data.interactions.slice(0, 10).map((row) => (
                  <div key={row.event}><strong>{interactionLabel(row.event)}</strong><b>{number(row.count)}</b></div>
                ))}
              </div> : <p className="analytics-clean-note">No recorded actions in this period.</p>}
              <p className="analytics-clean-note">Key events: {data.keyEvents?.available
                ? data.keyEvents.events.map((event) => event.name + (event.configured ? " configured" : " not configured")).join(" · ")
                : "Configuration not available from GA4."}</p>
            </section>
          </div>
          <p className="analytics-clean-note"><a href="https://lookerstudio.google.com/" target="_blank" rel="noopener noreferrer">Open Looker Studio ↗</a> for detailed external reports.</p>
        </div>
      ) : null}
    </div>
  );
}
