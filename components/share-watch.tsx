"use client";

import { useEffect, useState } from "react";

const storageKey = "govguide:watchlist";
export const watchEvent = "govguide-watchlist-updated";

function getWatchlist() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function ShareWatch({ slug, title }: { slug: string; title: string }) {
  const [watched, setWatched] = useState(false);
  const [copied, setCopied] = useState(false);\n  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setWatched(getWatchlist().includes(slug));
  }, [slug]);

  function toggleWatch() {
    const current = new Set(getWatchlist());
    if (current.has(slug)) current.delete(slug);
    else current.add(slug);
    localStorage.setItem(storageKey, JSON.stringify([...current]));
    setWatched(current.has(slug));
    window.dispatchEvent(new Event(watchEvent));
  }

  async function share() {
    const url = window.location.href;
    const text = title + " — current requirements, fees and official links on GovGuide Nigeria.";
    if (navigator.share) {
      await navigator.share({ title, text, url }).catch(() => undefined);
      return;
    }
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const whatsappText = typeof window === "undefined"
    ? ""
    : encodeURIComponent(title + "\nCurrent requirements, fees and official links:\n" + window.location.href);

  return (
    <div className="guide-actions" aria-label="Guide actions">
      <button type="button" onClick={share}>{copied ? "Link copied" : "Share"}</button>
      <a href={"https://wa.me/?text=" + whatsappText} target="_blank" rel="noreferrer">WhatsApp</a>
      <button type="button" className={watched ? "active" : ""} onClick={toggleWatch}>
        {watched ? "Watching" : "Watch this guide"}
      </button>
      <small>Watching saves this guide on this device. Live change alerts will activate only when the notification backend is connected.</small>
    </div>
  );
}
