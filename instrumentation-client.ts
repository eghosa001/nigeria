import { capturePostHogPageView } from "./lib/posthog-client";

if (typeof window !== "undefined") {
  capturePostHogPageView(window.location.pathname);
}
