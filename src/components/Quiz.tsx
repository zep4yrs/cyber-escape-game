import { useState, type ReactNode } from 'react';
import type { PracticeLesson, QuizQuestion } from '../content/types';
import { useLang } from '../i18n/LangContext';

interface QuizProps {
  lesson: PracticeLesson;
  onQuestionSolved: (questionId: string, correct: boolean) => void;
  onAllSolved: () => void;
}

export function Quiz({ lesson, onQuestionSolved, onAllSolved }: QuizProps) {
  const { t, pick } = useLang();
  const [solved, setSolved] = useState<Record<string, boolean>>({});

  const handleSolved = (questionId: string) => {
    const next = { ...solved, [questionId]: true };
    setSolved(next);
    onQuestionSolved(questionId, true);
    if (Object.keys(next).length >= lesson.questions.length) onAllSolved();
  };

  const solvedCount = Object.keys(solved).length;

  return (
    <div className="quiz">
      {lesson.intro ? <p className="prose__lead">{pick(lesson.intro)}</p> : null}
      <ol className="quiz__list">
        {lesson.questions.map((question, index) => (
          <li key={question.id}>
            {solved[question.id] ? (
              <div className="quiz__item quiz__item--done">
                <p className="quiz__prompt">
                  <span className="quiz__index mono">{String(index + 1).padStart(2, '0')}</span>
                  {pick(question.prompt)}
                  <span className="tag tag--ok">{t('module.lessonDone')}</span>
                </p>
              </div>
            ) : question.kind === 'choice' ? (
              <ChoiceQuestion
                question={question}
                index={index}
                onSolved={() => handleSolved(question.id)}
              />
            ) : (
              <TextQuestion question={question} index={index} onSolved={() => handleSolved(question.id)} />
            )}
          </li>
        ))}
      </ol>
      {solvedCount >= lesson.questions.length ? (
        <p className="quiz__done tag tag--ok">{t('quiz.done')}</p>
      ) : (
        <p className="quiz__count muted">
          {solvedCount} / {lesson.questions.length}
        </p>
      )}
    </div>
  );
}

function QuestionHead({ index, children }: { index: number; children: ReactNode }) {
  return (
    <p className="quiz__prompt">
      <span className="quiz__index mono">{String(index + 1).padStart(2, '0')}</span>
      {children}
    </p>
  );
}

function ChoiceQuestion({
  question,
  index,
  onSolved
}: {
  question: Extract<QuizQuestion, { kind: 'choice' }>;
  index: number;
  onSolved: () => void;
}) {
  const { t, pick } = useLang();
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const check = () => {
    if (!selected) return;
    setResult(selected === question.correct ? 'correct' : 'wrong');
  };

  return (
    <div className={`quiz__item${result === 'correct' ? ' is-correct' : ''}`}>
      <QuestionHead index={index}>{pick(question.prompt)}</QuestionHead>
      <div className="quiz__options" role="radiogroup" aria-label={pick(question.prompt)}>
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`quiz__option${isSelected ? ' is-selected' : ''}`}
              data-state={result !== 'idle' && isSelected ? (result === 'correct' ? 'ok' : 'bad') : undefined}
              disabled={result === 'correct'}
              onClick={() => {
                setSelected(option.id);
                setResult('idle');
              }}
            >
              <span className="quiz__option-key mono">{option.id.toUpperCase()}</span>
              <span>{pick(option.label)}</span>
            </button>
          );
        })}
      </div>

      {result === 'idle' ? (
        <div className="quiz__actions">
          <button type="button" className="btn btn--sm" disabled={!selected} onClick={check}>
            {t('quiz.check')}
          </button>
        </div>
      ) : result === 'wrong' ? (
        <div className="quiz__feedback quiz__feedback--bad" role="status">
          <p>{t('quiz.wrong')}</p>
          <button
            type="button"
            className="btn btn--sm btn--ghost"
            onClick={() => {
              setResult('idle');
              setSelected(null);
            }}
          >
            {t('quiz.tryAgain')}
          </button>
        </div>
      ) : (
        <div className="quiz__feedback quiz__feedback--ok" role="status">
          <p>{t('quiz.correct')}</p>
          <p className="quiz__explain">
            <span className="mono">{t('quiz.explanation')}</span>
            {pick(question.explanation)}
          </p>
          <button type="button" className="btn btn--sm" onClick={onSolved}>
            {t('module.lessonDone')}
          </button>
        </div>
      )}
    </div>
  );
}

function normalize(value: string, caseSensitive?: boolean) {
  const trimmed = value.replace(/\s+/g, ' ').trim();
  return caseSensitive ? trimmed : trimmed.toUpperCase();
}

function TextQuestion({
  question,
  index,
  onSolved
}: {
  question: Extract<QuizQuestion, { kind: 'text' }>;
  index: number;
  onSolved: () => void;
}) {
  const { t, lang, pick } = useLang();
  const [value, setValue] = useState('');
  const [result, setResult] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const accept = Array.isArray(question.accept)
    ? question.accept
    : question.accept[lang] ?? question.accept.zh;

  const isCorrect = () =>
    accept.some(
      (item) => normalize(item, question.caseSensitive) === normalize(value, question.caseSensitive)
    );

  const check = () => {
    if (!value.trim()) return;
    setResult(isCorrect() ? 'correct' : 'wrong');
  };

  return (
    <div className={`quiz__item${result === 'correct' ? ' is-correct' : ''}`}>
      <QuestionHead index={index}>{pick(question.prompt)}</QuestionHead>
      <label className="quiz__field">
        <span className="sr-only">{t('quiz.answerLabel')}</span>
        <input
          className="input"
          type="text"
          value={value}
          placeholder={question.placeholder ? pick(question.placeholder) : t('quiz.placeholder')}
          data-state={result === 'idle' ? undefined : result === 'correct' ? 'ok' : 'bad'}
          disabled={result === 'correct'}
          onChange={(event) => {
            setValue(event.target.value);
            setResult('idle');
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              check();
            }
          }}
        />
      </label>

      {result === 'idle' ? (
        <div className="quiz__actions">
          <button type="button" className="btn btn--sm" disabled={!value.trim()} onClick={check}>
            {t('quiz.check')}
          </button>
        </div>
      ) : result === 'wrong' ? (
        <div className="quiz__feedback quiz__feedback--bad" role="status">
          <p>{t('quiz.wrong')}</p>
          <button
            type="button"
            className="btn btn--sm btn--ghost"
            onClick={() => {
              setResult('idle');
              setValue('');
            }}
          >
            {t('quiz.tryAgain')}
          </button>
        </div>
      ) : (
        <div className="quiz__feedback quiz__feedback--ok" role="status">
          <p>{t('quiz.correct')}</p>
          <p className="quiz__explain">
            <span className="mono">{t('quiz.explanation')}</span>
            {pick(question.explanation)}
          </p>
          <button type="button" className="btn btn--sm" onClick={onSolved}>
            {t('module.lessonDone')}
          </button>
        </div>
      )}
    </div>
  );
}
