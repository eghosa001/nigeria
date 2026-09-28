import { cookies } from "next/headers";
import { checkAdminLoginRateLimit, clearAdminLoginFailures, recordAdminLoginFailure } from "@/lib/admin-rate-limit";
import {
  adminAccessConfigured,
  adminCookieName,
  adminCookieOptions,
  adminCookieValue,
  verifyAdminPassword,
} from "@/lib/admin-access";

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
  if (!adminAccessConfigured()) {
    return Response.json({ error: "Admin access is not configured." }, { status: 503, headers: { "Cache-Control": "private, no-store" } });
  }
  if (!sameOrigin(request)) {
    return Response.json({ error: "Cross-origin admin requests are not allowed." }, { status: 403, headers: { "Cache-Control": "private, no-store" } });
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return Response.json({ error: "Content-Type must be application/json." }, { status: 415, headers: { "Cache-Control": "private, no-store" } });
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
    return Response.json({ error: "Invalid request." }, { status: 400, headers: { "Cache-Control": "private, no-store" } });
  }

  if (!verifyAdminPassword(body.password ?? "")) {
    recordAdminLoginFailure(request);
    return Response.json({ error: "Incorrect admin passphrase." }, { status: 401, headers: privateHeaders });
  }

  clearAdminLoginFailures(request);

  const store = await cookies();
  store.set(adminCookieName(), adminCookieValue(), adminCookieOptions);
  return Response.json({ authenticated: true }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function DELETE(request: Request) {
  if (!sameOrigin(request)) {
    return Response.json({ error: "Cross-origin admin requests are not allowed." }, { status: 403, headers: privateHeaders });
  }
  const store = await cookies();
  store.set(adminCookieName(), "", { ...adminCookieOptions, maxAge: 0 });
  return Response.json({ authenticated: false }, { headers: { "Cache-Control": "private, no-store" } });
}
