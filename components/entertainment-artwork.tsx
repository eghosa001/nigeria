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

  // YouTube is the final external fallback. Prefer an official trailer thumbnail
  // over a full-movie thumbnail when both are available.
  const source = title.trailer ?? fullMovie;
  if (!source) return null;

  const videoId = youtubeVideoId(source.href);
  return videoId ? {
    videoId,
    href: source.href,
    publisher: source.publisher,
    kind: title.trailer && source.href === title.trailer.href ? "trailer" : "full-movie",
  } : null;
}

function generatedPosterHref(title: EntertainmentTitle) {
  return "/entertainment/poster/" + encodeURIComponent(title.slug);
}

function GeneratedArtwork({ title, variant }: { title: EntertainmentTitle; variant: "card" | "hero" }) {
  return (
    <figure
      className={"entertainment-artwork entertainment-artwork-generated entertainment-artwork-" + variant}
      data-artwork-source="generated-original"
      data-rights-status="original"
      data-poster-guaranteed="true"
    >
      <img
        src={generatedPosterHref(title)}
        alt={"Original MyNigeriaGuide artwork for " + title.title}
        loading={variant === "card" ? "lazy" : "eager"}
        decoding="async"
      />
      <figcaption><span>Original MyNigeriaGuide poster</span></figcaption>
    </figure>
  );
}

export function EntertainmentArtwork({
  title,
  variant = "card",
  showSourceLink = false,
}: {
  title: EntertainmentTitle;
  variant?: "card" | "hero";
  showSourceLink?: boolean;
}) {
  if (canDisplayEntertainmentArtwork(title) && title.artwork) {
    return (
      <figure
        className={"entertainment-artwork entertainment-artwork-approved entertainment-artwork-" + variant}
        data-artwork-source="licensed"
        data-rights-status="approved"
        data-poster-guaranteed="true"
      >
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

  if (title.sourcePreview) {
    const preview = title.sourcePreview;
    return (
      <figure
        className={"entertainment-artwork entertainment-artwork-source entertainment-artwork-" + variant}
        data-artwork-source={preview.sourceKind}
        data-rights-status="source-linked-editorial-preview"
        data-poster-guaranteed="true"
      >
        <div className="entertainment-source-preview-frame">
          <img
            className="entertainment-source-preview-backdrop"
            src={preview.url}
            alt=""
            aria-hidden="true"
            loading={variant === "card" ? "lazy" : "eager"}
            decoding="async"
          />
          <img
            className="entertainment-source-preview-image"
            src={preview.url}
            alt={title.title + " promotional artwork"}
            loading={variant === "card" ? "lazy" : "eager"}
            decoding="async"
          />
        </div>
        <figcaption>
          <span>Source: {preview.credit}</span>
          {showSourceLink ? <a href={preview.sourceUrl} target="_blank" rel="noreferrer">Open source ↗</a> : null}
        </figcaption>
      </figure>
    );
  }

  const youtubePreview = getYouTubePreview(title);
  if (youtubePreview) {
    const thumbnail = "https://i.ytimg.com/vi/" + youtubePreview.videoId + "/hqdefault.jpg";
    return (
      <figure
        className={"entertainment-artwork entertainment-artwork-youtube entertainment-artwork-" + variant}
        data-artwork-source="youtube"
        data-rights-status="video-preview"
        data-poster-guaranteed="true"
      >
        <div className="entertainment-youtube-preview-frame">
          <img
            className="entertainment-youtube-preview-backdrop"
            src={thumbnail}
            alt=""
            aria-hidden="true"
            loading={variant === "card" ? "lazy" : "eager"}
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <img
            className="entertainment-youtube-preview-image"
            src={thumbnail}
            alt={title.title + (youtubePreview.kind === "trailer" ? " official trailer preview" : " official YouTube video preview")}
            loading={variant === "card" ? "lazy" : "eager"}
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </div>
        <figcaption>
          <span>
            {youtubePreview.publisher
              ? (youtubePreview.kind === "trailer" ? "Trailer: " : "Preview: ") + youtubePreview.publisher
              : youtubePreview.kind === "trailer"
                ? "Official YouTube trailer"
                : "Official YouTube preview"}
          </span>
          {showSourceLink ? <a href={youtubePreview.href} target="_blank" rel="noreferrer">Open source ↗</a> : null}
        </figcaption>
      </figure>
    );
  }

  return <GeneratedArtwork title={title} variant={variant} />;
}
