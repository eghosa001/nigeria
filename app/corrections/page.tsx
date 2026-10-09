import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Corrections policy", description: "How MyNigeriaGuide verifies service changes, updates incorrect information and handles reader reports with links to official sources.", alternates: { canonical: "/corrections" } };

export default function CorrectionsPage() {
  return (
    <section className="section page-top"><div className="container narrow policy-page">
      <span className="eyebrow">Accuracy</span><h1>Corrections policy</h1>
      <p className="page-intro">A useful government-service guide has to change when the underlying official information changes.</p>
      <h2>Report a problem</h2><p>When persistent reporting is configured, service guides show a correction form for fees, requirements, process changes and broken official links. Without a report backend, MyNigeriaGuide hides the unusable form and instead points readers to the official sources while automated source monitoring continues.</p>
      <h2>How reports are handled</h2><p>A report is evidence to investigate, not evidence to publish. The cited official source is rechecked before a public guide is changed.</p>
      <h2>Material corrections</h2><p>Fee, eligibility, document, deadline, portal and official-contact changes are treated as material. When official sources conflict, the guide is marked as a conflict rather than presenting one source as settled fact.</p>
      <h2>Find the affected guide</h2><p><Link className="text-link" href="/services">Search the service directory →</Link></p>
    </div></section>
  );
}
