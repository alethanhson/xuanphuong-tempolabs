-- Create page_views table to track website visits
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  screen_size TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id TEXT
);

-- Create product_views table to track product page visits
CREATE TABLE IF NOT EXISTS product_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  product_name TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id TEXT
);

-- Add views_count column to products table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'products' AND column_name = 'views_count') THEN
    ALTER TABLE products ADD COLUMN views_count INTEGER DEFAULT 0;
  END IF;
END $$;

-- Create function to increment product views
CREATE OR REPLACE FUNCTION increment_product_views(product_id_param TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE products
  SET views_count = COALESCE(views_count, 0) + 1
  WHERE id = product_id_param;
END;
$$ LANGUAGE plpgsql;

-- Enable realtime for tracking tables
alter publication supabase_realtime add table page_views;
alter publication supabase_realtime add table product_views;
