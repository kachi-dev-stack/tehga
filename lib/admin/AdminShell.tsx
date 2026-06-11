"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Megaphone,
  Building2,
  Briefcase,
  Layers,
  FolderKanban,
  Sparkles,
  Compass,
  BarChart3,
  FileText,
  PanelBottom,
  LogOut,
  Menu,
  X,
  Home,
  FileCog,
  LayoutTemplate,
  BookOpen,
  Mail,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { Logo } from "@/app/components/Logo";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/hero", label: "Hero", icon: Megaphone },
  { to: "/admin/firm", label: "Firm Overview", icon: Building2 },
  { to: "/admin/home-content", label: "Home Content", icon: Home },
  { to: "/admin/services", label: "Services", icon: Briefcase },
  { to: "/admin/services-page", label: "Services Page", icon: FileCog },
  { to: "/admin/industries", label: "Industries", icon: Layers },
  {
    to: "/admin/industries-page",
    label: "Industries Page",
    icon: LayoutTemplate,
  },
  { to: "/admin/cases", label: "Case Studies", icon: FolderKanban },
  { to: "/admin/cases-page", label: "Cases Page", icon: BookOpen },
  { to: "/admin/why", label: "Why TEHGA", icon: Sparkles },
  { to: "/admin/principles", label: "Principles", icon: Compass },
  { to: "/admin/stats", label: "Stats", icon: BarChart3 },
  { to: "/admin/about", label: "About Copy", icon: FileText },
  { to: "/admin/contact-page", label: "Contact Page", icon: Mail },
  { to: "/admin/privacy", label: "Privacy Policy", icon: ShieldCheck },
  { to: "/admin/terms", label: "Terms of Use", icon: Scale },
  { to: "/admin/footer", label: "Footer", icon: PanelBottom },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  const SidebarInner = (
    <div className="flex h-full flex-col bg-forest-deep text-ivory">
      <div className="px-6 py-6 border-b border-ivory/10">
        <Logo className="text-ivory" />
        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-ivory/40">
          Admin Console
        </p>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to, (item as { exact?: boolean }).exact);
          return (
            <Link
              key={item.to}
              href={item.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-ivory/10 text-ivory"
                  : "text-ivory/65 hover:bg-ivory/5 hover:text-ivory"
              }`}
            >
              <Icon size={16} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-ivory/10 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-ivory/10 text-sm font-semibold text-ivory shrink-0">
            {session?.user?.email?.charAt(0).toUpperCase() ?? "A"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ivory">Admin</p>
            <p className="truncate text-xs text-ivory/60">
              {session?.user?.email ?? ""}
            </p>
          </div>
          <button
            onClick={handleLogout}
            aria-label="Sign out"
            className="text-ivory/70 hover:text-ivory transition-colors shrink-0"
          >
            <LogOut className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary">
      {/* Mobile topbar */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-forest-deep px-4 py-3 text-ivory">
        <Logo className="text-ivory" />
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="p-1"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[80%]">
            <div className="relative h-full">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute right-3 top-3 z-10 p-1 text-ivory"
              >
                <X size={20} />
              </button>
              {SidebarInner}
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        <aside className="hidden md:block fixed inset-y-0 left-0 w-64 z-20">
          {SidebarInner}
        </aside>
        <main className="flex-1 md:ml-64 min-h-screen">
          <div className="mx-auto max-w-5xl px-5 py-8 md:px-10 md:py-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </header>
  );
}
