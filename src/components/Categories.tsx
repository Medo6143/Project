import { Settings, Car, Zap, Disc, Wrench, Package } from 'lucide-react';

const categories = [
  {
    icon: Settings,
    title: 'المحركات',
    title_en: 'Engines',
    description: 'محركات كاملة وقطع غيار المحركات',
  },
  {
    icon: Car,
    title: 'الهياكل',
    title_en: 'Body Parts',
    description: 'هياكل وأبواب وصدامات',
  },
  {
    icon: Zap,
    title: 'الكهرباء',
    title_en: 'Electrical',
    description: 'قطع كهربائية وإلكترونية',
  },
  {
    icon: Disc,
    title: 'الفرامل',
    title_en: 'Brakes',
    description: 'منظومة الفرامل الكاملة',
  },
  {
    icon: Wrench,
    title: 'السمكرة',
    title_en: 'Body Repair',
    description: 'معدات وقطع السمكرة',
  },
  {
    icon: Package,
    title: 'قطع عامة',
    title_en: 'General Parts',
    description: 'جميع قطع الغيار الأخرى',
  },
];

export default function Categories() {
  return (
    <section id="categories" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20 w-40 h-40 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="text-blue-400">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            فئات قطع الغيار
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-600 hover:border-blue-500 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-transparent transition-all duration-300"></div>

                <div className="relative z-10">
                  <div className="mb-6 inline-block p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                    <Icon className="w-12 h-12 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-blue-300 text-sm mb-3">{category.title_en}</p>
                  <p className="text-slate-300">{category.description}</p>
                </div>

                <div className="absolute -bottom-10 -right-10 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon className="w-full h-full text-blue-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
