import { createClient } from "@/app/supabase/server";
import { redirect } from "next/navigation";
import { BarChart3, PieChart, LineChart } from "lucide-react";

export default async function StatsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Thống kê truy cập</h2>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between p-6 pb-2">
            <h3 className="text-sm font-medium">Hôm nay</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">lượt truy cập</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between p-6 pb-2">
            <h3 className="text-sm font-medium">Tuần này</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">5,678</div>
            <p className="text-xs text-muted-foreground">lượt truy cập</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between p-6 pb-2">
            <h3 className="text-sm font-medium">Tháng này</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">23,456</div>
            <p className="text-xs text-muted-foreground">lượt truy cập</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between p-6 pb-2">
            <h3 className="text-sm font-medium">Tổng cộng</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">123,456</div>
            <p className="text-xs text-muted-foreground">lượt truy cập</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">
              Lượt truy cập theo thời gian
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="h-80 w-full rounded-md border bg-gray-50 flex items-center justify-center">
              <LineChart className="h-16 w-16 text-gray-300" />
              <span className="ml-2 text-gray-400">
                Biểu đồ lượt truy cập theo thời gian
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">
              Phân bố thiết bị
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="h-80 w-full rounded-md border bg-gray-50 flex items-center justify-center">
              <PieChart className="h-16 w-16 text-gray-300" />
              <span className="ml-2 text-gray-400">
                Biểu đồ phân bố thiết bị
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">
              Trang được xem nhiều nhất
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              {[
                { page: "Trang chủ", views: 45678 },
                { page: "Sản phẩm", views: 34567 },
                { page: "Máy CNC WoodMaster 500", views: 23456 },
                { page: "Liên hệ", views: 12345 },
                { page: "Blog", views: 9876 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <span className="font-medium">{item.page}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.views.toLocaleString()} lượt xem
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">
              Nguồn truy cập
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="h-80 w-full rounded-md border bg-gray-50 flex items-center justify-center">
              <BarChart3 className="h-16 w-16 text-gray-300" />
              <span className="ml-2 text-gray-400">Biểu đồ nguồn truy cập</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
