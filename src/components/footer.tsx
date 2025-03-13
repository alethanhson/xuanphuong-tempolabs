import Link from "next/link";
import {
  Facebook,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Tân Tiến Vinh</h3>
            <p className="text-gray-400 mb-6">
              Chuyên cung cấp máy móc hiện đại cho ngành nội thất, nâng cao hiệu
              suất sản xuất.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Sản Phẩm</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/san-pham/may-go"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Máy Gỗ
                </Link>
              </li>
              <li>
                <Link
                  href="/san-pham/may-dan-canh"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Máy Dán Cạnh
                </Link>
              </li>
              <li>
                <Link
                  href="/san-pham/may-khoan-ngang"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Máy Khoan Ngang
                </Link>
              </li>
              <li>
                <Link
                  href="/san-pham/may-cua-ban-truot"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Máy Cưa Bàn Trượt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Dịch Vụ</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/dich-vu/tu-van-thiet-ke"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tư Vấn Thiết Kế
                </Link>
              </li>
              <li>
                <Link
                  href="/dich-vu/lap-dat-van-hanh"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Lắp Đặt Vận Hành
                </Link>
              </li>
              <li>
                <Link
                  href="/dich-vu/bao-tri-bao-duong"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Bảo Trì Bảo Dưỡng
                </Link>
              </li>
              <li>
                <Link
                  href="/dich-vu/dao-tao-nhan-vien"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Đào Tạo Nhân Viên
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Liên Hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <span className="text-gray-400">
                  123 Đường Công Nghiệp, Quận 9, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-500 mr-3" />
                <a
                  href="tel:035.519.7235"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  035.519.7235
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-500 mr-3" />
                <a
                  href="mailto:info@tantienvinh.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@tantienvinh.com
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div className="text-gray-400">
                  <p>Thứ Hai - Thứ Sáu: 8:00 - 17:30</p>
                  <p>Thứ Bảy: 8:00 - 12:00</p>
                  <p>Chủ Nhật: Nghỉ</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} Tân Tiến Vinh. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
