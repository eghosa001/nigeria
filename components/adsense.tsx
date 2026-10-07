"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { shouldEnableAnalytics } from "@/lib/analytics-safety";

export function AdsenseScript() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const pathname = usePathname();

  if (!client) return null;
  if (pathname && !shouldEnableAnalytics(pathname, false)) return null;

  return (
    <Script
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + client}
    />
  );
}