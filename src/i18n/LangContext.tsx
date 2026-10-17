import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { LANGS, type L, type Lang } from '../content/types';
import { dict } from './dict';

const STORAGE_KEY = 'dl:lang';

function readLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LANGS.includes(saved as Lang)) return saved as Lang;
  } catch {
    /* ignore */
  }
  return 'zh';
}

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  pick: (value: L) => string;
  pickList: (value: Record<Lang, string[]>) => string[];
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const text = dict[lang][key] ?? dict.zh[key] ?? key;
      if (!vars) return text;
      return text.replace(/\{(\w+)\}/g, (match, name: string) =>
        Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match
      );
    },
    [lang]
  );

  const pick = useCallback((value: L) => value[lang] ?? value.zh, [lang]);
  const pickList = useCallback((value: Record<Lang, string[]>) => value[lang] ?? value.zh, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(LANGS.includes(next) ? next : 'zh');
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, t, pick, pickList }),
    [lang, setLang, t, pick, pickList]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
