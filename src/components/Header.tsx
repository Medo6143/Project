import { useState } from 'react';
import { Menu, X, ShoppingCart, Globe, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { translations } from '../lib/translations';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const t = translations[language];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 to-slate-800/95 border-b border-slate-700/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8 flex-1">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap hover:opacity-80 transition-all duration-300 hover:scale-105">
              MAJD PARTS
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/" className="text-slate-300 hover:text-blue-400 transition-all duration-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-800/50">
                {t.header.home}
              </Link>
              <Link to="/products" className="text-slate-300 hover:text-blue-400 transition-all duration-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-800/50">
                {t.header.products}
              </Link>
              <Link to="/admin" className="text-slate-300 hover:text-blue-400 transition-all duration-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-800/50">
                {t.header.admin}
              </Link>
              <a 
                href="#about" 
                className="text-slate-300 hover:text-blue-400 transition-all duration-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-800/50"
              >
                {t.header.about}
              </a>
              <a 
                href="#contact" 
                className="text-slate-300 hover:text-blue-400 transition-all duration-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-800/50"
              >
                {t.header.contact}
              </a>
            </nav>
          </div>

          {/* Location Section - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="group relative bg-gradient-to-r from-slate-800/80 to-slate-700/60 border border-slate-600/50 rounded-2xl px-6 py-3 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative flex items-center gap-4">
                {/* UAE Flag with Enhanced Animation */}
                <div className="relative">
                  <div className="w-10 h-7 rounded-md overflow-hidden shadow-2xl animate-flag-wave border border-slate-500/30">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg" 
                      alt="علم الإمارات"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-blue-400/20 rounded-md blur-sm group-hover:blur-md transition-all duration-500"></div>
                </div>

                {/* Location Text */}
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400 animate-pulse" />
                    <span className="text-slate-200 text-sm font-semibold leading-tight bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">
                      {language === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}
                    </span>
                  </div>
                  <span className="text-cyan-300 text-xs font-medium leading-tight mt-1 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {language === 'ar' ? 'الشارقة - دبي - أبوظبي' : 'Sharjah - Dubai - Abu Dhabi'}
                  </span>
                </div>

                {/* Pulsing Dot */}
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 hover:bg-slate-700/60 rounded-xl transition-all duration-300 text-slate-300 text-sm font-medium border border-slate-600/50 hover:border-blue-500/30 hover:scale-105"
            >
              <Globe className="w-4 h-4 text-blue-400" />
              <span>{language === 'ar' ? 'EN' : 'AR'}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => handleNavigation('/cart')}
              className="relative p-3 bg-slate-800/60 hover:bg-slate-700/60 rounded-xl transition-all duration-300 group border border-slate-600/50 hover:border-blue-500/30 hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded-full flex items-center justify-center font-bold border-2 border-slate-900 shadow-lg animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 hover:bg-slate-700/60 rounded-xl transition-all duration-300 border border-slate-600/50 hover:border-blue-500/30"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-slate-800/95 to-slate-900/95 border-t border-slate-700/50 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4">
            {/* Mobile Location Section */}
            <div className="mb-6 p-4 bg-slate-800/60 rounded-2xl border border-slate-600/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 rounded-md overflow-hidden shadow-lg border border-slate-500/30">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg" 
                    alt="علم الإمارات"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-200 text-sm font-semibold">
                      {language === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}
                    </span>
                  </div>
                  <span className="text-cyan-300 text-xs font-medium mt-1">
                    {language === 'ar' ? 'الشارقة - دبي - أبوظبي' : 'Sharjah - Dubai - Abu Dhabi'}
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => handleNavigation('/')}
                className="text-slate-300 hover:text-blue-400 transition-all duration-300 py-3 px-4 text-right rounded-xl hover:bg-slate-700/50 text-sm font-medium"
              >
                {t.header.home}
              </button>
              <button
                onClick={() => handleNavigation('/products')}
                className="text-slate-300 hover:text-blue-400 transition-all duration-300 py-3 px-4 text-right rounded-xl hover:bg-slate-700/50 text-sm font-medium"
              >
                {t.header.products}
              </button>
              <button
                onClick={() => handleNavigation('/admin')}
                className="text-slate-300 hover:text-blue-400 transition-all duration-300 py-3 px-4 text-right rounded-xl hover:bg-slate-700/50 text-sm font-medium"
              >
                {t.header.admin}
              </button>
              <a
                href="#about"
                className="text-slate-300 hover:text-blue-400 transition-all duration-300 py-3 px-4 text-right rounded-xl hover:bg-slate-700/50 text-sm font-medium"
              >
                {t.header.about}
              </a>
              <a
                href="#contact"
                className="text-slate-300 hover:text-blue-400 transition-all duration-300 py-3 px-4 text-right rounded-xl hover:bg-slate-700/50 text-sm font-medium"
              >
                {t.header.contact}
              </a>
            </nav>
          </div>
        </div>
      )}

      <style>{`
        @keyframes flagWave {
          0% { 
            transform: perspective(400px) rotateY(0deg) rotateX(0deg) scale(1);
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);
          }
          25% { 
            transform: perspective(400px) rotateY(2deg) rotateX(1deg) scale(1.02);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
          }
          50% { 
            transform: perspective(400px) rotateY(0deg) rotateX(0deg) scale(1);
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);
          }
          75% { 
            transform: perspective(400px) rotateY(-2deg) rotateX(-1deg) scale(1.02);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
          }
          100% { 
            transform: perspective(400px) rotateY(0deg) rotateX(0deg) scale(1);
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);
          }
        }
        25% { 
          transform: perspective(400px) rotateY(2deg) rotateX(1deg) scale(1.02);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
        }
        50% { 
          transform: perspective(400px) rotateY(0deg) rotateX(0deg) scale(1);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);
        }
        75% { 
          transform: perspective(400px) rotateY(-2deg) rotateX(-1deg) scale(1.02);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
        }
        100% { 
          transform: perspective(400px) rotateY(0deg) rotateX(0deg) scale(1);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);
        }
      }
      .animate-flag-wave {
        animation: flagWave 4s ease-in-out infinite;
      }
    `}</style>
  </header>
);
}