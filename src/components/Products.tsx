import { Flag } from 'lucide-react';

const products = [
  {
    title: 'قطع أمريكي',
    title_en: 'American Parts',
    description: 'قطع غيار أصلية وتجارية للسيارات الأمريكية',
    gradient: 'from-blue-600 to-blue-800',
    flag: '🇺🇸',
  },
  {
    title: 'قطع ياباني',
    title_en: 'Japanese Parts',
    description: 'قطع غيار أصلية وتجارية للسيارات اليابانية',
    gradient: 'from-red-600 to-red-800',
    flag: '🇯🇵',
  },
  {
    title: 'قطع كوري',
    title_en: 'Korean Parts',
    description: 'قطع غيار أصلية وتجارية للسيارات الكورية',
    gradient: 'from-slate-600 to-slate-800',
    flag: '🇰🇷',
  },
  {
    title: 'قطع مستعملة',
    title_en: 'Used Parts',
    description: 'قطع غيار مستعملة بحالة ممتازة',
    gradient: 'from-green-600 to-green-800',
    flag: '♻️',
  },
];

export default function Products() {
  return (
    <section id="products" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-10 left-20 w-48 h-48 animate-spin-reverse">
          <svg viewBox="0 0 100 100" className="text-slate-400">
            <path d="M50,5 L60,35 L90,40 L65,60 L75,95 L50,75 L25,95 L35,60 L10,40 L40,35 Z"
                  fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            منتجاتنا
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">نوفر جميع أنواع قطع الغيار لمختلف السيارات</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600 hover:border-blue-500 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-20 transition-all duration-300`}></div>

              <div className="relative z-10 p-8">
                <div className="text-6xl mb-6 text-center">{product.flag}</div>

                <h3 className="text-2xl font-bold text-white mb-2 text-center">{product.title}</h3>
                <p className="text-blue-300 text-sm mb-4 text-center">{product.title_en}</p>
                <p className="text-slate-300 text-center">{product.description}</p>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                <Flag className="w-full h-full text-blue-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
