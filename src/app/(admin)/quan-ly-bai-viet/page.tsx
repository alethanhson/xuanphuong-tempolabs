"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "../../../../supabase/client";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Eye, AlertCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách bài viết. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", postToDelete);

      if (error) throw error;

      toast({
        title: "Xóa bài viết thành công",
        description: "Bài viết đã được xóa khỏi cơ sở dữ liệu",
      });

      // Refresh the post list
      fetchPosts();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast({
        title: "Lỗi khi xóa bài viết",
        description: "Đã xảy ra lỗi khi xóa bài viết. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  // Sample blog posts for demonstration
  const samplePosts = [
    {
      id: "1",
      title: "5 Lý Do Chuyển Đổi Sang CNC Gỗ Hiện Đại",
      slug: "5-ly-do-chuyen-doi-sang-cnc-go-hien-dai",
      excerpt:
        "Khám phá những lợi ích mà máy CNC gỗ hiện đại mang lại cho doanh nghiệp của bạn, từ tăng năng suất đến nâng cao chất lượng sản phẩm.",
      image_url:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80",
      published_at: "2023-05-15T10:30:00Z",
      read_time: 5,
    },
    {
      id: "2",
      title: "Hướng Dẫn Bảo Trì Máy CNC Kim Loại Đúng Cách",
      slug: "huong-dan-bao-tri-may-cnc-kim-loai-dung-cach",
      excerpt:
        "Bài viết chia sẻ các bước bảo trì máy CNC kim loại đúng cách để kéo dài tuổi thọ và đảm bảo hiệu suất làm việc tối ưu.",
      image_url:
        "https://images.unsplash.com/photo-1565034957450-e7f4e4d04193?w=600&q=80",
      published_at: "2023-06-22T14:45:00Z",
      read_time: 8,
    },
    {
      id: "3",
      title: "Xu Hướng Công Nghệ CNC 2025: Tự Động Hóa và AI",
      slug: "xu-huong-cong-nghe-cnc-2025-tu-dong-hoa-va-ai",
      excerpt:
        "Khám phá những xu hướng công nghệ CNC mới nhất sẽ định hình ngành công nghiệp trong năm 2025, với trọng tâm là tự động hóa và trí tuệ nhân tạo.",
      image_url:
        "https://images.unsplash.com/photo-1624365169198-38255ba54160?w=600&q=80",
      published_at: "2023-07-10T09:15:00Z",
      read_time: 6,
    },
  ];

  // Use fetched posts if available, otherwise use sample data
  const displayPosts = posts.length > 0 ? posts : samplePosts;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Quản lý bài viết</h2>
        <Button asChild>
          <Link href="/admin/quan-ly-bai-viet/them-moi">
            <Plus className="mr-2 h-4 w-4" /> Thêm bài viết
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">
            Danh sách bài viết
          </h3>
          <p className="text-sm text-muted-foreground">
            Quản lý tất cả bài viết blog của bạn tại đây. Bạn có thể thêm, sửa,
            xóa bài viết.
          </p>
        </div>
        <div className="p-6 pt-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3">Đang tải...</span>
            </div>
          ) : displayPosts.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">Không có bài viết nào</h3>
              <p className="text-sm text-gray-500 mt-1">
                Bạn chưa có bài viết nào. Hãy thêm bài viết mới.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/admin/quan-ly-bai-viet/them-moi">
                  <Plus className="mr-2 h-4 w-4" /> Thêm bài viết mới
                </Link>
              </Button>
            </div>
          ) : (
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] w-[100px]">
                      Hình ảnh
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                      Tiêu đề
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                      Ngày đăng
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                      Thời gian đọc
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-right">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {displayPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                        <div className="h-12 w-12 overflow-hidden rounded-md">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-medium">
                        {post.title}
                      </td>
                      <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                        {new Date(post.published_at).toLocaleDateString(
                          "vi-VN",
                        )}
                      </td>
                      <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                        {post.read_time} phút
                      </td>
                      <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" asChild>
                            <Link href={`/blog/${post.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="icon" asChild>
                            <Link
                              href={`/admin/quan-ly-bai-viet/chinh-sua/${post.id}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              setPostToDelete(post.id);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa bài viết</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể
              hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePost}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
