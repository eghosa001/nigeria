import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { YouTubeMovieCard } from "@/components/youtube-movie-card";
import { releaseItems } from "@/lib/entertainment-extras";
import { latestYouTubeMovies } from "@/lib/youtube-library";

export const metadata: Metadata = {
  title: "New & Upcoming Nigerian Entertainment",
  description: "Fresh Nigerian streaming additions, films now showing in cinemas and upcoming film events, with official source links.",
  alternates: { canonical: "/entertainment/releases" },
};

const labels = {
  new: "New",
  "now-showing": "Now showing",
  upcoming: "Upcoming",
};

export default function EntertainmentReleasesPage() {
  const latestMovies = latestYouTubeMovies.slice(0, 12);
  return (
    <section className="section page-top">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Entertainment", href: "/entertainment" }, { label: "New & upcoming" }]} />
        <span className="eyebrow">Freshness-first entertainment</span>
        <h1>New, now showing and upcoming.</h1>
        <p className="page-intro">This page is intentionally date-sensitive. Each item links back to the platform, cinema or event organizer that controls the live information.</p>

        <div className="movie-section-heading top-gap">
          <div>
            <span className="eyebrow">Latest official uploads</span>
            <h2>New Nigerian movies on YouTube.</h2>
            <p>This shelf updates from approved publisher channels and is ordered by publication date.</p>
          </div>
        </div>
        <div className="youtube-movie-grid movie-preview-grid">
          {latestMovies.map((movie, index) => (
            <YouTubeMovieCard movie={movie} priority={index < 4} key={movie.videoId} />
          ))}
        </div>

        <div className="service-grid top-gap">
          {releaseItems.map((item) => (
            <article className="service-card" key={item.id}>
              <div className="card-topline"><span>{labels[item.status]}</span><span>{item.platform}</span></div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="service-meta">
                <strong>{item.dateLabel}</strong>
                <a href={item.officialUrl} target="_blank" rel="noreferrer">Official source →</a>
              </div>
              <small className="checked-date">Checked {item.lastChecked}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
