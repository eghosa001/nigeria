import Link from "next/link";
import { CategoryIcon } from "@/components/category-icon";
import { getAgency } from "@/lib/data";
import type { Service } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

export function ServiceCard({ service }: { service: Service }) {
  const agency = getAgency(service.agencySlug);

  return (
    <Link className="service-card" href={"/services/" + service.slug}>
      <div className="card-topline">
        <span className="service-card-category">
          <span className="service-card-icon"><CategoryIcon category={service.category} /></span>
          {service.category}
        </span>
        <StatusBadge status={service.status} />
      </div>
      <h3>{service.shortTitle}</h3>
      <p>{service.summary}</p>
      <div className="service-meta">
        <span>
          <small>Fee / status</small>
          <strong>{service.feeLabel}</strong>
        </span>
        <span className="service-agency">{agency?.shortName}</span>
        <span className="service-card-arrow" aria-hidden="true">↗</span>
      </div>
    </Link>
  );
}
