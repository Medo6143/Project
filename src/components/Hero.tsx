import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];
  const [showOrderModal, setShowOrderModal] = useState(false);
  const navigate = useNavigate();

  const [partName, setPartName] = useState("");
  const [condition, setCondition] = useState("new");
  const [brand, setBrand] = useState("Toyota");

  const carBrands = [
    "Toyota", "Nissan", "Honda", "Hyundai", "Kia", "Mazda",
    "Mercedes", "BMW", "Audi", "Volkswagen", "Chevrolet",
    "Ford", "GMC", "Dodge", "Jeep", "Range Rover",
    "Lexus", "Infiniti", "Suzuki", "Mitsubishi"
  ];

  const sendWhatsAppOrder = () => {
    const phone = "+971556375521";
    const message = `
طلب جديد:
-------------------
اسم القطعة / رقم الهيكل: ${partName}
الحالة: ${condition === "new" ? "جديد" : "مستعمل"}
الماركة: ${brand}
`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const openProductsFromHero = () => {
    const trigger = () => {
      const el = document.querySelector('#products') as HTMLElement | null;
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.dispatchEvent(new CustomEvent('openProductsModal', { detail: { index: 0 } }));
    };
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(trigger, 200);
    } else {
      trigger();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      
      {/* خلفية المحرك والتروس المتحركة */}
      <div className="absolute inset-0 opacity-20">
        {/* المحرك الرئيسي */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
          <svg viewBox="0 0 200 200" className="w-full h-full text-blue-400/30 animate-spin-slow">
            {/* دائرة المحرك الخارجية */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="4" />
            
            {/* دوائر داخلية */}
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5,5" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
            
            {/* خطوط شعاعية */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45) * Math.PI / 180;
              const x1 = 100 + 40 * Math.cos(angle);
              const y1 = 100 + 40 * Math.sin(angle);
              const x2 = 100 + 80 * Math.cos(angle);
              const y2 = 100 + 80 * Math.sin(angle);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" />
              );
            })}
            
            {/* مركز المحرك */}
            <circle cx="100" cy="100" r="15" fill="currentColor" />
          </svg>
        </div>

        {/* التروس الصغيرة - أعلى اليسار */}
        <div className="absolute top-20 left-20 w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full text-green-400/20 animate-spin-reverse">
            <path d="M50,10 L55,30 L75,35 L60,50 L65,75 L50,65 L35,75 L40,50 L25,35 L45,30 Z" 
                  fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="50" cy="50" r="8" fill="currentColor" />
          </svg>
        </div>

        {/* التروس الصغيرة - أسفل اليمين */}
        <div className="absolute bottom-20 right-20 w-28 h-28">
          <svg viewBox="0 0 100 100" className="w-full h-full text-orange-400/20 animate-spin-slow">
            <path d="M50,15 L57,32 L77,35 L62,52 L67,77 L50,68 L33,77 L38,52 L23,35 L43,32 Z" 
                  fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="6" fill="currentColor" />
          </svg>
        </div>

        {/* ترس كبير - أعلى اليمين */}
        <div className="absolute top-32 right-32 w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full text-purple-400/25 animate-spin-reverse" style={{ animationDuration: '8s' }}>
            <path d="M50,5 L58,28 L82,32 L65,50 L72,82 L50,72 L28,82 L35,50 L18,32 L42,28 Z" 
                  fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="50" cy="50" r="10" fill="currentColor" />
          </svg>
        </div>

        {/* ترس صغير - أسفل اليسار */}
        <div className="absolute bottom-32 left-32 w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400/20 animate-spin-slow" style={{ animationDuration: '6s' }}>
            <path d="M50,12 L56,30 L74,33 L62,48 L66,70 L50,62 L34,70 L38,48 L26,33 L44,30 Z" 
                  fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </div>

        {/* خطوط توصيل بين التروس */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* خط من الترس العلوي الأيسر إلى المحرك */}
          <line x1="20%" y1="20%" x2="45%" y2="45%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" strokeDasharray="5,5" />
          
          {/* خط من الترس العلوي الأيمن إلى المحرك */}
          <line x1="80%" y1="32%" x2="55%" y2="45%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" strokeDasharray="5,5" />
          
          {/* خط من الترس السفلي الأيسر إلى المحرك */}
          <line x1="32%" y1="80%" x2="45%" y2="55%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" strokeDasharray="5,5" />
          
          {/* خط من الترس السفلي الأيمن إلى المحرك */}
          <line x1="68%" y1="68%" x2="55%" y2="55%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" strokeDasharray="5,5" />
        </svg>

        {/* جزيئات متحركة */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
              style={{
                left: `${20 + (i * 7)}%`,
                top: `${10 + (i * 6)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + (i % 3)}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* طبقة تظليل إضافية */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-blue-900/30 to-slate-800/40"></div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-8 flex justify-center">
          <h1 className="relative text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-slate-300 to-blue-400 bg-clip-text text-transparent">
            MAJD PARTS
          </h1>
        </div>

        <p className="text-xl md:text-3xl text-slate-200 mb-4 font-light tracking-wide">
          {t.hero.tagline}
        </p>
        <p className="text-lg md:text-2xl text-slate-300 mb-12 font-light">
          {t.hero.subtitle}
        </p>

        {/* أزرار الهيرو */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={openProductsFromHero}
            className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            {t.hero.orderNow}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>

          <a
            href="#categories"
            className="px-8 py-4 bg-slate-700/50 backdrop-blur-sm text-white rounded-lg font-semibold text-lg border-2 border-slate-500 hover:border-blue-400 transition-all duration-300 hover:scale-105"
          >
            {t.hero.browseProducts}
          </a>
        </div>
      </div>

      {/* مودال الطلب */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-2xl shadow-xl w-full max-w-md text-white relative">

            {/* زر الإغلاق */}
            <button
              onClick={() => setShowOrderModal(false)}
              className="absolute top-3 right-3 text-slate-300 hover:text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">{language === 'ar' ? 'طلب قطعة' : 'Request a Part'}</h2>

            <div className="flex flex-col gap-4">

              {/* اسم القطعة */}
              <div>
                <label className="block mb-1 text-sm text-slate-300">{language === 'ar' ? 'اسم القطعة أو رقم الهيكل' : 'Part name or VIN'}</label>
                <input
                  type="text"
                  value={partName}
                  onChange={(e) => setPartName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-500 outline-none"
                  placeholder={language === 'ar' ? 'مثال: كبوت – رقم الهيكل' : 'e.g., Hood – VIN number'}
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>

              {/* الحالة */}
              <div>
                <label className="block mb-1 text-sm text-slate-300">{language === 'ar' ? 'الحالة' : 'Condition'}</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-500 outline-none"
                >
                  <option value="new">{language === 'ar' ? 'جديد' : 'New'}</option>
                  <option value="used">{language === 'ar' ? 'مستعمل' : 'Used'}</option>
                </select>
              </div>

              {/* الماركة */}
              <div>
                <label className="block mb-1 text-sm text-slate-300">{language === 'ar' ? 'الماركة' : 'Brand'}</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-500 outline-none"
                >
                  {carBrands.map((b, index) => (
                    <option key={index} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* زر ارسال الطلب عبر واتساب */}
              <button
                onClick={sendWhatsAppOrder}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  className="w-6 h-6"
                  alt="WhatsApp"
                />
                {language === 'ar' ? 'إرسال الطلب عبر واتساب' : 'Send via WhatsApp'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronRight className="w-8 h-8 text-blue-400 rotate-90" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-10px) translateX(5px) rotate(90deg); opacity: 0.5; }
          50% { transform: translateY(-5px) translateX(10px) rotate(180deg); opacity: 0.7; }
          75% { transform: translateY(-15px) translateX(-5px) rotate(270deg); opacity: 0.5; }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}