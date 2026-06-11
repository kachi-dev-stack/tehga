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
import { Plus, Trash2, GripVertical } from "lucide-react";

const EMPTY = {
  heroEyebrow: "",
  heroTitle: "",
  heroSubtitle: "",
  detailsEyebrow: "",
  email: "",
  officesLabel: "",
  officesText: "",
  officesNote: "",
  expectEyebrow: "",
  expectStep1: "",
  expectStep2: "",
  expectStep3: "",
  confirmTitle: "",
  confirmBody: "",
  confirmReset: "",
  engagementTypes: [
    "Retained advisory",
    "Project-based engagement",
    "Exploratory conversation",
    "Not sure yet",
  ] as string[],
};

export default function ContactPageAdmin() {
  const [draft, setDraft] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    api
      .getContactPage()
      .then((d) =>
        setDraft({
          ...EMPTY,
          ...(d as typeof EMPTY),
          engagementTypes: (d as any).engagementTypes?.length
            ? (d as any).engagementTypes
            : EMPTY.engagementTypes,
        }),
      )
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

  // Engagement type helpers
  const updateEngagement = (i: number, val: string) => {
    const updated = [...draft.engagementTypes];
    updated[i] = val;
    setDraft({ ...draft, engagementTypes: updated });
  };

  const addEngagement = () =>
    setDraft({
      ...draft,
      engagementTypes: [...draft.engagementTypes, ""],
    });

  const removeEngagement = (i: number) =>
    setDraft({
      ...draft,
      engagementTypes: draft.engagementTypes.filter((_, idx) => idx !== i),
    });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.saveContactPage(draft);
      toast.success("Contact page saved");
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
          title="Contact Page"
          description="Copy on the contact page — hero, intro and direct details. The form itself is not editable here."
        />
        <FormSkeleton blocks={4} />
      </>
    );

  if (error)
    return (
      <>
        <PageHeader
          title="Contact Page"
          description="Copy on the contact page — hero, intro and direct details. The form itself is not editable here."
        />
        <div className="rounded-sm border border-dashed border-destructive/30 bg-destructive/5 p-12 text-center">
          <p className="text-sm text-destructive">
            Failed to load contact page content.
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
        title="Contact Page"
        description="Copy on the contact page — hero, intro and direct details. The form itself is not editable here."
      />
      <form onSubmit={save} className="space-y-6">
        {/* Hero */}
        <Card className="space-y-5">
          <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Page hero
          </h3>
          <Field label="Eyebrow">
            <TextInput value={draft.heroEyebrow} onChange={f("heroEyebrow")} />
          </Field>
          <Field label="Title">
            <TextArea
              rows={2}
              value={draft.heroTitle}
              onChange={f("heroTitle")}
            />
          </Field>
          <Field label="Subtitle">
            <TextArea
              rows={2}
              value={draft.heroSubtitle}
              onChange={f("heroSubtitle")}
            />
          </Field>
        </Card>

        {/* Contact details */}
        <Card className="space-y-5">
          <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Contact details
          </h3>
          <Field label="Section eyebrow">
            <TextInput
              value={draft.detailsEyebrow}
              onChange={f("detailsEyebrow")}
            />
          </Field>
          <Field label="Email address">
            <TextInput type="email" value={draft.email} onChange={f("email")} />
          </Field>
          <Field label="Offices label">
            <TextInput
              value={draft.officesLabel}
              onChange={f("officesLabel")}
            />
          </Field>
          <Field
            label="Offices text"
            hint="Line breaks are preserved — use them for multi-line display."
          >
            <TextArea
              rows={2}
              value={draft.officesText}
              onChange={f("officesText")}
            />
          </Field>
          <Field label="Offices note">
            <TextArea
              rows={2}
              value={draft.officesNote}
              onChange={f("officesNote")}
            />
          </Field>
        </Card>

        {/* What to expect */}
        <Card className="space-y-5">
          <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">
            What to expect
          </h3>
          <Field label="Section eyebrow">
            <TextInput
              value={draft.expectEyebrow}
              onChange={f("expectEyebrow")}
            />
          </Field>
          <Field label="Step 1">
            <TextInput value={draft.expectStep1} onChange={f("expectStep1")} />
          </Field>
          <Field label="Step 2">
            <TextInput value={draft.expectStep2} onChange={f("expectStep2")} />
          </Field>
          <Field label="Step 3">
            <TextInput value={draft.expectStep3} onChange={f("expectStep3")} />
          </Field>
        </Card>

        {/* Engagement types */}
        <Card className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Nature of engagement options
            </h3>
            <button
              type="button"
              onClick={addEngagement}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus size={13} />
              Add option
            </button>
          </div>
          <p className="text-xs text-muted-foreground -mt-2">
            These appear as the dropdown options in the contact form.
          </p>
          <div className="space-y-3">
            {draft.engagementTypes.map((val, i) => (
              <div key={i} className="flex items-center gap-3">
                <GripVertical
                  size={14}
                  className="text-muted-foreground/40 flex-shrink-0 cursor-grab"
                />
                <TextInput
                  value={val}
                  onChange={(e) => updateEngagement(i, e.target.value)}
                  placeholder="e.g. Retained advisory"
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeEngagement(i)}
                  disabled={draft.engagementTypes.length <= 1}
                  className="text-muted-foreground/50 hover:text-destructive transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Confirmation message */}
        <Card className="space-y-5">
          <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Confirmation message
          </h3>
          <Field label="Title">
            <TextInput
              value={draft.confirmTitle}
              onChange={f("confirmTitle")}
            />
          </Field>
          <Field label="Body">
            <TextArea
              rows={3}
              value={draft.confirmBody}
              onChange={f("confirmBody")}
            />
          </Field>
          <Field label="Reset button label">
            <TextInput
              value={draft.confirmReset}
              onChange={f("confirmReset")}
            />
          </Field>
        </Card>

        <div className="flex justify-end">
          <LoadingButton type="submit" loading={busy}>
            Save changes
          </LoadingButton>
        </div>
      </form>
    </>
  );
}
