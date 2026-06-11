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
  whoEyebrow: "",
  whoHeading: "",
  whoPara1: "",
  whoPara2: "",
  whoPara3: "",
  philosophyEyebrow: "",
  philosophyHeading: "",
  reachEyebrow: "",
  reachHeading: "",
  reachBody: "",
  ctaEyebrow: "",
  ctaTitle: "",
  ctaBody: "",
  ctaLabel: "",
};

export default function AboutAdmin() {
  const [draft, setDraft] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    api
      .getAbout()
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
      await api.saveAbout(draft);
      toast.success("About copy saved");
    } catch {
      toast.error("Failed to save — check your connection and try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="About Copy"
        description="All text on the About page."
      />
      {loading ? (
        <FormSkeleton blocks={5} />
      ) : error ? (
        <div className="rounded-sm border border-dashed border-destructive/30 bg-destructive/5 p-12 text-center">
          <p className="text-sm text-destructive">Failed to load about copy.</p>
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
            <SectionLabel>Who we are</SectionLabel>
            <Field label="Eyebrow">
              <TextInput
                value={draft.whoEyebrow}
                onChange={f("whoEyebrow")}
                disabled={busy}
              />
            </Field>
            <Field label="Heading">
              <TextInput
                value={draft.whoHeading}
                onChange={f("whoHeading")}
                disabled={busy}
              />
            </Field>
            <Field label="Paragraph 1">
              <TextArea
                rows={3}
                value={draft.whoPara1}
                onChange={f("whoPara1")}
                disabled={busy}
              />
            </Field>
            <Field label="Paragraph 2">
              <TextArea
                rows={3}
                value={draft.whoPara2}
                onChange={f("whoPara2")}
                disabled={busy}
              />
            </Field>
            <Field label="Paragraph 3">
              <TextArea
                rows={3}
                value={draft.whoPara3}
                onChange={f("whoPara3")}
                disabled={busy}
              />
            </Field>
          </Card>
          <Card className="space-y-5">
            <SectionLabel>Philosophy</SectionLabel>
            <Field label="Eyebrow">
              <TextInput
                value={draft.philosophyEyebrow}
                onChange={f("philosophyEyebrow")}
                disabled={busy}
              />
            </Field>
            <Field label="Heading">
              <TextArea
                rows={2}
                value={draft.philosophyHeading}
                onChange={f("philosophyHeading")}
                disabled={busy}
              />
            </Field>
          </Card>
          <Card className="space-y-5">
            <SectionLabel>Our reach</SectionLabel>
            <Field label="Eyebrow">
              <TextInput
                value={draft.reachEyebrow}
                onChange={f("reachEyebrow")}
                disabled={busy}
              />
            </Field>
            <Field label="Heading">
              <TextInput
                value={draft.reachHeading}
                onChange={f("reachHeading")}
                disabled={busy}
              />
            </Field>
            <Field label="Body">
              <TextArea
                rows={4}
                value={draft.reachBody}
                onChange={f("reachBody")}
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
