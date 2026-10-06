import type { Service } from "@/lib/types";

export function ForeignVisaFaqs({ service }: { service: Service }) {
  if (service.category !== "Foreign visas") return null;

  const financialRequirement = service.requirements.find((item) =>
    /bank|financial|fund|income|salary|pay slip|payslip|sponsor/i.test(item),
  );
  const minorRequirement = service.requirements.find((item) =>
    /under 18|minor|child|parent|guardian|consent/i.test(item),
  );

  return (
    <section id="foreign-visa-questions" className="foreign-visa-faqs">
      <span className="section-number" aria-hidden="true">05</span>
      <h2>Common questions about {service.shortTitle} for Nigerian applicants</h2>
      <p className="guide-section-intro">
        Foreign visa rules are country-specific. These answers explain the issues that commonly cause confusion without inventing a universal bank balance, sponsor rule or appeal process.
      </p>
      <div className="faq-list">
        <details>
          <summary>How much money must be in my bank account?</summary>
          <div className="faq-answer">
            <p>{financialRequirement ?? "The official sources for this visa do not publish one universal minimum bank balance for every applicant."}</p>
            <p>Use the exact financial-evidence rule in the checklist above. The evidence should match who is paying for the trip, the trip length and the application form. Do not rely on an unofficial agent's fixed “required balance” unless the destination authority itself publishes that amount.</p>
          </div>
        </details>

        <details>
          <summary>Can another person or company sponsor my trip?</summary>
          <div className="faq-answer">
            <p>Only use sponsorship where this visa route accepts it. If a sponsor is paying, follow the country-specific checklist for the sponsor letter, relationship to the applicant, identity or immigration-status evidence, financial evidence and any undertaking/responsibility form.</p>
            <p>Sponsorship does not automatically replace documents the destination still requires from the applicant, such as employment, study, business, family or other evidence connected to the applicant's own circumstances.</p>
          </div>
        </details>

        <details>
          <summary>What if the applicant is under 18?</summary>
          <div className="faq-answer">
            <p>{minorRequirement ?? "Minor-applicant rules differ by destination and are not safely interchangeable between countries."}</p>
            <p>Where the detailed checklist above does not list a child rule, open the exact official instructions before submitting. Birth certificates, parental/guardian consent, parent IDs/passports, custody documents and details of the adult travelling with or hosting the child can be required.</p>
          </div>
        </details>

        <details>
          <summary>Should I buy a flight ticket before the visa is approved?</summary>
          <div className="faq-answer">
            <p>Use the type of travel evidence the official checklist asks for. Several visitor-visa systems ask for a reservation or itinerary rather than a non-refundable paid ticket. Do not turn a reservation requirement into an unnecessary non-refundable purchase.</p>
            <p>If this country's official instructions specifically require a paid ticket or another form of confirmed travel, that country-specific requirement takes priority.</p>
          </div>
        </details>

        <details>
          <summary>What happens if the visa is refused?</summary>
          <div className="faq-answer">
            <p>Read the refusal/decision letter first. It should identify the reason and, where the law provides one, the appeal, review or reconsideration route. Some visa systems instead expect a new application.</p>
            <p>If you reapply, address the stated reason and disclose previous refusals whenever the form asks. Do not submit altered, false or contradictory documents to try to overcome a refusal.</p>
          </div>
        </details>

        <details>
          <summary>Does getting the visa guarantee entry at the airport or border?</summary>
          <div className="faq-answer">
            <p>No. A visa normally allows you to travel to a border and request entry; border authorities can still check whether you meet the entry conditions and whether the purpose of travel matches the visa.</p>
          </div>
        </details>

        <details>
          <summary>What should I carry when I actually travel?</summary>
          <div className="faq-answer">
            <p>Keep your passport and visa/eVisa or grant notice accessible. Also carry the important evidence relevant to your trip, such as return/onward travel, accommodation or host details, invitation letter, travel insurance and evidence of funds or sponsorship where those formed part of the visa route.</p>
          </div>
        </details>
      </div>
    </section>
  );
}
