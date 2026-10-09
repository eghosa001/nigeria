import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "How MyNigeriaGuide sources information, handles images and links, and corrects errors in our Nigerian movies, services, travel and jobs guides.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <section className="section page-top">
      <div className="container narrow policy-page">
        <span className="eyebrow">Editorial policy</span>
        <h1>How we keep our guides useful and accurate</h1>
        <p className="page-intro">
          MyNigeriaGuide helps readers find reliable information about Nigerian movies, everyday services,
          places to visit and job opportunities. Here is how we approach the information we publish.
        </p>

        <h2>Reliable sources</h2>
        <p>
          We prioritise information published by the responsible government agency, employer,
          film distributor, event organiser or other relevant source. Where practical, guides link
          to their sources and show when important details were checked. If sources disagree or
          information is uncertain, we aim to make that clear.
        </p>

        <h2>Useful, original guidance</h2>
        <p>
          Our content should help you make a decision or take a next step — whether that means
          understanding an application process, finding an official job listing, choosing a film
          or planning a visit. We avoid misleading claims, copied material and unnecessary repetition.
        </p>

        <h2>Images, videos and external links</h2>
        <p>
          We use appropriately sourced images and videos and link to legitimate viewing and
          information providers. External websites are run by their respective owners.
          We do not provide pirated films or copyrighted downloads.
        </p>

        <h2>Updates and corrections</h2>
        <p>
          Fees, deadlines, requirements and availability can change. If you spot an error or
          outdated link, please <Link href="/contact">contact us</Link>. We assess corrections
          against available sources and update our guides when needed. You can also read our{" "}
          <Link href="/corrections">corrections policy</Link>.
        </p>

        <p>
          MyNigeriaGuide is independent. We do not collect government application fees or
          guarantee employment, film availability or travel bookings.
        </p>
      </div>
    </section>
  );
}
