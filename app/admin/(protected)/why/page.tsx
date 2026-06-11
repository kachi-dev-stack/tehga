"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/lib/admin/AdminShell";
import {
  Card,
  Field,
  TextInput,
  TextArea,
  LoadingButton,
} from "@/lib/admin/forms";
import { FormSkeleton } from "@/lib/admin/Skeleton";
import { api } from "@/lib/admin/api";

type Pillar = { id: number; title: string; body: string; order: number };

export default function WhyAdmin() {
  const [items, setItems] = useState<Pillar[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    api
      .getWhy()
      .then((d) => setItems(d as Pillar[]))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, []);

  const update = (i: number, k: "title" | "body", v: string) => {
    const next = items.slice();
    next[i] = { ...next[i], [k]: v };
    setItems(next);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.saveWhy(items);
      toast.success("Why TEHGA saved");
    } catch {
      toast.error("Failed to save — check your connection and try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Why TEHGA"
        description="Four pillars shown on the homepage."
      />
      {loading ? (
        <FormSkeleton blocks={4} />
      ) : error ? (
        <div className="rounded-sm border border-dashed border-destructive/30 bg-destructive/5 p-12 text-center">
          <p className="text-sm text-destructive">Failed to load pillars.</p>
          <button
            onClick={load}
            className="mt-3 text-xs underline text-muted-foreground hover:text-foreground"
          >
            Try again
          </button>
        </div>
      ) : (
        <form onSubmit={save} className="space-y-6">
          {items.map((item, i) => (
            <Card key={item.id} className="space-y-4">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Pillar 0{i + 1}
              </p>
              <Field label="Title">
                <TextInput
                  value={item.title}
                  onChange={(e) => update(i, "title", e.target.value)}
                  disabled={busy}
                />
              </Field>
              <Field label="Body">
                <TextArea
                  rows={3}
                  value={item.body}
                  onChange={(e) => update(i, "body", e.target.value)}
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
