"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "../../../../supabase/client";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Star,
  StarOff,
  AlertCircle,
} from "lucide-react";
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
import { productCategories } from "@/types/product";
import { Switch } from "@/components/ui/switch";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [showDrafts, setShowDrafts] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!showDrafts) {
        query = query.eq("is_draft", false);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [showDrafts]);

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productToDelete);

      if (error) throw error;

      toast({
        title: "Xóa sản phẩm thành công",
        description: "Sản phẩm đã được xóa khỏi cơ sở dữ liệu",
      });

      // Refresh the product list
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Lỗi khi xóa sản phẩm",
        description: "Đã xảy ra lỗi khi xóa sản phẩm. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({ featured: !currentValue })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: !currentValue ? "Đã thêm vào trang chủ" : "Đã gỡ khỏi trang chủ",
        description: !currentValue
          ? "Sản phẩm sẽ được hiển thị trên trang chủ"
          : "Sản phẩm sẽ không còn hiển thị trên trang chủ",
      });

      // Update the local state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, featured: !currentValue } : product,
        ),
      );
    } catch (error) {
      console.error("Error toggling featured status:", error);
      toast({
        title: "Lỗi",
        description:
          "Không thể cập nhật trạng thái hiển thị. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = productCategories.find((cat) => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Quản lý sản phẩm</h2>
        <Button asChild>
          <Link href="/admin/san-pham/them-moi">
            <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold leading-none tracking-tight">
                Danh sách sản phẩm
              </h3>
              <p className="text-sm text-muted-foreground">
                Quản lý tất cả sản phẩm của bạn tại đây. Bạn có thể thêm, sửa,
                xóa sản phẩm.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="show-drafts"
                checked={showDrafts}
                onCheckedChange={setShowDrafts}
              />
              <label htmlFor="show-drafts" className="text-sm font-medium">
                Hiển thị bản nháp
              </label>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3">Đang tải...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">Không có sản phẩm nào</h3>
              <p className="text-sm text-gray-500 mt-1">
                {showDrafts
                  ? "Bạn chưa có sản phẩm nào. Hãy thêm sản phẩm mới."
                  : "Bạn chưa có sản phẩm đã xuất bản. Bật hiển thị bản nháp để xem tất cả sản phẩm."}
              </p>
              <Button className="mt-4" asChild>
                <Link href="/admin/san-pham/them-moi">
                  <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm mới
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
                      Tên sản phẩm
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                      Danh mục
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                      Trạng thái
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                      Ngày tạo
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-right">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                        <div className="h-12 w-12 overflow-hidden rounded-md">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                              No image
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-medium">
                        {product.name}
                        {product.is_draft && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                            Bản nháp
                          </span>
                        )}
                      </td>
                      <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                        {getCategoryName(product.category)}
                      </td>
                      <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              toggleFeatured(product.id, product.featured)
                            }
                            className={`mr-2 p-1 rounded-full ${product.featured ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-500"} hover:bg-opacity-80`}
                            title={
                              product.featured
                                ? "Gỡ khỏi trang chủ"
                                : "Hiển thị trên trang chủ"
                            }
                          >
                            {product.featured ? (
                              <Star className="h-4 w-4 fill-current" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </button>
                          <span className="text-sm">
                            {product.featured
                              ? "Hiển thị trên trang chủ"
                              : "Không hiển thị trên trang chủ"}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                        {new Date(product.created_at).toLocaleDateString(
                          "vi-VN",
                        )}
                      </td>
                      <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" asChild>
                            <Link
                              href={`/san-pham/${product.slug}`}
                              target="_blank"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="icon" asChild>
                            <Link
                              href={`/admin/san-pham/chinh-sua/${product.id}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              setProductToDelete(product.id);
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
            <AlertDialogTitle>Xác nhận xóa sản phẩm</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể
              hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
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
