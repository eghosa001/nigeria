"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PostHogAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    let current = true;
    // Keep the PostHog SDK out of the initial shared client bundle.
    // Preserve the page-view event once the smaller route bundle is interactive.
    void import("@/lib/posthog-client")
      .then(({ capturePostHogPageView }) => {
        if (current) capturePostHogPageView(pathname);
      })
      .catch(() => undefined);
    return () => { current = false; };
  }, [pathname]);

  return null;
}
