import type { Metadata } from "next";

export const metadata: Metadata = { title: "Editorial policy", alternates: { canonical: "/editorial-policy" } };

export default function EditorialPolicyPage() {
  return (
    <section className="section page-top"><div className="container narrow policy-page">
      <span className="eyebrow">Trust</span><h1>Editorial policy</h1>
      <p className="page-intro">Accuracy and traceability take priority over publishing more pages.</p>
      <h2>Source priority</h2><p>MyNigeriaGuide prefers the responsible agency's current website, official portal, gazette, circular, service charter or published document. Secondary sources are not used to silently override an official source.</p>
      <h2>Publication states</h2><p><strong>Verified</strong> means the core guide is supported by current official sources. If older official pages still differ, the guide explains that discrepancy without treating the whole service as unreliable. <strong>Review</strong> means the guide is not public.</p>
      <h2>Change detection</h2><p>High-value source pages are monitored for important marker changes. A detected change triggers review; it does not automatically rewrite the public guide.</p>
      <h2>Dates and scope</h2><p>Each public guide shows a last-checked date. Fees and requirements are described for the population and application route supported by the source, rather than being generalized to every applicant.</p>
      <h2>Automation</h2><p>Automation may help find or compare source changes, but publication decisions require source-backed review. MyNigeriaGuide does not use generated text as a substitute for an official source.</p>
    </div></section>
  );
}
