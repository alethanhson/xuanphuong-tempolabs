"use client";

import { useState, useEffect, memo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { ArrowRight, Star, Check } from "lucide-react";
import { createClient } from "../../supabase/client-browser";
import { ProductCard } from "@/components/product-card";

type ProductFeature = string;

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  features?: ProductFeature[];
  highlights?: string[];
  images: string[];
  category: string;
  featured?: boolean;
  is_draft?: boolean;
  price?: number | null;
};

type Category = {
  id: string;
  name: string;
};

// Default products if none are fetched from the database
const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Máy Gỗ CNC",
    slug: "may-go-cnc",
    description:
      "Máy gỗ CNC hiện đại với độ chính xác cao, phù hợp cho các xưởng sản xuất nội thất vừa và nhỏ.",
    features: [
      "Độ chính xác cao",
      "Diện tích làm việc lớn",
      "Công suất mạnh mẽ",
      "Dễ dàng vận hành",
    ],
    images: [
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80",
    ],
    category: "may-go",
  },
  {
    id: "2",
    name: "Máy Dán Cạnh",
    slug: "may-dan-canh",
    description:
      "Máy dán cạnh tự động, giúp tăng năng suất và chất lượng trong sản xuất nội thất gỗ công nghiệp.",
    features: [
      "Tốc độ dán nhanh",
      "Dán cạnh chính xác",
      "Dễ dàng điều chỉnh",
      "Phù hợp nhiều loại vật liệu",
    ],
    images: [
      "https://images.unsplash.com/photo-1565034957450-e7f4e4d04193?w=600&q=80",
    ],
    category: "may-dan-canh",
  },
  {
    id: "3",
    name: "Máy Khoan Ngang",
    slug: "may-khoan-ngang",
    description:
      "Máy khoan ngang chuyên dụng cho ngành nội thất, giúp tạo các lỗ khoan chính xác và nhanh chóng.",
    features: [
      "Nhiều đầu khoan",
      "Khoan chính xác",
      "Tốc độ cao",
      "Dễ dàng điều chỉnh",
    ],
    images: [
      "https://images.unsplash.com/photo-1624365169198-38255ba54160?w=600&q=80",
    ],
    category: "may-khoan-ngang",
  },
  {
    id: "4",
    name: "Máy Cưa Bàn Trượt",
    slug: "may-cua-ban-truot",
    description:
      "Máy cưa bàn trượt chất lượng cao, giúp cắt gỗ chính xác và an toàn cho sản xuất nội thất.",
    features: [
      "Lưỡi cưa sắc bén",
      "Bàn trượt êm ái",
      "Cắt chính xác",
      "Hệ thống an toàn",
    ],
    images: [
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80",
    ],
    category: "may-cua-ban-truot",
  },
];

const categories: Category[] = [
  { id: "all", name: "Tất cả" },
  { id: "may-go", name: "Máy Gỗ" },
  { id: "may-dan-canh", name: "Máy Dán Cạnh" },
  { id: "may-khoan-ngang", name: "Máy Khoan Ngang" },
  { id: "may-cua-ban-truot", name: "Máy Cưa Bàn Trượt" },
];

interface ProductsSectionProps {
  initialFeaturedProducts?: Product[];
}

export const ProductsSection = memo(function ProductsSection({
  initialFeaturedProducts = [],
}: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>(
    initialFeaturedProducts.length > 0
      ? initialFeaturedProducts
      : defaultProducts,
  );
  const [isLoading, setIsLoading] = useState(
    initialFeaturedProducts.length === 0,
  );
  const supabase = createClient();

  useEffect(() => {
    // Only fetch if we don't have initial products
    if (initialFeaturedProducts.length === 0) {
      const fetchProducts = async () => {
        try {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("is_draft", false)
            .order("created_at", { ascending: false })
            .limit(4);

          if (error) throw error;
          if (data && data.length > 0) {
            setProducts(data);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProducts();
    }
  }, [initialFeaturedProducts]);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  // Extract features from either highlights or features array
  const getProductFeatures = (product: Product): string[] => {
    if (product.highlights && product.highlights.length > 0) {
      return product.highlights.slice(0, 4);
    }
    return product.features || [];
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <RevealAnimation>
          <SectionHeading
            badge="Sản Phẩm Nổi Bật"
            title="Máy Gia Công Nội Thất Chất Lượng Cao"
            subtitle="Chúng tôi cung cấp các dòng máy hiện đại, được thiết kế đặc biệt cho ngành nội thất, giúp tối ưu hóa quy trình sản xuất của bạn."
            center
          />
        </RevealAnimation>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="mb-2"
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse"
                >
                  <div className="md:flex">
                    <div className="md:w-2/5">
                      <div className="h-64 md:h-full bg-gray-200"></div>
                    </div>
                    <div className="p-6 md:w-3/5">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/6"></div>
                      </div>
                      <div className="mt-6 h-10 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
id}
                delay={index * 100}
                direction={index % 2 === 0 ? "right" : "left"}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="md:flex">
                    <div className="md:w-2/5 relative">
                      <div className="h-64 md:h-full overflow-hidden">
                        <Image
                          src={
                            product.images && product.images.length > 0
                              ? product.images[0]
                              : "https://via.placeholder.com/600x400?text=No+Image"
                          }
                          alt={product.name}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      {product.featured && (
                        <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                          <Star className="h-3 w-3 mr-1 fill-yellow-900" />
                          Nổi bật
                        </div>
                      )}
                    </div>
                    <div className="p-6 md:w-3/5">
                      <div className="mb-1">
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                          {categories.find((c) => c.id === product.category)
                            ?.name || product.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">
                        {product.description}
                      </p>

                      <ul className="mb-6 space-y-2">
                        {getProductFeatures(product).map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-sm text-gray-700"
                          >
                            <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        asChild
                        className="bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all"
                      >
                        <Link
                          href={
                            product.slug
                              ? `/san-pham/${product.slug}`
                              : `/san-pham/${product.category}`
                          }
                        >
                          {product.price === null ? "Liên hệ" : "Xem chi tiết"}{" "}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </RevealAnimation>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500">
                Không tìm thấy sản phẩm nào trong danh mục này.
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow transition-all"
            asChild
          >
            <Link href="/san-pham">
              Xem tất cả sản phẩm <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
});
