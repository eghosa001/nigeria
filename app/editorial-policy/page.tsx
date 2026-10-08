import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial and Content Standards",
  description: "How MyNigeriaGuide checks sources, originality, editorial depth, media rights and timely corrections across its four Nigerian information sections.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <section className="section page-top"><div className="container narrow policy-page">
      <span className="eyebrow">Editorial standards</span>
      <h1>What we require before publishing a guide</h1>
      <p className="page-intro">MyNigeriaGuide values useful, original explanations over the number of pages published. This policy covers Movies &amp; Entertainment, Services, Tour Nigeria and Jobs &amp; Careers.</p>
      <h2>Independent sourcing</h2>
      <p>We prioritise current information from the responsible agency, employer, event organiser, film distributor or other primary source. A social trend is a reason to investigate, not proof of a claim. A guide should explain conflicts, uncertainty and the date when important facts were checked; a cited link does not guarantee that the source will never change.</p>
      <h2>Substantial, original reader value</h2>
      <p>We require a clear answer and useful steps, comparisons, viewing information, travel logistics or career guidance. Unedited generated text, recycled press releases, keyword-stuffed variants and repeated boilerplate do not meet this standard. A concise verified reference listing is not presented as a comprehensive article merely because its layout adds words.</p>
      <h2>Publication and automation</h2>
      <p>Automation may help locate changes and organise information, but generated wording is not proof of its own accuracy. Incomplete pages should remain in review, appear only as directory references when appropriate, or be combined with stronger existing guides. Existing pages should be improved before creating a second URL for the same question.</p>
      <h2>Media and restricted material</h2>
      <p>Movie posters, trailers, photos and videos require a legitimate source and permitted usage. We do not publish pirated films, copyrighted downloads, misleading commercial links, dangerous instructions or other restricted content. External watch links do not mean MyNigeriaGuide hosts those films.</p>
      <h2>Correction and transparency</h2>
      <p>Costs, deadlines, job status, availability and travel details can change. We aim to correct material errors using source evidence, not unverified requests. See <Link href="/corrections">our corrections policy</Link>, <Link href="/about">about the site</Link> and <Link href="/contact">contact information</Link>. MyNigeriaGuide does not collect government application fees or guarantee employment or travel reservations.</p>
    </div></section>
  );
}
