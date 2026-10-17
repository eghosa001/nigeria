import type { EntertainmentTitle } from "@/lib/entertainment";
import { canDisplayEntertainmentArtwork } from "@/lib/entertainment";

function GeneratedArtwork({ title, variant, showSourceLink }: { title: EntertainmentTitle; variant: "card" | "hero"; showSourceLink: boolean }) {
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
        width={640}
        height={960}
        loading={variant === "card" ? "lazy" : "eager"}
        fetchPriority={variant === "hero" ? "high" : "auto"}
        decoding="async"
      />
      <figcaption><span>Original MyNigeriaGuide poster (not official film artwork)</span>{showSourceLink && title.sourcePreview?.sourceUrl ? <a href={title.sourcePreview.sourceUrl} target="_blank" rel="noreferrer">View credited external source ↗</a> : null}</figcaption>
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

  // An external source URL or video preview is not a licence to reproduce its imagery.
  // Show an original poster until a documented permission passes canDisplayEntertainmentArtwork().
  return <GeneratedArtwork title={title} variant={variant} showSourceLink={showSourceLink} />;
}
