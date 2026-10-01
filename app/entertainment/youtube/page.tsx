import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { YouTubeMovieCard } from "@/components/youtube-movie-card";
import { verifiedYouTubeMovieChannels } from "@/lib/youtube-movie-channels";
import { youtubeMovieLibrary } from "@/lib/youtube-library";
import { YOUTUBE_CATALOG_PAGE_SIZE } from "@/lib/youtube-pagination";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; channel?: string; page?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const filtered = Boolean((params.q ?? "").trim() || (params.channel ?? "").trim() || Number(params.page ?? "1") > 1);
  return {
    title: "Full Nigerian Movies on YouTube",
    description: "Browse full Nigerian and Nollywood movies on YouTube by title, actor and publisher.",
    alternates: { canonical: "/entertainment/youtube" },
    robots: filtered ? { index: false, follow: true } : undefined,
  };
}

export default async function YouTubeMoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; channel?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim().toLowerCase();
  const channel = (params.channel ?? "").trim();
  const requestedPage = Math.max(1, Number(params.page ?? "1") || 1);
  const filteredMode = Boolean(query || channel);

  if (!filteredMode && requestedPage > 1) {
    redirect("/entertainment/youtube/page/" + requestedPage);
  }

  const filtered = youtubeMovieLibrary
    .filter((movie) => {
      const searchable = [movie.title, movie.synopsis, ...movie.cast, movie.channelName].join(" ").toLowerCase();
      return (!query || searchable.includes(query)) && (!channel || movie.channelName === channel);
    })
    .sort((a, b) => {
      if (!query) return b.publishedAt.localeCompare(a.publishedAt);
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const rank = (title: string) => title === query ? 3 : title.startsWith(query) ? 2 : title.includes(query) ? 1 : 0;
      return rank(bTitle) - rank(aTitle) || b.publishedAt.localeCompare(a.publishedAt);
    });

  const pageCount = Math.max(1, Math.ceil(filtered.length / YOUTUBE_CATALOG_PAGE_SIZE));
  const page = Math.min(requestedPage, pageCount);
  const visible = filtered.slice((page - 1) * YOUTUBE_CATALOG_PAGE_SIZE, page * YOUTUBE_CATALOG_PAGE_SIZE);

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
              <span className="eyebrow">Free on YouTube</span>
              <h1>Full Nigerian movies on YouTube.</h1>
              <p className="page-intro">Search by movie, actor or publisher, then open the video on YouTube.</p>
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
          <form className="movie-filter-bar movie-youtube-filter" method="get">
            <label className="movie-filter-search">
              <span>Search movies or actors</span>
              <input name="q" defaultValue={params.q ?? ""} placeholder="Movie, actor or description…" />
            </label>
            <label>
              <span>Publisher</span>
              <select name="channel" defaultValue={channel}>
                <option value="">All publishers</option>
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
              {page > 1 ? (
                filteredMode
                  ? <Link prefetch={false} href={{ pathname: "/entertainment/youtube", query: { q: params.q || undefined, channel: channel || undefined, page: page - 1 } }}>← Previous</Link>
                  : <Link prefetch={false} href={page === 2 ? "/entertainment/youtube" : "/entertainment/youtube/page/" + (page - 1)}>← Previous</Link>
              ) : <span />}
              <span>Page {page} of {pageCount}</span>
              {page < pageCount ? (
                filteredMode
                  ? <Link prefetch={false} href={{ pathname: "/entertainment/youtube", query: { q: params.q || undefined, channel: channel || undefined, page: page + 1 } }}>Next →</Link>
                  : <Link prefetch={false} href={"/entertainment/youtube/page/" + (page + 1)}>Next →</Link>
              ) : <span />}
            </nav>
          ) : null}
        </div>
      </section>
    </>
  );
}
