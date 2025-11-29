import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="text-blue-400">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="10" r="5" fill="currentColor" />
            <circle cx="90" cy="50" r="5" fill="currentColor" />
            <circle cx="50" cy="90" r="5" fill="currentColor" />
            <circle cx="10" cy="50" r="5" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 w-48 h-48 animate-spin-reverse">
          <svg viewBox="0 0 100 100" className="text-slate-400">
            <path d="M50,5 L60,35 L90,40 L65,60 L75,95 L50,75 L25,95 L35,60 L10,40 L40,35 Z"
                  fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 animate-spin-slow opacity-50">
          <svg viewBox="0 0 100 100" className="text-blue-300">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="50" cy="15" r="6" fill="currentColor" />
            <circle cx="85" cy="50" r="6" fill="currentColor" />
            <circle cx="50" cy="85" r="6" fill="currentColor" />
            <circle cx="15" cy="50" r="6" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30 animate-pulse"></div>
            <h1 className="relative text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-slate-300 to-blue-400 bg-clip-text text-transparent">
              MAJD PARTS
            </h1>
          </div>
        </div>

        <p className="text-xl md:text-3xl text-slate-200 mb-4 font-light tracking-wide">
          وجهتك الأولى لقطع غيار وهياكل السيارات
        </p>
        <p className="text-lg md:text-2xl text-slate-300 mb-12 font-light">
          الجديدة والمستعملة
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            اطلب الآن
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#categories"
            className="px-8 py-4 bg-slate-700/50 backdrop-blur-sm text-white rounded-lg font-semibold text-lg border-2 border-slate-500 hover:border-blue-400 transition-all duration-300 hover:scale-105"
          >
            تصفح المنتجات
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronRight className="w-8 h-8 text-blue-400 rotate-90" />
      </div>
    </section>
  );
}
