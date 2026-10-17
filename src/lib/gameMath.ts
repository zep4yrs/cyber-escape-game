/* ==========================================================================
   实战演练 · 计分与答案判定（纯函数）
   —— 规则与旧版 legacy/js/game.js 保持一致：
      · 每关 5 次尝试，前 2 次错答免罚，第 3 次起每次 −10
      · 每条提示 −20（最多 3 条）
      · 答对得分 = 100 + 剩余秒数×2 − 扣分，单关最低 0
      · 答错 5 次揭晓答案，该关不计分
   ========================================================================== */

import type { EnigmaData, Lang } from '../content/types';

/** 每关最多尝试次数 */
export const MAX_ATTEMPTS = 5;
/** 前 N 次错答免罚 */
export const FREE_ATTEMPTS = 2;
/** 每关最多提示条数 */
export const MAX_HINTS = 3;
/** 综合演练总时长（秒） */
export const TOTAL_TIME = 30 * 60;
/** 答对基础分 */
export const BASE_SCORE = 100;
/** 每剩余 1 秒的加分 */
export const SECONDS_BONUS = 2;
/** 第 3 次起的每次错答扣分 */
export const ATTEMPT_PENALTY = 10;
/** 每条提示扣分 */
export const HINT_PENALTY = 20;
/** 答对后自动进关的延迟（毫秒） */
export const AUTO_NEXT_DELAY = 1500;
/** 揭晓答案后自动进关的延迟（毫秒），留出阅读时间 */
export const AUTO_REVEAL_DELAY = 3200;

/** 中文标点 → 半角标点（题面常写「1、3、6」这类格式） */
const CN_PUNCTUATION: Record<string, string> = {
  '，': ',',
  '、': ',',
  '；': ';',
  '：': ':'
};

/**
 * 答案标准化：去首尾空白 → 转大写 → 去掉所有空白 → 中文标点换半角。
 * 与旧引擎一致，因此「1、3、6」「1 3 6」「1,3,6」等价。
 */
export function normalizeAnswer(raw: string): string {
  return raw
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(/[，、；：]/g, (ch) => CN_PUNCTUATION[ch] ?? ch);
}

/** 取当前语言的正确答案（answer 可能是 string 或三语对象） */
export function answerText(enigma: EnigmaData, lang: Lang): string {
  if (typeof enigma.answer === 'string') return enigma.answer;
  return enigma.answer[lang] ?? enigma.answer.zh;
}

/** 当前语言下所有可接受的答案（正确答案 + accept 列表） */
export function acceptedAnswers(enigma: EnigmaData, lang: Lang): string[] {
  const list = [answerText(enigma, lang)];
  if (enigma.accept) list.push(...enigma.accept);
  return list;
}

/** 判定用户输入是否正确（大小写不敏感、忽略空白、中文标点等价） */
export function isAcceptedAnswer(enigma: EnigmaData, raw: string, lang: Lang): boolean {
  const given = normalizeAnswer(raw);
  if (!given) return false;
  return acceptedAnswers(enigma, lang).some((candidate) => normalizeAnswer(candidate) === given);
}

/** 错答扣分（前两次免罚） */
export function attemptPenalty(attempts: number): number {
  return Math.max(0, Math.floor(attempts) - FREE_ATTEMPTS) * ATTEMPT_PENALTY;
}

/** 提示扣分 */
export function hintPenalty(hints: number): number {
  return Math.max(0, Math.floor(hints)) * HINT_PENALTY;
}

export interface LevelScoreInput {
  /** 结算瞬间的综合演练剩余秒数（单关引导模式可传 0） */
  remainingSeconds: number;
  /** 该关累计错答次数（不含答对那次） */
  attempts: number;
  /** 该关已用提示条数 */
  hints: number;
}

/** 单关得分：100 + 剩余秒数×2 − 错答扣分 − 提示扣分，最低 0 */
export function computeLevelScore({ remainingSeconds, attempts, hints }: LevelScoreInput): number {
  const remaining = Math.max(0, Math.floor(remainingSeconds));
  const points = BASE_SCORE + remaining * SECONDS_BONUS - attemptPenalty(attempts) - hintPenalty(hints);
  return Math.max(0, Math.round(points));
}

/** 秒数 → mm:ss */
export function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * 第 attempts 次错答后应展示的方向提示下标。
 * 第 1、2 次各展开一条；之后保持最后一条（与旧引擎一致）。没有提示时返回 -1。
 */
export function nudgeIndexForAttempt(attempts: number, nudgeCount: number): number {
  if (attempts <= 0 || nudgeCount <= 0) return -1;
  return Math.min(attempts - 1, nudgeCount - 1);
}

/** 需要新增但 dict 尚未提供的文案 key（Lead 统一补三语），回退到已有 key 避免露出原始 key */
export function fallbackLabel(t: (key: string) => string, key: string, fallbackKey: string): string {
  const value = t(key);
  return value === key ? t(fallbackKey) : value;
}
