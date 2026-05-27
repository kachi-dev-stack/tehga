/** Abstract geometric visual — concentric circles & angled grid in deep green. */
export function GeometricMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="gm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--forest)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--forest-deep)" stopOpacity="1" />
        </linearGradient>
        <pattern
          id="gm-dots"
          x="0"
          y="0"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="var(--ivory)" opacity="0.18" />
        </pattern>
      </defs>
      <rect width="600" height="600" fill="url(#gm-grad)" />
      <rect width="600" height="600" fill="url(#gm-dots)" />
      {[...Array(7)].map((_, i) => (
        <circle
          key={i}
          cx="300"
          cy="300"
          r={60 + i * 38}
          fill="none"
          stroke="var(--ivory)"
          strokeOpacity={0.08 + i * 0.02}
          strokeWidth="1"
        />
      ))}
      <circle cx="300" cy="300" r="48" fill="var(--gold)" opacity="0.85" />
      <line
        x1="0"
        y1="300"
        x2="600"
        y2="300"
        stroke="var(--ivory)"
        strokeOpacity="0.15"
      />
      <line
        x1="300"
        y1="0"
        x2="300"
        y2="600"
        stroke="var(--ivory)"
        strokeOpacity="0.15"
      />
    </svg>
  );
}
