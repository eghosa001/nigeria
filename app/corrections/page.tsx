import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Corrections policy",
  description: "How to report an error in a MyNigeriaGuide guide and how we check updates against reliable sources.",
  alternates: { canonical: "/corrections" },
};

export default function CorrectionsPage() {
  return (
    <section className="section page-top">
      <div className="container narrow policy-page">
        <span className="eyebrow">Accuracy</span>
        <h1>Corrections policy</h1>
        <p className="page-intro">
          Information can change, especially application deadlines, government requirements,
          official fees, film availability and travel details. We welcome corrections.
        </p>

        <h2>How to report an error</h2>
        <p>
          Email <a href="mailto:contact@mynigeriaguide.com">contact@mynigeriaguide.com</a> with
          the page link, what appears incorrect and, if possible, a link to the current
          official information. Do not send passwords, identity numbers or financial details.
        </p>

        <h2>What happens next</h2>
        <p>
          We review reports against reliable sources and update the relevant guide when a
          correction is supported. If the available sources disagree, we aim to explain the
          uncertainty rather than guess. An external website may change after we check it.
        </p>

        <h2>Find the relevant guide</h2>
        <p>
          <Link className="text-link" href="/services">Browse service guides →</Link>{" "}
          or <Link className="text-link" href="/contact">contact MyNigeriaGuide →</Link>.
        </p>
      </div>
    </section>
  );
}
