import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <section className="section page-top"><div className="container narrow policy-page">
      <span className="eyebrow">Policy</span><h1>Privacy policy</h1>
      <p className="page-intro">GovGuide is designed to work with minimal personal data.</p>
      <h2>Saved guides</h2><p>When you choose “Watch this guide”, the guide identifier is stored in your browser's local storage on that device. It is not an active notification subscription.</p>
      <h2>Correction reports</h2><p>When correction reporting is enabled, a report may contain the message you submit and an optional email address if you choose to provide one. The email is used only to clarify the report.</p>
      <h2>Analytics</h2><p>Analytics is loaded only when the site owner configures the analytics measurement environment variable. GovGuide does not intentionally collect government application credentials, NINs, passport numbers or payment-card details.</p>
      <h2>Advertising</h2><p>Advertising code is disabled unless an advertising client and slot are explicitly configured. If advertising is enabled later, the advertising provider may process data under its own privacy terms.</p>
      <h2>Official websites</h2><p>Links to government websites leave GovGuide. Those websites have their own privacy and data-handling practices.</p>
      <p className="policy-date">Last updated: 28 September 2026.</p>
    </div></section>
  );
}
