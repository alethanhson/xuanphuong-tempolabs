import { NextResponse } from "next/server";
import { createClient } from "@/app/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const baseUrl = "https://tantienvinh.com";

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
    },
  });
}

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour
