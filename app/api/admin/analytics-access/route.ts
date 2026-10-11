import { privateAdminHeaders as privateHeaders, protectedAdminApi, legacyRouteResponse, sameOrigin } from "@/lib/admin-api-guards";
import { cookies } from "next/headers";
import { adminCookieOptions } from "@/lib/admin-access";
import { checkAdminLoginRateLimit, clearAdminLoginFailures, recordAdminLoginFailure } from "@/lib/admin-rate-limit";
import {
  analyticsAdminAccessConfigured,
  analyticsAdminCookieName,
  analyticsAdminCookieValue,
  verifyAnalyticsAdminPassword,
} from "@/lib/admin-analytics-access";

export async function POST(request: Request) {
  if (!protectedAdminApi(request)) return legacyRouteResponse();
  if (!analyticsAdminAccessConfigured()) {
    return Response.json({ error: "Admin analytics access is not configured." }, { status: 503, headers: privateHeaders });
  }
  if (!sameOrigin(request)) {
    return Response.json({ error: "Cross-origin admin requests are not allowed." }, { status: 403, headers: privateHeaders });
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return Response.json({ error: "Content-Type must be application/json." }, { status: 415, headers: privateHeaders });
  }

  const limit = checkAdminLoginRateLimit(request);
  if (!limit.allowed) {
    return Response.json(
      { error: "Too many failed admin sign-in attempts. Try again later." },
      { status: 429, headers: { ...privateHeaders, "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: { password?: string };
  try {
    body = await request.json() as { password?: string };
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400, headers: privateHeaders });
  }

  if (!verifyAnalyticsAdminPassword(body.password ?? "")) {
    recordAdminLoginFailure(request);
    return Response.json({ error: "Incorrect analytics passphrase." }, { status: 401, headers: privateHeaders });
  }

  clearAdminLoginFailures(request);

  const store = await cookies();
  store.set(analyticsAdminCookieName(), analyticsAdminCookieValue(), adminCookieOptions);
  return Response.json({ ok: true }, { headers: privateHeaders });
}

export async function DELETE(request: Request) {
  if (!protectedAdminApi(request)) return legacyRouteResponse();
  if (!sameOrigin(request)) {
    return Response.json({ error: "Cross-origin admin requests are not allowed." }, { status: 403, headers: privateHeaders });
  }
  const store = await cookies();
  store.set(analyticsAdminCookieName(), "", { ...adminCookieOptions, maxAge: 0 });
  return Response.json({ ok: true }, { headers: privateHeaders });
}
