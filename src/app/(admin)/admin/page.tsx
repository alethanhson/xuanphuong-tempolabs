import { createClient } from "@/app/supabase/server";
import { redirect } from "next/navigation";
import {
  BarChart3,
  Package,
  Users,
  Eye,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Placeholder stats - in a real app, these would come from your database
  const stats = [
    {
      title: "Tổng lượt truy cập",
      value: "12,345",
      change: "+12%",
      icon: <Eye className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Sản phẩm",
      value: "48",
      change: "+4",
      icon: <Package className="h-8 w-8 text-green-600" />,
    },
    {
      title: "Đơn hàng",
      value: "256",
      change: "+18%",
      icon: <ShoppingCart className="h-8 w-8 text-purple-600" />,
    },
    {
      title: "Người dùng",
      value: "1,024",
      change: "+32%",
      icon: <Users className="h-8 w-8 text-orange-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tổng quan</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Dữ liệu được cập nhật lần cuối:
          </span>
          <span className="text-sm font-medium">
            {new Date().toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            <div className="flex flex-row items-center justify-between p-6 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </h3>
              {stat.icon}
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-sm text-green-500">
                <TrendingUp className="mr-1 h-4 w-4" />
                {stat.change} so với tháng trước
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">
              Thống kê truy cập
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="h-80 w-full rounded-md border bg-gray-50 flex items-center justify-center">
              <BarChart3 className="h-16 w-16 text-gray-300" />
              <span className="ml-2 text-gray-400">
                Biểu đồ thống kê truy cập
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">
              Hoạt động gần đây
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              {[
                "Người dùng mới đăng ký: Nguyễn Văn A",
                "Sản phẩm mới được thêm: Máy CNC X2000",
                "Bài viết mới được đăng: Xu hướng CNC 2024",
                "Đơn hàng mới: #ORD-12345",
                "Đánh giá mới: 5 sao từ Công ty ABC",
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-md border p-3"
                >
                  <div className="ml-2 text-sm">{activity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
