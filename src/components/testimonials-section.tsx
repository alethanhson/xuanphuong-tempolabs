"use client";

import { useState, useEffect, memo } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

type Testimonial = {
  id: string;
  content: string;
  author: string;
  position: string;
  rating: number;
};

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    content:
      "Máy CNC WoodMaster 500 đã giúp chúng tôi tăng tốc độ cắt gỗ lên 2 lần và giảm đáng kể hao phí. Dịch vụ hỗ trợ kỹ thuật của CNC Future luôn sẵn sàng giải quyết mọi vấn đề một cách nhanh chóng.",
    author: "Nguyễn Văn A",
    position: "Giám đốc, Xưởng Mộc Thành Công",
    rating: 5,
  },
  {
    id: "2",
    content:
      "Chúng tôi đã sử dụng máy CNC MetalPro X1000 được 2 năm và rất hài lòng với độ chính xác và độ bền của máy. Đội ngũ kỹ thuật của CNC Future rất chuyên nghiệp và tận tâm.",
    author: "Trần Thị B",
    position: "Quản lý sản xuất, Cơ khí Phát Đạt",
    rating: 5,
  },
  {
    id: "3",
    content:
      "Dịch vụ đào tạo của CNC Future đã giúp nhân viên của chúng tôi nhanh chóng làm chủ công nghệ CNC. Máy móc chất lượng cao và dịch vụ hậu mãi tuyệt vời.",
    author: "Lê Văn C",
    position: "Chủ xưởng, Nội Thất Hiện Đại",
    rating: 4,
  },
  {
    id: "4",
    content:
      "Tôi đánh giá cao sự tư vấn chuyên nghiệp của CNC Future trong việc lựa chọn máy CNC phù hợp với nhu cầu sản xuất của công ty. Máy hoạt động ổn định và hiệu quả.",
    author: "Phạm Thị D",
    position: "Giám đốc điều hành, Mỹ Nghệ Việt",
    rating: 5,
  },
];

interface TestimonialsSectionProps {
  customTestimonials?: any[];
}

export const TestimonialsSection = memo(function TestimonialsSection({
  customTestimonials,
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = customTestimonials?.length
    ? customTestimonials
    : defaultTestimonials;

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <RevealAnimation>
          <SectionHeading
            badge="Khách Hàng Nói Gì"
            title="Đánh Giá Từ Khách Hàng"
            subtitle="Hãy nghe những chia sẻ từ khách hàng đã và đang sử dụng sản phẩm và dịch vụ của chúng tôi."
            center
          />
        </RevealAnimation>

        <div className="mt-16 relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto">
                    <div className="flex mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>

                    <blockquote className="text-xl italic text-gray-700 mb-6">
                      "{testimonial.content}"
                    </blockquote>

                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-blue-600 font-bold text-lg">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {testimonial.author}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {testimonial.position}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${activeIndex === index ? "bg-blue-600" : "bg-gray-300"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full hidden md:flex"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full hidden md:flex"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
});
