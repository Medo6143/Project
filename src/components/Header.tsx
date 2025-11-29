import { useState } from 'react';
import { Menu, X, ShoppingCart, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { translations } from '../lib/translations';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { itemCount } = useCart();
  const { navigate } = useRouter();
  const t = translations[language];

  const handleNavigation = (page: 'home' | 'products' | 'cart' | 'admin') => {
    navigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8 flex-1">
          <button
            onClick={() => handleNavigation('home')}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent whitespace-nowrap hover:opacity-80 transition"
          >
            MAJD PARTS
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavigation('home')}
              className="text-slate-300 hover:text-blue-400 transition text-sm"
            >
              {t.header.home}
            </button>
            <button
              onClick={() => handleNavigation('products')}
              className="text-slate-300 hover:text-blue-400 transition text-sm"
            >
              {t.header.products}
            </button>
            <a href="#about" className="text-slate-300 hover:text-blue-400 transition text-sm">
              {t.header.about}
            </a>
            <a href="#contact" className="text-slate-300 hover:text-blue-400 transition text-sm">
              {t.header.contact}
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition text-slate-300 text-sm"
          >
            <Globe className="w-4 h-4" />
            {language === 'ar' ? 'EN' : 'AR'}
          </button>

          <button
            onClick={() => handleNavigation('cart')}
            className="relative p-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition"
          >
            <ShoppingCart className="w-5 h-5 text-blue-400" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-700 rounded-lg transition"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <nav className="flex flex-col p-4 gap-4">
            <button
              onClick={() => handleNavigation('home')}
              className="text-slate-300 hover:text-blue-400 transition py-2 text-left"
            >
              {t.header.home}
            </button>
            <button
              onClick={() => handleNavigation('products')}
              className="text-slate-300 hover:text-blue-400 transition py-2 text-left"
            >
              {t.header.products}
            </button>
            <a href="#about" className="text-slate-300 hover:text-blue-400 transition py-2">
              {t.header.about}
            </a>
            <a href="#contact" className="text-slate-300 hover:text-blue-400 transition py-2">
              {t.header.contact}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
