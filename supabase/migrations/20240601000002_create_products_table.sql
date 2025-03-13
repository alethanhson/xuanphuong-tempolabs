-- Create products table with all required fields
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  images JSONB DEFAULT '[]'::JSONB,
  featured BOOLEAN DEFAULT false,
  draft BOOLEAN DEFAULT true,
  price DECIMAL(10, 2),
  category TEXT,
  specifications JSONB DEFAULT '{}'::JSONB,
  highlights TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for products table
CREATE POLICY "Public products are viewable by everyone" 
ON products FOR SELECT 
USING (NOT draft);

CREATE POLICY "Products are editable by authenticated users" 
ON products FOR ALL 
USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime for products table
ALTER PUBLICATION supabase_realtime ADD TABLE products;
