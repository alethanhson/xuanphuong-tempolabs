"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "../../supabase/client";
import { toast } from "@/components/ui/use-toast";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    productInterest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const handleChange = (
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save contact form submission to Supabase
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || null,
          subject: formData.subject,
          message: formData.message,
          product_interest: formData.productInterest || null,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Gửi thành công!",
        description:
          "Chúng tôi đã nhận được thông tin của bạn và sẽ liên hệ lại trong thời gian sớm nhất.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        productInterest: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Có lỗi xảy ra",
        description:
          "Không thể gửi thông tin. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua số điện thoại.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700"
          >
            Công ty
          </label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="productInterest"
          className="block text-sm font-medium text-gray-700"
        >
          Sản phẩm quan tâm
        </label>
        <select
          id="productInterest"
          name="productInterest"
          value={formData.productInterest}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Chọn sản phẩm --</option>
          <option value="may-go">Máy gỗ</option>
          <option value="may-dan-canh">Máy dán cạnh</option>
          <option value="may-khoan-ngang">Máy khoan ngang</option>
          <option value="may-cua-ban-truot">Máy cưa bàn trượt</option>
          <option value="khac">Khác</option>
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700"
        >
          Tiêu đề <span className="text-red-500">*</span>
        </label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Nội dung <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full"
        />
      </div>

      <Button
        type="submit"
        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
      </Button>
    </form>
  );
}
