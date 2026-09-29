import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { entertainmentTitles, getFeaturedCast } from "@/lib/entertainment";
import { verifiedYouTubeMovieChannels } from "@/lib/youtube-movie-channels";

export const metadata: Metadata = {
  title: "Full Nigerian Movies on YouTube",
  description: "Browse full Nigerian and Nollywood movies from verified producer and rightsholder YouTube channels.",
  alternates: { canonical: "/entertainment/youtube" },
};

export default function YouTubeMoviesPage() {
  const youtubeMovies = entertainmentTitles
    .filter((title) => title.watchLinks.some((link) => link.platform === "YouTube" && link.access === "full-movie"))
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

  return (
    <section className="section page-top">
      <div className="container">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Entertainment", href: "/entertainment" },
          { label: "YouTube movies" },
        ]} />
        <span className="eyebrow">Free full movies</span>
        <h1>Nigerian movies on official YouTube channels.</h1>
        <p className="page-intro">
          This directory is built from approved producer/rightsholder channels, not general YouTube search results. The movie stays on YouTube; MyNigeriaGuide stores only lightweight metadata and the official link.
        </p>

        <div className="section-heading top-gap">
          <div><span className="eyebrow">Approved channels</span><h2>Channels we currently trust for bulk ingestion.</h2></div>
        </div>
        <div className="service-grid">
          {verifiedYouTubeMovieChannels.map((channel) => (
            <article className="service-card" key={channel.slug}>
              <div className="card-topline"><span>{channel.handle}</span><span>Checked {channel.lastChecked}</span></div>
              <h3>{channel.name}</h3>
              <p>{channel.verificationBasis}</p>
              <div className="service-meta">
                <strong>{youtubeMovies.filter((title) => title.watchLinks.some((link) => link.publisher === channel.name)).length} catalog movies</strong>
                <a href={channel.channelUrl} target="_blank" rel="noreferrer">Open channel →</a>
              </div>
            </article>
          ))}
        </div>

        <div className="section-heading top-gap">
          <div><span className="eyebrow">Full movie catalog</span><h2>{youtubeMovies.length} verified YouTube movies and growing.</h2></div>
          <Link href="/entertainment/movies?platform=YouTube">Use full movie filters →</Link>
        </div>
        <div className="service-grid">
          {youtubeMovies.map((title) => {
            const watch = title.watchLinks.find((link) => link.platform === "YouTube" && link.access === "full-movie");
            return (
              <article className="service-card" key={title.slug}>
                <div className="card-topline"><span>{title.year}</span><span>{watch?.publisher ?? "YouTube"}</span></div>
                <h3><Link href={"/entertainment/movies/" + title.slug}>{title.title}</Link></h3>
                <p>{title.synopsis}</p>
                <p className="movie-card-cast"><strong>Featuring:</strong> {getFeaturedCast(title).join(" · ")}</p>
                <div className="service-meta">
                  <strong>{title.genres.slice(0, 2).join(" · ")}</strong>
                  {watch ? <a href={watch.href} target="_blank" rel="noreferrer">Watch free on YouTube →</a> : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
