import { Settings, Car, Zap, Disc, Wrench, Package, ArrowLeft, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const categories = [
  {
    icon: Settings,
    title: 'المحركات',
    title_en: 'Engines',
    description: 'محركات كاملة وقطع غيار المحركات بأعلى معايير الجودة',
    image: 'https://th.bing.com/th/id/R.1d994bba72e51bb7dce17640e48c8770?rik=E0k2FK4xbtjxcw&pid=ImgRaw&r=0',
    gradient: 'from-orange-500 to-red-600',
    count: '120+ منتج',
    features: ['محركات كاملة', 'قطع أساسية', 'إكسسوارات']
  },
  {
    icon: Car,
    title: 'اجزاء هيكل السيارات ',
    title_en: 'Body Parts',
    description: '     بمبر و بونيت و رفرف و باب وزجاج',
    image: 'https://1.bp.blogspot.com/-92tbMCPpk4I/VYQRbiX8esI/AAAAAAAAEaw/azELjIG-EY8/s1600/Mercedes-Benz-F800-Front-Crystal-City-Car-2014-Photoshop-Art-Orange-Neon-4K-Wallpapers-design-by-Tony-Kokhan-www.el-tony.com_.jpg',
    gradient: 'from-blue-500 to-cyan-600',
    count: '85+ منتج',
    features: ['هياكل خارجية', 'أبواب وشبابيك', 'صدامات']
  },
  {
    icon: Zap,
    title: 'الكهرباء',
    title_en: 'Electrical',
    description: 'قطع كهربائية وإلكترونية متطورة لسيارتك',
    image: 'https://i.ytimg.com/vi/BR-AEun9i8E/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBN5K_Chlvc5cqSnfrQ42WxyDSFwg',
    gradient: 'from-yellow-500 to-amber-600',
    count: '200+ منتج',
    features: ['أنظمة كهربائية', 'إلكترونيات', 'أسلاك وموصلات']
  },
  {
    icon: Disc,
    title: 'كمبريصور وروديتور',
    title_en: 'Brakes',
    description: 'كمبريصور وروديتور',
    image: 'https://tse2.mm.bing.net/th/id/OIP.gMu75e0ENbiRReZbkSWAZwHaEC?rs=1&pid=ImgDetMain&o=7&rm=3',
    gradient: 'from-purple-500 to-pink-600',
    count: '95+ منتج',
    features: ['أنظمة فرامل', 'قطع أساسية', 'إكسسوارات']
  },
  {
    icon: Wrench,
    title: 'السمكرة',
    title_en: 'Body Repair',
    description: 'معدات وقطع سمكرة بجودة احترافية',
    image: 'https://th.bing.com/th/id/OIP.OxB6TqU6kDvCTzWAAl7DRwHaEK?w=281&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    gradient: 'from-green-500 to-emerald-600',
    count: '75+ منتج',
    features: ['معدات سمكرة', 'أدوات متخصصة', 'قطع غيار']
  },
  {
    icon: Package,
    title: 'قطع عامة',
    title_en: 'General Parts',
    description: 'جميع قطع الغيار الأخرى بأسعار تنافسية',
    image: 'https://th.bing.com/th/id/OIP.-ZzVm5xcJe6JjhC4_7VH1gHaEJ?w=281&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    gradient: 'from-slate-500 to-slate-700',
    count: '300+ منتج',
    features: ['قطع متنوعة', 'إكسسوارات', 'مستلزمات']
  },
];

export default function Categories() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const englishDescriptions: Record<string, string> = {
    Engines: 'Complete engines and high-quality engine parts',
    'Body Parts': 'Body panels, doors, and bumpers with superior build quality',
    Electrical: 'Advanced electrical and electronic parts for your car',
    Brakes: 'Complete braking systems for your safety on the road',
    'Body Repair': 'Professional-grade body repair tools and parts',
    'General Parts': 'All other spare parts at competitive prices',
  };

  const englishFeatures: Record<string, string[]> = {
    Engines: ['Complete engines', 'Core parts', 'Accessories'],
    'Body Parts': ['Exterior panels', 'Doors & windows', 'Bumpers'],
    Electrical: ['Electrical systems', 'Electronics', 'Wires & connectors'],
    Brakes: ['Brake systems', 'Core parts', 'Accessories'],
    'Body Repair': ['Body tools', 'Specialized tools', 'Spare parts'],
    'General Parts': ['Various parts', 'Accessories', 'Supplies'],
  };

  return (
    <section id="categories" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px),
                             linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-orange-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        
        {/* Corner Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">{isAr ? 'تشكيلة شاملة' : 'Wide Selection'}</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {isAr ? 'فئات' : 'Parts'}
            </span>{' '}
            {isAr ? 'قطع الغيار' : 'Categories'}
          </h2>
          
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isAr
              ? 'اكتشف تشكيلتنا الشاملة من قطع غيار السيارات عالية الجودة. كل فئة مصممة لتلبية احتياجات صيانة سيارتك بدقة واحترافية.'
              : 'Explore our comprehensive selection of high-quality auto parts. Each category is designed to meet your maintenance needs with precision and professionalism.'}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-3xl border border-slate-700/50 hover:border-slate-600 transition-all duration-700 hover:scale-[1.02] overflow-hidden"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={isAr ? category.title : category.title_en}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <div className={`absolute top-4 left-4 p-3 bg-gradient-to-br ${category.gradient} rounded-xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Product Count */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-slate-900/80 backdrop-blur-sm rounded-full border border-slate-700/50">
                    <span className="text-slate-300 text-sm font-medium">
                      {isAr ? category.count : category.count.replace('منتج', 'items')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6">
                  {/* Title Section */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-500">
                      {isAr ? category.title : category.title_en}
                    </h3>
                    <p className="text-blue-300/80 text-sm font-medium mb-3">{isAr ? category.title_en : category.title}</p>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {isAr ? category.description : englishDescriptions[category.title_en]}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {(isAr ? category.features : englishFeatures[category.title_en]).map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-3 py-1 bg-slate-700/50 rounded-full text-slate-300 text-sm border border-slate-600/50 group-hover:border-slate-500/50 transition-all duration-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700/70 rounded-xl text-slate-300 hover:text-white transition-all duration-300 group/btn border border-slate-600/50 hover:border-slate-500/50">
                      <span className="text-sm font-medium">{isAr ? 'استكشف المنتجات' : 'Explore products'}</span>
                      <ArrowLeft className="w-4 h-4 transform group-hover/btn:-translate-x-1 transition-transform duration-300" />
                    </button>
                    
                    {/* Hover Indicator */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[1, 2, 3].map((dot) => (
                        <div
                          key={dot}
                          className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
                          style={{ animationDelay: `${dot * 0.2}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl border border-blue-500/20">
            <Package className="w-6 h-6 text-blue-400" />
            <span className="text-slate-300 text-lg">
              {isAr ? (
                <>
                  <strong className="text-white">1000+ منتج</strong> متاح للطلب المباشر
                </>
              ) : (
                <>
                  <strong className="text-white">1000+ products</strong> available for direct order
                </>
              )}
            </span>
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
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}