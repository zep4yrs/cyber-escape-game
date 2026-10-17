# 本地子集字体生成

页面使用霞鹜文楷（LXGW WenKai / LXGW WenKai Mono）的本地子集，只为站点实际用到的
字符打包 woff2，避免依赖外部字体 CDN。字体为 SIL Open Font License 1.1。

## 重新生成

当中文文案大量增删、出现生僻字回退到系统字体时，重新跑一遍：

```bash
# 1. 取 woff2 分片包（npm 上按 unicode-range 切成约 97 片）
npm pack lxgw-wenkai-webfont@1.7.0
tar -xzf lxgw-wenkai-webfont-1.7.0.tgz

# 2. 收集新架构源码（src/ + index.html）里用到的字符
node scripts/fonts/collect-chars.cjs . /tmp/chars.txt

# 3. 按字符挑分片、复制到 public/fonts/ 并生成 public/fonts/fonts.css
python scripts/fonts/build-font-css.py ./package /tmp/chars.txt .
```

脚本只使用常规体与等宽常规体；主题设置了 `font-synthesis-weight: none`，全站不使用合成粗体。
等宽字体只覆盖拉丁/数字/标点，中文在 `--font-mono` 字体栈里回落到正文文楷。
