import { useState } from 'react';
import { User, Phone, Car, Package, MessageSquare, Send, Sparkles, Shield, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../lib/translations';

export default function OrderForm() {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carType: '',
    partType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = (language === 'ar'
      ? `\nطلب جديد من MAJD PARTS:\n─────────────────\n👤 الاسم: ${formData.name}\n📞 الهاتف: ${formData.phone}\n🚗 نوع السيارة: ${formData.carType}\n🔧 نوع القطعة: ${formData.partType}\n📝 الرسالة: ${formData.message}\n─────────────────\nتم الإرسال عبر الموقع الإلكتروني`
      : `\nNew Order from MAJD PARTS:\n─────────────────\n👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}\n🚗 Car: ${formData.carType}\n🔧 Part: ${formData.partType}\n📝 Message: ${formData.message}\n─────────────────\nSent via website`).trim();

    const whatsappUrl = `https://wa.me/971556375521?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="order-form" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* الخلفية والأنيميشن */}
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
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">{language === 'ar' ? 'طلب سريع وسهل' : 'Fast & Easy Request'}</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {language === 'ar' ? 'اطلب قطعة' : 'Order a'}
            </span>{' '}
            {language === 'ar' ? 'الغيار' : 'Part'}
          </h2>
          
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {language === 'ar' ? 'املأ النموذج وسنتواصل معك فوراً لتأكيد الطلب وتوفير أفضل الأسعار' : 'Fill out the form and we will contact you shortly to confirm your request with the best prices'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm p-6 rounded-3xl border border-slate-700/50">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">{language === 'ar' ? 'مميزات الخدمة' : 'Service Benefits'}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-2xl border border-slate-600/50">
                    <div className="p-2 bg-green-500/20 rounded-xl">
                      <Clock className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{language === 'ar' ? 'رد فوري' : 'Instant Response'}</h4>
                      <p className="text-slate-300 text-sm">{language === 'ar' ? 'رد خلال 15 دقيقة' : 'Reply within 15 minutes'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-2xl border border-slate-600/50">
                    <div className="p-2 bg-blue-500/20 rounded-xl">
                      <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{language === 'ar' ? 'جودة مضمونة' : 'Quality Guaranteed'}</h4>
                      <p className="text-slate-300 text-sm">{language === 'ar' ? 'ضمان على جميع القطع' : 'Warranty on all parts'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-2xl border border-slate-600/50">
                    <div className="p-2 bg-purple-500/20 rounded-xl">
                      <Car className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{language === 'ar' ? 'جميع الماركات' : 'All Brands'}</h4>
                      <p className="text-slate-300 text-sm">{language === 'ar' ? 'أمريكي - ياباني - كوري' : 'American - Japanese - Korean'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* رقم الاتصال */}
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm p-6 rounded-3xl border border-green-500/20 text-center">
                <h4 className="text-white font-bold mb-2">{language === 'ar' ? 'للتواصل المباشر' : 'Direct Contact'}</h4>
                <p className="text-green-300 text-lg font-mono">+971 556 375 521</p>
                <p className="text-slate-400 text-sm mt-2">{language === 'ar' ? 'متاحون 24/7' : 'Available 24/7'}</p>
              </div>
            </div>

            {/* Enhanced Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 shadow-2xl">
                <div className="space-y-6">
                  {/* Name */}
                  <div className="group">
                    <label className="block text-white font-semibold mb-3 text-right text-lg">{t.form.name}</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-4 pr-14 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                        placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-500/20 rounded-lg group-focus-within:bg-blue-500/30 transition-colors">
                        <User className="w-5 h-5 text-blue-400" />
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group">
                    <label className="block text-white font-semibold mb-3 text-right text-lg">{t.form.phone}</label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-4 pr-14 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                        placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-500/20 rounded-lg group-focus-within:bg-blue-500/30 transition-colors">
                        <Phone className="w-5 h-5 text-blue-400" />
                      </div>
                    </div>
                  </div>

                  {/* Car Type */}
                  <div className="group">
                    <label className="block text-white font-semibold mb-3 text-right text-lg">{t.form.carType}</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.carType}
                        onChange={(e) => setFormData({ ...formData, carType: e.target.value })}
                        className="w-full px-4 py-4 pr-14 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                        placeholder={language === 'ar' ? 'مثال: تويوتا كامري 2020' : 'e.g., Toyota Camry 2020'}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-500/20 rounded-lg group-focus-within:bg-blue-500/30 transition-colors">
                        <Car className="w-5 h-5 text-blue-400" />
                      </div>
                    </div>
                  </div>

                  {/* Part Type */}
                  <div className="group">
                    <label className="block text-white font-semibold mb-3 text-right text-lg">{t.form.partType}</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.partType}
                        onChange={(e) => setFormData({ ...formData, partType: e.target.value })}
                        className="w-full px-4 py-4 pr-14 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                        placeholder={language === 'ar' ? 'مثال: محرك كامل، باب أمامي، كبوت' : 'e.g., Full engine, front door, hood'}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-500/20 rounded-lg group-focus-within:bg-blue-500/30 transition-colors">
                        <Package className="w-5 h-5 text-blue-400" />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="group">
                    <label className="block text-white font-semibold mb-3 text-right text-lg">{t.form.message}</label>
                    <div className="relative">
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-4 pr-14 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm resize-none"
                        placeholder={language === 'ar' ? 'أي معلومات إضافية عن القطعة المطلوبة...' : 'Any additional info about the requested part...'}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                      <div className="absolute right-3 top-4 p-2 bg-blue-500/20 rounded-lg group-focus-within:bg-blue-500/30 transition-colors">
                        <MessageSquare className="w-5 h-5 text-blue-400" />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <Send className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span>{t.form.submit}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}