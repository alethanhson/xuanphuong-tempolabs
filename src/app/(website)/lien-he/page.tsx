import { ContactForm } from "@/components/contact-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BreadcrumbSchema } from "@/components/ui/schema-org";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default function ContactPage() {
  return (
    <div>
      <div className="pt-24 bg-blue-50">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumbs currentPageLabel="Liên hệ" className="mb-4" />
          <BreadcrumbSchema
            items={[
              { name: "Trang chủ", item: "https://tantienvinh.com/" },
              { name: "Liên hệ", item: "https://tantienvinh.com/lien-he" },
            ]}
          />
          <h1 className="text-4xl font-bold mb-4">Liên Hệ</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ về các sản phẩm
            và dịch vụ CNC.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <RevealAnimation>
              <div>
                <h2 className="text-3xl font-bold mb-8">Thông Tin Liên Hệ</h2>

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
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Email
                      </h4>
                      <p className="text-gray-600">
                        <a
                          href="mailto:info@cncfuture.com"
                          className="hover:text-blue-600 transition-colors"
                        >
                          info@cncfuture.com
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
              <div className="h-96 md:h-full min-h-[400px] rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4842318813194!2d106.7692272!3d10.8484247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOw7RuZyBMw6JtIFRQLiBIQ00!5e0!3m2!1svi!2s!4v1654612031972!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                ></iframe>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6">Gửi Yêu Cầu Liên Hệ</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
