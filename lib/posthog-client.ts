"use client";

import posthog from "posthog-js";
import { shouldEnableAnalytics } from "@/lib/analytics-safety";
import { POSTHOG_API_HOST, POSTHOG_PROJECT_TOKEN } from "@/lib/posthog-config";

type PostHogWindow = Window & typeof globalThis & {
  __mngPostHogInitialized?: boolean;
  __mngPostHogLastTrackedPath?: string;
};

function allowedPath(pathname: string) {
  return shouldEnableAnalytics(pathname, navigator.webdriver);
}

export function initializePostHog(pathname = window.location.pathname) {
  if (typeof window === "undefined" || !allowedPath(pathname)) return false;

  const state = window as PostHogWindow;
  if (!state.__mngPostHogInitialized) {
    posthog.init(POSTHOG_PROJECT_TOKEN, {
      api_host: POSTHOG_API_HOST,
      defaults: "2026-05-30",
      autocapture: true,
      capture_pageview: false,
      capture_pageleave: true,
      disable_session_recording: true,
      person_profiles: "identified_only",
      before_send: (event) => {
        if (!event || navigator.webdriver === true) return null;
        const properties = event.properties ?? {};
        const value =
          (properties.$current_url as string | undefined) ??
          (properties.$pathname as string | undefined) ??
          window.location.href;
        let eventPath = window.location.pathname;
        try {
          eventPath = new URL(value, window.location.origin).pathname;
        } catch {}

        if (
          eventPath === "/admin" ||
          eventPath.startsWith("/admin/") ||
          eventPath === "/api" ||
          eventPath.startsWith("/api/") ||
          eventPath.startsWith("/_next")
        ) {
          return null;
        }
        return event;
      },
    });
    state.__mngPostHogInitialized = true;
  }

  return true;
}

export function capturePostHogPageView(pathname: string) {
  if (!initializePostHog(pathname)) return;
  const state = window as PostHogWindow;
  if (state.__mngPostHogLastTrackedPath === pathname) return;

  posthog.capture("$pageview", {
    $current_url: window.location.href,
    $pathname: pathname,
    $host: window.location.host,
    page_title: document.title,
  });
  state.__mngPostHogLastTrackedPath = pathname;
}

export function capturePostHogEvent(
  name: string,
  properties: Record<string, string | number | boolean | undefined> = {},
) {
  if (!initializePostHog(window.location.pathname)) return;
  posthog.capture(name, properties);
}
