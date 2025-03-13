import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealAnimation } from "@/components/ui/reveal-animation";

export function FeaturesSection() {
  const features = [
    {
      title: "Sản phẩm chất lượng cao",
      description: "Nhập khẩu từ các thương hiệu uy tín",
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=checkCircle",
    },
    {
      title: "Đội ngũ kỹ thuật chuyên nghiệp",
      description: "Được đào tạo bài bản, giàu kinh nghiệm",
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=users",
    },
    {
      title: "Dịch vụ hậu mãi tận tâm",
      description: "Hỗ trợ 24/7, bảo hành dài hạn",
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=headset",
    },
    {
      title: "Giải pháp tùy chỉnh",
      description: "Đáp ứng nhu cầu đặc thù của từng khách hàng",
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=settings",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <RevealAnimation>
          <SectionHeading
            badge="Về Chúng Tôi"
            title="Đối tác tin cậy trong lĩnh vực công nghệ CNC"
            subtitle="CNC Future tự hào là đơn vị tiên phong trong việc cung cấp các giải pháp CNC toàn diện cho ngành công nghiệp gỗ và kim loại tại Việt Nam."
            center
          />
        </RevealAnimation>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <RevealAnimation delay={200}>
            <div className="bg-gray-50 p-8 rounded-xl">
              <p className="text-lg text-gray-700 mb-6">
                CNC Future tự hào là đơn vị tiên phong trong việc cung cấp các
                giải pháp CNC toàn diện cho ngành công nghiệp gỗ và kim loại tại
                Việt Nam. Với hơn 10 năm kinh nghiệm, chúng tôi cam kết mang đến
                những sản phẩm chất lượng cao, dịch vụ chuyên nghiệp và giải
                pháp tối ưu cho doanh nghiệp của bạn.
              </p>

              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={400} direction="left">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden h-48 md:h-64">
                  <img
                    src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80"
                    alt="CNC Machine Workshop"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-48 md:h-64">
                  <img
                    src="https://images.unsplash.com/photo-1565034957450-e7f4e4d04193?w=600&q=80"
                    alt="CNC Precision Work"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-lg overflow-hidden h-48 md:h-64">
                  <img
                    src="https://images.unsplash.com/photo-1624365169198-38255ba54160?w=600&q=80"
                    alt="CNC Wood Carving"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-48 md:h-64">
                  <img
                    src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80"
                    alt="CNC Metal Working"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
