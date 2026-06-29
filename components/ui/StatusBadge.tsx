import { CaseStatus } from "@/lib/types";

const LABELS: Record<CaseStatus, string> = {
  open: "Open",
  investigating: "Investigating",
  closed: "Closed",
  pendingTrial: "Pending Trial",
};

export function StatusBadge({ status }: { status: CaseStatus }) {
  return <span className={`badge badge-${status}`}>{LABELS[status]}</span>;
}
