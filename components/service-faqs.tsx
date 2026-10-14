import type { Service } from "@/lib/types";
import { getDetailedServiceGuidance } from "@/lib/service-guidance";

export function ServiceFaqs({ service }: { service: Service }) {
  const guidance = getDetailedServiceGuidance(service);
  const safetyNotes = service.notes.slice(0, 2);

  // Fee, requirements, online route and timeline already have dedicated
  // answer-first sections. Repeat none of them as boilerplate FAQs.
  return (
    <section id="questions">
      <span className="section-number" aria-hidden="true">04</span>
      <h2>Extra help with {service.shortTitle}</h2>
      <div className="faq-list">
        <details>
          <summary>What if the application or official service does not work?</summary>
          <div className="faq-answer">
            <p>{guidance.route.fallbackDetail}</p>
          </div>
        </details>
        {safetyNotes.length ? (
          <details>
            <summary>What should I be careful about?</summary>
            <div className="faq-answer"><ul>{safetyNotes.map((note) => <li key={note}>{note}</li>)}</ul></div>
          </details>
        ) : null}
        <details>
          <summary>How do I check that these instructions are current?</summary>
          <div className="faq-answer">
            <p>Last checked {service.lastVerified}. Review the official agency links below before submitting sensitive information or paying a fee.</p>
            <p>MyNigeriaGuide is independent of the responsible agency. Only the agency can approve, issue or correct your application.</p>
          </div>
        </details>
      </div>
    </section>
  );
}
