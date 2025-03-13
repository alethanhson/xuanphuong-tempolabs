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
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function CategoriesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Sample categories for demonstration
  const sampleCategories = [
    {
      id: "1",
      name: "Máy CNC Gỗ",
      slug: "may-cnc-go",
      description: "Các loại máy CNC chuyên dụng cho ngành gỗ",
      product_count: 12,
      created_at: "2023-05-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Máy CNC Kim Loại",
      slug: "may-cnc-kim-loai",
      description: "Các loại máy CNC chuyên dụng cho ngành kim loại",
      product_count: 8,
      created_at: "2023-06-22T14:45:00Z",
    },
    {
      id: "3",
      name: "Máy CNC Laser",
      slug: "may-cnc-laser",
      description: "Các loại máy cắt laser CNC",
      product_count: 6,
      created_at: "2023-07-10T09:15:00Z",
    },
    {
      id: "4",
      name: "Phụ Kiện CNC",
      slug: "phu-kien-cnc",
      description: "Phụ kiện và linh kiện thay thế cho máy CNC",
      product_count: 24,
      created_at: "2023-08-05T16:20:00Z",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Quản lý danh mục</h2>
        <Button asChild>
          <Link href="/admin/danh-muc/them-moi">
            <Plus className="mr-2 h-4 w-4" /> Thêm danh mục
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách danh mục</CardTitle>
          <CardDescription>
            Quản lý tất cả danh mục sản phẩm tại đây. Bạn có thể thêm, sửa, xóa
            danh mục.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Số sản phẩm</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>{category.product_count}</TableCell>
                  <TableCell>
                    {new Date(category.created_at).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/admin/danh-muc/chinh-sua/${category.id}`}>
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
