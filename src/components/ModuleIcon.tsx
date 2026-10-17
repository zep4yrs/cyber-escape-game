import type { Module } from '../content/types';

const paths: Record<Module['icon'], string[]> = {
  password: [
    'M12 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z',
    'M12 10h12M9 15h6M18 15h.01M15 6.5h.01'
  ],
  mail: ['M3 6h18v12H3z', 'm3 7 9 7 9-7'],
  cipher: [
    'M4 8h9a3 3 0 0 1 0 6H4',
    'm13 4 3 4-3 4M20 16h-9a3 3 0 0 1 0-6h9',
    'm11 20-3-4 3-4'
  ],
  wifi: ['M2 8a16 16 0 0 1 20 0', 'M6 12a10 10 0 0 1 12 0', 'M10 16a4 4 0 0 1 4 0', 'M12 20h.01'],
  social: [
    'M4 5h16v10H8l-4 4V5Z',
    'M8 9h8M8 12h5',
    'M17 3h3v3'
  ],
  response: ['M12 3 4 6v6c0 4.5 3.4 7.6 8 9 4.6-1.4 8-4.5 8-9V6l-8-3Z', 'm8.5 12 2.5 2.5 4.5-5']
};

export function ModuleIcon({ icon, size = 26 }: { icon: Module['icon']; size?: number }) {
  return (
    <svg
      className="module-icon"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[icon].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
