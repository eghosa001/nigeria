interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<unknown>;
}

interface D1DatabaseLike {
  prepare(query: string): D1PreparedStatement;
}

export interface Env {
  DB: D1DatabaseLike;
  REPORT_TOKEN?: string;
}

const allowedTypes = new Set(["incorrect_fee", "outdated_requirement", "broken_link", "other"]);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    if (env.REPORT_TOKEN) {
      const auth = request.headers.get("Authorization");
      if (auth !== "Bearer " + env.REPORT_TOKEN) {
        return new Response("Unauthorized", { status: 401 });
      }
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json() as Record<string, unknown>;
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const serviceSlug = typeof body.service_slug === "string" ? body.service_slug.trim() : "";
    const reportType = typeof body.report_type === "string" ? body.report_type : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const contactEmail = typeof body.contact_email === "string" ? body.contact_email.trim() : null;

    if (!serviceSlug || serviceSlug.length > 120 || !allowedTypes.has(reportType)) {
      return Response.json({ error: "Invalid report details" }, { status: 400 });
    }

    if (message.length < 10 || message.length > 4000) {
      return Response.json({ error: "Invalid message length" }, { status: 400 });
    }

    if (contactEmail && contactEmail.length > 254) {
      return Response.json({ error: "Invalid email length" }, { status: 400 });
    }

    await env.DB.prepare(
      `INSERT INTO correction_reports
       (service_slug, report_type, message, contact_email)
       VALUES (?, ?, ?, ?)`,
    ).bind(serviceSlug, reportType, message, contactEmail).run();

    return Response.json({ ok: true }, { status: 201 });
  },
};
