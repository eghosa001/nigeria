import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Entertainment Image Rights Policy",
  description: "How MyNigeriaGuide uses cleared promotional art, official YouTube previews and original generated artwork for movie pages.",
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
        <h1>Every movie gets a visual without copying unclear artwork.</h1>
        <p className="page-intro">
          Public availability does not automatically make a movie poster, still or cast photo free to copy. MyNigeriaGuide uses documented promotional artwork when reuse rights are recorded, official YouTube thumbnails as linked video previews, and original generated artwork when neither is appropriate.
        </p>

        <div className="policy-stack top-gap">
          <section><strong>1</strong><div><h2>Approved sources only</h2><p>Accepted bases are a press kit that permits the use, direct permission, a separate licence, or a valid Creative Commons licence.</p></div></section>
          <section><strong>2</strong><div><h2>Source and credit required</h2><p>The record must include the image source, rights-holder or required credit, licence/permission note and the date it was checked.</p></div></section>
          <section><strong>3</strong><div><h2>Unclear means original</h2><p>If reusable poster rights are not documented, the public page uses a MyNigeriaGuide-created visual based on title metadata rather than copying the poster or a film still.</p></div></section>
          <section><strong>4</strong><div><h2>YouTube is treated separately</h2><p>For movies from approved YouTube publishers or official trailers, MyNigeriaGuide may display the video thumbnail unmodified and linked to the original YouTube source. It is treated as a video preview, not as cleared poster artwork.</p></div></section>
        </div>

        <div className="related-links top-gap">
          <Link href="/entertainment">Back to Entertainment →</Link>
          <Link href="/entertainment/movies">Browse movies →</Link>
        </div>
      </div>
    </section>
  );
}
