import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How MyNigeriaGuide uses local storage, Google Analytics, correction-report data and external service links.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="section page-top"><div className="container narrow policy-page">
      <span className="eyebrow">Policy</span><h1>Privacy policy</h1>
      <p className="page-intro">MyNigeriaGuide is designed to work with minimal personal data.</p>
      <h2>Saved guides and local storage</h2><p>When you choose “Watch this guide” or start a process checklist, the relevant guide identifier and progress are stored in your browser on that device. This information is not an active notification subscription and is not uploaded to a MyNigeriaGuide account.</p>
      <h2>Cookies and analytics</h2><p>When analytics is enabled, MyNigeriaGuide uses Google Analytics to understand site usage. Google Analytics may use cookies or similar browser identifiers and can process page views, referral/source information, device or browser information and approximate geographic reporting. MyNigeriaGuide configures analytics with IP anonymisation and does not intentionally send government application credentials, NINs, passport numbers, passwords or payment-card details to analytics.</p>
      <h2>Your browser choices</h2><p>You can clear MyNigeriaGuide local storage or cookies through your browser settings. Blocking analytics cookies may reduce the accuracy of site-usage reporting, while clearing local storage removes saved-guide and checklist progress from that browser.</p>
      <h2>Correction reports</h2><p>When correction reporting is enabled, a report may contain the message you submit and an optional email address if you choose to provide one. The email is used only to clarify the report.</p>
      <h2>Advertising</h2><p>Advertising is currently disabled unless an advertising client and slot are explicitly configured. Before advertising is enabled, MyNigeriaGuide must also enable the consent controls required for the regions where they apply. Advertising providers may then process data under their own privacy terms.</p>
      <h2>Official websites</h2><p>Links to government websites leave MyNigeriaGuide. Those websites have their own privacy and data-handling practices. Do not send MyNigeriaGuide government passwords, card PINs, NINs or passport credentials.</p>
      <p className="policy-date">Last updated: 29 September 2026.</p>
    </div></section>
  );
}
