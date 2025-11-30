import { useState, useEffect } from 'react';
import { insertProduct, updateProduct, deleteProduct, getProducts, onAuth, signIn, signOut } from '../lib/firebase';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../lib/translations';
import { Trash2, Edit2, Plus, BarChart3, PieChart, TrendingUp, Users, ShoppingCart, Eye } from 'lucide-react';

interface Product {
  id: string;
  name_ar: string;
  name_en: string;
  price: number;
  stock: number;
  views_count?: number;
  add_to_cart_count?: number;
  origin: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeChart, setActiveChart] = useState<'views' | 'cart' | 'origin'>('views');
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
    const unsub = onAuth((u) => {
      setUser(u);
      if (u) {
        loadData();
      } else {
        setProducts([]);
      }
    });
    return () => unsub();
  }, []);

  const loadData = async () => {
    const prods = await getProducts();
    setProducts(prods as any);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await signIn(email, password);
    } catch (err: any) {
      setAuthError(err?.message || 'Login failed');
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(isArabic ? 'هل أنت متأكد؟' : 'Are you sure?')) {
      await deleteProduct(id);
      loadData();
    }
  };

  // Chart Data Calculations
  const totalViews = products.reduce((sum, p) => sum + (p.views_count || 0), 0);
  const totalCart = products.reduce((sum, p) => sum + (p.add_to_cart_count || 0), 0);
  const totalProducts = products.length;

  // Origin Distribution
  const originStats = products.reduce((acc, product) => {
    const origin = product.origin || 'other';
    acc[origin] = (acc[origin] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const originColors = {
    original: '#3B82F6',
    american: '#EF4444',
    japanese: '#F59E0B',
    korean: '#8B5CF6',
    used: '#10B981',
    other: '#6B7280'
  };

  const originLabels = {
    original: isArabic ? 'أصلي' : 'Original',
    american: isArabic ? 'أمريكي' : 'American',
    japanese: isArabic ? 'ياباني' : 'Japanese',
    korean: isArabic ? 'كوري' : 'Korean',
    used: isArabic ? 'مستعمل' : 'Used',
    other: isArabic ? 'أخرى' : 'Other'
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-md">
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {isArabic ? 'لوحة التحكم' : 'Admin Dashboard'}
              </h1>
              <p className="text-slate-400 mt-2">{isArabic ? 'سجل الدخول للإدارة' : 'Sign in to manage your store'}</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder={isArabic ? 'البريد الإلكتروني' : 'Email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                  required
                />
                <input
                  type="password"
                  placeholder={isArabic ? 'كلمة المرور' : 'Password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                  required
                />
              </div>
              
              {authError && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  {authError}
                </div>
              )}
              
              <button 
                type="submit" 
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                {isArabic ? 'تسجيل الدخول' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {t.admin.title}
            </h1>
            <p className="text-slate-400">{isArabic ? 'إدارة المتجر وتحليل الأداء' : 'Store management and performance analytics'}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-xl font-semibold transition-all duration-300 border border-slate-600 hover:border-slate-500 backdrop-blur-sm"
            >
              {isArabic ? 'تسجيل الخروج' : 'Sign Out'}
            </button>
            <button
              onClick={() => {
                setEditingId(null);
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
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/25"
            >
              <Plus className="w-5 h-5" />
              {t.admin.addProduct}
            </button>
          </div>
        </div>

        {/* Add/Edit Product Form */}
        {showForm && (
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 shadow-2xl mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? t.admin.editProduct : t.admin.addProduct}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder={isArabic ? 'اسم المنتج (عربي)' : 'Product Name (Arabic)'}
                  value={formData.name_ar}
                  onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                  className="px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                  required
                />
                <input
                  type="text"
                  placeholder={isArabic ? 'اسم المنتج (إنجليزي)' : 'Product Name (English)'}
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  className="px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <textarea
                  placeholder={isArabic ? 'الوصف (عربي)' : 'Description (Arabic)'}
                  value={formData.description_ar}
                  onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                  className="px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm resize-none h-24"
                  required
                />
                <textarea
                  placeholder={isArabic ? 'الوصف (إنجليزي)' : 'Description (English)'}
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  className="px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm resize-none h-24"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="number"
                  placeholder={isArabic ? 'السعر' : 'Price'}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                  required
                />

                <select
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <option value="original">{isArabic ? 'أصلي' : 'Original'}</option>
                  <option value="american">{isArabic ? 'أمريكي' : 'American'}</option>
                  <option value="japanese">{isArabic ? 'ياباني' : 'Japanese'}</option>
                  <option value="korean">{isArabic ? 'كوري' : 'Korean'}</option>
                  <option value="used">{isArabic ? 'مستعمل' : 'Used'}</option>
                </select>

                <input
                  type="number"
                  placeholder={isArabic ? 'المخزون' : 'Stock'}
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                  required
                />
              </div>

              <input
                type="url"
                placeholder={isArabic ? 'رابط الصورة' : 'Image URL'}
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {editingId ? t.admin.editProduct : t.admin.addProduct}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="flex-1 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-xl font-bold transition-all duration-300 border border-slate-600 hover:border-slate-500"
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-6 rounded-3xl border border-blue-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-2xl">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">{isArabic ? 'إجمالي الزيارات' : 'Total Views'}</div>
                <div className="text-2xl font-bold text-white">{totalViews.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm p-6 rounded-3xl border border-green-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-2xl">
                <ShoppingCart className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">{isArabic ? 'إجمالي السلة' : 'Total Cart'}</div>
                <div className="text-2xl font-bold text-white">{totalCart.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm p-6 rounded-3xl border border-purple-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-2xl">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">{isArabic ? 'المنتجات' : 'Products'}</div>
                <div className="text-2xl font-bold text-white">{totalProducts}</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm p-6 rounded-3xl border border-orange-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">{isArabic ? 'معدل التحويل' : 'Conversion Rate'}</div>
                <div className="text-2xl font-bold text-white">
                  {totalViews > 0 ? ((totalCart / totalViews) * 100).toFixed(1) : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chart Container */}
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm p-6 rounded-3xl border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {activeChart === 'views' && (isArabic ? 'الزيارات لكل منتج' : 'Views per Product')}
                {activeChart === 'cart' && (isArabic ? 'الإضافات إلى السلة' : 'Add-to-Cart')}
                {activeChart === 'origin' && (isArabic ? 'توزيع المنتجات' : 'Products by Origin')}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveChart('views')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    activeChart === 'views' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-700/50 text-slate-400 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveChart('cart')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    activeChart === 'cart' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-slate-700/50 text-slate-400 hover:text-white'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveChart('origin')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    activeChart === 'origin' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-slate-700/50 text-slate-400 hover:text-white'
                  }`}
                >
                  <PieChart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Charts Content */}
            <div className="space-y-4">
              {activeChart === 'views' && (
                products.map((p) => {
                  const val = p.views_count || 0;
                  const max = Math.max(1, ...products.map(x => x.views_count || 0));
                  const width = Math.round((val / max) * 100);
                  return (
                    <div key={p.id} className="group">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300 truncate max-w-[60%] group-hover:text-white transition-colors">
                          {isArabic ? p.name_ar : p.name_en}
                        </span>
                        <span className="text-blue-400 font-semibold">{val.toLocaleString()}</span>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}

              {activeChart === 'cart' && (
                products.map((p) => {
                  const val = p.add_to_cart_count || 0;
                  const max = Math.max(1, ...products.map(x => x.add_to_cart_count || 0));
                  const width = Math.round((val / max) * 100);
                  return (
                    <div key={p.id} className="group">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300 truncate max-w-[60%] group-hover:text-white transition-colors">
                          {isArabic ? p.name_ar : p.name_en}
                        </span>
                        <span className="text-green-400 font-semibold">{val.toLocaleString()}</span>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}

              {activeChart === 'origin' && (
                <div className="space-y-4">
                  {Object.entries(originStats).map(([origin, count]) => (
                    <div key={origin} className="group">
                      <div className="flex justify-between text-sm mb-2">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: originColors[origin as keyof typeof originColors] }}
                          />
                          <span className="text-slate-300 group-hover:text-white transition-colors">
                            {originLabels[origin as keyof typeof originLabels]}
                          </span>
                        </div>
                        <span className="text-purple-400 font-semibold">
                          {count} ({((count / totalProducts) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-3 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${(count / totalProducts) * 100}%`,
                            backgroundColor: originColors[origin as keyof typeof originColors]
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-3xl border border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-700/50">
              <h3 className="text-xl font-bold text-white">{isArabic ? 'المنتجات' : 'Products'}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50 border-b border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-right text-slate-400 font-semibold text-sm">
                      {isArabic ? 'المنتج' : 'Product'}
                    </th>
                    <th className="px-6 py-4 text-right text-slate-400 font-semibold text-sm">
                      {isArabic ? 'السعر' : 'Price'}
                    </th>
                    <th className="px-6 py-4 text-right text-slate-400 font-semibold text-sm">
                      {isArabic ? 'المخزون' : 'Stock'}
                    </th>
                    <th className="px-6 py-4 text-center text-slate-400 font-semibold text-sm">
                      {isArabic ? 'الإجراءات' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-right">
                          <div className="text-white font-medium">
                            {isArabic ? product.name_ar : product.name_en}
                          </div>
                          <div className="text-slate-400 text-sm">
                            {originLabels[product.origin as keyof typeof originLabels]}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-green-400 font-semibold text-right">{product.price} AED</td>
                      <td className="px-6 py-4 text-slate-300 text-right">{product.stock}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setEditingId(product.id);
                              setFormData({
                                name_ar: product.name_ar || '',
                                name_en: product.name_en || '',
                                description_ar: (product as any).description_ar || '',
                                description_en: (product as any).description_en || '',
                                category_id: '',
                                price: String(product.price ?? ''),
                                origin: (product as any).origin || 'original',
                                stock: String(product.stock ?? ''),
                                image_url: (product as any).image_url || '',
                              });
                              setShowForm(true);
                            }}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-xl transition-all duration-300 hover:scale-110 border border-blue-500/30"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all duration-300 hover:scale-110 border border-red-500/30"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}