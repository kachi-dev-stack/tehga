export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-lg tracking-tight ${className}`}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <rect
          x="1"
          y="1"
          width="20"
          height="20"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M5 11 L10 16 L17 6"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="square"
        />
      </svg>
      <span className="font-medium">
        TEHGA{" "}
        <span className="text-muted-foreground font-normal">CONSULTING</span>
      </span>
    </span>
  );
}
