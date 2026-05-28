"use client";

import { useReveal } from "@/app/hooks/useReveal";
import { PageHero } from "@/app/components/PageHero";
import { CtaBanner } from "@/app/components/CtaBanner";
import { ArrowUpRight, MapPin, BarChart3 } from "lucide-react";

const CASES = [
  {
    client: "National Aviation Authority",
    sector: "Aviation & Aerospace",
    region: "West Africa",
    body: "Advised a national aviation authority on a full institutional restructuring — redefining the regulatory framework, commercialising airport assets, and designing a private sector participation model to attract international operators.",
    outcome:
      "Restructuring framework adopted; two international operators entered formal negotiation within 6 months.",
  },
  {
    client: "Federal Ministry of Infrastructure",
    sector: "Government & Public Sector",
    region: "East Africa",
    body: "Designed the policy architecture and investor facilitation strategy for a multi-corridor infrastructure programme, covering land-use sequencing, PPP structuring, and legislative alignment.",
    outcome:
      "Policy framework enacted; programme advanced to procurement stage ahead of schedule.",
  },
  {
    client: "Regional Health Insurance Scheme",
    sector: "Healthcare & Insurance",
    region: "West Africa",
    body: "Developed the operating model, claims management framework, and digital systems roadmap for a government-backed health insurance scheme scaling across three states.",
    outcome:
      "Scheme launched on time; enrolment targets exceeded in the first operating quarter.",
  },
  {
    client: "Integrated Energy Group",
    sector: "Energy & Natural Resources",
    region: "Nigeria",
    body: "Led the corporate strategy reset for a diversified energy group navigating the transition from upstream dependency — including portfolio rationalisation, new market entry analysis, and board-level strategic planning.",
    outcome:
      "Board approved a revised 5-year strategy; two non-core assets divested within the plan period.",
  },
  {
    client: "Logistics & Freight Operator",
    sector: "Transport & Logistics",
    region: "Southern Africa",
    body: "Redesigned the end-to-end operations model for a regional freight operator — route optimisation, fleet utilisation strategy, and a digital dispatch and tracking implementation.",
    outcome:
      "On-time delivery rate improved significantly; operational costs reduced within the first year.",
  },
  {
    client: "Tier-2 Commercial Bank",
    sector: "Financial Services",
    region: "Pan-African",
    body: "Supported a regional bank through a full digital transformation — core banking modernisation, mobile channel strategy, and an innovation roadmap aligned to emerging fintech competition.",
    outcome:
      "Digital channel adoption doubled within 12 months; time-to-market for new products reduced by a third.",
  },
  {
    client: "Urban Development Agency",
    sector: "Infrastructure & Urban Development",
    region: "North Africa",
    body: "Provided strategic and commercial advisory for a large-scale mixed-use urban development — investor targeting, land value capture structuring, and phased delivery planning.",
    outcome:
      "Anchor investors secured for phase one; development finance approved and construction commenced.",
  },
  {
    client: "Agricultural Export Cooperative",
    sector: "Agriculture & Food Systems",
    region: "East Africa",
    body: "Built the market access strategy and trade facilitation framework for a large agricultural cooperative seeking to expand into European and Middle Eastern export markets.",
    outcome:
      "Three new export agreements signed; cooperative achieved certified exporter status within the programme period.",
  },
];

export default function CasePage() {
  useReveal();

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Mandates delivered. Outcomes achieved."
        subtitle="A selection of engagements that illustrate the scope, scale and impact of TEHGA's advisory across sectors and markets."
      />

      <section className="container-tight py-12 md:py-16">
        <p className="reveal max-w-3xl text-xl md:text-2xl font-display leading-snug text-balance">
          Engagements defined by{" "}
          <em className="text-primary not-italic">
            clear mandates, rigorous execution, and results that stand on their
            own.
          </em>
        </p>
      </section>

      <section className="container-tight pb-12">
        <div className="grid md:grid-cols-2 gap-px bg-border rounded-sm overflow-hidden">
          {CASES.map((c, i) => (
            <article
              key={i}
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

      <CtaBanner
        eyebrow="Start a mandate"
        title="Facing a decision that demands the right advice?"
        body="Every engagement begins with a focused conversation. Share your context and our team will respond within two business days."
        primary={{ to: "/contact", label: "Brief our team" }}
      />
    </>
  );
}
