import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "../../../../../supabase/client-server";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function MayGoPage() {
  const supabase = await createClient();

  // Fetch products in this category
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", "may-go")
    .eq("is_draft", false);

  return (
    <div>
      <div className="pt-24 bg-blue-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center mb-6">
            <Link
              href="/san-pham"
              className="text-blue-600 hover:underline flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại tất cả sản phẩm
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4">Máy Gỗ</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Máy gỗ chất lượng cao, giúp tối ưu hóa quy trình sản xuất nội thất
            của bạn với độ chính xác và hiệu suất vượt trội.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <RevealAnimation>
            <SectionHeading
              title="Máy Gỗ Chất Lượng Cao"
              subtitle="Tối ưu hóa quy trình sản xuất nội thất với các dòng máy hiện đại"
            />
          </RevealAnimation>

          <div className="mt-12 grid md:grid-cols-2 gap-12">
            <RevealAnimation>
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80"
                  alt="Máy Gỗ"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </RevealAnimation>

            <RevealAnimation direction="left">
              <div>
                <h2 className="text-2xl font-bold mb-4">Đặc Điểm Nổi Bật</h2>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span>Độ chính xác cao, đảm bảo chất lượng sản phẩm</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span>
                      Diện tích làm việc lớn, phù hợp với nhiều kích thước vật
                      liệu
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span>
                      Công suất mạnh mẽ, xử lý được nhiều loại gỗ khác nhau
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span>
                      Dễ dàng vận hành với giao diện người dùng thân thiện
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span>
                      Hệ thống an toàn tiên tiến, bảo vệ người vận hành
                    </span>
                  </li>
                </ul>

                <div className="mt-8">
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 mr-4"
                  >
                    <Link href="/lien-he">Liên hệ tư vấn</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Link href="/bao-gia">Yêu cầu báo giá</Link>
                  </Button>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {products && products.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <RevealAnimation>
              <SectionHeading
                title="Sản Phẩm Máy Gỗ"
                subtitle="Khám phá các dòng máy gỗ chất lượng cao của chúng tôi"
                center
              />
            </RevealAnimation>

            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <RevealAnimation key={product.id} delay={index * 100}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
                    <div className="h-64 overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
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
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <Button
                        asChild
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        <Link href={`/san-pham/${product.slug}`}>
                          {product.price === null ? "Liên hệ" : "Xem chi tiết"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </RevealAnimation>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <RevealAnimation>
            <SectionHeading
              title="Thông Số Kỹ Thuật"
              subtitle="Các thông số kỹ thuật chính của máy gỗ CNC"
            />
          </RevealAnimation>

          <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thông số
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá trị
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Kích thước làm việc
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1300x2500mm
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Công suất trục chính
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    9kW
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Tốc độ trục chính
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    24000rpm
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Độ chính xác
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ±0.01mm
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Hệ thống điều khiển
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    DSP/Mach3/NC Studio
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Hệ thống truyền động
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Thanh răng và bánh răng
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
