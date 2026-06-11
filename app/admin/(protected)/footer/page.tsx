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
  description: "",
  email: "",
  offices: "",
  copyright: "",
  tagline: "",
};

export default function FooterAdmin() {
  const [draft, setDraft] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    api
      .getFooter()
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
      await api.saveFooter(draft);
      toast.success("Footer saved");
    } catch {
      toast.error("Failed to save — check your connection and try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Footer"
        description="Global footer copy and contact details."
      />
      {loading ? (
        <FormSkeleton blocks={1} />
      ) : error ? (
        <div className="rounded-sm border border-dashed border-destructive/30 bg-destructive/5 p-12 text-center">
          <p className="text-sm text-destructive">
            Failed to load footer content.
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
            <Field label="Description">
              <TextArea
                rows={3}
                value={draft.description}
                onChange={f("description")}
                disabled={busy}
              />
            </Field>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Email">
                <TextInput
                  type="email"
                  value={draft.email}
                  onChange={f("email")}
                  disabled={busy}
                />
              </Field>
              <Field label="Offices">
                <TextInput
                  value={draft.offices}
                  onChange={f("offices")}
                  disabled={busy}
                />
              </Field>
            </div>
            <Field label="Copyright">
              <TextInput
                value={draft.copyright}
                onChange={f("copyright")}
                disabled={busy}
              />
            </Field>
            <Field label="Tagline">
              <TextInput
                value={draft.tagline}
                onChange={f("tagline")}
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
