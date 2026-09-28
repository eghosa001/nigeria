import { isReportBackendConfigured, submitCorrectionReport } from "@/lib/report-backend";

const allowedTypes = new Set(["incorrect_fee", "outdated_requirement", "broken_link", "other"]);

export async function GET() {
  return Response.json({ configured: isReportBackendConfigured() });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return Response.json({ ok: true });
  }

  const serviceSlug = typeof body.service_slug === "string" ? body.service_slug.trim() : "";
  const reportType = typeof body.report_type === "string" ? body.report_type : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const contactEmail = typeof body.contact_email === "string" ? body.contact_email.trim() : "";

  if (!serviceSlug || serviceSlug.length > 120 || !allowedTypes.has(reportType)) {
    return Response.json({ error: "Invalid report details." }, { status: 400 });
  }

  if (message.length < 10 || message.length > 4000) {
    return Response.json({ error: "Please describe the issue in 10–4000 characters." }, { status: 400 });
  }

  if (contactEmail.length > 254) {
    return Response.json({ error: "Email address is too long." }, { status: 400 });
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
      { status: 503 },
    );
  }

  if (!result.ok) {
    return Response.json({ error: "We could not save the report. Please try again later." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
