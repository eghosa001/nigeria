"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/client-analytics";

const featured = [
  { label: "Movies", path: "/entertainment/movies", message: "Find Nigerian film casts and official places to watch on MyNigeriaGuide." },
  { label: "Services", path: "/services", message: "Check Nigerian service requirements, fees and official application links on MyNigeriaGuide." },
  { label: "Tour Nigeria", path: "/explore", message: "Discover destinations, cities and trip planning tools across Nigeria." },
  { label: "Jobs", path: "/jobs", message: "Find verified Nigerian job opportunities, deadlines and direct employer links." },
] as const;

export function FeatureShare() {
  const [selected, setSelected] = useState(0);
  const [feedback, setFeedback] = useState("");
  const item = featured[selected];
  const url = "https://mynigeriaguide.com" + item.path;
  const message = item.message + "\n" + url;

  async function share() {
    setFeedback("");
    if (navigator.share) {
      try {
        await navigator.share({ title: "MyNigeriaGuide — " + item.label, text: item.message, url });
        trackEvent("feature_share", { pillar: item.label, method: "native" });
        setFeedback("Shared");
      } catch { /* Dismissed or unavailable; no success claim. */ }
      return;
    }
    await copy();
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setFeedback("Link and message copied");
      trackEvent("feature_share", { pillar: item.label, method: "copy" });
    } catch {
      setFeedback("Copy unavailable on this browser. Use the WhatsApp link.");
    }
  }

  return (
    <div className="feature-share-controls">
      <label htmlFor="feature-share-pillar">Choose a section</label>
      <select id="feature-share-pillar" value={selected} onChange={(event) => { setSelected(Number(event.target.value)); setFeedback(""); }}>
        {featured.map((entry, index) => <option value={index} key={entry.path}>{entry.label}</option>)}
      </select>
      <div className="feature-share-actions">
        <button type="button" onClick={share}>Share</button>
        <button type="button" onClick={copy}>Copy message</button>
        <a href={"https://wa.me/?text=" + encodeURIComponent(message)} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("feature_share", { pillar: item.label, method: "whatsapp" })}>WhatsApp ↗</a>
      </div>
      {feedback ? <p role="status" className="feature-share-status">{feedback}</p> : null}
    </div>
  );
}
