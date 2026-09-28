export const siteName = "GovGuide Nigeria";

export const siteDescription =
  "Clear, independently verified guides to Nigerian government services, fees, requirements and official portals.";

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL;
  }
  return "http://localhost:3000";
}
