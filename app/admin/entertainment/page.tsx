import type { Metadata } from "next";
import Link from "next/link";
import { entertainmentTitles } from "@/lib/entertainment";
import { verifiedYouTubeMovieChannels } from "@/lib/youtube-movie-channels";
import { youtubeMovieLibrary, youtubePendingQualityCount } from "@/lib/youtube-library";

export const metadata: Metadata = { title: "Movies" };

function latest(values: string[]) {
  return values.reduce((current, value) => value > current ? value : current, "");
}

const PAGE_SIZE = 24;

export default async function AdminEntertainmentPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: requested } = await searchParams;
  const totalPages = Math.max(1, Math.ceil(entertainmentTitles.length / PAGE_SIZE));
  const candidate = Number(requested ?? "1");
  const page = Number.isSafeInteger(candidate) ? Math.min(totalPages, Math.max(1, candidate)) : 1;
  const curatedFreshness = latest(entertainmentTitles.flatMap((title) => title.watchLinks.map((link) => link.lastChecked)));
  const youtubeFreshness = latest(youtubeMovieLibrary.map((movie) => movie.lastChecked));
  const newest = youtubeMovieLibrary.slice(0, 8);

  return (
    <section className="section page-top admin-page">
      <div className="container">
        <span className="eyebrow">Entertainment operations</span>
        <h1>Movies & publisher catalog</h1>
        <p className="page-intro">Operational view of curated films, official YouTube movies, approved publishers, people profiles and release data.</p>

        <div className="metric-grid">
          <div><strong>{youtubeMovieLibrary.length}</strong><span>YouTube movies</span></div>
          <div><strong>{entertainmentTitles.length}</strong><span>Curated movies</span></div>
          <div><strong>{youtubePendingQualityCount}</strong><span>Metadata to review</span></div>
          <div><strong>{youtubeFreshness || curatedFreshness}</strong><span>Latest source check</span></div>
        </div>

        <div className="admin-two-column">
          <section className="admin-panel">
            <div className="section-heading"><div><span className="eyebrow">Publishers</span><h2>Approved YouTube sources</h2></div><Link href="/entertainment/youtube/sources">Public sources →</Link></div>
            <div className="admin-category-list">
              {verifiedYouTubeMovieChannels.slice(0, 8).map((source) => (
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
            {entertainmentTitles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((movie) => (
              <Link href={"/entertainment/movies/" + movie.slug} key={movie.slug}>
                <span><strong>{movie.title}</strong><small>{movie.year} · {movie.watchLinks.map((link) => link.platform).join(" / ")}</small></span>
                <span>{movie.watchLinks.length} source{movie.watchLinks.length === 1 ? "" : "s"}</span>
              </Link>
            ))}
          </div>
          {totalPages > 1 ? (
            <nav className="admin-pagination" aria-label="Movie record pages">
              {page > 1 ? <Link href={"/admin/entertainment?page=" + (page - 1)}>← Previous</Link> : <span />}
              <span>Page {page} of {totalPages}</span>
              {page < totalPages ? <Link href={"/admin/entertainment?page=" + (page + 1)}>Next →</Link> : <span />}
            </nav>
          ) : null}
        </section>
      </div>
    </section>
  );
}
