export const siteName = "MyNigeriaGuide";

export const siteDescription =
  "Clear, independently verified guides to Nigerian government services, fees, requirements and official portals.";

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return "http://localhost:3000";
}
