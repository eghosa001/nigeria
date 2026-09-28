import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Contact MyNigeriaGuide", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <section className="section page-top"><div className="container narrow policy-page">
      <span className="eyebrow">Contact</span><h1>How to reach the right place</h1>
      <p className="page-intro">MyNigeriaGuide is independent, so government application support should go to the responsible agency—not to MyNigeriaGuide.</p>
      <h2>Report incorrect MyNigeriaGuide information</h2><p>Open the affected guide and use its “Report an issue” section. That keeps the report attached to the exact service and source set.</p>
      <h2>Need a government office?</h2><p><Link className="text-link" href="/offices">Use the official office and centre finders →</Link></p>
      <h2>Need application support?</h2><p>Use the official portal or contact details linked from the relevant MyNigeriaGuide service page. Do not send NINs, passport numbers, card details or passwords to MyNigeriaGuide.</p>
      <h2>General product feedback</h2><p>A dedicated MyNigeriaGuide support inbox has not been published yet. This page will be updated when an official contact channel is established.</p>
    </div></section>
  );
}
