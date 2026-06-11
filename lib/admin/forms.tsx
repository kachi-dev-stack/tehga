import type {
  ReactNode,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { Spinner } from "./Spinner";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      {children}
      {hint && (
        <span className="block text-xs text-muted-foreground/80">{hint}</span>
      )}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${props.className ?? ""}`}
    />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`flex min-h-[96px] w-full rounded-sm border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${props.className ?? ""}`}
    />
  );
}

export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground hover:bg-forest-deep transition-colors disabled:opacity-60 ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-sm border border-input bg-background px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-foreground hover:bg-secondary transition-colors ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-sm border border-border bg-background p-6 md:p-8 shadow-sm ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">
      {children}
    </h3>
  );
}

export function LoadingButton({
  loading,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <PrimaryButton {...props} disabled={loading || props.disabled}>
      {loading ? <Spinner size={14} /> : null}
      {children}
    </PrimaryButton>
  );
}
