"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/lib/admin/AdminShell";
import {
  Card,
  Field,
  TextInput,
  TextArea,
  LoadingButton,
  GhostButton,
} from "@/lib/admin/forms";
import { FormSkeleton } from "@/lib/admin/Skeleton";
import { api } from "@/lib/admin/api";

type Section = { id?: number; title: string; body: string; order: number };

type Draft = {
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: Section[];
};

const EMPTY: Draft = {
  eyebrow: "",
  title: "",
  subtitle: "",
  sections: [],
};

export default function PrivacyAdmin() {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    api
      .getPrivacy()
      .then((d: any) =>
        setDraft({
          eyebrow: d.eyebrow ?? "",
          title: d.title ?? "",
          subtitle: d.subtitle ?? "",
          sections: (d.sections ?? []).map((s: any) => ({
            id: s.id,
            title: s.title,
            body: s.body,
            order: s.order,
          })),
        }),
      )
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, []);

  const f =
    (k: keyof Omit<Draft, "sections">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDraft({ ...draft, [k]: e.target.value });

  const updateSection = (i: number, patch: Partial<Section>) =>
    setDraft({
      ...draft,
      sections: draft.sections.map((s, idx) =>
        idx === i ? { ...s, ...patch } : s,
      ),
    });

  const removeSection = (i: number) =>
    setDraft({
      ...draft,
      sections: draft.sections
        .filter((_, idx) => idx !== i)
        .map((s, idx) => ({ ...s, order: idx + 1 })),
    });

  const addSection = () =>
    setDraft({
      ...draft,
      sections: [
        ...draft.sections,
        { title: "New section", body: "", order: draft.sections.length + 1 },
      ],
    });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.savePrivacy({
        eyebrow: draft.eyebrow,
        title: draft.title,
        subtitle: draft.subtitle,
        sections: draft.sections.map((s, i) => ({
          title: s.title,
          body: s.body,
          order: i + 1,
        })),
      });
      toast.success("Privacy policy saved");
      load(); // refresh to get new ids
    } catch {
      toast.error("Failed to save — try again");
    } finally {
      setBusy(false);
    }
  };

  if (loading)
    return (
      <>
        <PageHeader
          title="Privacy Policy"
          description="Hero and all policy sections on the privacy page."
        />
        <FormSkeleton blocks={3} />
      </>
    );

  if (error)
    return (
      <>
        <PageHeader
          title="Privacy Policy"
          description="Hero and all policy sections on the privacy page."
        />
        <div className="rounded-sm border border-dashed border-destructive/30 bg-destructive/5 p-12 text-center">
          <p className="text-sm text-destructive">
            Failed to load privacy policy.
          </p>
          <button
            onClick={load}
            className="mt-3 text-xs underline text-muted-foreground hover:text-foreground"
          >
            Try again
          </button>
        </div>
      </>
    );

  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description="Hero and all policy sections on the privacy page."
      />
      <form onSubmit={save} className="space-y-6">
        {/* Page hero */}
        <Card className="space-y-5">
          <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Page hero
          </h3>
          <Field label="Eyebrow">
            <TextInput value={draft.eyebrow} onChange={f("eyebrow")} />
          </Field>
          <Field label="Title">
            <TextInput value={draft.title} onChange={f("title")} />
          </Field>
          <Field label="Subtitle">
            <TextArea
              rows={2}
              value={draft.subtitle}
              onChange={f("subtitle")}
            />
          </Field>
        </Card>

        {/* Sections */}
        {draft.sections.map((s, i) => (
          <Card key={i} className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Section {i + 1}
              </h3>
              <GhostButton type="button" onClick={() => removeSection(i)}>
                <Trash2 size={14} /> Remove
              </GhostButton>
            </div>
            <Field label="Title">
              <TextInput
                value={s.title}
                onChange={(e) => updateSection(i, { title: e.target.value })}
              />
            </Field>
            <Field label="Body" hint="Line breaks are preserved.">
              <TextArea
                rows={6}
                value={s.body}
                onChange={(e) => updateSection(i, { body: e.target.value })}
              />
            </Field>
          </Card>
        ))}

        <div className="flex items-center justify-between">
          <GhostButton type="button" onClick={addSection}>
            <Plus size={14} /> Add section
          </GhostButton>
          <LoadingButton type="submit" loading={busy}>
            Save changes
          </LoadingButton>
        </div>
      </form>
    </>
  );
}
