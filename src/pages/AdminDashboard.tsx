import { useState, useEffect } from 'react';
import { getCategories, insertProduct, updateProduct, deleteProduct, supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../lib/translations';
import { Trash2, Edit2, Plus } from 'lucide-react';

interface Category {
  id: string;
  name_ar: string;
  name_en: string;
}

interface Product {
  id: string;
  name_ar: string;
  name_en: string;
  price: number;
  category_id: string;
  stock: number;
}

export default function AdminDashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === 'ar';

  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    description_ar: '',
    description_en: '',
    category_id: '',
    price: '',
    origin: 'original',
    stock: '',
    image_url: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const cats = await getCategories();
    setCategories(cats);
    // Load products from database
    const { data } = await supabase.from('products').select('*');
    setProducts(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    if (editingId) {
      await updateProduct(editingId, productData);
    } else {
      await insertProduct(productData);
    }

    setFormData({
      name_ar: '',
      name_en: '',
      description_ar: '',
      description_en: '',
      category_id: '',
      price: '',
      origin: 'original',
      stock: '',
      image_url: '',
    });
    setShowForm(false);
    setEditingId(null);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(isArabic ? 'هل أنت متأكد؟' : 'Are you sure?')) {
      await deleteProduct(id);
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">{t.admin.title}</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
          >
            <Plus className="w-5 h-5" />
            {t.admin.addProduct}
          </button>
        </div>

        {showForm && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={isArabic ? 'اسم المنتج (عربي)' : 'Product Name (Arabic)'}
                  value={formData.name_ar}
                  onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder={isArabic ? 'اسم المنتج (إنجليزي)' : 'Product Name (English)'}
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <textarea
                placeholder={isArabic ? 'الوصف (عربي)' : 'Description (Arabic)'}
                value={formData.description_ar}
                onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />

              <textarea
                placeholder={isArabic ? 'الوصف (إنجليزي)' : 'Description (English)'}
                value={formData.description_en}
                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">{isArabic ? 'اختر الفئة' : 'Select Category'}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {isArabic ? cat.name_ar : cat.name_en}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder={isArabic ? 'السعر' : 'Price'}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  required
                />

                <select
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="original">Original</option>
                  <option value="american">American</option>
                  <option value="japanese">Japanese</option>
                  <option value="korean">Korean</option>
                  <option value="used">Used</option>
                </select>

                <input
                  type="number"
                  placeholder={isArabic ? 'المخزون' : 'Stock'}
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <input
                type="url"
                placeholder={isArabic ? 'رابط الصورة' : 'Image URL'}
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
                >
                  {editingId ? t.admin.editProduct : t.admin.addProduct}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900 border-b border-slate-700">
                <tr>
                  <th className={`px-6 py-4 text-${isArabic ? 'right' : 'left'} text-white font-semibold`}>
                    {isArabic ? 'الاسم' : 'Name'}
                  </th>
                  <th className={`px-6 py-4 text-${isArabic ? 'right' : 'left'} text-white font-semibold`}>
                    {isArabic ? 'السعر' : 'Price'}
                  </th>
                  <th className={`px-6 py-4 text-${isArabic ? 'right' : 'left'} text-white font-semibold`}>
                    {isArabic ? 'المخزون' : 'Stock'}
                  </th>
                  <th className={`px-6 py-4 text-${isArabic ? 'right' : 'left'} text-white font-semibold`}>
                    {isArabic ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-700 hover:bg-slate-800/50 transition">
                    <td className="px-6 py-4 text-white">{isArabic ? product.name_ar : product.name_en}</td>
                    <td className="px-6 py-4 text-green-500 font-semibold">{product.price} AED</td>
                    <td className="px-6 py-4 text-white">{product.stock}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(product.id);
                          setShowForm(true);
                        }}
                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
