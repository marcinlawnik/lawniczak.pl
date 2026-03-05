import { en } from './en';
import { pl } from './pl';
import type { TranslationKey } from './en';

export type Lang = 'en' | 'pl';

const translations = { en, pl } as const;

export function getLangFromUrl(url: URL): Lang {
  const [, firstSegment] = url.pathname.split('/');
  if (firstSegment === 'pl') return 'pl';
  return 'en';
}

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return translations[lang][key] ?? translations['en'][key];
  };
}
