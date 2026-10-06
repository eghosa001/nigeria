import type { Service } from "@/lib/types";
import { getServiceJourney } from "@/lib/journey";
import { getDetailedServiceGuidance } from "@/lib/service-guidance";
import { getRequirementDetails } from "@/lib/requirement-details";

export function ServiceFaqs({ service }: { service: Service }) {
  const journey = getServiceJourney(service);
  const guidance = getDetailedServiceGuidance(service);
  const requirementDetails = getRequirementDetails(service);
  const safetyNotes = service.notes.slice(0, 2);

  return (
    <section id="questions">
      <span className="section-number" aria-hidden="true">04</span>
      <h2>Common questions about {service.shortTitle}</h2>
      <p className="guide-section-intro">
        These answers use the verified requirements, route, fee, timeline and official-source notes for {service.shortTitle}.
      </p>
      <div className="faq-list">
        <details>
          <summary>What should I prepare before I start?</summary>
          <div className="faq-answer">
            <p>Prepare before you begin by gathering every item below. The detailed checklist above explains why each one is needed, where it is used, and whether the official source specifies an original, copy or upload.</p>
            <ul>{requirementDetails.map((item) => <li key={item.item}><strong>{item.item}</strong> — {item.kind}</li>)}</ul>
          </div>
        </details>

        <details>
          <summary>Can I do this online, or do I need to visit an office?</summary>
          <div className="faq-answer">
            <p><strong>{journey.modeLabel}.</strong> {guidance.route.startDetail}</p>
            <p>{guidance.route.physicalDetail}</p>
          </div>
        </details>

        <details>
          <summary>How much does this service cost?</summary>
          <div className="faq-answer">
            <p><strong>{service.feeLabel}</strong>{service.feeNote ? " — " + service.feeNote : "."}</p>
            <p>Pay only through the responsible agency or the official payment channel linked in this guide.</p>
          </div>
        </details>

        <details>
          <summary>How long should it take?</summary>
          <div className="faq-answer">
            <p>{service.timeline ?? "The responsible agency does not currently publish a reliable fixed completion timeline in the official sources used for this guide."}</p>
            <p>Processing can still take longer where identity checks, document corrections, payment confirmation or manual review are required.</p>
          </div>
        </details>

        <details>
          <summary>What happens after I submit or complete the main step?</summary>
          <div className="faq-answer">
            <p><strong>{guidance.aftercare[0]?.title}:</strong> {guidance.aftercare[0]?.detail}</p>
            {guidance.aftercare[1] ? <p><strong>{guidance.aftercare[1].title}:</strong> {guidance.aftercare[1].detail}</p> : null}
          </div>
        </details>

        <details>
          <summary>What should I do if the portal, payment or application gets stuck?</summary>
          <div className="faq-answer">
            <p>{guidance.route.fallbackDetail}</p>
            <p>Keep any application number, receipt, acknowledgement, transaction reference or screenshot that can help the agency trace the request.</p>
          </div>
        </details>

        <details>
          <summary>What should I be careful about?</summary>
          <div className="faq-answer">
            {safetyNotes.length ? <ul>{safetyNotes.map((note) => <li key={note}>{note}</li>)}</ul> : <p>Use only the official route and verify all personal details before submission or payment.</p>}
          </div>
        </details>

        <details>
          <summary>How do I verify that these instructions are current?</summary>
          <div className="faq-answer">
            <p>This guide was last checked on <strong>{service.lastVerified}</strong>. The official government or agency sources used to verify it are listed directly below this section.</p>
            <p>Where an agency changes a fee, deadline or procedure, the official source takes priority over this independent guide.</p>
          </div>
        </details>

        <details>
          <summary>Is MyNigeriaGuide the government website for this service?</summary>
          <div className="faq-answer">
            <p>No. MyNigeriaGuide is an independent information service. Applications, payments, approvals and final decisions remain with the responsible government agency.</p>
          </div>
        </details>
      </div>
    </section>
  );
}
