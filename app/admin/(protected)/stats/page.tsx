"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/lib/admin/AdminShell";
import { Card, Field, TextInput, LoadingButton } from "@/lib/admin/forms";
import { FormSkeleton } from "@/lib/admin/Skeleton";
import { api } from "@/lib/admin/api";

type Stat = { id: number; value: string; label: string; order: number };

export default function StatsAdmin() {
  const [items, setItems] = useState<Stat[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    api
      .getStats()
      .then((d) => setItems(d as Stat[]))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, []);

  const update = (i: number, k: "value" | "label", v: string) => {
    const next = items.slice();
    next[i] = { ...next[i], [k]: v };
    setItems(next);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.saveStats(items);
      toast.success("Stats saved");
    } catch {
      toast.error("Failed to save — check your connection and try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Stats"
        description="Four headline figures shown on the About page."
      />
      {loading ? (
        <FormSkeleton blocks={4} />
      ) : error ? (
        <div className="rounded-sm border border-dashed border-destructive/30 bg-destructive/5 p-12 text-center">
          <p className="text-sm text-destructive">Failed to load stats.</p>
          <button
            onClick={load}
            className="mt-3 text-xs underline text-muted-foreground hover:text-foreground"
          >
            Try again
          </button>
        </div>
      ) : (
        <form onSubmit={save} className="space-y-6">
          {items.map((stat, i) => (
            <Card key={stat.id} className="grid gap-4 md:grid-cols-2">
              <Field label={`Value 0${i + 1}`}>
                <TextInput
                  value={stat.value}
                  onChange={(e) => update(i, "value", e.target.value)}
                  disabled={busy}
                />
              </Field>
              <Field label={`Label 0${i + 1}`}>
                <TextInput
                  value={stat.label}
                  onChange={(e) => update(i, "label", e.target.value)}
                  disabled={busy}
                />
              </Field>
            </Card>
          ))}
          <div className="flex justify-end">
            <LoadingButton type="submit" loading={busy}>
              {busy ? "Saving…" : "Save changes"}
            </LoadingButton>
          </div>
        </form>
      )}
    </>
  );
}
