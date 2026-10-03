import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EntertainmentArtwork } from "@/components/entertainment-artwork";
import { JsonLd } from "@/components/json-ld";
import { canDisplayEntertainmentArtwork, entertainmentTitles, getEntertainmentTitle, getFeaturedCast, type EntertainmentTitle, type WatchLink } from "@/lib/entertainment";
import { entertainmentPeople, getPlatformGuide } from "@/lib/entertainment-extras";
import { getYouTubeMovieById, getYouTubeVideoId } from "@/lib/youtube-library";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return entertainmentTitles.map((title) => ({ slug: title.slug }));
}

function videoIdFromUrl(href: string) {
  try {
    const url = new URL(href);
    if (url.hostname === "youtu.be") return url.pathname.slice(1);
    if (url.hostname.endsWith("youtube.com")) return url.searchParams.get("v");
  } catch {}
  return null;
}

function movieImageUrl(title: EntertainmentTitle) {
  if (canDisplayEntertainmentArtwork(title) && title.artwork) return title.artwork.url;
  const fullMovie = title.watchLinks.find((link) => link.platform === "YouTube" && link.access === "full-movie");
  const source = fullMovie ?? title.trailer;
  const videoId = source ? videoIdFromUrl(source.href) : null;
  return videoId ? "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg" : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = getEntertainmentTitle(slug);
  if (!title) return {};
  const image = movieImageUrl(title);
  const featuredCast = getFeaturedCast(title).slice(0, 4);
  const description = `${title.title} is a ${title.year} Nigerian movie. ${featuredCast.length ? "Cast includes " + featuredCast.join(", ") + ". " : ""}${title.synopsis}`;

  return {
    title: title.title + " Nigerian Movie: Cast & Where to Watch",
    description,
    alternates: { canonical: "/entertainment/movies/" + title.slug },
    openGraph: {
      type: "video.movie",
      title: title.title,
      description,
      url: "/entertainment/movies/" + title.slug,
      images: image ? [{ url: image, alt: title.title + " artwork" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: title.title,
      description,
      images: image ? [image] : undefined,
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

  const availabilityLinks: WatchLink[] = [];
  const seenAvailability = new Set<string>();
  for (const link of title.watchLinks) {
    if (link.platform !== "YouTube") {
      if (!seenAvailability.has(link.href)) {
        availabilityLinks.push(link);
        seenAvailability.add(link.href);
      }
      continue;
    }

    const videoId = getYouTubeVideoId(link.href);
    const libraryMovie = videoId ? getYouTubeMovieById(videoId) : undefined;
    const primary = libraryMovie ? {
      ...link,
      publisher: link.publisher ?? libraryMovie.channelName,
      publisherUrl: link.publisherUrl ?? libraryMovie.channelUrl,
    } : link;
    if (!seenAvailability.has(primary.href)) {
      availabilityLinks.push(primary);
      seenAvailability.add(primary.href);
    }
    for (const source of libraryMovie?.alternateSources ?? []) {
      if (seenAvailability.has(source.videoUrl)) continue;
      availabilityLinks.push({
        platform: "YouTube",
        label: "Watch on " + source.channelName,
        href: source.videoUrl,
        access: "full-movie",
        lastChecked: source.lastChecked,
        note: "Alternate approved full-movie upload from " + source.channelName + ".",
        publisher: source.channelName,
        publisherUrl: source.channelUrl,
      });
      seenAvailability.add(source.videoUrl);
    }
  }

  const base = getSiteUrl();
  const pageUrl = base + "/entertainment/movies/" + title.slug;
  const allCheckedDates = [
    ...availabilityLinks.map((link) => link.lastChecked),
    ...(title.trailer ? [title.trailer.lastChecked] : []),
  ];
  const lastChecked = allCheckedDates.reduce((latest, value) => value > latest ? value : latest, "");
  const platforms = [...new Set(availabilityLinks.map((link) => link.platform))];
  const featuredCast = getFeaturedCast(title);
  const image = movieImageUrl(title);

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
    image: image || undefined,
    sameAs: availabilityLinks.map((link) => link.href),
    potentialAction: availabilityLinks.map((link) => ({ "@type": "WatchAction", target: link.href })),
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
                {availabilityLinks.slice(0, 3).map((link) => (
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
              <small className="movie-freshness-note">Links checked {lastChecked}.</small>
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
              <h2>{title.title} cast and crew</h2>

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
                <h3>Full cast</h3>
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
                {availabilityLinks.map((link) => {
                  const platformGuide = getPlatformGuide(link.platform);
                  return (
                    <article key={link.href}>
                      <div>
                        <span>{link.platform}</span>
                        <strong>{link.label}</strong>
                      </div>
                      <dl>
                        <div><dt>Access</dt><dd>{accessLabel(link.access)}</dd></div>
                        {link.publisher ? <div><dt>Publisher</dt><dd>{link.publisherUrl ? <a href={link.publisherUrl} target="_blank" rel="noreferrer">{link.publisher} ↗</a> : link.publisher}</dd></div> : null}
                        {platformGuide?.offlineLabel ? <div><dt>Offline</dt><dd>{platformGuide.offlineHelpUrl ? <a href={platformGuide.offlineHelpUrl} target="_blank" rel="noreferrer">{platformGuide.offlineLabel} ↗</a> : platformGuide.offlineLabel}</dd></div> : null}
                        <div><dt>Checked</dt><dd>{link.lastChecked}</dd></div>
                      </dl>
                      <a className="button" href={link.href} target="_blank" rel="noreferrer">Open official source ↗</a>
                    </article>
                  );
                })}
              </div>
            </section>

            {title.trailer ? (
              <section id="trailer">
                <span className="eyebrow">Preview</span>
                <h2>Official trailer</h2>
                <div className="movie-trailer-card">
                  <div>
                    <strong>{title.trailer.label}</strong>
                    <span>
                      {title.trailer.publisherUrl ? (
                        <a href={title.trailer.publisherUrl} target="_blank" rel="noreferrer">{title.trailer.publisher} ↗</a>
                      ) : title.trailer.publisher ?? "YouTube"}
                      {" · checked " + title.trailer.lastChecked}
                    </span>
                  </div>
                  <a className="button button-secondary" href={title.trailer.href} target="_blank" rel="noreferrer">Watch trailer ↗</a>
                </div>
              </section>
            ) : null}

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
