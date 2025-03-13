import { MetadataRoute } from "next";

import { createClient } from "@/app/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URLs
  const baseUrl = "https://tantienvinh.com";
  const supabase = await createClient();

  // Static routes
  const routes = [
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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic product routes
  let productRoutes: {
    url: string;
    lastModified: Date;
    changeFrequency: "daily" | "weekly" | "monthly";
    priority: number;
  }[] = [];

  try {
    const { data: products } = await supabase
      .from("products")
      .select("slug, updated_at")
      .eq("is_draft", false);

    if (products && products.length > 0) {
      productRoutes = products.map((product) => ({
        url: `${baseUrl}/san-pham/${product.slug}`,
        lastModified: new Date(product.updated_at || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  // Dynamic blog routes
  let blogRoutes: {
    url: string;
    lastModified: Date;
    changeFrequency: "daily" | "weekly" | "monthly";
    priority: number;
  }[] = [];

  try {
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("is_published", true);

    if (posts && posts.length > 0) {
      blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || new Date()),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
  }

  return [...routes, ...productRoutes, ...blogRoutes];
}
