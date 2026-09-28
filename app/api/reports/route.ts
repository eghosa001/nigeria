import { getService } from "@/lib/data";
import { isReportBackendConfigured, submitCorrectionReport } from "@/lib/report-backend";

const allowedTypes = new Set(["incorrect_fee", "outdated_requirement", "broken_link", "other"]);
const MAX_BODY_BYTES = 12_000;

function noStore(status?: number) {
  return { status, headers: { "Cache-Control": "private, no-store" } };
}

function sameOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite) return fetchSite === "same-origin";

  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const source = new URL(origin);
    const target = new URL(request.url);
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const host = forwardedHost || request.headers.get("host") || target.host;
    const protocol = forwardedProto || target.protocol.replace(":", "");
    return source.host === host && source.protocol === protocol + ":";
  } catch {
    return false;
  }
}

export async function GET() {
  return Response.json({ configured: isReportBackendConfigured() }, noStore());
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return Response.json({ error: "Cross-origin report submissions are not allowed." }, noStore(403));
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return Response.json({ error: "Content-Type must be application/json." }, noStore(415));
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Report is too large." }, noStore(413));
  }

  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return Response.json({ error: "Report is too large." }, noStore(413));
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request." }, noStore(400));
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return Response.json({ ok: true }, noStore());
  }

  const serviceSlug = typeof body.service_slug === "string" ? body.service_slug.trim() : "";
  const reportType = typeof body.report_type === "string" ? body.report_type : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const contactEmail = typeof body.contact_email === "string" ? body.contact_email.trim() : "";

  if (!serviceSlug || serviceSlug.length > 120 || !allowedTypes.has(reportType) || !getService(serviceSlug)) {
    return Response.json({ error: "Invalid report details." }, noStore(400));
  }

  if (message.length < 10 || message.length > 4000) {
    return Response.json({ error: "Please describe the issue in 10–4000 characters." }, noStore(400));
  }

  if (
    contactEmail.length > 254 ||
    (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail))
  ) {
    return Response.json({ error: "Enter a valid email address or leave it blank." }, noStore(400));
  }

  const result = await submitCorrectionReport({
    service_slug: serviceSlug,
    report_type: reportType as "incorrect_fee" | "outdated_requirement" | "broken_link" | "other",
    message,
    contact_email: contactEmail || null,
  });

  if (!result.ok && result.reason === "not_configured") {
    return Response.json(
      { error: "Correction submission is not enabled yet. The public site works without a database." },
      noStore(503),
    );
  }

  if (!result.ok) {
    return Response.json({ error: "We could not save the report. Please try again later." }, noStore(502));
  }

  return Response.json({ ok: true }, noStore());
}
