import type { Service } from "@/lib/types";
import { getAgency } from "@/lib/data";
import { getServiceJourney } from "@/lib/journey";

export function ServiceStatusStrip({ service }: { service: Service }) {
  const agency = getAgency(service.agencySlug);
  const journey = getServiceJourney(service);
  return (
    <div className="service-status-strip" aria-label="Service at a glance">
      <div><span>Cost</span><strong>{service.feeLabel}</strong></div>
      <div><span>Timeline</span><strong>{service.timeline ?? "No fixed official timeline"}</strong></div>
      <div><span>Route</span><strong>{journey.modeLabel}</strong></div>
      <div><span>Agency</span><strong>{agency?.shortName ?? agency?.name ?? "Official agency"}</strong></div>
      <div><span>Checked</span><strong>{service.lastVerified}</strong></div>
    </div>
  );
}
