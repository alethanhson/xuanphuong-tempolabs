import { FeaturesSection } from "@/components/features-section";
import { StatsSection } from "@/components/stats-section";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default function AboutPage() {
  return (
    <div>
      <div className="pt-24 bg-blue-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Giới Thiệu</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Tìm hiểu thêm về CNC Future - đối tác tin cậy của bạn trong lĩnh vực
            công nghệ CNC.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <RevealAnimation>
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Câu Chuyện Của Chúng Tôi
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  CNC Future được thành lập vào năm 2010 với sứ mệnh mang công
                  nghệ CNC hiện đại đến với các doanh nghiệp Việt Nam, giúp nâng
                  cao năng suất và chất lượng sản phẩm trong ngành công nghiệp
                  gỗ và kim loại.
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  Với hơn 10 năm kinh nghiệm, chúng tôi tự hào là đối tác tin
                  cậy của hàng trăm doanh nghiệp trên cả nước, cung cấp các giải
                  pháp CNC toàn diện từ tư vấn, thiết kế đến lắp đặt, bảo trì và
                  đào tạo.
                </p>
                <p className="text-lg text-gray-600">
                  Đội ngũ chuyên gia giàu kinh nghiệm của chúng tôi luôn sẵn
                  sàng hỗ trợ bạn tìm ra giải pháp tối ưu cho nhu cầu sản xuất
                  của doanh nghiệp.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation direction="left">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80"
                  alt="CNC Machine Workshop"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <StatsSection />
    </div>
  );
}
