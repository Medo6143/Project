import { Award, Shield, Users, Clock } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'جودة عالية',
    description: 'نوفر قطع غيار أصلية وتجارية بأعلى معايير الجودة',
  },
  {
    icon: Shield,
    title: 'ضمان موثوق',
    description: 'جميع منتجاتنا مضمونة وموثوقة',
  },
  {
    icon: Users,
    title: 'خبرة طويلة',
    description: 'سنوات من الخبرة في مجال قطع غيار السيارات',
  },
  {
    icon: Clock,
    title: 'خدمة سريعة',
    description: 'توصيل سريع وخدمة عملاء متميزة',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="text-blue-400">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="10" r="5" fill="currentColor" />
            <circle cx="90" cy="50" r="5" fill="currentColor" />
            <circle cx="50" cy="90" r="5" fill="currentColor" />
            <circle cx="10" cy="50" r="5" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            من نحن
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto mb-6"></div>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            متجر MAJD PARTS هو وجهتك الموثوقة لجميع احتياجات قطع غيار السيارات. نوفر قطع غيار أصلية وتجارية للسيارات الأمريكية واليابانية والكورية، بالإضافة إلى قطع مستعملة بحالة ممتازة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group text-center p-8 bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600 hover:border-blue-500 transition-all duration-300 hover:scale-105"
              >
                <div className="mb-6 inline-block p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
