import { ModernHeroSection } from "@/components/modern-hero-section";
import { FeaturesSection } from "@/components/features-section";
import { ProductsSection } from "@/components/products-section";
import { ServicesSection } from "@/components/services-section";
import { StatsSection } from "@/components/stats-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { BlogSection } from "@/components/blog-section";
import { CtaSection } from "@/components/cta-section";
import { createClient } from "../../../supabase/client-server";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch featured products for the homepage
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .eq("is_draft", false)
    .limit(4);

  return (
    <>
      <ModernHeroSection />
      <FeaturesSection />
      <ProductsSection initialFeaturedProducts={featuredProducts || []} />
      <StatsSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogSection />
      <CtaSection />
    </>
  );
}
