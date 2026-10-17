import type { Module } from '../types';

/**
 * 课程模块自动发现：src/content/modules/mod-*.ts 每个文件默认导出一个 Module。
 * 新增模块只需要放文件，不需要改这里。
 */
const modules = import.meta.glob<{ default: Module }>('./mod-*.ts', { eager: true });

export const MODULES: Module[] = Object.values(modules)
  .map((entry) => entry.default)
  .filter((module): module is Module => Boolean(module))
  .sort((a, b) => a.order - b.order);

export function getModule(id: string | undefined): Module | undefined {
  return MODULES.find((module) => module.id === id);
}

export function getLesson(module: Module, lessonId: string | undefined) {
  return module.lessons.find((lesson) => lesson.id === lessonId);
}

export interface GlossaryEntry {
  id: string;
  term: Module['title'];
  definition: Module['title'];
  moduleId: string;
  moduleCode: string;
  moduleTitle: Module['title'];
}

export const GLOSSARY: GlossaryEntry[] = MODULES.flatMap((module) =>
  module.glossary.map((term) => ({
    id: term.id,
    term: term.term,
    definition: term.definition,
    moduleId: module.id,
    moduleCode: module.code,
    moduleTitle: module.title
  }))
);

export const TOTAL_LESSONS = MODULES.reduce((sum, module) => sum + module.lessons.length, 0);
