"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/lib/admin/AdminShell";
import { Skeleton } from "@/lib/admin/Skeleton";
import { api } from "@/lib/admin/api";

type Counts = {
  services: number;
  industries: number;
  cases: number;
};

export default function Dashboard() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    Promise.all([api.getServices(), api.getIndustries(), api.getCases()])
      .then(([s, i, c]) =>
        setCounts({
          services: (s as []).length,
          industries: (i as []).length,
          cases: (c as []).length,
        }),
      )
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const cards = [
    { label: "Services", value: counts?.services ?? 0, to: "/admin/services" },
    {
      label: "Industries",
      value: counts?.industries ?? 0,
      to: "/admin/industries",
    },
    { label: "Case Studies", value: counts?.cases ?? 0, to: "/admin/cases" },
  ] as const;

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Snapshot of the content currently live on tehgaconsulting.com."
      />

      {/* Count cards */}
      {loading ? (
        <div className="grid gap-px bg-border rounded-sm overflow-hidden sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-background p-6 flex flex-col gap-4">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-10 w-12" />
              <Skeleton className="mt-auto h-3 w-16" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-sm border border-dashed border-destructive/30 bg-destructive/5 p-10 text-center">
          <p className="text-sm text-destructive">
            Failed to load dashboard counts.
          </p>
          <button
            onClick={load}
            className="mt-3 text-xs underline text-muted-foreground hover:text-foreground transition-colors"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="grid gap-px bg-border rounded-sm overflow-hidden sm:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.label}
              href={c.to}
              className="group bg-background p-6 hover:bg-secondary transition-colors flex flex-col gap-4"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {c.label}
              </p>
              <p className="text-4xl font-display tabular-nums">{c.value}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-xs text-foreground/60 group-hover:text-primary">
                Manage <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Quick edit shortcuts */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <Link
          href="/admin/hero"
          className="rounded-sm border border-border bg-background p-6 hover:bg-secondary transition-colors"
        >
          <p className="eyebrow">Quick edit</p>
          <h3 className="mt-2 text-lg font-display">Hero section</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Update the headline, subtext and CTAs on the homepage.
          </p>
        </Link>
        <Link
          href="/admin/footer"
          className="rounded-sm border border-border bg-background p-6 hover:bg-secondary transition-colors"
        >
          <p className="eyebrow">Quick edit</p>
          <h3 className="mt-2 text-lg font-display">Footer</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Update contact details, offices and tagline.
          </p>
        </Link>
      </section>
    </>
  );
}
