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

        <section className="top-gap" aria-labelledby="watch-choice-heading">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Choose a viewing route</span>
              <h2 id="watch-choice-heading">Watch a Nigerian movie without guessing the source.</h2>
            </div>
          </div>
          <div className="service-grid">
            <article className="service-card">
              <h3>Looking for free full movies?</h3>
              <p>Start with a filmmaker's or authorised distributor's official YouTube channel. Open the movie detail first, check the uploader and availability, and avoid reuploads that do not identify rights holders.</p>
              <p><Link href="/entertainment/youtube">Browse Nigerian movies on YouTube →</Link></p>
            </article>
            <article className="service-card">
              <h3>Have a streaming subscription?</h3>
              <p>Use a title's official Netflix, Prime Video or other provider link instead of assuming it appears in every country. Catalogs can change; confirm the title in your own account before subscribing.</p>
              <p><Link href="/entertainment/movies">Find a film and its available platforms →</Link></p>
            </article>
            <article className="service-card">
              <h3>Prefer the cinema?</h3>
              <p>Check a cinema's own listing for your city, date and showtime. A trailer, announced release or film classification is not proof that tickets are currently on sale.</p>
              <p><Link href="/entertainment/cinemas">Check Nigerian cinema releases →</Link></p>
            </article>
          </div>
          <p className="top-gap">For age suitability, check the official <a href="https://nfvcb.gov.ng/" target="_blank" rel="noreferrer">National Film and Video Censors Board</a> classification guidance. Its classification is separate from a title's streaming availability.</p>
        </section>

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
