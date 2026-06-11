"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useReveal } from "@/app/hooks/useReveal";
import {
  ArrowUpRight,
  Compass,
  Globe2,
  ShieldCheck,
  Sparkles,
  Building2,
  Cpu,
  TrendingUp,
  Network,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { CtaBanner } from "@/app/components/CtaBanner";

// Icon maps — resolved client-side by slug or title
const SERVICE_ICONS: Record<string, LucideIcon> = {
  "strategy-advisory": Compass,
  "infrastructure-development": Building2,
  "government-engagement": Globe2,
  "innovation-technology": Cpu,
  "investment-advisory": TrendingUp,
  "digital-infrastructure": Network,
};

const WHY_ICONS: Record<string, LucideIcon> = {
  "Clarity of direction": Compass,
  "Operator discipline": ShieldCheck,
  "Africa & global reach": Globe2,
  "Outcome obsession": Sparkles,
};
type HomeContentProp = {
  servicesEyebrow: string;
  servicesHeading: string;
  whyEyebrow: string;
  whyHeading: string;
  whySubtext: string;
  industriesEyebrow: string;
  industriesHeading: string;
  industriesBody: string;
  industriesCta: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

type ServiceProp = {
  id: number;
  slug: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

type WhyProp = {
  id: number;
  title: string;
  body: string;
};

export default function HomeClient({
  services,
  industries,
  why,
  homeContent,
}: {
  services: ServiceProp[];
  industries: string[];
  why: WhyProp[];
  homeContent: HomeContentProp;
}) {
  useReveal();

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* SERVICES SNAPSHOT */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-tehga-green/60 mb-4">
                {homeContent.servicesEyebrow}
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl text-tehga-green leading-tight">
                {homeContent.servicesHeading}
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-tehga-green hover:gap-3 transition-all"
            >
              All services <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile: horizontal carousel */}
          <div className="lg:hidden">
            <div
              ref={scrollRef}
              onScroll={(e) => {
                const el = e.currentTarget;
                setActiveIndex(Math.round(el.scrollLeft / el.offsetWidth));
              }}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-6 px-6 pb-4 scrollbar-hide"
            >
              {services.map((s) => {
                const Icon = SERVICE_ICONS[s.slug] ?? Compass;
                return (
                  <article
                    key={s.id}
                    className="snap-center shrink-0 w-[85%] bg-background border border-tehga-green/10 overflow-hidden group cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/services?service=${s.slug}`)
                    }
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-tehga-green/5">
                      <Image
                        src={s.image}
                        alt={s.imageAlt}
                        fill
                        sizes="85vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-tehga-green/30 to-transparent" />
                    </div>
                    <div className="p-6">
                      <Icon className="w-6 h-6 text-tehga-green mb-4" />
                      <h3 className="font-serif text-xl text-tehga-green mb-3">
                        {s.title}
                      </h3>
                      <p className="text-sm text-tehga-green/70 leading-relaxed mb-6">
                        {s.body}
                      </p>
                      <Link
                        href={`/services?service=${s.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-sm font-medium text-tehga-green hover:gap-2 transition-all"
                      >
                        Learn more <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-6">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-medium text-tehga-green"
              >
                All services <ArrowUpRight className="w-4 h-4" />
              </Link>
              <div className="flex gap-1.5">
                {services.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeIndex
                        ? "w-6 bg-tehga-green"
                        : "w-1.5 bg-tehga-green/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = SERVICE_ICONS[s.slug] ?? Compass;
              return (
                <article
                  key={s.id}
                  className="reveal bg-background border border-tehga-green/10 overflow-hidden group hover:bg-card hover:border-tehga-green/30 transition-colors cursor-pointer"
                  style={{ transitionDelay: `${i * 60}ms` }}
                  onClick={() =>
                    (window.location.href = `/services?service=${s.slug}`)
                  }
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-tehga-green/5">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="33vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-tehga-green/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-8">
                    <Icon className="w-7 h-7 text-tehga-green mb-5" />
                    <h3 className="font-serif text-2xl text-tehga-green mb-4 leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-sm text-tehga-green/70 leading-relaxed mb-6">
                      {s.body}
                    </p>
                    <Link
                      href={`/services?service=${s.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-sm font-medium text-tehga-green hover:gap-2 transition-all"
                    >
                      Learn more <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY TEHGA */}
      <section className="bg-secondary border-y border-border">
        <div className="container-tight py-24 md:py-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal">
            <div>
              <p className="eyebrow">{homeContent.whyEyebrow}</p>
              <h2 className="mt-3 text-4xl md:text-5xl max-w-2xl text-balance">
                {homeContent.whyHeading}
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              {homeContent.whySubtext}
            </p>
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden">
            {why.map(({ title, body }, i) => {
              const Icon = WHY_ICONS[title] ?? Compass;
              return (
                <div
                  key={title}
                  className="reveal bg-background p-8 group hover:bg-card transition-colors"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <Icon
                      className="text-primary"
                      size={28}
                      strokeWidth={1.5}
                    />
                    <span className="text-xs text-muted-foreground tabular-nums">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-10 text-xl">{title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INDUSTRIES TEASER */}
      <section className="bg-forest text-ivory">
        <div className="container-tight py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4 reveal">
              <p className="eyebrow text-ivory/60">
                {homeContent.industriesEyebrow}
              </p>
              <h2 className="mt-3 text-4xl md:text-5xl">
                {homeContent.industriesHeading}
              </h2>
              <p className="mt-5 text-ivory/70 max-w-sm">
                {homeContent.industriesBody}
              </p>
              <Link
                href="/industries"
                className="mt-8 inline-flex items-center gap-2 text-sm text-ivory hover:text-gold transition-colors"
              >
                {homeContent.industriesCta} <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="md:col-span-8 reveal">
              <div className="flex flex-wrap gap-2">
                {industries.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center rounded-full border border-ivory/20 px-4 py-2 text-sm text-ivory/90 hover:bg-ivory/5 transition-colors"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        eyebrow={homeContent.ctaEyebrow}
        title={homeContent.ctaTitle}
        body={homeContent.ctaBody}
        primary={{ to: "/contact", label: homeContent.ctaPrimary }}
        secondary={{ to: "/about", label: homeContent.ctaSecondary }}
      />
    </>
  );
}
