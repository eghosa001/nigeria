import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { YouTubeMovieCard } from "@/components/youtube-movie-card";
import { getEffectiveReleaseStatus } from "@/lib/content-freshness";
import { releaseItems } from "@/lib/entertainment-extras";
import { latestYouTubeMovies } from "@/lib/youtube-library";

export const metadata: Metadata = {
  title: "New & Upcoming Nigerian Entertainment",
  description: "Fresh Nigerian streaming additions, films now showing in cinemas and upcoming film events, with official source links.",
  alternates: { canonical: "/entertainment/releases" },
};

export const revalidate = 3600;

const labels = {
  new: "New",
  "now-showing": "Now showing",
  upcoming: "Upcoming",
  ended: "Ended",
} as const;

const statusOrder = {
  "now-showing": 0,
  new: 1,
  upcoming: 2,
  ended: 3,
} as const;

export default function EntertainmentReleasesPage() {
  const latestMovies = latestYouTubeMovies.slice(0, 12);
  const lifecycleItems = releaseItems
    .map((item) => ({ ...item, effectiveStatus: getEffectiveReleaseStatus(item) }))
    .sort((a, b) =>
      statusOrder[a.effectiveStatus] - statusOrder[b.effectiveStatus] ||
      (a.startDate ?? "9999-12-31").localeCompare(b.startDate ?? "9999-12-31"),
    );
  const activeItems = lifecycleItems.filter((item) => item.effectiveStatus !== "ended");
  const endedItems = lifecycleItems.filter((item) => item.effectiveStatus === "ended");

  return (
    <section className="section page-top">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Entertainment", href: "/entertainment" }, { label: "New & upcoming" }]} />
        <span className="eyebrow">New releases</span>
        <h1>New, now showing and upcoming.</h1>
        <p className="page-intro">Release labels are calculated from verified release dates, so a premiere automatically stops being shown as upcoming after its date passes.</p>

        <div className="movie-section-heading top-gap">
          <div>
            <span className="eyebrow">Latest official uploads</span>
            <h2>Latest Nigerian movies on YouTube.</h2>
          </div>
        </div>
        <div className="youtube-movie-grid movie-preview-grid">
          {latestMovies.map((movie, index) => (
            <YouTubeMovieCard movie={movie} priority={index < 4} key={movie.videoId} />
          ))}
        </div>

        <div className="service-grid top-gap">
          {activeItems.map((item) => (
            <article className="service-card" key={item.id}>
              <div className="card-topline"><span>{labels[item.effectiveStatus]}</span><span>{item.platform}</span></div>
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

        {endedItems.length ? (
          <section className="top-gap">
            <div className="section-heading">
              <div><span className="eyebrow">Recent archive</span><h2>Events that have ended.</h2></div>
            </div>
            <div className="service-grid">
              {endedItems.map((item) => (
                <article className="service-card" key={item.id}>
                  <div className="card-topline"><span>{labels[item.effectiveStatus]}</span><span>{item.platform}</span></div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="service-meta">
                    <strong>{item.dateLabel}</strong>
                    <a href={item.officialUrl} target="_blank" rel="noreferrer">Official source →</a>
                  </div>
                  <small className="checked-date">Last checked {item.lastChecked}</small>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
