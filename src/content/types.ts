/* ==========================================================================
   课程内容数据模型
   —— 所有课程内容都在 src/content/modules/*.ts 里，页面只负责渲染。
   ========================================================================== */

export type Lang = 'zh' | 'en' | 'fr';

export const LANGS: Lang[] = ['zh', 'en', 'fr'];

/** 三语文本：每个语言必须齐全 */
export type L = Record<Lang, string>;

export interface StepItem {
  title: L;
  body: L;
}

export interface KeyValueItem {
  label: L;
  value: L;
}

export interface TableData {
  caption?: L;
  head: L[];
  rows: L[][];
  /** true 时单元格用等宽字体（数据/代码类表格） */
  mono?: boolean;
}

export type Block =
  | { kind: 'p'; text: L }
  | { kind: 'lead'; text: L }
  | { kind: 'list'; ordered?: boolean; items: L[] }
  | { kind: 'steps'; items: StepItem[] }
  | { kind: 'callout'; tone: 'note' | 'tip' | 'warn'; title?: L; text: L }
  | { kind: 'table'; data: TableData }
  | { kind: 'code'; label?: L; code: string; caption?: L }
  | { kind: 'data'; label?: L; items: KeyValueItem[] }
  | { kind: 'compare'; leftTitle: L; leftItems: L[]; rightTitle: L; rightItems: L[] };

export interface ConceptLesson {
  type: 'concept';
  id: string;
  title: L;
  minutes: number;
  objectives: L[];
  blocks: Block[];
}

export interface ExampleLesson {
  type: 'example';
  id: string;
  title: L;
  minutes: number;
  intro: L;
  steps: StepItem[];
  closing?: L;
}

export type QuizQuestion =
  | {
      kind: 'choice';
      id: string;
      prompt: L;
      options: { id: string; label: L }[];
      correct: string;
      explanation: L;
    }
  | {
      kind: 'text';
      id: string;
      prompt: L;
      placeholder?: L;
      /** 每个语言可以有不同答案（如中文题答案为中文） */
      accept: string[] | Record<Lang, string[]>;
      caseSensitive?: boolean;
      explanation: L;
    };

export interface PracticeLesson {
  type: 'practice';
  id: string;
  title: L;
  minutes: number;
  intro?: L;
  questions: QuizQuestion[];
}

export interface GameLesson {
  type: 'game';
  id: string;
  title: L;
  minutes: number;
  intro: L;
  /** 对应旧版关卡数据里的 key */
  enigmaKey: string;
  /** 综合演练里的关卡序号（1-6） */
  stage: number;
  mode: 'guided' | 'challenge';
}

export type Lesson = ConceptLesson | ExampleLesson | PracticeLesson | GameLesson;

export interface GlossaryTerm {
  id: string;
  term: L;
  definition: L;
}

export interface Module {
  id: string;
  order: number;
  code: string;
  title: L;
  subtitle: L;
  description: L;
  /** 学完这个模块能做到什么（3 条以内） */
  outcomes: L[];
  estimatedMinutes: number;
  icon: 'password' | 'mail' | 'cipher' | 'wifi' | 'social' | 'response';
  lessons: Lesson[];
  glossary: GlossaryTerm[];
}

/* ---------- 关卡数据（实战演练用，由旧版数据转换而来） ---------- */

export interface EnigmaData {
  key: string;
  code: string;
  tag: L;
  title: L;
  brief: L;
  /** 题面 HTML（可信内容，来自仓库内数据） */
  content: L;
  answer: string | L;
  accept?: string[];
  answerNote?: L;
  hints: Record<Lang, string[]>;
  explain: L;
  nudges: Record<Lang, string[]>;
}

export interface ScenarioMeta {
  key: 'main' | 'classic' | 'alt';
  code: string;
  label: L;
  title: L;
  briefing: L;
  enigmas: string[];
}

