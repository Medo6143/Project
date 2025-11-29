import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../lib/translations';
import { Trash2, Minus, Plus } from 'lucide-react';
import { createOrder } from '../lib/supabase';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || items.length === 0) {
      alert(isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email,
        items: items.map((item) => ({
          id: item.id,
          name: isArabic ? item.name_ar : item.name_en,
          price: item.price,
          quantity: item.quantity,
        })),
        total_amount: total,
        notes: formData.notes,
      };

      const order = await createOrder(orderData);

      if (order) {
        const whatsappMessage = `
        *طلب جديد من MAJD PARTS*

اسم العميل: ${formData.name}
الهاتف: ${formData.phone}
البريد الإلكتروني: ${formData.email}

*المنتجات:*
${items
  .map(
    (item) =>
      `${isArabic ? item.name_ar : item.name_en} x${item.quantity} = ${item.price * item.quantity} AED`
  )
  .join('\n')}

*الإجمالي: ${total} AED*

${formData.notes ? `ملاحظات: ${formData.notes}` : ''}

#طلب_جديد
        `.trim();

        const whatsappUrl = `https://wa.me/971556375521?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        clearCart();
        setFormData({ name: '', phone: '', email: '', notes: '' });
        alert(isArabic ? 'تم إرسال الطلب بنجاح' : 'Order sent successfully');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert(isArabic ? 'حدث خطأ أثناء إرسال الطلب' : 'Error sending order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-xl mb-6">{t.cart.empty}</p>
          <a
            href="#products"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            {t.cart.continue}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-24 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8">{t.cart.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 flex flex-col md:flex-row gap-6 items-start md:items-center"
                >
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={isArabic ? item.name_ar : item.name_en}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {isArabic ? item.name_ar : item.name_en}
                    </h3>
                    <p className="text-green-500 font-semibold">{item.price} AED</p>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-700 rounded-lg p-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-slate-600 rounded transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-white font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-slate-600 rounded transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-white font-bold mb-2">{item.price * item.quantity} AED</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 rounded transition text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 sticky top-28 space-y-4"
            >
              <div className="border-b border-slate-700 pb-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">{t.cart.total}:</span>
                  <span className="text-2xl font-bold text-green-500">{total} AED</span>
                </div>
              </div>

              <input
                type="text"
                placeholder={t.form.name}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                required
              />

              <input
                type="tel"
                placeholder={t.form.phone}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                required
              />

              <input
                type="email"
                placeholder={t.form.email}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />

              <textarea
                placeholder={t.form.message}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition resize-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >
                {isSubmitting ? (isArabic ? 'جاري الإرسال...' : 'Sending...') : t.form.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
