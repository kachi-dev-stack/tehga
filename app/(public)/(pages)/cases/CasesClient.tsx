"use client";

import { useReveal } from "@/app/hooks/useReveal";
import { ArrowUpRight, MapPin, BarChart3 } from "lucide-react";

type CaseProp = {
  id: number;
  client: string;
  sector: string;
  region: string;
  body: string;
  outcome: string;
};

export default function CasesClient({ cases }: { cases: CaseProp[] }) {
  useReveal();

  return (
    <section className="container-tight pb-12">
      <div className="grid md:grid-cols-2 gap-px bg-border rounded-sm overflow-hidden">
        {cases.map((c, i) => (
          <article
            key={c.id}
            className="reveal bg-background p-10 md:p-12 group hover:bg-secondary transition-colors min-h-[340px] flex flex-col"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <BarChart3 size={10} />
                  {c.sector}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <MapPin size={10} />
                  {c.region}
                </span>
              </div>
              <ArrowUpRight
                size={18}
                className="text-foreground/30 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
              />
            </div>

            <h3 className="mt-8 text-2xl md:text-3xl font-display leading-tight">
              {c.client}
            </h3>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed flex-1">
              {c.body}
            </p>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Outcome
              </p>
              <p className="mt-1 text-sm font-medium text-foreground leading-relaxed">
                {c.outcome}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
