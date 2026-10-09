"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { AnalyticsDashboardData, AnalyticsRange } from "@/lib/analytics-data";

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

  async function load(nextRange = range, forceFresh = false) {
    setState("loading");
    setMessage("");
    try {
      const response = await fetch(
        "/admin/api/analytics?range=" + nextRange + "&mode=clean" + (forceFresh ? "&fresh=1" : ""),
        { cache: "no-store" },
      );
      const body = await response.json().catch(() => ({ error: "Analytics server returned an invalid response." })) as ApiResponse;

      if (response.status === 503 && body.configured === false) {
        setSetup(body);
        setState("setup");
        return;
      }
      if (response.status === 401) {
        setState("locked");
        return;
      }
      if (!response.ok || !body.data) {
        setMessage(body.error ?? "Unable to load visit analytics.");
        setState("error");
        return;
      }
      setData(body.data);
      setState("ready");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to reach the analytics server.");
      setState("error");
    }
  }

  useEffect(() => { void load(range); }, [range]);

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
    await fetch("/admin/api/analytics-access", { method: "DELETE" });
    setData(null);
    setState("locked");
  }

  const maxDailyViews = useMemo(() => Math.max(1, ...(data?.daily.map((row) => row.pageViews) ?? [1])), [data]);

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

  return (
    <>
      <div className="analytics-toolbar">
        <div>
          <button type="button" className={range === "7d" ? "active" : undefined} onClick={() => setRange("7d")}>7 days</button>
          <button type="button" className={range === "30d" ? "active" : undefined} onClick={() => setRange("30d")}>30 days</button>
          <button type="button" className={range === "90d" ? "active" : undefined} onClick={() => setRange("90d")}>90 days</button>
        </div>
        <div>
          <button type="button" onClick={() => void load(range, true)}>Refresh now</button>
          <button type="button" onClick={logout}>Lock analytics</button>
        </div>
      </div>

      <p className="analytics-clean-note">
        {data.ga4Available ? (
          <>GA4 public-site data only, from {new Date(data.dataStartDate + "T12:00:00Z").toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}. Earlier GA4 data is excluded because it contains known QA traffic. Admin, API and Next.js asset paths are excluded. The 7/30/90-day totals are processed GA4 reports and may lag behind new visits; the last-30-minute counters above are realtime. GA4 property: {data.propertyId || "unknown"}.</>
        ) : (
          <>PostHog is loading independently. GA4 Data API reporting is currently unavailable, so GA4 totals below should not be treated as visitor counts until that secondary connection is restored.</>
        )}
      </p>

      <section className="admin-panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Primary live analytics</span>
            <h2>PostHog · MyNigeriaGuide</h2>
          </div>
          <a href={data.posthog.webUrl} target="_blank" rel="noreferrer">Open live analytics ↗</a>
        </div>
        <div className="analytics-ranking">
          <div>
            <span>1</span>
            <strong>Public tracking</strong>
            <small>mynigeriaguide.com</small>
            <b>{data.posthog.trackingConfigured ? "SDK installed" : "Not configured"}</b>
          </div>
          <div>
            <span>2</span>
            <strong>Collection start</strong>
            <small>{data.posthog.collectionStartDate}</small>
            <b>New traffic</b>
          </div>
          <div>
            <span>3</span>
            <strong>Admin API reporting</strong>
            <small>Protected server-side PostHog read access</small>
            <b>{data.posthog.reportingConfigured ? "Connected" : "Not connected"}</b>
          </div>
        </div>
        <p className="analytics-clean-note">
          PostHog reports new traffic from when tracking became operational; an installed SDK alone does not confirm successful event delivery. It does not rewrite old visitor history.
          Google Search Console history remains preserved separately below, while GA4 stays enabled as a secondary reference.
          Admin paths, API paths, Next.js assets and automated QA traffic are excluded from PostHog collection.
        </p>
        {data.posthog.overview.available ? (
          <>
            <div className="analytics-metric-grid">
              <div><span>PostHog visitors</span><strong>{number(data.posthog.overview.visitors ?? 0)}</strong><small>Unique visitors · fast web analytics</small></div>
              <div><span>PostHog sessions</span><strong>{number(data.posthog.overview.sessions ?? 0)}</strong><small>Visits in the selected period</small></div>
              <div><span>PostHog page views</span><strong>{number(data.posthog.overview.views ?? 0)}</strong><small>Repeated views included</small></div>
              <div><span>Avg session</span><strong>{duration(data.posthog.overview.averageSessionDurationSeconds)}</strong><small>Average session duration</small></div>
              <div><span>Bounce rate</span><strong>{data.posthog.overview.bounceRate == null ? "—" : data.posthog.overview.bounceRate.toFixed(1) + "%"}</strong><small>Sessions that ended without meaningful continuation</small></div>
            </div>
            <p className="analytics-clean-note">
              PostHog range: {data.posthog.overview.startDate} through {data.posthog.overview.endDate}. Refresh now asks PostHog and GA4 for fresh server-side reports.
            </p>
          </>
        ) : (
          <div className="admin-empty">
            <strong>PostHog private reporting is not available on this dashboard yet.</strong>
            <p>{data.posthog.overview.error || <>Add a server-only <code>POSTHOG_PERSONAL_API_KEY</code> with Query Read access. Never use that key in browser code.</>}</p>
          </div>
        )}
      </section>

      <section className="admin-panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Secondary analytics reference</span>
            <h2>{
              data.connection?.status === "verified"
                ? "GA4 property verified"
                : data.connection?.status === "mismatch"
                  ? "GA4 property mismatch"
                  : "GA4 verification unavailable"
            }</h2>
          </div>
          <small>{
            data.connection?.status === "verified"
              ? "Tracking and reporting point to the same property"
              : data.connection?.status === "mismatch"
                ? "Tracking and reporting point to different GA4 configuration"
                : "Google could not run the stream/property verification"
          }</small>
        </div>
        <div className="analytics-ranking">
          <div>
            <span>1</span>
            <strong>Measurement ID</strong>
            <small>{data.connection?.measurementId || "Not configured"}</small>
            <b>{
              data.connection?.status === "verified"
                ? "Matched"
                : data.connection?.status === "mismatch"
                  ? "Mismatch"
                  : "Unverified"
            }</b>
          </div>
          <div>
            <span>2</span>
            <strong>Property ID</strong>
            <small>{data.connection?.propertyId || "Not configured"}</small>
            <b>{
              data.connection?.status === "unavailable"
                ? "Not checked"
                : `${data.connection?.streams?.length ?? 0} web stream${(data.connection?.streams?.length ?? 0) === 1 ? "" : "s"}`
            }</b>
          </div>
          {(data.connection?.streams ?? []).map((stream, index) => (
            <div key={stream.measurementId + stream.defaultUri}>
              <span>{index + 3}</span>
              <strong>{stream.displayName || "Web stream"}</strong>
              <small>{stream.defaultUri || stream.measurementId}</small>
              <b>{stream.measurementId}</b>
            </div>
          ))}
        </div>
        {data.connection?.status === "unavailable" ? (
          <div className="admin-empty">
            <strong>Verification could not run; this does not mean the IDs are mismatched.</strong>
            <p>{data.connection?.error || "Google did not allow the web-stream verification request."}</p>
          </div>
        ) : data.connection?.status === "mismatch" ? (
          <div className="admin-empty">
            <strong>The configured public measurement ID was not found in this GA4 property's web streams.</strong>
            <p>Do not rely on the visitor totals until the tracking and reporting configuration is corrected.</p>
          </div>
        ) : null}
      </section>

      <div className="analytics-metric-grid">
        <div><span>GA4 processed visitors</span><strong>{number(data.summary.totalUsers ?? data.summary.activeUsers)}</strong><small>Deduplicated unique users from GA4 standard reporting</small></div>
        <div><span>GA4 active users</span><strong>{number(data.summary.activeUsers)}</strong><small>Users GA4 classifies as active</small></div>
        <div><span>GA4 sessions</span><strong>{number(data.summary.sessions)}</strong><small>Visits recorded by Analytics</small></div>
        <div><span>Google Search clicks</span><strong>{data.searchPerformance?.available ? number(data.searchPerformance.clicks ?? 0) : "—"}</strong><small>{data.searchPerformance?.available ? "Search Console clicks — not GA4 sessions" : "Search Console data unavailable"}</small></div>
        <div><span>Google impressions</span><strong>{data.searchPerformance?.available ? number(data.searchPerformance.impressions ?? 0) : "—"}</strong><small>Google Search appearances</small></div>
        <div><span>Page views</span><strong>{number(data.summary.pageViews)}</strong><small>Processed GA4 views; repeated views included</small></div>
        <div><span>Engaged sessions</span><strong>{number(data.summary.engagedSessions)}</strong><small>{(data.summary.engagementRate * 100).toFixed(1)}% engagement rate</small></div>
        <div><span>Live users · last 30 min</span><strong>{data.realtimeActiveUsers == null ? "—" : number(data.realtimeActiveUsers)}</strong><small>Received by GA4 now; not added to the processed unique total until Google processes and deduplicates them</small></div>
        <div><span>Views · last 30 min</span><strong>{data.realtimePageViews == null ? "—" : number(data.realtimePageViews)}</strong><small>Realtime page views; recent visits appear here first</small></div>
      </div>

      <section className="admin-panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Google Search visibility</span>
            <h2>Impressions and search clicks</h2>
          </div>
          <small>{data.searchPerformance?.source === "historical-snapshot" ? "Search Console · preserved historical snapshot" : "Search Console · freshest available data"}</small>
        </div>
        {data.searchPerformance?.available ? (
          <>
            <div className="analytics-metric-grid">
              <div><span>Impressions</span><strong>{number(data.searchPerformance?.impressions ?? 0)}</strong><small>Times MyNigeriaGuide appeared in Google Search</small></div>
              <div><span>Search clicks</span><strong>{number(data.searchPerformance?.clicks ?? 0)}</strong><small>Clicks from Google Search results</small></div>
              <div><span>Search CTR</span><strong>{((data.searchPerformance?.ctr ?? 0) * 100).toFixed(2)}%</strong><small>Clicks divided by impressions</small></div>
              <div><span>Average position</span><strong>{(data.searchPerformance?.position ?? 0).toFixed(1)}</strong><small>Average top result position</small></div>
            </div>
            <p className="analytics-clean-note">
              {data.searchPerformance?.source === "historical-snapshot" ? (
                <>Previous Search Console data is preserved even though the server's live Search Console credential is unavailable. Snapshot currently runs through {data.searchPerformance?.latestDate ?? "the last saved date"}.</>
              ) : (
                <>Comparison range starts {data.searchPerformance?.startDate}. Search Console requested through {data.searchPerformance?.endDate}; latest date actually returned: {data.searchPerformance?.latestDate ?? "none yet"}.</>
              )}
              {data.searchPerformance?.firstIncompleteDate ? <> Data from {data.searchPerformance?.firstIncompleteDate} onward is preliminary and can still change.</> : null}
            </p>
          </>
        ) : (
          <div className="admin-empty">
            <strong>Search impressions are not available to this server connection yet.</strong>
            <p>The dashboard will use the Search Console API directly once its service account has read access to {data.searchPerformance?.siteUrl ?? "sc-domain:mynigeriaguide.com"}. Visitor analytics will continue to work independently.</p>
          </div>
        )}
      </section>

      <section className="admin-panel analytics-trend">
        <div className="section-heading"><div><span className="eyebrow">Traffic trend</span><h2>Page views by day</h2></div><small>Updated {new Date(data.generatedAt).toLocaleString("en-NG")}</small></div>
        <div className="analytics-bars" aria-label="Daily page views">
          {data.daily.map((row) => (
            <div key={row.date} title={readableDate(row.date) + ": " + number(row.pageViews) + " page views"}>
              <span style={{ height: Math.max(3, (row.pageViews / maxDailyViews) * 100) + "%" }} />
              <small>{data.daily.length <= 14 ? readableDate(row.date) : ""}</small>
            </div>
          ))}
        </div>
      </section>

      <div className="admin-analytics-two-column">
        <section className="admin-panel">
          <div className="section-heading"><div><span className="eyebrow">Geography</span><h2>Where visitors are from</h2></div></div>
          <div className="analytics-ranking">
            {data.countries.map((row, index) => (
              <div key={row.country}>
                <span>{index + 1}</span>
                <strong>{row.country}</strong>
                <small>{number(row.users)} users</small>
                <b>{number(row.pageViews)} views</b>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <div className="section-heading"><div><span className="eyebrow">Acquisition</span><h2>How people find the site</h2></div></div>
          <div className="analytics-ranking">
            {data.referrers.map((row, index) => (
              <div key={row.source + row.medium}>
                <span>{index + 1}</span>
                <strong>{row.source}</strong>
                <small>{row.medium}</small>
                <b>{number(row.sessions)} visits</b>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="admin-panel">
        <div className="section-heading"><div><span className="eyebrow">Content performance</span><h2>Most viewed pages</h2></div></div>
        <div className="analytics-page-table">
          <div><span>#</span><span>Page</span><span>Users</span><span>Views</span></div>
          {data.pages.map((row, index) => (
            <div key={row.path + row.title}>
              <span>{index + 1}</span>
              <span><strong>{row.title}</strong><small>{row.path}</small></span>
              <span>{number(row.users)}</span>
              <span>{number(row.pageViews)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-panel analytics-interactions">
        <div className="section-heading">
          <div><span className="eyebrow">Useful actions</span><h2>What visitors actually do</h2></div>
          <small>Privacy-safe aggregate events only</small>
        </div>
        {(data.interactions ?? []).length ? (
          <div className="analytics-ranking">
            {(data.interactions ?? []).map((row, index) => (
              <div key={row.event}>
                <span>{index + 1}</span>
                <strong>{interactionLabel(row.event)}</strong>
                <small>{row.event}</small>
                <b>{number(row.count)} events</b>
              </div>
            ))}
          </div>
        ) : (
          <div className="admin-empty">
            <strong>No interaction events yet.</strong>
            <p>Search clicks, official-link clicks, shares, saved guides and checklist activity will appear here after visitors use them.</p>
          </div>
        )}
      </section>
    </>
  );
}
