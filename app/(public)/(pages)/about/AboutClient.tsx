"use client";
import { CtaBanner } from "@/app/components/CtaBanner";
import { useReveal } from "@/app/hooks/useReveal";
import {
  Telescope,
  Scale,
  HandshakeIcon,
  Gem,
  type LucideIcon,
} from "lucide-react";

const PRINCIPLE_ICONS: Record<string, LucideIcon> = {
  Independence: Telescope,
  Rigour: Scale,
  Partnership: HandshakeIcon,
  Discretion: Gem,
};

type PrincipleProp = { id: number; title: string; body: string };
type StatProp = { id: number; value: string; label: string };

export default function AboutClient({
  principles,
  stats,
  reachHeading,
  reachBody,
  reachEyebrow,
  philosophyEyebrow,
  philosophyHeading,
  ctaEyebrow,
  ctaTitle,
  ctaBody,
  ctaLabel,
}: {
  principles: PrincipleProp[];
  stats: StatProp[];
  reachHeading: string;
  reachBody: string;
  reachEyebrow: string;
  philosophyEyebrow: string;
  philosophyHeading: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
}) {
  useReveal();

  return (
    <>
      {/* PHILOSOPHY */}
      <section className="bg-secondary border-y border-border">
        <div className="container-tight py-24 md:py-32">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">{philosophyEyebrow}</p>
            <h2 className="mt-3 text-4xl md:text-5xl text-balance">
              {philosophyHeading}
            </h2>
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map(({ id, title, body }, i) => {
              const Icon = PRINCIPLE_ICONS[title] ?? Telescope;
              return (
                <div
                  key={id}
                  className="reveal bg-background border border-border p-8 rounded-sm"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <Icon className="text-primary" size={28} strokeWidth={1.5} />
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

      {/* REACH */}
      <section className="container-tight py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 reveal">
            <p className="eyebrow">{reachEyebrow}</p>
            <h2 className="mt-3 text-4xl md:text-5xl text-balance">
              {reachHeading}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground max-w-lg">
              {reachBody}
            </p>
          </div>
          <div className="md:col-span-6 reveal">
            <div className="grid grid-cols-2 gap-px bg-border rounded-sm overflow-hidden">
              {stats.map((s) => (
                <div key={s.id} className="bg-background p-8">
                  <p className="font-display text-4xl md:text-5xl text-primary">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        eyebrow={ctaEyebrow}
        title={ctaTitle}
        body={ctaBody}
        primary={{ to: "/contact", label: ctaLabel }}
      />
    </>
  );
}
