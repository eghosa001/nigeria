import Link from "next/link";
import type { Service } from "@/lib/types";
import { getDetailedServiceGuidance } from "@/lib/service-guidance";

export function ServiceAftercare({ service }: { service: Service }) {
  const guidance = getDetailedServiceGuidance(service);

  return (
    <section className="aftercare-section" id="after-submit">
      <span className="eyebrow">After you submit</span>
      <h2>What happens after {service.shortTitle}?</h2>

      <div className="aftercare-grid">
        {guidance.aftercare.map((item, index) => (
          <div key={item.title}>
            <span className="aftercare-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.title}</strong>
            <p>{item.detail}</p>
            {item.linkHref && item.linkLabel ? <Link className="text-link" href={item.linkHref}>{item.linkLabel}</Link> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
