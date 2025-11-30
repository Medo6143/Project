import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const SUPABASE_ENABLED = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = SUPABASE_ENABLED
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as any);

if (!SUPABASE_ENABLED) {
  console.warn('Supabase disabled: missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
}

export async function getCategories() {
  if (!SUPABASE_ENABLED) {
    return [];
  }
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data || [];
}

export async function getProductsByCategory(categoryId: string) {
  if (!SUPABASE_ENABLED) {
    return [];
  }
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data || [];
}

export async function getProducts(filters?: { origin?: string }) {
  if (!SUPABASE_ENABLED) {
    return [];
  }
  let query = supabase.from('products').select('*');

  if (filters?.origin) {
    query = query.eq('origin', filters.origin);
  }

  const { data, error } = await query.order('is_featured', { ascending: false }).order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data || [];
}

export async function createOrder(orderData: {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  items: any[];
  total_amount: number;
  notes?: string;
}) {
  if (!SUPABASE_ENABLED) {
    return null;
  }
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    return null;
  }
  return data;
}

export async function insertProduct(productData: any) {
  if (!SUPABASE_ENABLED) {
    return null;
  }
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) {
    console.error('Error inserting product:', error);
    return null;
  }
  return data;
}

export async function updateProduct(id: string, productData: any) {
  if (!SUPABASE_ENABLED) {
    return null;
  }
  const { data, error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }
  return data;
}

export async function deleteProduct(id: string) {
  if (!SUPABASE_ENABLED) {
    return false;
  }
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }
  return true;
}
