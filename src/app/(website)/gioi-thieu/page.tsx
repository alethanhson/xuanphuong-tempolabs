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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <RevealAnimation>
            <h2 className="text-3xl font-bold mb-12 text-center">
              Đội Ngũ Lãnh Đạo
            </h2>
          </RevealAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Nguyễn Văn A",
                position: "Giám đốc điều hành",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
              },
              {
                name: "Trần Thị B",
                position: "Giám đốc kỹ thuật",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
              },
              {
                name: "Lê Văn C",
                position: "Giám đốc kinh doanh",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
              },
            ].map((member, index) => (
              <RevealAnimation key={index} delay={index * 100}>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-blue-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
