import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { useProgress } from '../lib/ProgressContext';
import { MODULES, getModule } from '../content/modules';
import { ENIGMAS } from '../content/enigmas';
import { ModuleIcon } from '../components/ModuleIcon';
import { RichBlocks } from '../components/RichBlocks';
import { Quiz } from '../components/Quiz';
import { EnigmaPlayer } from '../components/game/EnigmaPlayer';
import type { ConceptLesson, ExampleLesson, GameLesson, Lesson } from '../content/types';
import { NotFoundPage } from './NotFoundPage';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function ModulePage() {
  const { moduleId } = useParams();
  const module = getModule(moduleId);
  if (!module) return <NotFoundPage />;
  return <ModuleContent />;
}

function ModuleContent() {
  const { moduleId } = useParams();
  const module = getModule(moduleId)!;
  const { t, pick } = useLang();
  const { moduleProgress, isLessonDone, markLessonDone, recordQuiz, recordGame, setLastVisited } =
    useProgress();
  const progress = moduleProgress(module);
  useDocumentTitle(pick(module.title));
  const [activeId, setActiveId] = useState<string | undefined>(module.lessons[0]?.id);

  useEffect(() => {
    const initial =
      module.lessons.find((lesson) => !isLessonDone(module.id, lesson.id)) ?? module.lessons[0];
    setLastVisited(module.id, initial?.id ?? '');
    // 只在进入模块时记录一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module.id]);

  useEffect(() => {
    const sections = module.lessons
      .map((lesson) => document.getElementById(`lesson-${lesson.id}`))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id.replace('lesson-', ''));
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.4, 0.8] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [module.id, module.lessons]);

  const index = MODULES.findIndex((item) => item.id === module.id);
  const prevModule = index > 0 ? MODULES[index - 1] : undefined;
  const nextModule = index < MODULES.length - 1 ? MODULES[index + 1] : undefined;

  return (
    <article className="modulepage">
      <div className="shell">
        <nav className="crumbs" aria-label={t('common.backHome')}>
          <Link to="/">{t('common.backHome')}</Link>
          <span aria-hidden="true">/</span>
          <span className="mono">{module.code}</span>
        </nav>

        <header className="modulehead">
          <div className="modulehead__main">
            <p className="eyebrow">
              {module.code} · {t('common.module')} {String(module.order).padStart(2, '0')}
            </p>
            <h1>{pick(module.title)}</h1>
            <p className="lede">{pick(module.subtitle)}</p>
            <p className="modulehead__desc">{pick(module.description)}</p>
            <div className="modulehead__meta">
              <span className="tag">
                <ModuleIcon icon={module.icon} size={16} />
                {module.icon === 'password'
                  ? 'AUTH'
                  : module.icon === 'mail'
                    ? 'MAIL'
                    : module.icon === 'cipher'
                      ? 'CRYPTO'
                      : module.icon === 'wifi'
                        ? 'WIFI'
                        : module.icon === 'social'
                          ? 'SOCIAL'
                          : 'RESPONSE'}
              </span>
              <span className="tag">{t('common.lessons', { n: module.lessons.length })}</span>
              <span className="tag">{t('common.minutes', { n: module.estimatedMinutes })}</span>
              <span className="tag tag--brand">{progress.percent}%</span>
            </div>
            <div className="bar bar--head" aria-hidden="true">
              <span className="bar__fill" style={{ width: `${progress.percent}%` }} />
            </div>
          </div>

          <aside className="outcomes card" aria-labelledby="outcomes-title">
            <p className="mono outcomes__title" id="outcomes-title">
              {t('module.objectives')}
            </p>
            <ul>
              {module.outcomes.map((item, i) => (
                <li key={i}>
                  <span className="outcomes__check" aria-hidden="true">
                    ✓
                  </span>
                  {pick(item)}
                </li>
              ))}
            </ul>
          </aside>
        </header>

        <div className="modulegrid">
          <nav className="toc" aria-label={t('module.contents')}>
            <div className="toc__inner">
              <p className="mono toc__label">{t('module.contents')}</p>
              <ol className="toc__list">
                {module.lessons.map((lesson, i) => (
                  <li key={lesson.id}>
                    <a
                      href={`#lesson-${lesson.id}`}
                      className={`toc__link${activeId === lesson.id ? ' is-active' : ''}`}
                      aria-current={activeId === lesson.id ? 'location' : undefined}
                      onClick={() => setLastVisited(module.id, lesson.id)}
                    >
                      <span className="toc__num mono">{String(i + 1).padStart(2, '0')}</span>
                      <span className="toc__text">{pick(lesson.title)}</span>
                      {isLessonDone(module.id, lesson.id) ? (
                        <span className="toc__check" aria-label={t('module.lessonDone')}>
                          ✓
                        </span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="toc__footer">
                <span className="mono">{t('common.progress')}</span>
                <span className="mono">
                  {progress.done} / {progress.total}
                </span>
              </div>
              <div className="bar" aria-hidden="true">
                <span className="bar__fill" style={{ width: `${progress.percent}%` }} />
              </div>
            </div>
          </nav>

          <div className="modulebody">
            {module.lessons.map((lesson, i) => (
              <LessonSection
                key={lesson.id}
                moduleId={module.id}
                lesson={lesson}
                index={i}
                done={isLessonDone(module.id, lesson.id)}
                onDone={() => markLessonDone(module.id, lesson.id)}
                onQuizQuestion={(questionId) => recordQuiz(module.id, questionId, true)}
                onGameSolved={(result) => {
                  markLessonDone(module.id, lesson.id);
                  recordGame(module.id, (lesson as GameLesson).enigmaKey, result);
                }}
              />
            ))}

            <nav className="modulenav" aria-label={t('nav.path')}>
              {prevModule ? (
                <Link className="modulenav__item" to={`/modules/${prevModule.id}`}>
                  <span className="mono">← {t('common.module')}</span>
                  <span>{pick(prevModule.title)}</span>
                </Link>
              ) : (
                <Link className="modulenav__item" to="/">
                  <span className="mono">← {t('common.backHome')}</span>
                  <span>{t('home.path.title')}</span>
                </Link>
              )}
              {nextModule ? (
                <Link className="modulenav__item modulenav__item--next" to={`/modules/${nextModule.id}`}>
                  <span className="mono">{t('common.module')} →</span>
                  <span>{pick(nextModule.title)}</span>
                </Link>
              ) : (
                <Link className="modulenav__item modulenav__item--next" to="/challenge">
                  <span className="mono">{t('challenge.eyebrow')} →</span>
                  <span>{t('challenge.title')}</span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </article>
  );
}

function LessonSection({
  moduleId,
  lesson,
  index,
  done,
  onDone,
  onQuizQuestion,
  onGameSolved
}: {
  moduleId: string;
  lesson: Lesson;
  index: number;
  done: boolean;
  onDone: () => void;
  onQuizQuestion: (questionId: string) => void;
  onGameSolved: (result: { solved: boolean; revealed: boolean }) => void;
}) {
  const { t, pick } = useLang();

  return (
    <section
      className={`lesson lesson--${lesson.type}${done ? ' is-done' : ''}`}
      id={`lesson-${lesson.id}`}
      aria-labelledby={`lesson-${lesson.id}-title`}
      data-module={moduleId}
    >
      <header className="lesson__head">
        <span className="mono lesson__num">LESSON {String(index + 1).padStart(2, '0')}</span>
        <h2 id={`lesson-${lesson.id}-title`} className="lesson__title">
          {pick(lesson.title)}
        </h2>
        <span className="tag">{t('common.minutes', { n: lesson.minutes })}</span>
        {done ? <span className="tag tag--ok">{t('module.lessonDone')}</span> : null}
      </header>

      {lesson.type === 'concept' ? (
        <ConceptBody lesson={lesson} onDone={onDone} done={done} />
      ) : lesson.type === 'example' ? (
        <ExampleBody lesson={lesson} onDone={onDone} done={done} />
      ) : lesson.type === 'practice' ? (
        <Quiz lesson={lesson} onQuestionSolved={onQuizQuestion} onAllSolved={onDone} />
      ) : (
        <GameBody lesson={lesson} onSolved={onGameSolved} done={done} />
      )}
    </section>
  );
}

function Objectives({ items }: { items: ConceptLesson['objectives'] }) {
  const { t, pick } = useLang();
  return (
    <aside className="objectives panel" aria-label={t('lesson.objectives')}>
      <p className="mono objectives__label">{t('lesson.objectives')}</p>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{pick(item)}</li>
        ))}
      </ul>
    </aside>
  );
}

function CompleteButton({ done, onDone }: { done: boolean; onDone: () => void }) {
  const { t } = useLang();
  if (done) return <p className="tag tag--ok lesson__done">{t('module.lessonDone')}</p>;
  return (
    <button type="button" className="btn btn--ghost btn--sm lesson__done" onClick={onDone}>
      {t('module.markDone')}
    </button>
  );
}

function ConceptBody({
  lesson,
  done,
  onDone
}: {
  lesson: ConceptLesson;
  done: boolean;
  onDone: () => void;
}) {
  return (
    <div className="lesson__body">
      <Objectives items={lesson.objectives} />
      <RichBlocks blocks={lesson.blocks} />
      <CompleteButton done={done} onDone={onDone} />
    </div>
  );
}

function ExampleBody({
  lesson,
  done,
  onDone
}: {
  lesson: ExampleLesson;
  done: boolean;
  onDone: () => void;
}) {
  const { pick } = useLang();
  return (
    <div className="lesson__body">
      <p className="prose__lead">{pick(lesson.intro)}</p>
      <ol className="exsteps">
        {lesson.steps.map((step, i) => (
          <li key={i} className="exsteps__item">
            <span className="exsteps__num mono">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="exsteps__title">{pick(step.title)}</h3>
              <p>{pick(step.body)}</p>
            </div>
          </li>
        ))}
      </ol>
      {lesson.closing ? <aside className="callout callout--tip">{pick(lesson.closing)}</aside> : null}
      <CompleteButton done={done} onDone={onDone} />
    </div>
  );
}

function GameBody({
  lesson,
  done,
  onSolved
}: {
  lesson: GameLesson;
  done: boolean;
  onSolved: (result: { solved: boolean; revealed: boolean }) => void;
}) {
  const { t, pick } = useLang();
  const enigma = ENIGMAS[lesson.enigmaKey];
  return (
    <div className="lesson__body">
      <p className="prose__lead">{pick(lesson.intro)}</p>
      {done ? <p className="tag tag--ok">{t('module.lessonDone')}</p> : null}
      {enigma ? (
        <EnigmaPlayer enigma={enigma} onSolved={onSolved} hideTitle />
      ) : (
        <p className="callout callout--warn">{t('game.wrong')}</p>
      )}
    </div>
  );
}
