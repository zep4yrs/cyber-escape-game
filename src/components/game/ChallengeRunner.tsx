/// <reference types="vite/client" />
/* ==========================================================================
   ChallengeRunner · 30 分钟 6 关综合演练 — 雷霆档案 HUD 版
   --------------------------------------------------------------------------
   · 由 /challenge 页使用：<ChallengeRunner onFinish={(result) => ...} />
   · 关卡顺序 = SCENARIOS.main.enigmas（学习模块 1–6 的关卡）
   · 规则完全沿用旧版：5 次尝试 / 前 2 次免罚 / 提示 −20 / 答对 100+剩余秒×2
   · 计时到 0 或六关走完 → 雷霆结算屏（评级 + 分数滚动 + 逐关 stagger）
   · 不硬编码模块 id：综合演练只上报结果，学习进度由页面/调用方处理
   ========================================================================== */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ENIGMAS, SCENARIOS } from '../../content/enigmas';
import type { EnigmaData } from '../../content/types';
import { useLang } from '../../i18n/LangContext';
import { useProgress } from '../../lib/ProgressContext';
import {
  AUTO_NEXT_DELAY,
  AUTO_REVEAL_DELAY,
  computeLevelScore,
  computeOverallRank,
  computeRank,
  fallbackLabel,
  formatClock,
  TOTAL_TIME,
  type Rank
} from '../../lib/gameMath';
import { EnigmaPlay, type EnigmaResolveInfo } from './EnigmaPlayer';
import '../../styles/game.css';

export interface ChallengeResult {
  score: number;
  solved: number;
  total: number;
  elapsed: number;
}

export interface ChallengeRunnerProps {
  onFinish: (result: ChallengeResult) => void;
}

type StageStatus = 'pending' | 'solved' | 'revealed';

/** 综合演练关卡顺序：学习模块 1–6 对应 SCENARIOS.main 的六关 */
const STAGES: EnigmaData[] = SCENARIOS.main.enigmas
  .map((key) => ENIGMAS[key])
  .filter((enigma): enigma is EnigmaData => Boolean(enigma));

const TOTAL_STAGES = STAGES.length;

