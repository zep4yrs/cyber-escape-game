import '../../styles/fx.css';

/**
 * 雷霆档案 · 氛围层（Atmosphere）
 *
 * 固定全屏装饰层：径向电光光晕 + 斜向光束 + 扫描线 + 噪点 + 暗角 +
 * 四角 HUD 刻度 + 底部遥测细线。
 *
 * - aria-hidden：整层纯装饰，对读屏与键盘完全隐藏
 * - pointer-events: none：不拦截任何点击 / 选择 / 滚动
 * - z-index: -1：位于正文内容之下，只作用于纸面背景
 */
export function Atmosphere() {
  return (
    <div className="fx-atmos" aria-hidden="true">
      <div className="fx-atmos__glow" />
      <div className="fx-atmos__beams">
        <span className="fx-atmos__beam fx-atmos__beam--a" />
        <span className="fx-atmos__beam fx-atmos__beam--b" />
        <span className="fx-atmos__beam fx-atmos__beam--c" />
      </div>
      <div className="fx-atmos__scan" />
      <div className="fx-atmos__sweep" />
      <div className="fx-atmos__noise" />
      <div className="fx-atmos__vignette" />
      <div className="fx-atmos__hud">
        <span className="fx-atmos__corner fx-atmos__corner--tl" data-tag="TH·01" />
        <span className="fx-atmos__corner fx-atmos__corner--tr" data-tag="TH·02" />
        <span className="fx-atmos__corner fx-atmos__corner--bl" data-tag="TH·03" />
        <span className="fx-atmos__corner fx-atmos__corner--br" data-tag="TH·04" />
      </div>
      <div className="fx-atmos__telemetry">
        <span className="fx-atmos__telemetry-ticks" />
        <span className="fx-atmos__telemetry-trace" />
      </div>
    </div>
  );
}
