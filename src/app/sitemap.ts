import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.covermantra.com";

  const routes = [
    { url: "", priority: 1.0, changeFrequency: "daily" as const },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/personal-loans", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/business-loans", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/Blogs", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/insurance", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/insurance/health", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/insurance/car", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/insurance/life", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/insurance/travel", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/insurance/home", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/insurance/two-wheeler", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/privacy", priority: 0.5, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.5, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
