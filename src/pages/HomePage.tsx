import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { useProgress } from '../lib/ProgressContext';
import { MODULES, TOTAL_LESSONS } from '../content/modules';
import { ModuleIcon } from '../components/ModuleIcon';
import { ProgressRing } from '../components/ProgressRing';
import type { Module } from '../content/types';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function HomePage() {
  const { t, pick } = useLang();
  const { progress, moduleProgress, overall } = useProgress();
  useDocumentTitle(t('brand.tagline'));
  const summary = overall(MODULES);
  const started = summary.done > 0;
  const firstModule = MODULES[0];

  if (!firstModule) {
    return (
      <div className="shell section">
        <p className="muted">课程内容尚未加载。</p>
      </div>
    );
  }

  const lastModule = MODULES.find((module) => module.id === progress.lastModuleId);
  const lastLesson = lastModule?.lessons.find((lesson) => lesson.id === progress.lastLessonId);
  const resumeModule = lastModule ?? MODULES.find((module) => !moduleProgress(module).completed) ?? firstModule;
  const resumeLesson = resumeModule.lessons.find(
    (lesson) => !progress.modules[resumeModule.id]?.lessonsDone[lesson.id]
  );
  const resumeTo = `/modules/${resumeModule.id}${
    lastLesson && lastModule?.id === resumeModule.id
      ? `#lesson-${lastLesson.id}`
      : resumeLesson
        ? `#lesson-${resumeLesson.id}`
        : ''
  }`;

  return (
    <div className="home">
      <section className="hero">
        <div className="shell hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">{t('home.eyebrow')}</p>
            <h1 className="hero__title">{t('home.title')}</h1>
            <p className="lede hero__lede">{t('home.lede')}</p>
            <div className="row hero__actions">
              <Link className="btn" to={resumeTo}>
                {started ? t('home.cta.continue') : t('home.cta.start')}
                <span aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn--ghost" to="/challenge">
                {t('nav.challenge')}
              </Link>
            </div>
            <p className="hero__meta mono">
              {MODULES.length} MODULES · {TOTAL_LESSONS} LESSONS · ZH / EN / FR
            </p>
          </div>

          <aside className="hero__panel card" aria-labelledby="progress-title">
            <div className="hero__panel-head">
              <p className="mono" id="progress-title">
                {t('home.meta.progress')}
              </p>
              <span className="tag tag--brand">
                {summary.completedModules} / {summary.totalModules} {t('home.meta.modules')}
              </span>
            </div>
            <div className="hero__panel-body">
              <ProgressRing value={summary.percent} label={t('home.meta.progress')} />
              <dl className="hero__stats">
                <div>
                  <dt className="mono">{t('home.meta.done')}</dt>
                  <dd>
                    {summary.done}
                    <span className="muted"> / {summary.total}</span>
                  </dd>
                </div>
                <div>
                  <dt className="mono">MODULES</dt>
                  <dd>
                    {summary.completedModules}
                    <span className="muted"> / {summary.totalModules}</span>
                  </dd>
                </div>
              </dl>
            </div>
            {started ? (
              <p className="hero__resume muted">
                {t('common.continue')}：{lastModule ? pick(lastModule.title) : pick(resumeModule.title)}
                {lastLesson ? ` · ${pick(lastLesson.title)}` : ''}
              </p>
            ) : (
              <p className="hero__resume muted">{pick(firstModule.subtitle)}</p>
            )}
          </aside>
        </div>
      </section>

      <section className="section shell" aria-labelledby="path-title">
        <header className="section-head">
          <h2 id="path-title">{t('home.path.title')}</h2>
          <p className="muted section-head__sub">{t('home.path.sub')}</p>
        </header>
        <ol className="pathlist">
          {MODULES.map((module) => (
            <ModuleRow key={module.id} module={module} />
          ))}
        </ol>
      </section>

      <section className="section shell" aria-labelledby="how-title">
        <header className="section-head">
          <h2 id="how-title">{t('home.how.title')}</h2>
        </header>
        <div className="howgrid">
          {[1, 2, 3].map((step) => (
            <article key={step} className="howcard">
              <span className="howcard__num mono">0{step}</span>
              <h3>{t(`home.how.${step}.title`)}</h3>
              <p className="muted">{t(`home.how.${step}.body`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="glossary-teaser card">
          <div>
            <p className="eyebrow">{t('home.glossary.title')}</p>
            <p className="glossary-teaser__body">{t('home.glossary.body')}</p>
          </div>
          <Link className="btn btn--ghost" to="/glossary">
            {t('home.glossary.cta')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

function ModuleRow({ module }: { module: Module }) {
  const { t, pick } = useLang();
  const { moduleProgress } = useProgress();
  const progress = moduleProgress(module);
  const status = progress.completed
    ? t('common.completed')
    : progress.started
      ? t('common.inProgress')
      : t('common.notStarted');

  return (
    <li>
      <Link className="modrow" to={`/modules/${module.id}`}>
        <span className="modrow__code mono">{module.code}</span>
        <span className="modrow__icon">
          <ModuleIcon icon={module.icon} />
        </span>
        <span className="modrow__body">
          <span className="modrow__title">{pick(module.title)}</span>
          <span className="modrow__sub muted">{pick(module.subtitle)}</span>
        </span>
        <span className="modrow__meta">
          <span className="tag">{t('common.lessons', { n: module.lessons.length })}</span>
          <span className="tag">{t('common.minutes', { n: module.estimatedMinutes })}</span>
          <span className={`tag ${progress.completed ? 'tag--ok' : progress.started ? 'tag--brand' : ''}`}>{status}</span>
        </span>
        <span className="modrow__progress">
          <span className="bar" aria-hidden="true">
            <span className="bar__fill" style={{ width: `${progress.percent}%` }} />
          </span>
          <span className="modrow__percent mono">{progress.percent}%</span>
        </span>
        <span className="modrow__arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </li>
  );
}
