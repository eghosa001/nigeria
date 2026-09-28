import { cookies } from "next/headers";
import { adminCookieOptions } from "@/lib/admin-access";
import {
  analyticsAdminAccessConfigured,
  analyticsAdminCookieName,
  analyticsAdminCookieValue,
  verifyAnalyticsAdminPassword,
} from "@/lib/admin-analytics-access";

const privateHeaders = { "Cache-Control": "private, no-store" };

function sameOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite) return fetchSite === "same-origin";

  const origin = request.headers.get("origin");
  if (!origin) return false;

  let source: URL;
  try {
    source = new URL(origin);
  } catch {
    return false;
  }

  const target = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || request.headers.get("host") || target.host;
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProto || target.protocol.replace(":", "");

  return source.host === host && source.protocol === protocol + ":";
}

export async function POST(request: Request) {
  if (!analyticsAdminAccessConfigured()) {
    return Response.json({ error: "Admin analytics access is not configured." }, { status: 503, headers: privateHeaders });
  }
  if (!sameOrigin(request)) {
    return Response.json({ error: "Cross-origin admin requests are not allowed." }, { status: 403, headers: privateHeaders });
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return Response.json({ error: "Content-Type must be application/json." }, { status: 415, headers: privateHeaders });
  }

  let body: { password?: string };
  try {
    body = await request.json() as { password?: string };
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400, headers: privateHeaders });
  }

  if (!verifyAnalyticsAdminPassword(body.password ?? "")) {
    return Response.json({ error: "Incorrect analytics passphrase." }, { status: 401, headers: privateHeaders });
  }

  const store = await cookies();
  store.set(analyticsAdminCookieName(), analyticsAdminCookieValue(), adminCookieOptions);
  return Response.json({ ok: true }, { headers: privateHeaders });
}

export async function DELETE(request: Request) {
  if (!sameOrigin(request)) {
    return Response.json({ error: "Cross-origin admin requests are not allowed." }, { status: 403, headers: privateHeaders });
  }
  const store = await cookies();
  store.set(analyticsAdminCookieName(), "", { ...adminCookieOptions, maxAge: 0 });
  return Response.json({ ok: true }, { headers: privateHeaders });
}
