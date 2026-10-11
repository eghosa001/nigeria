import { cookies } from "next/headers";
import { adminCookieName, verifyAdminCookie } from "@/lib/admin-access";
import { getHourlySearchPerformance, searchConsoleReadConfigured, searchConsoleServiceAccountIdentity } from "@/lib/analytics-data";

// Protected exactly like the existing Visits API, with no user-facing secrets.
const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };

export async function GET(request: Request) {
  if (new URL(request.url).pathname !== "/admin/api/search-console") {
    return Response.json({ error: "Not found." }, { status: 404, headers });
  }

  const store = await cookies();
  if (!verifyAdminCookie(store.get(adminCookieName())?.value)) {
    return Response.json({ authenticated: false }, { status: 401, headers });
  }

  const configured = searchConsoleReadConfigured();
  const serviceAccount = searchConsoleServiceAccountIdentity();
  if (!configured) {
    return Response.json({
      authenticated: true,
      configured: false,
      serviceAccount,
      error: "The server has no Search Console service-account credentials. Google Analytics and PostHog integrations do not grant these credentials automatically.",
    }, { headers });
  }

  try {
    const report = await getHourlySearchPerformance();
    return Response.json({ authenticated: true, configured: true, serviceAccount, report }, { headers });
  } catch {
    // Never leak raw server error internals or Google auth tokens.
    return Response.json({
      authenticated: true, configured: true, serviceAccount,
      error: "Search Console health check failed unexpectedly.",
    }, { status: 502, headers });
  }
}
