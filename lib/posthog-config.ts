// PostHog project tokens are public browser identifiers, not account secrets.
export const POSTHOG_PROJECT_ID = 294041;
export const POSTHOG_PROJECT_TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim() ||
  "phc_pUiuE9FAWfnEvTkBg7gzkqnwy5xwNaxf8nMAoX94TufA";
export const POSTHOG_API_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://eu.i.posthog.com";
export const POSTHOG_UI_HOST = "https://eu.posthog.com";
export const POSTHOG_WEB_URL = "https://eu.posthog.com/project/294041/web";
export const POSTHOG_COLLECTION_START = "2026-10-05";

export function posthogServerReportingConfigured() {
  return Boolean(process.env.POSTHOG_PERSONAL_API_KEY?.trim());
}
