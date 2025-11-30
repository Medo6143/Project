import { useLanguage } from '../context/LanguageContext';
import { translations } from '../lib/translations';
import { Phone, MapPin, Mail, Clock, Shield, Car } from 'lucide-react';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 py-12 border-t border-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-10 left-10 w-32 h-32 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="text-blue-400">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute top-10 right-10 w-24 h-24 animate-spin-reverse">
          <svg viewBox="0 0 100 100" className="text-slate-400">
            <path d="M50,5 L60,35 L90,40 L65,60 L75,95 L50,75 L25,95 L35,60 L10,40 L40,35 Z"
                  fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                MAJD PARTS
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {t.footer.brandTagline}
              </p>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-slate-300 text-sm">{t.footer.qualityBadge}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                <Car className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300 text-sm">{t.footer.allBrandsBadge}</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-6">{t.footer.contactInfo}</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm">{t.footer.phone}</p>
                  <p className="text-white font-semibold">+20 106 733 3964</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                  <Mail className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm">{t.footer.website}</p>
                  <p className="text-white font-semibold">www.majdparts.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm">{t.footer.address}</p>
                  <p className="text-white font-semibold">{language === 'ar' ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, United Arab Emirates'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-6">{t.footer.workingHours}</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                  <Clock className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm">{t.footer.sunThu}</p>
                  <p className="text-white font-semibold">{language === 'ar' ? '8:00 ص - 10:00 م' : '8:00 AM - 10:00 PM'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-colors">
                  <Clock className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm">{t.footer.friSat}</p>
                  <p className="text-white font-semibold">{language === 'ar' ? '9:00 ص - 11:00 م' : '9:00 AM - 11:00 PM'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-6">{t.footer.quickLinks}</h4>
            <div className="space-y-3">
              <a href="#products" className="block text-slate-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                {t.footer.products}
              </a>
              <a href="#categories" className="block text-slate-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                {t.footer.categories}
              </a>
              <a href="#order-form" className="block text-slate-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                {t.footer.orderPart}
              </a>
              <a href="#about" className="block text-slate-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                {t.footer.about}
              </a>
              <a href="#contact" className="block text-slate-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                {t.footer.contact}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-right">
              <p className="text-slate-400 text-sm">
                2024 <span className="text-blue-400 font-semibold">MAJD PARTS</span>. {t.footer.rights}
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span>{language === 'ar' ? 'صنع ب' : 'Made with'}</span>
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
              <span>{t.footer.madeWithLove}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}