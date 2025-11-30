import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

import { ChevronRight } from "lucide-react";

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];
  const [showOrderModal, setShowOrderModal] = useState(false);

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      
      {/* الخلفية القديمة */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="text-blue-400">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="10" r="5" fill="currentColor" />
            <circle cx="90" cy="50" r="5" fill="currentColor" />
            <circle cx="50" cy="90" r="5" fill="currentColor" />
            <circle cx="10" cy="50" r="5" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 w-48 h-48 animate-spin-reverse">
          <svg viewBox="0 0 100 100" className="text-slate-400">
            <path d="M50,5 L60,35 L90,40 L65,60 L75,95 L50,75 L25,95 L35,60 L10,40 L40,35 Z"
              fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

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
            onClick={() => setShowOrderModal(true)}
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
    </section>
  );
}