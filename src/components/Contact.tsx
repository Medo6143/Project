import { Phone, MapPin, MessageCircle, Mail, Clock, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../lib/translations';

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: t.contact.whatsapp,
      description: t.contact.instantContact,
      action: 'https://wa.me/971556375521',
      color: 'from-green-500 to-emerald-600',
      borderColor: 'border-green-500/50',
      hoverBorder: 'hover:border-green-400',
      buttonText: t.contact.startChat,
      isExternal: true
    },
    {
      icon: Phone,
      title: t.contact.call,
      description: t.contact.phone,
      action: 'tel:+971556375521',
      color: 'from-blue-500 to-cyan-600',
      borderColor: 'border-blue-500/50',
      hoverBorder: 'hover:border-blue-400',
      buttonText: t.contact.callNow,
      isExternal: false
    },
    {
      icon: Mail,
      title: t.contact.email,
      description: 'info@majdparts.com',
      action: 'mailto:info@majdparts.com',
      color: 'from-purple-500 to-pink-600',
      borderColor: 'border-purple-500/50',
      hoverBorder: 'hover:border-purple-400',
      buttonText: t.contact.sendEmail,
      isExternal: false
    },
    {
      icon: MapPin,
      title: t.contact.website,
      description: 'www.majdparts.com',
      action: 'https://majdparts.com',
      color: 'from-orange-500 to-red-600',
      borderColor: 'border-orange-500/50',
      hoverBorder: 'hover:border-orange-400',
      buttonText: t.contact.visitSite,
      isExternal: true
    }
  ];

  const businessInfo = [
    { icon: Clock, text: `${t.footer.sunThu}: ${language === 'ar' ? '8:00 ص - 10:00 م' : '8:00 AM - 10:00 PM'}` },
    { icon: Clock, text: `${t.footer.friSat}: ${language === 'ar' ? '9:00 ص - 11:00 م' : '9:00 AM - 11:00 PM'}` },
    { icon: MapPin, text: language === 'ar' ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, United Arab Emirates' }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px),
                             linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-green-500/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
            <Send className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">{t.contact.ready}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t.contact.title}
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.contact.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const Component = method.isExternal ? 'a' : 'a';
              
              return (
                <Component
                  key={index}
                  href={method.action}
                  target={method.isExternal ? "_blank" : undefined}
                  rel={method.isExternal ? "noopener noreferrer" : undefined}
                  className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:border-slate-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Hover Effect Line */}
                  <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${method.color} group-hover:w-full transition-all duration-500`}></div>

                  <div className="relative z-10 text-center">
                    <div className={`mb-6 inline-flex p-4 bg-gradient-to-br ${method.color} rounded-2xl shadow-2xl group-hover:shadow-xl transition-all duration-300 transform group-hover:rotate-12`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">{method.title}</h3>
                    <p className="text-slate-300 mb-6 text-lg">{method.description}</p>
                    
                    <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br ${method.color} rounded-full text-white font-semibold text-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                      <span>{method.buttonText}</span>
                      <Send className="w-4 h-4 transform -scale-x-100" />
                    </div>
                  </div>
                </Component>
              );
            })}
          </div>

          {/* Information Sidebar */}
          <div className="space-y-8">
            {/* Business Hours & Info */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">معلومات العمل</h3>
              <div className="space-y-4">
                {businessInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30">
                      <div className="p-2 bg-slate-700/50 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-slate-300 text-lg">{info.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Response Banner */}
            <div className="relative bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm p-8 rounded-3xl border border-cyan-500/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-1 rtl:space-x-reverse">
                    {[1, 2, 3].map((dot) => (
                      <div
                        key={dot}
                        className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${dot * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{language === 'ar' ? 'استجابة سريعة' : 'Quick Response'}</h4>
                <p className="text-cyan-100 text-lg">{language === 'ar' ? 'نرد على جميع الاستفسارات خلال 15 دقيقة' : 'We reply to all inquiries within 15 minutes'}</p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/30">
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-slate-400 text-sm">{language === 'ar' ? 'دعم' : 'Support'}</div>
              </div>
              <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/30">
                <div className="text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-slate-400 text-sm">{language === 'ar' ? 'ضمان' : 'Warranty'}</div>
              </div>
              <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/30">
                <div className="text-2xl font-bold text-white mb-1">⏱️</div>
                <div className="text-slate-400 text-sm">{language === 'ar' ? 'سرعة' : 'Speed'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-400 text-lg">
            {language === 'ar' ? 'تواصل معنا اليوم واجعل سيارتك في أفضل حال! 🚗✨' : 'Contact us today and keep your car in top shape! 🚗✨'}
          </p>
        </div>
      </div>
    </section>
  );
}