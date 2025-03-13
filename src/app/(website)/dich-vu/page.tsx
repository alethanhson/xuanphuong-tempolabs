import { ServicesSection } from "@/components/services-section";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { SectionHeading } from "@/components/ui/section-heading";
import { Check } from "lucide-react";
import { createClient } from "../../../supabase/client-server";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function ServicesPage() {
  const supabase = await createClient();

  // Fetch services from database if needed
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="pt-24 bg-blue-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Dịch Vụ</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Chúng tôi cung cấp các dịch vụ chuyên nghiệp từ tư vấn, thiết kế đến
            lắp đặt, bảo trì và đào tạo, đảm bảo máy móc của bạn luôn hoạt động
            hiệu quả.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <RevealAnimation>
            <SectionHeading
              title="Dịch Vụ Chuyên Nghiệp"
              subtitle="Chúng tôi cung cấp các dịch vụ chuyên nghiệp, đảm bảo máy móc của bạn luôn hoạt động hiệu quả"
              center
            />
          </RevealAnimation>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Tư Vấn Thiết Kế",
                description:
                  "Đội ngũ chuyên gia giàu kinh nghiệm sẽ tư vấn giải pháp phù hợp nhất với nhu cầu sản xuất của bạn.",
                features: [
                  "Phân tích nhu cầu sản xuất",
                  "Tư vấn lựa chọn máy móc phù hợp",
                  "Thiết kế layout xưởng sản xuất",
                  "Tối ưu hóa quy trình sản xuất",
                ],
                image:
                  "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80",
              },
              {
                title: "Lắp Đặt Vận Hành",
                description:
                  "Đội ngũ kỹ thuật chuyên nghiệp sẽ lắp đặt và vận hành máy móc, đảm bảo hoạt động hiệu quả.",
                features: [
                  "Lắp đặt máy móc tận nơi",
                  "Cài đặt phần mềm điều khiển",
                  "Kiểm tra và hiệu chỉnh máy",
                  "Hướng dẫn vận hành cơ bản",
                ],
                image:
                  "https://images.unsplash.com/photo-1565034957450-e7f4e4d04193?w=600&q=80",
              },
              {
                title: "Bảo Trì Bảo Dưỡng",
                description:
                  "Dịch vụ bảo trì định kỳ và sửa chữa khi cần thiết, giúp kéo dài tuổi thọ máy móc.",
                features: [
                  "Bảo trì định kỳ theo lịch",
                  "Sửa chữa nhanh chóng khi có sự cố",
                  "Cung cấp phụ tùng thay thế chính hãng",
                  "Nâng cấp phần mềm điều khiển",
                ],
                image:
                  "https://images.unsplash.com/photo-1624365169198-38255ba54160?w=600&q=80",
              },
              {
                title: "Đào Tạo Nhân Viên",
                description:
                  "Đào tạo nhân viên vận hành máy CNC, giúp họ làm chủ công nghệ và tối ưu hóa sản xuất.",
                features: [
                  "Đào tạo vận hành máy CNC",
                  "Hướng dẫn sử dụng phần mềm CAD/CAM",
                  "Đào tạo bảo trì cơ bản",
                  "Cập nhật kiến thức mới",
                ],
                image:
                  "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80",
              },
              {
                title: "Cung Cấp Phụ Tùng",
                description:
                  "Cung cấp phụ tùng thay thế chính hãng, đảm bảo máy móc hoạt động ổn định và bền bỉ.",
                features: [
                  "Phụ tùng thay thế chính hãng",
                  "Giao hàng nhanh chóng",
                  "Tư vấn lựa chọn phụ tùng phù hợp",
                  "Bảo hành phụ tùng",
                ],
                image:
                  "https://images.unsplash.com/photo-1581092921461-39b9d904ee84?w=600&q=80",
              },
              {
                title: "Hỗ Trợ Kỹ Thuật",
                description:
                  "Đội ngũ kỹ thuật viên luôn sẵn sàng hỗ trợ khi bạn gặp vấn đề với máy móc.",
                features: [
                  "Hỗ trợ kỹ thuật 24/7",
                  "Tư vấn xử lý sự cố từ xa",
                  "Cập nhật phần mềm điều khiển",
                  "Tối ưu hóa hiệu suất máy",
                ],
                image:
                  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
              },
            ].map((service, index) => (
              <RevealAnimation key={index} delay={index * 100}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    <div className="mt-auto">
                      <h4 className="font-semibold mb-2">Bao gồm:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />
    </div>
  );
}
