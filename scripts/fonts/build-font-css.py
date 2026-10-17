"""从 npm 字体包里挑出覆盖站点字符集的 woff2 子集，复制到仓库并生成本地 @font-face CSS。
- 正文/标题：LXGW WenKai regular，覆盖站点全部字符
- 等宽：LXGW WenKai Mono regular，只覆盖拉丁/数字/标点/箭头（中文在 mono 栈里回落到 WenKai 正文字体）
- 不加粗体：主题已设置 font-synthesis-weight: none，全站不使用合成粗体
"""

import re
import sys
import shutil
from pathlib import Path

pkg = Path(sys.argv[1])
chars_file = Path(sys.argv[2])
repo = Path(sys.argv[3])

chars = set(chars_file.read_text(encoding="utf-8"))
codepoints = {ord(c) for c in chars}


def mono_charset(values):
    out = set()
    for ch in values:
        cp = ord(ch)
        if (
            0x20 <= cp <= 0x7E
            or 0xA0 <= cp <= 0xFF
            or 0x2000 <= cp <= 0x206F
            or 0x2190 <= cp <= 0x21FF
            or 0x25A0 <= cp <= 0x25FF
            or cp == 0x00B7
        ):
            out.add(ch)
    return out


mono_points = {ord(c) for c in mono_charset(chars)}
print("charset:", len(chars), "mono charset:", len(mono_points))

BLOCK_RE = re.compile(r"@font-face\s*\{(?P<body>.*?)\}", re.S)
FAMILY_RE = re.compile(r"font-family:\s*'([^']+)'")
WEIGHT_RE = re.compile(r"font-weight:\s*([^;]+);")
URL_RE = re.compile(r"url\('\./files/([^']+\.woff2)'\)")
RANGE_RE = re.compile(r"unicode-range:\s*([^;]*);?")


def parse_ranges(text):
    out = set()
    for part in text.split(","):
        part = part.strip()
        if not part:
            continue
        part = part.replace("U+", "").replace("u+", "")
        if "-" in part:
            a, b = part.split("-")
            out.update(range(int(a, 16), int(b, 16) + 1))
        else:
            out.add(int(part, 16))
    return out


jobs = [
    ("lxgwwenkai-regular.css", codepoints),
    ("lxgwwenkaimono-regular.css", mono_points),
]
needed = {}
for css_name, points in jobs:
    css = (pkg / css_name).read_text(encoding="utf-8")
    total = 0
    hit = 0
    for m in BLOCK_RE.finditer(css):
        body = m.group("body")
        fm = FAMILY_RE.search(body)
        wm = WEIGHT_RE.search(body)
        um = URL_RE.search(body)
        rm = RANGE_RE.search(body)
        if not (fm and um and rm):
            continue
        total += 1
        if not (parse_ranges(rm.group(1)) & points):
            continue
        hit += 1
        needed[um.group(1)] = {
            "family": fm.group(1),
            "weight": wm.group(1).strip() if wm else "400",
            "ranges": rm.group(1).strip(),
        }
    print(css_name, "blocks:", total, "needed:", hit)

out_dir = repo / "assets" / "fonts"
if out_dir.exists():
    shutil.rmtree(out_dir)
out_dir.mkdir(parents=True)

blocks = []
total_bytes = 0
for fname, meta in sorted(needed.items()):
    src = pkg / "files" / fname
    if not src.exists():
        print("MISSING", fname)
        continue
    shutil.copy2(src, out_dir / fname)
    total_bytes += src.stat().st_size
    blocks.append(
        "@font-face {\n"
        f"  font-family: '{meta['family']}';\n"
        "  font-style: normal;\n"
        f"  font-weight: {meta['weight']};\n"
        "  font-display: swap;\n"
        f"  src: url('../assets/fonts/{fname}') format('woff2');\n"
        f"  unicode-range: {meta['ranges']};\n"
        "}\n"
    )

header = (
    "/* ==========================================================================\n"
    "   霞鹜文楷（LXGW WenKai）本地子集字体\n"
    "   --------------------------------------------------------------------------\n"
    "   只收录本站实际用到的字符（%d 个码位），按 lxgw-wenkai-webfont@1.7.0 的\n"
    "   unicode-range 分片挑出后放进仓库，页面因此不依赖任何外部字体 CDN。\n"
    "   等宽字体只覆盖拉丁/数字/标点，中文在 --font-mono 栈里回落到正文文楷。\n"
    "   新增大量中文文案后若有生僻字回落到系统字体，重新跑一遍子集脚本即可。\n"
    "   ========================================================================== */\n\n"
) % len(chars)
(repo / "css" / "fonts.css").write_text(header + "\n".join(blocks), encoding="utf-8")
print("files:", len(blocks), "bytes:", total_bytes)
