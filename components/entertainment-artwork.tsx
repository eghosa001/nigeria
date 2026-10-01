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
  return videoId ? {
    videoId,
    href: source.href,
    publisher: source.publisher,
  } : null;
}

function GeneratedArtwork({ title, variant }: { title: EntertainmentTitle; variant: "card" | "hero" }) {
  const genre = title.genres[0] ?? "Nigerian film";
  const initials = title.title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <figure
      className={"entertainment-artwork entertainment-artwork-generated entertainment-artwork-" + variant}
      data-artwork-source="generated"
      data-rights-status="original"
      data-poster-guaranteed="true"
    >
      <div className="generated-movie-art" role="img" aria-label={"Original MyNigeriaGuide poster for " + title.title}>
        <svg viewBox="0 0 600 900" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={"g-" + title.slug} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#082f24" />
              <stop offset="55%" stopColor="#0b573b" />
              <stop offset="100%" stopColor="#15213a" />
            </linearGradient>
            <radialGradient id={"r-" + title.slug} cx="78%" cy="16%" r="70%">
              <stop offset="0%" stopColor="#d1a24a" stopOpacity=".46" />
              <stop offset="100%" stopColor="#d1a24a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="600" height="900" fill={"url(#g-" + title.slug + ")"} />
          <rect width="600" height="900" fill={"url(#r-" + title.slug + ")"} />
          <circle cx="500" cy="170" r="210" fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="2" />
          <circle cx="500" cy="170" r="145" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="2" />
          <path d="M-40 770C110 610 230 840 390 610C480 480 535 520 660 330" fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="14" strokeLinecap="round" />
          <path d="M-20 805C135 650 255 850 410 630C500 505 555 545 650 390" fill="none" stroke="rgba(209,162,74,.36)" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <div className="generated-movie-art-copy">
          <span>{title.year} · {genre}</span>
          <strong>{title.title}</strong>
          <b aria-hidden="true">{initials || "NG"}</b>
        </div>
      </div>
      <figcaption><span>Original MyNigeriaGuide poster</span></figcaption>
    </figure>
  );
}

export function EntertainmentArtwork({
  title,
  variant = "card",
  showSourceLink = true,
}: {
  title: EntertainmentTitle;
  variant?: "card" | "hero";
  showSourceLink?: boolean;
}) {
  if (canDisplayEntertainmentArtwork(title) && title.artwork) {
    return (
      <figure className={"entertainment-artwork entertainment-artwork-approved entertainment-artwork-" + variant} data-artwork-source="licensed" data-rights-status="approved" data-poster-guaranteed="true">
        <img
          src={title.artwork.url}
          alt={title.title + " official promotional artwork"}
          loading={variant === "card" ? "lazy" : "eager"}
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <figcaption>
          <span>Image: {title.artwork.credit}</span>
          {showSourceLink ? <a href={title.artwork.sourceUrl} target="_blank" rel="noreferrer">Rights source ↗</a> : null}
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
        data-rights-status="video-preview"
        data-poster-guaranteed="true"
      >
        <img
          src={"https://i.ytimg.com/vi/" + youtubePreview.videoId + "/hqdefault.jpg"}
          alt={title.title + " official YouTube video artwork"}
          loading={variant === "card" ? "lazy" : "eager"}
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <figcaption>
          <span>{youtubePreview.publisher ? "Preview: " + youtubePreview.publisher : "Official YouTube preview"}</span>
          {showSourceLink ? <a href={youtubePreview.href} target="_blank" rel="noreferrer">Open source ↗</a> : null}
        </figcaption>
      </figure>
    );
  }

  return <GeneratedArtwork title={title} variant={variant} />;
}
