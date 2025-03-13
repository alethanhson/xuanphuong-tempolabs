import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default async function BannerPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Sample banners for demonstration
  const sampleBanners = [
    {
      id: "1",
      title: "Máy CNC Gỗ Chất Lượng Cao",
      page: "Trang chủ",
      position: "Hero",
      image_url:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80",
      created_at: "2023-05-15T10:30:00Z",
      is_active: true,
    },
    {
      id: "2",
      title: "Giải Pháp CNC Toàn Diện",
      page: "Sản phẩm",
      position: "Header",
      image_url:
        "https://images.unsplash.com/photo-1565034957450-e7f4e4d04193?w=600&q=80",
      created_at: "2023-06-22T14:45:00Z",
      is_active: true,
    },
    {
      id: "3",
      title: "Khuyến mãi tháng 7",
      page: "Trang chủ",
      position: "Sidebar",
      image_url:
        "https://images.unsplash.com/photo-1624365169198-38255ba54160?w=600&q=80",
      created_at: "2023-07-10T09:15:00Z",
      is_active: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Quản lý banner</h2>
        <Button asChild>
          <Link href="/admin/banner/them-moi">
            <Plus className="mr-2 h-4 w-4" /> Thêm banner
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách banner</CardTitle>
          <CardDescription>
            Quản lý tất cả banner của website tại đây. Bạn có thể thêm, sửa, xóa
            banner.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Hình ảnh</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Trang</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleBanners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <div className="h-12 w-20 overflow-hidden rounded-md">
                      <img
                        src={banner.image_url}
                        alt={banner.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{banner.title}</TableCell>
                  <TableCell>{banner.page}</TableCell>
                  <TableCell>{banner.position}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${banner.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {banner.is_active ? "Đang hiển thị" : "Ẩn"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/admin/banner/chinh-sua/${banner.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
