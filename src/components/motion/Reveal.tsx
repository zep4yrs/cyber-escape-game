import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import '../../styles/motion.css';

/**
 * 系统「减少动态效果」偏好检测。
 * 所有动效组件共享：为 true 时直接输出终态，不创建 rAF / 观察器动画。
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export interface RevealProps {
  children: ReactNode;
  /** 入场延迟（毫秒），用于列表错峰；reduced-motion 下忽略 */
  delay?: number;
  /** IntersectionObserver 触发阈值，默认 0.18 */
  threshold?: number;
  /** 是否只播放一次，默认 true */
  once?: boolean;
  /** 额外类名，方便外部定位 */
  className?: string;
}

/**
 * 滚动入场包装：元素进入视口后淡入 + 轻微上浮。
 * - 默认只播一次（once=true），离开视口不重置；
 * - prefers-reduced-motion 或浏览器不支持 IntersectionObserver 时直接显示；
 * - 只动画 transform / opacity，不触发重排。
 */
export function Reveal({ children, delay = 0, threshold = 0.18, once = true, className }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const shown = reduced || visible;

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, threshold, once]);

  return (
    <div
      ref={ref}
      className={['reveal', shown ? 'is-in' : '', className ?? ''].filter(Boolean).join(' ')}
      style={{ '--reveal-delay': `${Math.max(0, delay)}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
