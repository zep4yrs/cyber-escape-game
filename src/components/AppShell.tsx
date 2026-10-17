import { Link, NavLink, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useLang } from '../i18n/LangContext';
import { LangSwitch } from './LangSwitch';
import { BrandMark } from './BrandMark';

const navItems = [
  { to: '/', key: 'nav.path', end: true },
  { to: '/challenge', key: 'nav.challenge', end: false },
  { to: '/glossary', key: 'nav.glossary', end: false }
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useLang();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <a className="skip-link" href="#main">
        {t('a11y.skip')}
      </a>
      <header className="topbar">
        <div className="shell topbar__inner">
          <Link className="brand" to="/" aria-label={t('brand.name')}>
            <BrandMark />
            <span className="brand__text">
              <span className="brand__name">{t('brand.name')}</span>
              <span className="brand__tag mono">{t('brand.tagline')}</span>
            </span>
          </Link>
          <nav className="topnav" aria-label={t('nav.path')}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `topnav__link${isActive ? ' is-active' : ''}`}
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>
          <LangSwitch />
        </div>
        {!isHome ? <div className="topbar__rule" /> : null}
      </header>
      <main id="main" className="app-main">
        {children}
      </main>
      <footer className="footer">
        <div className="shell footer__inner">
          <div className="footer__brand">
            <BrandMark />
            <p className="footer__note">{t('footer.note')}</p>
          </div>
          <nav className="footer__nav" aria-label={t('nav.path')}>
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <p className="footer__meta mono">{t('footer.resetHint')}</p>
        </div>
        <div className="shell footer__bottom">
          <span className="mono">OP-2026 · LEARNING PATH</span>
        </div>
      </footer>
    </>
  );
}
