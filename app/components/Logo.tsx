export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-lg tracking-tight ${className}`}
    >
      <span className="font-medium">
        TEHGA{" "}
        <span className="text-muted-foreground font-normal">CONSULTING</span>
      </span>
    </span>
  );
}
