"use client";

import { Suspense, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageHero } from "@/app/components/PageHero";
import { CtaBanner } from "@/app/components/CtaBanner";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/app/hooks/useReveal";
import {
  Compass,
  Building2,
  Globe2,
  Cpu,
  TrendingUp,
  Network,
} from "lucide-react";

const SERVICES = [
  {
    id: "strategy-advisory",
    icon: Compass,
    title: "Strategy & Advisory",
    body: "We work with boards and leadership teams to set direction, sharpen corporate strategy, and build the operational structures to execute it — in complex, high-stakes environments.",
    detail:
      "Corporate strategy · Market entry · Organisational design · Competitive positioning · Transformation planning",
    image: "/services/strategy-advisory.jpg",
    imageAlt: "Boardroom set for strategic advisory work",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    id: "infrastructure-development",
    icon: Building2,
    title: "Infrastructure & Development",
    body: "From project origination to financial close and delivery — we structure and advance major infrastructure programmes across energy, transport, and urban development.",
    detail:
      "Project development · PPP structuring · Feasibility & due diligence · Financing strategy · Stakeholder management",
    image: "/services/infrastructure-development.jpg",
    imageAlt: "Major infrastructure construction site at golden hour",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    id: "government-engagement",
    icon: Globe2,
    title: "Government & Global Engagement",
    body: "We advise governments and institutions on policy design, regulatory frameworks, and international engagement strategies that attract investment and enable growth.",
    detail:
      "Policy advisory · Regulatory reform · Institutional strengthening · International relations · Investment promotion",
    image: "/services/government-engagement.jpg",
    imageAlt: "Government building colonnade with flags",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    id: "innovation-technology",
    icon: Cpu,
    title: "Innovation, Technology & Execution",
    body: "We help organisations move from technology strategy to real-world deployment — modernising operations, enabling digital transformation, and building the systems that scale.",
    detail:
      "Digital strategy · Technology selection · Systems implementation · Innovation frameworks · Operational modernisation",
    image: "/services/innovation-technology.jpg",
    imageAlt: "Modern technology operations centre",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    id: "investment-advisory",
    icon: TrendingUp,
    title: "Investment & Commercial Advisory",
    body: "We support investors and corporates through the full transaction lifecycle — from opportunity identification and due diligence to deal structuring, capital raising, and close.",
    detail:
      "M&A advisory · Capital raising · Due diligence · Deal structuring · Transaction management",
    image: "/services/investment-advisory.jpg",
    imageAlt: "Capital markets office at twilight",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    id: "digital-infrastructure",
    icon: Network,
    title: "Digital Infrastructure & Innovation",
    body: "We design and develop the digital backbone that organisations and economies need to compete — connectivity, smart systems, and the ecosystems that drive sustained innovation.",
    detail:
      "Connectivity strategy · Smart systems · Digital ecosystem design · Infrastructure deployment · Innovation enablement",
    image: "/services/digital-infrastructure.jpg",
    imageAlt:
      "Telecommunications tower with network connectivity over African landscape",
    cta: { label: "Enquire now", href: "/contact" },
  },
];

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
      const gap = 24;

      const top =
        el.getBoundingClientRect().top + window.scrollY - headerHeight - gap;
      window.scrollTo({ top, behavior: "smooth" });
    }, 500);
  }, [searchParams]);

  return null;
}

export default function ServicesPage() {
  useReveal();

  return (
    <>
      <Suspense fallback={null}>
        <ServiceScroller />
      </Suspense>

      <PageHero
        eyebrow="Services"
        title="Advisory built around the decisions that define mandates."
        subtitle="Built to address the most consequential challenges facing governments, investors, and organisations — across Africa and international markets."
      />

      <section className="container-tight py-12 md:py-16">
        <p className="reveal max-w-3xl text-xl md:text-2xl font-display leading-snug text-balance">
          TEHGA delivers{" "}
          <em className="text-primary not-italic">
            structured, evidence-led advisory
          </em>{" "}
          across the decisions that define organisations and markets — from the
          earliest stages of strategy through to execution and commercial close.
        </p>
      </section>

      <section className="bg-cream pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-12 lg:space-y-20">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const reverse = i % 2 === 1;
            return (
              <article
                key={s.id}
                data-service={s.id}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center scroll-mt-32 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
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
                <div>
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
                    href={s.cta.href}
                    className="inline-flex items-center gap-2 bg-tehga-green text-cream px-6 py-3 text-sm font-medium hover:gap-3 transition-all"
                  >
                    {s.cta.label} <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
