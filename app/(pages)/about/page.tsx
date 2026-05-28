// app/about/page.tsx
"use client";

import { useEffect } from "react";
import { PageHero } from "@/app/components/PageHero";
import { CtaBanner } from "@/app/components/CtaBanner";
import { Telescope, Scale, HandshakeIcon, Gem } from "lucide-react";
import { WhoWeAreMark } from "@/app/components/WhoWeAreMark";

const PRINCIPLES = [
  {
    icon: Telescope,
    title: "Independence",
    body: "We have no conflicts of interest. Our advice is shaped by the evidence and the client's best interest — nothing else. No affiliations, no hidden mandates.",
  },
  {
    icon: Scale,
    title: "Rigour",
    body: "Every engagement is grounded in structured analysis and intellectual honesty. We challenge assumptions — including our own — before we present a recommendation.",
  },
  {
    icon: HandshakeIcon,
    title: "Partnership",
    body: "We work alongside our clients, not above them. We invest in understanding their context, their constraints, and their objectives — and we stay accountable to outcomes.",
  },
  {
    icon: Gem,
    title: "Discretion",
    body: "The most consequential decisions demand absolute confidentiality. We operate as trusted advisors — and we treat every mandate with the discretion that role requires.",
  },
];
export default function AboutPage() {
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
      <PageHero
        eyebrow="About"
        title="A firm built for consequential decisions."
        subtitle="TEHGA Consulting was established to close the gap between Africa's growth potential and the international capital, networks, and strategic expertise needed to realise it. We operate at that intersection — advising the organisations and institutions shaping what comes next."
      />

      {/* WHO WE ARE */}
      <section className="container-tight py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 reveal">
            <div className="aspect-[4/5] w-full">
              <WhoWeAreMark />.
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 reveal">
            <p className="eyebrow">Who we are</p>
            <h2 className="mt-4 text-4xl md:text-5xl text-balance">
              A research-driven advisory firm. Built for Africa and global
              markets.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/85">
              TEHGA Consulting was founded to bring structured analysis, deep
              market intelligence, and strategic rigour to the decisions that
              shape organisations and economies — across Africa and
              internationally. Our work spans infrastructure, investment,
              government engagement, and digital transformation.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              We are disciplined in how we engage. Every mandate begins with a
              clear understanding of the market, the institution, and the
              decision at hand. We develop intelligence and frameworks specific
              to the context and the client — whether in energy, financial
              services, infrastructure, healthcare, or government.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Our team combines strategy, capital markets knowledge, and
              operational insight — structured to move across disciplines as
              mandates require. We work with clients on a retained and project
              basis, engaging at the depth each situation demands.
            </p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-secondary border-y border-border">
        <div className="container-tight py-24 md:py-32">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Our philosophy</p>
            <h2 className="mt-3 text-4xl md:text-5xl text-balance">
              Four principles guide every engagement.
            </h2>
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRINCIPLES.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="reveal bg-background border border-border p-8 rounded-sm"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <Icon className="text-primary" size={28} strokeWidth={1.5} />
                <h3 className="mt-10 text-xl">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REACH */}
      <section className="container-tight py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 reveal">
            <p className="eyebrow">Our reach</p>
            <h2 className="mt-3 text-4xl md:text-5xl text-balance">
              Rooted in Africa. Operating globally.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground max-w-lg">
              We operate across Africa's most active markets — from West and
              East Africa to the continent's emerging corridors — while
              maintaining active relationships in the international capital,
              policy, and business centres that shape investment flows into and
              out of the continent.
            </p>
          </div>
          <div className="md:col-span-6 reveal">
            <div className="grid grid-cols-2 gap-px bg-border rounded-sm overflow-hidden">
              {[
                { k: "12+", v: "Active markets" },
                { k: "30+", v: "Senior advisors" },
                { k: "4", v: "Regional hubs" },
                { k: "20yrs", v: "Combined leadership" },
              ].map((s) => (
                <div key={s.v} className="bg-background p-8">
                  <p className="font-display text-4xl md:text-5xl text-primary">
                    {s.k}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Work with us"
        title="A conversation is the best way to begin."
        body="If you are navigating a complex decision — in strategy, infrastructure, investment, or government engagement — we would welcome the opportunity to understand your situation and explore how we can help."
        primary={{ to: "/contact", label: "Schedule a consultation" }}
      />
    </>
  );
}
