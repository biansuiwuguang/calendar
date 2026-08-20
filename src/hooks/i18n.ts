import { useState, useRef } from 'react';
import en from '../i18n/en.json' with { type: 'json' };
import zh from '../i18n/zh.json' with { type: 'json' };
import ja from '../i18n/ja.json' with { type: 'json' };
import ru from '../i18n/ru.json' with { type: 'json' };
type Locale = 'en' | 'zh' | 'ja' | 'ru';
const map: Record<string, Record<string, string>>  = { en, zh, ja, ru };
const STORAGE_KEY = 'userCustomLanguage';

function getInitialLocale(): Locale {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && Object.hasOwn(map, saved)) return saved as Locale;
  const detected = navigator.language.slice(0, 2);
  return Object.hasOwn(map, detected) ? detected as Locale : 'en';
}

export function useI18n() {
  const langRef = useRef<Locale>(getInitialLocale());
  const [data, setData] = useState(map[langRef.current]);

  function setLocale(locale: Locale) {
    if (!Object.hasOwn(map, locale)) return;
    langRef.current = locale;
    setData(map[locale]);
    try { localStorage.setItem(STORAGE_KEY, locale); } catch {}
  }

  function getLocale(): Locale {
    return langRef.current;
  }

  function t(key: string) {
    return data[key] ?? map['en'][key] ?? key;
  }

  return { t, setLocale, getLocale };
}
