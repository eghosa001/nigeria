import { cookies } from "next/headers";
import { getAnalyticsDashboard, analyticsReadConfigured, analyticsTrackingConfigured, type AnalyticsRange, type AnalyticsTrafficMode } from "@/lib/analytics-data";
import { analyticsAdminAccessConfigured, analyticsAdminCookieName, verifyAnalyticsAdminCookie } from "@/lib/admin-analytics-access";

const privateHeaders = { "Cache-Control": "private, no-store" };

function protectedAdminApi(request: Request) {
  return new URL(request.url).pathname.startsWith("/admin/api/");
}

function legacyRouteResponse() {
  return Response.json({ error: "Not found." }, { status: 404, headers: privateHeaders });
}

const ranges = new Set<AnalyticsRange>(["7d", "30d", "90d"]);
const modes = new Set<AnalyticsTrafficMode>(["all", "clean"]);

export async function GET(request: Request) {
  if (!protectedAdminApi(request)) return legacyRouteResponse();
  const accessConfigured = analyticsAdminAccessConfigured();
  const readConfigured = analyticsReadConfigured();
  const trackingConfigured = analyticsTrackingConfigured();

  if (!accessConfigured || !readConfigured || !trackingConfigured) {
    return Response.json({
      configured: false,
      accessConfigured,
      readConfigured,
      trackingConfigured,
    }, { status: 503, headers: { "Cache-Control": "private, no-store" } });
  }

  const store = await cookies();
  if (!verifyAnalyticsAdminCookie(store.get(analyticsAdminCookieName())?.value)) {
    return Response.json({ configured: true, authenticated: false }, { status: 401, headers: { "Cache-Control": "private, no-store" } });
  }

  const url = new URL(request.url);
  const requestedRange = url.searchParams.get("range") as AnalyticsRange | null;
  const range: AnalyticsRange = requestedRange && ranges.has(requestedRange) ? requestedRange : "30d";
  const requestedMode = url.searchParams.get("mode") as AnalyticsTrafficMode | null;
  const mode: AnalyticsTrafficMode = requestedMode && modes.has(requestedMode) ? requestedMode : "all";

  try {
    const data = await getAnalyticsDashboard(range, mode);
    return Response.json({ configured: true, authenticated: true, data }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return Response.json({
      configured: true,
      authenticated: true,
      error: error instanceof Error ? error.message : "Unable to load analytics.",
    }, { status: 502, headers: { "Cache-Control": "private, no-store" } });
  }
}
