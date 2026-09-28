export const siteName = "MyNigeriaGuide";

export const siteDescription =
  "Clear, independently verified guides to Nigerian government services, fees, requirements and official portals.";

export const productionSiteUrl = "https://mynigeriaguide.com";

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (configured && !configured.endsWith(".workers.dev")) return configured;
  if (process.env.NODE_ENV === "production") return productionSiteUrl;
  return configured || "http://localhost:3000";
}
