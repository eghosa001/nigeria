export const siteName = "MyNigeriaGuide";

export const siteDescription =
  "Discover Nigerian movies, practical service guides, verified jobs and career pathways, and travel ideas, with official links, clear steps and current verification notes.";

export const productionSiteUrl = "https://mynigeriaguide.com";

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (configured && !configured.endsWith(".workers.dev")) return configured;
  if (process.env.NODE_ENV === "production") return productionSiteUrl;
  return configured || "http://localhost:3000";
}
