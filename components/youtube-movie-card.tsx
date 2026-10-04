import Link from "next/link";
import type { YouTubeMovieRecord } from "@/lib/youtube-library";

function runtimeLabel(minutes: number) {
  if (!minutes) return "Full movie";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours ? hours + "h " + (mins ? mins + "m" : "") : mins + "m";
}

export function YouTubeMovieCard({
  movie,
  priority = false,
}: {
  movie: YouTubeMovieRecord;
  priority?: boolean;
}) {
  return (
    <article className="youtube-movie-card movie-card-clickable">
      <Link className="movie-card-hitarea" href={movie.internalHref} prefetch={false} aria-label={"View details for " + movie.title} />
      <Link
        className="youtube-movie-thumbnail"
        href={movie.internalHref}
        prefetch={false}
        aria-label={"View details for " + movie.title}
      >
        <img
          src={"https://i.ytimg.com/vi/" + movie.videoId + "/mqdefault.jpg"}
          alt={movie.title + " YouTube thumbnail"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </Link>
      <div className="youtube-movie-body">
        <div className="youtube-movie-meta">
          <span>YouTube · {movie.year}</span>
          <span>{runtimeLabel(movie.durationMinutes)}</span>
        </div>
        <h3><Link href={movie.internalHref} prefetch={false}>{movie.title}</Link></h3>
        <p className="youtube-movie-description">{movie.synopsis}</p>
        <p className="youtube-movie-cast">
          {movie.featuredCast.length ? movie.featuredCast.join(" · ") : "Full Nigerian movie"}
        </p>
        <div className="youtube-movie-card-footer">
          <span className="youtube-movie-publisher">
            {movie.channelName}{movie.alternateSources.length ? " · " + (movie.alternateSources.length + 1) + " official sources" : ""}
          </span>
          <Link href={movie.internalHref} prefetch={false}>Details →</Link>
        </div>
      </div>
    </article>
  );
}
