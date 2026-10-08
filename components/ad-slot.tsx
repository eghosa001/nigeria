"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT } from "@/lib/adsense-config";

declare global {
  interface Window { adsbygoogle?: unknown[]; }
}

export function AdSlot({
  slot,
  label = "Advertisement",
  format = "auto",
}: {
  slot?: string;
  label?: string;
  format?: "auto" | "autorelaxed";
}) {
  const client = ADSENSE_CLIENT;

  useEffect(() => {
    if (!client || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers or a not-yet-loaded AdSense script can safely leave the slot empty.
    }
  }, [client, slot]);

  if (!client || !slot) return null;

  return (
    <aside className="ad-container" aria-label={label}>
      <small>{label}</small>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(format === "auto" ? { "data-full-width-responsive": "true" } : {})}
      />
    </aside>
  );
}