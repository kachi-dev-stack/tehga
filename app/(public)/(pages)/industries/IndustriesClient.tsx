"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useReveal } from "@/app/hooks/useReveal";
import {
  Plane,
  Landmark,
  HeartPulse,
  Zap,
  Truck,
  BadgeDollarSign,
  Cpu,
  Building2,
  ShoppingBag,
  GraduationCap,
  Sprout,
  ShieldCheck,
  Scissors,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  aviation: Plane,
  government: Landmark,
  healthcare: HeartPulse,
  energy: Zap,
  transport: Truck,
  financial: BadgeDollarSign,
  technology: Cpu,
  infrastructure: Building2,
  trade: ShoppingBag,
  education: GraduationCap,
  agriculture: Sprout,
  security: ShieldCheck,
  fashion: Scissors,
};

type IndustryProp = {
  id: number;
  slug: string;
  title: string;
  description: string;
};

function SectionScroller() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const industry = searchParams.get("industry");
    if (!industry) return;
    setTimeout(() => {
      const el = document.querySelector(`[data-industry="${industry}"]`);
      if (!el) return;
      const header = document.querySelector("header");
      const headerHeight = header ? (header as HTMLElement).offsetHeight : 80;
      const top =
        el.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
      window.scrollTo({ top, behavior: "smooth" });
    }, 500);
  }, [searchParams]);

  return null;
}

export default function IndustriesClient({
  industries,
}: {
  industries: IndustryProp[];
}) {
  useReveal();

  return (
    <>
      <Suspense fallback={null}>
        <SectionScroller />
      </Suspense>

      <section className="container-tight pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-sm overflow-hidden">
          {industries.map(({ id, slug, title, description }, i) => {
            const Icon = INDUSTRY_ICONS[slug] ?? Plane;
            return (
              <div
                key={id}
                data-industry={slug}
                className="reveal bg-background p-6 md:p-8 min-h-[180px] flex flex-col justify-between group hover:bg-forest hover:text-ivory transition-colors"
                style={{ transitionDelay: `${(i % 4) * 50}ms` }}
              >
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-primary group-hover:text-gold transition-colors"
                />
                <div>
                  <h3 className="mt-4 text-lg md:text-xl font-display leading-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed group-hover:text-ivory/70 transition-colors">
                    {description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-primary group-hover:text-gold hover:opacity-70 transition-all"
                  >
                    Enquire now
                    <ArrowUpRight size={11} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
