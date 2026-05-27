"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CtaBanner } from "@/app/components/CtaBanner";
import { GeometricMark } from "@/app/components/GeometricMark";
import {
  ArrowUpRight,
  Compass,
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const WHY = [
  {
    icon: Compass,
    title: "Clarity of direction",
    body: "Placeholder description of the firm's bias for sharp, defensible strategic positions.",
  },
  {
    icon: ShieldCheck,
    title: "Operator discipline",
    body: "Placeholder description of operating rigor brought to every engagement.",
  },
  {
    icon: Globe2,
    title: "Africa & global reach",
    body: "Placeholder description of cross-border capability and on-the-ground presence.",
  },
  {
    icon: Sparkles,
    title: "Outcome obsession",
    body: "Placeholder description of how the firm measures value through realized outcomes.",
  },
];

const SERVICES = [
  {
    n: "01",
    title: "Strategy & Advisory",
    body: "Strategic planning, corporate development, and management consulting for complex organizations.",
  },
  {
    n: "02",
    title: "Infrastructure & Development",
    body: "Major project development, public-private partnerships, and infrastructure delivery.",
  },
  {
    n: "03",
    title: "Government & Global Engagement",
    body: "Policy advisory, institutional strengthening, and international relations.",
  },
  {
    n: "04",
    title: "Innovation, Technology & Execution",
    body: "Digital transformation, technology strategy, and implementation support.",
  },
  {
    n: "05",
    title: "Investment & Commercial Advisory",
    body: "M&A, capital raising, due diligence, and transaction advisory services.",
  },
  {
    n: "06",
    title: "Digital Infrastructure & Innovation",
    body: "Digital backbone development, smart solutions, and innovation ecosystems.",
  },
];

const INDUSTRIES = [
  "Aviation & Aerospace",
  "Government & Public Sector",
  "Healthcare & Insurance",
  "Energy & Natural Resources",
  "Transport & Logistics",
  "Financial Services",
  "Technology & Digital Innovation",
  "Infrastructure & Urban Development",
  "Trade & Commerce",
  "Education & Skills Development",
  "Agriculture & Food Systems",
  "Security & Risk Advisory",
  "Fashion & Textile",
];

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden">
        <div className="container-tight grid lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 reveal">
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-foreground/40" />
              Strategic Advisory · Est. Africa
            </p>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-8xl leading-[0.92] text-balance">
              Decisive strategy
              <br />
              for a <span className="italic font-light">complex</span> world.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Placeholder subtext introducing TEHGA Consulting — a strategic
              advisory firm partnering with leaders across Africa and global
              markets to shape ambitious agendas and deliver measurable
              outcomes.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground hover:bg-forest-deep transition-colors"
              >
                Explore services
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-sm border border-foreground/20 px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Start a conversation
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 reveal">
            <div className="relative aspect-square w-full max-w-[520px] ml-auto">
              <GeometricMark className="w-full h-full rounded-sm" />
              <div className="absolute -bottom-5 -left-5 bg-ivory border border-border px-5 py-4 rounded-sm shadow-sm">
                <p className="eyebrow">Presence</p>
                <p className="mt-1 font-display text-xl">Africa · Global</p>
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        />
      </section>

      {/* FIRM OVERVIEW */}
      <section className="container-tight py-24 md:py-36">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4 reveal">
            <p className="eyebrow">The firm</p>
            <h2 className="mt-4 text-3xl md:text-4xl">
              A boutique advisory practice with global standards.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 reveal">
            <p className="text-lg leading-relaxed text-foreground/85">
              Placeholder paragraph describing the firm's identity. TEHGA
              Consulting is positioned at the intersection of strategy, capital
              and execution. Our work brings together senior operators, advisors
              and analysts to support leaders facing consequential decisions
              across regulated, fast-moving and frontier markets.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Additional placeholder paragraph elaborating on values, sectors
              and the way the firm engages with clients over the long term.
            </p>
          </div>
        </div>
      </section>

      {/* WHY TEHGA */}
      <section className="bg-secondary border-y border-border">
        <div className="container-tight py-24 md:py-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal">
            <div>
              <p className="eyebrow">Why TEHGA</p>
              <h2 className="mt-3 text-4xl md:text-5xl max-w-2xl text-balance">
                Four reasons leaders work with us.
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Placeholder line summarizing what makes the firm a trusted partner
              for consequential mandates.
            </p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden">
            {WHY.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="reveal bg-background p-8 group hover:bg-card transition-colors"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between">
                  <Icon className="text-primary" size={28} strokeWidth={1.5} />
                  <span className="text-xs text-muted-foreground tabular-nums">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-10 text-xl">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SNAPSHOT */}
      <section className="container-tight py-24 md:py-36">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 text-4xl md:text-5xl max-w-2xl">
              Six practice areas, one standard.
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
          >
            All services{" "}
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-sm overflow-hidden">
          {SERVICES.map((s, idx) => (
            <article
              key={s.title}
              className="reveal bg-background p-8 lg:p-10 group hover:bg-secondary transition-colors min-h-[240px] flex flex-col"
            >
              <p className="text-xs tabular-nums text-muted-foreground">
                {(idx + 1).toString().padStart(2, "0")}
              </p>
              <h3 className="mt-6 text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                {s.body}
              </p>
              <ArrowUpRight
                size={18}
                className="mt-6 text-foreground/40 group-hover:text-primary transition-colors"
              />
            </article>
          ))}
        </div>
      </section>

      {/* INDUSTRIES TEASER */}
      <section className="bg-forest text-ivory">
        <div className="container-tight py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4 reveal">
              <p className="eyebrow text-ivory/60">Industries</p>
              <h2 className="mt-3 text-4xl md:text-5xl">Sectors we serve.</h2>
              <p className="mt-5 text-ivory/70 max-w-sm">
                Placeholder line introducing the breadth of industries TEHGA
                advises across the continent and beyond.
              </p>
              <Link
                href="/industries"
                className="mt-8 inline-flex items-center gap-2 text-sm text-ivory hover:text-gold transition-colors"
              >
                View all industries <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="md:col-span-8 reveal">
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.map((i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full border border-ivory/20 px-4 py-2 text-sm text-ivory/90 hover:bg-ivory/5 transition-colors"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Engage TEHGA"
        title="Strategy without compromise. Outcomes without excuses."
        body="Placeholder copy encouraging the visitor to start a conversation about an upcoming decision, transaction or transformation."
        primary={{ to: "/contact", label: "Start a conversation" }}
        secondary={{ to: "/about", label: "About the firm" }}
      />
    </>
  );
}
