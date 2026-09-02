import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/dashboard/",
        "/profile/",
        "/auth-gate-70898",
        "/auth-gate-70898/*",
      ],
    },
    sitemap: "https://www.covermantra.com/sitemap.xml",
  };
}