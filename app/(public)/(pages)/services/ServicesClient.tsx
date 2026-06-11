"use client";

import { Suspense, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useReveal } from "@/app/hooks/useReveal";
import {
  ArrowUpRight,
  Compass,
  Building2,
  Globe2,
  Cpu,
  TrendingUp,
  Network,
  type LucideIcon,
} from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "strategy-advisory": Compass,
  "infrastructure-development": Building2,
  "government-engagement": Globe2,
  "innovation-technology": Cpu,
  "investment-advisory": TrendingUp,
  "digital-infrastructure": Network,
};

type ServiceProp = {
  id: number;
  slug: string;
  title: string;
  body: string;
  detail: string;
  image: string;
  imageAlt: string;
};

function ServiceScroller() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const service = searchParams.get("service");
    if (!service) return;
    setTimeout(() => {
      const el = document.querySelector(`[data-service="${service}"]`);
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

export default function ServicesClient({
  services,
}: {
  services: ServiceProp[];
}) {
  useReveal();

  return (
    <>
      <Suspense fallback={null}>
        <ServiceScroller />
      </Suspense>

      <section className="bg-cream pb-24 lg:pb-32">
        <div className="container-tight px-6 lg:px-10 space-y-12 lg:space-y-20">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.slug] ?? Compass;
            const reverse = i % 2 === 1;
            return (
              <article
                key={s.id}
                data-service={s.slug}
                className={`reveal grid lg:grid-cols-2 gap-8 lg:gap-14 items-center scroll-mt-32 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-tehga-green/5 group">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-tehga-green/30 to-transparent" />
                </div>

                {/* Content */}
                <div
                  className="reveal"
                  style={{ transitionDelay: `${i * 60 + 80}ms` }}
                >
                  <Icon className="w-8 h-8 text-tehga-green mb-6" />
                  <h2 className="font-serif text-3xl lg:text-4xl text-tehga-green mb-5 leading-tight">
                    {s.title}
                  </h2>
                  <p className="text-base lg:text-lg text-tehga-green/75 leading-relaxed mb-6">
                    {s.body}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {s.detail.split(" · ").map((tag) => (
                      <span
                        key={tag}
                        className="text-xs uppercase tracking-wider text-tehga-green/70 border border-tehga-green/20 px-3 py-1.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-tehga-green text-cream px-6 py-3 text-sm font-medium hover:gap-3 transition-all"
                  >
                    Enquire now <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
