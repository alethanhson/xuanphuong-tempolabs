"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../../supabase/client-browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Đăng nhập thành công",
        description: "Bạn đã đăng nhập thành công vào hệ thống.",
      });

      router.push("/admin");
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Đăng nhập thất bại",
        description: error.message || "Đã xảy ra lỗi khi đăng nhập.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Đăng nhập vào hệ thống quản trị
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Vui lòng đăng nhập để tiếp tục
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu của bạn"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </div>
    </div>
  );
}
