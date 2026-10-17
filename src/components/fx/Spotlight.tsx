import { useEffect, useRef, useState, type RefObject } from 'react';
import '../../styles/fx.css';

/**
 * 雷霆档案 · 指针聚光（Spotlight）
 *
 * 把一块柔光跟随鼠标限制在目标容器（通常是首页 hero）内：
 * - 仅在「桌面 + 精确指针 + 非 reduced-motion」时启用，触屏 / 移动端直接不渲染
 * - 用 clip-path 把固定层裁剪到容器矩形，滚出视口自动熄灭
 * - aria-hidden + pointer-events: none，不影响点击与阅读
 *
 * 用法：
 *   const heroRef = useRef<HTMLElement>(null);
 *   <section className="hero" ref={heroRef}>…</section>
 *   <Spotlight targetRef={heroRef} />
 */

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

export interface SpotlightProps {
  /** 绑定聚光范围的容器（例如首页 hero section 的 ref） */
  targetRef: RefObject<HTMLElement | null>;
}

function spotlightAllowed(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(FINE_POINTER).matches && !window.matchMedia(REDUCED_MOTION).matches;
}

export function Spotlight({ targetRef }: SpotlightProps) {
  const glowRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState<boolean>(spotlightAllowed);

  /* 系统偏好 / 指针类型变化时实时开关 */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fine = window.matchMedia(FINE_POINTER);
    const reduced = window.matchMedia(REDUCED_MOTION);
    const sync = () => setEnabled(fine.matches && !reduced.matches);
    sync();
    fine.addEventListener('change', sync);
    reduced.addEventListener('change', sync);
    return () => {
      fine.removeEventListener('change', sync);
      reduced.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const target = targetRef.current;
    const glow = glowRef.current;
    if (!target || !glow) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const paint = () => {
      frame = 0;
      if (!pending) return;
      const { x, y } = pending;
      pending = null;
      const rect = target.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        glow.classList.remove('is-on');
        return;
      }
      const top = Math.max(0, rect.top);
      const right = Math.max(0, window.innerWidth - rect.right);
      const bottom = Math.max(0, window.innerHeight - rect.bottom);
      const left = Math.max(0, rect.left);
      glow.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`;
      glow.style.setProperty('--fx-spot-x', `${x}px`);
      glow.style.setProperty('--fx-spot-y', `${y}px`);
      glow.classList.toggle(
        'is-on',
        x >= left && x <= window.innerWidth - right && y >= top && y <= window.innerHeight - bottom
      );
    };

    const onPointerMove = (event: PointerEvent) => {
      pending = { x: event.clientX, y: event.clientY };
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const hide = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      pending = null;
      glow.classList.remove('is-on');
    };

    target.addEventListener('pointermove', onPointerMove);
    target.addEventListener('pointerleave', hide);
    window.addEventListener('scroll', hide, { passive: true });
    window.addEventListener('resize', hide, { passive: true });
    return () => {
      target.removeEventListener('pointermove', onPointerMove);
      target.removeEventListener('pointerleave', hide);
      window.removeEventListener('scroll', hide);
      window.removeEventListener('resize', hide);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled, targetRef]);

  if (!enabled) return null;
  return <span ref={glowRef} className="fx-spotlight" aria-hidden="true" />;
}
