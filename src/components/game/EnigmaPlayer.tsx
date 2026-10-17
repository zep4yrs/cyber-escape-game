/// <reference types="vite/client" />
/* ==========================================================================
   EnigmaPlayer · 单关玩家（引导模式）
   --------------------------------------------------------------------------
   · 由模块页使用：<EnigmaPlayer enigma={enigma} onSolved={...} />
   · 内部 EnigmaPlay 也供 ChallengeRunner 复用（同一套答题/提示/揭晓逻辑）
   · 规则：5 次尝试；前 2 次错答免罚并展示 nudges；第 3 次起 −10；
     提示每条 −20（最多 3 条）；答对/揭晓后展示答案与 explain
   ========================================================================== */

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import type { EnigmaData } from '../../content/types';
import { useLang } from '../../i18n/LangContext';
import {
  answerText,
  ATTEMPT_PENALTY,
  fallbackLabel,
  FREE_ATTEMPTS,
  isAcceptedAnswer,
  MAX_ATTEMPTS,
  MAX_HINTS,
  nudgeIndexForAttempt
} from '../../lib/gameMath';
import '../../styles/game.css';

export interface EnigmaPlayerProps {
  enigma: EnigmaData;
  onSolved: (result: { solved: boolean; revealed: boolean }) => void;
  /**
   * 模块页的 lesson 标题已经展示过本关标题时，可隐藏卡片内重复的大标题。
   * 标题仍以 sr-only 形式保留在 DOM 中（供 aria-labelledby 与读屏使用）。
   */
  hideTitle?: boolean;
}

/** EnigmaPlay 结算时回传给调用方的完整信息 */
export interface EnigmaResolveInfo {
  solved: boolean;
  revealed: boolean;
  /** 该关累计错答次数（不含答对那次） */
  attempts: number;
  /** 该关已用提示条数 */
  hints: number;
}

export interface EnigmaPlayProps {
  enigma: EnigmaData;
  onResolve: (info: EnigmaResolveInfo) => void;
  /** 暂停等外部锁定期间禁用答题与提示 */
  locked?: boolean;
  /** 综合演练计分：结算后展示本题得分 */
  awardedScore?: number | null;
  /** 切关时把焦点移到题目标题（综合演练用；首次挂载不抢焦点） */
  manageFocus?: boolean;
  /** 标题层级：模块页用 h3（lesson 标题是 h2），综合演练页用 h2 */
  headingLevel?: 'h2' | 'h3';
  /** 隐藏卡片内的大标题（仍保留 sr-only 供读屏） */
  hideTitle?: boolean;
}

type Tone = 'ok' | 'bad' | 'info';

interface Feedback {
  tone: Tone;
  message: string;
  penalty?: number;
}

interface Settled {
  solved: boolean;
  revealed: boolean;
}

/**
 * 引导模式玩家：只负责一道关卡，答对/揭晓后回调 onSolved。
 * 不在此组件内写学习进度（moduleId 由调用方持有）。
 */
export function EnigmaPlayer({ enigma, onSolved, hideTitle = false }: EnigmaPlayerProps) {
  return (
    <EnigmaPlay
      enigma={enigma}
      headingLevel="h3"
      hideTitle={hideTitle}
      onResolve={(info) => onSolved({ solved: info.solved, revealed: info.revealed })}
    />
  );
}

