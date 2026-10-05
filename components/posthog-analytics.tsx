"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { capturePostHogPageView } from "@/lib/posthog-client";

export function PostHogAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    capturePostHogPageView(pathname);
  }, [pathname]);

  return null;
}
