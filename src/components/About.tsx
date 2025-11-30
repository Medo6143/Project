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
    <section id="about" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px),
                             linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>
        
        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-emerald-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">{isAr ? 'الشركاء الموثوقون منذ 2010' : 'Trusted Partner Since 2010'}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isAr ? 'رواد في عالم ' : 'Leaders in '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {isAr ? 'قطع غيار السيارات' : 'Automotive Spare Parts'}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isAr ? (
              <>
                <strong className="text-white">MAJD PARTS</strong> ليست مجرد متجر عادي، بل شريكك الموثوق في رحلة العناية بسيارتك. نوفر أفضل قطع الغيار الأصلية والبديلة بجودة لا تقبل المساومة.
              </>
            ) : (
              <>
                <strong className="text-white">MAJD PARTS</strong> is not just a store; we are your trusted partner in caring for your car. We provide the best original and alternative parts with uncompromising quality.
              </>
            )}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="flex-1">
            {/* Main Description */}
            <div className="space-y-6 mb-8">
              <p className="text-slate-300 text-lg leading-8 bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
                <TrendingUp className="w-6 h-6 text-green-400 inline-block ml-2 mb-1" />
                {isAr
                  ? 'نحن الوجهة الأولى لعشاق السيارات في الإمارات، نقدم تشكيلة شاملة من قطع الغيار لجميع احتياجات الصيانة والإصلاح. فريقنا من الخبراء يقدم الاستشارات والدعم لضمان سلامة وأداء سيارتك.'
                  : 'We are the first destination for car enthusiasts in the UAE. We offer a comprehensive selection of spare parts for all maintenance and repair needs, with expert advice and support to ensure your car’s safety and performance.'}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm">{isAr ? 'قطع غيار أصلية 100%' : '100% Genuine Parts'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm">{isAr ? 'أسعار تنافسية' : 'Competitive Prices'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm">{isAr ? 'شحن سريع' : 'Fast Shipping'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm">{isAr ? 'دعم فني متخصص' : 'Specialized Technical Support'}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-slate-400 text-sm">
                    {isAr
                      ? stat.label
                      : stat.label === 'سنوات الخبرة' ? 'Years of Experience' :
                        stat.label === 'عميل راضي' ? 'Happy Customers' :
                        stat.label === 'ماركة سيارة' ? 'Car Brands' :
                        stat.label === 'دعم فني' ? 'Tech Support' : stat.label
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  >
                    {/* Hover Effect Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`mb-4 inline-flex p-3 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {isAr ? feature.title : (
                          feature.title === 'جودة عالية' ? 'High Quality' :
                          feature.title === 'ضمان موثوق' ? 'Reliable Warranty' :
                          feature.title === 'خبرة طويلة' ? 'Extensive Experience' :
                          feature.title === 'خدمة سريعة' ? 'Fast Service' : feature.title
                        )}
                      </h3>
                      <p className="text-slate-300 text-sm leading-6">
                        {isAr ? feature.description : (
                          feature.description === 'قطع غيار أصلية وتجارية بأعلى معايير الجودة' ? 'Original and aftermarket parts with the highest quality standards' :
                          feature.description === 'جميع المنتجات مضمونة وموثوقة' ? 'All products are guaranteed and trusted' :
                          feature.description === 'سنوات من الخبرة في مجال قطع غيار السيارات' ? 'Years of experience in auto spare parts' :
                          feature.description === 'توصيل سريع وخدمة عملاء متميزة' ? 'Fast delivery and excellent customer service' : feature.description
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 relative">
            <div className="relative group">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://st5.depositphotos.com/69844538/65407/i/450/depositphotos_654079254-stock-photo-automatic-transmissions-car-parts-warehouse.jpg"
                  alt="About MAJD PARTS"
                  className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold text-sm">{isAr ? 'ضمان الجودة منذ 2010' : 'Quality Guarantee Since 2010'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}