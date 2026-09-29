import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Entertainment Image Rights Policy",
  description: "How MyNigeriaGuide decides whether a movie poster, still or promotional image may be displayed.",
  alternates: { canonical: "/entertainment/image-rights" },
};

export default function EntertainmentImageRightsPage() {
  return (
    <section className="section page-top">
      <div className="container narrow-wide">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Entertainment", href: "/entertainment" },
          { label: "Image rights" },
        ]} />
        <span className="eyebrow">Entertainment media policy</span>
        <h1>No poster without a recorded rights basis.</h1>
        <p className="page-intro">
          Public availability does not automatically make a movie poster, still, thumbnail or cast photo free to copy. MyNigeriaGuide hides artwork unless its reuse basis is documented.
        </p>

        <div className="policy-stack top-gap">
          <section><strong>1</strong><div><h2>Approved sources only</h2><p>Accepted bases are a press kit that permits the use, direct permission, a separate licence, or a valid Creative Commons licence.</p></div></section>
          <section><strong>2</strong><div><h2>Source and credit required</h2><p>The record must include the image source, rights-holder or required credit, licence/permission note and the date it was checked.</p></div></section>
          <section><strong>3</strong><div><h2>Unclear means hidden</h2><p>If any required field is missing, the public page displays a branded placeholder instead of the image.</p></div></section>
          <section><strong>4</strong><div><h2>YouTube is treated separately</h2><p>An official YouTube movie can be linked or embedded using YouTube's player when embedding is allowed. Its thumbnail is not copied into our poster library unless we independently have image-use rights.</p></div></section>
        </div>

        <div className="related-links top-gap">
          <Link href="/entertainment">Back to Entertainment →</Link>
          <Link href="/entertainment/movies">Browse movies →</Link>
        </div>
      </div>
    </section>
  );
}
