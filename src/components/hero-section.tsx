"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { RevealAnimation } from "@/components/ui/reveal-animation";

type SlideType = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides: SlideType[] = [
    {
      title: "Máy Gia Công Nội Thất Chất Lượng Cao",
      subtitle: "Độ Chính Xác Tuyệt Đối",
      description:
        "Tối ưu hóa quy trình sản xuất nội thất với các dòng máy hiện đại, độ chính xác cao.",
      image:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80",
    },
    {
      title: "Giải Pháp Toàn Diện Cho Ngành Gỗ",
      subtitle: "Máy Móc Hiện Đại",
      description:
        "Cung cấp các giải pháp toàn diện, từ tư vấn đến lắp đặt và bảo trì máy gia công nội thất.",
      image:
        "https://images.unsplash.com/photo-1565034957450-e7f4e4d04193?w=800&q=80",
    },
    {
      title: "Đối Tác Tin Cậy",
      subtitle: "Hơn 10 Năm Kinh Nghiệm",
      description:
        "Đồng hành cùng doanh nghiệp của bạn với đội ngũ chuyên gia giàu kinh nghiệm về máy móc ngành gỗ.",
      image:
        "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Images - positioned below content */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-transparent z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content - positioned above background */}
      <div className="container mx-auto px-4 relative z-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white/80 p-8 rounded-xl backdrop-blur-sm shadow-xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-opacity duration-1000 ${currentSlide === index ? "opacity-100" : "opacity-0 absolute"}`}
              >
                {currentSlide === index && (
                  <>
                    <RevealAnimation delay={200}>
                      <h2 className="text-blue-600 text-xl font-bold mb-4">
                        {slide.subtitle}
                      </h2>
                    </RevealAnimation>

                    <RevealAnimation delay={400}>
                      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                        {slide.title}
                      </h1>
                    </RevealAnimation>

                    <RevealAnimation delay={600}>
                      <p className="text-xl text-gray-600 mb-8 max-w-xl">
                        {slide.description}
                      </p>
                    </RevealAnimation>

                    <RevealAnimation delay={800}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          size="lg"
                          className="bg-blue-600 hover:bg-blue-700"
                          asChild
                        >
                          <Link href="/san-pham">
                            Xem sản phẩm <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                          asChild
                        >
                          <Link href="/lien-he">Yêu cầu báo giá</Link>
                        </Button>
                      </div>
                    </RevealAnimation>

                    <RevealAnimation delay={1000}>
                      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                          <span>Chất lượng cao</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                          <span>Bảo hành 24 tháng</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                          <span>Hỗ trợ kỹ thuật 24/7</span>
                        </div>
                      </div>
                    </RevealAnimation>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:block"></div>
        </div>

        <div className="flex justify-center mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 mx-2 rounded-full transition-colors ${currentSlide === index ? "bg-blue-600" : "bg-gray-400"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
