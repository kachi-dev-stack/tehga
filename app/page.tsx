"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    body: "We don't deliver options and walk away. Every engagement ends with a clear, defensible position — one your leadership can act on with confidence.",
  },
  {
    icon: ShieldCheck,
    title: "Operator discipline",
    body: "Our advisors have sat on both sides of the table. We bring the rigour of operators, not just analysts — which means recommendations built for execution, not presentation.",
  },
  {
    icon: Globe2,
    title: "Africa & global reach",
    body: "Deep market knowledge across African economies, combined with active relationships in Europe, the Middle East, and Asia. We operate where your decisions actually play out.",
  },
  {
    icon: Sparkles,
    title: "Outcome obsession",
    body: "We measure our value by what gets built, closed, or changed — not by the quality of the deck. Every mandate is scoped around a result, not a process.",
  },
];

const SERVICES = [
  {
    n: "01",
    id: "strategy-advisory",
    title: "Strategy & Advisory",
    body: "We work with boards and leadership teams to set direction, sharpen corporate strategy, and build the operational structures to execute it — in complex, high-stakes environments.",
  },
  {
    n: "02",
    id: "infrastructure-development",
    title: "Infrastructure & Development",
    body: "From project origination to financial close and delivery — we structure and advance major infrastructure programmes across energy, transport, and urban development.",
  },
  {
    n: "03",
    id: "government-engagement",
    title: "Government & Global Engagement",
    body: "We advise governments and institutions on policy design, regulatory frameworks, and international engagement strategies that attract investment and enable growth.",
  },
  {
    n: "04",
    id: "innovation-technology",
    title: "Innovation, Technology & Execution",
    body: "We help organisations move from technology strategy to real-world deployment — modernising operations, enabling digital transformation, and building the systems that scale.",
  },
  {
    n: "05",
    id: "investment-advisory",
    title: "Investment & Commercial Advisory",
    body: "We support investors and corporates through the full transaction lifecycle — from opportunity identification and due diligence to deal structuring, capital raising, and close.",
  },
  {
    n: "06",
    id: "digital-infrastructure",
    title: "Digital Infrastructure & Innovation",
    body: "We design and develop the digital backbone that organisations and economies need to compete — connectivity, smart systems, and the ecosystems that drive sustained innovation.",
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
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () =>
      setActiveIndex(Math.round(el.scrollLeft / el.offsetWidth));
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden">
        <div className="container-tight grid lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 reveal">
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-foreground/40" />
              Strategic Advisory
            </p>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[0.92] text-balance">
              Rooted in Africa. Operating everywhere that matters.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              TEHGA Consulting works with the public sector, private enterprise,
              and capital markets — across infrastructure, investment, market
              expansion, and digital transformation — helping them move with
              precision through high-stakes decisions on every continent.
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
                Schedule a consultation
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
              Rigorous analysis. Grounded in the markets we serve.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 reveal">
            <p className="text-lg leading-relaxed text-foreground/85">
              TEHGA Consulting is a research-driven advisory firm. We bring
              structured analysis, strategic frameworks, and deep market
              intelligence to the decisions that matter most — across
              infrastructure, investment, government engagement, and digital
              transformation in Africa and international markets.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              We work with clients on both a retained and project basis —
              embedding alongside leadership teams for long-term mandates, and
              deploying focused expertise for discrete engagements. In either
              case, our commitment is the same: rigorous thinking, clear
              recommendations, and results that hold.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES SNAPSHOT */}
      <section className="container-tight py-24 md:py-36">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 text-4xl md:text-5xl max-w-2xl">
              Six practice areas. <br /> One standard of work.
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden md:inline-flex group items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
          >
            All services{" "}
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Mobile: horizontal carousel */}
        <div className="md:hidden mt-14">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4"
            style={{ scrollBehavior: "smooth" }}
          >
            {SERVICES.map((s, idx) => (
              <div
                key={s.title}
                className="shrink-0 snap-start w-screen px-4 box-border"
              >
                <Link
                  key={s.title}
                  href={`/services?service=${s.id}`}
                  className="reveal bg-background p-8 lg:p-10 group hover:bg-secondary transition-colors min-h-[240px] flex flex-col cursor-pointer"
                >
                  <p className="text-xs tabular-nums text-muted-foreground">
                    {(idx + 1).toString().padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                    {s.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-primary group-hover:opacity-70 transition-opacity">
                    Learn more <ArrowUpRight size={11} />
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* Dots + view all */}
          <div className="flex items-center justify-between mt-7 px-1">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm text-foreground hover:text-primary group"
            >
              All services{" "}
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <div className="flex items-center gap-1.5">
              {SERVICES.map((_, i) => (
                <span
                  key={i}
                  className={`block rounded-full transition-all ${activeIndex === i ? "bg-foreground w-5 h-2" : "bg-border w-2 h-2"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tablet & Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-sm overflow-hidden mt-14">
          {SERVICES.map((s, idx) => (
            <Link
              key={s.title}
              href={`/services?service=${s.id}`}
              className="reveal bg-background p-8 lg:p-10 group hover:bg-secondary transition-colors min-h-[240px] flex flex-col cursor-pointer"
            >
              <p className="text-xs tabular-nums text-muted-foreground">
                {(idx + 1).toString().padStart(2, "0")}
              </p>
              <h3 className="mt-6 text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                {s.body}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-primary group-hover:opacity-70 transition-opacity">
                Learn more <ArrowUpRight size={11} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY TEHGA */}
      <section className="bg-secondary border-y border-border">
        <div className="container-tight py-24 md:py-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal">
            <div>
              <p className="eyebrow">Why TEHGA</p>
              <h2 className="mt-3 text-4xl md:text-5xl max-w-2xl text-balance">
                Built for decisions that carry weight.
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Retained by governments, institutions, and private sector leaders
              for mandates where the stakes are too high for generalist advice.
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

      {/* INDUSTRIES TEASER */}
      <section className="bg-forest text-ivory">
        <div className="container-tight py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4 reveal">
              <p className="eyebrow text-ivory/60">Industries</p>
              <h2 className="mt-3 text-4xl md:text-5xl">Sectors we serve.</h2>
              <p className="mt-5 text-ivory/70 max-w-sm">
                From energy and infrastructure to financial services and
                government — we work across the sectors that shape African
                economies and global markets.
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
        body="If you are navigating a high-stakes decision, transaction, or transformation — we should talk. TEHGA works on a retained basis with clients who need more than a report."
        primary={{ to: "/contact", label: "Start a conversation" }}
        secondary={{ to: "/about", label: "About the firm" }}
      />
    </>
  );
}
