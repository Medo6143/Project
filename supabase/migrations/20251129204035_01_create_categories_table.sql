/*
  # Create categories table for MAJD PARTS
  
  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name_ar` (text) - Category name in Arabic
      - `name_en` (text) - Category name in English
      - `description_ar` (text) - Arabic description
      - `description_en` (text) - English description
      - `icon` (text) - Icon name for UI
      - `order` (integer) - Display order
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `categories` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar text NOT NULL,
  name_en text NOT NULL,
  description_ar text NOT NULL,
  description_en text NOT NULL,
  icon text NOT NULL,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access on categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);
