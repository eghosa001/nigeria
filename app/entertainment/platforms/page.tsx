import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { entertainmentTitles } from "@/lib/entertainment";
import { platformGuides } from "@/lib/entertainment-extras";

export const metadata: Metadata = {
  title: "Where to Watch Nigerian Movies",
  description: "Compare official Nigerian movie routes across Netflix, YouTube, Prime Video and the Showmax/DStv Stream transition.",
  alternates: { canonical: "/entertainment/platforms" },
};

export default function EntertainmentPlatformsPage() {
  return (
    <section className="section page-top">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Entertainment", href: "/entertainment" }, { label: "Platforms" }]} />
        <span className="eyebrow">Streaming platforms</span>
        <h1>Where Nigerian movies are available.</h1>
        <p className="page-intro">Platform availability changes. These are routing guides, not permanent claims that every title will remain available.</p>
        <div className="service-grid top-gap">
          {platformGuides.map((platform) => {
            const titleCount = entertainmentTitles.filter((title) => title.watchLinks.some((link) => link.platform === platform.name)).length;
            return (
              <article className="service-card" key={platform.slug}>
                <div className="card-topline"><span>{platform.status}</span><span>Checked {platform.lastChecked}</span></div>
                <h3>{platform.name}</h3>
                <p>{platform.summary}</p>
                <div className="service-meta">
                  <strong>{titleCount ? titleCount + " catalog title" + (titleCount === 1 ? "" : "s") : "Platform guide"}</strong>
                  <a href={platform.officialUrl} target="_blank" rel="noreferrer">Official platform →</a>
                </div>
                {titleCount ? <Link className="text-link" href={"/entertainment/movies?platform=" + encodeURIComponent(platform.name)}>Filter movies →</Link> : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
