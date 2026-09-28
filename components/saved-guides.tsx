"use client";

import { useEffect, useMemo, useState } from "react";
import { ServiceCard } from "@/components/service-card";
import { watchEvent } from "@/components/share-watch";
import type { Service } from "@/lib/types";

const storageKey = "govguide:watchlist";

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

  useEffect(() => {
    const refresh = () => setIds(loadIds());
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

  return <div className="service-grid">{watched.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>;
}
