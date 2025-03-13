import { AnimatedCounter } from "@/components/ui/animated-counter";
import { RevealAnimation } from "@/components/ui/reveal-animation";

export function StatsSection() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <RevealAnimation>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Lý Do Khách Hàng Tin Tưởng CNC Future
            </h2>
            <p className="text-blue-100 max-w-3xl mx-auto">
              Với hơn 10 năm kinh nghiệm, chúng tôi tự hào là đối tác tin cậy
              của hàng trăm doanh nghiệp trong lĩnh vực công nghiệp gỗ và kim
              loại.
            </p>
          </div>
        </RevealAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <RevealAnimation delay={100}>
            <div className="bg-blue-700/30 p-8 rounded-xl">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Chất Lượng Đảm Bảo</h3>
              <p className="text-blue-100 mb-4">
                Chúng tôi chỉ cung cấp các sản phẩm chất lượng cao từ các thương
                hiệu uy tín trên thế giới.
              </p>
              <div className="text-4xl font-bold text-white">
                <AnimatedCounter end={100} suffix="%" />
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={200}>
            <div className="bg-blue-700/30 p-8 rounded-xl">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Hiệu Suất Cao</h3>
              <p className="text-blue-100 mb-4">
                Máy móc của chúng tôi được thiết kế để tối ưu hóa hiệu suất và
                tiết kiệm chi phí sản xuất.
              </p>
              <div className="text-4xl font-bold text-white">
                <AnimatedCounter end={200} suffix="%" />
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={300}>
            <div className="bg-blue-700/30 p-8 rounded-xl">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Đội Ngũ Chuyên Nghiệp</h3>
              <p className="text-blue-100 mb-4">
                Đội ngũ kỹ thuật viên giàu kinh nghiệm, được đào tạo bài bản về
                công nghệ CNC.
              </p>
              <div className="text-4xl font-bold text-white">
                <AnimatedCounter end={50} suffix="+" />
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={400}>
            <div className="bg-blue-700/30 p-8 rounded-xl">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Hỗ Trợ Tận Tâm</h3>
              <p className="text-blue-100 mb-4">
                Dịch vụ hậu mãi 24/7, giải quyết mọi vấn đề kỹ thuật nhanh chóng
                và hiệu quả.
              </p>
              <div className="text-4xl font-bold text-white">
                <AnimatedCounter end={24} suffix="/7" />
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
