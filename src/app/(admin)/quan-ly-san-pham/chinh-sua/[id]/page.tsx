"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "../../../../../../supabase/client";
import { ArrowLeft, Plus, Trash2, Upload, X } from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import {
  ProductFormData,
  defaultProductFormData,
  generateSlug,
  productCategories,
} from "@/types/product";

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [formData, setFormData] = useState<ProductFormData>(
    defaultProductFormData,
  );
  const [activeTab, setActiveTab] = useState("basic-info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [newHighlight, setNewHighlight] = useState("");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Product not found");

        setFormData({
          name: data.name,
          slug: data.slug,
          description: data.description || "",
          images: data.images || [],
          featured: data.featured || false,
          draft: data.is_draft || false,
          price: data.price ? data.price.toString() : "",
          category: data.category || "",
          specifications: data.specifications || {},
          highlights: data.highlights || [],
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Lỗi",
          description:
            "Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, supabase]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    const newImages = [...formData.images];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from("product-images")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        newImages.push(urlData.publicUrl);
      }

      setFormData((prev) => ({
        ...prev,
        images: newImages,
      }));

      toast({
        title: "Tải ảnh thành công",
        description: "Ảnh đã được tải lên thành công",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Lỗi khi tải ảnh",
        description: "Đã xảy ra lỗi khi tải ảnh lên. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addSpecification = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return;

    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [newSpecKey]: newSpecValue,
      },
    }));

    setNewSpecKey("");
    setNewSpecValue("");
  };

  const removeSpecification = (key: string) => {
    setFormData((prev) => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return {
        ...prev,
        specifications: newSpecs,
      };
    });
  };

  const addHighlight = () => {
    if (!newHighlight.trim()) return;

    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, newHighlight],
    }));

    setNewHighlight("");
  };

  const removeHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert price to number or null
      const priceValue = formData.price ? parseFloat(formData.price) : null;

      const { error } = await supabase
        .from("products")
        .update({
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          images: formData.images,
          featured: formData.featured,
          is_draft: formData.draft,
          price: priceValue,
          category: formData.category,
          specifications: formData.specifications,
          highlights: formData.highlights,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id);

      if (error) throw error;

      toast({
        title: "Cập nhật sản phẩm thành công",
        description: "Sản phẩm đã được cập nhật trong cơ sở dữ liệu",
      });

      router.push("/admin/quan-ly-san-pham");
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Lỗi khi cập nhật sản phẩm",
        description: "Đã xảy ra lỗi khi cập nhật sản phẩm. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/quan-ly-san-pham">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">
            Chỉnh sửa sản phẩm
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic-info">Thông tin cơ bản</TabsTrigger>
            <TabsTrigger value="images">Hình ảnh</TabsTrigger>
            <TabsTrigger value="specifications">Thông số kỹ thuật</TabsTrigger>
            <TabsTrigger value="highlights">Đặc điểm nổi bật</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic-info">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
                <CardDescription>
                  Chỉnh sửa thông tin cơ bản của sản phẩm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên sản phẩm</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Giá (để trống nếu muốn hiển thị "Liên hệ")
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Nhập giá sản phẩm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Chọn danh mục</option>
                      {productCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="draft"
                      checked={formData.draft}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("draft", checked)
                      }
                    />
                    <Label htmlFor="draft">Bản nháp</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("featured", checked)
                      }
                    />
                    <Label htmlFor="featured">Hiển thị trên trang chủ</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.push("/admin/quan-ly-san-pham")}
                >
                  Hủy
                </Button>
                <Button type="button" onClick={() => setActiveTab("images")}>
                  Tiếp theo
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Hình ảnh sản phẩm</CardTitle>
                <CardDescription>
                  Tải lên hình ảnh cho sản phẩm (tối đa 10 hình)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Nhấp để tải lên</span>{" "}
                        hoặc kéo và thả
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG hoặc WEBP (tối đa 5MB)
                      </p>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploadingImages || formData.images.length >= 10}
                    />
                  </label>
                </div>

                {uploadingImages && (
                  <div className="text-center">
                    <p>Đang tải ảnh lên...</p>
                  </div>
                )}

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setActiveTab("basic-info")}
                >
                  Quay lại
                </Button>
                <Button
                  type="button"
                  onClick={() => setActiveTab("specifications")}
                >
                  Tiếp theo
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Specifications Tab */}
          <TabsContent value="specifications">
            <Card>
              <CardHeader>
                <CardTitle>Thông số kỹ thuật</CardTitle>
                <CardDescription>
                  Chỉnh sửa thông số kỹ thuật cho sản phẩm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="spec-key">Tên thông số</Label>
                    <Input
                      id="spec-key"
                      value={newSpecKey}
                      onChange={(e) => setNewSpecKey(e.target.value)}
                      placeholder="Ví dụ: Kích thước"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spec-value">Giá trị</Label>
                    <Input
                      id="spec-value"
                      value={newSpecValue}
                      onChange={(e) => setNewSpecValue(e.target.value)}
                      placeholder="Ví dụ: 1300x2500 mm"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      onClick={addSpecification}
                      className="w-full"
                      disabled={!newSpecKey.trim() || !newSpecValue.trim()}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Thêm
                    </Button>
                  </div>
                </div>

                {Object.keys(formData.specifications).length > 0 ? (
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-2 border-b">Thông số</th>
                          <th className="text-left p-2 border-b">Giá trị</th>
                          <th className="text-right p-2 border-b w-20">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(formData.specifications).map(
                          ([key, value], index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }
                            >
                              <td className="p-2 border-b">{key}</td>
                              <td className="p-2 border-b">{value}</td>
                              <td className="p-2 border-b text-right">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeSpecification(key)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Chưa có thông số kỹ thuật nào
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setActiveTab("images")}
                >
                  Quay lại
                </Button>
                <Button
                  type="button"
                  onClick={() => setActiveTab("highlights")}
                >
                  Tiếp theo
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Highlights Tab */}
          <TabsContent value="highlights">
            <Card>
              <CardHeader>
                <CardTitle>Đặc điểm nổi bật</CardTitle>
                <CardDescription>
                  Chỉnh sửa các đặc điểm nổi bật của sản phẩm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="highlight">Đặc điểm</Label>
                    <Input
                      id="highlight"
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      placeholder="Ví dụ: Máy thiết kế tải nặng"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      onClick={addHighlight}
                      className="w-full"
                      disabled={!newHighlight.trim()}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Thêm
                    </Button>
                  </div>
                </div>

                {formData.highlights.length > 0 ? (
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-2 border-b">
                            Đặc điểm nổi bật
                          </th>
                          <th className="text-right p-2 border-b w-20">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.highlights.map((highlight, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="p-2 border-b">{highlight}</td>
                            <td className="p-2 border-b text-right">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeHighlight(index)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Chưa có đặc điểm nổi bật nào
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setActiveTab("specifications")}
                >
                  Quay lại
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
