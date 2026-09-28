import Link from "next/link";
import { getAgency } from "@/lib/data";
import type { Service } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

export function ServiceCard({ service }: { service: Service }) {
  const agency = getAgency(service.agencySlug);

  return (
    <Link className="service-card" href={"/services/" + service.slug}>
      <div className="card-topline">
        <span>{service.category}</span>
        <StatusBadge status={service.status} />
      </div>
      <h3>{service.shortTitle}</h3>
      <p>{service.summary}</p>
      <div className="service-meta">
        <strong>{service.feeLabel}</strong>
        <span>{agency?.shortName}</span>
      </div>
    </Link>
  );
}
