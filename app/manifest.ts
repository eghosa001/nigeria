import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MyNigeriaGuide",
    short_name: "MyNigeriaGuide",
    description: "Verified Nigerian government service guides, fees, requirements and official portals.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfaf5",
    theme_color: "#0b6b46",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
