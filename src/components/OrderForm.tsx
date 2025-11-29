import { useState } from 'react';
import { User, Phone, Car, Package, MessageSquare, Send } from 'lucide-react';

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carType: '',
    partType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `
طلب جديد من MAJD PARTS:
الاسم: ${formData.name}
الهاتف: ${formData.phone}
نوع السيارة: ${formData.carType}
نوع القطعة: ${formData.partType}
الرسالة: ${formData.message}
    `.trim();

    const whatsappUrl = `https://wa.me/YOUR_PHONE_NUMBER?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="order-form" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-48 h-48 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="text-blue-400">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 w-32 h-32 animate-spin-reverse">
          <svg viewBox="0 0 100 100" className="text-slate-400">
            <path d="M50,5 L60,35 L90,40 L65,60 L75,95 L50,75 L25,95 L35,60 L10,40 L40,35 Z"
                  fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            اطلب قطعة الغيار
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto mb-6"></div>
          <p className="text-slate-300 text-lg">املأ النموذج وسنتواصل معك فوراً</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-slate-600 shadow-2xl">
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-white font-semibold mb-2 text-right">الاسم الكامل</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="أدخل اسمك"
                    dir="rtl"
                  />
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-white font-semibold mb-2 text-right">رقم الهاتف</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="أدخل رقم هاتفك"
                    dir="rtl"
                  />
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-white font-semibold mb-2 text-right">نوع السيارة</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.carType}
                    onChange={(e) => setFormData({ ...formData, carType: e.target.value })}
                    className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="مثال: تويوتا كامري 2020"
                    dir="rtl"
                  />
                  <Car className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-white font-semibold mb-2 text-right">نوع القطعة المطلوبة</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.partType}
                    onChange={(e) => setFormData({ ...formData, partType: e.target.value })}
                    className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="مثال: محرك كامل، باب أمامي"
                    dir="rtl"
                  />
                  <Package className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-white font-semibold mb-2 text-right">تفاصيل إضافية</label>
                <div className="relative">
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="أي معلومات إضافية..."
                    dir="rtl"
                  />
                  <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-blue-400" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                إرسال الطلب عبر واتساب
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
