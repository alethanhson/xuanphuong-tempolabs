"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "../../../supabase/client-browser";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FileText,
  Image,
  MessageSquare,
  Users,
  Settings,
  BarChart3,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Tổng quan",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Thống kê",
    href: "/admin/thong-ke",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Quản lý danh mục",
    href: "/admin/danh-muc",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Quản lý sản phẩm",
    href: "/admin/quan-ly-san-pham",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Quản lý bài viết",
    href: "/admin/quan-ly-bai-viet",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Quản lý banner",
    href: "/admin/banner",
    icon: <Image className="h-5 w-5" />,
  },
  {
    title: "Đánh giá khách hàng",
    href: "/admin/danh-gia",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Quản lý người dùng",
    href: "/admin/nguoi-dung",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Cài đặt website",
    href: "/admin/cai-dat",
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        router.push("/sign-in");
      }
    };

    checkAuth();

    // Handle responsive behavior
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
        setIsMobile(true);
      } else {
        setIsSidebarOpen(true);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [router, supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white shadow-lg transition-transform duration-300 lg:static",
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0 lg:w-20",
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/admin" className="flex items-center">
            {isSidebarOpen || isMobile ? (
              <span className="text-xl font-bold text-blue-600">CNC Admin</span>
            ) : (
              <span className="text-xl font-bold text-blue-600">CNC</span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:flex hidden"
          >
            <ChevronLeft
              className={cn(
                "h-5 w-5 transition-transform",
                !isSidebarOpen && "rotate-180",
              )}
            />
          </Button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600",
                )}
              >
                <span className="mr-3 flex-shrink-0">{item.icon}</span>
                {(isSidebarOpen || isMobile) && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600",
              !isSidebarOpen && !isMobile && "justify-center px-2",
            )}
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-5 w-5" />
            {(isSidebarOpen || isMobile) && <span>Đăng xuất</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="flex h-16 items-center border-b bg-white px-4 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              Xem trang chủ
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
