-- Create product_categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories if they don't exist
INSERT INTO product_categories (name, slug, description, display_order)
VALUES 
  ('Máy Gỗ', 'may-go', 'Máy gỗ chất lượng cao, giúp tối ưu hóa quy trình sản xuất nội thất với độ chính xác và hiệu suất vượt trội.', 1),
  ('Máy Dán Cạnh', 'may-dan-canh', 'Máy dán cạnh tự động, giúp tăng năng suất và chất lượng trong sản xuất nội thất gỗ công nghiệp.', 2),
  ('Máy Khoan Ngang', 'may-khoan-ngang', 'Máy khoan ngang chuyên dụng cho ngành nội thất, giúp tạo các lỗ khoan chính xác và nhanh chóng.', 3),
  ('Máy Cưa Bàn Trượt', 'may-cua-ban-truot', 'Máy cưa bàn trượt chất lượng cao, giúp cắt gỗ chính xác và an toàn cho sản xuất nội thất.', 4)
ON CONFLICT (slug) DO NOTHING;

-- Enable realtime for product_categories table
alter publication supabase_realtime add table product_categories;
