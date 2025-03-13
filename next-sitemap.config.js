/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://tantienvinh.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: ["https://tantienvinh.com/server-sitemap.xml"],
  },
  exclude: ["/admin/*", "/sign-in", "/sign-up", "/forgot-password"],
  changefreq: "daily",
  priority: 0.7,
};
