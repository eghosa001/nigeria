import type { EntertainmentTitle } from "@/lib/entertainment";
import { canDisplayEntertainmentArtwork } from "@/lib/entertainment";
import { getSourceLinkedFilmPreview, getVerifiedYouTubePreview } from "@/lib/movie-media-previews";
import { RemoteMoviePreviewImage } from "@/components/remote-movie-preview-image";

// Generate visible editorial artwork in the HTML itself. A remote SVG image route
// must not be a single point of failure for the whole non-YouTube movie grid.
const posterPalettes = [
  ["#0c1d32", "#285c80", "#f1ba6a"],
  ["#29152a", "#743e68", "#ffa87e"],
  ["#122b28", "#286b60", "#f5c96b"],
  ["#281b21", "#85463d", "#ffd48d"],
  ["#151e36", "#565caa", "#e8b9ed"],
  ["#132c3d", "#347f98", "#efc997"],
  ["#251929", "#95514c", "#ffbc8d"],
  ["#20252d", "#566d7c", "#d8cd9a"],
] as const;

function posterPalette(slug: string) {
  let hash = 2166136261;
  for (let index = 0; index < slug.length; index += 1) {
    hash = Math.imul(hash ^ slug.charCodeAt(index), 16777619);
  }
  return posterPalettes[(hash >>> 0) % posterPalettes.length];
}

function GeneratedArtwork({ title, variant, showSourceLink }: { title: EntertainmentTitle; variant: "card" | "hero"; showSourceLink: boolean }) {
  const [dark, mid, accent] = posterPalette(title.slug);
  return (
    <figure
      className={"entertainment-artwork entertainment-artwork-generated entertainment-artwork-" + variant}
      data-artwork-source="generated-original"
      data-rights-status="original"
      data-poster-guaranteed="true"
      data-poster-rendered="inline"
    >
      <div
        className="generated-movie-art"
        role="img"
        aria-label={"Original illustrated poster for " + title.title + "; not official film artwork"}
        style={{ background: "radial-gradient(circle at 72% 17%, " + accent + "44, transparent 44%), linear-gradient(154deg, " + dark + " 7%, " + mid + " 65%, " + dark + " 100%)" }}
      >
        <svg viewBox="0 0 600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <circle cx="450" cy="190" r="195" fill={accent} fillOpacity=".11" />
          <circle cx="450" cy="190" r="165" stroke={accent} strokeOpacity=".42" strokeWidth="3" fill="none" />
          <circle cx="450" cy="190" r="115" stroke="#ffffff" strokeOpacity=".16" strokeWidth="2" fill="none" />
          <path d="M-70 760 L210 375 L460 690 L720 280" fill="none" stroke={accent} strokeOpacity=".4" strokeWidth="28" />
          <path d="M-95 810 L195 430 L460 750 L720 350" fill="none" stroke="#ffffff" strokeOpacity=".19" strokeWidth="4" />
          <path d="M0 680 Q185 535 310 675 T600 600 L600 900 L0 900 Z" fill={dark} fillOpacity=".48" />
          <path d="M0 765 Q165 660 310 795 T600 700 L600 900 L0 900 Z" fill={mid} fillOpacity=".62" />
          <g stroke={accent} strokeOpacity=".5" strokeWidth="2">
            <path d="M60 60 H160 M60 60 V160" />
            <path d="M540 740 H440 M540 740 V640" />
          </g>
        </svg>
        <div className="generated-movie-art-copy">
          <b aria-hidden="true">{title.year}</b>
          <span>{title.year} · {title.genres[0] ?? "Nigerian cinema"}</span>
          <strong>{title.title}</strong>
        </div>
      </div>
      <figcaption>
        <span>Original MyNigeriaGuide illustration · not official film artwork</span>
        {showSourceLink && title.sourcePreview?.sourceUrl ? <a href={title.sourcePreview.sourceUrl} target="_blank" rel="noreferrer">View credited source ↗</a> : null}
      </figcaption>
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
          width={640}
          height={960}
          loading={variant === "card" ? "lazy" : "eager"}
          fetchPriority={variant === "hero" ? "high" : "auto"}
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

  // Film-owner/exhibitor/press-supplied previews remain credited editorial previews,
  // not licensed artwork. A random film database image is never treated as approved.
  const officialSourcePreview = getSourceLinkedFilmPreview(title);
  const youtube = getVerifiedYouTubePreview(title);
  if (officialSourcePreview) {
    return (
      <figure
        className={"entertainment-artwork entertainment-artwork-source entertainment-artwork-" + variant}
        data-artwork-source={officialSourcePreview.sourceKind}
        data-rights-status="source-linked-editorial-preview"
        data-poster-guaranteed="true"
      >
        <div className="entertainment-source-preview-frame">
          <RemoteMoviePreviewImage
            src={officialSourcePreview.url}
            fallbackSrc={youtube ? "https://i.ytimg.com/vi/" + youtube.videoId + "/hqdefault.jpg" : undefined}
            title={title.title}
            alt={title.title + " promotional preview credited to " + officialSourcePreview.credit}
            loading={variant === "card" ? "lazy" : "eager"}
            priority={variant === "hero"}
          />
        </div>
        <figcaption>
          <span>Preview: {officialSourcePreview.credit}</span>
          {showSourceLink ? <a href={officialSourcePreview.sourceUrl} target="_blank" rel="noreferrer">View credited source ↗</a> : null}
        </figcaption>
      </figure>
    );
  }

  // Unmodified thumbnails belong to their original, linked YouTube videos.
  // They must never be labelled as licensed standalone photographic posters.
  if (youtube) {
    return (
      <figure
        className={"entertainment-artwork entertainment-artwork-youtube entertainment-artwork-" + variant}
        data-artwork-source="youtube"
        data-rights-status="linked-video-preview"
        data-poster-guaranteed="true"
      >
        <div className="entertainment-youtube-preview-frame">
          <RemoteMoviePreviewImage
            src={"https://i.ytimg.com/vi/" + youtube.videoId + "/hqdefault.jpg"}
            fallbackSrc={"https://img.youtube.com/vi/" + youtube.videoId + "/mqdefault.jpg"}
            title={title.title}
            alt={title.title + " " + (youtube.kind === "trailer" ? "trailer thumbnail" : "publisher YouTube full-movie thumbnail")}
            loading={variant === "card" ? "lazy" : "eager"}
            priority={variant === "hero"}
          />
        </div>
        <figcaption>
          <span>{youtube.kind === "trailer" ? "Trailer" : "Video"} on YouTube{youtube.publisher ? " · " + youtube.publisher : ""}</span>
          {showSourceLink ? <a href={youtube.href} target="_blank" rel="noreferrer">Open video ↗</a> : null}
        </figcaption>
      </figure>
    );
  }

  return <GeneratedArtwork title={title} variant={variant} showSourceLink={showSourceLink} />;
}
