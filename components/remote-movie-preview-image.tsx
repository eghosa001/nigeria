"use client";

import { useState } from "react";

type Props = {
  src: string;
  fallbackSrc?: string;
  alt: string;
  title: string;
  loading?: "eager" | "lazy";
  priority?: boolean;
  className?: string;
};

/**
 * Keep a legible cover visible even if an official CDN refuses the thumbnail,
 * without storing or altering a YouTube/film-owner image.
 */
export function RemoteMoviePreviewImage({
  src, fallbackSrc, alt, title, loading = "lazy", priority = false, className = "",
}: Props) {
  const [attempt, setAttempt] = useState(0);
  const currentSrc = attempt === 0 ? src : attempt === 1 ? fallbackSrc : undefined;
  return (
    <div className={"remote-movie-preview " + className}>
      <div className="remote-movie-preview-fallback" role="img" aria-label={"Image unavailable for " + title}>
        <span>Film preview</span>
        <strong>{title}</strong>
      </div>
      {currentSrc ? (
        <img
          key={currentSrc}
          className="remote-movie-preview-picture"
          src={currentSrc}
          alt={alt}
          width={480}
          height={360}
          loading={loading}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          referrerPolicy="strict-origin-when-cross-origin"
          onError={() => setAttempt((value) => value + 1)}
        />
      ) : null}
    </div>
  );
}
