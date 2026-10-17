/* 从站点源码中收集实际用到的字符，生成字体子集清单 */
const fs = require('fs');
const path = require('path');

const root = process.argv[2];
const outFile = process.argv[3];
const skipDirs = new Set(['.git', 'preview', 'node_modules', 'vendor']);

const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) walk(full);
    } else if (/\.(html|js|css|md|txt|json)$/i.test(entry.name)) {
      files.push(full);
    }
  }
})(root);

const chars = new Set();
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    // 只收可打印字符：ASCII、拉丁补充、通用标点、箭头、CJK、全角标点
    if (
      (cp >= 0x20 && cp <= 0x7e) ||
      (cp >= 0xa0 && cp <= 0xff) ||
      (cp >= 0x2010 && cp <= 0x203a) ||
      (cp >= 0x2190 && cp <= 0x21ff) ||
      (cp >= 0x2460 && cp <= 0x24ff) ||
      (cp >= 0x25a0 && cp <= 0x25ff) ||
      (cp >= 0x3000 && cp <= 0x303f) ||
      (cp >= 0x3400 && cp <= 0x4dbf) ||
      (cp >= 0x4e00 && cp <= 0x9fff) ||
      (cp >= 0xff00 && cp <= 0xffef) ||
      cp === 0x00b7 ||
      cp === 0x2713 ||
      cp === 0x2717 ||
      cp === 0x200b
    ) {
      chars.add(ch);
    }
  }
}

const sorted = [...chars].sort((a, b) => a.codePointAt(0) - b.codePointAt(0)).join('');
fs.writeFileSync(outFile, sorted, 'utf8');

const cjk = [...chars].filter((ch) => ch.codePointAt(0) >= 0x3400).length;
console.log(JSON.stringify({ files: files.length, total: chars.size, cjk }, null, 2));
