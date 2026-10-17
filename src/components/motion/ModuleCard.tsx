import { useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Module } from '../../content/types';
import { ModuleIcon } from '../ModuleIcon';
import { useLang } from '../../i18n/LangContext';
import { usePrefersReducedMotion } from './Reveal';
import '../../styles/motion.css';

export interface ModuleCardProps {
  /** 模块数据（title / subtitle 由组件内部按当前语言取） */
  module: Module;
  /** 模块完成百分比 0–100 */
  percent: number;
  /** 状态徽章文案（已完成 / 进行中 / 未开始），由调用方翻译后传入 */
  statusLabel: string;
  /** 课时数标签，如「4 课时」 */
  lessonsLabel: string;
  /** 预计时长标签，如「35 分钟」 */
  minutesLabel: string;
  /** 目标链接，如 `/modules/wifi` */
  href: string;
  /** 额外类名 */
  className?: string;
}

/**
 * 雷霆档案模块卡：
 * - 桌面指针倾斜 / 轻微磁吸（rAF 节流，写 CSS 变量，不触发 React 重渲染）；
 * - 触屏（pointer: coarse / hover: none）与 prefers-reduced-motion 下完全禁用倾斜；
 * - 巨型幽灵图标 + 序号、渐变描边、hover 电流扫过、底部进度条与状态徽章。
 */
export function ModuleCard({
  module,
  percent,
  statusLabel,
  lessonsLabel,
  minutesLabel,
  href,
  className
}: ModuleCardProps) {
  const { pick } = useLang();
  const reduced = usePrefersReducedMotion();
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointRef = useRef<{ x: number; y: number } | null>(null);

  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  const statusTone = clamped >= 100 ? 'tag--ok' : clamped > 0 ? 'tag--brand' : '';
  const status = clamped >= 100 ? 'done' : clamped > 0 ? 'active' : 'idle';

  const clearTilt = () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    pointRef.current = null;
    const node = anchorRef.current;
    if (!node) return;
    node.removeAttribute('data-tilt');
    for (const name of ['--tilt-x', '--tilt-y', '--shift-x', '--shift-y', '--gx', '--gy']) {
      node.style.removeProperty(name);
    }
  };

  useEffect(() => {
    if (reduced) clearTilt();
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (reduced || event.pointerType !== 'mouse') return;
    const node = anchorRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointRef.current = {
      x: Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1)),
      y: Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1))
    };
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const card = anchorRef.current;
      const point = pointRef.current;
      if (!card || !point) return;
      card.setAttribute('data-tilt', 'on');
      card.style.setProperty('--tilt-x', `${(-point.y * 5).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(point.x * 7).toFixed(2)}deg`);
      card.style.setProperty('--shift-x', `${(point.x * 2.5).toFixed(2)}px`);
      card.style.setProperty('--shift-y', `${(point.y * 2.5).toFixed(2)}px`);
      card.style.setProperty('--gx', `${(point.x * rect.width * 0.5).toFixed(1)}px`);
      card.style.setProperty('--gy', `${(point.y * rect.height * 0.5).toFixed(1)}px`);
    });
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (reduced || event.pointerType !== 'mouse') return;
    anchorRef.current?.setAttribute('data-tilt', 'on');
  };

  return (
    <Link
      ref={anchorRef}
      to={href}
      className={['mcard', className ?? ''].filter(Boolean).join(' ')}
      data-status={status}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={clearTilt}
      onPointerCancel={clearTilt}
      onBlur={clearTilt}
    >
      <span className="mcard__frame" aria-hidden="true" />
      <span className="mcard__sweep" aria-hidden="true" />
      <span className="mcard__glow" aria-hidden="true" />
      <span className="mcard__ghost" aria-hidden="true">
        <ModuleIcon icon={module.icon} size={200} />
      </span>
      <span className="mcard__serial" aria-hidden="true">
        {String(module.order).padStart(2, '0')}
      </span>

      <span className="mcard__head">
        <span className="mcard__code mono">
          <span className="mcard__lamp" aria-hidden="true" />
          {module.code} · THUNDER ARCHIVE
        </span>
        <span className={['tag', 'mcard__status', statusTone].filter(Boolean).join(' ')}>{statusLabel}</span>
      </span>

      <span className="mcard__body">
        <span className="mcard__title">{pick(module.title)}</span>
        <span className="mcard__sub">{pick(module.subtitle)}</span>
      </span>

      <span className="mcard__meta">
        <span className="mcard__chip">{lessonsLabel}</span>
        <span className="mcard__chip">{minutesLabel}</span>
      </span>

      <span className="mcard__foot">
        <span className="mcard__bar" aria-hidden="true">
          <span className="mcard__bar-fill" style={{ '--p': clamped / 100 } as CSSProperties} />
        </span>
        <span className="mcard__pct mono">{clamped}%</span>
        <span className="mcard__go mono" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}
