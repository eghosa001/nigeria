import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { YouTubeMovieCard } from "@/components/youtube-movie-card";
import { getSiteUrl } from "@/lib/site";
import { entertainmentPeople } from "@/lib/entertainment-extras";
import { verifiedYouTubeMovieChannels } from "@/lib/youtube-movie-channels";
import { getYouTubeMovieById, youtubeMovieLibrary } from "@/lib/youtube-library";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ videoId: string }> }): Promise<Metadata> {
  const { videoId } = await params;
  const movie = getYouTubeMovieById(videoId);
  if (!movie) return {};
  const canonical = movie.source === "curated" ? movie.internalHref : "/entertainment/youtube/" + movie.videoId;
  const image = "https://i.ytimg.com/vi/" + movie.videoId + "/hqdefault.jpg";
  return {
    title: movie.title + " — Cast, Details & Watch Free on YouTube",
    description: movie.synopsis,
    alternates: { canonical },
    openGraph: {
      title: movie.title + " — Nigerian Movie",
      description: movie.synopsis,
      type: "video.other",
      images: [{ url: image, alt: movie.title + " official YouTube thumbnail" }],
    },
  };
}

function runtimeLabel(minutes: number) {
  if (!minutes) return "Full movie";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours ? hours + "h " + (mins ? mins + "m" : "") : mins + "m";
}

function personHref(name: string) {
  const normalized = name.trim().toLowerCase();
  const person = entertainmentPeople.find((item) => item.name.trim().toLowerCase() === normalized);
  return person ? "/entertainment/people/" + person.slug : null;
}

