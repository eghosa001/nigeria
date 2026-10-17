import Link from "next/link";
import type { Service } from "@/lib/types";
import { getServiceJourney, hasReviewedServiceJourney } from "@/lib/journey";
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
          <h2>{journey.mode === "ussd" ? "Choose the correct USSD or support route" : "Choose the correct application route"}</h2>
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
{journey.physicalStatus !== "not-stated" && service.slug !== "nigeria-landing-exit-card" ? (
            <Link className="text-link" href="/offices">Find official offices/centres →</Link>
          ) : null}
        </article>

        <article className="journey-card" data-journey-basis={hasReviewedServiceJourney(service.slug) ? "individually-reviewed" : "general-guidance"}>
          <span className="journey-number" aria-hidden="true">03</span>
          {hasReviewedServiceJourney(service.slug) ? (
            <>
              <span className="journey-label">If your situation is different</span>
              <h3>{journey.alternativeLabel}</h3>
              <p>{journey.alternativeDetail}</p>
              <a className="text-link" href="#official-sources">Check the cited official sources ↓</a>
            </>
          ) : (
            <>
              <span className="journey-label">If something blocks you</span>
              <h3>{guidance.route.fallbackTitle}</h3>
              <p>{guidance.route.fallbackDetail}</p>
              <Link className="text-link" href={"/agencies/" + service.agencySlug}>View agency guidance →</Link>
            </>
          )}
        </article>
      </div>

      {hasReviewedServiceJourney(service.slug) ? (
        <p className="journey-evidence-note">This alternative is based on the reviewed process for this specific service, not an assumed shortcut. Check the linked issuer before paying or submitting information.</p>
      ) : null}

      <div className="journey-trust-note">
        <span aria-hidden="true">✓</span>
        <p><strong>Only authorised routes.</strong> We never present an unofficial agent, cybercafé or third-party payment page as an alternative unless the responsible agency authorises it.</p>
      </div>
    </section>
  );
}
