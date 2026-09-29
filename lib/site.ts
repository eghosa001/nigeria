export const siteName = "MyNigeriaGuide";

export const siteDescription =
  "Practical, independently verified guides to Nigerian services and travel, with clear steps, official links, addresses, map links and current verification notes.";

export const productionSiteUrl = "https://mynigeriaguide.com";

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (configured && !configured.endsWith(".workers.dev")) return configured;
  if (process.env.NODE_ENV === "production") return productionSiteUrl;
  return configured || "http://localhost:3000";
}
