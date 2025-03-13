"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and show success message
      setFormState({ name: "", email: "", phone: "", message: "" });
      setIsSubmitted(true);
    } catch (err) {
      setError("Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <RevealAnimation>
          <SectionHeading
            title="Liên Hệ Với Chúng Tôi"
            subtitle="Đội ngũ tư vấn của chúng tôi luôn sẵn sàng hỗ trợ bạn"
            center
          />
        </RevealAnimation>

        <div className="mt-16 grid md:grid-cols-2 gap-12">
          <RevealAnimation>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Thông Tin Liên Hệ</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Địa Chỉ
                    </h4>
                    <p className="text-gray-600">
                      123 Đường Công Nghiệp, Quận 9, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Điện Thoại
                    </h4>
                    <p className="text-gray-600">
                      <a
                        href="tel:035.519.7235"
                        className="hover:text-blue-600 transition-colors"
                      >
                        035.519.7235
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">
                      <a
                        href="mailto:info@tantienvinh.com"
                        className="hover:text-blue-600 transition-colors"
                      >
                        info@tantienvinh.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Giờ làm việc
                    </h4>
                    <p className="text-gray-600">
                      Thứ Hai - Thứ Sáu: 8:00 - 17:30
                    </p>
                    <p className="text-gray-600">Thứ Bảy: 8:00 - 12:00</p>
                    <p className="text-gray-600">Chủ Nhật: Nghỉ</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation direction="left">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12">
                  <div className="bg-green-100 p-4 rounded-full mb-6">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    Cảm ơn bạn đã liên hệ!
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong
                    thời gian sớm nhất.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Gửi tin nhắn khác
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-6">Gửi Tin Nhắn</h3>

                  {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
                      {error}
                    </div>
                  )}

                  <form className="space-y-4" onSubmit={handleSubmit}>
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
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Nhập họ và tên"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

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
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="Nhập địa chỉ email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="Nhập số điện thoại"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nội dung <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Nội dung liên hệ..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
