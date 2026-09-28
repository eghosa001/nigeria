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

function readableDate(value: string) {
  if (!/^\d{8}$/.test(value)) return value;
  const date = new Date(Number(value.slice(0, 4)), Number(value.slice(4, 6)) - 1, Number(value.slice(6, 8)));
  return date.toLocaleDateString("en-NG", { month: "short", day: "numeric" });
}

export function AdminAnalyticsDashboard() {
  const [range, setRange] = useState<AnalyticsRange>("30d");
  const [state, setState] = useState<"loading" | "setup" | "locked" | "ready" | "error">("loading");
  const [data, setData] = useState<AnalyticsDashboardData | null>(null);
  const [setup, setSetup] = useState<ApiResponse>({});
  const [message, setMessage] = useState("");

  async function load(nextRange = range) {
    setState("loading");
    setMessage("");
    const response = await fetch("/api/admin/analytics?range=" + nextRange, { cache: "no-store" });
    const body = await response.json() as ApiResponse;

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
  }

  useEffect(() => { void load(range); }, [range]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setMessage("");
    const form = new FormData(formElement);
    const response = await fetch("/api/admin/analytics-access", {
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
    await load(range);
  }

  async function logout() {
    await fetch("/api/admin/analytics-access", { method: "DELETE" });
    setData(null);
    setState("locked");
  }

  const maxDailyViews = useMemo(() => Math.max(1, ...(data?.daily.map((row) => row.pageViews) ?? [1])), [data]);

  if (state === "loading") {
    return <div className="admin-analytics-state"><strong>Loading visit analytics…</strong><p>Reading the latest aggregate GA4 reports.</p></div>;
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
        <button type="button" onClick={() => void load(range)}>Retry</button>
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
        <button type="button" onClick={logout}>Lock analytics</button>
      </div>

      <div className="analytics-metric-grid">
        <div><span>Users</span><strong>{number(data.summary.activeUsers)}</strong><small>Distinct active visitors</small></div>
        <div><span>Visits</span><strong>{number(data.summary.sessions)}</strong><small>Sessions</small></div>
        <div><span>Page views</span><strong>{number(data.summary.pageViews)}</strong><small>Repeated views included</small></div>
        <div><span>Engaged visits</span><strong>{number(data.summary.engagedSessions)}</strong><small>{(data.summary.engagementRate * 100).toFixed(1)}% engagement rate</small></div>
        <div><span>Live now</span><strong>{data.realtimeActiveUsers == null ? "—" : number(data.realtimeActiveUsers)}</strong><small>Active users in realtime report</small></div>
      </div>

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
    </>
  );
}
