import type { Metadata } from "next";
import Link from "next/link";
import { publicServices } from "@/lib/data";
import { entertainmentTitles } from "@/lib/entertainment";
import { exploreGuides } from "@/lib/explore";
import { jobOpportunities } from "@/lib/jobs";
import { seriesLastChecked, seriesTitles } from "@/lib/series";
import { youtubeMovieLibrary } from "@/lib/youtube-library";

export const metadata: Metadata = {
  title: "Latest Nigeria Movies, Services, Travel & Job Updates",
  description: "Fresh Nigerian movie releases, service changes, travel events and verified job/recruitment updates across MyNigeriaGuide.",
  alternates: { canonical: "/latest" },
};

export const dynamic = "force-static";

function movieChecked(title: (typeof entertainmentTitles)[number]) {
  return [...title.watchLinks.map((link) => link.lastChecked), ...(title.trailer ? [title.trailer.lastChecked] : [])]
    .reduce((latest, value) => value > latest ? value : latest, "");
}

export default function LatestPage() {
  const movies = [...entertainmentTitles]
    .sort((a, b) => movieChecked(b).localeCompare(movieChecked(a)) || b.year - a.year)
    .slice(0, 8);
  const series = [...seriesTitles]
    .sort((a, b) => seriesLastChecked(b).localeCompare(seriesLastChecked(a)) || b.year - a.year)
    .slice(0, 6);
  const services = [...publicServices]
    .sort((a, b) => b.lastVerified.localeCompare(a.lastVerified) || a.shortTitle.localeCompare(b.shortTitle))
    .slice(0, 8);
  const travel = [...exploreGuides]
    .sort((a, b) => b.lastReviewed.localeCompare(a.lastReviewed) || a.shortTitle.localeCompare(b.shortTitle))
    .slice(0, 8);
  const youtube = youtubeMovieLibrary.slice(0, 8);
  const jobs = [...jobOpportunities]
    .sort((a, b) => b.verifiedAt.localeCompare(a.verifiedAt) || Number(b.status === "open") - Number(a.status === "open"))
    .slice(0, 8);

  return (
    <section className="section page-top">
      <div className="container">
        <span className="eyebrow">Fresh crawl hub</span>
        <h1>What is new and worth checking now.</h1>
        <p className="page-intro">Fresh releases, current service changes, seasonal travel plans and verified recruitment updates across all four MyNigeriaGuide pillars.</p>

        <div className="jobs-topic-links top-gap">
          <Link href="/entertainment/movies/october-2026">October 2026 Nigerian movies</Link>
          <Link href="/entertainment/hallelujah-challenge-october-2026">Hallelujah Challenge livestream (5–30 Oct)</Link>
          <Link href="/services/jamb-caps">JAMB 2026/27 CAPS admissions</Link>
          <Link href="/explore/detty-december-lagos-2026">Detty December Lagos 2026</Link>
          <Link href="/explore/calabar-carnival-2026">Calabar Carnival 2026</Link>
          <Link href="/jobs/deadlines">Jobs open now & deadlines</Link>
        </div>

        <div className="admin-two-column top-gap">
          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Watch</span><h2>Movies</h2></div><Link href="/entertainment/movies">All movies →</Link></div>
            <div className="admin-category-list">
              {movies.map((movie) => <Link href={"/entertainment/movies/" + movie.slug} key={movie.slug}><span>{movie.title}</span><strong>{movieChecked(movie)}</strong></Link>)}
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Follow</span><h2>Series</h2></div><Link href="/entertainment/series">All series →</Link></div>
            <div className="admin-category-list">
              {series.map((item) => <Link href={"/entertainment/series/" + item.slug} key={item.slug}><span>{item.title}</span><strong>{seriesLastChecked(item)}</strong></Link>)}
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Free</span><h2>YouTube movies</h2></div><Link href="/entertainment/youtube">All free movies →</Link></div>
            <div className="admin-category-list">
              {youtube.map((movie) => <Link href={movie.internalHref} key={movie.videoId}><span>{movie.title}</span><strong>{movie.publishedAt.slice(0, 10)}</strong></Link>)}
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Do</span><h2>Services</h2></div><Link href="/services">All services →</Link></div>
            <div className="admin-category-list">
              {services.map((service) => <Link href={"/services/" + service.slug} key={service.slug}><span>{service.shortTitle}</span><strong>{service.lastVerified}</strong></Link>)}
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Go</span><h2>Tour Nigeria</h2></div><Link href="/explore">All travel guides →</Link></div>
            <div className="admin-category-list">
              {travel.map((guide) => <Link href={"/explore/" + guide.slug} key={guide.slug}><span>{guide.shortTitle}</span><strong>{guide.lastReviewed}</strong></Link>)}
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Work</span><h2>Jobs & Careers</h2></div><Link href="/jobs">All careers →</Link></div>
            <div className="admin-category-list">
              {jobs.map((job) => <Link href={"/jobs/" + job.slug} key={job.slug}><span>{job.organization}: {job.title}</span><strong>{job.statusLabel}</strong></Link>)}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
