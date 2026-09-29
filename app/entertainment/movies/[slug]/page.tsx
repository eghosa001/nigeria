import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EntertainmentArtwork } from "@/components/entertainment-artwork";
import { JsonLd } from "@/components/json-ld";
import { entertainmentTitles, getEntertainmentTitle, getFeaturedCast } from "@/lib/entertainment";
import { entertainmentPeople } from "@/lib/entertainment-extras";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return entertainmentTitles.map((title) => ({ slug: title.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = getEntertainmentTitle(slug);
  if (!title) return {};

  return {
    title: title.title + " — Cast, Details & Where to Watch",
    description: title.synopsis,
    alternates: { canonical: "/entertainment/movies/" + title.slug },
    openGraph: {
      type: "video.movie",
      title: title.title,
      description: title.synopsis,
      url: "/entertainment/movies/" + title.slug,
    },
  };
}

function personHref(name: string) {
  const person = entertainmentPeople.find((item) => item.name === name);
  return person ? "/entertainment/people/" + person.slug : null;
}

function accessLabel(access: string) {
  if (access === "full-movie") return "Free full movie";
  if (access === "subscription") return "Subscription";
  if (access === "rent-or-buy") return "Rent or buy";
  if (access === "subscription-or-rent") return "Subscription or rental";
  return "Official platform";
}

export default async function MovieDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = getEntertainmentTitle(slug);
  if (!title) notFound();

  const base = getSiteUrl();
  const pageUrl = base + "/entertainment/movies/" + title.slug;
  const allCheckedDates = [
    ...title.watchLinks.map((link) => link.lastChecked),
    ...(title.trailer ? [title.trailer.lastChecked] : []),
  ];
  const lastChecked = allCheckedDates.reduce((latest, value) => value > latest ? value : latest, "");
  const platforms = [...new Set(title.watchLinks.map((link) => link.platform))];
  const featuredCast = getFeaturedCast(title);

  const movieLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: title.title,
    description: title.synopsis,
    url: pageUrl,
    genre: title.genres,
    inLanguage: title.languages,
    actor: title.cast.map((name) => ({ "@type": "Person", name })),
    director: title.directors?.map((name) => ({ "@type": "Person", name })),
    sameAs: title.watchLinks.map((link) => link.href),
    potentialAction: title.watchLinks.map((link) => ({ "@type": "WatchAction", target: link.href })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Entertainment", item: base + "/entertainment" },
      { "@type": "ListItem", position: 3, name: "Movies", item: base + "/entertainment/movies" },
      { "@type": "ListItem", position: 4, name: title.title, item: pageUrl },
    ],
  };

  const related = entertainmentTitles
    .filter((item) => item.slug !== title.slug && item.genres.some((genre) => title.genres.includes(genre)))
    .slice(0, 4);

  return (
    <>
      <JsonLd data={[movieLd, breadcrumbLd]} />

      <section className="movie-detail-hero">
        <div className="container">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Entertainment", href: "/entertainment" },
            { label: "Movies", href: "/entertainment/movies" },
            { label: title.title },
          ]} />

          <div className="movie-detail-hero-grid">
            <div className="movie-detail-artwork">
              <EntertainmentArtwork title={title} variant="hero" />
            </div>

            <div className="movie-detail-copy">
              <span className="eyebrow">{title.year} Nigerian movie</span>
              <h1>{title.title}</h1>
              <div className="movie-detail-factline">
                <span>{title.year}</span>
                {title.runtimeMinutes ? <span>{title.runtimeMinutes} min</span> : null}
                <span>{title.languages.join(" / ")}</span>
                <span>{platforms.join(" / ")}</span>
              </div>
              <p className="movie-detail-synopsis">{title.synopsis}</p>
              <p className="movie-hero-cast"><strong>Featuring:</strong> {featuredCast.join(" · ")}</p>

              <div className="movie-detail-genres">
                {title.genres.map((genre) => <span key={genre}>{genre}</span>)}
              </div>

              <div className="movie-detail-actions">
                {title.watchLinks.slice(0, 2).map((link) => (
                  <a className="button" href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                    {link.label} ↗
                  </a>
                ))}
                {title.trailer ? (
                  <a className="button button-secondary" href={title.trailer.href} target="_blank" rel="noreferrer">
                    Official trailer ↗
                  </a>
                ) : null}
              </div>
              <small className="movie-freshness-note">Official links last checked {lastChecked}. Availability can change by region, date and subscription plan.</small>
            </div>
          </div>
        </div>
      </section>

      <nav className="movie-detail-subnav" aria-label="Movie page sections">
        <div className="container">
          <a href="#overview">Overview</a>
          <a href="#cast">Cast & crew</a>
          <a href="#watch">Where to watch</a>
          {title.trailer ? <a href="#trailer">Trailer</a> : null}
          <a href="#related">Related movies</a>
        </div>
      </nav>

      <section className="section movie-detail-main" id="overview">
        <div className="container movie-detail-layout">
          <article className="movie-detail-primary">
            <section className="movie-overview-section">
              <span className="eyebrow">About the movie</span>
              <h2>{title.title}: story and quick details</h2>
              <p className="movie-long-summary">{title.synopsis}</p>
              <p>
                This is a {title.genres.slice(0, 2).join(" / ").toLowerCase()} Nigerian film from {title.year}.
                {title.languages.length ? " It is listed in " + title.languages.join(" and ") + "." : ""}
                {platforms.length ? " MyNigeriaGuide currently links to official viewing through " + platforms.join(" and ") + "." : ""}
              </p>
            </section>

            <section>
              <span className="eyebrow">At a glance</span>
              <div className="movie-fact-grid">
                <article><span>Release year</span><strong>{title.year}</strong></article>
                <article><span>Format</span><strong>Feature film</strong></article>
                {title.runtimeMinutes ? <article><span>Runtime</span><strong>{title.runtimeMinutes} minutes</strong></article> : null}
                <article><span>Languages</span><strong>{title.languages.join(", ")}</strong></article>
                <article><span>Genres</span><strong>{title.genres.join(", ")}</strong></article>
                <article><span>Official platforms</span><strong>{platforms.join(", ")}</strong></article>
                <article><span>Link freshness</span><strong>{lastChecked}</strong></article>
              </div>
            </section>

            <section id="cast">
              <span className="eyebrow">Cast & crew</span>
              <h2>People connected to {title.title}</h2>

              {title.directors?.length ? (
                <div className="movie-credit-group">
                  <h3>Director{title.directors.length > 1 ? "s" : ""}</h3>
                  <div className="movie-person-list">
                    {title.directors.map((name) => {
                      const href = personHref(name);
                      return href ? <Link href={href} key={name}>{name}<span>View profile →</span></Link> : <span key={name}>{name}</span>;
                    })}
                  </div>
                </div>
              ) : null}

              <div className="movie-credit-group">
                <h3>Cast</h3>
                <div className="movie-person-list">
                  {title.cast.map((name) => {
                    const href = personHref(name);
                    return href ? <Link href={href} key={name}>{name}<span>View profile →</span></Link> : <span key={name}>{name}</span>;
                  })}
                </div>
              </div>
            </section>

            <section id="watch">
              <span className="eyebrow">Official availability</span>
              <h2>Where to watch {title.title}</h2>
              <div className="movie-watch-options">
                {title.watchLinks.map((link) => (
                  <article key={link.href}>
                    <div>
                      <span>{link.platform}</span>
                      <strong>{link.label}</strong>
                    </div>
                    <dl>
                      <div><dt>Access</dt><dd>{accessLabel(link.access)}</dd></div>
                      {link.publisher ? <div><dt>Publisher</dt><dd>{link.publisher}</dd></div> : null}
                      <div><dt>Checked</dt><dd>{link.lastChecked}</dd></div>
                    </dl>
                    <p>{link.note}</p>
                    <a className="button" href={link.href} target="_blank" rel="noreferrer">Open official source ↗</a>
                  </article>
                ))}
              </div>
            </section>

            {title.trailer ? (
              <section id="trailer">
                <span className="eyebrow">Preview</span>
                <h2>Official trailer</h2>
                <div className="movie-trailer-card">
                  <div><strong>{title.trailer.label}</strong><span>YouTube · checked {title.trailer.lastChecked}</span></div>
                  <a className="button button-secondary" href={title.trailer.href} target="_blank" rel="noreferrer">Watch trailer ↗</a>
                </div>
              </section>
            ) : null}

            <details className="movie-rights-details">
              <summary>Artwork and availability transparency</summary>
              <div>
                <p>Streaming catalogs can change, so the official platform page is the final authority for current access.</p>
                {title.artwork ? (
                  <p>Promotional artwork is shown from <a href={title.artwork.sourceUrl} target="_blank" rel="noreferrer">{title.artwork.credit}</a> under the recorded reuse basis. Checked {title.artwork.lastChecked}.</p>
                ) : (
                  <p>When reusable promotional artwork is not recorded, MyNigeriaGuide uses an original generated visual based only on the movie title, year and genre. Official YouTube video thumbnails may be shown unmodified when a verified video source is available.</p>
                )}
              </div>
            </details>
          </article>

          <aside className="movie-detail-sidebar">
            <div className="sidebar-card movie-sidebar-card">
              <span>Quick facts</span>
              <strong>{title.title}</strong>
              <dl>
                <div><dt>Year</dt><dd>{title.year}</dd></div>
                <div><dt>Language</dt><dd>{title.languages.join(", ")}</dd></div>
                {title.runtimeMinutes ? <div><dt>Runtime</dt><dd>{title.runtimeMinutes} min</dd></div> : null}
                <div><dt>Genre</dt><dd>{title.genres.slice(0, 3).join(", ")}</dd></div>
              </dl>
            </div>
            <div className="sidebar-card">
              <span>Keep exploring</span>
              <div className="related-links">
                <Link href="/entertainment/movies">All movies →</Link>
                <Link href="/entertainment/youtube">Free YouTube movies →</Link>
                <Link href="/entertainment/releases">New & upcoming →</Link>
                <Link href="/entertainment/cinemas">Cinemas →</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section movie-related-section" id="related">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">More like this</span>
              <h2>Related Nigerian movies.</h2>
            </div>
            <Link href="/entertainment/movies">Browse the full catalog →</Link>
          </div>

          <div className="movie-grid movie-related-grid">
            {related.map((item) => (
              <article className="movie-tile" key={item.slug}>
                <EntertainmentArtwork title={item} />
                <div className="movie-tile-meta"><span>{item.year}</span><span>{item.languages.slice(0, 1).join("")}</span></div>
                <h3><Link href={"/entertainment/movies/" + item.slug}>{item.title}</Link></h3>
                <p className="movie-tile-description">{item.synopsis}</p>
                <p className="movie-card-cast"><strong>Featuring:</strong> {getFeaturedCast(item).join(" · ")}</p>
                <div className="movie-tile-footer"><span>{item.genres.slice(0, 2).join(" · ")}</span><Link href={"/entertainment/movies/" + item.slug}>Details →</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
