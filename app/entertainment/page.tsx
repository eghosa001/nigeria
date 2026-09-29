import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { entertainmentTitles, getPlatformCount } from "@/lib/entertainment";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nigerian Movies & Entertainment",
  description: "Discover Nigerian movies and follow verified official links to watch them on Netflix, YouTube and other supported platforms.",
  alternates: { canonical: "/entertainment" },
};

export default function EntertainmentPage() {
  const featured = entertainmentTitles.filter((title) => title.featured).slice(0, 6);
  const base = getSiteUrl();

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nigerian Movies & Entertainment",
    description: "A growing guide to Nigerian movies and official places to watch them.",
    url: base + "/entertainment",
    isPartOf: { "@type": "WebSite", name: "MyNigeriaGuide", url: base },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: entertainmentTitles.length,
      itemListElement: entertainmentTitles.map((title, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: title.title,
        url: base + "/entertainment/movies/" + title.slug,
      })),
    },
  };

  return (
    <>
      <JsonLd data={collectionLd} />
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="hero-kicker-dot" aria-hidden="true" />
              Movies &amp; entertainment
            </div>
            <h1>Find Nigerian movies and <span>where to watch them.</span></h1>
            <p className="hero-lead">
              Browse Nollywood and Nigerian films, then open the official Netflix, YouTube or distributor page instead of hunting through unofficial uploads.
            </p>
            <div className="related-links">
              <Link href="/entertainment/movies">Browse all movies →</Link>
              <Link href="/entertainment/movies?platform=YouTube">Full movies on YouTube →</Link>
              <Link href="/entertainment/movies?platform=Netflix">Movies on Netflix →</Link>
            </div>
            <p className="hero-note">
              MyNigeriaGuide links out to official platforms. We do not host or re-upload films.
            </p>
          </div>

          <aside className="trust-panel" aria-label="Entertainment catalog snapshot">
            <div className="trust-panel-top">
              <span className="trust-kicker">Catalog snapshot</span>
              <span className="trust-live"><i aria-hidden="true" />Growing</span>
            </div>
            <strong>{entertainmentTitles.length} verified movie entries</strong>
            <p>Each watch link records where it points and when that availability was checked.</p>
            <div className="trust-metrics">
              <div><strong>{getPlatformCount("YouTube")}</strong><span>YouTube full movies</span></div>
              <div><strong>{getPlatformCount("Netflix")}</strong><span>Netflix titles</span></div>
            </div>
            <div className="trust-row"><span>✓</span><div><strong>Official watch links</strong><small>No piracy mirrors or scraped streaming pages.</small></div></div>
            <div className="trust-row"><span>✓</span><div><strong>Availability dates</strong><small>Streaming catalogs can change by country and time.</small></div></div>
            <div className="trust-row"><span>✓</span><div><strong>Lightweight pages</strong><small>Videos stay on their original platforms until you choose to watch.</small></div></div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Featured movies</span>
              <h2>Start with verified places to watch.</h2>
            </div>
            <Link href="/entertainment/movies">See the full movie catalog →</Link>
          </div>
          <div className="service-grid">
            {featured.map((title) => (
              <article className="service-card" key={title.slug}>
                <div className="card-topline">
                  <span>{title.year}</span>
                  <span>{[...new Set(title.watchLinks.map((link) => link.platform))].join(" · ")}</span>
                </div>
                <h3><Link href={"/entertainment/movies/" + title.slug}>{title.title}</Link></h3>
                <p>{title.synopsis}</p>
                <div className="service-meta">
                  <strong>{title.genres.slice(0, 2).join(" · ")}</strong>
                  <Link href={"/entertainment/movies/" + title.slug}>Open movie →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section premium-dark-section">
        <div className="container">
          <div className="section-heading section-heading-light">
            <div>
              <span className="eyebrow">Choose a platform</span>
              <h2>Go directly to what you can actually watch.</h2>
            </div>
          </div>
          <div className="home-updates-grid">
            <article className="home-update-card">
              <div><span>Official uploads</span></div>
              <h3>YouTube Nigerian movies</h3>
              <p>Full movies published by verified producer or rights-holder channels, linked without copying the video onto MyNigeriaGuide.</p>
              <Link href="/entertainment/movies?platform=YouTube">Browse YouTube movies →</Link>
            </article>
            <article className="home-update-card">
              <div><span>Streaming</span></div>
              <h3>Netflix Nigerian movies</h3>
              <p>Direct title pages for Nigerian films on Netflix. Availability and subscription requirements can change by region.</p>
              <Link href="/entertainment/movies?platform=Netflix">Browse Netflix movies →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container agency-strip">
          <div>
            <span className="eyebrow">How this section works</span>
            <h2>A discovery layer, not another streaming host.</h2>
            <p>Keeping playback on the original platform makes the site faster, avoids storing huge media files and gives viewers the clearest route to legitimate releases.</p>
          </div>
          <div className="policy-stack">
            <section><strong>1</strong><div><h2>Discover</h2><p>Search by title, actor, genre, language or platform.</p></div></section>
            <section><strong>2</strong><div><h2>Check availability</h2><p>Every outbound watch link includes a last-checked date and a note about access.</p></div></section>
            <section><strong>3</strong><div><h2>Watch officially</h2><p>The final watch button opens Netflix, YouTube or another verified rights-holder page.</p></div></section>
          </div>
        </div>
      </section>
    </>
  );
}
