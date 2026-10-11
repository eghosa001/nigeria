/**
 * Shared security checks for protected /admin/api routes.
 * The old /api/admin aliases intentionally stay closed outside Cloudflare Access.
 */
export const privateAdminHeaders = { "Cache-Control": "private, no-store" };

export function protectedAdminApi(request: Request): boolean {
  return new URL(request.url).pathname.startsWith("/admin/api/");
}

export function legacyRouteResponse(): Response {
  return Response.json({ error: "Not found." }, { status: 404, headers: privateAdminHeaders });
}

export function sameOrigin(request: Request): boolean {
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
