import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Module } from '../content/types';

const STORAGE_KEY = 'dl:progress:v1';

export interface ModuleProgress {
  lessonsDone: Record<string, boolean>;
  quiz: Record<string, { correct: boolean; attempts: number; at: number }>;
  game: Record<string, { solved: boolean; revealed: boolean; attempts: number; at: number }>;
}

export interface ProgressState {
  version: 1;
  lastModuleId: string | null;
  lastLessonId: string | null;
  modules: Record<string, ModuleProgress>;
  challenge: { bestScore: number; lastScore: number; lastAt: number | null };
  updatedAt: number;
}

const EMPTY: ProgressState = {
  version: 1,
  lastModuleId: null,
  lastLessonId: null,
  modules: {},
  challenge: { bestScore: 0, lastScore: 0, lastAt: null },
  updatedAt: 0
};

function read(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as ProgressState;
    if (!parsed || parsed.version !== 1) return EMPTY;
    return {
      ...EMPTY,
      ...parsed,
      modules: parsed.modules ?? {},
      challenge: { ...EMPTY.challenge, ...(parsed.challenge ?? {}) }
    };
  } catch {
    return EMPTY;
  }
}

function emptyModuleProgress(): ModuleProgress {
  return { lessonsDone: {}, quiz: {}, game: {} };
}

interface ProgressContextValue {
  progress: ProgressState;
  moduleProgress: (module: Module) => {
    done: number;
    total: number;
    percent: number;
    completed: boolean;
    started: boolean;
  };
  isLessonDone: (moduleId: string, lessonId: string) => boolean;
  markLessonDone: (moduleId: string, lessonId: string) => void;
  isQuizCorrect: (moduleId: string, questionId: string) => boolean;
  recordQuiz: (moduleId: string, questionId: string, correct: boolean) => void;
  gameState: (moduleId: string, enigmaKey: string) => ModuleProgress['game'][string] | undefined;
  recordGame: (moduleId: string, enigmaKey: string, result: { solved: boolean; revealed: boolean }) => void;
  recordChallenge: (score: number) => void;
  setLastVisited: (moduleId: string, lessonId: string) => void;
  overall: (modules: Module[]) => {
    done: number;
    total: number;
    percent: number;
    completedModules: number;
    totalModules: number;
  };
  reset: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(read);
  const writeTimer = useRef<number | null>(null);

  useEffect(() => {
    if (writeTimer.current) window.clearTimeout(writeTimer.current);
    writeTimer.current = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch {
        /* ignore */
      }
    }, 150);
    return () => {
      if (writeTimer.current) window.clearTimeout(writeTimer.current);
    };
  }, [progress]);

  const updateModule = useCallback((moduleId: string, updater: (prev: ModuleProgress) => ModuleProgress) => {
    setProgress((prev) => {
      const current = prev.modules[moduleId] ?? emptyModuleProgress();
      return {
        ...prev,
        updatedAt: Date.now(),
        modules: { ...prev.modules, [moduleId]: updater(current) }
      };
    });
  }, []);

  const markLessonDone = useCallback(
    (moduleId: string, lessonId: string) => {
      updateModule(moduleId, (prev) => ({
        ...prev,
        lessonsDone: { ...prev.lessonsDone, [lessonId]: true }
      }));
    },
    [updateModule]
  );

  const recordQuiz = useCallback(
    (moduleId: string, questionId: string, correct: boolean) => {
      updateModule(moduleId, (prev) => {
        const existing = prev.quiz[questionId];
        return {
          ...prev,
          quiz: {
            ...prev.quiz,
            [questionId]: {
              correct: correct || Boolean(existing?.correct),
              attempts: (existing?.attempts ?? 0) + 1,
              at: Date.now()
            }
          }
        };
      });
    },
    [updateModule]
  );

  const recordGame = useCallback(
    (moduleId: string, enigmaKey: string, result: { solved: boolean; revealed: boolean }) => {
      updateModule(moduleId, (prev) => {
        const existing = prev.game[enigmaKey];
        return {
          ...prev,
          game: {
            ...prev.game,
            [enigmaKey]: {
              solved: result.solved || Boolean(existing?.solved),
              revealed: result.revealed || Boolean(existing?.revealed),
              attempts: existing?.attempts ?? 0,
              at: Date.now()
            }
          }
        };
      });
    },
    [updateModule]
  );

  const moduleProgress = useCallback(
    (module: Module) => {
      const mp = progress.modules[module.id];
      const total = module.lessons.length;
      const done = mp ? module.lessons.filter((lesson) => mp.lessonsDone[lesson.id]).length : 0;
      const percent = total ? Math.round((done / total) * 100) : 0;
      return {
        done,
        total,
        percent,
        completed: total > 0 && done === total,
        started: done > 0 || Boolean(mp && Object.keys(mp.quiz).length > 0)
      };
    },
    [progress.modules]
  );

  const overall = useCallback(
    (modules: Module[]) => {
      let done = 0;
      let total = 0;
      let completedModules = 0;
      modules.forEach((module) => {
        const mp = progress.modules[module.id];
        const moduleDone = mp ? module.lessons.filter((lesson) => mp.lessonsDone[lesson.id]).length : 0;
        done += moduleDone;
        total += module.lessons.length;
        if (module.lessons.length > 0 && moduleDone === module.lessons.length) completedModules += 1;
      });
      return {
        done,
        total,
        percent: total ? Math.round((done / total) * 100) : 0,
        completedModules,
        totalModules: modules.length
      };
    },
    [progress.modules]
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      moduleProgress,
      isLessonDone: (moduleId, lessonId) => Boolean(progress.modules[moduleId]?.lessonsDone[lessonId]),
      markLessonDone,
      isQuizCorrect: (moduleId, questionId) => Boolean(progress.modules[moduleId]?.quiz[questionId]?.correct),
      recordQuiz,
      gameState: (moduleId, enigmaKey) => progress.modules[moduleId]?.game[enigmaKey],
      recordGame,
      recordChallenge: (score) =>
        setProgress((prev) => ({
          ...prev,
          updatedAt: Date.now(),
          challenge: {
            bestScore: Math.max(prev.challenge.bestScore, score),
            lastScore: score,
            lastAt: Date.now()
          }
        })),
      setLastVisited: (moduleId, lessonId) =>
        setProgress((prev) => ({ ...prev, lastModuleId: moduleId, lastLessonId: lessonId })),
      overall,
      reset: () => setProgress({ ...EMPTY, updatedAt: Date.now() })
    }),
    [progress, moduleProgress, markLessonDone, recordQuiz, recordGame, overall]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
