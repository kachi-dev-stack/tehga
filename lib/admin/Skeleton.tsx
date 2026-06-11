export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-sm bg-foreground/10 ${className}`} />
  );
}

export function FormSkeleton({ blocks = 3 }: { blocks?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: blocks }).map((_, i) => (
        <div
          key={i}
          className="rounded-sm border border-border bg-background p-6 md:p-8 space-y-5"
        >
          <Skeleton className="h-3 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-sm border border-border bg-background overflow-hidden">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={`flex items-center gap-4 px-5 py-4 ${i > 0 ? "border-t border-border" : ""}`}
        >
          <Skeleton className="h-3 w-8" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      ))}
    </div>
  );
}
