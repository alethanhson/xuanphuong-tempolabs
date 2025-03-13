"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { RevealAnimation } from "@/components/ui/reveal-animation";

type SlideType = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
};

export function ModernHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const slides: SlideType[] = [
    {
      title: "Máy Gia Công Nội Thất Chất Lượng Cao",
      subtitle: "Công Nghệ Tiên Tiến",
      description:
        "Tối ưu hóa quy trình sản xuất nội thất với các dòng máy hiện đại, độ chính xác cao và hiệu suất vượt trội.",
      image:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&q=80",
      ctaText: "Khám phá sản phẩm",
      ctaLink: "/san-pham",
    },
    {
      title: "Giải Pháp Toàn Diện Cho Ngành Gỗ",
      subtitle: "Đồng Hành Cùng Doanh Nghiệp",
      description:
        "Cung cấp các giải pháp toàn diện, từ tư vấn đến lắp đặt và bảo trì máy gia công nội thất chất lượng cao.",
      image:
        "https://images.unsplash.com/photo-1565034957450-e7f4e4d04193?w=1200&q=80",
      ctaText: "Tìm hiểu dịch vụ",
      ctaLink: "/dich-vu",
    },
    {
      title: "Đối Tác Tin Cậy Của Bạn",
      subtitle: "Hơn 10 Năm Kinh Nghiệm",
      description:
        "Đồng hành cùng doanh nghiệp với đội ngũ chuyên gia giàu kinh nghiệm, mang đến những giải pháp tối ưu cho sản xuất.",
      image:
        "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1200&q=80",
      ctaText: "Liên hệ ngay",
      ctaLink: "/lien-he",
    },
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { width, height, left, top } =
          heroRef.current.getBoundingClientRect();

        // Calculate mouse position relative to the center of the element
        const x = (clientX - left - width / 2) / 25;
        const y = (clientY - top - height / 2) / 25;

        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden pt-16 bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#1e40af"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div
          className="absolute top-1/4 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)`,
            transition: "transform 0.2s ease-out",
          }}
        ></div>
        <div
          className="absolute bottom-1/3 left-10 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.2s ease-out",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="bg-white/80 p-8 md:p-10 rounded-2xl backdrop-blur-md shadow-xl border border-white/20 transform hover:translate-y-[-5px] transition-all duration-300">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 ${currentSlide === index ? "opacity-100 translate-y-0" : "opacity-0 absolute translate-y-4"}`}
                >
                  {currentSlide === index && (
                    <>
                      <RevealAnimation delay={200}>
                        <div className="inline-block bg-blue-600/10 px-4 py-1.5 rounded-full mb-4">
                          <h2 className="text-blue-600 text-sm font-bold tracking-wide">
                            {slide.subtitle}
                          </h2>
                        </div>
                      </RevealAnimation>

                      <RevealAnimation delay={400}>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
                          {slide.title}
                        </h1>
                      </RevealAnimation>

                      <RevealAnimation delay={600}>
                        <p className="text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
                          {slide.description}
                        </p>
                      </RevealAnimation>

                      <RevealAnimation delay={800}>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px]"
                            asChild
                          >
                            <Link href={slide.ctaLink}>
                              {slide.ctaText}{" "}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                          </Button>
                          <Button
                            size="lg"
                            variant="outline"
                            className="border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300"
                            asChild
                          >
                            <Link href="/bao-gia">Yêu cầu báo giá</Link>
                          </Button>
                        </div>
                      </RevealAnimation>

                      <RevealAnimation delay={1000}>
                        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full shadow-sm">
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            <span>Chất lượng cao</span>
                          </div>
                          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full shadow-sm">
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            <span>Bảo hành 24 tháng</span>
                          </div>
                          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full shadow-sm">
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            <span>Hỗ trợ 24/7</span>
                          </div>
                        </div>
                      </RevealAnimation>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
                style={{
                  transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                  transition: "transform 0.2s ease-out, opacity 1s ease-in-out",
                }}
              >
                <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover scale-110 transition-transform duration-[8000ms] ease-out"
                    style={{
                      transform:
                        currentSlide === index ? "scale(1)" : "scale(1.1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 mx-2 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-blue-600 scale-125" : "bg-gray-300"} hover:scale-110`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  );
}
