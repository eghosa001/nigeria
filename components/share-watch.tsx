"use client";

import { useEffect, useState } from "react";

const storageKey = "mynigeriaguide:watchlist";
export const watchEvent = "mynigeriaguide-watchlist-updated";

function getWatchlist() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

const snapshotKey = "mynigeriaguide:watch-snapshots";

export function ShareWatch({ slug, title, feeLabel, lastVerified }: { slug: string; title: string; feeLabel?: string; lastVerified?: string }) {
  const [watched, setWatched] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setWatched(getWatchlist().includes(slug));
    setPageUrl(window.location.href);
  }, [slug]);

  function toggleWatch() {
    const current = new Set(getWatchlist());
    if (current.has(slug)) current.delete(slug);
    else current.add(slug);

    localStorage.setItem(storageKey, JSON.stringify([...current]));
    try {
      const snapshots = JSON.parse(localStorage.getItem(snapshotKey) ?? "{}");
      if (current.has(slug)) snapshots[slug] = { title, feeLabel, lastVerified };
      else delete snapshots[slug];
      localStorage.setItem(snapshotKey, JSON.stringify(snapshots));
    } catch {}
    setWatched(current.has(slug));
    window.dispatchEvent(new Event(watchEvent));
  }

  async function share() {
    const url = window.location.href;
    const text = title + " — current requirements, fees and official links on MyNigeriaGuide.";

    if (navigator.share) {
      await navigator.share({ title, text, url }).catch(() => undefined);
      return;
    }

    await navigator.clipboard?.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const whatsappText = encodeURIComponent(
    title + "\nCurrent requirements, fees and official links:\n" + pageUrl,
  );

  return (
    <div className="guide-actions" aria-label="Guide actions">
      <button type="button" onClick={share}>{copied ? "Link copied" : "Share"}</button>
      <a href={"https://wa.me/?text=" + whatsappText} target="_blank" rel="noreferrer">WhatsApp</a>
      <button type="button" className={watched ? "active" : ""} onClick={toggleWatch}>
        {watched ? "Watching" : "Watch this guide"}
      </button>
      <small>
        Watching saves a comparison snapshot on this device. Saved Guides will flag fee or verification changes when you return.
      </small>
    </div>
  );
}
