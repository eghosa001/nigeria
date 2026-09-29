import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site";
import { getYouTubeMovieById } from "@/lib/youtube-library";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ videoId: string }> }): Promise<Metadata> {
  const { videoId } = await params;
  const movie = getYouTubeMovieById(videoId);
  if (!movie) return {};
  return {
    title: movie.title + " — Watch Free on YouTube",
    description: movie.synopsis,
    alternates: { canonical: "/entertainment/youtube/" + movie.videoId },
  };
}

export default async function YouTubeMovieDetailPage({ params }: { params: Promise<{ videoId: string }> }) {
  const { videoId } = await params;
  const movie = getYouTubeMovieById(videoId);
  if (!movie) notFound();

  const base = getSiteUrl();
  const ld = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    description: movie.synopsis,
    actor: movie.cast.map((name) => ({ "@type": "Person", name })),
    potentialAction: { "@type": "WatchAction", target: movie.videoUrl },
    sameAs: [movie.videoUrl],
    url: base + "/entertainment/youtube/" + movie.videoId,
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="guide-hero">
        <div className="container guide-hero-grid">
          <div>
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "Entertainment", href: "/entertainment" },
              { label: "YouTube movies", href: "/entertainment/youtube" },
              { label: movie.title },
            ]} />
            <span className="eyebrow">{movie.year} · {movie.channelName}</span>
            <h1>{movie.title}</h1>
            <p>{movie.synopsis}</p>
            <p className="movie-hero-cast"><strong>Featuring:</strong> {movie.featuredCast.join(" · ")}</p>
            <p className="hero-note">YouTube source checked {movie.lastChecked}. No movie file or thumbnail is copied to MyNigeriaGuide.</p>
          </div>
          <aside className="fee-card">
            <span>Official full movie</span>
            <strong>{movie.durationMinutes ? movie.durationMinutes + " minutes" : "Full length"}</strong>
            <p>Published by {movie.channelName}. Playback remains on YouTube.</p>
            <a className="button" href={movie.videoUrl} target="_blank" rel="noreferrer">Watch on YouTube ↗</a>
            {movie.channelUrl ? <a className="button" href={movie.channelUrl} target="_blank" rel="noreferrer">Open publisher channel ↗</a> : null}
          </aside>
        </div>
      </section>

      <section className="section guide-main-section">
        <div className="container guide-layout">
          <article className="guide-content">
            <section>
              <h2>Cast</h2>
              <p>{movie.cast.join(", ")}</p>
            </section>
            <section>
              <h2>Source details</h2>
              <div className="service-context-grid">
                <article><h3>Publisher</h3><p>{movie.channelName}</p></article>
                <article><h3>Published</h3><p>{movie.publishedAt.slice(0, 10)}</p></article>
                <article><h3>Runtime</h3><p>{movie.durationMinutes ? movie.durationMinutes + " minutes" : "Full movie"}</p></article>
                <article><h3>Rights handling</h3><p>MyNigeriaGuide links to the publisher's YouTube video and does not download, mirror or rehost the film or thumbnail.</p></article>
              </div>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}
