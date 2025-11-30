import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage, isArabic } = useLanguage();

  const toggle = () => setLanguage(language === 'ar' ? 'en' : 'ar');

  return (
    <button
      onClick={toggle}
      aria-label={isArabic ? 'تبديل إلى الإنجليزية' : 'Switch to Arabic'}
      className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-4 py-3 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700 text-slate-200 shadow-lg hover:shadow-blue-500/20 hover:border-blue-500 transition-all duration-300 hover:scale-105"
    >
      <Globe className="w-5 h-5 text-blue-400" />
      <span className="text-sm font-semibold">{language === 'ar' ? 'EN' : 'AR'}</span>
    </button>
  );
}
