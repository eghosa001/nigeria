import type { VerificationStatus } from "@/lib/types";

const labels: Record<VerificationStatus, string> = {
  verified: "Verified",
  conflict: "Official sources conflict",
  review: "Review pending",
};

export function StatusBadge({ status }: { status: VerificationStatus }) {
  return <span className={"status-badge status-" + status}>{labels[status]}</span>;
}
