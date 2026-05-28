"use client";

import { useEffect, useRef, Suspense } from "react";
import { PageHero } from "@/app/components/PageHero";
import { CtaBanner } from "@/app/components/CtaBanner";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SERVICES = [
  {
    n: "01",
    id: "strategy-advisory",
    title: "Strategy & Advisory",
    body: "We work with boards and leadership teams to set direction, sharpen corporate strategy, and build the operational structures to execute it — in complex, high-stakes environments.",
    detail:
      "Corporate strategy · Market entry · Organisational design · Competitive positioning · Transformation planning",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    n: "02",
    id: "infrastructure-development",
    title: "Infrastructure & Development",
    body: "From project origination to financial close and delivery — we structure and advance major infrastructure programmes across energy, transport, and urban development.",
    detail:
      "Project development · PPP structuring · Feasibility & due diligence · Financing strategy · Stakeholder management",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    n: "03",
    id: "government-engagement",
    title: "Government & Global Engagement",
    body: "We advise governments and institutions on policy design, regulatory frameworks, and international engagement strategies that attract investment and enable growth.",
    detail:
      "Policy advisory · Regulatory reform · Institutional strengthening · International relations · Investment promotion",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    n: "04",
    id: "innovation-technology",
    title: "Innovation, Technology & Execution",
    body: "We help organisations move from technology strategy to real-world deployment — modernising operations, enabling digital transformation, and building the systems that scale.",
    detail:
      "Digital strategy · Technology selection · Systems implementation · Innovation frameworks · Operational modernisation",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    n: "05",
    id: "investment-advisory",
    title: "Investment & Commercial Advisory",
    body: "We support investors and corporates through the full transaction lifecycle — from opportunity identification and due diligence to deal structuring, capital raising, and close.",
    detail:
      "M&A advisory · Capital raising · Due diligence · Deal structuring · Transaction management",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    n: "06",
    id: "digital-infrastructure",
    title: "Digital Infrastructure & Innovation",
    body: "We design and develop the digital backbone that organisations and economies need to compete — connectivity, smart systems, and the ecosystems that drive sustained innovation.",
    detail:
      "Connectivity strategy · Smart systems · Digital ecosystem design · Infrastructure deployment · Innovation enablement",
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
      const headerHeight = header ? header.offsetHeight : 80;
      const gap = 24;

      const top =
        el.getBoundingClientRect().top + window.scrollY - headerHeight - gap;
      window.scrollTo({ top, behavior: "smooth" });
    }, 500);
  }, [searchParams]);

  return null;
}
export default function ServicesPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Scroll to service on mount if query param present */}
      <Suspense fallback={null}>
        <ServiceScroller />
      </Suspense>

      <PageHero
        eyebrow="Services"
        title="Strategy, capital and execution — under one roof."
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

      <section className="container-tight pb-12">
        <div className="grid md:grid-cols-2 gap-px bg-border rounded-sm overflow-hidden">
          {SERVICES.map((s) => (
            <article
              key={s.n}
              data-service={s.id}
              className="reveal bg-background p-10 md:p-12 group hover:bg-secondary transition-colors min-h-[280px] flex flex-col"
            >
              {/* Number + arrow */}
              <div className="flex items-center justify-between">
                <p className="text-xs tabular-nums text-muted-foreground tracking-widest">
                  {s.n}
                </p>
                <ArrowUpRight
                  size={18}
                  className="text-foreground/30 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                />
              </div>

              {/* Title */}
              <h3 className="mt-10 text-3xl md:text-4xl">{s.title}</h3>

              {/* Body */}
              <p className="mt-5 text-base text-muted-foreground leading-relaxed flex-1">
                {s.body}
              </p>

              {/* Detail tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {s.detail.split(" · ").map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted-foreground border border-border rounded-sm px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={s.cta.href}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-primary hover:opacity-70 transition-opacity"
              >
                {s.cta.label}
                <ArrowUpRight size={11} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow="Work with us"
        title="Tell us what you are working on."
        body="Whether you are at the beginning of a strategic question or deep into a complex situation — we are ready to engage. Share the challenge and we will respond promptly."
        primary={{ to: "/contact", label: "Brief our team" }}
      />
    </>
  );
}
