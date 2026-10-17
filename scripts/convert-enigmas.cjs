/* 把旧版关卡数据转换为新架构的 TypeScript 数据文件 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const repo = process.argv[2];
const sb = { window: {} };
vm.createContext(sb);
for (const f of [
  'legacy/js/data/scenarios.js',
  'legacy/js/data/enigmas-main.js',
  'legacy/js/data/enigmas-alt.js',
  'legacy/js/data/enigmas-classic.js'
]) {
  vm.runInContext(fs.readFileSync(path.join(repo, f), 'utf8'), sb, { filename: f });
}

const SCENARIOS = sb.window.SCENARIOS;
const ENIGMAS = sb.window.ENIGMAS;

const scenarios = {};
for (const key of ['main', 'classic', 'alt']) {
  const s = SCENARIOS[key];
  scenarios[key] = {
    key: s.key,
    code: s.code,
    label: s.label,
    title: s.title,
    briefing: s.briefing,
    enigmas: s.enigmas
  };
}

const enigmas = {};
for (const key of Object.keys(ENIGMAS)) {
  const e = ENIGMAS[key];
  enigmas[key] = {
    key: e.key,
    code: e.code,
    tag: e.tag,
    title: e.title,
    brief: e.brief,
    content: e.content,
    answer: e.answer,
    accept: e.accept,
    answerNote: e.answerNote,
    hints: e.hints,
    explain: e.explain,
    nudges: e.nudges
  };
}

const header = `/* 由 legacy/js/data/* 自动转换生成，请勿手改；如要改题面/答案，请修改后重新运行 scripts/convert-enigmas.cjs */
import type { EnigmaData, ScenarioMeta } from './types';

`;
const body =
  'export const SCENARIOS: Record<\'main\' | \'classic\' | \'alt\', ScenarioMeta> = ' +
  JSON.stringify(scenarios, null, 2) +
  ';\n\nexport const ENIGMAS: Record<string, EnigmaData> = ' +
  JSON.stringify(enigmas, null, 2) +
  ';\n';

const out = path.join(repo, 'src/content/enigmas.ts');
fs.writeFileSync(out, header + body, 'utf8');
console.log('written', out, fs.statSync(out).size, 'bytes');
