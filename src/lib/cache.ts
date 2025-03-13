import { unstable_cache } from "next/cache";
import { createClient } from "../../supabase/client-server";

// Cache featured products for the homepage
export const getFeaturedProducts = unstable_cache(
  async () => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .eq("is_draft", false)
      .limit(4);

    return data || [];
  },
  ["featured-products"],
  { revalidate: 3600 }, // Revalidate every hour
);

// Cache product categories
export const getProductCategories = unstable_cache(
  async () => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("product_categories")
      .select("*")
      .order("display_order", { ascending: true });

    return data || [];
  },
  ["product-categories"],
  { revalidate: 86400 }, // Revalidate every day
);

// Cache latest blog posts
export const getLatestBlogPosts = unstable_cache(
  async (limit = 3) => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(limit);

    return data || [];
  },
  ["latest-blog-posts"],
  { revalidate: 3600 }, // Revalidate every hour
);

// Cache testimonials
export const getTestimonials = unstable_cache(
  async (limit = 4) => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    return data || [];
  },
  ["testimonials"],
  { revalidate: 86400 }, // Revalidate every day
);

// Cache products by category
export const getProductsByCategory = unstable_cache(
  async (category: string) => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("is_draft", false)
      .order("created_at", { ascending: false });

    return data || [];
  },
  ["products-by-category"],
  { revalidate: 3600 }, // Revalidate every hour
);
