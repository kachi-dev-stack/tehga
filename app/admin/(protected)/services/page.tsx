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
import { api, uploadImage } from "@/lib/admin/api";
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

type Service = {
  id: number;
  slug: string;
  title: string;
  body: string;
  detail: string;
  image: string;
  imageAlt: string;
  order: number;
};
const EMPTY: Omit<Service, "id"> = {
  slug: "",
  title: "",
  body: "",
  detail: "",
  image: "",
  imageAlt: "",
  order: 0,
};

export default function ServicesAdmin() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    api
      .getServices()
      .then((d) => setItems(d as Service[]))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, []);

  const onAdd = () => setEditing({ id: 0, ...EMPTY, order: items.length + 1 });

  const onSave = async (s: Service) => {
    setSaving(true);
    try {
      if (s.id === 0) {
        await api.createService(s);
      } else {
        await api.updateService(s.id, s);
      }
      toast.success("Service saved");
      setEditing(null);
      load();
    } catch {
      toast.error(
        "Failed to save service — check your connection and try again",
      );
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.deleteService(deleteId);
      toast.success("Service deleted");
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
        title="Services"
        description="The service practices shown on the homepage and services page."
        action={
          <PrimaryButton onClick={onAdd}>
            <Plus size={14} /> Add service
          </PrimaryButton>
        }
      />

      {loading ? (
        <ListSkeleton rows={6} />
      ) : error ? (
        <div className="rounded-sm border border-dashed border-destructive/30 bg-destructive/5 p-12 text-center">
          <p className="text-sm text-destructive">Failed to load services.</p>
          <button
            onClick={load}
            className="mt-3 text-xs underline text-muted-foreground hover:text-foreground"
          >
            Try again
          </button>
        </div>
      ) : sorted.length === 0 ? (
        <div className="rounded-sm border border-dashed border-border bg-background p-12 text-center">
          <p className="text-sm text-muted-foreground">No services yet.</p>
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

      <ServiceDialog
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
            <AlertDialogTitle>Delete this service?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the service from the live site. This cannot be
              undone.
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

function ServiceDialog({
  value,
  saving,
  onClose,
  onSave,
}: {
  value: Service | null;
  saving: boolean;
  onClose: () => void;
  onSave: (s: Service) => void;
}) {
  const [draft, setDraft] = useState<Service>(value ?? { id: 0, ...EMPTY });
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    if (value) setDraft(value);
  }, [value]);

  const f =
    (k: keyof Service) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = k === "order" ? Number(e.target.value) : e.target.value;
      setDraft({ ...draft, [k]: v } as Service);
    };

  const busy = saving || uploading;

  return (
    <Dialog open={!!value} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {value?.id === 0 ? "Add service" : "Edit service"}
          </DialogTitle>
          <DialogDescription>
            {value?.id === 0
              ? "Create a new service entry shown on the homepage and services page."
              : "Update this service's details."}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(draft);
          }}
          className="space-y-4 max-h-[70vh] overflow-y-auto pr-1"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Slug">
              <TextInput
                value={draft.slug}
                onChange={f("slug")}
                required
                disabled={busy}
              />
            </Field>
            <Field label="Order">
              <TextInput
                type="number"
                value={draft.order}
                onChange={f("order")}
                required
                disabled={busy}
              />
            </Field>
          </div>
          <Field label="Title">
            <TextInput
              value={draft.title}
              onChange={f("title")}
              required
              disabled={busy}
            />
          </Field>
          <Field label="Body">
            <TextArea
              rows={3}
              value={draft.body}
              onChange={f("body")}
              disabled={busy}
            />
          </Field>
          <Field label="Detail" hint="Capability tags separated by ·">
            <TextArea
              rows={2}
              value={draft.detail}
              onChange={f("detail")}
              disabled={busy}
            />
          </Field>

          <Field
            label="Image"
            hint="PNG or JPG. Recommended 1200×900. Max 4MB."
          >
            <div className="space-y-3">
              {draft.image && (
                <div className="relative inline-block">
                  <img
                    src={draft.image}
                    alt={draft.imageAlt || "Preview"}
                    className="h-32 w-auto rounded-sm border border-border object-cover"
                  />
                  {!busy && (
                    <button
                      type="button"
                      onClick={() => setDraft({ ...draft, image: "" })}
                      className="absolute -right-2 -top-2 rounded-full bg-foreground text-background p-1 shadow"
                      aria-label="Remove image"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                  {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-sm">
                      <Spinner size={20} />
                    </div>
                  )}
                </div>
              )}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  disabled={busy}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    try {
                      const url = await uploadImage(file);
                      setDraft((d) => ({ ...d, image: url }));
                      toast.success("Image uploaded");
                    } catch (err) {
                      toast.error(
                        err instanceof Error
                          ? err.message
                          : "Upload failed — check your connection and try again",
                      );
                    } finally {
                      setUploading(false);
                    }
                  }}
                  className="block w-full text-xs file:mr-3 file:rounded-sm file:border file:border-input file:bg-secondary file:px-3 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-[0.12em] file:text-foreground hover:file:bg-secondary/70 disabled:opacity-60"
                />
              </div>
              {uploading && (
                <p className="text-xs text-muted-foreground inline-flex items-center gap-2">
                  <Spinner size={12} /> Uploading…
                </p>
              )}
            </div>
          </Field>

          <Field label="Image alt text">
            <TextInput
              value={draft.imageAlt}
              onChange={f("imageAlt")}
              disabled={busy}
            />
          </Field>
          <DialogFooter className="pt-2">
            <GhostButton type="button" onClick={onClose} disabled={busy}>
              Cancel
            </GhostButton>
            <LoadingButton type="submit" loading={saving} disabled={uploading}>
              {saving ? "Saving…" : "Save service"}
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
