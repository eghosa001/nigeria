import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of use", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <section className="section page-top"><div className="container narrow policy-page">
      <span className="eyebrow">Policy</span><h1>Terms of use</h1>
      <p className="page-intro">GovGuide is an independent information service and is not a government agency.</p>
      <h2>Information, not official approval</h2><p>Guides simplify information from cited sources. A GovGuide page does not guarantee that an agency will approve an application or that a process has not changed since the last verification date.</p>
      <h2>Always use official payment channels</h2><p>GovGuide does not collect government fees. Before paying, confirm the amount and payment destination on the linked official agency portal.</p>
      <h2>Conflicting information</h2><p>Where official sources disagree, GovGuide may publish the disagreement rather than selecting a figure without evidence.</p>
      <h2>No professional representation</h2><p>GovGuide does not act as your lawyer, accountant, immigration agent or government representative.</p>
      <h2>External links</h2><p>External government and third-party websites are outside GovGuide's control. Their availability and content can change.</p>
      <p className="policy-date">Last updated: 28 September 2026.</p>
    </div></section>
  );
}
