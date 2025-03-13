import { NextResponse } from "next/server";
import { createClient } from "../../../../supabase/client-server";

export async function GET() {
  const supabase = await createClient();
  const baseUrl = "https://tantienvinh.com";

  // Static routes
  const staticRoutes = [
    "",
    "/san-pham",
    "/san-pham/may-go",
    "/san-pham/may-dan-canh",
    "/san-pham/may-khoan-ngang",
    "/san-pham/may-cua-ban-truot",
    "/dich-vu",
    "/blog",
    "/gioi-thieu",
    "/lien-he",
    "/bao-gia",
    "/khach-hang",
  ];

  // Fetch all products
  const { data: products } = await supabase
    .from("products")
    .select("slug, updated_at")
    .eq("is_draft", false);

  // Fetch all blog posts
  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("is_published", true);

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  // Add static routes
  staticRoutes.forEach((route) => {
    xml += "<url>";
    xml += `<loc>${baseUrl}${route}</loc>`;
    xml += `<lastmod>${new Date().toISOString()}</lastmod>`;
    xml += "<changefreq>daily</changefreq>";
    xml += "<priority>0.8</priority>";
    xml += "</url>";
  });

  // Add product URLs
  if (products) {
    products.forEach((product) => {
      xml += "<url>";
      xml += `<loc>${baseUrl}/san-pham/${product.slug}</loc>`;
      xml += `<lastmod>${new Date(product.updated_at).toISOString()}</lastmod>`;
      xml += "<changefreq>weekly</changefreq>";
      xml += "<priority>0.7</priority>";
      xml += "</url>";
    });
  }

  // Add blog post URLs
  if (blogPosts) {
    blogPosts.forEach((post) => {
      xml += "<url>";
      xml += `<loc>${baseUrl}/blog/${post.slug}</loc>`;
      xml += `<lastmod>${new Date(post.updated_at).toISOString()}</lastmod>`;
      xml += "<changefreq>monthly</changefreq>";
      xml += "<priority>0.6</priority>";
      xml += "</url>";
    });
  }

  xml += "</urlset>";

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour
