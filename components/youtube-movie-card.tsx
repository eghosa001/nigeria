import Link from "next/link";
import { RemoteMoviePreviewImage } from "@/components/remote-movie-preview-image";
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
        <RemoteMoviePreviewImage
          src={"https://i.ytimg.com/vi/" + movie.videoId + "/mqdefault.jpg"}
          fallbackSrc={"https://img.youtube.com/vi/" + movie.videoId + "/hqdefault.jpg"}
          title={movie.title}
          alt={movie.title + " official YouTube video thumbnail"}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
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
          {movie.featuredCast.length ? movie.featuredCast.join(" · ") : "Cast details pending verification"}
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
