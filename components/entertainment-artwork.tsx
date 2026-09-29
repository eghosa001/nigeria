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
    >
      <div className="generated-movie-art" role="img" aria-label={"Original MyNigeriaGuide artwork for " + title.title}>
        <svg viewBox="0 0 800 450" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={"g-" + title.slug} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#082f24" />
              <stop offset="55%" stopColor="#0b573b" />
              <stop offset="100%" stopColor="#15213a" />
            </linearGradient>
            <radialGradient id={"r-" + title.slug} cx="75%" cy="22%" r="65%">
              <stop offset="0%" stopColor="#d1a24a" stopOpacity=".42" />
              <stop offset="100%" stopColor="#d1a24a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill={"url(#g-" + title.slug + ")"} />
          <rect width="800" height="450" fill={"url(#r-" + title.slug + ")"} />
          <circle cx="690" cy="95" r="170" fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="2" />
          <circle cx="690" cy="95" r="120" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="2" />
          <path d="M-30 390C155 250 300 460 475 292C586 185 690 232 840 80" fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="12" strokeLinecap="round" />
          <path d="M-10 410C170 290 315 468 500 305C610 208 710 248 825 130" fill="none" stroke="rgba(209,162,74,.34)" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div className="generated-movie-art-copy">
          <span>{title.year} · {genre}</span>
          <strong>{title.title}</strong>
          <b aria-hidden="true">{initials || "NG"}</b>
        </div>
      </div>
      <figcaption><span>Original MyNigeriaGuide artwork</span></figcaption>
    </figure>
  );
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
      <figure className={"entertainment-artwork entertainment-artwork-approved entertainment-artwork-" + variant} data-artwork-source="licensed" data-rights-status="approved">
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
        data-rights-status="video-preview"
      >
        <img
          src={"https://i.ytimg.com/vi/" + youtubePreview.videoId + "/mqdefault.jpg"}
          alt={title.title + " official YouTube video thumbnail"}
          loading={variant === "card" ? "lazy" : "eager"}
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <figcaption>
          <span>Official YouTube preview</span>
          <a href={youtubePreview.href} target="_blank" rel="noreferrer">Open source ↗</a>
        </figcaption>
      </figure>
    );
  }

  return <GeneratedArtwork title={title} variant={variant} />;
}
