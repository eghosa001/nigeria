"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  videoId: string;
  title: string;
  sourceUrl: string;
  publisher?: string;
};

type LockableOrientation = ScreenOrientation & {
  lock?: (orientation: "landscape") => Promise<void>;
  unlock?: () => void;
};

export function LazyYouTubePlayer({ videoId, title, sourceUrl, publisher }: Props) {
  const [active, setActive] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFullscreenSupported(Boolean(document.fullscreenEnabled && playerRef.current?.requestFullscreen));

    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        try {
          const lockAttempt = (screen.orientation as LockableOrientation).lock?.("landscape");
          void lockAttempt?.catch(() => undefined);
        } catch {}
        return;
      }

      try {
        (screen.orientation as LockableOrientation).unlock?.();
      } catch {}
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  async function openLandscapeFullscreen() {
    const player = playerRef.current;
    if (!player?.requestFullscreen) return;

    try {
      await player.requestFullscreen();
      try {
        await (screen.orientation as LockableOrientation).lock?.("landscape");
      } catch {}
    } catch {}
  }
  const thumbnail = "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg";
  const embed = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(videoId) + "?autoplay=1&playsinline=1&rel=0&fs=0";

  return (
    <div className="lazy-youtube-player" ref={playerRef}>
      <div className="lazy-youtube-frame">
        {active ? (
          <>
            <iframe
              src={embed}
              title={"Watch " + title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            {fullscreenSupported ? (
              <button
                type="button"
                className="lazy-youtube-landscape-overlay"
                onClick={openLandscapeFullscreen}
                aria-label="Open video in landscape full screen"
              >
                Landscape
              </button>
            ) : null}
          </>
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
              width={480}
              height={360}
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
        {active && fullscreenSupported ? (
          <button type="button" className="lazy-youtube-fullscreen" onClick={openLandscapeFullscreen}>
            Full screen landscape
          </button>
        ) : null}
        <a href={sourceUrl} target="_blank" rel="noreferrer">
          Open on YouTube ↗
        </a>
        {publisher ? <small>Official source: {publisher}</small> : null}
      </div>
    </div>
  );
}
