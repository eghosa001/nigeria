"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { watchEvent } from "@/components/share-watch";
import { StatusBadge } from "@/components/status-badge";
import { CategoryIcon } from "@/components/category-icon";
import type { PublicServiceListing } from "@/lib/data";

const storageKey = "mynigeriaguide:watchlist";
const snapshotKey = "mynigeriaguide:watch-snapshots";

type SavedService = Pick<PublicServiceListing,
  "slug" | "title" | "shortTitle" | "summary" | "category" | "feeLabel" | "status" | "lastVerified"
> & { agencyShortName?: string };
type Snapshots = Record<string, { title?: string; feeLabel?: string; lastVerified?: string }>;

function loadIds(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(parsed)
      ? [...new Set(parsed.filter((item): item is string => typeof item === "string" && /^[a-z0-9-]{1,120}$/.test(item)))].slice(0, 40)
      : [];
  } catch { return []; }
}

export function SavedGuides() {
  const [ids, setIds] = useState<string[]>([]);
  const [snapshots, setSnapshots] = useState<Snapshots>({});
  const [watched, setWatched] = useState<SavedService[]>([]);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setIds(loadIds());
      try { setSnapshots(JSON.parse(localStorage.getItem(snapshotKey) ?? "{}")); }
      catch { setSnapshots({}); }
      setReady(true);
    };
    refresh();
    window.addEventListener(watchEvent, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(watchEvent, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const requested = ids.join(",");
  useEffect(() => {
    if (!ready || !requested) {
      setWatched([]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setFailed(false);
    fetch("/api/services/saved?slugs=" + encodeURIComponent(requested), {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Saved guides unavailable");
        return response.json() as Promise<{ items: SavedService[] }>;
      })
      .then((payload) => { if (!controller.signal.aborted) setWatched(payload.items); })
      .catch(() => { if (!controller.signal.aborted) setFailed(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [ready, requested]);

  if (!ready || loading) return <p role="status">Loading saved guides…</p>;
  if (failed) return <div className="empty-state">
    <strong>Your saved guides could not load.</strong>
    <p>Your saved list is still on this device. Reopen this page to try again.</p>
  </div>;
  if (!ids.length || !watched.length) return <div className="empty-state">
    <strong>No saved guides yet.</strong>
    <p>Open any service guide and choose “Watch this guide” to keep it here on this device.</p>
  </div>;

  function markReviewed(service: SavedService) {
    const next = { ...snapshots, [service.slug]: { title: service.title, feeLabel: service.feeLabel, lastVerified: service.lastVerified } };
    localStorage.setItem(snapshotKey, JSON.stringify(next));
    setSnapshots(next);
  }

  return <div className="service-grid">{watched.map((service) => {
    const snap = snapshots[service.slug];
    const changed = Boolean(snap && (snap.feeLabel !== service.feeLabel || snap.lastVerified !== service.lastVerified));
    return <div className="saved-guide-wrap" key={service.slug}>
      {changed ? <div className="saved-change"><strong>Updated since you saved it</strong><span>Fee, verification date or guide details may have changed.</span><button type="button" onClick={() => markReviewed(service)}>Mark reviewed</button></div> : null}
      <Link className="service-card" href={"/services/" + service.slug}>
        <div className="card-topline"><span className="service-card-category"><span className="service-card-icon"><CategoryIcon category={service.category} /></span>{service.category}</span><StatusBadge status={service.status} /></div>
        <h3>{service.shortTitle}</h3>
        <p>{service.summary}</p>
        <div className="service-meta">
          <span><small>Fee / status</small><strong>{service.feeLabel}</strong></span>
          <span className="service-agency">{service.agencyShortName}</span>
          <span className="service-card-arrow" aria-hidden="true">↗</span>
        </div>
      </Link>
    </div>;
  })}</div>;
}
