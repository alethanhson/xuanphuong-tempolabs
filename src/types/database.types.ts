export type Product = {
  id: string;
  name: string;
  description: string;
  features: string[];
  specifications: Record<string, any>;
  image_url: string;
  category: string;
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  created_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_id: string;
  image_url: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  read_time: number;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  product_interest: string;
  created_at: string;
  status: string;
};
