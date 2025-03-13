export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  long_description?: string; // Rich text content
  images: string[];
  featured: boolean;
  is_draft: boolean;
  price: number | null;
  discount_price?: number | null;
  category: string;
  subcategory?: string;
  specifications: Record<string, string>;
  highlights: string[];
  features: string[];
  warranty_info?: string;
  shipping_info?: string;
  videos?: string[];
  documents?: { title: string; url: string }[];
  related_products?: string[];
  variants?: ProductVariant[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  stock_status?: "in_stock" | "out_of_stock" | "pre_order";
  stock_quantity?: number;
  sku?: string;
  created_at: string;
  updated_at: string;
  views_count?: number;
  sales_count?: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku?: string;
  price?: number | null;
  stock_quantity?: number;
  attributes: Record<string, string>;
  image?: string;
}

export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  long_description?: string; // Rich text content
  images: string[];
  featured: boolean;
  draft: boolean;
  price: string;
  discount_price?: string;
  category: string;
  subcategory?: string;
  specifications: Record<string, string>;
  highlights: string[];
  features: string[];
  warranty_info?: string;
  shipping_info?: string;
  videos?: string[];
  documents?: { title: string; url: string }[];
  related_products?: string[];
  variants?: ProductVariant[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  stock_status?: "in_stock" | "out_of_stock" | "pre_order";
  stock_quantity?: string;
  sku?: string;
}

export const defaultProductFormData: ProductFormData = {
  name: "",
  slug: "",
  description: "",
  long_description: "",
  images: [],
  featured: false,
  draft: true,
  price: "",
  discount_price: "",
  category: "",
  subcategory: "",
  specifications: {},
  highlights: [],
  features: [],
  warranty_info: "",
  shipping_info: "",
  videos: [],
  documents: [],
  related_products: [],
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  stock_status: "in_stock",
  stock_quantity: "",
  sku: "",
};

export const productCategories = [
  { id: "may-go", name: "Máy Gỗ" },
  { id: "may-dan-canh", name: "Máy Dán Cạnh" },
  { id: "may-khoan-ngang", name: "Máy Khoan Ngang" },
  { id: "may-cua-ban-truot", name: "Máy Cưa Bàn Trượt" },
];

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
}
