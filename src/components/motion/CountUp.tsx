import { useEffect, useRef, useState } from 'react';
import '../../styles/motion.css';
import { usePrefersReducedMotion } from './Reveal';

export interface CountUpProps {
  /** 目标数字 */
  value: number;
  /** 滚动时长（毫秒），默认 900 */
  duration?: number;
  /** 自定义格式化，默认四舍五入为整数 */
  format?: (value: number) => string;
  /** 额外类名 */
  className?: string;
  /** 默认 aria-hidden=true：纯视觉数字，语义由外层容器提供 */
  ariaHidden?: boolean;
}

const defaultFormat = (value: number) => String(Math.round(value));

/**
 * 数字滚动：用 requestAnimationFrame 从当前值缓动到目标值。
 * - prefers-reduced-motion 下直接显示终值，不创建 rAF；
 * - 每次只写 state、不操作布局；卸载或 value 变化时自动取消上一帧。
 */
export function CountUp({
  value,
  duration = 900,
  format = defaultFormat,
  className,
  ariaHidden = true
}: CountUpProps) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState<number>(() => (reduced ? value : 0));
  const currentRef = useRef<number>(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      currentRef.current = value;
      setDisplay(value);
      return;
    }
    const from = currentRef.current;
    if (from === value) {
      setDisplay(value);
      return;
    }
    const startTime = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / Math.max(1, duration));
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = from + (value - from) * eased;
      currentRef.current = next;
      setDisplay(next);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, duration, reduced]);

  return (
    <span className={['countup', className ?? ''].filter(Boolean).join(' ')} aria-hidden={ariaHidden || undefined}>
      {format(display)}
    </span>
  );
}
