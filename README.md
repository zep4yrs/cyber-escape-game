# 数字封锁行动 · 网络安全学习路径

面向大一新生的网络安全学习项目。这一版把原来的「一次性密室逃脱」重构为**以学习为中心的路径**：

- 六个模块，每个模块固定走 **概念 → 示例 → 练习 → 实战** 四步
- 学习路径首页显示总进度、每个模块的完成度与继续学习入口
- 每课可独立完成，练习即时反馈；实战关卡的提示、方向提示、解析都内置在页面里
- 三语（中文 / English / Français），进度保存在本机浏览器
- 术语表按模块汇总，可搜索、可筛选

配色沿用 [work.feng-qiao.top](https://work.feng-qiao.top) 的雾蓝档案色系；版式、组件与信息架构按「专注学习」重新设计。

线上地址：**https://zep4yrs.github.io/cyber-escape-game/**

---

## 技术架构

```text
src/
  content/
    types.ts            课程与关卡的数据模型（唯一内容契约）
    enigmas.ts          由 legacy 关卡数据自动转换的实战数据
    modules/
      mod-01.ts …       每个模块一个文件（三语内容，纯数据）
      index.ts           自动发现模块 + 术语表聚合
  i18n/
    dict.ts             界面文案（zh / en / fr）
    LangContext.tsx     语言状态、localStorage、t()/pick()
  lib/
    ProgressContext.tsx 学习进度（localStorage，按模块/课时/练习/实战记录）
  components/
    AppShell.tsx        顶栏、导航、页脚
    RichBlocks.tsx      课程内容块渲染器（段落/列表/步骤/提示/表格/代码/对比）
    Quiz.tsx            选择/填空练习，即时反馈
    game/               EnigmaPlayer（单关）与 ChallengeRunner（30 分钟综合演练）
    fx/                 开屏、氛围层、指针聚光（Atmosphere / BootIntro / Spotlight）
    motion/             模块卡、进度环、数字滚动、滚动入场
  pages/                首页 / 模块页 / 术语表 / 综合演练 / 404
  styles/               设计令牌、雷霆档案视觉层、基础排版、页面与组件样式
scripts/
  convert-enigmas.cjs   旧数据 → src/content/enigmas.ts
  fonts/                本地字体子集生成工具
legacy/                 旧版纯静态站点（仅存档参考，不参与构建）
```

技术栈：React 19 + TypeScript + Vite；路由用 React Router；无后端，纯静态部署。

## 视觉系统：雷霆档案 THUNDER ARCHIVE

保留 work.feng-qiao.top 的雾蓝纸面与靛蓝主色，叠加电光紫 / 雷暴青 / 信号琥珀：

- **开屏**：每次会话一次的解密 Boot 动画，可点任意键或 Esc 跳过；`prefers-reduced-motion` 下不播放。
- **氛围层**：固定光晕、扫描线、噪点、暗角、四角 HUD 刻度；hero 指针跟随聚光（桌面）。
- **首页**：模块档案卡（幽灵图标 / 电流扫光 / 指针倾斜 / 进度条）、雷霆进度环（渐变描边 + 刻度 + 数字滚动）、威胁情报 ticker。
- **阅读页**：顶部阅读进度条；`F` 进入**专注模式**（隐藏导航 / 目录 / 页脚，专注正文），`?` 查看快捷键，`Esc` 退出；完成模块时出现归档横幅。
- **实战**：深色玻璃 HUD、计时压力光、尝试次数 pips、方向提示/反馈芯片、评分与结算动效。
- **降级**：所有动效在 `prefers-reduced-motion: reduce` 下关闭或直接显示终态；触屏禁用倾斜/指针光效。
- **字体**：本地 WenKai 子集仅用于标题与导语，正文使用系统无衬线，`font-display: swap`。

## 本地运行

```bash
npm install
npm run dev       # http://localhost:5173/cyber-escape-game/
npm run build     # 产物在 dist/（base = /cyber-escape-game/）
npm run preview
```

## 内容维护

- **课程内容**：`src/content/modules/mod-0X.ts`。每个模块导出 `Module`：模块信息、4 节课（`concept` / `example` / `practice` / `game`）、术语表。新增模块只要放 `mod-*.ts`，会被自动发现并按 `order` 排序。
- **界面文案**：`src/i18n/dict.ts`，key 由页面统一使用；新增 key 时三语一起加。
- **实战关卡**：由 `legacy/js/data/*` 转换生成 `src/content/enigmas.ts`；要改题面/答案请改 legacy 数据后运行 `node scripts/convert-enigmas.cjs .`，再人工核对产物。
- **字体**：`public/fonts/` 为本地子集字体；大量新增中文文案后按 `scripts/fonts/README.md` 重新生成。
- **学习进度**：只存在浏览器 localStorage（`dl:progress:v1`），换设备不同步；页脚有说明。

## 部署

推送到 `main` 后由 GitHub Actions（`.github/workflows/deploy.yml`）构建并发布到 GitHub Pages：

- `npm ci && npm run build`
- 生成 `404.html` 作为 SPA 回退
- 上传 `dist/` 并部署

首次切换需要把仓库 Pages 的 Build and deployment Source 改为 **GitHub Actions**。

## 与旧版的关系

- `legacy/` 保留了上一版纯静态的密室逃脱（game.html / game1.html / game2.html / admin.html / qr_generator.html 等），只作存档与内容来源参考，不参与构建。
- 题面、答案与解析沿用旧版关卡数据（由脚本转换）；新的课程概念、示例与练习是基于它们重新撰写的学习内容。
- 教师控制台与二维码页暂未迁入新架构，需要的团队可继续使用 `legacy/` 中的版本，或基于新的数据结构重新实现。

## 许可与致谢

- 上游项目：[`becger/cyber-escape-game`](https://github.com/becger/cyber-escape-game)（法语原版，教学用途）。
- 二维码库 `legacy/vendor/qrcode.js` 为 Kazuhiko Arase 的 MIT 作品。
- 字体 LXGW WenKai 以 SIL Open Font License 1.1 发布，本站使用本地子集。
- 本项目用于教学、社团与培训场合，欢迎按需修改。
