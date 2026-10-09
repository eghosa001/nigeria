/** Canonical production hostnames. Preview, workers.dev and local traffic must never reach GA4 or PostHog. */
export const ANALYTICS_PRODUCTION_HOSTS = ["mynigeriaguide.com", "www.mynigeriaguide.com"] as const;

/** Explicit signatures only: avoid blocking genuine visitors with broad /bot/ matching. */
export const EXCLUDED_ANALYTICS_USER_AGENT_MARKERS = [
  "googleadsenseinfeed", "headlesschrome", "playwright", "puppeteer", "lighthouse",
  "googlebot", "bingbot", "duckduckbot", "yandexbot", "baiduspider",
  "facebookexternalhit", "twitterbot", "gptbot", "claudebot", "bytespider",
  "ahrefsbot", "semrushbot", "screaming frog", "curl/", "wget/",
  "python-requests", "node-fetch", "go-http-client", "undici",
] as const;

export function shouldEnableAnalytics(
  pathname: string,
  automatedBrowser: boolean,
  userAgent = "",
  hostname = "",
) {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (!ANALYTICS_PRODUCTION_HOSTS.some((allowed) => allowed === host)) return false;
  if (automatedBrowser) return false;

  const agent = userAgent.toLowerCase();
  if (EXCLUDED_ANALYTICS_USER_AGENT_MARKERS.some((marker) => agent.includes(marker))) return false;

  return !(
    pathname === "/admin" || pathname.startsWith("/admin/") ||
    pathname === "/api" || pathname.startsWith("/api/") ||
    pathname === "/_next" || pathname.startsWith("/_next/")
  );
}

// Clean mode intentionally starts after the observed September testing/preview traffic.
// Raw historical reporting remains accessible in "all" mode.
export const ANALYTICS_CLEAN_START = "2026-10-04";

export function analyticsStartDate(days: number, todayIso: string) {
  const today = new Date(todayIso + "T12:00:00Z");
  today.setUTCDate(today.getUTCDate() - Math.max(0, days - 1));
  const rollingStart = today.toISOString().slice(0, 10);
  return rollingStart < ANALYTICS_CLEAN_START ? ANALYTICS_CLEAN_START : rollingStart;
}
