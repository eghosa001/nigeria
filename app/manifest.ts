import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MyNigeriaGuide",
    short_name: "MyNigeriaGuide",
    description: "Clear, source-linked Nigerian government service guides, fees, requirements and official portals.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F5ED",
    theme_color: "#063F2D",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
