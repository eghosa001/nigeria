import { cookies } from "next/headers";
import { privateAdminHeaders, protectedAdminApi, legacyRouteResponse } from "@/lib/admin-api-guards";
import { analyticsAdminAccessConfigured, analyticsAdminCookieName, verifyAnalyticsAdminCookie } from "@/lib/admin-analytics-access";
import { getVisitsInsights, type InsightRange } from "@/lib/admin-visits-insights";

const allowed = new Set<InsightRange>(["1d", "7d", "30d", "90d", "all"]);

export async function GET(request: Request) {
  if (!protectedAdminApi(request)) return legacyRouteResponse();
  if (!analyticsAdminAccessConfigured()) return Response.json(
    { error: "Admin analytics protection is not configured." }, { status: 503, headers: privateAdminHeaders },
  );
  const store = await cookies();
  if (!verifyAnalyticsAdminCookie(store.get(analyticsAdminCookieName())?.value)) {
    return Response.json({ error: "Unlock the Visits dashboard first." }, { status: 401, headers: privateAdminHeaders });
  }
  const url = new URL(request.url);
  const input = url.searchParams.get("range");
  const range: InsightRange = input && allowed.has(input as InsightRange) ? input as InsightRange : "30d";
  try {
    const data = await getVisitsInsights(range, url.searchParams.get("fresh") === "1");
    return Response.json({ data }, { headers: privateAdminHeaders });
  } catch {
    return Response.json({ error: "The Visits report could not be prepared. Retry later." }, {
      status: 502, headers: privateAdminHeaders,
    });
  }
}
