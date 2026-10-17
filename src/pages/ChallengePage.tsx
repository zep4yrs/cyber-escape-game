import { useState } from 'react';
import { useLang } from '../i18n/LangContext';
import { useProgress } from '../lib/ProgressContext';
import { ChallengeRunner } from '../components/game/ChallengeRunner';
import { ModuleIcon } from '../components/ModuleIcon';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function ChallengePage() {
  const { t } = useLang();
  useDocumentTitle(t('challenge.title'));
  const { progress } = useProgress();
  const [started, setStarted] = useState(false);

  return (
    <div className="challengepage shell">
      <header className="pagehead">
        <p className="eyebrow">{t('challenge.eyebrow')}</p>
        <h1>{t('challenge.title')}</h1>
        <p className="lede">{t('challenge.desc')}</p>
        {progress.challenge.bestScore > 0 ? (
          <p className="tag tag--brand">
            {t('challenge.score')} · BEST {progress.challenge.bestScore}
          </p>
        ) : null}
      </header>

      {started ? (
        <ChallengeRunner onFinish={() => undefined} />
      ) : (
        <section className="challenge-gate card" aria-labelledby="challenge-rules">
          <p className="mono challenge-gate__label" id="challenge-rules">
            {t('challenge.results')} · 6
          </p>
          <ul className="challenge-gate__list">
            <li>
              <span className="challenge-gate__icon" aria-hidden="true">
                <ModuleIcon icon="password" size={20} />
              </span>
              <span>
                <strong>{t('challenge.title')}</strong>
                <span className="muted"> · {t('challenge.desc')}</span>
              </span>
            </li>
            <li>
              <span className="challenge-gate__icon" aria-hidden="true">
                <ModuleIcon icon="response" size={20} />
              </span>
              <span>
                <strong>{t('game.nudge')}</strong>
                <span className="muted"> · {t('game.hintCost')}</span>
              </span>
            </li>
          </ul>
          <button className="btn challenge-gate__start" type="button" onClick={() => setStarted(true)}>
            {t('challenge.start')}
            <span aria-hidden="true">→</span>
          </button>
        </section>
      )}
    </div>
  );
}
