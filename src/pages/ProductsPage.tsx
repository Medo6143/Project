import { useState, useEffect } from 'react';
import { getCategories, getProducts } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { translations } from '../lib/translations';
import { Plus, Minus } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const { language } = useLanguage();
  const { addItem } = useCart();
  const t = translations[language];
  const isArabic = language === 'ar';

  useEffect(() => {
    const loadData = async () => {
      const cats = await getCategories();
      setCategories(cats);
      const prods = await getProducts();
      setProducts(prods);
    };
    loadData();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category_id !== selectedCategory) return false;
    if (selectedOrigin && product.origin !== selectedOrigin) return false;
    return true;
  });

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
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
    { key: 'american', ar: 'أمريكي', en: 'American' },
    { key: 'japanese', ar: 'ياباني', en: 'Japanese' },
    { key: 'korean', ar: 'كوري', en: 'Korean' },
    { key: 'used', ar: 'مستعمل', en: 'Used' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.products.title}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 sticky top-28">
              <h3 className="text-white font-bold mb-4 text-lg">{t.categories.title}</h3>
              <div className="space-y-2 mb-6">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-${isArabic ? 'right' : 'left'} px-4 py-2 rounded-lg transition ${
                    selectedCategory === null
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {isArabic ? 'جميع الفئات' : 'All Categories'}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-${isArabic ? 'right' : 'left'} px-4 py-2 rounded-lg transition ${
                      selectedCategory === cat.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {isArabic ? cat.name_ar : cat.name_en}
                  </button>
                ))}
              </div>

              <h3 className="text-white font-bold mb-4 text-lg">{isArabic ? 'الأصل' : 'Origin'}</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedOrigin(null)}
                  className={`w-full text-${isArabic ? 'right' : 'left'} px-4 py-2 rounded-lg transition ${
                    selectedOrigin === null
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {isArabic ? 'الجميع' : 'All'}
                </button>
                {origins.map((origin) => (
                  <button
                    key={origin.key}
                    onClick={() => setSelectedOrigin(origin.key)}
                    className={`w-full text-${isArabic ? 'right' : 'left'} px-4 py-2 rounded-lg transition ${
                      selectedOrigin === origin.key
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {isArabic ? origin.ar : origin.en}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">{isArabic ? 'لا توجد منتجات' : 'No products found'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        alt={isArabic ? product.name_ar : product.name_en}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {isArabic ? product.name_ar : product.name_en}
                      </h3>
                      <p className="text-slate-400 mb-4 text-sm">
                        {isArabic ? product.description_ar : product.description_en}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-green-500">
                          {product.price} AED
                        </span>
                        <span className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full">
                          {product.origin}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <button
                          onClick={() =>
                            setQuantities({
                              ...quantities,
                              [product.id]: Math.max(1, (quantities[product.id] || 1) - 1),
                            })
                          }
                          className="p-2 bg-slate-700 hover:bg-slate-600 rounded transition"
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
                          className="w-16 bg-slate-700 text-white text-center rounded px-2 py-1"
                        />
                        <button
                          onClick={() =>
                            setQuantities({
                              ...quantities,
                              [product.id]: (quantities[product.id] || 1) + 1,
                            })
                          }
                          className="p-2 bg-slate-700 hover:bg-slate-600 rounded transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
                      >
                        {t.form.addToCart}
                      </button>
                    </div>
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
