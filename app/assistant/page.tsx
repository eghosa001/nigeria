import type { Metadata } from "next";
import Link from "next/link";
import { GuideAssistant } from "@/components/guide-assistant";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/assistant" },
  title: "Nigerian Government Service Guide Finder",
  description: "Find verified Nigerian government service guides for passports, NIN, CAC, JAMB, police certificates and other official tasks.",
};

const faq = [
  {
    question: "What can the MyNigeriaGuide Assistant help me find?",
    answer: "It matches plain-language requests to verified Nigerian service guides covering tasks such as passport renewal, NIN changes, CAC registration, JAMB processes and police certificates.",
  },
  {
    question: "Does the assistant give official government advice?",
    answer: "It points you to MyNigeriaGuide pages that cite the responsible agency and official source links. Always confirm the guide verification date before paying or submitting documents.",
  },
  {
    question: "What if I already know the service name?",
    answer: "Use the main Services directory or site search to go directly to the relevant guide.",
  },
] as const;

export default function AssistantPage() {
  return (
    <section className="section page-top">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <div className="container narrow-wide">
        <header className="assistant-card">
          <span className="eyebrow">Nigeria service guide finder</span>
          <h1>Find the right Nigerian government service guide.</h1>
          <p>
            Search verified MyNigeriaGuide guidance for official tasks such as passport renewal, NIN corrections,
            CAC registration, JAMB processes, police certificates, visas, tax and other public services. Describe
            what you need in ordinary language; the finder points you to the closest source-linked guide.
          </p>
          <div className="related-links">
            <Link href="/services">Browse all verified services →</Link>
            <Link href="/categories/education">Education services →</Link>
            <Link href="/categories/foreign-visas">Visa guides →</Link>
            <Link href="/fees">Government fees & charges →</Link>
          </div>
        </header>

        <GuideAssistant />

        <article className="assistant-card">
          <span className="eyebrow">How this works</span>
          <h2>Find the right service without guessing the agency name.</h2>
          <p>
            Enter the task you are trying to complete in ordinary language and the assistant searches the verified
            MyNigeriaGuide service directory for the closest matches. Each result opens a full guide with the
            responsible agency, current requirements, fees or fee guidance, steps, source links and the date the
            information was last checked.
          </p>
          <p>
            This is useful when you know the problem but not the official service name. You can ask about renewing
            a Nigerian passport, correcting NIN details, registering a company, getting a police character
            certificate or handling a JAMB process. If the first search is too specific, shorten it to the main
            task, document or agency.
          </p>

          <h2>Popular verified guides</h2>
          <div className="related-links">
            <Link href="/services/passport-renewal">Renew a Nigerian passport →</Link>
            <Link href="/services/nin-phone-modification">Change a phone number on NIN →</Link>
            <Link href="/services/cac-company-registration">Register a company with CAC →</Link>
            <Link href="/services/police-character-certificate">Get a police character certificate →</Link>
            <Link href="/services/jamb-direct-entry-2026">JAMB Direct Entry guide →</Link>
          </div>

          <h2>Common tasks people use this finder for</h2>
          <div className="related-links">
            <Link href="/services/passport-renewal">Passport renewal and replacement →</Link>
            <Link href="/services/nin-name-modification">NIN name correction →</Link>
            <Link href="/services/cac-business-name-registration">CAC business-name registration →</Link>
            <Link href="/services/jamb-caps">JAMB CAPS admission checks →</Link>
            <Link href="/services/nigeria-landing-exit-card">Nigeria landing and exit card →</Link>
          </div>

          <h2>What to check before you act</h2>
          <p>
            Government procedures can change. Before paying, travelling to an office or uploading documents,
            open the matched guide and check its verification date and official source links. MyNigeriaGuide
            separates verified guidance from pages still under review and links to the responsible authority
            whenever an official online portal is available.
          </p>
          <p>
            If you already know the service name, browse the full <Link href="/services">services directory</Link>,
            compare common charges on the <Link href="/fees">fees page</Link>, or use site search to go directly to
            the exact guide.
          </p>

          <h2>Questions about the guide finder</h2>
          <div className="compact-faq-list">
            {faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
