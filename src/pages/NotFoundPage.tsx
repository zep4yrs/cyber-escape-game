import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function NotFoundPage() {
  const { t } = useLang();
  useDocumentTitle(t('notFound.title'));
  return (
    <div className="notfound shell">
      <p className="eyebrow">404</p>
      <h1>{t('notFound.title')}</h1>
      <p className="lede">{t('notFound.body')}</p>
      <Link className="btn" to="/">
        {t('common.backHome')}
      </Link>
    </div>
  );
}
