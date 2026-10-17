import { useEffect } from 'react';
import { useLang } from '../i18n/LangContext';

/** 给每个路由设置唯一标题：页面名 · 品牌名 */
export function useDocumentTitle(title: string) {
  const { t } = useLang();
  useEffect(() => {
    document.title = `${title} · ${t('brand.name')}`;
    return () => {
      document.title = t('brand.name');
    };
  }, [title, t]);
}
