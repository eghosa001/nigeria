import { daysSinceIsoDate, freshnessPolicy, getFreshnessState, type FreshnessState } from "@/lib/content-freshness";

export type ServiceReviewState = "current" | "recheck-due" | "older-review" | "invalid-date";

export function getServiceReviewStatus(lastVerified: string, now = new Date()): { state: ServiceReviewState; days: number | null; message: string } {
  const status: FreshnessState = getFreshnessState(lastVerified, freshnessPolicy.services, now);
  const age = daysSinceIsoDate(lastVerified, now);
  const days = Number.isFinite(age) && age >= 0 ? age : null;
  if (status === "unknown" || status === "future") {
    return { state: "invalid-date", days: null, message: "This source-review date cannot be confirmed. Check the official links before relying on fees, deadlines or application requirements." };
  }
  if (status === "stale") {
    return { state: "older-review", days, message: "This guide's source review is more than 30 days old. Its information has not been reconfirmed recently; check the responsible agency before taking action." };
  }
  if (status === "due") {
    return { state: "recheck-due", days, message: "This guide is due for another source review. Its information has not been reverified today; confirm important fees, deadlines and procedures on the linked official sources." };
  }
  return { state: "current", days, message: "This is the recorded source-review date, not the time of the latest website code update." };
}
