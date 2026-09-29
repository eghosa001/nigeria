import type { EntertainmentTitle } from "@/lib/entertainment";
import { canDisplayEntertainmentArtwork } from "@/lib/entertainment";

export function EntertainmentArtwork({
  title,
  variant = "card",
}: {
  title: EntertainmentTitle;
  variant?: "card" | "hero";
}) {
  if (!canDisplayEntertainmentArtwork(title) || !title.artwork) {
    return (
      <div
        className={"entertainment-artwork entertainment-artwork-placeholder entertainment-artwork-" + variant}
        data-rights-status="pending"
        aria-label={title.title + " artwork withheld pending rights verification"}
      >
        <span>Movie artwork</span>
        <strong>{title.title}</strong>
        <small>Image withheld until usage rights are verified.</small>
      </div>
    );
  }

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
