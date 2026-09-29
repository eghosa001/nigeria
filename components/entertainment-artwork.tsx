import type { EntertainmentTitle } from "@/lib/entertainment";
import { canDisplayEntertainmentArtwork } from "@/lib/entertainment";

function youtubeVideoId(href: string) {
  try {
    const url = new URL(href);
    if (url.hostname === "youtu.be") return url.pathname.slice(1);
    if (url.hostname.endsWith("youtube.com")) return url.searchParams.get("v");
  } catch {}
  return null;
}

function getYouTubePreview(title: EntertainmentTitle) {
  const fullMovie = title.watchLinks.find(
    (link) => link.platform === "YouTube" && link.access === "full-movie",
  );
  const source = fullMovie ?? title.trailer;
  if (!source) return null;
  const videoId = youtubeVideoId(source.href);
  return videoId ? { videoId, href: source.href } : null;
}

export function EntertainmentArtwork({
  title,
  variant = "card",
}: {
  title: EntertainmentTitle;
  variant?: "card" | "hero";
}) {
  if (canDisplayEntertainmentArtwork(title) && title.artwork) {
    return (
      <figure className={"entertainment-artwork entertainment-artwork-approved entertainment-artwork-" + variant}>
        <img
          src={title.artwork.url}
          alt={title.title + " official promotional artwork"}
          loading={variant === "card" ? "lazy" : "eager"}
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <figcaption>
          <span>Image: {title.artwork.credit}</span>
          <a href={title.artwork.sourceUrl} target="_blank" rel="noreferrer">Rights source ↗</a>
        </figcaption>
      </figure>
    );
  }

  const youtubePreview = getYouTubePreview(title);
  if (youtubePreview) {
    return (
      <figure
        className={"entertainment-artwork entertainment-artwork-youtube entertainment-artwork-" + variant}
        data-artwork-source="youtube"
        data-rights-status="poster-pending"
      >
        <img
          src={"https://i.ytimg.com/vi/" + youtubePreview.videoId + "/mqdefault.jpg"}
          alt={title.title + " official YouTube video thumbnail"}
          loading={variant === "card" ? "lazy" : "eager"}
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <figcaption>
          <span>YouTube preview</span>
          <a href={youtubePreview.href} target="_blank" rel="noreferrer">Open source ↗</a>
        </figcaption>
      </figure>
    );
  }

  return (
    <div
      className={"entertainment-artwork entertainment-artwork-placeholder entertainment-artwork-" + variant}
      data-rights-status="pending"
      aria-label={title.title + " poster artwork withheld pending rights verification"}
    >
      <span>Poster pending</span>
      <strong>{title.title}</strong>
      <small>Artwork appears after its reuse rights are cleared.</small>
    </div>
  );
}
