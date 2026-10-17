export function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <span className="brandmark" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="6" y="6" width="28" height="28" />
        <path d="M12 12h6v6h-6zM22 12h6v6h-6zM12 22h6v6h-6zM22 22h6v6h-6z" strokeWidth="1.1" opacity="0.55" />
        <path d="M20 2v5M20 33v5M2 20h5M33 20h5" strokeWidth="1.2" opacity="0.7" />
      </svg>
    </span>
  );
}
