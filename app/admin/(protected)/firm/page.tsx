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

const EMPTY = { eyebrow: "", heading: "", body1: "", body2: "" };

export default function FirmAdmin() {
  const [draft, setDraft] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    api
      .getFirm()
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
      await api.saveFirm(draft);
      toast.success("Firm overview saved");
    } catch {
      toast.error("Failed to save — check your connection and try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Firm Overview"
        description="The introductory section beneath the hero."
      />
      {loading ? (
        <FormSkeleton blocks={1} />
      ) : error ? (
        <div className="rounded-sm border border-dashed border-destructive/30 bg-destructive/5 p-12 text-center">
          <p className="text-sm text-destructive">
            Failed to load firm overview.
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
            <Field label="Heading">
              <TextArea
                rows={2}
                value={draft.heading}
                onChange={f("heading")}
                disabled={busy}
              />
            </Field>
            <Field label="Body paragraph 1">
              <TextArea
                rows={4}
                value={draft.body1}
                onChange={f("body1")}
                disabled={busy}
              />
            </Field>
            <Field label="Body paragraph 2">
              <TextArea
                rows={4}
                value={draft.body2}
                onChange={f("body2")}
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
