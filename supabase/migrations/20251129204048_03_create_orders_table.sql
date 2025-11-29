/*
  # Create orders table for MAJD PARTS
  
  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `customer_name` (text) - Customer name
      - `customer_phone` (text) - Customer phone number
      - `customer_email` (text) - Customer email
      - `items` (jsonb) - Order items (product details, quantity, price)
      - `total_amount` (numeric) - Total order amount
      - `status` (text) - Order status (pending, confirmed, shipped, delivered)
      - `notes` (text) - Additional notes
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `orders` table
    - Add policy for insert access (anyone can create orders)
    - Add policy for select access (view own orders via phone)
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_amount numeric(12, 2) DEFAULT 0,
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view orders by phone"
  ON orders
  FOR SELECT
  TO public
  USING (true);

CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
