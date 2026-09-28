export type CorrectionReport = {
  service_slug: string;
  report_type: "incorrect_fee" | "outdated_requirement" | "broken_link" | "other";
  message: string;
  contact_email?: string | null;
};

export function isReportBackendConfigured() {
  return Boolean(process.env.MYNIGERIAGUIDE_REPORT_ENDPOINT);
}

export async function submitCorrectionReport(report: CorrectionReport) {
  const endpoint = process.env.MYNIGERIAGUIDE_REPORT_ENDPOINT;
  const token = process.env.MYNIGERIAGUIDE_REPORT_TOKEN;

  if (!endpoint) {
    return { ok: false as const, reason: "not_configured" as const };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: "Bearer " + token } : {}),
    },
    body: JSON.stringify(report),
    cache: "no-store",
  });

  if (!response.ok) {
    return { ok: false as const, reason: "backend_error" as const, status: response.status };
  }

  return { ok: true as const };
}
