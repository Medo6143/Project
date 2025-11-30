import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function CarAnimation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { language } = useLanguage();
  const isAr = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-10 left-0 right-0 pointer-events-none z-50 hidden md:block">
      <div
        className="relative transition-all duration-300 ease-out"
        style={isAr ? { right: `${scrollProgress}%` } : { left: `${scrollProgress}%` }}
      >
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-blue-500 blur-xl opacity-30 animate-pulse"></div>

          <svg
            viewBox="0 0 200 100"
            className="w-full h-full drop-shadow-2xl"
            style={isAr ? { transform: 'scaleX(-1)' } : undefined}
          >
            <defs>
              <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>

            <ellipse cx="60" cy="75" rx="15" ry="15" fill="#334155" />
            <ellipse cx="140" cy="75" rx="15" ry="15" fill="#334155" />
            <ellipse cx="60" cy="75" rx="8" ry="8" fill="#64748b" />
            <ellipse cx="140" cy="75" rx="8" ry="8" fill="#64748b" />

            <path
              d="M 30 70 L 20 55 Q 20 40 35 40 L 70 40 L 85 25 Q 90 20 100 20 L 135 20 Q 145 20 150 30 L 165 50 Q 170 55 170 60 L 170 70 Z"
              fill="url(#carGradient)"
              stroke="#1e40af"
              strokeWidth="2"
            />

            <rect x="50" y="30" width="25" height="15" fill="#93c5fd" opacity="0.6" rx="2" />
            <rect x="110" y="25" width="30" height="20" fill="#93c5fd" opacity="0.6" rx="2" />

            <ellipse cx="155" cy="50" rx="8" ry="5" fill="#fbbf24" opacity="0.8" />
          </svg>
        </div>
      </div>
    </div>
  );
}
