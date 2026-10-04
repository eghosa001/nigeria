"use client";

import { useState } from "react";

type Props = {
  videoId: string;
  title: string;
  sourceUrl: string;
  publisher?: string;
};

export function LazyYouTubePlayer({ videoId, title, sourceUrl, publisher }: Props) {
  const [active, setActive] = useState(false);
  const thumbnail = "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg";
  const embed = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(videoId) + "?autoplay=1&playsinline=1&rel=0";

  return (
    <div className="lazy-youtube-player">
      <div className="lazy-youtube-frame">
        {active ? (
          <iframe
            src={embed}
            title={"Watch " + title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="lazy-youtube-poster"
            onClick={() => setActive(true)}
            aria-label={"Watch " + title + " here"}
          >
            <img
              src={thumbnail}
              alt={title + " official YouTube thumbnail"}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <span className="lazy-youtube-play" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="m9 7 8 5-8 5V7Z" /></svg>
            </span>
            <strong>Watch here</strong>
          </button>
        )}
      </div>
      <div className="lazy-youtube-meta">
        <span>
          {active
            ? "Playing from YouTube in privacy-enhanced mode."
            : "The YouTube player loads only after you tap Watch here, keeping this page fast."}
        </span>
        <a href={sourceUrl} target="_blank" rel="noreferrer">
          Open on YouTube ↗
        </a>
        {publisher ? <small>Official source: {publisher}</small> : null}
      </div>
    </div>
  );
}
