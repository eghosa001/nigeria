"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { SearchConsoleApiIssue, SearchConsoleHourlyReport } from "@/lib/search-console-hourly";
import { SearchConsoleConnectionHelp } from "@/components/search-console-connection-help";

type State =
  | { kind: "loading" }
  | { kind: "ready"; report: SearchConsoleHourlyReport }
  | { kind: "unavailable"; explanation: string; issue?: SearchConsoleApiIssue }
  | { kind: "error"; explanation: string };

function showHour(value: string | null) {
  if (!value) return "None returned";
  const time = new Date(value);
  if (Number.isNaN(time.getTime())) return "Unknown";
  return time.toLocaleString("en-NG", {
    timeZone: "Africa/Lagos", day: "numeric", month: "short",
    hour: "2-digit", minute: "2-digit",
  }) + " WAT";
}

function format(value: number | null) {
  return value == null ? "—" : new Intl.NumberFormat("en-NG").format(value);
}

export function AdminSearchConsoleStatus() {
  const [status, setStatus] = useState<State>({ kind: "loading" });
  const [refreshing, setRefreshing] = useState(false);
  const [serviceAccountEmail, setServiceAccountEmail] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const check = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch("/admin/api/search-console?check=" + Date.now(), {
        cache: "no-store",
      });
      if (response.status === 401) {
        setStatus({ kind: "error", explanation: "Your admin session has expired. Unlock the admin area again." });
        return;
      }
      const result = await response.json() as {
        configured?: boolean; report?: SearchConsoleHourlyReport; error?: string;
        serviceAccount?: { email?: string | null; origin?: string; siteUrl?: string };
      };
      setServiceAccountEmail(result.serviceAccount?.email ?? null);
      if (!response.ok) {
        setStatus({ kind: "error", explanation: result.error || "The health check could not be loaded." });
      } else if (!result.configured) {
        setStatus({ kind: "unavailable", explanation: result.error || "Google Search Console credentials are missing." });
      } else if (!result.report?.available) {
        setStatus({ kind: "unavailable", explanation: result.report?.error || "Google did not return hourly results.", issue: result.report?.issue });
      } else {
        setStatus({ kind: "ready", report: result.report });
      }
    } catch {
      setStatus({ kind: "error", explanation: "Could not contact the protected Search Console API. Check network or Cloudflare Access." });
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { void check(); }, [check]);

  return (
    <section className="admin-panel" aria-labelledby="admin-gsc-status-heading" data-testid="admin-gsc-status">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Google Search Console · direct API</span>
          <h2 id="admin-gsc-status-heading">Live data connection & freshness</h2>
          <p>Shows the newest hour Google actually returned, independently of GSC Wizard, PostHog, or GA4.</p>
        </div>
        <button type="button" onClick={() => void check()} disabled={refreshing} className="admin-refresh-button">
          {refreshing ? "Checking…" : "Check Google now"}
        </button>
      </div>

      {status.kind === "loading" ? <p role="status">Checking Google Search Console connection…</p> : null}
      {status.kind === "unavailable" || status.kind === "error" ? (
        <div className="admin-empty" role="status">
          <strong>{status.kind === "error" ? "Unable to check Google" : "Google Search Console not reporting"}</strong>
          <p>{status.explanation}</p>
          {status.kind === "unavailable" && status.issue?.code === "property-permission" ? (
            <div className="gsc-copy-account">
              <strong>Account to add to Google Search Console</strong>
              <p>{serviceAccountEmail ?? "No service-account email is configured on this server."}</p>
              {serviceAccountEmail ? (
                <button type="button" className="admin-refresh-button" onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(serviceAccountEmail);
                    setEmailCopied(true);
                  } catch {
                    setEmailCopied(false);
                  }
                }}>
                  {emailCopied ? "Copied email" : "Copy account email"}
                </button>
              ) : null}
            </div>
          ) : null}
          {status.kind === "unavailable"
            ? <SearchConsoleConnectionHelp issue={status.issue} serviceAccountEmail={serviceAccountEmail} />
            : null}
          {status.kind === "unavailable" && status.issue?.code === "api-disabled"
            ? <p>Other analytics and historical data are unaffected. This is an API activation error, not yet evidence of a Search Console property-permission problem.</p>
            : <p>Existing website traffic analytics and historical data are unaffected. The Google service account must have permission to read <code>sc-domain:mynigeriaguide.com</code>.</p>}
        </div>
      ) : null}
      {status.kind === "ready" ? (
        <>
          <div className="analytics-metric-grid">
            <div><span>Latest Google hour</span><strong>{showHour(status.report.latestHour)}</strong><small>Actual returned hour, not refresh time</small></div>
            <div><span>Reporting delay</span><strong>{status.report.lagHours == null ? "—" : status.report.lagHours + "h"}</strong><small>{status.report.lagHours != null && status.report.lagHours >= 24 ? "Google has not supplied newer hourly data" : "Time since latest hour began"}</small></div>
            <div><span>Impressions · recent 24h</span><strong>{format(status.report.impressions24h)}</strong><small>{status.report.hoursReported24h} of 24 hours returned</small></div>
            <div><span>Clicks · recent 24h</span><strong>{format(status.report.clicks24h)}</strong><small>Preliminary Google Search data</small></div>
          </div>
          <p className="analytics-clean-note">
            Google property: <code>{status.report.siteUrl}</code>. Checked at {showHour(status.report.fetchedAt)}.
            {status.report.firstIncompleteHour
              ? <> Preliminary since {showHour(status.report.firstIncompleteHour)}.</>
              : <> Google did not supply a preliminary boundary; do not assume these figures are finalized.</>}
            {" "}Missing hours do not mean zero search traffic.
          </p>
        </>
      ) : null}

      <p className="analytics-clean-note">
        <Link href="/admin/visits">Full Visits dashboard →</Link>
        {" · "}<a href="https://lookerstudio.google.com/" target="_blank" rel="noopener noreferrer">Google's free reporting dashboard ↗</a>
      </p>
    </section>
  );
}
