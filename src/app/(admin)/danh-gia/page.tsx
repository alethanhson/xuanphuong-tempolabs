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
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import Link from "next/link";

export default async function TestimonialsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch testimonials from Supabase
  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  // Sample testimonials for demonstration
  const sampleTestimonials = [
    {
      id: "1",
      name: "Nguyễn Văn A",
      position: "Giám đốc, Xưởng Mộc Thành Công",
      content:
        "Máy CNC WoodMaster 500 đã giúp chúng tôi tăng tốc độ cắt gỗ lên 2 lần và giảm đáng kể hao phí. Dịch vụ hỗ trợ kỹ thuật của CNC Future luôn sẵn sàng giải quyết mọi vấn đề một cách nhanh chóng.",
      rating: 5,
      created_at: "2023-05-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Trần Thị B",
      position: "Quản lý sản xuất, Cơ khí Phát Đạt",
      content:
        "Chúng tôi đã sử dụng máy CNC MetalPro X1000 được 2 năm và rất hài lòng với độ chính xác và độ bền của máy. Đội ngũ kỹ thuật của CNC Future rất chuyên nghiệp và tận tâm.",
      rating: 5,
      created_at: "2023-06-22T14:45:00Z",
    },
    {
      id: "3",
      name: "Lê Văn C",
      position: "Chủ xưởng, Nội Thất Hiện Đại",
      content:
        "Dịch vụ đào tạo của CNC Future đã giúp nhân viên của chúng tôi nhanh chóng làm chủ công nghệ CNC. Máy móc chất lượng cao và dịch vụ hậu mãi tuyệt vời.",
      rating: 4,
      created_at: "2023-07-10T09:15:00Z",
    },
    {
      id: "4",
      name: "Phạm Thị D",
      position: "Giám đốc điều hành, Mỹ Nghệ Việt",
      content:
        "Tôi đánh giá cao sự tư vấn chuyên nghiệp của CNC Future trong việc lựa chọn máy CNC phù hợp với nhu cầu sản xuất của công ty. Máy hoạt động ổn định và hiệu quả.",
      rating: 5,
      created_at: "2023-08-05T16:20:00Z",
    },
  ];

  // Use fetched testimonials if available, otherwise use sample data
  const displayTestimonials =
    testimonials && testimonials.length > 0 ? testimonials : sampleTestimonials;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Quản lý đánh giá khách hàng
        </h2>
        <Button asChild>
          <Link href="/admin/danh-gia/them-moi">
            <Plus className="mr-2 h-4 w-4" /> Thêm đánh giá
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách đánh giá</CardTitle>
          <CardDescription>
            Quản lý tất cả đánh giá của khách hàng tại đây. Bạn có thể thêm,
            sửa, xóa đánh giá.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Chức vụ</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium">
                    {testimonial.name}
                  </TableCell>
                  <TableCell>{testimonial.position}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(testimonial.created_at).toLocaleDateString(
                      "vi-VN",
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link
                          href={`/admin/danh-gia/chinh-sua/${testimonial.id}`}
                        >
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
