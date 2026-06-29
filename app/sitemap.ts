import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://efp-crs.example.gov.et";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/about`, lastModified: now, priority: 0.6 },
    { url: `${base}/report`, lastModified: now, priority: 0.9 },
    { url: `${base}/login`, lastModified: now, priority: 0.3 },
  ];
}
