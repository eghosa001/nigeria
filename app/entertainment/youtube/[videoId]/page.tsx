import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AnswerFirst } from "@/components/answer-first";
import { JsonLd } from "@/components/json-ld";
import { LazyYouTubePlayer } from "@/components/lazy-youtube-player";
import { YouTubeMovieCard } from "@/components/youtube-movie-card";
import { getSiteUrl } from "@/lib/site";
import { entertainmentPeople } from "@/lib/entertainment-extras";
import { getYouTubeMovieById, youtubeMovieLibrary } from "@/lib/youtube-library";

export const revalidate = 86400;

const youtubeSeoOverrides: Record<string, { title: string; description: string }> = {
  "KWIpR47N9hc": { title: "Love Always Wins Cast & Full Movie (2026)", description: "Love Always Wins cast, story and official full movie on YouTube. See the verified publisher, runtime and where to watch the Nigerian movie." },
  "X3HaWmJoSRU": { title: "Once Upon a Village 3 Cast & Full Movie (2026)", description: "Once Upon a Village 3 cast, runtime and official full movie on YouTube, published by RuthKadiri247." },
  "Yu-QxqPDmXM": { title: "Once Upon a Village Cast & Full Movie (2026)", description: "Once Upon a Village cast, 103-minute runtime and official full movie on YouTube, published by RuthKadiri247." },
  "_86CuSRi6E4": { title: "One More Night Nigerian Movie: Cast & Full Movie", description: "One More Night cast, 129-minute runtime and official full Nigerian movie on YouTube, starring Frederick Leonard and Cynthia Clarke." },
  "T1-buA-yAmo": { title: "Holy Matrimony Nigerian Movie: Cast & Full Movie", description: "Holy Matrimony cast, 143-minute runtime and official full Nigerian movie on YouTube, starring Frederick Leonard, Onyi Alex and Nini Mbonu." },
  "zKQoArfptqA": { title: "The Bride Switch Cast & Full Movie (2026)", description: "The Bride Switch cast, story and official full movie on YouTube. See the verified publisher, runtime and where to watch the Nigerian movie." },
  "2Ficn2BMlI8": { title: "What Tomorrow Holds Cast & Full Movie (2026)", description: "What Tomorrow Holds cast, story and official full movie on YouTube. See the verified publisher, runtime and where to watch the Nigerian movie." },
  "y2RkBwUYSvo": { title: "Forever Isn't Long Enough Cast & Full Movie", description: "Forever Isn't Long Enough cast, runtime and official full Nigerian movie on YouTube, published by Royal Arts TV." },
  "TH8oDejHrEo": { title: "In Every Lifetime Cast & Full Movie", description: "In Every Lifetime cast, runtime and official full Nigerian movie on YouTube, with Daniel Etim Effiong, Ego Nwosu and Shaznay Okawa." },
  "11n6AU3EVUk": { title: "Just Like a Mirror Cast & Full Movie (2026)", description: "Just Like a Mirror cast, runtime and official full Nigerian movie on YouTube, with Ebube Nwagbo, Dera Osadebe and Enock Darko." },
  "zxvtMba4MYE": { title: "Third Party Risk Cast & Full Movie (2026)", description: "Third Party Risk cast, runtime and official full Nigerian movie on YouTube, with Omeche Oko, Ray Emodi and Symon Oko." }
};

function compactMetadata(value: string, maxLength = 155) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  const cut = clean.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 105 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

