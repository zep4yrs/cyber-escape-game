import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { GLOSSARY, MODULES } from '../content/modules';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function GlossaryPage() {
  const { t, pick } = useLang();
  useDocumentTitle(t('glossary.title'));
  const [query, setQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY.filter((entry) => {
      if (moduleFilter !== 'all' && entry.moduleId !== moduleFilter) return false;
      if (!q) return true;
      const haystack = `${pick(entry.term)} ${pick(entry.definition)}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, moduleFilter, pick]);

  return (
    <div className="glossarypage shell">
      <header className="pagehead">
        <p className="eyebrow">{t('glossary.eyebrow')}</p>
        <h1>{t('glossary.title')}</h1>
        <p className="lede">{t('glossary.lede')}</p>
      </header>

      <div className="glossary-tools">
        <label className="glossary-search">
          <span className="sr-only">{t('glossary.search')}</span>
          <input
            className="input"
            type="search"
            value={query}
            placeholder={t('glossary.search')}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="glossary-filters" role="group" aria-label={t('module.contents')}>
          <button
            type="button"
            className={`chip${moduleFilter === 'all' ? ' is-active' : ''}`}
            aria-pressed={moduleFilter === 'all'}
            onClick={() => setModuleFilter('all')}
          >
            {t('glossary.all')}
          </button>
          {MODULES.map((module) => (
            <button
              key={module.id}
              type="button"
              className={`chip${moduleFilter === module.id ? ' is-active' : ''}`}
              aria-pressed={moduleFilter === module.id}
              onClick={() => setModuleFilter(module.id)}
            >
              <span className="mono">{module.code}</span>
              {pick(module.title)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="glossary-empty muted">{t('glossary.empty')}</p>
      ) : (
        <dl className="glossary-list">
          {filtered.map((entry) => (
            <div key={entry.id} className="glossary-item" id={entry.id}>
              <dt>
                <span className="glossary-item__term">{pick(entry.term)}</span>
                <Link className="glossary-item__module tag" to={`/modules/${entry.moduleId}`}>
                  {entry.moduleCode} · {pick(entry.moduleTitle)}
                </Link>
              </dt>
              <dd>{pick(entry.definition)}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
