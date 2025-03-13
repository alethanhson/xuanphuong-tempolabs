import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductStructuredData } from "@/components/structured-data";
import { createClient } from "@/app/supabase/server";
import { ProductViewTracker } from "@/components/analytics/product-view-tracker";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { LazyImage } from "@/components/ui/lazy-image";
import { BreadcrumbSchema } from "@/components/ui/schema-org";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.id)
    .single();

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại | Tân Tiến Vinh",
      description: "Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
    };
  }

  return {
    title: `${product.name} | Tân Tiến Vinh`,
    description: product.description,
    keywords: `${product.name}, ${product.category}, máy cnc, máy gia công nội thất`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        { url: product.images[0], width: 800, height: 600, alt: product.name },
      ],
      type: "product",
    },
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.id)
    .single();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Sản phẩm không tồn tại</h1>
          <Link
            href="/san-pham"
            className="text-blue-600 hover:underline flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  // Fetch related products
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("id, name, slug, description, images, category")
    .eq("category", product.category)
    .neq("id", product.id)
    .eq("is_draft", false)
    .limit(3);

  return (
    <div>
      {product && (
        <>
          <ProductStructuredData
            product={{
              name: product.name,
              description: product.description,
              image: product.images,
              price: product.price,
              category: product.category,
              sku: product.id,
              brand: "Tân Tiến Vinh",
              url: `https://tantienvinh.com/san-pham/${params.id}`,
            }}
          />
          <ProductViewTracker
            productId={product.id}
            productSlug={product.slug}
            productName={product.name}
          />
        </>
      )}

      <div className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4">
            <Breadcrumbs
              items={[
                { label: "Sản phẩm", href: "/san-pham" },
                {
                  label:
                    product.category === "may-go"
                      ? "Máy gỗ"
                      : product.category === "may-dan-canh"
                        ? "Máy dán cạnh"
                        : product.category === "may-khoan-ngang"
                          ? "Máy khoan ngang"
                          : product.category === "may-cua-ban-truot"
                            ? "Máy cưa bàn trượt"
                            : "Sản phẩm",
                  href: `/san-pham/${product.category}`,
                },
              ]}
              currentPageLabel={product.name}
              className="text-sm mb-4"
            />
            <BreadcrumbSchema
              items={[
                { name: "Trang chủ", item: "https://tantienvinh.com/" },
                { name: "Sản phẩm", item: "https://tantienvinh.com/san-pham" },
                {
                  name:
                    product.category === "may-go"
                      ? "Máy gỗ"
                      : product.category === "may-dan-canh"
                        ? "Máy dán cạnh"
                        : product.category === "may-khoan-ngang"
                          ? "Máy khoan ngang"
                          : product.category === "may-cua-ban-truot"
                            ? "Máy cưa bàn trượt"
                            : "Sản phẩm",
                  item: `https://tantienvinh.com/san-pham/${product.category}`,
                },
                {
                  name: product.name,
                  item: `https://tantienvinh.com/san-pham/${product.slug}`,
                },
              ]}
            />
          </div>
          <Link
            href="/san-pham"
            className="text-blue-600 hover:underline flex items-center mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang sản phẩm
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="rounded-xl overflow-hidden mb-4">
                <LazyImage
                  src={product.images[0]}
                  alt={product.name}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.slice(1).map((image: string, index: number) => (
                  <div key={index} className="rounded-xl overflow-hidden">
                    <LazyImage
                      src={image}
                      alt={`${product.name} - ${index + 2}`}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      quality={80}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-6">
                {product.description}
              </p>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">
                  Tính năng nổi bật
                </h3>
                <ul className="space-y-2">
                  {product.highlights &&
                    product.highlights.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Giá</h3>
                <div className="text-2xl font-bold text-blue-600">
                  {product.price
                    ? `${product.price.toLocaleString()} VNĐ`
                    : "Liên hệ để báo giá"}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  asChild
                >
                  <Link href="/bao-gia">Yêu cầu báo giá</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center"
                  asChild
                >
                  <Link href="/lien-he">
                    <Phone className="mr-2 h-5 w-5" /> Liên hệ tư vấn
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Thông tin chi tiết</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: product.long_description || "",
                }}
              ></div>

              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Thông số kỹ thuật
                </h3>
                <div className="border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {product.specifications &&
                        Object.entries(product.specifications).map(
                          ([key, value], index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }
                            >
                              <td className="py-3 px-4 border-b font-medium">
                                {key}
                              </td>
                              <td className="py-3 px-4 border-b">
                                {value as string}
                              </td>
                            </tr>
                          ),
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Sản phẩm liên quan</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="bg-white rounded-xl overflow-hidden border hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      {relatedProduct.images &&
                      relatedProduct.images.length > 0 ? (
                        <LazyImage
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                          quality={75}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">
                            Không có hình ảnh
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {relatedProduct.description}
                      </p>
                      <Button asChild>
                        <Link href={`/san-pham/${relatedProduct.slug}`}>
                          Xem chi tiết <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
