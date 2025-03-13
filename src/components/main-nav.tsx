"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Phone, Menu, ChevronDown } from "lucide-react";

type ProductType = {
  label: string;
  href: string;
};

type NavItemType = {
  label: string;
  href: string;
  dropdown?: ProductType[];
};

const navItems: NavItemType[] = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Sản phẩm",
    href: "/san-pham",
    dropdown: [
      { label: "Máy gỗ", href: "/san-pham/may-go" },
      { label: "Máy dán cạnh", href: "/san-pham/may-dan-canh" },
      { label: "Máy khoan ngang", href: "/san-pham/may-khoan-ngang" },
      { label: "Máy cưa bàn trượt", href: "/san-pham/may-cua-ban-truot" },
    ],
  },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Blog", href: "/blog" },
  { label: "Khách hàng", href: "/khach-hang" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Liên hệ", href: "/lien-he" },
];

export function MainNav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (href: string) => {
    setActiveDropdown(activeDropdown === href ? null : href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              Tân Tiến Vinh
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-1"
            ref={dropdownRef}
          >
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(item.href)}
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center",
                        pathname.startsWith(item.href)
                          ? "text-blue-600 font-semibold"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-100",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === item.href ? "rotate-180" : ""}`}
                      />
                    </button>
                    {activeDropdown === item.href && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg py-1 z-20">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-100",
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-blue-600" />
              <a
                href="tel:035.519.7235"
                className="font-medium hover:underline text-blue-600"
              >
                035.519.7235
              </a>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/bao-gia">Báo giá</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.href)}
                        className={cn(
                          "w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-between",
                          pathname.startsWith(item.href)
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${activeDropdown === item.href ? "rotate-180" : ""}`}
                        />
                      </button>
                      {activeDropdown === item.href && (
                        <div className="pl-4 mt-1 space-y-1 border-l-2 border-gray-200 ml-4">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md"
                              onClick={() => {
                                setActiveDropdown(null);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium transition-colors block",
                        pathname === item.href
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <div className="flex items-center px-4 py-2">
                  <Phone className="h-4 w-4 mr-2 text-blue-600" />
                  <a
                    href="tel:035.519.7235"
                    className="font-medium hover:underline text-blue-600"
                  >
                    035.519.7235
                  </a>
                </div>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Link
                    href="/bao-gia"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Báo giá
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
