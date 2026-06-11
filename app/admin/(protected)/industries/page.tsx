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

type Industry = {
  id: number;
  slug: string;
  title: string;
  description: string;
  order: number;
};
const EMPTY: Omit<Industry, "id"> = {
  slug: "",
  title: "",
  description: "",
  order: 0,
};

export default function IndustriesAdmin() {
  const [items, setItems] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState<Industry | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    api
      .getIndustries()
      .then((d) => setItems(d as Industry[]))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, []);

  const onAdd = () => setEditing({ id: 0, ...EMPTY, order: items.length + 1 });

  const onSave = async (s: Industry) => {
    setSaving(true);
    try {
      if (s.id === 0) {
        await api.createIndustry(s);
      } else {
        await api.updateIndustry(s.id, s);
      }
      toast.success("Industry saved");
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
      await api.deleteIndustry(deleteId);
      toast.success("Industry deleted");
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
        title="Industries"
        description="Industries shown on the Industries page."
        action={
          <PrimaryButton onClick={onAdd}>
            <Plus size={14} /> Add industry
          </PrimaryButton>
        }
      />

      {loading ? (
        <ListSkeleton rows={6} />
      ) : error ? (
        <div className="rounded-sm border border-dashed border-destructive/30 bg-destructive/5 p-12 text-center">
          <p className="text-sm text-destructive">Failed to load industries.</p>
          <button
            onClick={load}
            className="mt-3 text-xs underline text-muted-foreground hover:text-foreground"
          >
            Try again
          </button>
        </div>
      ) : sorted.length === 0 ? (
        <div className="rounded-sm border border-dashed border-border bg-background p-12 text-center">
          <p className="text-sm text-muted-foreground">No industries yet.</p>
        </div>
      ) : (
        <div className="rounded-sm border border-border bg-background overflow-hidden">
          {sorted.map((s, i) => (
            <div
              key={s.id}
              className={`flex items-center gap-4 px-5 py-4 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <span className="w-8 text-xs tabular-nums text-muted-foreground">
                {String(s.order).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-display text-base truncate">{s.title}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {s.slug}
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

      <IndustryDialog
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
            <AlertDialogTitle>Delete this industry?</AlertDialogTitle>
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

function IndustryDialog({
  value,
  saving,
  onClose,
  onSave,
}: {
  value: Industry | null;
  saving: boolean;
  onClose: () => void;
  onSave: (s: Industry) => void;
}) {
  const [draft, setDraft] = useState<Industry>(value ?? { id: 0, ...EMPTY });
  useEffect(() => {
    if (value) setDraft(value);
  }, [value]);

  const f =
    (k: keyof Industry) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = k === "order" ? Number(e.target.value) : e.target.value;
      setDraft({ ...draft, [k]: v } as Industry);
    };

  return (
    <Dialog open={!!value} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {value?.id === 0 ? "Add industry" : "Edit industry"}
          </DialogTitle>
          <DialogDescription>
            {value?.id === 0
              ? "Create a new industry shown on the Industries page."
              : "Update this industry's details."}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(draft);
          }}
          className="space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Slug">
              <TextInput
                value={draft.slug}
                onChange={f("slug")}
                required
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
          <Field label="Title">
            <TextInput
              value={draft.title}
              onChange={f("title")}
              required
              disabled={saving}
            />
          </Field>
          <Field label="Description">
            <TextArea
              rows={3}
              value={draft.description}
              onChange={f("description")}
              disabled={saving}
            />
          </Field>
          <DialogFooter className="pt-2">
            <GhostButton type="button" onClick={onClose} disabled={saving}>
              Cancel
            </GhostButton>
            <LoadingButton type="submit" loading={saving}>
              {saving ? "Saving…" : "Save industry"}
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