/** 数值滚动：综合演练分数 CountUp；reduced-motion 时直接落到终值 */
function useCountUp(target: number, duration = 800): number {
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

function IcoBolt() {
  return (
    <svg className="game-ico" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M9.4 1 3 9.1h3.2L5.6 15 12.6 6.5H9l0.4-5.5Z" fill="currentColor" />
    </svg>
  );
}

export function ChallengeRunner({ onFinish }: ChallengeRunnerProps) {
  const { t } = useLang();
  const { recordChallenge } = useProgress();

  const [stageIndex, setStageIndex] = useState(0);
  const [statuses, setStatuses] = useState<StageStatus[]>(() => STAGES.map(() => 'pending'));
  const [scores, setScores] = useState<number[]>(() => STAGES.map(() => 0));
  const [ranks, setRanks] = useState<Rank[]>(() => STAGES.map(() => 'C'));
  const [remaining, setRemaining] = useState(TOTAL_TIME);
  const [paused, setPaused] = useState(false);
  const [awarded, setAwarded] = useState<number | null>(null);
  const [result, setResult] = useState<(ChallengeResult & { timedOut: boolean }) | null>(null);

  const stageIndexRef = useRef(0);
  const statusesRef = useRef<StageStatus[]>(statuses);
  const scoresRef = useRef<number[]>(scores);
  const ranksRef = useRef<Rank[]>(ranks);
  const remainingRef = useRef(TOTAL_TIME);
  const advanceRef = useRef<number | null>(null);
  const pendingAdvanceRef = useRef(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    stageIndexRef.current = stageIndex;
  }, [stageIndex]);

  useEffect(() => {
    statusesRef.current = statuses;
  }, [statuses]);

  useEffect(() => {
    scoresRef.current = scores;
  }, [scores]);

  useEffect(() => {
    ranksRef.current = ranks;
  }, [ranks]);

  useEffect(() => {
    remainingRef.current = remaining;
  }, [remaining]);

  const clearAdvance = useCallback(() => {
    if (advanceRef.current != null) {
      window.clearTimeout(advanceRef.current);
      advanceRef.current = null;
    }
  }, []);

  const finish = useCallback(
    (timedOut: boolean) => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      clearAdvance();
      setPaused(false);
      const solved = statusesRef.current.filter((status) => status === 'solved').length;
      const score = scoresRef.current.reduce((sum, value) => sum + value, 0);
      const elapsed = TOTAL_TIME - remainingRef.current;
      const payload: ChallengeResult = { score, solved, total: TOTAL_STAGES, elapsed };
      setResult({ ...payload, timedOut });
      recordChallenge(score);
      onFinish(payload);
    },
    [clearAdvance, onFinish, recordChallenge]
  );

  const advance = useCallback(() => {
    if (finishedRef.current) return;
    clearAdvance();
    pendingAdvanceRef.current = false;
    const next = stageIndexRef.current + 1;
    if (next >= TOTAL_STAGES) {
      finish(false);
      return;
    }
    setAwarded(null);
    setStageIndex(next);
  }, [clearAdvance, finish]);

  const handleResolve = useCallback(
    (info: EnigmaResolveInfo) => {
      /* 揭晓答案的关卡不计分（与旧引擎一致） */
      const points = info.solved
        ? computeLevelScore({
            remainingSeconds: remainingRef.current,
            attempts: info.attempts,
            hints: info.hints
          })
        : 0;
      const rank = computeRank({
        solved: info.solved,
        revealed: !info.solved,
        attempts: info.attempts,
        hints: info.hints
      });
      const index = stageIndexRef.current;
      setScores((prev) => {
        const next = prev.slice();
        next[index] = points;
        return next;
      });
      setStatuses((prev) => {
        const next = prev.slice();
        next[index] = info.solved ? 'solved' : 'revealed';
        return next;
      });
      setRanks((prev) => {
        const next = prev.slice();
        next[index] = rank;
        return next;
      });
      setAwarded(points);
      clearAdvance();
      advanceRef.current = window.setTimeout(advance, info.solved ? AUTO_NEXT_DELAY : AUTO_REVEAL_DELAY);
    },
    [advance, clearAdvance]
  );

  const pause = () => {
    if (result) return;
    setPaused(true);
    if (advanceRef.current != null) {
      clearAdvance();
      pendingAdvanceRef.current = true;
    }
  };

  const resume = useCallback(() => {
    setPaused(false);
    if (!pendingAdvanceRef.current) return;
    pendingAdvanceRef.current = false;
    const currentStatus = statusesRef.current[stageIndexRef.current];
    const delay = currentStatus === 'solved' ? AUTO_NEXT_DELAY : AUTO_REVEAL_DELAY;
    advanceRef.current = window.setTimeout(advance, delay);
  }, [advance]);

  const restart = () => {
    clearAdvance();
    pendingAdvanceRef.current = false;
    finishedRef.current = false;
    stageIndexRef.current = 0;
    remainingRef.current = TOTAL_TIME;
    statusesRef.current = STAGES.map(() => 'pending');
    scoresRef.current = STAGES.map(() => 0);
    ranksRef.current = STAGES.map(() => 'C');
    setStageIndex(0);
    setStatuses(STAGES.map(() => 'pending'));
    setScores(STAGES.map(() => 0));
    setRanks(STAGES.map(() => 'C'));
    setRemaining(TOTAL_TIME);
    setPaused(false);
    setAwarded(null);
    setResult(null);
  };

  /* 计时：暂停/结束即停表 */
  useEffect(() => {
    if (paused || result) return;
    const timer = window.setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [paused, result]);

  /* 时间到 → 结算（只结算一次，finishedRef 兜底） */
  useEffect(() => {
    if (result || remaining > 0) return;
    finish(true);
  }, [remaining, result, finish]);

  /* 暂停时按 Esc 继续 */
  useEffect(() => {
    if (!paused) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        resume();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [paused, resume]);

  /* 卸载时清理自动进关定时器 */
  useEffect(() => () => clearAdvance(), [clearAdvance]);

  /* Hook 必须在任何条件 return 之前调用（结束屏与非结束屏的 Hook 数量保持一致） */
  const score = scores.reduce((sum, value) => sum + value, 0);
  const shownScore = useCountUp(score);
  const clockTone = remaining < 60 ? 'alert' : remaining < 300 ? 'warn' : undefined;

  if (result) {
    return (
      <ChallengeEnd
        result={result}
        statuses={statuses}
        scores={scores}
        ranks={ranks}
        onAgain={restart}
      />
    );
  }

  const enigma = STAGES[stageIndex];

  return (
    <section className="game-run game-run--thunder" aria-label={t('challenge.title')}>
      <div className="game-hud game-hud--thunder" data-tone={clockTone}>
        <span className="game-hud__edge" aria-hidden="true" />
        <div className="game-hud__stat game-hud__stat--stage">
          <span className="game-hud__label mono">{t('challenge.stage', { n: stageIndex + 1, total: TOTAL_STAGES })}</span>
          <div className="game-progress" aria-hidden="true">
            {STAGES.map((stage, index) => (
              <span
                className="game-progress__seg"
                key={stage.key}
                data-state={
                  statuses[index] === 'pending' ? (index === stageIndex ? 'current' : 'todo') : 'done'
                }
                data-result={statuses[index]}
              />
            ))}
          </div>
        </div>
        <div className="game-hud__stat game-hud__stat--timer">
          <span className="game-hud__label mono">{t('challenge.timer')}</span>
          <span className="game-hud__value game-clock" data-tone={clockTone}>
            {formatClock(remaining)}
          </span>
        </div>
        <div className="game-hud__stat game-hud__stat--score">
          <span className="game-hud__label mono">{t('challenge.score')}</span>
          <span className="game-hud__value game-hud__score">{shownScore}</span>
        </div>
        <button
          className="btn btn--ghost game-hud__pause"
          type="button"
          onClick={pause}
          disabled={paused}
        >
          <span className="game-hud__pause-ico" aria-hidden="true" />
          {t('challenge.pause')}
        </button>
      </div>

      {enigma ? (
        <EnigmaPlay
          enigma={enigma}
          onResolve={handleResolve}
          locked={paused}
          awardedScore={awarded}
          manageFocus
          headingLevel="h2"
        />
      ) : (
        <p className="callout callout--warn">{t('notFound.body')}</p>
      )}

      {paused ? (
        <div
          className="game-modal game-modal--thunder"
          role="dialog"
          aria-modal="true"
          aria-labelledby="game-pause-title"
        >
          <div className="game-modal__panel">
            <span className="game-modal__edge" aria-hidden="true" />
            <h2 className="game-modal__title" id="game-pause-title" tabIndex={-1}>
              {t('challenge.paused')}
            </h2>
            <p className="game-modal__text">{t('challenge.pausedHint')}</p>
            <button className="btn" type="button" onClick={resume} autoFocus>
              <IcoBolt />
              {t('challenge.resume')}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ChallengeEnd({
  result,
  statuses,
  scores,
  ranks,
  onAgain
}: {
  result: ChallengeResult & { timedOut: boolean };
  statuses: StageStatus[];
  scores: number[];
  ranks: Rank[];
  onAgain: () => void;
}) {
  const { t, pick } = useLang();
  const revealedLabel = fallbackLabel(t, 'game.revealed', 'game.reveal');
  const overallRank = computeOverallRank(ranks);
  const shownScore = useCountUp(result.score);

  return (
    <section className="game-end game-end--thunder" aria-labelledby="game-end-title">
      <span className="game-end__edge" aria-hidden="true" />

      <header className="game-end__head">
        <p className="eyebrow">{t('challenge.eyebrow')}</p>
        <div className="game-end__headrow">
          <h2 className="game-end__title" id="game-end-title" tabIndex={-1}>
            {result.timedOut ? t('challenge.timeUp') : t('challenge.finish')}
          </h2>
          <div
            className="game-rank game-rank--end"
            data-rank={overallRank}
            aria-label={`${t('challenge.rank')} ${overallRank}`}
          >
            <span className="game-rank__label mono">{t('challenge.rank')}</span>
            <strong className="game-rank__letter">{overallRank}</strong>
          </div>
        </div>
      </header>

      <dl className="game-end__stats">
        <div className="game-stat">
          <dt className="game-stat__label mono">{t('challenge.score')}</dt>
          <dd className="game-stat__value game-stat__value--score">{shownScore}</dd>
        </div>
        <div className="game-stat">
          <dt className="game-stat__label mono">{t('common.progress')}</dt>
          <dd className="game-stat__value">
            {result.solved} / {result.total}
          </dd>
        </div>
        <div className="game-stat">
          <dt className="game-stat__label mono">{t('challenge.elapsed')}</dt>
          <dd className="game-stat__value mono">{formatClock(result.elapsed)}</dd>
        </div>
      </dl>

      <div className="game-end__results">
        <p className="game-end__label mono">{t('challenge.results')}</p>
        <ol className="game-end__list">
          {STAGES.map((stage, index) => {
            const status = statuses[index];
            return (
              <li
                className="game-end__row game-end__row--in"
                key={stage.key}
                data-status={status}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <span className="game-end__code mono">{stage.code}</span>
                <span className="game-end__name">{pick(stage.title)}</span>
                <span
                  className={`tag ${
                    status === 'solved' ? 'tag--ok' : status === 'revealed' ? 'tag--warn' : ''
                  }`}
                >
                  {status === 'solved'
                    ? t('game.solved')
                    : status === 'revealed'
                      ? revealedLabel
                      : t('common.notStarted')}
                </span>
                <span className="game-end__rank mini" data-rank={status === 'pending' ? 'C' : ranks[index]}>
                  {status === 'pending' ? '—' : ranks[index]}
                </span>
                <span className="game-end__score mono">
                  {status === 'solved' ? `+${scores[index] ?? 0}` : '—'}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <button className="btn game-end__again game-sweep" type="button" onClick={onAgain}>
        <IcoBolt />
        {t('challenge.again')}
      </button>
    </section>
  );
}
