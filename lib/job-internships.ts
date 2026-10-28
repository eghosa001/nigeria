import type { CareerOpportunity } from "@/lib/jobs";
import { getEffectiveJobStatus, todayIsoNigeria } from "@/lib/job-runtime";

// A career portal mentioning interns is not an internship vacancy.
// Only show a specific, currently actionable internship/programme here.
export function isCurrentInternshipOpportunity(
  item: CareerOpportunity,
  today = todayIsoNigeria(),
): boolean {
  if (item.kind === "career-page" || item.status === "career-page") return false;
  if (!["open", "upcoming"].includes(getEffectiveJobStatus(item, today))) return false;
  return /\b(intern(?:ship)?s?|siwes|industrial training|industrial attachment)\b/i.test(
    item.title + " " + item.employmentType,
  );
}
