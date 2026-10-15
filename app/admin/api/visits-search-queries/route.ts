import { cookies } from "next/headers";
import { analyticsAdminAccessConfigured, analyticsAdminCookieName, verifyAnalyticsAdminCookie } from "@/lib/admin-analytics-access";
import { protectedAdminApi, privateAdminHeaders, legacyRouteResponse } from "@/lib/admin-api-guards";
import { dateInTimeZone, searchConsoleQuery } from "@/lib/analytics-data";
import type { InsightRange } from "@/lib/admin-visits-insights";
import { searchPeriodStart, validateSearchPage } from "@/lib/visits-search-opportunities";

const ranges = new Set<InsightRange>(["1d", "7d", "30d", "90d", "all"]);

export async function GET(request: Request) {
  if (!protectedAdminApi(request)) return legacyRouteResponse();
  if (!analyticsAdminAccessConfigured()) return Response.json(
    { error: "Private analytics access is not configured." }, { status: 503, headers: privateAdminHeaders },
  );
  const cookieStore = await cookies();
  if (!verifyAnalyticsAdminCookie(cookieStore.get(analyticsAdminCookieName())?.value)) {
    return Response.json({ error: "Unlock analytics before inspecting search queries." },
      { status: 401, headers: privateAdminHeaders });
  }

  const params = new URL(request.url).searchParams;
  const page = validateSearchPage(params.get("page"));
  const selected = params.get("range") as InsightRange | null;
  if (!page || !selected || !ranges.has(selected)) {
    return Response.json({ error: "Select a valid website page and reporting period." },
      { status: 400, headers: privateAdminHeaders });
  }
  const endDate = dateInTimeZone("America/Los_Angeles");
  const startDate = searchPeriodStart(selected, endDate);
  try {
    const response = await searchConsoleQuery({
      startDate, endDate, type: "web", dataState: "all",
      dimensions: ["query"],
      dimensionFilterGroups: [{ groupType: "and", filters: [{ dimension: "page", operator: "equals", expression: page }] }],
      rowLimit: 50,
    });
    const queries = (response.rows ?? []).filter((row) => Boolean(row.keys?.[0])).map((row) => ({
      query: row.keys![0], impressions: row.impressions ?? 0, clicks: row.clicks ?? 0,
      ctr: row.ctr ?? 0, position: row.position ?? 0,
    }));
    return Response.json({ page, startDate, endDate, queries,
      note: "Google withholds anonymized queries; visible query totals may be below page totals. Recent dates may be provisional." },
      { headers: privateAdminHeaders });
  } catch {
    return Response.json({ error: "Search queries are unavailable from Google right now." },
      { status: 502, headers: privateAdminHeaders });
  }
}
