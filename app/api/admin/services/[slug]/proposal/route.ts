import { getService } from "@/lib/data";
import { hasAdminSession } from "@/lib/admin-access";
import { createServiceProposal, githubAdminConfigured } from "@/lib/admin-github";
import { validateServiceRecord } from "@/lib/service-records";

const MAX_BODY_BYTES = 180_000;

function sameOrigin(request: Request) {
  const target = new URL(request.url);
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (origin && origin !== target.origin) return false;
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "same-site") return false;
  return true;
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
