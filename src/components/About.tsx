import { Award, Shield, Users, Clock, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const features = [
  {
    icon: Award,
    title: 'جودة عالية',
    description: 'قطع غيار أصلية وتجارية بأعلى معايير الجودة',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Shield,
    title: 'ضمان موثوق',
    description: 'جميع المنتجات مضمونة وموثوقة',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Users,
    title: 'خبرة طويلة',
    description: 'سنوات من الخبرة في مجال قطع غيار السيارات',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Clock,
    title: 'خدمة سريعة',
    description: 'توصيل سريع وخدمة عملاء متميزة',
    gradient: 'from-purple-500 to-pink-500'
  },
];

const stats = [
  { number: '10+', label: 'سنوات الخبرة' },
  { number: '50K+', label: 'عميل راضي' },
  { number: '100+', label: 'ماركة سيارة' },
  { number: '24/7', label: 'دعم فني' },
];

export default function About() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  
  return (
    <section id="about" className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
            <Star className="w-3 h-3 text-blue-400" />
            <span className="text-blue-300 text-xs font-medium">
              {isAr ? 'الشركاء الموثوقون منذ 2010' : 'Trusted Partner Since 2010'}
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            {isAr ? 'رواد في عالم ' : 'Leaders in '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {isAr ? 'قطع غيار السيارات' : 'Automotive Spare Parts'}
            </span>
          </h2>
          
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-4 rounded-full"></div>
          
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'MAJD PARTS ليست مجرد متجر عادي، بل شريكك الموثوق في رحلة العناية بسيارتك.'
              : 'MAJD PARTS is not just a store; we are your trusted partner in caring for your car.'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2">
            {/* Stats Section - Compact */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-slate-800/30 rounded-xl border border-slate-700/30">
                  <div className="text-lg sm:text-xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-xs text-slate-400">
                    {isAr
                      ? stat.label
                      : stat.label === 'سنوات الخبرة' ? 'Years Exp' :
                        stat.label === 'عميل راضي' ? 'Happy Clients' :
                        stat.label === 'ماركة سيارة' ? 'Car Brands' :
                        'Tech Support'
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
                {isAr
                  ? 'نحن الوجهة الأولى لعشاق السيارات في الإمارات، نقدم تشكيلة شاملة من قطع الغيار لجميع احتياجات الصيانة والإصلاح.'
                  : 'We are the first destination for car enthusiasts in the UAE, offering a comprehensive selection of spare parts for all maintenance needs.'}
              </p>
              
              {/* Benefits Grid - Compact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {[
                  'قطع غيار أصلية 100%',
                  'أسعار تنافسية',
                  'شحن سريع',
                  'دعم فني متخصص'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2 p-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">
                      {isAr ? benefit : (
                        benefit === 'قطع غيار أصلية 100%' ? '100% Genuine Parts' :
                        benefit === 'أسعار تنافسية' ? 'Competitive Prices' :
                        benefit === 'شحن سريع' ? 'Fast Shipping' :
                        'Specialized Support'
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Grid - Compact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group p-4 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-xl border border-slate-700/40 hover:border-slate-600 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 bg-gradient-to-br ${feature.gradient} rounded-lg shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">
                          {isAr ? feature.title : (
                            feature.title === 'جودة عالية' ? 'High Quality' :
                            feature.title === 'ضمان موثوق' ? 'Reliable Warranty' :
                            feature.title === 'خبرة طويلة' ? 'Experience' :
                            'Fast Service'
                          )}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {isAr ? feature.description : (
                            feature.description === 'قطع غيار أصلية وتجارية بأعلى معايير الجودة' ? 'Original & aftermarket parts' :
                            feature.description === 'جميع المنتجات مضمونة وموثوقة' ? 'All products guaranteed' :
                            feature.description === 'سنوات من الخبرة في مجال قطع غيار السيارات' ? 'Years of experience' :
                            'Fast delivery & support'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://png.pngtree.com/png-vector/20240322/ourmid/pngtree-free-outstanding-car-parts-png-image_12188726.png"
                  alt="About MAJD PARTS"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[450px] object-cover"
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Quality Badge */}
              <div className="absolute -bottom-3 -right-3 sm:bottom-4 sm:right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-semibold text-xs sm:text-sm">
                    {isAr ? 'ضمان الجودة' : 'Quality Guarantee'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {isAr ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {isAr
                      ? 'خبرة 10+ سنوات مع آلاف العملاء الراضين'
                      : '10+ years experience with thousands of satisfied customers'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full border border-blue-500/20">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">
              {isAr ? 'متاحون على مدار الساعة' : 'Available 24/7'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}