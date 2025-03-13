import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RevealAnimation } from "@/components/ui/reveal-animation";

export function CtaSection() {
  return (
    <section className="py-24 bg-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
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
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <RevealAnimation>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Sẵn sàng nâng cấp công nghệ sản xuất?
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Hãy liên hệ ngay với chúng tôi để được tư vấn và nhận giải pháp
                tốt nhất cho nhu cầu sản xuất của bạn. Đội ngũ chuyên gia của
                chúng tôi sẽ hỗ trợ bạn từ khâu tư vấn đến triển khai.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  asChild
                >
                  <Link href="/lien-he">Liên hệ ngay</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-blue-700"
                  asChild
                >
                  <Link href="/demo">Xem Demo</Link>
                </Button>
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation direction="left">
            <div className="lg:w-1/2 bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                Đăng ký nhận tư vấn miễn phí
              </h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>
                <div>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  >
                    <option value="" className="text-gray-800">
                      Bạn quan tâm đến sản phẩm nào?
                    </option>
                    <option value="cnc-go" className="text-gray-800">
                      Máy CNC Gỗ
                    </option>
                    <option value="cnc-kim-loai" className="text-gray-800">
                      Máy CNC Kim Loại
                    </option>
                    <option value="cnc-laser" className="text-gray-800">
                      Máy CNC Laser
                    </option>
                    <option value="phu-kien" className="text-gray-800">
                      Phụ Kiện CNC
                    </option>
                  </select>
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  >
                    Gửi Yêu Cầu
                  </Button>
                </div>
              </form>
              <div className="mt-6 flex items-center justify-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-white/20 border-2 border-blue-600 flex items-center justify-center text-xs font-bold text-white"
                    >
                      {i === 4 ? "+" : ""}
                    </div>
                  ))}
                </div>
                <span className="text-white text-sm">
                  Hơn 500+ khách hàng đã tin tưởng chúng tôi
                </span>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
