"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  homeLabel?: string;
  items?: { label: string; href: string }[];
  currentPageLabel?: string;
  className?: string;
}

export function Breadcrumbs({
  homeLabel = "Trang chủ",
  items = [],
  currentPageLabel,
  className = "",
}: BreadcrumbsProps) {
  const pathname = usePathname();

  // If no custom items are provided, generate from pathname
  const breadcrumbItems =
    items.length > 0 ? items : generateBreadcrumbItems(pathname);

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-sm ${className}`}
    >
      <ol className="flex items-center flex-wrap">
        <li className="flex items-center">
          <Link
            href="/"
            className="text-gray-500 hover:text-blue-600 flex items-center"
            aria-label={homeLabel}
          >
            <Home className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:ml-2">{homeLabel}</span>
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight
              className="h-4 w-4 mx-2 text-gray-400"
              aria-hidden="true"
            />
            <Link
              href={item.href}
              className="text-gray-500 hover:text-blue-600"
            >
              {item.label}
            </Link>
          </li>
        ))}

        {currentPageLabel && (
          <li className="flex items-center">
            <ChevronRight
              className="h-4 w-4 mx-2 text-gray-400"
              aria-hidden="true"
            />
            <span className="text-gray-900 font-medium" aria-current="page">
              {currentPageLabel}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
}

// Helper function to generate breadcrumb items from pathname
function generateBreadcrumbItems(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  // Map path segments to readable labels
  const pathMap: Record<string, string> = {
    "san-pham": "Sản phẩm",
    "may-go": "Máy gỗ",
    "may-dan-canh": "Máy dán cạnh",
    "may-khoan-ngang": "Máy khoan ngang",
    "may-cua-ban-truot": "Máy cưa bàn trượt",
    "dich-vu": "Dịch vụ",
    blog: "Blog",
    "gioi-thieu": "Giới thiệu",
    "lien-he": "Liên hệ",
    "bao-gia": "Báo giá",
    "khach-hang": "Khách hàng",
  };

  return segments.slice(0, -1).map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return {
      label: pathMap[segment] || segment,
      href,
    };
  });
}
