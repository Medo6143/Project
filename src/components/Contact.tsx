import { Phone, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../lib/translations';

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-40 h-40 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="text-blue-400">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="50" cy="15" r="6" fill="currentColor" />
            <circle cx="85" cy="50" r="6" fill="currentColor" />
            <circle cx="50" cy="85" r="6" fill="currentColor" />
            <circle cx="15" cy="50" r="6" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.contact.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto mb-6"></div>
          <p className="text-slate-300 text-lg">{t.contact.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <a
            href="https://wa.me/971556375521"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm p-8 rounded-2xl border border-green-500/50 hover:border-green-400 transition-all duration-300 hover:scale-105 text-center"
          >
            <div className="mb-6 inline-block p-5 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg group-hover:shadow-green-500/50 transition-all duration-300">
              <MessageCircle className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{t.contact.whatsapp}</h3>
            <p className="text-slate-300">{t.contact.instantContact}</p>
          </a>

          <a
            href="tel:+971556375521"
            className="group bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/50 hover:border-blue-400 transition-all duration-300 hover:scale-105 text-center"
          >
            <div className="mb-6 inline-block p-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
              <Phone className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{t.contact.call}</h3>
            <p className="text-slate-300">{t.contact.phone}</p>
          </a>

          <div className="group bg-gradient-to-br from-slate-500/20 to-slate-600/20 backdrop-blur-sm p-8 rounded-2xl border border-slate-500/50 hover:border-slate-400 transition-all duration-300 hover:scale-105 text-center">
            <div className="mb-6 inline-block p-5 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full shadow-lg group-hover:shadow-slate-500/50 transition-all duration-300">
              <MapPin className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{t.contact.website}</h3>
            <p className="text-slate-300">www.majdparts.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
