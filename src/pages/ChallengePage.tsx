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
        <p className="hero__coords">
          <span>OPS // CHALLENGE</span>
          <span>
            TIME <b>30:00</b>
          </span>
          <span>
            BEST <b>{progress.challenge.bestScore || '—'}</b>
          </span>
        </p>
        <p className="eyebrow">{t('challenge.eyebrow')}</p>
        <h1 className="challengepage__title">{t('challenge.title')}</h1>
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
          <div className="challenge-gate__head">
            <p className="mono challenge-gate__label" id="challenge-rules">
              {t('challenge.eyebrow')} / BRIEFING
            </p>
            <span className="ops-chip">
              <span className="ops-dot" />
              STANDBY
            </span>
          </div>
          <div className="telemetry telemetry--gate">
            <div className="telemetry__cell">
              <span>TIME LIMIT</span>
              <b>30:00</b>
            </div>
            <div className="telemetry__cell">
              <span>STAGES</span>
              <b>6</b>
            </div>
            <div className="telemetry__cell">
              <span>FREE ATTEMPTS</span>
              <b>2</b>
            </div>
            <div className="telemetry__cell">
              <span>HINTS</span>
              <b>3</b>
            </div>
          </div>
          <ul className="challenge-gate__list">
            <li>
              <span className="challenge-gate__icon" aria-hidden="true">
                <ModuleIcon icon="password" size={20} />
              </span>
              <span>
                <strong>{t('challenge.title')}</strong>
                <span className="muted">{t('challenge.desc')}</span>
              </span>
            </li>
            <li>
              <span className="challenge-gate__icon" aria-hidden="true">
                <ModuleIcon icon="response" size={20} />
              </span>
              <span>
                <strong>{t('game.nudge')}</strong>
                <span className="muted">{t('game.hintCost')}</span>
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
