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
import { Plus, Pencil, Trash2, UserPlus } from "lucide-react";
import Link from "next/link";

export default async function UsersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch users from Supabase
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  // Sample users for demonstration
  const sampleUsers = [
    {
      id: "1",
      email: "admin@cncfuture.com",
      full_name: "Admin CNC Future",
      role: "admin",
      created_at: "2023-01-15T10:30:00Z",
      last_sign_in: "2023-09-01T08:45:00Z",
    },
    {
      id: "2",
      email: "nguyen.van.a@example.com",
      full_name: "Nguyễn Văn A",
      role: "user",
      created_at: "2023-05-20T14:30:00Z",
      last_sign_in: "2023-08-28T16:20:00Z",
    },
    {
      id: "3",
      email: "tran.thi.b@example.com",
      full_name: "Trần Thị B",
      role: "user",
      created_at: "2023-06-10T09:15:00Z",
      last_sign_in: "2023-08-30T11:45:00Z",
    },
    {
      id: "4",
      email: "le.van.c@example.com",
      full_name: "Lê Văn C",
      role: "editor",
      created_at: "2023-07-05T16:20:00Z",
      last_sign_in: "2023-08-29T14:30:00Z",
    },
  ];

  // Use fetched users if available, otherwise use sample data
  const displayUsers = users && users.length > 0 ? users : sampleUsers;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Quản lý người dùng
        </h2>
        <Button asChild>
          <Link href="/admin/nguoi-dung/them-moi">
            <UserPlus className="mr-2 h-4 w-4" /> Thêm người dùng
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription>
            Quản lý tất cả người dùng của hệ thống tại đây. Bạn có thể thêm,
            sửa, xóa người dùng.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Họ tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Đăng nhập gần nhất</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.full_name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.role === "admin" ? "bg-blue-100 text-blue-800" : user.role === "editor" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {user.role === "admin"
                        ? "Quản trị viên"
                        : user.role === "editor"
                          ? "Biên tập viên"
                          : "Người dùng"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell>
                    {user.last_sign_in
                      ? new Date(user.last_sign_in).toLocaleDateString(
                          "vi-VN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )
                      : "Chưa đăng nhập"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/admin/nguoi-dung/chinh-sua/${user.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        disabled={user.role === "admin"}
                      >
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
