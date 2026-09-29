import { cookies } from "next/headers";
import { checkAdminLoginRateLimit, clearAdminLoginFailures, recordAdminLoginFailure } from "@/lib/admin-rate-limit";
import { githubAdminConfigured } from "@/lib/admin-github";
import {
  adminAccessConfigured,
  adminCookieName,
  adminCookieOptions,
  adminCookieValue,
  hasAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-access";

const privateHeaders = { "Cache-Control": "private, no-store" };

function protectedAdminApi(request: Request) {
  return new URL(request.url).pathname.startsWith("/admin/api/");
}

function legacyRouteResponse() {
  return Response.json({ error: "Not found." }, { status: 404, headers: privateHeaders });
}

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

export async function GET(request: Request) {
  if (!protectedAdminApi(request)) return legacyRouteResponse();
  const accessConfigured = adminAccessConfigured();
  const githubConfigured = githubAdminConfigured();
  return Response.json({
    configured: accessConfigured && githubConfigured,
    accessConfigured,
    githubConfigured,
    authenticated: accessConfigured && githubConfigured ? await hasAdminSession() : false,
  }, { headers: privateHeaders });
}

export async function POST(request: Request) {
  if (!protectedAdminApi(request)) return legacyRouteResponse();
  if (!adminAccessConfigured() || !githubAdminConfigured()) {
    return Response.json({ error: "Admin editing is not fully configured." }, { status: 503, headers: privateHeaders });
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

  if (!verifyAdminPassword(body.password ?? "")) {
    recordAdminLoginFailure(request);
    return Response.json({ error: "Incorrect admin passphrase." }, { status: 401, headers: privateHeaders });
  }

  clearAdminLoginFailures(request);

  const store = await cookies();
  store.set(adminCookieName(), adminCookieValue(), adminCookieOptions);
  return Response.json({ authenticated: true }, { headers: privateHeaders });
}

export async function DELETE(request: Request) {
  if (!protectedAdminApi(request)) return legacyRouteResponse();
  if (!sameOrigin(request)) {
    return Response.json({ error: "Cross-origin admin requests are not allowed." }, { status: 403, headers: privateHeaders });
  }
  const store = await cookies();
  store.set(adminCookieName(), "", { ...adminCookieOptions, maxAge: 0 });
  return Response.json({ authenticated: false }, { headers: privateHeaders });
}
