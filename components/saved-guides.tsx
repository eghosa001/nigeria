"use client";

import { useEffect, useMemo, useState } from "react";
import { ServiceCard } from "@/components/service-card";
import { watchEvent } from "@/components/share-watch";
import type { Service } from "@/lib/types";

const storageKey = "mynigeriaguide:watchlist";
const snapshotKey = "mynigeriaguide:watch-snapshots";

type Snapshots = Record<string, { title?: string; feeLabel?: string; lastVerified?: string }>;

function loadIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function SavedGuides({ services }: { services: Service[] }) {
  const [ids, setIds] = useState<string[]>([]);
  const [snapshots, setSnapshots] = useState<Snapshots>({});

  useEffect(() => {
    const refresh = () => {
      setIds(loadIds());
      try { setSnapshots(JSON.parse(localStorage.getItem(snapshotKey) ?? "{}")); } catch { setSnapshots({}); }
    };
    refresh();
    window.addEventListener(watchEvent, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(watchEvent, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const watched = useMemo(() => services.filter((service) => ids.includes(service.slug)), [services, ids]);

  if (!watched.length) {
    return (
      <div className="empty-state">
        <strong>No saved guides yet.</strong>
        <p>Open any service guide and choose “Watch this guide” to keep it here on this device.</p>
      </div>
    );
  }

  function markReviewed(service: Service) {
    const next = { ...snapshots, [service.slug]: { title: service.title, feeLabel: service.feeLabel, lastVerified: service.lastVerified } };
    localStorage.setItem(snapshotKey, JSON.stringify(next));
    setSnapshots(next);
  }

  return <div className="service-grid">{watched.map((service) => {
    const snap = snapshots[service.slug];
    const changed = Boolean(snap && (snap.feeLabel !== service.feeLabel || snap.lastVerified !== service.lastVerified));
    return <div className="saved-guide-wrap" key={service.slug}>
      {changed ? <div className="saved-change"><strong>Updated since you saved it</strong><span>Fee, verification date or guide details may have changed.</span><button type="button" onClick={() => markReviewed(service)}>Mark reviewed</button></div> : null}
      <ServiceCard service={service} />
    </div>;
  })}</div>;
}
