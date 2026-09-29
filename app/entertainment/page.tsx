import type { Metadata } from "next";
import Link from "next/link";
import { EntertainmentArtwork } from "@/components/entertainment-artwork";
import { JsonLd } from "@/components/json-ld";
import { entertainmentTitles, getFeaturedCast } from "@/lib/entertainment";
import { releaseItems } from "@/lib/entertainment-extras";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nigerian Movies & Entertainment",
  description: "Discover Nigerian movies first, then cinemas, filmmakers, current releases and verified official links to watch on Netflix, YouTube, Prime Video and supported platforms.",
  alternates: { canonical: "/entertainment" },
};

export default function EntertainmentPage() {
  const featured = entertainmentTitles.filter((title) => title.featured).slice(0, 6);
  const base = getSiteUrl();

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nigerian Movies & Entertainment",
    description: "A guide to Nigerian movies, cinemas, filmmakers and official places to watch.",
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
            <div className="hero-kicker"><span className="hero-kicker-dot" aria-hidden="true" />Movies first</div>
            <h1>Find a Nigerian movie and <span>know where to watch it.</span></h1>
            <p className="hero-lead">
              Browse movies visually, check cast and story details, then continue to the official streaming, YouTube or cinema source.
            </p>
            <div className="related-links">
              <Link href="/entertainment/movies">Browse movies →</Link>
              <Link href="/entertainment/youtube">Free on YouTube →</Link>
              <Link href="/entertainment/releases">New &amp; upcoming →</Link>
              <Link href="/entertainment/cinemas">Cinemas →</Link>
            </div>
            <p className="hero-note">MyNigeriaGuide does not host or re-upload films. Playback stays with the official publisher or platform.</p>
          </div>

          <aside className="trust-panel" aria-label="How movie discovery works">
            <div className="trust-panel-top"><span className="trust-kicker">Simple by design</span><span className="trust-live"><i aria-hidden="true" />Official routes</span></div>
            <strong>Discover here. Watch from the source.</strong>
            <p>Movie pages focus on useful details and direct routes instead of catalog statistics, technical sync information or copied playback.</p>
            <div className="trust-row"><span>✓</span><div><strong>Every movie has artwork</strong><small>Cleared promotional art, official YouTube thumbnails or original MyNigeriaGuide artwork.</small></div></div>
            <div className="trust-row"><span>✓</span><div><strong>Official watch links</strong><small>No piracy mirrors or copied streaming pages.</small></div></div>
            <div className="trust-row"><span>✓</span><div><strong>Useful movie details</strong><small>Story, cast, genres, language and availability stay close to the title.</small></div></div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">Start with movies</span><h2>Choose how you want to watch.</h2></div>
          </div>
          <div className="home-category-grid">
            <Link className="home-category-card" href="/entertainment/movies"><span>Discover</span><strong>Movies</strong><small>Browse Nigerian films across streaming platforms and official publisher channels.</small><i>Browse movies →</i></Link>
            <Link className="home-category-card" href="/entertainment/youtube"><span>Free to watch</span><strong>YouTube movies</strong><small>Full Nigerian movies from approved producer and rightsholder channels.</small><i>Browse YouTube movies →</i></Link>
            <Link className="home-category-card" href="/entertainment/releases"><span>Current</span><strong>New &amp; upcoming</strong><small>Fresh streaming additions, films now showing and upcoming film events.</small><i>See releases →</i></Link>
            <Link className="home-category-card" href="/entertainment/cinemas"><span>Big screen</span><strong>Cinemas</strong><small>Official booking routes, locations and practical price guidance.</small><i>Find cinemas →</i></Link>
            <Link className="home-category-card" href="/entertainment/platforms"><span>Streaming</span><strong>Platforms</strong><small>Understand the official routes for Netflix, YouTube, Prime Video and supported services.</small><i>Compare platforms →</i></Link>
            <Link className="home-category-card" href="/entertainment/people"><span>People</span><strong>Actors &amp; filmmakers</strong><small>Explore people connected to movies already in the guide.</small><i>Explore people →</i></Link>
          </div>
        </div>
      </section>

      <section className="section premium-dark-section">
        <div className="container">
          <div className="section-heading section-heading-light">
            <div><span className="eyebrow">Current watch</span><h2>What changed recently.</h2></div>
            <Link href="/entertainment/releases">See all new &amp; upcoming →</Link>
          </div>
          <div className="home-updates-grid">
            {releaseItems.slice(0, 3).map((item) => (
              <article className="home-update-card" key={item.id}>
                <div><span>{item.platform}</span><time dateTime={item.lastChecked}>{item.dateLabel}</time></div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <a href={item.officialUrl} target="_blank" rel="noreferrer">Official source →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">Featured movies</span><h2>Start with verified places to watch.</h2></div><Link href="/entertainment/movies">Full catalog →</Link></div>
          <div className="service-grid">
            {featured.map((title) => (
              <article className="service-card entertainment-movie-card" key={title.slug}>
                <EntertainmentArtwork title={title} />
                <div className="card-topline"><span>{title.year}</span><span>{[...new Set(title.watchLinks.map((link) => link.platform))].join(" · ")}</span></div>
                <h3><Link href={"/entertainment/movies/" + title.slug}>{title.title}</Link></h3>
                <p>{title.synopsis}</p>
                <p className="movie-card-cast"><strong>Featuring:</strong> {getFeaturedCast(title).join(" · ")}</p>
                <div className="service-meta"><strong>{title.genres.slice(0, 2).join(" · ")}</strong><Link href={"/entertainment/movies/" + title.slug}>Open movie →</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container agency-strip">
          <div>
            <span className="eyebrow">Image and playback policy</span>
            <h2>Useful visuals without copying what we do not own.</h2>
            <p>Cleared promotional art is used when its reuse basis is documented. Official YouTube video thumbnails stay linked to their source. Otherwise MyNigeriaGuide creates original title artwork instead of copying a poster or film still.</p>
          </div>
          <div className="policy-stack">
            <section><strong>✓</strong><div><h2>Cleared promotional art</h2><p>Used only when permission, licence or another recorded reuse basis supports it.</p></div></section>
            <section><strong>✓</strong><div><h2>Official YouTube previews</h2><p>Unmodified video thumbnails remain connected to the original YouTube source.</p></div></section>
            <section><strong>✓</strong><div><h2>Original fallback artwork</h2><p>When no reusable poster is recorded, the site creates its own visual from title metadata.</p></div></section>
            <section><strong>↗</strong><div><h2>Playback stays official</h2><p>Streaming and cinema actions continue on the responsible platform or publisher site.</p></div></section>
          </div>
        </div>
      </section>
    </>
  );
}
