import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/admin/auth/",
          "/(admin)/",
          "/(auth)/",
          "/api/",
          "/_next/",
          "/server-sitemap.xml",
        ],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
    ],
    sitemap: "https://tantienvinh.com/sitemap.xml",
    host: "https://tantienvinh.com",
  };
}
