import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../lib/translations';
import { Trash2, Minus, Plus, ShoppingCart, Send, User, MessageCircle, Shield, Clock, Package, MapPin } from 'lucide-react';

import { createOrder } from '../lib/supabase';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address || items.length === 0) {
      alert(isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    // Build WhatsApp message and open immediately to avoid popup blockers
    const whatsappMessage = `
        *طلب جديد من MAJD PARTS* 🚗
─────────────────
👤 *اسم العميل:* ${formData.name}
📍 *العنوان:* ${formData.address}

🛒 *المنتجات:*
${items
  .map(
    (item) =>
      `• ${isArabic ? item.name_ar : item.name_en} 
   الكمية: ${item.quantity} × ${item.price} درهم = ${item.price * item.quantity} درهم`
  )
  .join('\n')}

💰 *الإجمالي: ${total} درهم*

${formData.notes ? `📝 *ملاحظات:* ${formData.notes}` : ''}

─────────────────
تم الإرسال عبر الموقع الإلكتروني
#طلب_جديد
    `.trim();
    const whatsappUrl = `https://wa.me/971556375521?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Try to create order in background; even if it fails, user already has WhatsApp open
    try {
      const orderData = {
        customer_name: formData.name,
        customer_address: formData.address,
        customer_phone: '',
        customer_email: '',
        items: items.map((item) => ({
          id: item.id,
          name: isArabic ? item.name_ar : item.name_en,
          price: item.price,
          quantity: item.quantity,
        })),
        total_amount: total,
        notes: formData.notes,
      };
      await createOrder(orderData);
    } catch (error) {
      console.error('Error creating order:', error);
      // Do not block the UX; WhatsApp already opened
    } finally {
      clearCart();
      setFormData({ name: '', address: '', notes: '' });
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm p-12 rounded-3xl border border-slate-700/50 shadow-2xl">
            <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6">
              <ShoppingCart className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{t.cart.empty}</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              {isArabic ? 'سلة التسوق الخاصة بك فارغة. ابدأ بالتسوق لاكتشاف منتجاتنا المميزة.' : 'Your cart is empty. Start shopping to discover our premium products.'}
            </p>
            <a
              href="#products"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              <Package className="w-5 h-5" />
              {t.cart.continue}
            </a>
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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {t.cart.title}
            </span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-300">
            {isArabic ? 'راجع طلبك وأكمل عملية الشراء' : 'Review your order and complete the purchase'}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-blue-400" />
                {isArabic ? 'منتجاتك' : 'Your Products'}
                <span className="text-slate-400 text-lg">({items.length})</span>
              </h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-gradient-to-br from-slate-700/30 to-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-600/50 hover:border-slate-500/50 transition-all duration-500 hover:scale-[1.02]"
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={isArabic ? item.name_ar : item.name_en}
                          className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                        />
                      )}

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-500">
                          {isArabic ? item.name_ar : item.name_en}
                        </h3>
                        <p className="text-green-400 font-semibold text-lg mb-3">{item.price} {isArabic ? 'درهم' : 'AED'}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3 bg-slate-700/50 rounded-xl p-2 border border-slate-600/50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-slate-600/50 rounded-lg transition-all duration-300 hover:scale-110 text-slate-300 hover:text-white"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-white font-bold text-lg">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-slate-600/50 rounded-lg transition-all duration-300 hover:scale-110 text-slate-300 hover:text-white"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="text-right flex-1">
                            <p className="text-white font-bold text-lg">{item.price * item.quantity} {isArabic ? 'درهم' : 'AED'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 hover:scale-110 border border-red-500/30 hover:border-red-500/50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-4 rounded-2xl border border-blue-500/20 text-center">
                <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-white font-semibold text-sm">{isArabic ? 'جودة مضمونة' : 'Quality Guaranteed'}</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm p-4 rounded-2xl border border-green-500/20 text-center">
                <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-white font-semibold text-sm">{isArabic ? 'شحن سريع' : 'Fast Shipping'}</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm p-4 rounded-2xl border border-purple-500/20 text-center">
                <Send className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-white font-semibold text-sm">{isArabic ? 'دعم فوري' : 'Instant Support'}</div>
              </div>
            </div>
          </div>

          {/* Order Summary & Form */}
          <div className="xl:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Order Summary */}
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm p-6 rounded-3xl border border-slate-700/50 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Package className="w-5 h-5 text-blue-400" />
                  {isArabic ? 'ملخص الطلب' : 'Order Summary'}
                </h3>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span className="text-slate-300 truncate flex-1 pr-4">
                        {isArabic ? item.name_ar : item.name_en}
                      </span>
                      <span className="text-slate-400 whitespace-nowrap">
                        {item.quantity} × {item.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-700/50 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300 text-lg">{isArabic ? 'الإجمالي:' : 'Total:'}</span>
                    <span className="text-2xl font-bold text-green-400">{total} {isArabic ? 'درهم' : 'AED'}</span>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm p-6 rounded-3xl border border-slate-700/50 shadow-2xl"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <User className="w-5 h-5 text-blue-400" />
                  {isArabic ? 'معلومات العميل' : 'Customer Information'}
                </h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="group">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t.form.name}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 pl-12 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                        required
                      />
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="group">
                    <div className="relative">
                      <textarea
                        placeholder={isArabic ? 'العنوان' : 'Address'}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 pl-12 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm resize-none"
                        required
                      />
                      <MapPin className="absolute right-3 top-3 w-5 h-5 text-blue-400" />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="group">
                    <div className="relative">
                      <textarea
                        placeholder={t.form.message}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 pl-12 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm resize-none"
                      />
                      <MessageCircle className="absolute right-3 top-3 w-5 h-5 text-blue-400" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <Send className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>
                      {isSubmitting 
                        ? (isArabic ? 'جاري الإرسال...' : 'Sending...') 
                        : t.form.submit
                      }
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}