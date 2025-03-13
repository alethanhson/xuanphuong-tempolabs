import { RevealAnimation } from "@/components/ui/reveal-animation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default
  const pricingPlans = [
    {
      name: "Cơ bản",
      price: "Liên hệ",
      description: "Dành cho doanh nghiệp nhỏ",
      features: [
        "Máy CNC cơ bản",
        "Hướng dẫn sử dụng",
        "Bảo hành 12 tháng",
        "Hỗ trợ kỹ thuật trong giờ hành chính",
      ],
      highlighted: false,
    },
    {
      name: "Tiêu chuẩn",
      price: "Liên hệ",
      description: "Dành cho doanh nghiệp vừa",
      features: [
        "Máy CNC cao cấp",
        "Đào tạo nhân viên",
        "Bảo hành 24 tháng",
        "Hỗ trợ kỹ thuật 24/7",
        "Bảo trì định kỳ",
      ],
      highlighted: true,
    },
    {
      name: "Cao cấp",
      price: "Liên hệ",
      description: "Dành cho doanh nghiệp lớn",
      features: [
        "Máy CNC cao cấp nhất",
        "Đào tạo chuyên sâu",
        "Bảo hành 36 tháng",
        "Hỗ trợ kỹ thuật 24/7 ưu tiên",
        "Bảo trì định kỳ",
        "Nâng cấp phần mềm miễn phí",
      ],
      highlighted: false,
    },
  ];

  return (
    <div>
      <div className="pt-24 bg-blue-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Báo Giá</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Chúng tôi cung cấp nhiều gói dịch vụ khác nhau để phù hợp với nhu
            cầu và ngân sách của bạn.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <RevealAnimation>
            <h2 className="text-3xl font-bold mb-12 text-center">
              Bảng Giá Dịch Vụ
            </h2>
          </RevealAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <RevealAnimation key={index} delay={index * 100}>
                <div
                  className={`rounded-xl border ${plan.highlighted ? "border-blue-500 shadow-lg shadow-blue-100" : "border-gray-200"} p-8 flex flex-col h-full relative`}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-medium rounded-bl-xl rounded-tr-xl">
                      Phổ biến nhất
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-3xl font-bold mb-6">{plan.price}</div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={
                      plan.highlighted ? "bg-blue-600 hover:bg-blue-700" : ""
                    }
                  >
                    Yêu cầu báo giá
                  </Button>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <RevealAnimation>
            <h2 className="text-3xl font-bold mb-12 text-center">
              Yêu Cầu Báo Giá Chi Tiết
            </h2>
          </RevealAnimation>

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tên công ty
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="product"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sản phẩm quan tâm <span className="text-red-500">*</span>
                </label>
                <select
                  id="product"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Chọn sản phẩm</option>
                  <option value="cnc-go">Máy CNC Gỗ</option>
                  <option value="cnc-kim-loai">Máy CNC Kim Loại</option>
                  <option value="cnc-laser">Máy CNC Laser</option>
                  <option value="phu-kien">Phụ Kiện CNC</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Yêu cầu chi tiết
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Vui lòng mô tả