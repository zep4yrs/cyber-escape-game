# 数字封锁行动 · Operation Digital Lockdown

> 校园网络安全意识密室逃脱 · 六道谜题 / 30 分钟 / 4–5 人一队
> 中文 · English · Français 三语 · 纯静态、零构建、可直接部署 GitHub Pages

一个把「网络安全第一课」做成密室逃脱的教学项目：一场针对校园网的勒索攻击正在发生，
玩家要在 30 分钟内解开六道谜题，逐段切断攻击链。题目全部取材于真实的攻击环节
——弱口令、钓鱼邮件、古典密码、恶意 Wi-Fi、社会工程学与最终的反制算法。

视觉语言为**雾蓝档案（Mist Indigo Archive）**：浅蓝紫纸面、方格纸纹、靛蓝墨色、
等宽著录标签与图版式排版，参考枫桥的作品档案站 [work.feng-qiao.top](https://work.feng-qiao.top/)。

---

## 在线体验

**<https://zep4yrs.github.io/cyber-escape-game/>**

| 页面 | 地址 | 用途 |
| --- | --- | --- |
| 行动首页 | `/index.html` | 情况通报、模式入口、机制与教学目标 |
| 主线行动（进阶） | `/game.html` | 6 关进阶谜题 |
| 经典行动 | `/game1.html` | 更适合第一次上手的一组谜题 |
| 口令协议 | `/game2.html` | 中文版编码表谜题，法/英版保留原始五词密码 |
| 教师控制台 | `/admin.html` | 实时查看本机各队进度、广播、排行榜、导出成绩 |
| 队伍二维码 | `/qr_generator.html` | 批量生成带 `?team=` 参数的二维码并打印 |

---

## 玩法与计分

- **计时**：30 分钟倒计时，时间耗尽即行动结束（可查看解析）。
- **计分**：每关 `100 + 剩余秒数 × 2 −（尝试次数 − 1）× 10 − 已用提示 × 20`，单关最低 0 分。
- **提示**：每关三条递进提示，每次 −20 分。
- **尝试**：每关最多 5 次，答错 5 次后揭晓答案并进入下一关（该关不计分）。
- **记录**：成绩写在浏览器 `localStorage`，无需后端；同一浏览器里刷新不会丢失进度
  （欢迎屏会询问是否继续上次行动）。

> 教师控制台通过同源 `localStorage` + `BroadcastChannel` 读取实时对局，所以
> **只在同一浏览器 / 同一台设备上有效**（例如教室投影机开多个标签页，或组织者用一台电脑试玩）。
> 如果要多设备实时汇总，需要自行接入后端或实时服务；前端的数据结构留在
> `js/game.js`（`cyberEscape:live` / `cyberEscape:results`），便于替换成真实接口。

---

## 本地运行

纯静态站点，没有构建步骤。因为用了相对路径脚本与本地字体文件，请通过 HTTP 服务打开，
不要直接双击 `index.html`：

```bash
# 任选一种
python -m http.server 8080
npx serve .
```

然后访问 <http://127.0.0.1:8080/>。

字体：正文中文使用霞鹜文楷（LXGW WenKai），按本站实际用到的字符做成**本地 woff2 子集**
（见 `assets/fonts/` 与 `css/fonts.css`），不依赖任何外部字体 CDN；首次加载后浏览器缓存，
字体未就绪时先回落到系统宋体/黑体，内容不会阻塞。重新生成方式见
[`scripts/fonts/README.md`](scripts/fonts/README.md)。

---

## 目录结构

```
index.html                 行动首页
game.html                  主线行动（进阶）
game1.html                 经典行动
game2.html                 口令协议
admin.html                 教师控制台
qr_generator.html          队伍二维码生成器
favicon.svg                站点图标
css/theme.css              设计令牌 + 基础排版 + 共享组件
css/fonts.css              霞鹜文楷本地子集 @font-face（assets/fonts/ 下的 woff2）
assets/fonts/              字体 woff2 分片（按站点字符集裁剪）
js/i18n.js                 三语引擎（zh / en / fr）
js/locales/common.js       全站通用文案
js/locales/home.js         首页文案
js/locales/game.js         游戏页文案
js/locales/admin.js        教师控制台文案
js/locales/qr.js           二维码页文案
js/data/scenarios.js       三种行动模式的元信息与关卡编排
js/data/enigmas-main.js    主线行动 6 关（三语）
js/data/enigmas-alt.js     口令协议第 1 关（三语）
js/data/enigmas-classic.js 经典行动 6 关（三语）
js/game.js                 游戏引擎（计时/判分/进度保存/广播）
js/admin.js                教师控制台逻辑
js/qr-generator.js         二维码生成逻辑
js/home.js                 首页脚本
js/pixel-field.js          首屏方格粒子场（canvas）
vendor/qrcode.js           本地二维码生成库（MIT，Kazuhiko Arase）
scripts/fonts/             字体子集生成脚本（collect-chars / build-font-css）
```

---

## 三语与内容维护

三语引擎 `js/i18n.js` 的用法：

```js
I18N.t('nav.home')                 // 当前语言文案
I18N.t('game.left', { n: 3 })      // 占位符
I18N.pick({ zh: '…', en: '…', fr: '…' })   // 取当前语言字段
I18N.setLang('en')                 // 切换 + 持久化 + 重刷页面
```

页面静态文案用 `data-i18n` / `data-i18n-html` / `data-i18n-attr` 标记；
动态渲染的内容监听 `I18N.onChange` 重新渲染。

**关卡数据**在 `js/data/enigmas-*.js` 中注册，每关结构：

```js
window.ENIGMAS['pwd_intercept'] = {
  key, code: 'EN-01',
  tag:   { zh, en, fr },
  title: { zh, en, fr },
  brief: { zh, en, fr },
  content: { zh: '<p>…</p>', en: '…', fr: '…' },  // 可用 .data-block/.data-table/.note/.warn/.kv/.code/.fragments
  answer: 'CBRUEI2024',                            // 或 { zh, en, fr } 按语言区分
  accept: ['…'],                                   // 可选：额外可接受写法
  hints:   { zh: ['…','…','…'], en: ['…','…','…'], fr: ['…','…','…'] },
  explain: { zh, en, fr }
};
```

- 新增行动模式：在 `js/data/scenarios.js` 里加一项，并新建对应页面（`data-scenario` 属性 + 加载对应数据文件即可）。
- 新增关卡：注册 key，然后把 key 加进 `SCENARIOS.<模式>.enigmas` 数组。
- 新增语言：在 `js/i18n.js` 的 `LANGS` / `LABEL` / `HTML_LANG` 里加语言代码，
  补齐各 `js/locales/*.js` 与数据文件里的该语言字段。

---

## 部署

### GitHub Pages（当前使用）

1. 仓库 **Settings → Pages → Source: Deploy from a branch**
2. 分支选 `main`，目录选 **`/ (root)`**（不要选 `/docs`，仓库里没有该目录）
3. 推送后自动构建，地址为 **<https://zep4yrs.github.io/cyber-escape-game/>**

### 其他静态托管

无构建依赖，`EdgeOne Pages`、`Cloudflare Pages`、Nginx、对象存储等把仓库根目录
作为静态目录直接托管即可。

---

## 与上游的关系

- 上游：[`becger/cyber-escape-game`](https://github.com/becger/cyber-escape-game)（法语原版，教学用途）。
- 本 fork 保留原版的关卡设定、答案与法文文案，重做了整套前端（视觉、响应式、
  三语、教师控制台、二维码页），并修复了原版中的几处缺陷：

| 原版问题 | 处理 |
| --- | --- |
| `admin.html` 引用的 `js/admin.js` 不存在，后台不可用 | 重写完整教师控制台 |
| 首页链接 `qr-generator.html` 与文件名 `qr_generator.html` 不一致 | 统一为 `qr_generator.html` |
| EN-01 奇数位提取结果与答案不一致 | 题面补一步字母对调，使原答案可推 |
| EN-03 ROT-13 密文与答案不一致 | 修正密文为 `ERFRPHEVGL` |
| EN-06 答案在题面码表中直接出现 | 码表改为 ROT-13 密文 |
| 关卡数据与页面逻辑混写、无法复用 | 抽成 `js/data/*` + 单引擎，三页共享 |
| 依赖外部二维码 API | 改为 endor/qrcode.js 本地生成 |
| 字体依赖外部 CDN（CDN 慢时整页脚本被阻塞） | 改为本地 woff2 子集字体 |

三语文案在保留原版信息量的前提下重新撰写；答案逻辑保持不变（除非上表注明）。

---

## 许可与使用

本项目遵循上游仓库的许可约定，用于教学、社团与培训场合；欢迎按需修改。
二维码库 endor/qrcode.js 为 Kazuhiko Arase 的 MIT 许可作品。
字体 LXGW WenKai 以 SIL Open Font License 1.1 发布。
