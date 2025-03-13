'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RevealAnimation } from '@/components/ui/reveal-animation';

export function CtaSection() {
  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden"
      aria-label="Đăng ký tư vấn"
    >
      <div className="absolute inset-0 opacity-5">
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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          <RevealAnimation>
            <div className="lg:w-1/2 max-w-xl">
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
                Sẵn sàng nâng cấp{' '}
                <span className="text-blue-100">công nghệ sản xuất?</span>
              </h2>
              <p className="text-blue-50 text-base md:text-lg mb-8 leading-relaxed">
                Hãy liên hệ ngay với chúng tôi để được tư vấn và nhận giải pháp
                tốt nhất cho nhu cầu sản xuất của bạn. Đội ngũ chuyên gia của
                chúng tôi sẽ hỗ trợ bạn từ khâu tư vấn đến triển khai.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  asChild
                >
                  <Link href="/lien-he">Liên hệ ngay</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-blue-700/50 transition-all duration-300"
                  asChild
                >
                  <Link href="/demo">Xem Demo</Link>
                </Button>
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation direction="left">
            <div className="lg:w-1/2 max-w-md w-full bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Đăng ký nhận tư vấn miễn phí
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="fullname" className="sr-only">
                    Họ và tên
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Họ và tên"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Số điện thoại"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="product" className="sr-only">
                    Sản phẩm quan tâm
                  </label>
                  <select
                    id="product"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
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
                    className="w-full bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                  >
                    Gửi Yêu Cầu
                  </Button>
                </div>
              </form>

              <div className="mt-8 flex items-center justify-center gap-3 bg-white/5 p-4 rounded-xl">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 border-2 border-white flex items-center justify-center text-sm font-bold text-blue-600"
                      aria-hidden="true"
                    >
                      {i === 4 ? '99+' : ''}
                    </div>
                  ))}
                </div>
                <span className="text-white text-sm font-medium">
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
