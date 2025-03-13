import { lazy } from 'react';
import { ModernHeroSection } from "@/components/modern-hero-section";
import { FeaturesSection } from "@/components/features-section";
import { ProductsSection } from "@/components/products-section";
import { ServicesSection } from "@/components/services-section";
import { StatsSection } from "@/components/stats-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { BlogSection } from "@/components/blog-section";
import { CtaSection } from "@/components/cta-section";
import { createClient } from "@/app/supabase/server";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();

  try {
    // Fetch featured products for the homepage
    const { data: featuredProducts } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .eq("is_draft", false)
      .limit(4);

    // Tạo object mới chỉ với dữ liệu cần thiết
    const cleanProducts = featuredProducts ? featuredProducts.map(p => ({
      id: p.id || '',
      name: p.name || '',
      slug: p.slug || '',
      description: p.description || '',
      images: Array.isArray(p.images) ? [...p.images] : [],
      category: p.category || '',
      featured: Boolean(p.featured),
      price: p.price === null ? null : Number(p.price),
      highlights: Array.isArray(p.highlights) ? [...p.highlights] : [],
      features: Array.isArray(p.features) ? [...p.features] : []
    })) : [];

    return (
      <>
        <ModernHeroSection />
        <FeaturesSection />
        <ProductsSection initialFeaturedProducts={cleanProducts} />
        <StatsSection />
        <ServicesSection />
        <TestimonialsSection />
        <BlogSection />
        <CtaSection />
      </>
    );
  } catch (error) {
    console.error("Error in Home page:", error);
    return (
      <>
        <ModernHeroSection />
        <FeaturesSection />
        <ProductsSection initialFeaturedProducts={[]} />
        <StatsSection />
        <ServicesSection />
        <TestimonialsSection />
        <BlogSection />
        <CtaSection />
      </>
    );
  }
}
