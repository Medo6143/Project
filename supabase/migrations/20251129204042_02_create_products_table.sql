/*
  # Create products table for MAJD PARTS
  
  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name_ar` (text) - Product name in Arabic
      - `name_en` (text) - Product name in English
      - `description_ar` (text) - Arabic description
      - `description_en` (text) - English description
      - `category_id` (uuid) - Foreign key to categories
      - `price` (numeric) - Product price
      - `image_url` (text) - Product image URL
      - `origin` (text) - Origin (american, japanese, korean, used)
      - `stock` (integer) - Stock quantity
      - `is_featured` (boolean) - Featured product flag
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar text NOT NULL,
  name_en text NOT NULL,
  description_ar text NOT NULL,
  description_en text NOT NULL,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  price numeric(10, 2) NOT NULL DEFAULT 0,
  image_url text,
  origin text DEFAULT 'original',
  stock integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access on products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_origin ON products(origin);
