"use client";

import { PageHero } from "@/app/components/PageHero";
import { CtaBanner } from "@/app/components/CtaBanner";
import { useReveal } from "@/app/hooks/useReveal";
import {
  Plane,
  Landmark,
  HeartPulse,
  Zap,
  Truck,
  BadgeDollarSign,
  Cpu,
  Building2,
  ShoppingBag,
  GraduationCap,
  Sprout,
  ShieldCheck,
  Scissors,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const INDUSTRIES = [
  {
    icon: Plane,
    title: "Aviation & Aerospace",
    description:
      "We advise on airport development, airline strategy, regulatory frameworks, and the infrastructure investments shaping Africa's aviation sector and its connectivity to global markets.",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    icon: Landmark,
    title: "Government & Public Sector",
    description:
      "We work with governments and public institutions on policy design, institutional reform, public investment strategy, and the frameworks that enable effective service delivery and economic growth.",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    icon: HeartPulse,
    title: "Healthcare & Insurance",
    description:
      "We support healthcare organisations, insurers, and governments in building the systems, financing structures, and regulatory environments that expand access and drive sector development.",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    icon: Zap,
    title: "Energy & Natural Resources",
    description:
      "From power generation and distribution to oil, gas, and minerals — we advise on project development, investment structuring, regulatory engagement, and the energy transition across African markets.",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    icon: Truck,
    title: "Transport & Logistics",
    description:
      "We advise on transport infrastructure, logistics networks, port development, and the policy and investment frameworks that unlock the movement of goods and people across the continent.",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    icon: BadgeDollarSign,
    title: "Financial Services",
    description:
      "We work with banks, investment firms, fintechs, and regulators on strategy, market entry, transaction advisory, and the development of financial markets across Africa and internationally.",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    icon: Cpu,
    title: "Technology & Digital Innovation",
    description:
      "We advise technology companies and organisations undergoing digital transformation — on strategy, market positioning, infrastructure deployment, and building innovation ecosystems that scale.",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    icon: Building2,
    title: "Infrastructure & Urban Development",
    description:
      "We support the planning, financing, and delivery of urban infrastructure — including housing, water, sanitation, and the mixed-use developments shaping Africa's fastest-growing cities.",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    icon: ShoppingBag,
    title: "Trade & Commerce",
    description:
      "We advise on trade strategy, market access, cross-border commerce, and the policy and institutional frameworks — including AfCFTA — that are reshaping how Africa trades with itself and the world.",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    icon: GraduationCap,
    title: "Education & Skills Development",
    description:
      "We work with education institutions, governments, and investors on sector strategy, institutional development, and the investments in human capital that underpin long-term economic growth.",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    icon: Sprout,
    title: "Agriculture & Food Systems",
    description:
      "We advise across the agricultural value chain — from production and processing to market access and food security policy — supporting the investors and institutions building Africa's food systems.",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    icon: ShieldCheck,
    title: "Security & Risk Advisory",
    description:
      "We support organisations and governments in assessing and managing the political, operational, and strategic risks that come with operating in complex and frontier markets across Africa.",
    cta: { label: "Enquire now", href: "/contact" },
  },
  {
    icon: Scissors,
    title: "Fashion & Textile",
    description:
      "We advise on market entry, supply chain development, investment structuring, and the policy frameworks enabling Africa's fashion and textile sector to compete in global markets.",
    cta: { label: "Enquire now", href: "/contact" },
  },
];

export default function IndustriesPage() {
  useReveal();

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="The sectors that shape Africa's growth — and global markets."
        subtitle="TEHGA advises across the industries that drive economies, attract capital, and determine how societies develop — from energy and infrastructure to financial services, healthcare, and beyond."
      />

      {/* INTRO PARAGRAPH */}
      <section className="container-tight py-12 md:py-16">
        <p className="reveal max-w-3xl text-xl md:text-2xl font-display leading-snug text-balance">
          Our advisors combine{" "}
          <em className="text-primary not-italic">deep sector knowledge</em>{" "}
          with cross-industry perspective — working across the industries that
          define African economies and attract global capital.
        </p>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="container-tight pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-sm overflow-hidden">
          {INDUSTRIES.map(({ icon: Icon, title, description, cta }, i) => (
            <div
              key={title}
              className="reveal bg-background p-6 md:p-8 min-h-[180px] flex flex-col justify-between group hover:bg-forest hover:text-ivory transition-colors"
              style={{ transitionDelay: `${(i % 4) * 50}ms` }}
            >
              <Icon
                size={28}
                strokeWidth={1.5}
                className="text-primary group-hover:text-gold transition-colors"
              />
              <div>
                <h3 className="mt-4 text-lg md:text-xl font-display leading-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed group-hover:text-ivory/70 transition-colors">
                  {description}
                </p>
                <Link
                  href={cta.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-primary group-hover:text-gold hover:opacity-70 transition-all"
                >
                  {cta.label}
                  <ArrowUpRight size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow="Sector advisory"
        title="Your industry has its own rules. We know them."
        body="Whether you are navigating a market entry, a regulatory shift, or a complex transaction — we work with clients who need an advisor with genuine sector depth. Share your brief and let's talk."
        primary={{ to: "/contact", label: "Speak with an advisor" }}
      />
    </>
  );
}
