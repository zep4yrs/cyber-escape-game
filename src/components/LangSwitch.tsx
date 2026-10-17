import { useLang } from '../i18n/LangContext';
import { LANGS, type Lang } from '../content/types';

const LABEL: Record<Lang, string> = { zh: '中文', en: 'EN', fr: 'FR' };
const NAME: Record<Lang, string> = { zh: '中文', en: 'English', fr: 'Français' };

export function LangSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="langswitch" role="group" aria-label={t('a11y.lang')}>
      {LANGS.map((code, index) => (
        <span key={code} className="langswitch__item">
          {index > 0 ? (
            <span className="langswitch__sep" aria-hidden="true">
              /
            </span>
          ) : null}
          <button
            type="button"
            className={`langswitch__btn${lang === code ? ' is-active' : ''}`}
            aria-pressed={lang === code}
            aria-label={NAME[code]}
            lang={code === 'zh' ? 'zh-CN' : code}
            onClick={() => setLang(code)}
          >
            {LABEL[code]}
          </button>
        </span>
      ))}
    </div>
  );
}
