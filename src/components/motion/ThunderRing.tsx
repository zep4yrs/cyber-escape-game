import { useEffect, useId, useState, type CSSProperties } from 'react';
import '../../styles/motion.css';
import { CountUp } from './CountUp';
import { usePrefersReducedMotion } from './Reveal';

export type ThunderRingTone = 'volt' | 'thunder' | 'flare';

export interface ThunderRingProps {
  /** 0–100 的百分比 */
  value: number;
  /** 直径（像素），默认 132 */
  size?: number;
  /** 无障碍名称；同时作为环下方的小标签显示 */
  label?: string;
  /** 配色：volt（紫→青，默认）/ thunder（青→琥珀）/ flare（琥珀→紫） */
  tone?: ThunderRingTone;
  /** 额外类名 */
  className?: string;
}

const TICK_COUNT = 48;

/**
 * 雷霆档案进度环：渐变描边 + 双环光晕 + 细刻度 + 环形流光 + 中心 CountUp。
 * 所有动效仅 transform / opacity / 一次性 stroke-dashoffset；
 * prefers-reduced-motion 下光晕、绕环旋转与描边动画全部静止，直接显示终值。
 */
export function ThunderRing({ value, size = 132, label, tone = 'volt', className }: ThunderRingProps) {
  const reduced = usePrefersReducedMotion();
  const [armed, setArmed] = useState(false);
  const rawId = useId();
  const gradientId = `thunder-ring-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const center = size / 2;
  const stroke = Math.max(6, Math.round(size * 0.062));
  const inset = Math.round(size * 0.078);
  const radius = Math.max(8, center - stroke / 2 - inset);
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference * (1 - clamped / 100);
  const offset = reduced || armed ? targetOffset : circumference;

  const tickInner = radius + stroke / 2 + Math.max(3, Math.round(size * 0.028));
  const tickOuter = tickInner + Math.max(3, Math.round(size * 0.026));

  const sparkAngle = (clamped / 100) * Math.PI * 2 - Math.PI / 2;
  const sparkX = center + radius * Math.cos(sparkAngle);
  const sparkY = center + radius * Math.sin(sparkAngle);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setArmed(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const ariaLabel = label ? `${label}: ${clamped}%` : `${clamped}%`;

  return (
    <div
      className={['thunder-ring', className ?? ''].filter(Boolean).join(' ')}
      data-tone={tone}
      role="img"
      aria-label={ariaLabel}
      style={{ width: size, height: size, '--ring-size': `${size}px` } as CSSProperties}
    >
      <svg className="thunder-ring__svg" viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--ring-a)" />
            <stop offset="100%" stopColor="var(--ring-b)" />
          </linearGradient>
        </defs>

        {/* 外圈细刻度 */}
        <g className="thunder-ring__ticks">
          {Array.from({ length: TICK_COUNT }, (_, index) => {
            const angle = (index / TICK_COUNT) * Math.PI * 2 - Math.PI / 2;
            const major = index % 4 === 0;
            const inner = major ? tickInner : tickInner + 1;
            const outer = major ? tickOuter + 1 : tickOuter;
            return (
              <line
                key={index}
                className={major ? 'is-major' : undefined}
                x1={center + inner * Math.cos(angle)}
                y1={center + inner * Math.sin(angle)}
                x2={center + outer * Math.cos(angle)}
                y2={center + outer * Math.sin(angle)}
              />
            );
          })}
        </g>

        {/* 慢速绕环的虚线轨道（reduced-motion 下静止） */}
        <circle
          className="thunder-ring__orbit"
          cx={center}
          cy={center}
          r={radius + stroke / 2 + Math.max(2, Math.round(size * 0.02))}
          fill="none"
          stroke="var(--thunder-line)"
          strokeWidth="1"
          strokeDasharray="2 9"
          aria-hidden="true"
        />

        {/* 双环光晕 */}
        <circle
          className="thunder-ring__halo thunder-ring__halo--a"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={Math.max(10, Math.round(stroke * 1.9))}
          aria-hidden="true"
        />
        <circle
          className="thunder-ring__halo thunder-ring__halo--b"
          cx={center}
          cy={center}
          r={radius + inset * 0.4}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={Math.max(6, Math.round(stroke * 1.1))}
          aria-hidden="true"
        />

        {/* 轨道 + 渐变进度 */}
        <circle
          className="thunder-ring__track"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          aria-hidden="true"
        />
        <circle
          className="thunder-ring__arc"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`}
          aria-hidden="true"
        />

        {clamped > 0 ? (
          <g className="thunder-ring__spark-group" aria-hidden="true">
            <circle className="thunder-ring__spark-halo" cx={sparkX} cy={sparkY} r={Math.max(6, stroke * 0.9)} />
            <circle className="thunder-ring__spark" cx={sparkX} cy={sparkY} r={Math.max(2.4, stroke * 0.34)} />
          </g>
        ) : null}
      </svg>

      <span className="thunder-ring__center" aria-hidden="true">
        <span className="thunder-ring__num">
          <CountUp value={clamped} format={(next) => String(Math.round(next))} />
          <em>%</em>
        </span>
        {label ? <span className="thunder-ring__label">{label}</span> : null}
      </span>
    </div>
  );
}
