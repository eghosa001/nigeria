import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { approvedYouTubeSourceCapacity, verifiedYouTubeMovieChannels } from "@/lib/youtube-movie-channels";
import { youtubeMovieLibrary, youtubeLibraryGeneratedAt, youtubePendingQualityCount } from "@/lib/youtube-library";

export const metadata: Metadata = {
  title: "Full Nigerian Movies on YouTube",
  description: "Browse full Nigerian and Nollywood movies from approved producer and rightsholder YouTube channels.",
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
    <section className="section page-top">
      <div className="container">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Entertainment", href: "/entertainment" },
          { label: "YouTube movies" },
        ]} />
        <span className="eyebrow">Free full movies</span>
        <h1>Nigerian movies from approved YouTube publishers.</h1>
        <p className="page-intro">
          The source network currently represents more than {approvedYouTubeSourceCapacity.toLocaleString()} full-movie candidates. Movies are published here only after the official YouTube API confirms the channel and our filters confirm a full-length public movie with usable cast metadata.
        </p>

        <div className="category-summary">
          <div><strong>{youtubeMovieLibrary.length}</strong><span>published YouTube movies</span></div>
          <div><strong>{verifiedYouTubeMovieChannels.length}</strong><span>approved source channels</span></div>
          <div><strong>{approvedYouTubeSourceCapacity.toLocaleString()}+</strong><span>source-pool movie estimate</span></div>
        </div>

        <form className="directory-controls" method="get">
          <label className="directory-search">
            <span>Search movies or actors</span>
            <input name="q" defaultValue={params.q ?? ""} placeholder="movie, actor or description…" />
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
          <button className="report-button" type="submit">Search</button>
        </form>

        <div className="directory-summary" aria-live="polite">
          <strong>{filtered.length}</strong> matching full movie{filtered.length === 1 ? "" : "s"}
          {youtubeLibraryGeneratedAt ? <span> · API sync {youtubeLibraryGeneratedAt.slice(0, 10)}</span> : <span> · bulk API sync not run yet</span>}
        </div>

        <div className="related-links">
          <Link href="/entertainment/youtube/sources">See all approved YouTube sources →</Link>
          <Link href="/entertainment/image-rights">Image-rights policy →</Link>
        </div>

        <div className="service-grid top-gap">
          {visible.map((movie) => (
            <article className="service-card" key={movie.videoId}>
              <div className="card-topline">
                <span>{movie.year}</span>
                <span>{movie.channelName}</span>
              </div>
              <h3><Link href={movie.internalHref} prefetch={false}>{movie.title}</Link></h3>
              <p>{movie.synopsis}</p>
              <p className="movie-card-cast"><strong>Featuring:</strong> {movie.featuredCast.join(" · ")}</p>
              <div className="service-meta">
                <strong>{movie.durationMinutes ? movie.durationMinutes + " min" : "Full movie"}</strong>
                <a href={movie.videoUrl} target="_blank" rel="noreferrer">Watch free on YouTube →</a>
              </div>
            </article>
          ))}
        </div>

        {pageCount > 1 ? (
          <div className="directory-load-more">
            <div className="related-links">
              {page > 1 ? <Link prefetch={false} href={{ pathname: "/entertainment/youtube", query: { q: params.q || undefined, channel: channel || undefined, page: page - 1 } }}>← Previous</Link> : null}
              <span>Page {page} of {pageCount}</span>
              {page < pageCount ? <Link prefetch={false} href={{ pathname: "/entertainment/youtube", query: { q: params.q || undefined, channel: channel || undefined, page: page + 1 } }}>Next →</Link> : null}
            </div>
          </div>
        ) : null}

        {youtubePendingQualityCount ? (
          <div className="info-box top-gap">
            <strong>{youtubePendingQualityCount} additional videos are held for metadata review.</strong>
            <p>They are not published until a recognizable cast can be extracted or verified. This keeps the growing catalog from turning into low-quality title-only pages.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