export async function generateMetadata({ params }: { params: Promise<{ videoId: string }> }): Promise<Metadata> {
  const { videoId } = await params;
  const movie = getYouTubeMovieById(videoId);
  if (!movie) return {};
  const canonical = movie.source === "curated" ? movie.internalHref : "/entertainment/youtube/" + movie.videoId;
  const image = "https://i.ytimg.com/vi/" + movie.videoId + "/hqdefault.jpg";
  const cast = movie.featuredCast.slice(0, 4);
  const override = youtubeSeoOverrides[movie.videoId];
  const description = compactMetadata(override?.description ?? `${movie.title} is a ${movie.year} Nigerian movie. ${cast.length ? "Cast includes " + cast.join(", ") + ". " : ""}${movie.synopsis}`);
  return {
    title: override?.title ?? compactMetadata(`${movie.title} Cast & Full Movie (${movie.year})`, 60),
    description,
    alternates: { canonical },
    robots: movie.source === "youtube-review" ? { index: false, follow: true } : undefined,
    openGraph: {
      title: movie.title + " — Nigerian Movie",
      description,
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
                <span>YouTube</span>
                <a href={movie.videoUrl} target="_blank" rel="noreferrer">Open source ↗</a>
              </figcaption>
            </figure>

            <div className="movie-detail-copy">
              <span className="eyebrow">{movie.year} · Full movie</span>
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
                <a className="button" href="#watch-here">Watch here</a>
                <a className="button button-secondary" href={movie.videoUrl} target="_blank" rel="noreferrer">Open on YouTube ↗</a>
                {movie.channelUrl ? <a className="button button-secondary" href={movie.channelUrl} target="_blank" rel="noreferrer">Publisher channel ↗</a> : null}
              </div>
              <small className="movie-freshness-note">
                Published {movie.publishedAt.slice(0, 10)} · {movie.channelName}
              </small>
            </div>
          </div>

          <AnswerFirst
            eyebrow="Quick answer"
            title={"Watch, cast and runtime at a glance"}
            summary={movie.synopsis}
            facts={[
              { label: "Access", value: "Free full movie on YouTube" },
              { label: "Runtime", value: runtimeLabel(movie.durationMinutes) },
              { label: "Featured cast", value: movie.featuredCast.slice(0, 3).join(", ") || "See cast details below" },
              { label: "Publisher", value: movie.channelName },
            ]}
            links={[
              { href: "#cast", label: "See cast" },
              { href: "#source", label: "Source details" },
              { href: "#watch-here", label: "Watch here", primary: true },
              { href: movie.videoUrl, label: "Open on YouTube", external: true },
            ]}
            note={"Official source checked " + movie.lastChecked + ". Continue below for cast, alternate official sources and related movies."}
          />
        </div>
      </section>

      <nav className="movie-detail-subnav" aria-label="Movie page sections">
        <div className="container">
          <a href="#overview">Overview</a>
          <a href="#cast">Cast</a>
          <a href="#source">Watch</a>
          {related.length ? <a href="#related">Related movies</a> : null}
        </div>
      </nav>

      <section className="section movie-detail-main" id="overview">
        <div className="container movie-detail-layout">
          <article className="movie-detail-primary">
            <section className="movie-overview-section">
              <span className="eyebrow">About the movie</span>
              <h2>{movie.title} Nigerian movie: story and details</h2>
              <p className="movie-long-summary">{movie.synopsis}</p>
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
              <h2>{movie.title} cast</h2>
              {movie.cast.length ? (
                <div className="movie-person-list">
                  {movie.cast.map((name) => {
                    const href = personHref(name);
                    return href ? <Link href={href} key={name}>{name}<span>View profile →</span></Link> : <span key={name}>{name}</span>;
                  })}
                </div>
              ) : (
                <p>Cast details are not available yet.</p>
              )}
            </section>

            <section id="source">
              <span className="eyebrow">Watch</span>
              <h2>Watch {movie.title} here</h2>
              <div id="watch-here" className="movie-watch-here">
                <LazyYouTubePlayer
                  videoId={movie.videoId}
                  title={movie.title}
                  sourceUrl={movie.videoUrl}
                  publisher={movie.channelName}
                />
              </div>
              <div className="movie-watch-options">
                <article>
                  <div><span>YouTube</span><strong>{movie.channelName}</strong></div>
                  <dl>
                    <div><dt>Published</dt><dd>{movie.publishedAt.slice(0, 10)}</dd></div>
                    <div><dt>Runtime</dt><dd>{runtimeLabel(movie.durationMinutes)}</dd></div>
                    <div><dt>Checked</dt><dd>{movie.lastChecked}</dd></div>
                  </dl>
                  <a className="button" href={movie.videoUrl} target="_blank" rel="noreferrer">Open official YouTube movie ↗</a>
                </article>
                {movie.alternateSources.map((source) => (
                  <article key={source.videoId}>
                    <div><span>Alternate official source</span><strong>{source.channelName}</strong></div>
                    <dl>
                      <div><dt>Published</dt><dd>{source.publishedAt.slice(0, 10)}</dd></div>
                      <div><dt>Checked</dt><dd>{source.lastChecked}</dd></div>
                    </dl>
                    <a className="button" href={source.videoUrl} target="_blank" rel="noreferrer">Open alternate official source ↗</a>
                    {source.channelUrl ? <a className="text-link" href={source.channelUrl} target="_blank" rel="noreferrer">Publisher channel ↗</a> : null}
                  </article>
                ))}
              </div>
            </section>

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
