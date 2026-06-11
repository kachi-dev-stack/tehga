"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import { PageHeader } from "@/lib/admin/AdminShell";
import {
  Field,
  TextInput,
  TextArea,
  LoadingButton,
  GhostButton,
  PrimaryButton,
} from "@/lib/admin/forms";
import { ListSkeleton } from "@/lib/admin/Skeleton";
import { Spinner } from "@/lib/admin/Spinner";
import { api } from "@/lib/admin/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";

type Case = {
  id: number;
  client: string;
  sector: string;
  region: string;
  body: string;
  outcome: string;
  order: number;
};
const EMPTY: Omit<Case, "id"> = {
  client: "",
  sector: "",
  region: "",
  body: "",
  outcome: "",
  order: 0,
};

export default function CasesAdmin() {
  const [items, setItems] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState<Case | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    api
      .getCases()
      .then((d) => setItems(d as Case[]))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, []);

  const onAdd = () => setEditing({ id: 0, ...EMPTY, order: items.length + 1 });

  const onSave = async (s: Case) => {
    setSaving(true);
    try {
      if (s.id === 0) {
        await api.createCase(s);
      } else {
        await api.updateCase(s.id, s);
      }
      toast.success("Case study saved");
      setEditing(null);
      load();
    } catch {
      toast.error("Failed to save — check your connection and try again");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.deleteCase(deleteId);
      toast.success("Case study deleted");
      setDeleteId(null);
      load();
    } catch {
      toast.error("Failed to delete — check your connection and try again");
    } finally {
      setDeleting(false);
    }
  };

  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHeader
        title="Case Studies"
        description="Anonymised mandates shown on the Work page."
        action={
          <PrimaryButton onClick={onAdd}>
            <Plus size={14} /> Add case study
          </PrimaryButton>
        }
      />

      {loading ? (
        <ListSkeleton rows={6} />
      ) : error ? (
        <div className="rounded-sm border border-dashed border-destructive/30 bg-destructive/5 p-12 text-center">
          <p className="text-sm text-destructive">
            Failed to load case studies.
          </p>
          <button
            onClick={load}
            className="mt-3 text-xs underline text-muted-foreground hover:text-foreground"
          >
            Try again
          </button>
        </div>
      ) : sorted.length === 0 ? (
        <div className="rounded-sm border border-dashed border-border bg-background p-12 text-center">
          <p className="text-sm text-muted-foreground">No case studies yet.</p>
        </div>
      ) : (
        <div className="rounded-sm border border-border bg-background overflow-hidden">
          {sorted.map((s, i) => (
            <div
              key={s.id}
              className={`flex items-start gap-4 px-5 py-4 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <span className="w-8 pt-1 text-xs tabular-nums text-muted-foreground">
                {String(s.order).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-display text-base truncate">{s.client}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {s.sector} · {s.region}
                </p>
              </div>
              <button
                onClick={() => setEditing(s)}
                className="p-2 rounded-sm text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => setDeleteId(s.id)}
                className="p-2 rounded-sm text-destructive/80 hover:text-destructive hover:bg-secondary transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <CaseDialog
        value={editing}
        saving={saving}
        onClose={() => !saving && setEditing(null)}
        onSave={onSave}
      />

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && !deleting && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this case study?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove it from the live site. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner size={14} /> Deleting…
                </span>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function CaseDialog({
  value,
  saving,
  onClose,
  onSave,
}: {
  value: Case | null;
  saving: boolean;
  onClose: () => void;
  onSave: (s: Case) => void;
}) {
  const [draft, setDraft] = useState<Case>(value ?? { id: 0, ...EMPTY });
  useEffect(() => {
    if (value) setDraft(value);
  }, [value]);

  const f =
    (k: keyof Case) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = k === "order" ? Number(e.target.value) : e.target.value;
      setDraft({ ...draft, [k]: v } as Case);
    };

  return (
    <Dialog open={!!value} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {value?.id === 0 ? "Add case study" : "Edit case study"}
          </DialogTitle>
          <DialogDescription>
            {value?.id === 0
              ? "Create a new anonymised case study shown on the Work page."
              : "Update this case study's details."}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(draft);
          }}
          className="space-y-4 max-h-[70vh] overflow-y-auto pr-1"
        >
          <Field label="Client (anonymised)">
            <TextInput
              value={draft.client}
              onChange={f("client")}
              required
              disabled={saving}
            />
          </Field>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Sector">
              <TextInput
                value={draft.sector}
                onChange={f("sector")}
                disabled={saving}
              />
            </Field>
            <Field label="Region">
              <TextInput
                value={draft.region}
                onChange={f("region")}
                disabled={saving}
              />
            </Field>
            <Field label="Order">
              <TextInput
                type="number"
                value={draft.order}
                onChange={f("order")}
                required
                disabled={saving}
              />
            </Field>
          </div>
          <Field label="Body">
            <TextArea
              rows={4}
              value={draft.body}
              onChange={f("body")}
              disabled={saving}
            />
          </Field>
          <Field label="Outcome">
            <TextArea
              rows={3}
              value={draft.outcome}
              onChange={f("outcome")}
              disabled={saving}
            />
          </Field>
          <DialogFooter className="pt-2">
            <GhostButton type="button" onClick={onClose} disabled={saving}>
              Cancel
            </GhostButton>
            <LoadingButton type="submit" loading={saving}>
              {saving ? "Saving…" : "Save case study"}
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
