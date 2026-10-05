const EXCLUDED_ANALYTICS_USER_AGENT_MARKERS = ["GoogleAdSenseInfeed"];

export function shouldEnableAnalytics(
  pathname: string,
  automatedBrowser: boolean,
  userAgent = "",
) {
  if (
    automatedBrowser ||
    EXCLUDED_ANALYTICS_USER_AGENT_MARKERS.some((marker) => userAgent.includes(marker))
  ) {
    return false;
  }
  return pathname !== "/admin" && !pathname.startsWith("/admin/");
}

export const ANALYTICS_CLEAN_START = "2026-09-29";

export function analyticsStartDate(days: number, todayIso: string) {
  const today = new Date(todayIso + "T12:00:00Z");
  today.setUTCDate(today.getUTCDate() - Math.max(0, days - 1));
  const rollingStart = today.toISOString().slice(0, 10);
  return rollingStart < ANALYTICS_CLEAN_START ? ANALYTICS_CLEAN_START : rollingStart;
}
