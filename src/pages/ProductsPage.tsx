import { useState, useEffect } from 'react';
import { getCategories, getProducts, incrementProductMetric } from '../lib/firebase';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { translations } from '../lib/translations';
import { Plus, Minus, ShoppingCart, Filter, Star, Package, Zap, Shield } from 'lucide-react';

interface Category {
  id: string;
  name_ar: string;
  name_en: string;
}

interface Product {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  price: number;
  category_id: string;
  origin: string;
  image_url?: string;
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewed, setViewed] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { language } = useLanguage();
  const { addItem } = useCart();
  const t = translations[language];
  const isArabic = language === 'ar';

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const cats = await getCategories();
      setCategories(cats);
      const prods = await getProducts();
      setProducts(prods);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    // Increment views_count once per product per page session
    products.forEach((p) => {
      if (!viewed[p.id]) {
        try { incrementProductMetric(p.id, 'views_count'); } catch (_) {}
      }
    });
    if (products.length > 0) {
      const newViewed: Record<string, boolean> = { ...viewed };
      products.forEach((p) => { newViewed[p.id] = true; });
      setViewed(newViewed);
    }
  }, [products]);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category_id !== selectedCategory) return false;
    if (selectedOrigin && product.origin !== selectedOrigin) return false;
    return true;
  });

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    // Increment analytics counter (fire and forget)
    try {
      incrementProductMetric(product.id, 'add_to_cart_count');
    } catch (_) {}
    addItem({
      id: product.id,
      name_ar: product.name_ar,
      name_en: product.name_en,
      price: product.price,
      quantity,
      image_url: product.image_url,
    });
    setQuantities({ ...quantities, [product.id]: 1 });
  };

  const origins = [
    { key: 'american', ar: 'أمريكي', en: 'American', color: 'from-red-500 to-orange-500' },
    { key: 'japanese', ar: 'ياباني', en: 'Japanese', color: 'from-red-600 to-red-800' },
    { key: 'korean', ar: 'كوري', en: 'Korean', color: 'from-slate-600 to-slate-800' },
    { key: 'used', ar: 'مستعمل', en: 'Used', color: 'from-green-500 to-emerald-600' },
    { key: 'original', ar: 'أصلي', en: 'Original', color: 'from-blue-500 to-cyan-600' },
  ];

  const getOriginColor = (origin: string) => {
    const originData = origins.find(o => o.key === origin);
    return originData?.color || 'from-slate-500 to-slate-700';
  };

  const getOriginFlag = (origin: string) => {
    const flags: { [key: string]: string } = {
      american: '🇺🇸',
      japanese: '🇯🇵',
      korean: '🇰🇷',
      used: '♻️',
      original: '⭐'
    };
    return flags[origin] || '📦';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-slate-700 border-t-blue-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-blue-400 animate-pulse" fill="currentColor">
                <path d="M5 16l3-9h8l3 9H5zm3-1h8l-2.2-6H10.2L8 15zm2 3a2 2 0 104 0H10z" />
              </svg>
            </div>
          </div>
          <div className="text-slate-300 text-lg font-medium">
            {isArabic ? 'جاري تحميل قطع الغيار...' : 'Loading car parts...'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {t.products.title}
            </span>
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isArabic ? 'اكتشف تشكيلتنا الواسعة من قطع غيار السيارات بجودة عالمية وأسعار تنافسية' : 'Discover our wide range of car parts with global quality and competitive prices'}
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-4 rounded-2xl border border-blue-500/20 text-center">
            <Package className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-white font-semibold text-sm">{isArabic ? '5000+ منتج' : '5000+ Products'}</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm p-4 rounded-2xl border border-green-500/20 text-center">
            <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-white font-semibold text-sm">{isArabic ? 'جودة مضمونة' : 'Quality Guaranteed'}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm p-4 rounded-2xl border border-purple-500/20 text-center">
            <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-white font-semibold text-sm">{isArabic ? 'شحن سريع' : 'Fast Shipping'}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20 text-center">
            <Star className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-white font-semibold text-sm">{isArabic ? 'أسعار تنافسية' : 'Competitive Prices'}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold mb-6 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              <Filter className="w-5 h-5" />
              {isArabic ? 'الفلاتر' : 'Filters'}
            </button>

            <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm p-6 rounded-3xl border border-slate-700/50 sticky top-28`}>
              <h3 className="text-white font-bold mb-6 text-xl flex items-center gap-3">
                <Filter className="w-5 h-5 text-blue-400" />
                {t.categories.title}
              </h3>
              
              {/* Categories */}
              <div className="space-y-3 mb-8">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 font-semibold ${
                    selectedCategory === null
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white border border-slate-600/50'
                  }`}
                >
                  {isArabic ? 'جميع الفئات' : 'All Categories'}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 font-semibold ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white border border-slate-600/50'
                    }`}
                  >
                    {isArabic ? cat.name_ar : cat.name_en}
                  </button>
                ))}
              </div>

              {/* Origins */}
              <h3 className="text-white font-bold mb-6 text-xl flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400" />
                {isArabic ? 'نوع القطعة' : 'Part Type'}
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedOrigin(null)}
                  className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 font-semibold ${
                    selectedOrigin === null
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white border border-slate-600/50'
                  }`}
                >
                  {isArabic ? 'الجميع' : 'All Types'}
                </button>
                {origins.map((origin) => (
                  <button
                    key={origin.key}
                    onClick={() => setSelectedOrigin(origin.key)}
                    className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 font-semibold ${
                      selectedOrigin === origin.key
                        ? `bg-gradient-to-r ${origin.color} text-white shadow-lg`
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white border border-slate-600/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{isArabic ? origin.ar : origin.en}</span>
                      <span className="text-lg">{getOriginFlag(origin.key)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="text-slate-300">
                {isArabic ? 'عرض' : 'Showing'} <span className="text-white font-bold">{filteredProducts.length}</span> {isArabic ? 'منتج' : 'products'}
                {selectedOrigin && (
                  <span className="text-blue-400">
                    {isArabic ? ' من نوع ' : ' of type '}
                    {origins.find(o => o.key === selectedOrigin)?.[isArabic ? 'ar' : 'en']}
                  </span>
                )}
              </div>
              
              {(selectedCategory || selectedOrigin) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedOrigin(null);
                  }}
                  className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-xl transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50"
                >
                  {isArabic ? 'مسح الفلاتر' : 'Clear Filters'}
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-3xl border border-slate-700/50">
                <Package className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400 text-xl mb-4">{isArabic ? 'لا توجد منتجات' : 'No products found'}</p>
                <p className="text-slate-500 mb-6">{isArabic ? 'جرب تغيير الفلاتر للعثور على المزيد من المنتجات' : 'Try changing filters to find more products'}</p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedOrigin(null);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                >
                  {isArabic ? 'عرض جميع المنتجات' : 'Show All Products'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-3xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
                  >
                    {/* Product Image */}
                    {product.image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={product.image_url}
                          alt={isArabic ? product.name_ar : product.name_en}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${getOriginColor(product.origin)} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                        
                        {/* Origin Badge */}
                        <div className="absolute top-4 left-4">
                          <div className={`px-3 py-1 bg-gradient-to-r ${getOriginColor(product.origin)} text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2`}>
                            <span className="text-lg">{getOriginFlag(product.origin)}</span>
                            <span>{origins.find(o => o.key === product.origin)?.[isArabic ? 'ar' : 'en']}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Product Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-500 line-clamp-2">
                        {isArabic ? product.name_ar : product.name_en}
                      </h3>
                      
                      <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">
                        {isArabic ? product.description_ar : product.description_en}
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-2xl font-bold text-green-400">
                          {product.price} {isArabic ? 'درهم' : 'AED'}
                        </span>
                      </div>

                      {/* Quantity Controls & Add to Cart */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300 text-sm font-medium">{isArabic ? 'الكمية:' : 'Quantity:'}</span>
                          <div className="flex items-center gap-3 bg-slate-700/50 rounded-xl p-2 border border-slate-600/50">
                            <button
                              onClick={() =>
                                setQuantities({
                                  ...quantities,
                                  [product.id]: Math.max(1, (quantities[product.id] || 1) - 1),
                                })
                              }
                              className="p-2 hover:bg-slate-600/50 rounded-lg transition-all duration-300 hover:scale-110 text-slate-300 hover:text-white"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={quantities[product.id] || 1}
                              onChange={(e) =>
                                setQuantities({
                                  ...quantities,
                                  [product.id]: Math.max(1, parseInt(e.target.value) || 1),
                                })
                              }
                              className="w-12 bg-transparent text-white text-center font-bold focus:outline-none"
                            />
                            <button
                              onClick={() =>
                                setQuantities({
                                  ...quantities,
                                  [product.id]: (quantities[product.id] || 1) + 1,
                                })
                              }
                              className="p-2 hover:bg-slate-600/50 rounded-lg transition-all duration-300 hover:scale-110 text-slate-300 hover:text-white"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group relative overflow-hidden"
                        >
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          
                          <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                          <span>{t.form.addToCart}</span>
                        </button>
                      </div>
                    </div>

                    {/* Hover Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}