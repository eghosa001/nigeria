import Link from "next/link";
import type { Service } from "@/lib/types";
import { getServiceJourney } from "@/lib/journey";

export function ServiceJourney({ service }: { service: Service }) {
  const journey = getServiceJourney(service);

  return (
    <section className="journey-section" id="journey">
      <div className="section-heading journey-heading">
        <div>
          <span className="eyebrow">How to get this service</span>
          <h2>Online, physical or both?</h2>
        </div>
        <span className={"journey-mode journey-mode-" + journey.mode}>{journey.modeLabel}</span>
      </div>

      <div className="journey-grid">
        <article className="journey-card journey-card-primary">
          <span className="journey-number" aria-hidden="true">01</span>
          <span className="journey-label">Recommended start</span>
          <h3>{journey.startLabel}</h3>
          <p>{journey.startDetail}</p>
          {service.officialPortal ? (
            <a className="text-link" href={service.officialPortal} target="_blank" rel="noreferrer">
              Open official online route ↗
            </a>
          ) : null}
        </article>

        <article className="journey-card">
          <span className="journey-number" aria-hidden="true">02</span>
          <span className="journey-label">Physical visit</span>
          <h3>{journey.physicalLabel}</h3>
          <p>
            {journey.physicalStatus === "required"
              ? "Do not assume the online form means the whole process is online. Complete the physical stage listed in the steps below."
              : journey.physicalStatus === "may-be-required"
                ? "The official process can involve an office, institution or accredited centre depending on your case."
                : "Our current official sources do not state a compulsory walk-in step for the standard route."}
          </p>
          <Link className="text-link" href="/offices">Find official offices/centres →</Link>
        </article>

        <article className="journey-card">
          <span className="journey-number" aria-hidden="true">03</span>
          <span className="journey-label">Fallback</span>
          <h3>{journey.alternativeLabel}</h3>
          <p>{journey.alternativeDetail}</p>
          <Link className="text-link" href={"/agencies/" + service.agencySlug}>View agency guidance →</Link>
        </article>
      </div>

      <div className="journey-trust-note">
        <span aria-hidden="true">✓</span>
        <p><strong>Only authorised routes.</strong> We never present an unofficial agent, cybercafé or third-party payment page as an alternative unless the responsible agency authorises it.</p>
      </div>
    </section>
  );
}
