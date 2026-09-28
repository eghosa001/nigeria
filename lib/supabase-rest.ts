export type CorrectionReport = {
  service_slug: string;
  report_type: "incorrect_fee" | "outdated_requirement" | "broken_link" | "other";
  message: string;
  contact_email?: string | null;
};

export function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY);
}

export async function insertCorrectionReport(report: CorrectionReport) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return { ok: false as const, reason: "not_configured" as const };
  }

  const response = await fetch(url + "/rest/v1/govguide_user_reports", {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: "Bearer " + key,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(report),
    cache: "no-store",
  });

  if (!response.ok) {
    return { ok: false as const, reason: "database_error" as const, status: response.status };
  }

  return { ok: true as const };
}
