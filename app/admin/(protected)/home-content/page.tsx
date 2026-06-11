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
  servicesEyebrow: "",
  servicesHeading: "",
  whyEyebrow: "",
  whyHeading: "",
  whySubtext: "",
  industriesEyebrow: "",
  industriesHeading: "",
  industriesBody: "",
  industriesCta: "",
  ctaEyebrow: "",
  ctaTitle: "",
  ctaBody: "",
  ctaPrimary: "",
  ctaSecondary: "",
};

export default function HomeContentAdmin() {
  const [draft, setDraft] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    api
      .getHomeContent()
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
      await api.saveHomeContent(draft);
      toast.success("Home content saved");
    } catch {
      toast.error("Failed to save — check your connection and try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Home Content"
        description="Section copy across the homepage (excluding hero and firm overview)."
      />
      {loading ? (
        <FormSkeleton blocks={4} />
      ) : error ? (
        <div className="rounded-sm border border-dashed border-destructive/30 bg-destructive/5 p-12 text-center">
          <p className="text-sm text-destructive">
            Failed to load home content.
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
            <SectionLabel>Services snapshot</SectionLabel>
            <Field label="Eyebrow">
              <TextInput
                value={draft.servicesEyebrow}
                onChange={f("servicesEyebrow")}
                disabled={busy}
              />
            </Field>
            <Field label="Section heading">
              <TextArea
                rows={2}
                value={draft.servicesHeading}
                onChange={f("servicesHeading")}
                disabled={busy}
              />
            </Field>
          </Card>
          <Card className="space-y-5">
            <SectionLabel>Why TEHGA</SectionLabel>
            <Field label="Eyebrow">
              <TextInput
                value={draft.whyEyebrow}
                onChange={f("whyEyebrow")}
                disabled={busy}
              />
            </Field>
            <Field label="Main heading">
              <TextArea
                rows={2}
                value={draft.whyHeading}
                onChange={f("whyHeading")}
                disabled={busy}
              />
            </Field>
            <Field label="Subtext paragraph">
              <TextArea
                rows={3}
                value={draft.whySubtext}
                onChange={f("whySubtext")}
                disabled={busy}
              />
            </Field>
          </Card>
          <Card className="space-y-5">
            <SectionLabel>Industries teaser</SectionLabel>
            <Field label="Eyebrow">
              <TextInput
                value={draft.industriesEyebrow}
                onChange={f("industriesEyebrow")}
                disabled={busy}
              />
            </Field>
            <Field label="Heading">
              <TextArea
                rows={2}
                value={draft.industriesHeading}
                onChange={f("industriesHeading")}
                disabled={busy}
              />
            </Field>
            <Field label="Body paragraph">
              <TextArea
                rows={3}
                value={draft.industriesBody}
                onChange={f("industriesBody")}
                disabled={busy}
              />
            </Field>
            <Field label="Link label">
              <TextInput
                value={draft.industriesCta}
                onChange={f("industriesCta")}
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
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Primary button label">
                <TextInput
                  value={draft.ctaPrimary}
                  onChange={f("ctaPrimary")}
                  disabled={busy}
                />
              </Field>
              <Field label="Secondary button label">
                <TextInput
                  value={draft.ctaSecondary}
                  onChange={f("ctaSecondary")}
                  disabled={busy}
                />
              </Field>
            </div>
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