/** 单关答题面板（EnigmaPlayer 与 ChallengeRunner 共用） */
export function EnigmaPlay({
  enigma,
  onResolve,
  locked = false,
  awardedScore = null,
  manageFocus = false,
  headingLevel = 'h3',
  hideTitle = false
}: EnigmaPlayProps) {
  const { t, pick, pickList, lang } = useLang();
  const fieldId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousKeyRef = useRef(enigma.key);

  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [nudgeAt, setNudgeAt] = useState(-1);
  const [value, setValue] = useState('');
  const [inputBad, setInputBad] = useState(false);
  const [settled, setSettled] = useState<Settled | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const hints = pickList(enigma.hints);
  const nudges = pickList(enigma.nudges);
  const maxHints = Math.min(MAX_HINTS, hints.length);
  const resolved = settled !== null;
  const solved = settled?.solved === true;
  const HeadingTag = headingLevel;
  const titleId = `${fieldId}-title`;
  const hintsId = `${fieldId}-hints`;
  const noteText = enigma.answerNote ? pick(enigma.answerNote) : '';
  const revealedLabel = fallbackLabel(t, 'game.revealed', 'game.reveal');
  const nudgeText = nudgeAt >= 0 ? (nudges[nudgeAt] ?? '') : '';

  /* 切关：清空本题的全部临时状态（语言切换不重置） */
  useEffect(() => {
    setWrongAttempts(0);
    setHintsUsed(0);
    setNudgeAt(-1);
    setValue('');
    setInputBad(false);
    setSettled(null);
    setFeedback(null);
  }, [enigma.key]);

  /* 综合演练切关后把焦点移到题目标题（首次挂载不抢焦点） */
  useEffect(() => {
    const changed = previousKeyRef.current !== enigma.key;
    previousKeyRef.current = enigma.key;
    if (changed && manageFocus) titleRef.current?.focus();
  }, [enigma.key, manageFocus]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (locked || resolved) return;
    /* 以输入框的真实值为准（避免受控组件与提交事件之间的时序差异） */
    const raw = (inputRef.current?.value ?? value).trim();
    if (!raw) {
      inputRef.current?.focus();
      return;
    }

    if (isAcceptedAnswer(enigma, raw, lang)) {
      setSettled({ solved: true, revealed: false });
      setValue('');
      setInputBad(false);
      setFeedback({ tone: 'ok', message: t('game.correct') });
      onResolve({ solved: true, revealed: false, attempts: wrongAttempts, hints: hintsUsed });
      return;
    }

    const nextAttempts = wrongAttempts + 1;
    setWrongAttempts(nextAttempts);
    setValue('');
    setInputBad(true);

    if (nextAttempts >= MAX_ATTEMPTS) {
      setSettled({ solved: false, revealed: true });
      setFeedback({
        tone: 'bad',
        message: `${t('game.answerIs')} · ${answerText(enigma, lang)}`
      });
      onResolve({ solved: false, revealed: true, attempts: nextAttempts, hints: hintsUsed });
      return;
    }

    setNudgeAt(nudgeIndexForAttempt(nextAttempts, nudges.length));
    setFeedback({
      tone: 'bad',
      message: t('game.wrong'),
      penalty: nextAttempts > FREE_ATTEMPTS ? ATTEMPT_PENALTY : undefined
    });
    inputRef.current?.focus();
  };

  const requestHint = () => {
    if (locked || resolved || hintsUsed >= maxHints) return;
    const nextHints = hintsUsed + 1;
    setHintsUsed(nextHints);
    setFeedback({ tone: 'info', message: `${t('game.hint')} ${nextHints} / ${maxHints}` });
  };

  return (
    <section className="game-player" aria-labelledby={titleId}>
      <header className="game-player__head">
        <div className="game-player__meta">
          <span className="game-player__code mono">{enigma.code}</span>
          <span className="tag">{pick(enigma.tag)}</span>
          <span className="game-player__attempts mono">
            {t('game.tried')} {wrongAttempts} / {MAX_ATTEMPTS}
          </span>
        </div>
        <HeadingTag
          ref={titleRef}
          id={titleId}
          tabIndex={-1}
          className={hideTitle ? 'game-player__title sr-only' : 'game-player__title'}
        >
          {pick(enigma.title)}
        </HeadingTag>
        <p className="game-player__brief">{pick(enigma.brief)}</p>
      </header>

      {/* 题面 HTML 来自仓库内的可信数据（由 legacy 数据自动转换） */}
      <div className="game-content" dangerouslySetInnerHTML={{ __html: pick(enigma.content) }} />

      {resolved ? (
        <ResultPanel
          enigma={enigma}
          solved={solved}
          revealedLabel={revealedLabel}
          awardedScore={awardedScore}
          attempts={wrongAttempts}
          hints={hintsUsed}
        />
      ) : (
        <>
          <form className="game-answer" onSubmit={submit} noValidate>
            <label className="game-answer__label mono" htmlFor={fieldId}>
              {t('game.answer')}
            </label>
            <div className="game-answer__row">
              <input
                ref={inputRef}
                id={fieldId}
                className="input game-answer__input"
                type="text"
                value={value}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                disabled={locked}
                data-state={inputBad ? 'bad' : undefined}
                aria-describedby={noteText ? `${fieldId}-note` : undefined}
                onChange={(event) => {
                  setValue(event.target.value);
                  setInputBad(false);
                }}
              />
              <button className="btn game-answer__submit" type="submit" disabled={locked}>
                {t('game.verify')}
              </button>
            </div>
            {noteText ? (
              <p className="game-answer__note" id={`${fieldId}-note`}>
                {noteText}
              </p>
            ) : null}
          </form>

          <div className="game-tools">
            {maxHints > 0 ? (
              <button
                className="btn btn--sm btn--ghost game-tools__hint"
                type="button"
                onClick={requestHint}
                disabled={locked || hintsUsed >= maxHints}
                aria-expanded={hintsUsed > 0}
                aria-controls={hintsId}
              >
                {t('game.hint')}
                <span className="game-tools__cost mono">{t('game.hintCost')}</span>
              </button>
            ) : null}
            {maxHints > 0 ? (
              <span className="game-tools__count mono">
                {t('game.hint')} {hintsUsed} / {maxHints}
              </span>
            ) : null}
          </div>

          {hintsUsed > 0 ? (
            <ul className="game-hints" id={hintsId}>
              {hints.slice(0, hintsUsed).map((hint, index) => (
                <li className="game-hint" key={index}>
                  <span className="game-hint__num mono">{String(index + 1).padStart(2, '0')}</span>
                  <span className="game-hint__text">{hint}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="game-feedback" role="status" aria-live="polite">
            {feedback ? (
              <p className={`game-feedback__message game-feedback__message--${feedback.tone}`}>
                {feedback.message}
                {feedback.penalty ? (
                  <span className="game-feedback__penalty mono">−{feedback.penalty}</span>
                ) : null}
              </p>
            ) : null}
            {nudgeText ? (
              <div className="game-nudge">
                <span className="game-nudge__label mono">{t('game.nudge')}</span>
                <p className="game-nudge__text">{nudgeText}</p>
              </div>
            ) : null}
          </div>
        </>
      )}
    </section>
  );
}

function ResultPanel({
  enigma,
  solved,
  revealedLabel,
  awardedScore,
  attempts,
  hints
}: {
  enigma: EnigmaData;
  solved: boolean;
  revealedLabel: string;
  awardedScore: number | null;
  attempts: number;
  hints: number;
}) {
  const { t, pick, lang } = useLang();
  return (
    <div className={`game-result${solved ? ' is-solved' : ' is-revealed'}`}>
      <div className="game-result__head">
        <span className={`tag ${solved ? 'tag--ok' : 'tag--warn'}`}>
          {solved ? t('game.solved') : revealedLabel}
        </span>
        {solved && awardedScore != null ? (
          <span className="game-result__score mono">+{awardedScore}</span>
        ) : null}
        <span className="game-result__meta mono">
          {t('game.tried')} {attempts} / {MAX_ATTEMPTS}
        </span>
      </div>
      <p className="game-result__answer">
        <span className="game-result__label mono">{t('game.answerIs')}</span>
        <strong>{answerText(enigma, lang)}</strong>
      </p>
      <div className="game-result__explain">
        <p className="game-result__label mono">{t('game.explain')}</p>
        <p>{pick(enigma.explain)}</p>
      </div>
      {hints > 0 ? (
        <p className="game-result__hints muted">
          {t('game.hint')} {hints} / {MAX_HINTS}
        </p>
      ) : null}
    </div>
  );
}
