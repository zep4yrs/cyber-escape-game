import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { useProgress } from '../lib/ProgressContext';
import { MODULES, TOTAL_LESSONS } from '../content/modules';
import { ModuleCard } from '../components/motion/ModuleCard';
import { ThunderRing } from '../components/motion/ThunderRing';
import { CountUp } from '../components/motion/CountUp';
import { Reveal } from '../components/motion/Reveal';
import { Spotlight } from '../components/fx/Spotlight';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function HomePage() {
  const { t, pick } = useLang();
  const { progress, moduleProgress, overall } = useProgress();
  const heroRef = useRef<HTMLDivElement>(null);
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

  const titleLines = t('home.title').split('\n');
  const tickerItems = [...MODULES, ...MODULES];

  return (
    <div className="home">
      <section className="hero" ref={heroRef}>
        <Spotlight targetRef={heroRef} />
        <div className="shell hero__inner">
          <div className="hero__copy">
            <div className="hero__coords">
              <span>ARCHIVE // OP-2026</span>
              <span>
                SEC <b>PUBLIC</b>
              </span>
              <span>
                BUILD <b>v2.0</b>
              </span>
            </div>
            <p className="eyebrow">{t('home.eyebrow')}</p>
            <h1 className="hero__title">
              {titleLines[0]}
              {titleLines.length > 1 ? (
                <>
                  <br />
                  <span className="hero__mark">{titleLines.slice(1).join(' ')}</span>
                </>
              ) : null}
            </h1>
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
            <div className="hero__badges">
              <span className="hero__badge">
                <i aria-hidden="true" />
                {MODULES.length} MODULES
              </span>
              <span className="hero__badge">
                <i aria-hidden="true" />
                {TOTAL_LESSONS} LESSONS
              </span>
              <span className="hero__badge">
                <i aria-hidden="true" />
                3 LANGS
              </span>
              <span className="hero__badge">
                <i aria-hidden="true" />
                30 MIN CHALLENGE
              </span>
            </div>
          </div>

          <aside className="hero__panel card" aria-labelledby="progress-title">
            <div className="hero__panel-label">
              <p className="mono" id="progress-title">
                {t('home.meta.progress')}
              </p>
              <span className="tag tag--brand">
                {summary.completedModules} / {summary.totalModules} {t('home.meta.modules')}
              </span>
            </div>
            <div className="hero__panel-body">
              <ThunderRing value={summary.percent} size={132} label={t('home.meta.progress')} />
            </div>
            <div className="telemetry">
              <div className="telemetry__cell">
                <span>{t('home.meta.done')}</span>
                <b>
                  <CountUp value={summary.done} />
                  <em>/{summary.total}</em>
                </b>
              </div>
              <div className="telemetry__cell">
                <span>MODULES</span>
                <b>
                  <CountUp value={summary.completedModules} />
                  <em>/{summary.totalModules}</em>
                </b>
              </div>
              <div className="telemetry__cell">
                <span>BEST RUN</span>
                <b>{progress.challenge.bestScore > 0 ? progress.challenge.bestScore : '—'}</b>
              </div>
              <div className="telemetry__cell">
                <span>LANGS</span>
                <b>3</b>
              </div>
            </div>
            <div className="hero__scan" />
            {started ? (
              <p className="hero__resume muted">
                {t('common.continue')}：<b>{lastModule ? pick(lastModule.title) : pick(resumeModule.title)}</b>
                {lastLesson ? ` · ${pick(lastLesson.title)}` : ''}
              </p>
            ) : (
              <p className="hero__resume muted">{pick(firstModule.subtitle)}</p>
            )}
          </aside>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {tickerItems.map((module, i) => (
            <span className="ticker__item" key={`${module.id}-${i}`}>
              <i />
              {pick(module.title)}
              <b>{module.code}</b>
            </span>
          ))}
        </div>
      </div>

      <section className="section shell" aria-labelledby="path-title">
        <header className="section-head">
          <h2 id="path-title">{t('home.path.title')}</h2>
          <p className="muted section-head__sub">{t('home.path.sub')}</p>
          <span className="section-head__code mono">
            PATH-01 / {String(MODULES.length).padStart(2, '0')}
          </span>
        </header>
        <ol className="pathlist">
          {MODULES.map((module, i) => {
            const p = moduleProgress(module);
            const status = p.completed
              ? t('common.completed')
              : p.started
                ? t('common.inProgress')
                : t('common.notStarted');
            return (
              <li key={module.id}>
                <Reveal delay={i * 60}>
                  <ModuleCard
                    module={module}
                    percent={p.percent}
                    statusLabel={status}
                    lessonsLabel={t('common.lessons', { n: module.lessons.length })}
                    minutesLabel={t('common.minutes', { n: module.estimatedMinutes })}
                    href={`/modules/${module.id}`}
                  />
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="section shell" aria-labelledby="how-title">
        <header className="section-head">
          <h2 id="how-title">{t('home.how.title')}</h2>
          <span className="section-head__code mono">PROTOCOL / 4 STEPS</span>
        </header>
        <div className="howgrid">
          {[1, 2, 3].map((step, i) => (
            <Reveal key={step} delay={i * 70}>
              <article className="howcard">
                <span className="howcard__num mono">0{step}</span>
                <h3>{t(`home.how.${step}.title`)}</h3>
                <p className="muted">{t(`home.how.${step}.body`)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section shell">
        <Reveal>
          <div className="glossary-teaser card">
            <div>
              <p className="glossary-teaser__prompt mono">$ access glossary --all</p>
              <p className="eyebrow">{t('home.glossary.title')}</p>
              <p className="glossary-teaser__body">{t('home.glossary.body')}</p>
            </div>
            <Link className="btn btn--ghost" to="/glossary">
              {t('home.glossary.cta')}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

