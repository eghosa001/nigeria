import type { Metadata } from "next";
import Link from "next/link";
import { entertainmentTitles } from "@/lib/entertainment";
import { entertainmentPeople, releaseItems } from "@/lib/entertainment-extras";
import { verifiedYouTubeMovieChannels } from "@/lib/youtube-movie-channels";
import { youtubeMovieLibrary } from "@/lib/youtube-library";

export const metadata: Metadata = { title: "Movies" };

function latest(values: string[]) {
  return values.reduce((current, value) => value > current ? value : current, "");
}

export default function AdminEntertainmentPage() {
  const curatedFreshness = latest(entertainmentTitles.flatMap((title) => title.watchLinks.map((link) => link.lastChecked)));
  const youtubeFreshness = latest(youtubeMovieLibrary.map((movie) => movie.lastChecked));
  const newest = youtubeMovieLibrary.slice(0, 16);

  return (
    <section className="section page-top admin-page">
      <div className="container">
        <span className="eyebrow">Entertainment operations</span>
        <h1>Movies & publisher catalog</h1>
        <p className="page-intro">Operational view of curated films, official YouTube movies, approved publishers, people profiles and release data.</p>

        <div className="metric-grid">
          <div><strong>{youtubeMovieLibrary.length}</strong><span>YouTube movies</span></div>
          <div><strong>{entertainmentTitles.length}</strong><span>Curated movies</span></div>
          <div><strong>{verifiedYouTubeMovieChannels.length}</strong><span>Approved publishers</span></div>
          <div><strong>{entertainmentPeople.length}</strong><span>People profiles</span></div>
          <div><strong>{releaseItems.length}</strong><span>Release items</span></div>
          <div><strong>{youtubeFreshness || curatedFreshness}</strong><span>Latest source check</span></div>
        </div>

        <div className="admin-two-column">
          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Publishers</span><h2>Approved YouTube sources</h2></div><Link href="/entertainment/youtube/sources">Public sources →</Link></div>
            <div className="admin-category-list">
              {verifiedYouTubeMovieChannels.map((source) => (
                <Link href={"/entertainment/youtube?channel=" + encodeURIComponent(source.name)} key={source.slug}>
                  <span>{source.name}</span><strong>{source.lastChecked}</strong>
                </Link>
              ))}
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Newest</span><h2>Recent YouTube titles</h2></div><Link href="/entertainment/youtube">Public catalog →</Link></div>
            <div className="admin-category-list">
              {newest.map((movie) => (
                <Link href={movie.internalHref} key={movie.videoId}>
                  <span>{movie.title}</span><strong>{movie.publishedAt.slice(0, 10)}</strong>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <section className="admin-panel top-gap">
          <div className="section-heading"><div><span className="eyebrow">Curated catalog</span><h2>Movie records</h2></div><Link href="/entertainment/movies">Public movies →</Link></div>
          <div className="review-table">
            {entertainmentTitles.map((movie) => (
              <Link href={"/entertainment/movies/" + movie.slug} key={movie.slug}>
                <span><strong>{movie.title}</strong><small>{movie.year} · {movie.watchLinks.map((link) => link.platform).join(" / ")}</small></span>
                <span>{movie.watchLinks.length} source{movie.watchLinks.length === 1 ? "" : "s"}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
