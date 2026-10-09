import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact MyNigeriaGuide",
  description: "Contact MyNigeriaGuide about corrections, website feedback and partnerships, or find the right official service support channel.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="section page-top">
      <div className="container narrow policy-page">
        <span className="eyebrow">Contact</span>
        <h1>Contact MyNigeriaGuide</h1>
        <p className="page-intro">
          For corrections, feedback and partnerships, email{" "}
          <a href="mailto:contact@mynigeriaguide.com">contact@mynigeriaguide.com</a>.
        </p>

        <h2>Report an incorrect guide</h2>
        <p>
          Include the link to the page, the detail that needs checking and any relevant
          official source. See <Link href="/corrections">how corrections are handled</Link>.
        </p>

        <h2>Government applications and appointments</h2>
        <p>
          MyNigeriaGuide is independent and cannot process applications or change records
          for government agencies. For application support, use the responsible agency's
          official website or <Link href="/offices">find an official office</Link>.
        </p>

        <p>
          Please do not email identity numbers, passport details, bank-card information,
          passwords or other sensitive personal information.
        </p>
      </div>
    </section>
  );
}
