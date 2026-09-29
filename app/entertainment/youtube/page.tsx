import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { YouTubeMovieCard } from "@/components/youtube-movie-card";
import { verifiedYouTubeMovieChannels } from "@/lib/youtube-movie-channels";
import { youtubeMovieLibrary } from "@/lib/youtube-library";

export const metadata: Metadata = {
  title: "Full Nigerian Movies on YouTube",
  description: "Browse full Nigerian and Nollywood movies visually from approved producer and rightsholder YouTube channels.",
  alternates: { canonical: "/entertainment/youtube" },
};

const PAGE_SIZE = 48;

export default async function YouTubeMoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; channel?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim().toLowerCase();
  const channel = (params.channel ?? "").trim();
  const requestedPage = Math.max(1, Number(params.page ?? "1") || 1);

  const filtered = youtubeMovieLibrary.filter((movie) => {
    const searchable = [movie.title, movie.synopsis, ...movie.cast, movie.channelName].join(" ").toLowerCase();
    return (!query || searchable.includes(query)) && (!channel || movie.channelName === channel);
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(requestedPage, pageCount);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <section className="movie-browse-hero movie-youtube-hero">
        <div className="container">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Entertainment", href: "/entertainment" },
            { label: "YouTube movies" },
          ]} />
          <div className="movie-browse-heading">
            <div>
              <span className="eyebrow">Free full movies</span>
              <h1>Nigerian movies from approved YouTube publishers.</h1>
              <p className="page-intro">
                Scan real YouTube thumbnails, search titles or actors, filter by publisher and open the original video on YouTube.
              </p>
            </div>
          </div>
          <div className="movie-browse-tabs">
            <Link href="/entertainment/movies">All movies</Link>
            <Link href="/entertainment/youtube/sources">Approved sources</Link>
            <Link href="/entertainment/image-rights">Image policy</Link>
          </div>
        </div>
      </section>

      <section className="movie-catalog-section movie-youtube-directory">
        <div className="container">
          <form className="movie-filter-bar movie-youtube-filter" method="get">
            <label className="movie-filter-search">
              <span>Search movies or actors</span>
              <input name="q" defaultValue={params.q ?? ""} placeholder="Movie, actor or description…" />
            </label>
            <label>
              <span>Publisher</span>
              <select name="channel" defaultValue={channel}>
                <option value="">All approved channels</option>
                {verifiedYouTubeMovieChannels.map((source) => (
                  <option key={source.slug} value={source.name}>{source.name}</option>
                ))}
              </select>
            </label>
            <button className="movie-filter-submit" type="submit">Search</button>
          </form>

          <div className="youtube-movie-grid">
            {visible.map((movie, index) => (
              <YouTubeMovieCard movie={movie} priority={index < 5} key={movie.videoId} />
            ))}
          </div>

          {pageCount > 1 ? (
            <nav className="movie-pagination" aria-label="Movie result pages">
              {page > 1 ? <Link prefetch={false} href={{ pathname: "/entertainment/youtube", query: { q: params.q || undefined, channel: channel || undefined, page: page - 1 } }}>← Previous</Link> : <span />}
              <span>Page {page} of {pageCount}</span>
              {page < pageCount ? <Link prefetch={false} href={{ pathname: "/entertainment/youtube", query: { q: params.q || undefined, channel: channel || undefined, page: page + 1 } }}>Next →</Link> : <span />}
            </nav>
          ) : null}
        </div>
      </section>
    </>
  );
}
