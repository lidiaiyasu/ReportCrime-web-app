import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/police-dashboard",
          "/register-crime",
          "/search-reports",
          "/view-crime",
          "/api/",
        ],
      },
    ],
    sitemap: "https://efp-crs.example.gov.et/sitemap.xml",
  };
}
