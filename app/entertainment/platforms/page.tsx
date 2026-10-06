import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { entertainmentTitles } from "@/lib/entertainment";
import { entertainmentPlatformHubs } from "@/lib/entertainment-platform-hubs";
import { platformGuides } from "@/lib/entertainment-extras";

export const metadata: Metadata = {
  title: "Where to Watch Nigerian Movies",
  description: "Compare Nigerian movie coverage across Netflix, Prime Video, YouTube, Kava, cinemas and Africa Magic, with verified source links and platform-specific guides.",
  alternates: { canonical: "/entertainment/platforms" },
};

export default function EntertainmentPlatformsPage() {
  const primarySlugs = new Set(entertainmentPlatformHubs.map((hub) => hub.slug));
  const additionalGuides = platformGuides.filter((guide) => !primarySlugs.has(guide.slug));

  return (
    <section className="section page-top">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Entertainment", href: "/entertainment" }, { label: "Platforms" }]} />
        <span className="eyebrow">Streaming & cinema platforms</span>
        <h1>Where to watch Nigerian movies.</h1>
        <p className="page-intro">Start with the major platforms below. MyNigeriaGuide only counts a movie when its current source is recorded, and availability notes remain visible when a service can vary by account or territory.</p>

        <div className="service-grid top-gap">
          {entertainmentPlatformHubs.map((hub) => {
            const titleCount = entertainmentTitles.filter((title) => title.watchLinks.some((link) => link.platform === hub.platform)).length;
            return (
              <article className="service-card" key={hub.slug}>
                <div className="card-topline"><span>{hub.status}</span><span>Checked {hub.lastChecked}</span></div>
                <h2><Link href={hub.href}>{hub.name}</Link></h2>
                <p>{hub.summary}</p>
                <div className="service-meta">
                  <strong>{titleCount} verified movie guide{titleCount === 1 ? "" : "s"}</strong>
                  <Link href={hub.href}>Browse {hub.name} →</Link>
                </div>
                <a className="text-link" href={hub.officialUrl} target="_blank" rel="noreferrer">Official source ↗</a>
              </article>
            );
          })}
        </div>

        {additionalGuides.length ? (
          <>
            <div className="section-heading top-gap">
              <div>
                <span className="eyebrow">Additional legal sources</span>
                <h2>Other Nigerian movie services and catalogs.</h2>
              </div>
            </div>
            <div className="service-grid">
              {additionalGuides.map((platform) => (
                <article className="service-card" key={platform.slug}>
                  <div className="card-topline"><span>{platform.status}</span><span>Checked {platform.lastChecked}</span></div>
                  <h3>{platform.name}</h3>
                  <p>{platform.summary}</p>
                  {platform.offlineLabel ? <p><strong>Offline:</strong> {platform.offlineLabel}</p> : null}
                  <div className="service-meta">
                    <strong>Verify each title before use</strong>
                    <a href={platform.officialUrl} target="_blank" rel="noreferrer">Official platform →</a>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
