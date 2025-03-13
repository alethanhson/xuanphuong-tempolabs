import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import {
  ArrowRight,
  FileText,
  Settings,
  Wrench,
  GraduationCap,
} from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      id: "1",
      name: "Tư Vấn & Thiết Kế",
      description:
        "Đội ngũ chuyên gia giàu kinh nghiệm sẽ tư vấn và thiết kế giải pháp CNC phù hợp nhất với nhu cầu của bạn.",
      icon: <FileText className="h-10 w-10 text-blue-600" />,
      link: "/dich-vu/tu-van-thiet-ke",
    },
    {
      id: "2",
      name: "Lắp Đặt & Vận Hành",
      description:
        "Dịch vụ lắp đặt chuyên nghiệp, hướng dẫn vận hành chi tiết giúp bạn nhanh chóng đưa máy vào sản xuất.",
      icon: <Settings className="h-10 w-10 text-blue-600" />,
      link: "/dich-vu/lap-dat-van-hanh",
    },
    {
      id: "3",
      name: "Bảo Trì & Sửa Chữa",
      description:
        "Dịch vụ bảo trì định kỳ và sửa chữa nhanh chóng, đảm bảo máy móc luôn hoạt động ổn định và hiệu quả.",
      icon: <Wrench className="h-10 w-10 text-blue-600" />,
      link: "/dich-vu/bao-tri-sua-chua",
    },
    {
      id: "4",
      name: "Đào Tạo",
      description:
        "Chương trình đào tạo chuyên sâu về vận hành, bảo trì và sử dụng phần mềm CNC cho đội ngũ nhân viên của bạn.",
      icon: <GraduationCap className="h-10 w-10 text-blue-600" />,
      link: "/dich-vu/dao-tao",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <RevealAnimation>
          <SectionHeading
            badge="Dịch Vụ"
            title="Giải Pháp Toàn Diện"
            subtitle="Chúng tôi cung cấp các dịch vụ chuyên nghiệp từ tư vấn, thiết kế đến lắp đặt, bảo trì và đào tạo, đảm bảo máy móc của bạn luôn hoạt động hiệu quả."
            center
          />
        </RevealAnimation>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <RevealAnimation key={service.id} delay={index * 100}>
              <div className="bg-gray-50 rounded-xl p-8 h-full border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold mb-4">{service.name}</h3>

                <p className="text-gray-600 mb-6">{service.description}</p>

                <Button
                  variant="link"
                  className="p-0 h-auto text-blue-600"
                  asChild
                >
                  <Link href={service.link}>
                    Tìm hiểu thêm <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
