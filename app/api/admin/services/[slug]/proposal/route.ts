import { categories, getAgency, getService, services } from "@/lib/data";
import { hasAdminSession } from "@/lib/admin-access";
import { createServiceProposal, githubAdminConfigured } from "@/lib/admin-github";
import { validateServiceRecord } from "@/lib/service-records";

const MAX_BODY_BYTES = 180_000;

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

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await hasAdminSession())) {
    return Response.json({ error: "Admin authentication required." }, { status: 401 });
  }
  if (!githubAdminConfigured()) {
    return Response.json({ error: "GitHub admin integration is not configured." }, { status: 503 });
  }
  if (!sameOrigin(request)) {
    return Response.json({ error: "Cross-origin admin requests are not allowed." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return Response.json({ error: "Content-Type must be application/json." }, { status: 415 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Guide update is too large." }, { status: 413 });
  }

  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return Response.json({ error: "Guide update is too large." }, { status: 413 });
  }

  let body: { service?: unknown };
  try {
    body = JSON.parse(raw) as { service?: unknown };
  } catch {
    return Response.json({ error: "Invalid JSON request." }, { status: 400 });
  }

  const { slug } = await params;
  if (!getService(slug)) {
    return Response.json({ error: "Guide not found." }, { status: 404 });
  }

  let service;
  try {
    service = validateServiceRecord(body.service);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Invalid guide data." }, { status: 400 });
  }
  if (service.slug !== slug) {
    return Response.json({ error: "The guide slug cannot be changed." }, { status: 400 });
  }
  if (!getAgency(service.agencySlug)) {
    return Response.json({ error: "Unknown agency slug." }, { status: 400 });
  }
  if (!categories.some((category) => category.name === service.category)) {
    return Response.json({ error: "Unknown service category." }, { status: 400 });
  }
  const knownSlugs = new Set(services.map((item) => item.slug));
  if (service.related.some((related) => related === slug || !knownSlugs.has(related))) {
    return Response.json({ error: "Related guides must reference other known guide slugs." }, { status: 400 });
  }

  try {
    const result = await createServiceProposal(slug, service);
    return Response.json(result, { status: 201 });
  } catch (error) {
    console.error("Admin guide proposal failed:", error);
    return Response.json(
      { error: error instanceof Error ? error.message.replace(/GitHub request failed \([^)]*\).*/, "GitHub could not create the review change.") : "Unable to create review change." },
      { status: 502 },
    );
  }
}
