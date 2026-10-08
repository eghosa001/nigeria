import type { Metadata } from "next";
import Link from "next/link";
import { GuideAssistant } from "@/components/guide-assistant";

export const metadata: Metadata = {
  alternates: { canonical: "/assistant" },
  title: "GovGuide Assistant",
  description: "Describe a Nigerian government task in plain language and find the closest verified GovGuide service pages.",
};

export default function AssistantPage() {
  return (
    <section className="section page-top">
      <div className="container narrow-wide">
        <GuideAssistant />

        <article className="assistant-card">
          <span className="eyebrow">How this works</span>
          <h2>Find the right Nigerian service guide without guessing the agency name.</h2>
          <p>
            The MyNigeriaGuide Assistant is a guide finder, not a chatbot that invents government procedures.
            Enter the task you are trying to complete in ordinary language and it searches the site&apos;s verified
            service directory for the closest matches. Each result opens a full MyNigeriaGuide page with the
            responsible agency, current requirements, fees or fee guidance, steps, source links and the date the
            information was last checked.
          </p>
          <p>
            This is useful when you know the problem but not the official service name. For example, you can ask
            about renewing a Nigerian passport, correcting NIN details, registering a company, getting a police
            character certificate or handling a JAMB process. If the first search is too specific, shorten it to
            the main task, document or agency.
          </p>

          <h2>Popular verified guides</h2>
          <div className="related-links">
            <Link href="/services/passport-renewal">Renew a Nigerian passport →</Link>
            <Link href="/services/nin-phone-modification">Change a phone number on NIN →</Link>
            <Link href="/services/cac-company-registration">Register a company with CAC →</Link>
            <Link href="/services/police-character-certificate">Get a police character certificate →</Link>
            <Link href="/services/jamb-direct-entry-2026">JAMB Direct Entry guide →</Link>
          </div>

          <h2>What to check before you act</h2>
          <p>
            Government procedures can change. Before paying, travelling to an office or uploading documents,
            open the matched guide and check its verification date and official source links. MyNigeriaGuide
            separates verified guidance from pages that are still under review, and it links to the responsible
            authority whenever an official online portal is available.
          </p>
          <p>
            If you already know the service name, you can also browse the full <Link href="/services">services directory</Link>,
            compare common charges on the <Link href="/fees">fees page</Link>, or use the site search to find the
            exact guide directly.
          </p>
        </article>
      </div>
    </section>
  );
}
