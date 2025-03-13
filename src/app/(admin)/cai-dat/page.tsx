import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { Save } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Cài đặt website</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin chung</CardTitle>
            <CardDescription>
              Cài đặt thông tin cơ bản của website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="site-name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Tên website
                </label>
                <input
                  id="site-name"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="CNC Future"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="site-description"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mô tả website
                </label>
                <textarea
                  id="site-description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Chuyên cung cấp máy móc CNC hiện đại cho ngành gỗ và kim loại, nâng cao hiệu suất sản xuất."
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="site-logo"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Logo website
                </label>
                <input
                  id="site-logo"
                  type="file"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="site-favicon"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Favicon
                </label>
                <input
                  id="site-favicon"
                  type="file"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" /> Lưu thay đổi
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cài đặt SEO</CardTitle>
            <CardDescription>
              Tối ưu hóa website cho công cụ tìm kiếm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="meta-title"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Meta Title
                </label>
                <input
                  id="meta-title"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="CNC Future - Máy CNC Chất Lượng Cao"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="meta-description"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Meta Description
                </label>
                <textarea
                  id="meta-description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="CNC Future cung cấp máy CNC chất lượng cao cho ngành gỗ và kim loại. Tối ưu hóa quy trình sản xuất với các dòng máy CNC hiện đại, độ chính xác cao."
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="meta-keywords"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Meta Keywords
                </label>
                <input
                  id="meta-keywords"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="máy cnc, máy cnc gỗ, máy cnc kim loại, máy cnc laser, cnc việt nam"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="google-analytics"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Google Analytics ID
                </label>
                <input
                  id="google-analytics"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="UA-XXXXXXXXX-X"
                />
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" /> Lưu thay đổi
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin liên hệ</CardTitle>
            <CardDescription>
              Cài đặt thông tin liên hệ hiển thị trên website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="contact-address"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Địa chỉ
                </label>
                <input
                  id="contact-address"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="123 Đường Công Nghiệp, Quận 9, TP. Hồ Chí Minh"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-phone"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Số điện thoại
                </label>
                <input
                  id="contact-phone"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="035.519.7235"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="info@cncfuture.com"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-hours"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Giờ làm việc
                </label>
                <textarea
                  id="contact-hours"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Thứ Hai - Thứ Sáu: 8:00 - 17:30\nThứ Bảy: 8:00 - 12:00\nChủ Nhật: Nghỉ"
                />
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" /> Lưu thay đổi
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mạng xã hội</CardTitle>
            <CardDescription>
              Liên kết đến các trang mạng xã hội của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="social-facebook"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Facebook
                </label>
                <input
                  id="social-facebook"
                  type="url"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="https://facebook.com/cncfuture"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="social-youtube"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  YouTube
                </label>
                <input
                  id="social-youtube"
                  type="url"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="https://youtube.com/cncfuture"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="social-linkedin"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  LinkedIn
                </label>
                <input
                  id="social-linkedin"
                  type="url"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="https://linkedin.com/company/cncfuture"
                />
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" /> Lưu thay đổi
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
