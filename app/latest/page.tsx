import type { Metadata } from "next";
import Link from "next/link";
import { publicServices } from "@/lib/data";
import { entertainmentTitles } from "@/lib/entertainment";
import { exploreGuides } from "@/lib/explore";
import { youtubeMovieLibrary } from "@/lib/youtube-library";

export const metadata: Metadata = {
  title: "Latest Movies, Services & Travel Updates",
  description: "Recently added or reviewed Nigerian movies, practical service guides and Tour Nigeria pages on MyNigeriaGuide.",
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
  const services = [...publicServices]
    .sort((a, b) => b.lastVerified.localeCompare(a.lastVerified) || a.shortTitle.localeCompare(b.shortTitle))
    .slice(0, 8);
  const travel = [...exploreGuides]
    .sort((a, b) => b.lastReviewed.localeCompare(a.lastReviewed) || a.shortTitle.localeCompare(b.shortTitle))
    .slice(0, 8);
  const youtube = youtubeMovieLibrary.slice(0, 8);

  return (
    <section className="section page-top">
      <div className="container">
        <span className="eyebrow">Fresh crawl hub</span>
        <h1>Recently added and updated.</h1>
        <p className="page-intro">A compact path to the newest or most recently reviewed pages across movies, services and Tour Nigeria.</p>

        <div className="admin-two-column top-gap">
          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Watch</span><h2>Movies</h2></div><Link href="/entertainment/movies">All movies →</Link></div>
            <div className="admin-category-list">
              {movies.map((movie) => <Link href={"/entertainment/movies/" + movie.slug} key={movie.slug}><span>{movie.title}</span><strong>{movieChecked(movie)}</strong></Link>)}
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
        </div>
      </div>
    </section>
  );
}
