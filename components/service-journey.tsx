import Link from "next/link";
import type { Service } from "@/lib/types";
import { getServiceJourney } from "@/lib/journey";
import { getDetailedServiceGuidance } from "@/lib/service-guidance";
import { getOfficialServiceLinks } from "@/lib/official-links";

export function ServiceJourney({ service }: { service: Service }) {
  const journey = getServiceJourney(service);
  const guidance = getDetailedServiceGuidance(service);
  const officialLinks = getOfficialServiceLinks(service);

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
          <h3>{guidance.route.startTitle}</h3>
          <p>{guidance.route.startDetail}</p>
          <div className="official-link-stack">
            {officialLinks.guidanceUrl && officialLinks.guidanceLabel ? (
              <a className="text-link official-service-link" data-official-purpose="guidance" href={officialLinks.guidanceUrl} target="_blank" rel="noreferrer">
                {officialLinks.guidanceLabel}
              </a>
            ) : null}
            {officialLinks.actionUrl && officialLinks.actionLabel ? (
              <a className="text-link official-service-link" data-official-purpose="action" href={officialLinks.actionUrl} target="_blank" rel="noreferrer">
                {officialLinks.actionLabel}
              </a>
            ) : null}
          </div>
        </article>

        <article className="journey-card">
          <span className="journey-number" aria-hidden="true">02</span>
          <span className="journey-label">Physical / assisted stage</span>
          <h3>{guidance.route.physicalTitle}</h3>
          <p>{guidance.route.physicalDetail}</p>
          <Link className="text-link" href="/offices">Find official offices/centres →</Link>
        </article>

        <article className="journey-card">
          <span className="journey-number" aria-hidden="true">03</span>
          <span className="journey-label">If something blocks you</span>
          <h3>{guidance.route.fallbackTitle}</h3>
          <p>{guidance.route.fallbackDetail}</p>
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
