"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/client-analytics";

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
  const [summaryCopied, setSummaryCopied] = useState(false);
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
    const isWatched = current.has(slug);
    setWatched(isWatched);
    trackEvent(isWatched ? "guide_watch_add" : "guide_watch_remove", { service_slug: slug });
    window.dispatchEvent(new Event(watchEvent));
  }

  function buildShareText(url: string) {
    return [
      title,
      feeLabel ? "Fee / status: " + feeLabel : "",
      lastVerified ? "Checked: " + lastVerified : "",
      "Requirements, steps and official sources:",
      url,
    ].filter(Boolean).join("\n");
  }

  async function share() {
    const url = window.location.href;
    const text = buildShareText(url);

    if (navigator.share) {
      const shared = await navigator.share({ title, text, url }).then(() => true).catch(() => false);
      if (shared) trackEvent("guide_share", { service_slug: slug, method: "native" });
      return;
    }

    await navigator.clipboard?.writeText(text);
    trackEvent("guide_share", { service_slug: slug, method: "copy_fallback" });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function copySummary() {
    const text = buildShareText(window.location.href);
    await navigator.clipboard?.writeText(text);
    trackEvent("guide_share", { service_slug: slug, method: "copy_summary" });
    setSummaryCopied(true);
    window.setTimeout(() => setSummaryCopied(false), 1600);
  }

  const whatsappText = encodeURIComponent(buildShareText(pageUrl));

  return (
    <div className="guide-actions" aria-label="Guide actions">
      <button type="button" onClick={share}>{copied ? "Copied" : "Share"}</button>
      <a href={"https://wa.me/?text=" + whatsappText} target="_blank" rel="noreferrer" onClick={() => trackEvent("guide_share", { service_slug: slug, method: "whatsapp" })}>WhatsApp</a>
      <button type="button" onClick={copySummary}>{summaryCopied ? "Summary copied" : "Copy summary"}</button>
      <button type="button" className={watched ? "active" : ""} onClick={toggleWatch}>
        {watched ? "Watching" : "Watch this guide"}
      </button>
      <small>
        Share text includes the current fee/status, last-checked date and this guide link. Watching saves a comparison snapshot on this device.
      </small>
    </div>
  );
}
