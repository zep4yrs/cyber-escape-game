/// <reference types="vite/client" />
/* ==========================================================================
   EnigmaPlayer · 单关玩家（引导模式）— 雷霆档案 HUD 版
   --------------------------------------------------------------------------
   · 由模块页使用：<EnigmaPlayer enigma={enigma} onSolved={...} />
   · 内部 EnigmaPlay 也供 ChallengeRunner 复用（同一套答题/提示/揭晓逻辑）
   · 规则与旧版完全一致：5 次尝试；前 2 次错答免罚并展示 nudges；第 3 次起 −10；
     提示每条 −20（最多 3 条）；答对/揭晓后展示答案与 explain
   · 视觉：尝试 pips、电流芯片反馈、答错 shake / 答对 pulse、结算评级 S/A/B/C
   ========================================================================== */

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import type { EnigmaData } from '../../content/types';
import { useLang } from '../../i18n/LangContext';
import {
  answerText,
  ATTEMPT_PENALTY,
  computeRank,
  fallbackLabel,
  FREE_ATTEMPTS,
  isAcceptedAnswer,
  MAX_ATTEMPTS,
  MAX_HINTS,
  nudgeIndexForAttempt,
  type Rank
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

const PIP_INDEXES = Array.from({ length: MAX_ATTEMPTS }, (_, index) => index);

/** 数值滚动（雷霆结算 / HUD 分数用）；reduced-motion 时直接落到终值 */
function useCountUp(target: number, duration = 680): number {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    let frame = 0;
    const reduce =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const from = fromRef.current;
    if (reduce || from === target) {
      fromRef.current = target;
      setDisplay(target);
      return;
    }
    const start = window.performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (progress < 1) frame = window.requestAnimationFrame(step);
      else fromRef.current = target;
    };
    frame = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(frame);
      fromRef.current = target;
    };
  }, [target, duration]);

  return display;
}

function IcoCheck() {
  return (
    <svg className="game-ico" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        d="M2.6 8.4 6.1 12 13.5 3.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IcoBolt() {
  return (
    <svg className="game-ico" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M9.4 1 3 9.1h3.2L5.6 15 12.6 6.5H9l0.4-5.5Z" fill="currentColor" />
    </svg>
  );
}

function IcoAlert() {
  return (
    <svg className="game-ico" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        d="M8 1.6 15 14H1L8 1.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 6v3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="8" cy="11.6" r="0.9" fill="currentColor" />
    </svg>
  );
}

function ToneIcon({ tone }: { tone: Tone }) {
  if (tone === 'ok') return <IcoCheck />;
  if (tone === 'bad') return <IcoAlert />;
  return <IcoBolt />;
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
  const strikeTimer = useRef<number | null>(null);
  const pulseTimer = useRef<number | null>(null);

  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [nudgeAt, setNudgeAt] = useState(-1);
  const [value, setValue] = useState('');
  const [inputBad, setInputBad] = useState(false);
  const [settled, setSettled] = useState<Settled | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [strike, setStrike] = useState(false);
  const [pulse, setPulse] = useState(false);

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
  const hintsLeft = Math.max(0, maxHints - hintsUsed);

  const flash = (setter: (on: boolean) => void, timer: { current: number | null }, hold: number) => {
    if (timer.current != null) window.clearTimeout(timer.current);
    setter(false);
    window.requestAnimationFrame(() => {
      setter(true);
      timer.current = window.setTimeout(() => {
        setter(false);
        timer.current = null;
      }, hold);
    });
  };

  /* 切关：清空本题的全部临时状态（语言切换不重置） */
  useEffect(() => {
    setWrongAttempts(0);
    setHintsUsed(0);
    setNudgeAt(-1);
    setValue('');
    setInputBad(false);
    setSettled(null);
    setFeedback(null);
    setStrike(false);
    setPulse(false);
  }, [enigma.key]);

  /* 清理动画计时器 */
  useEffect(
    () => () => {
      if (strikeTimer.current != null) window.clearTimeout(strikeTimer.current);
      if (pulseTimer.current != null) window.clearTimeout(pulseTimer.current);
    },
    []
  );

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
      flash(setPulse, pulseTimer, 760);
      onResolve({ solved: true, revealed: false, attempts: wrongAttempts, hints: hintsUsed });
      return;
    }

    const nextAttempts = wrongAttempts + 1;
    setWrongAttempts(nextAttempts);
    setValue('');
    setInputBad(true);
    flash(setStrike, strikeTimer, 200);

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

  const className = [
    'game-player',
    'game-player--thunder',
    strike ? 'is-strike' : '',
    pulse ? 'is-pulse' : '',
    resolved ? 'is-settled' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={className} aria-labelledby={titleId}>
      <span className="game-player__edge" aria-hidden="true" />

      <header className="game-player__head">
        <div className="game-player__meta">
          <span className="game-player__code mono">{enigma.code}</span>
          <span className="tag game-player__tag">{pick(enigma.tag)}</span>
          <div className="game-player__tries">
            <span
              className="game-pips"
              role="img"
              aria-label={`${t('game.tried')} ${wrongAttempts} / ${MAX_ATTEMPTS}`}
            >
              {PIP_INDEXES.map((index) => (
                <span
                  key={index}
                  className="game-pips__pip"
                  data-state={
                    index < wrongAttempts ? (index >= FREE_ATTEMPTS ? 'penalty' : 'used') : 'todo'
                  }
                />
              ))}
            </span>
            <span className="game-player__attempts mono">
              {t('game.tried')} {wrongAttempts} / {MAX_ATTEMPTS}
            </span>
          </div>
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
                className="btn btn--ghost game-tools__hint"
                type="button"
                onClick={requestHint}
                disabled={locked || hintsUsed >= maxHints}
                aria-expanded={hintsUsed > 0}
                aria-controls={hintsId}
              >
                <IcoBolt />
                <span className="game-tools__label">{t('game.hint')}</span>
                <span className="game-tools__remain mono" aria-hidden="true">
                  {hintsLeft}
                </span>
                <span className="game-tools__cost mono">{t('game.hintCost')}</span>
              </button>
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
                <ToneIcon tone={feedback.tone} />
                <span className="game-feedback__text">{feedback.message}</span>
                {feedback.penalty ? (
                  <span className="game-feedback__penalty mono">−{feedback.penalty}</span>
                ) : null}
              </p>
            ) : null}
            {nudgeText ? (
              <div className="game-nudge">
                <IcoBolt />
                <div className="game-nudge__body">
                  <span className="game-nudge__label mono">{t('game.nudge')}</span>
                  <p className="game-nudge__text">{nudgeText}</p>
                </div>
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
  const rank: Rank = computeRank({ solved, revealed: !solved, attempts, hints });
  const shownScore = useCountUp(awardedScore ?? 0);

  return (
    <div className={`game-result${solved ? ' is-solved' : ' is-revealed'}`} data-rank={rank}>
      <span className="game-burst" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>

      <div className="game-result__head">
        <span className={`tag ${solved ? 'tag--ok' : 'tag--warn'}`}>
          {solved ? t('game.solved') : revealedLabel}
        </span>
        {solved && awardedScore != null ? (
          <span className="game-result__score mono">+{shownScore}</span>
        ) : null}
        <span className="game-result__meta mono">
          {t('game.tried')} {attempts} / {MAX_ATTEMPTS}
        </span>
        <div className="game-rank" data-rank={rank} aria-label={`${t('challenge.rank')} ${rank}`}>
          <span className="game-rank__label mono">{t('challenge.rank')}</span>
          <strong className="game-rank__letter">{rank}</strong>
        </div>
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
