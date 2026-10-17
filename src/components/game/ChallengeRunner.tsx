/// <reference types="vite/client" />
/* ==========================================================================
   ChallengeRunner · 30 分钟 6 关综合演练
   --------------------------------------------------------------------------
   · 由 /challenge 页使用：<ChallengeRunner onFinish={(result) => ...} />
   · 关卡顺序 = SCENARIOS.main.enigmas（学习模块 1–6 的关卡）
   · 规则同 EnigmaPlay：5 次尝试 / 前 2 次免罚 / 提示 −20 / 答对 100+剩余秒×2
   · 计时到 0 或六关走完 → 结束屏（逐关结果）+ 写 progress.recordChallenge
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
  fallbackLabel,
  formatClock,
  TOTAL_TIME
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

export function ChallengeRunner({ onFinish }: ChallengeRunnerProps) {
  const { t } = useLang();
  const { recordChallenge } = useProgress();

  const [stageIndex, setStageIndex] = useState(0);
  const [statuses, setStatuses] = useState<StageStatus[]>(() => STAGES.map(() => 'pending'));
  const [scores, setScores] = useState<number[]>(() => STAGES.map(() => 0));
  const [remaining, setRemaining] = useState(TOTAL_TIME);
  const [paused, setPaused] = useState(false);
  const [awarded, setAwarded] = useState<number | null>(null);
  const [result, setResult] = useState<(ChallengeResult & { timedOut: boolean }) | null>(null);

  const stageIndexRef = useRef(0);
  const statusesRef = useRef<StageStatus[]>(statuses);
  const scoresRef = useRef<number[]>(scores);
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
    setStageIndex(0);
    setStatuses(STAGES.map(() => 'pending'));
    setScores(STAGES.map(() => 0));
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

  if (result) {
    return <ChallengeEnd result={result} statuses={statuses} scores={scores} onAgain={restart} />;
  }

  const enigma = STAGES[stageIndex];
  const score = scores.reduce((sum, value) => sum + value, 0);
  const clockTone = remaining < 300 ? 'alert' : remaining < 600 ? 'warn' : undefined;

  return (
    <section className="game-run" aria-label={t('challenge.title')}>
      <div className="game-hud">
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
        <div className="game-hud__stat">
          <span className="game-hud__label mono">{t('challenge.timer')}</span>
          <span className="game-hud__value game-clock" data-tone={clockTone}>
            {formatClock(remaining)}
          </span>
        </div>
        <div className="game-hud__stat">
          <span className="game-hud__label mono">{t('challenge.score')}</span>
          <span className="game-hud__value">{score}</span>
        </div>
        <button
          className="btn btn--sm btn--ghost game-hud__pause"
          type="button"
          onClick={pause}
          disabled={paused}
        >
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
        <div className="game-modal" role="dialog" aria-modal="true" aria-labelledby="game-pause-title">
          <div className="game-modal__panel">
            <h2 className="game-modal__title" id="game-pause-title" tabIndex={-1}>
              {t('challenge.paused')}
            </h2>
            <p className="game-modal__text">{t('challenge.pausedHint')}</p>
            <button className="btn" type="button" onClick={resume} autoFocus>
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
  onAgain
}: {
  result: ChallengeResult & { timedOut: boolean };
  statuses: StageStatus[];
  scores: number[];
  onAgain: () => void;
}) {
  const { t, pick } = useLang();
  const revealedLabel = fallbackLabel(t, 'game.revealed', 'game.reveal');

  return (
    <section className="game-end" aria-labelledby="game-end-title">
      <header className="game-end__head">
        <p className="eyebrow">{t('challenge.eyebrow')}</p>
        <h2 className="game-end__title" id="game-end-title" tabIndex={-1}>
          {result.timedOut ? t('challenge.timeUp') : t('challenge.finish')}
        </h2>
      </header>

      <dl className="game-end__stats">
        <div className="game-stat">
          <dt className="game-stat__label mono">{t('challenge.score')}</dt>
          <dd className="game-stat__value">{result.score}</dd>
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
              <li className="game-end__row" key={stage.key} data-status={status}>
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
                <span className="game-end__score mono">
                  {status === 'solved' ? `+${scores[index] ?? 0}` : '—'}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <button className="btn game-end__again" type="button" onClick={onAgain}>
        {t('challenge.again')}
      </button>
    </section>
  );
}
