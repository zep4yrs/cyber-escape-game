import { useCallback, useEffect, useRef, useState } from 'react';
import { useLang } from '../../i18n/LangContext';
import '../../styles/fx.css';

/**
 * 雷霆档案 · 开屏（BootIntro）
 *
 * 每个浏览器会话只播放一次：解密进度条 + 乱码字符流 + 档案编号，
 * 约 1.05s 开始退场、1.35s 卸载；点击 / 任意按键可立即跳过。
 * prefers-reduced-motion: reduce 时直接不渲染（CSS 侧还有兜底隐藏）。
 */

const STORAGE_KEY = 'dl:boot.seen.v1';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const EXIT_AT_MS = 1050;
const REMOVE_AT_MS = 1350;
const SKIP_EXIT_MS = 240;
const PROGRESS_TICK_MS = 34;
const GLYPH_TOTAL = 34;
const GLYPH_POOL = '0123456789ABCDEF#*%+=<>/\\|';

/** 无 sessionStorage 时的兜底：本次页面加载内只播放一次 */
let bootPlayedForPage = false;

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION).matches;
}

function shouldPlayBoot(): boolean {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotion()) return false;
  if (bootPlayedForPage) return false;
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY) === '1') return false;
  } catch {
    /* 隐私模式下 sessionStorage 可能不可用，退化为本次页面加载一次 */
  }
  return true;
}

/** 进度驱动的伪随机字符流：进度越高，固定下来的字符越多 */
function glyphLine(progress: number): string {
  const settled = Math.round((progress / 100) * GLYPH_TOTAL);
  const tick = Math.round(progress * 3);
  let out = '';
  for (let i = 0; i < GLYPH_TOTAL; i += 1) {
    const source =
      i < settled ? GLYPH_POOL[i % 10] : GLYPH_POOL[(i * 7 + tick * 13 + i * i) % GLYPH_POOL.length];
    out += source;
    if (i % 2 === 0) out += ' ';
  }
  return out.trim();
}

export interface BootIntroProps {
  /** 退场完成（或直接跳过）后回调一次，便于上层做后续编排 */
  onDone?: () => void;
}

export function BootIntro({ onDone }: BootIntroProps) {
  const { t } = useLang();
  const [active, setActive] = useState<boolean>(shouldPlayBoot);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setActive(false);
    onDone?.();
  }, [onDone]);

  /* 记录“本会话已播放”，并安排自动退场 */
  useEffect(() => {
    if (!active) return;
    bootPlayedForPage = true;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setLeaving(true), EXIT_AT_MS));
    timers.push(window.setTimeout(finish, REMOVE_AT_MS));
    timersRef.current = timers;
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, [active, finish]);

  /* 解密进度：约 0.85s 走到 100% */
  useEffect(() => {
    if (!active || leaving) return;
    const id = window.setInterval(() => {
      setProgress((value) => Math.min(100, value + 4));
    }, PROGRESS_TICK_MS);
    return () => window.clearInterval(id);
  }, [active, leaving]);

  const skip = useCallback(() => {
    if (!active || leaving) return;
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    setLeaving(true);
    setProgress(100);
    timersRef.current.push(window.setTimeout(finish, SKIP_EXIT_MS));
  }, [active, leaving, finish]);

  /* 任意按键跳过（不拦截浏览器快捷键组合） */
  useEffect(() => {
    if (!active || leaving) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt' || event.key === 'Meta') return;
      event.preventDefault();
      skip();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, leaving, skip]);

  if (!active) return null;

  return (
    <div
      className={`fx-boot${leaving ? ' is-out' : ''}`}
      aria-hidden="true"
      onClick={skip}
    >
      <div className="fx-boot__frame">
        <div className="fx-boot__top">
          <span className="fx-boot__label mono">
            {t('intro.bootLabel')}
            <span className="fx-boot__caret" />
          </span>
          <span className="fx-boot__code mono">MIST ARCHIVE · ARC-01</span>
        </div>

        <p className="fx-boot__name">{t('brand.name')}</p>

        <p className="fx-boot__glyphs mono">{glyphLine(progress)}</p>

        <div
          className="fx-boot__bar"
          role="progressbar"
          aria-label={t('intro.decrypting')}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span className="fx-boot__bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="fx-boot__foot">
          <span className="fx-boot__status mono">
            {t('intro.decrypting')} <b>{progress}%</b>
          </span>
          <span className="fx-boot__skip mono">
            {t('intro.skip')}
            <span className="fx-boot__esc">ESC</span>
          </span>
        </div>
      </div>
      <span className="fx-boot__hint mono">CLICK / ANY KEY TO SKIP</span>
    </div>
  );
}
