"use client";

import { useEffect, useRef, useState } from "react";

type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "mng-theme";

function resolvedTheme(preference: ThemePreference) {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(preference: ThemePreference) {
  const theme = resolvedTheme(preference);
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = theme;
  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (themeColor) themeColor.content = theme === "dark" ? "#0b1410" : "#f8f5ed";
}

function ThemeGlyph({ preference }: { preference: ThemePreference }) {
  if (preference === "dark") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.3 15.1A8.5 8.5 0 0 1 8.9 3.7 8.6 8.6 0 1 0 20.3 15.1Z" /></svg>;
  }
  if (preference === "light") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg>;
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial: ThemePreference = stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    setPreference(initial);
    applyTheme(initial);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      const current = (window.localStorage.getItem(STORAGE_KEY) || "system") as ThemePreference;
      if (current === "system") applyTheme("system");
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function choose(next: ThemePreference) {
    window.localStorage.setItem(STORAGE_KEY, next);
    setPreference(next);
    applyTheme(next);
    setOpen(false);
  }

  const labels: Record<ThemePreference, string> = {
    system: "System",
    light: "Light",
    dark: "Dark",
  };

  return (
    <div className="theme-control" ref={rootRef}>
      <button
        type="button"
        className="theme-toggle"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={"Theme: " + labels[preference]}
        title={"Theme: " + labels[preference]}
        onClick={() => setOpen((value) => !value)}
      >
        <ThemeGlyph preference={preference} />
        <span className="theme-toggle-label">{labels[preference]}</span>
      </button>

      {open ? (
        <div className="theme-menu" role="menu" aria-label="Choose appearance">
          {(["system", "light", "dark"] as ThemePreference[]).map((item) => (
            <button
              key={item}
              type="button"
              role="menuitemradio"
              aria-checked={preference === item}
              className={preference === item ? "is-selected" : undefined}
              onClick={() => choose(item)}
            >
              <ThemeGlyph preference={item} />
              <span>{labels[item]}</span>
              <b aria-hidden="true">{preference === item ? "✓" : ""}</b>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
