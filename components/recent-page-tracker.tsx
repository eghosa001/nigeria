"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { kindFor, read, recentKey, write, type Entry } from "@/lib/personal-library-storage";

export function RecentPageTracker() {
  const pathname = usePathname();
  useEffect(() => {
    const kind = kindFor(pathname);
    if (!kind) return;
    const id = window.setTimeout(() => {
      const title = document.querySelector("main h1")?.textContent?.trim();
      if (!title) return;
      const entry: Entry = { href: pathname, title: title.slice(0, 140), kind, visitedAt: Date.now() };
      const rest = read(recentKey).filter((item) => item.href !== pathname);
      write(recentKey, [entry, ...rest].slice(0, 10));
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);
  return null;
}

