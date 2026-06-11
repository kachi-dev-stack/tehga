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
  SectionLabel,
} from "@/lib/admin/forms";
import { FormSkeleton } from "@/lib/admin/Skeleton";
import { api } from "@/lib/admin/api";

const EMPTY = {
  heroEyebrow: "",
  heroTitle: "",
  heroSubtitle: "",
  introPart1: "",
  introEmphasis: "",
  introPart2: "",
  ctaEyebrow: "",
  ctaTitle: "",
  ctaBody: "",
  ctaLabel: "",
};

export default function ServicesPageAdmin() {
  const [draft, setDraft] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    api
      .getServicesPage()
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
      await api.saveServicesPage(draft);
      toast.success("Services page saved");
    } catch {
      toast.error("Failed to save — check your connection and try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Services Page"
        description="Hero, intro paragraph and CTA banner on the Services page."
      />
      {loading ? (
        <FormSkeleton blocks={3} />
      ) : error ? (
        <div className="rounded-sm border border-dashed border-destructive/30 bg-destructive/5 p-12 text-center">
          <p className="text-sm text-destructive">
            Failed to load services page content.
          </p>
          <button
            onClick={load}
            className="mt-3 text-xs underline text-muted-foreground hover:text-foreground"
          >
            Try again
          </button>
        </div>
      ) : (
        <form onSubmit={save} className="space-y-6">
          <Card className="space-y-5">
            <SectionLabel>Page hero</SectionLabel>
            <Field label="Eyebrow">
              <TextInput
                value={draft.heroEyebrow}
                onChange={f("heroEyebrow")}
                disabled={busy}
              />
            </Field>
            <Field label="Title">
              <TextArea
                rows={2}
                value={draft.heroTitle}
                onChange={f("heroTitle")}
                disabled={busy}
              />
            </Field>
            <Field label="Subtitle">
              <TextArea
                rows={2}
                value={draft.heroSubtitle}
                onChange={f("heroSubtitle")}
                disabled={busy}
              />
            </Field>
          </Card>
          <Card className="space-y-5">
            <SectionLabel>Intro paragraph</SectionLabel>
            <p className="text-xs text-muted-foreground">
              Renders as: "[before] <em>emphasis</em> [after]"
            </p>
            <Field label="Before emphasis">
              <TextInput
                value={draft.introPart1}
                onChange={f("introPart1")}
                disabled={busy}
              />
            </Field>
            <Field label="Emphasised phrase">
              <TextInput
                value={draft.introEmphasis}
                onChange={f("introEmphasis")}
                disabled={busy}
              />
            </Field>
            <Field label="After emphasis">
              <TextArea
                rows={3}
                value={draft.introPart2}
                onChange={f("introPart2")}
                disabled={busy}
              />
            </Field>
          </Card>
          <Card className="space-y-5">
            <SectionLabel>CTA banner</SectionLabel>
            <Field label="Eyebrow">
              <TextInput
                value={draft.ctaEyebrow}
                onChange={f("ctaEyebrow")}
                disabled={busy}
              />
            </Field>
            <Field label="Title">
              <TextArea
                rows={2}
                value={draft.ctaTitle}
                onChange={f("ctaTitle")}
                disabled={busy}
              />
            </Field>
            <Field label="Body">
              <TextArea
                rows={3}
                value={draft.ctaBody}
                onChange={f("ctaBody")}
                disabled={busy}
              />
            </Field>
            <Field label="Button label">
              <TextInput
                value={draft.ctaLabel}
                onChange={f("ctaLabel")}
                disabled={busy}
              />
            </Field>
          </Card>
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