export default async function YouTubeMovieDetailPage({ params }: { params: Promise<{ videoId: string }> }) {
  const { videoId } = await params;
  const movie = getYouTubeMovieById(videoId);
  if (!movie) notFound();
  if (movie.source === "curated") redirect(movie.internalHref);

  const base = getSiteUrl();
  const publisherSource = verifiedYouTubeMovieChannels.find((source) => source.name === movie.channelName);
  const related = youtubeMovieLibrary
    .filter((item) => item.videoId !== movie.videoId)
    .map((item) => ({
      item,
      score:
        (item.channelName === movie.channelName ? 4 : 0) +
        item.cast.filter((name) => movie.cast.includes(name)).length * 2 +
        (item.year === movie.year ? 1 : 0),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.item.publishedAt.localeCompare(a.item.publishedAt))
    .slice(0, 4)
    .map((entry) => entry.item);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    description: movie.synopsis,
    actor: movie.cast.map((name) => ({ "@type": "Person", name })),
    duration: movie.durationMinutes ? "PT" + movie.durationMinutes + "M" : undefined,
    datePublished: movie.publishedAt,
    potentialAction: { "@type": "WatchAction", target: movie.videoUrl },
    sameAs: [movie.videoUrl, ...movie.alternateSources.map((source) => source.videoUrl)],
    url: base + "/entertainment/youtube/" + movie.videoId,
  };

  return (
    <>
      <JsonLd data={ld} />

      <section className="movie-detail-hero youtube-detail-hero">
        <div className="container">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Entertainment", href: "/entertainment" },
            { label: "YouTube movies", href: "/entertainment/youtube" },
            { label: movie.title },
          ]} />

          <div className="movie-detail-hero-grid">
            <figure className="youtube-detail-artwork">
              <img
                src={"https://i.ytimg.com/vi/" + movie.videoId + "/hqdefault.jpg"}
                alt={movie.title + " official YouTube thumbnail"}
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <figcaption>
                <span>Official YouTube preview</span>
                <a href={movie.videoUrl} target="_blank" rel="noreferrer">Open source ↗</a>
              </figcaption>
            </figure>

            <div className="movie-detail-copy">
              <span className="eyebrow">{movie.year} · Official full movie</span>
              <h1>{movie.title}</h1>
              <div className="movie-detail-factline">
                <span>{movie.year}</span>
                <span>{runtimeLabel(movie.durationMinutes)}</span>
                <span>{movie.channelName}</span>
              </div>
              <p className="movie-detail-synopsis">{movie.synopsis}</p>
              {movie.featuredCast.length ? (
                <p className="movie-hero-cast"><strong>Featuring:</strong> {movie.featuredCast.join(" · ")}</p>
              ) : null}

              <div className="movie-detail-actions">
                <a className="button" href={movie.videoUrl} target="_blank" rel="noreferrer">Watch full movie on YouTube ↗</a>
                {movie.channelUrl ? <a className="button button-secondary" href={movie.channelUrl} target="_blank" rel="noreferrer">Publisher channel ↗</a> : null}
              </div>
              <small className="movie-freshness-note">
                Published {movie.publishedAt.slice(0, 10)} by {movie.channelName}. Source checked {movie.lastChecked}. Playback stays on YouTube.
              </small>
            </div>
          </div>
        </div>
      </section>

      <nav className="movie-detail-subnav" aria-label="Movie page sections">
        <div className="container">
          <a href="#overview">Overview</a>
          <a href="#cast">Cast</a>
          <a href="#source">Source details</a>
          {related.length ? <a href="#related">Related movies</a> : null}
        </div>
      </nav>

      <section className="section movie-detail-main" id="overview">
        <div className="container movie-detail-layout">
          <article className="movie-detail-primary">
            <section className="movie-overview-section">
              <span className="eyebrow">About the movie</span>
              <h2>{movie.title}</h2>
              <p className="movie-long-summary">{movie.synopsis}</p>
              <p>
                This full Nigerian movie is published on the verified {movie.channelName} YouTube channel.
                {movie.durationMinutes ? " The listed runtime is " + runtimeLabel(movie.durationMinutes) + "." : ""}
                {" "}MyNigeriaGuide keeps the movie on its original publisher platform rather than mirroring the video.
              </p>
            </section>

            <section>
              <span className="eyebrow">At a glance</span>
              <div className="movie-fact-grid">
                <article><span>Year</span><strong>{movie.year}</strong></article>
                <article><span>Runtime</span><strong>{runtimeLabel(movie.durationMinutes)}</strong></article>
                <article><span>Publisher</span><strong>{movie.channelName}</strong></article>
                <article><span>Published</span><strong>{movie.publishedAt.slice(0, 10)}</strong></article>
                <article><span>Access</span><strong>Free on YouTube</strong></article>
                <article><span>Source checked</span><strong>{movie.lastChecked}</strong></article>
              </div>
            </section>

            <section id="cast">
              <span className="eyebrow">Cast</span>
              <h2>People listed for {movie.title}</h2>
              {movie.cast.length ? (
                <div className="movie-person-list">
                  {movie.cast.map((name) => {
                    const href = personHref(name);
                    return href ? <Link href={href} key={name}>{name}<span>View profile →</span></Link> : <span key={name}>{name}</span>;
                  })}
                </div>
              ) : (
                <div className="info-box">
                  <strong>Cast metadata is still being expanded.</strong>
                  <p>The movie remains published because its title, description, source and full-movie status passed the catalog quality checks.</p>
                </div>
              )}
            </section>

            <section id="source">
              <span className="eyebrow">Official source</span>
              <h2>Publisher and playback details</h2>
              <div className="movie-watch-options">
                <article>
                  <div><span>YouTube</span><strong>{movie.channelName}</strong></div>
                  <dl>
                    <div><dt>Published</dt><dd>{movie.publishedAt.slice(0, 10)}</dd></div>
                    <div><dt>Runtime</dt><dd>{runtimeLabel(movie.durationMinutes)}</dd></div>
                    <div><dt>Offline</dt><dd><a href="https://support.google.com/youtube/answer/11977233?hl=en" target="_blank" rel="noreferrer">YouTube Premium download, where eligible ↗</a></dd></div>
                    <div><dt>Checked</dt><dd>{movie.lastChecked}</dd></div>
                  </dl>
                  <p>The original movie page remains the authority for playback availability, publisher information and any changes to the video.</p>
                  <a className="button" href={movie.videoUrl} target="_blank" rel="noreferrer">Open official YouTube movie ↗</a>
                  {publisherSource ? <Link className="text-link" href={"/entertainment/youtube/sources#source-" + publisherSource.slug}>View approved publisher record →</Link> : null}
                </article>
                {movie.alternateSources.map((source) => (
                  <article key={source.videoId}>
                    <div><span>Alternate official source</span><strong>{source.channelName}</strong></div>
                    <dl>
                      <div><dt>Published</dt><dd>{source.publishedAt.slice(0, 10)}</dd></div>
                      <div><dt>Offline</dt><dd><a href="https://support.google.com/youtube/answer/11977233?hl=en" target="_blank" rel="noreferrer">YouTube Premium download, where eligible ↗</a></dd></div>
                      <div><dt>Checked</dt><dd>{source.lastChecked}</dd></div>
                    </dl>
                    <p>This is another approved publisher upload matched to the same movie title and supporting metadata.</p>
                    <a className="button" href={source.videoUrl} target="_blank" rel="noreferrer">Open alternate official source ↗</a>
                    {source.channelUrl ? <a className="text-link" href={source.channelUrl} target="_blank" rel="noreferrer">Publisher channel ↗</a> : null}
                  </article>
                ))}
              </div>
              <p className="movie-download-note">Offline downloads remain inside YouTube or the relevant official app. MyNigeriaGuide does not provide third-party MP4 download links.</p>
            </section>

            <details className="movie-rights-details">
              <summary>Thumbnail and rights transparency</summary>
              <div>
                <p>The preview above is loaded from YouTube's thumbnail endpoint and links back to the original publisher video. MyNigeriaGuide does not download, mirror or rehost the movie file.</p>
              </div>
            </details>
          </article>

          <aside className="movie-detail-sidebar">
            <div className="sidebar-card movie-sidebar-card">
              <span>Quick facts</span>
              <strong>{movie.title}</strong>
              <dl>
                <div><dt>Year</dt><dd>{movie.year}</dd></div>
                <div><dt>Runtime</dt><dd>{runtimeLabel(movie.durationMinutes)}</dd></div>
                <div><dt>Publisher</dt><dd>{movie.channelName}</dd></div>
                              </dl>
            </div>
            <div className="sidebar-card">
              <span>Keep exploring</span>
              <div className="related-links">
                <Link href="/entertainment/youtube">All YouTube movies →</Link>
                <Link href="/entertainment/movies">Curated movies →</Link>
                <Link href="/entertainment/releases">New &amp; upcoming →</Link>
                <Link href="/entertainment/cinemas">Cinemas →</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className="section movie-related-section" id="related">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">More to watch</span>
                <h2>Related official YouTube movies.</h2>
                <p className="section-lead">Prioritised by shared publisher, cast and release year using metadata already in the catalog.</p>
              </div>
              <Link href="/entertainment/youtube">Browse all YouTube movies →</Link>
            </div>
            <div className="youtube-movie-grid movie-preview-grid">
              {related.map((item) => <YouTubeMovieCard movie={item} key={item.videoId} />)}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
