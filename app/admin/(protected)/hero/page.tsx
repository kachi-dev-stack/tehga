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

const EMPTY = {
  eyebrow: "",
  headline: "",
  subtext: "",
  ctaPrimary: "",
  ctaSecondary: "",
  presenceLabel: "",
};

export default function HeroAdmin() {
  const [draft, setDraft] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    api
      .getHero()
      .then((d) => setDraft(d as typeof EMPTY))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const f =
    (k: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDraft({ ...draft, [k]: e.target.value });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.saveHero(draft);
      toast.success("Hero section saved");
    } catch {
      toast.error("Failed to save — check your connection and try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Hero"
        description="The opening section of the homepage."
      />

      {loading ? (
        <FormSkeleton blocks={1} />
      ) : error ? (
        <div className="rounded-sm border border-dashed border-destructive/30 bg-destructive/5 p-12 text-center">
          <p className="text-sm text-destructive">
            Failed to load hero content.
          </p>
          <button
            onClick={load}
            className="mt-3 text-xs underline text-muted-foreground hover:text-foreground"
          >
            Try again
          </button>
        </div>
      ) : (
        <form onSubmit={save}>
          <Card className="space-y-5">
            <Field label="Eyebrow">
              <TextInput
                value={draft.eyebrow}
                onChange={f("eyebrow")}
                disabled={busy}
              />
            </Field>
            <Field label="Headline">
              <TextArea
                rows={2}
                value={draft.headline}
                onChange={f("headline")}
                disabled={busy}
              />
            </Field>
            <Field label="Subtext">
              <TextArea
                rows={3}
                value={draft.subtext}
                onChange={f("subtext")}
                disabled={busy}
              />
            </Field>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="CTA primary label">
                <TextInput
                  value={draft.ctaPrimary}
                  onChange={f("ctaPrimary")}
                  disabled={busy}
                />
              </Field>
              <Field label="CTA secondary label">
                <TextInput
                  value={draft.ctaSecondary}
                  onChange={f("ctaSecondary")}
                  disabled={busy}
                />
              </Field>
            </div>
            <Field label="Presence label">
              <TextInput
                value={draft.presenceLabel}
                onChange={f("presenceLabel")}
                disabled={busy}
              />
            </Field>
          </Card>
          <div className="mt-6 flex justify-end">
            <LoadingButton type="submit" loading={busy}>
              {busy ? "Saving…" : "Save changes"}
            </LoadingButton>
          </div>
        </form>
      )}
    </>
  );
}
