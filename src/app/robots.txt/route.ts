import { NextResponse } from "next/server";

export async function GET() {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Disallow admin routes
Disallow: /admin/
Disallow: /(admin)/
Disallow: /sign-in

# Disallow API routes
Disallow: /api/

# Disallow Next.js specific routes
Disallow: /_next/

# Sitemaps
Sitemap: https://tantienvinh.com/sitemap.xml
Sitemap: https://tantienvinh.com/server-sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
