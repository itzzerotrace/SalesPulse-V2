import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SalesPulse",
    short_name: "SalesPulse",
    description: "Sales performance, goals, rankings, and team progress.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#0C0618",
    theme_color: "#0C0618",
    icons: [
      { src: "/icon", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
