import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { YouTubeMovieCard } from "@/components/youtube-movie-card";
import { verifiedYouTubeMovieChannels } from "@/lib/youtube-movie-channels";
import { getYouTubeCatalogPage, getYouTubeCatalogPageCount } from "@/lib/youtube-pagination";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, getYouTubeCatalogPageCount() - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const value = Number((await params).page);
  const catalog = getYouTubeCatalogPage(value);
  if (!catalog || value === 1) return { robots: { index: false, follow: true } };

  return {
    title: "Full Nigerian Movies on YouTube — Page " + value,
    description: "Browse page " + value + " of full Nigerian and Nollywood movies on YouTube.",
    alternates: { canonical: "/entertainment/youtube/page/" + value },
  };
}

export default async function YouTubeMoviesPaginationPage({ params }: { params: Promise<{ page: string }> }) {
  const pageNumber = Number((await params).page);
  const catalog = getYouTubeCatalogPage(pageNumber);
  if (!catalog || pageNumber === 1) notFound();

  const previousHref = pageNumber === 2 ? "/entertainment/youtube" : "/entertainment/youtube/page/" + (pageNumber - 1);
  const nextHref = pageNumber < catalog.pageCount ? "/entertainment/youtube/page/" + (pageNumber + 1) : null;

  return (
    <>
      <section className="movie-browse-hero movie-youtube-hero">
        <div className="container">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Entertainment", href: "/entertainment" },
            { label: "YouTube movies", href: "/entertainment/youtube" },
            { label: "Page " + pageNumber },
          ]} />
          <div className="movie-browse-heading">
            <div>
              <span className="eyebrow">Free on YouTube</span>
              <h1>Full Nigerian movies on YouTube.</h1>
              <p className="page-intro">Page {pageNumber}.</p>
            </div>
          </div>
          <div className="movie-browse-tabs">
            <Link href="/entertainment/movies">All movies</Link>
            <Link href="/entertainment/releases">New &amp; upcoming</Link>
            <Link href="/entertainment/cinemas">Cinemas</Link>
          </div>
        </div>
      </section>

      <section className="movie-catalog-section movie-youtube-directory">
        <div className="container">
          <form className="movie-filter-bar movie-youtube-filter" method="get" action="/entertainment/youtube">
            <label className="movie-filter-search">
              <span>Search movies or actors</span>
              <input name="q" placeholder="Movie, actor or description…" />
            </label>
            <label>
              <span>Publisher</span>
              <select name="channel" defaultValue="">
                <option value="">All publishers</option>
                {verifiedYouTubeMovieChannels.map((source) => (
                  <option key={source.slug} value={source.name}>{source.name}</option>
                ))}
              </select>
            </label>
            <button className="movie-filter-submit" type="submit">Search</button>
          </form>

          <div className="youtube-movie-grid">
            {catalog.movies.map((movie, index) => (
              <YouTubeMovieCard movie={movie} priority={index < 5} key={movie.videoId} />
            ))}
          </div>

          <nav className="movie-pagination" aria-label="Movie result pages">
            <Link prefetch={false} href={previousHref}>← Previous</Link>
            <span>Page {pageNumber} of {catalog.pageCount}</span>
            {nextHref ? <Link prefetch={false} href={nextHref}>Next →</Link> : <span />}
          </nav>
        </div>
      </section>
    </>
  );
}
