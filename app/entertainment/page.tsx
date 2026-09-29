import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { entertainmentTitles, getPlatformCount } from "@/lib/entertainment";
import { cinemaGuides, entertainmentPeople, platformGuides, releaseItems } from "@/lib/entertainment-extras";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nigerian Movies & Entertainment",
  description: "Discover Nigerian movies, cinemas, filmmakers, current releases and verified official links to watch on Netflix, YouTube, Prime Video and supported platforms.",
  alternates: { canonical: "/entertainment" },
};

export default function EntertainmentPage() {
  const featured = entertainmentTitles.filter((title) => title.featured).slice(0, 6);
  const base = getSiteUrl();

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nigerian Movies & Entertainment",
    description: "A growing guide to Nigerian movies, cinemas, filmmakers and official places to watch.",
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
            <div className="hero-kicker"><span className="hero-kicker-dot" aria-hidden="true" />Movies &amp; entertainment</div>
            <h1>Find Nigerian entertainment and <span>where to experience it.</span></h1>
            <p className="hero-lead">
              Browse Nigerian movies, official streaming links, cinema chains, new releases, film events and the people behind the work.
            </p>
            <div className="related-links">
              <Link href="/entertainment/movies">Movies →</Link>
              <Link href="/entertainment/releases">New &amp; upcoming →</Link>
              <Link href="/entertainment/cinemas">Cinemas →</Link>
              <Link href="/entertainment/people">Actors &amp; filmmakers →</Link>
            </div>
            <p className="hero-note">MyNigeriaGuide links to official platforms and venues. We do not host or re-upload films.</p>
          </div>

          <aside className="trust-panel" aria-label="Entertainment catalog snapshot">
            <div className="trust-panel-top"><span className="trust-kicker">Catalog snapshot</span><span className="trust-live"><i aria-hidden="true" />Growing</span></div>
            <strong>{entertainmentTitles.length} movie entries</strong>
            <p>Watch links, cinema guides and release listings carry freshness dates because entertainment availability changes quickly.</p>
            <div className="trust-metrics">
              <div><strong>{getPlatformCount("YouTube")}</strong><span>YouTube full movies</span></div>
              <div><strong>{getPlatformCount("Netflix") + getPlatformCount("Prime Video")}</strong><span>streaming titles</span></div>
            </div>
            <div className="trust-row"><span>✓</span><div><strong>Official watch links</strong><small>No piracy mirrors or scraped streaming pages.</small></div></div>
            <div className="trust-row"><span>✓</span><div><strong>Current cinema routes</strong><small>Go to the cinema's own booking or showtime page.</small></div></div>
            <div className="trust-row"><span>✓</span><div><strong>Lightweight by design</strong><small>Playback stays on the original platform.</small></div></div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">Explore entertainment</span><h2>Choose what you want to discover.</h2></div>
          </div>
          <div className="home-category-grid">
            <Link className="home-category-card" href="/entertainment/movies"><span>Watch</span><strong>Movies</strong><small>Search Nigerian titles by actor, genre, language or platform.</small><i>Browse movies →</i></Link>
            <Link className="home-category-card" href="/entertainment/releases"><span>Current</span><strong>New &amp; upcoming</strong><small>Fresh streaming additions, films now showing and upcoming film events.</small><i>See releases →</i></Link>
            <Link className="home-category-card" href="/entertainment/cinemas"><span>Big screen</span><strong>Cinemas</strong><small>Filmhouse, Silverbird and Viva booking routes, locations and price guidance.</small><i>Find cinemas →</i></Link>
            <Link className="home-category-card" href="/entertainment/platforms"><span>Streaming</span><strong>Platforms</strong><small>Netflix, YouTube, Prime Video and the Showmax-to-DStv Stream transition.</small><i>Compare platforms →</i></Link>
            <Link className="home-category-card" href="/entertainment/people"><span>People</span><strong>Actors &amp; filmmakers</strong><small>Browse people connected to titles already in the catalog.</small><i>Explore people →</i></Link>
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
              <article className="service-card" key={title.slug}>
                <div className="card-topline"><span>{title.year}</span><span>{[...new Set(title.watchLinks.map((link) => link.platform))].join(" · ")}</span></div>
                <h3><Link href={"/entertainment/movies/" + title.slug}>{title.title}</Link></h3>
                <p>{title.synopsis}</p>
                <div className="service-meta"><strong>{title.genres.slice(0, 2).join(" · ")}</strong><Link href={"/entertainment/movies/" + title.slug}>Open movie →</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container agency-strip">
          <div>
            <span className="eyebrow">Growing without becoming heavy</span>
            <h2>Metadata here. Playback elsewhere.</h2>
            <p>The entertainment catalog stores lightweight text, links and verification dates. Netflix, Prime Video and YouTube still serve the actual video, while cinema chains handle their own ticketing.</p>
          </div>
          <div className="policy-stack">
            <section><strong>{platformGuides.length}</strong><div><h2>Platform guides</h2><p>Current platform routing and availability notes.</p></div></section>
            <section><strong>{cinemaGuides.length}</strong><div><h2>Cinema chains</h2><p>Official booking and price links instead of copied schedules.</p></div></section>
            <section><strong>{entertainmentPeople.length}</strong><div><h2>People profiles</h2><p>Connected to films already present in the catalog.</p></div></section>
          </div>
        </div>
      </section>
    </>
  );
}
