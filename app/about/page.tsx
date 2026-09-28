import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How verification works",
  description: "How GovGuide Nigeria verifies government service information and handles conflicting sources.",
};

export default function AboutPage() {
  return (
    <section className="section page-top">
      <div className="container narrow">
        <span className="eyebrow">Trust policy</span>
        <h1>How GovGuide verifies information</h1>
        <p className="page-intro">
          GovGuide Nigeria is an independent information service. It is not affiliated with the Federal Government of Nigeria or any government agency.
        </p>

        <div className="policy-stack">
          <section>
            <strong>1</strong>
            <div><h2>Official sources first</h2><p>Fees, requirements and timelines should be tied to the responsible agency's website, portal, gazette, circular or published document wherever possible.</p></div>
          </section>
          <section>
            <strong>2</strong>
            <div><h2>Every important fact keeps a date</h2><p>Guides display when the underlying source was checked so readers can judge how current the information is.</p></div>
          </section>
          <section>
            <strong>3</strong>
            <div><h2>Conflicts stay visible</h2><p>If two official pages disagree, the guide is marked as a conflict. We do not quietly pick whichever figure looks newer without evidence.</p></div>
          </section>
          <section>
            <strong>4</strong>
            <div><h2>Payments stay on official channels</h2><p>GovGuide does not collect passport, NIN, licence, CAC or other government application fees.</p></div>
          </section>
        </div>
      </div>
    </section>
  );
}
