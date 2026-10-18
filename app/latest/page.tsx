import type { Metadata } from "next";
import Link from "next/link";
import { publicServices } from "@/lib/data";
import { entertainmentTitles } from "@/lib/entertainment";
import { exploreGuides } from "@/lib/explore";
import { isIndexableJobOpportunity, jobOpportunities } from "@/lib/jobs";
import { getEffectiveJobStatus, todayIsoNigeria } from "@/lib/job-runtime";
import { selectRecentAcrossGroups } from "@/lib/latest-editorial-selection";
import { seriesLastChecked, seriesTitles } from "@/lib/series";
import { indexableYouTubeMovies } from "@/lib/youtube-library";
import { NigeriaTrendsBackfill } from "@/components/nigeria-trends-backfill";

export const metadata: Metadata = {
  title: "Latest Nigeria Movies, Services, Travel & Job Updates",
  description: "Recently source-checked Nigerian movies, services, tourism guides and currently listed employer opportunities, plus a dated editorial trends archive.",
  alternates: { canonical: "/latest" },
};

// Job deadlines and source-freshness labels must update at Nigerian midnight.
export const dynamic = "force-dynamic";

function movieChecked(title: (typeof entertainmentTitles)[number]) {
  return [...title.watchLinks.map((link) => link.lastChecked), ...(title.trailer ? [title.trailer.lastChecked] : [])]
    .reduce((latest, value) => value > latest ? value : latest, "");
}

export default function LatestPage() {
  const today = todayIsoNigeria();
  const movies = [...entertainmentTitles]
    .sort((a, b) => movieChecked(b).localeCompare(movieChecked(a)) || b.year - a.year)
    .slice(0, 8);
  const series = [...seriesTitles]
    .sort((a, b) => seriesLastChecked(b).localeCompare(seriesLastChecked(a)) || b.year - a.year)
    .slice(0, 6);
  const services = selectRecentAcrossGroups(publicServices, {
    date: (item) => item.lastVerified, key: (item) => item.slug,
    group: (item) => item.agencySlug, today,
  });
  const travel = selectRecentAcrossGroups(exploreGuides, {
    date: (item) => item.lastReviewed, key: (item) => item.slug,
    group: (item) => item.kind + ":" + item.region, today,
  });
  // Do not promote noindex videos, or let one publisher crowd out others.
  const youtube = selectRecentAcrossGroups(indexableYouTubeMovies, {
    date: (item) => item.publishedAt.slice(0, 10), key: (item) => item.videoId,
    group: (item) => item.channelName, today,
  });
  // The latest shelf is for verifiably current, indexable opportunities.
  // Screening, expired windows and unverified vacancies remain in the
  // detailed career directory with their accurate lifecycle labels.
  const jobs = selectRecentAcrossGroups(
    jobOpportunities.filter((item) => isIndexableJobOpportunity(item) && getEffectiveJobStatus(item, today) === "open"),
    {
      date: (item) => item.verifiedAt, key: (item) => item.slug,
      group: (item) => item.organization, today,
    },
  );

  return (
    <section className="section page-top">
      <div className="container">
        <span className="eyebrow">Latest across Nigeria</span>
        <h1>Recently checked guides and opportunities in Nigeria.</h1>
        <p className="page-intro">
          Browse recent source checks from our four sections. A verification date means
          we reviewed the guide or its source—not that the film, destination or service launched that day.
          Employer openings may close; always confirm at the official application page.
        </p>

        <div className="jobs-topic-links top-gap">
          <Link href="/entertainment/movies/october-2026">October 2026 Nigerian movies</Link>
          <Link href="/entertainment/hallelujah-challenge-october-2026">Hallelujah Challenge livestream (5–30 Oct)</Link>
          <Link href="/services/jamb-caps">JAMB 2026/27 CAPS admissions</Link>
          <Link href="/explore/detty-december-lagos-2026">Detty December Lagos 2026</Link>
          <Link href="/explore/calabar-carnival-2026">Calabar Carnival 2026</Link>
          <Link href="/jobs/deadlines">Jobs open now & deadlines</Link>
          <Link href="#nigeria-october-trends">11–18 October verified trends archive ↓</Link>
        </div>

        <details className="browse-disclosure top-gap">
          <summary>Find more essential verified guides</summary>
          <nav className="disclosure-link-grid" aria-label="Essential Nigerian guides">
            <Link href="/services/nysc-senate-list">Check the NYSC senate list</Link>
            <Link href="/services/jamb-print-result">Print a JAMB result slip</Link>
            <Link href="/services/waec-check-result">Check WAEC results</Link>
            <Link href="/services/cac-name-reservation">Reserve a business name with CAC</Link>
            <Link href="/services/inec-pvc-status">Check your PVC status</Link>
            <Link href="/explore/lagos">Explore Lagos</Link>
            <Link href="/explore/obudu-mountain-resort">Plan a visit to Obudu</Link>
            <Link href="/entertainment/movies/anikulapo">Anikulapo film guide</Link>
          </nav>
        </details>

        <div className="admin-two-column top-gap">
          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Watch · source-checked</span><h2>Movies</h2></div><Link href="/entertainment/movies">All movies →</Link></div>
            <div className="admin-category-list">
              {movies.map((movie) => <Link href={"/entertainment/movies/" + movie.slug} key={movie.slug}><span>{movie.title}</span><strong>Checked {movieChecked(movie)}</strong></Link>)}
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Follow</span><h2>Series</h2></div><Link href="/entertainment/series">All series →</Link></div>
            <div className="admin-category-list">
              {series.map((item) => <Link href={"/entertainment/series/" + item.slug} key={item.slug}><span>{item.title}</span><strong>Checked {seriesLastChecked(item)}</strong></Link>)}
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Free · publication date</span><h2>YouTube movies</h2></div><Link href="/entertainment/youtube">All free movies →</Link></div>
            <div className="admin-category-list">
              {youtube.map((movie) => <Link href={movie.internalHref} key={movie.videoId}><span>{movie.title}</span><strong>Published {movie.publishedAt.slice(0, 10)}</strong></Link>)}
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Do · recently verified agencies</span><h2>Services</h2></div><Link href="/services">All services →</Link></div>
            <div className="admin-category-list">
              {services.map((service) => <Link href={"/services/" + service.slug} key={service.slug}><span>{service.shortTitle}</span><strong>Checked {service.lastVerified}</strong></Link>)}
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Go · reviewed regions</span><h2>Tour Nigeria</h2></div><Link href="/explore">All travel guides →</Link></div>
            <div className="admin-category-list">
              {travel.map((guide) => <Link href={"/explore/" + guide.slug} key={guide.slug}><span>{guide.shortTitle}</span><strong>Reviewed {guide.lastReviewed}</strong></Link>)}
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Work · one listing per employer</span><h2>Jobs & Careers</h2></div><Link href="/jobs">All careers →</Link></div>
            <div className="admin-category-list">
              {jobs.map((job) => <Link href={"/jobs/" + job.slug} key={job.slug}><span>{job.title}</span><strong>{job.organization} · Checked {job.verifiedAt}</strong></Link>)}
            </div>
          </section>
        </div>
        <NigeriaTrendsBackfill />
      </div>
    </section>
  );
}
