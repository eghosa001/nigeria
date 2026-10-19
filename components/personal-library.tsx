"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/client-analytics";
import { changed, read, savedKey, recentKey, validHref, write, type Kind, type Entry } from "@/lib/personal-library-storage";

export function SavePageButton({ href, title, kind }: { href: string; title: string; kind: Kind }) {
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setSaved(read(savedKey).some((item) => item.href === href));
      setReady(true);
    };
    refresh();
    window.addEventListener(changed, refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener(changed, refresh); window.removeEventListener("storage", refresh); };
  }, [href]);

  function toggle() {
    if (!validHref(href)) return;
    const entries = read(savedKey);
    const present = entries.some((item) => item.href === href);
    const next = present
      ? entries.filter((item) => item.href !== href)
      : [{ href, title, kind, visitedAt: Date.now() }, ...entries].slice(0, 24);
    write(savedKey, next);
    trackEvent(present ? "saved_page_remove" : "saved_page_add", { content_type: kind });
  }

  return (
    <button className="save-page-button" type="button" onClick={toggle} disabled={!ready}
      aria-pressed={saved} aria-label={(saved ? "Remove from saved: " : "Save for later: ") + title}>
      <span aria-hidden="true">{saved ? "✓" : "＋"}</span>
      {saved ? "Saved" : "Save for later"}
    </button>
  );
}

export function PersonalLibrary() {
  const [saved, setSaved] = useState<Entry[]>([]);
  const [recent, setRecent] = useState<Entry[]>([]);
  useEffect(() => {
    const refresh = () => { setSaved(read(savedKey)); setRecent(read(recentKey)); };
    refresh();
    window.addEventListener(changed, refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener(changed, refresh); window.removeEventListener("storage", refresh); };
  }, []);
  const labels: Record<Kind, string> = { movie: "Movie", travel: "Travel", job: "Career" };
  function renderEntries(entries: Entry[], canRemove: boolean) {
    return entries.map((entry) => (
      <li key={entry.href} className="personal-library-item">
        <Link href={entry.href}><small>{labels[entry.kind]}</small><strong>{entry.title}</strong></Link>
        {canRemove ? (
          <button type="button" aria-label={"Remove " + entry.title + " from saved"} onClick={() => {
            write(savedKey, read(savedKey).filter((item) => item.href !== entry.href));
            trackEvent("saved_page_remove", { content_type: entry.kind });
          }}>Remove</button>
        ) : null}
      </li>
    ));
  }
  return (
    <div className="personal-library">
      <section aria-labelledby="saved-across-pillars">
        <div className="personal-library-heading"><h2 id="saved-across-pillars">Saved movies, places & jobs</h2><p>Keep useful pages together on this device.</p></div>
        {saved.length
          ? <ul className="personal-library-list">{renderEntries(saved, true)}</ul>
          : <p className="personal-library-empty">Open a movie, destination or job guide and tap “Save for later”.</p>}
      </section>
      {recent.length ? (
        <section aria-labelledby="recently-visited">
          <div className="personal-library-heading"><h2 id="recently-visited">Recently viewed</h2>
            <button type="button" onClick={() => write(recentKey, [])}>Clear history</button>
          </div>
          <ul className="personal-library-list">{renderEntries(recent.filter((entry) => !saved.some((item) => item.href === entry.href)).slice(0, 6), false)}</ul>
        </section>
      ) : null}
    </div>
  );
}
