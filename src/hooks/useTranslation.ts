import { useLanguage } from '../context/LanguageContext';

export function useTranslation(ar: string, en: string): string {
  const { isArabic } = useLanguage();
  return isArabic ? ar : en;
}

export function useTranslationObject<T extends Record<string, any>>(
  ar: T,
  en: T
): T {
  const { isArabic } = useLanguage();
  return isArabic ? ar : en;
}
