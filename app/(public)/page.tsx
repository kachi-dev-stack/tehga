import Link from "next/link";
import { GeometricMark } from "@/app/components/GeometricMark";
import { prisma } from "@/lib/prisma";
import { ArrowUpRight } from "lucide-react";
import HomeClient from "./HomeClient";

import { dbFetch } from "@/lib/db-fetch";
import {
  FALLBACK_HERO,
  FALLBACK_FIRM,
  FALLBACK_HOME_CONTENT,
  FALLBACK_SERVICES,
  FALLBACK_INDUSTRIES,
  FALLBACK_WHY,
} from "@/lib/fallback-data";

export default async function HomePage() {
  const [SERVICES, INDUSTRIES, WHY, hero, firm, homeContent] =
    await Promise.all([
      dbFetch(
        () => prisma.service.findMany({ orderBy: { order: "asc" } }),
        FALLBACK_SERVICES,
      ),
      dbFetch(
        () => prisma.industry.findMany({ orderBy: { order: "asc" } }),
        FALLBACK_INDUSTRIES,
      ),
      dbFetch(
        () => prisma.whyPillar.findMany({ orderBy: { order: "asc" } }),
        FALLBACK_WHY,
      ),
      dbFetch(
        () => prisma.heroContent.findUnique({ where: { id: 1 } }),
        FALLBACK_HERO,
      ),
      dbFetch(
        () => prisma.firmOverview.findUnique({ where: { id: 1 } }),
        FALLBACK_FIRM,
      ),
      dbFetch(
        () => prisma.homeContent.findUnique({ where: { id: 1 } }),
        FALLBACK_HOME_CONTENT,
      ),
    ]);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden">
        <div className="container-tight grid lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 reveal">
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-foreground/40" />
              {hero?.eyebrow ?? "Strategic Advisory"}
            </p>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[0.92] text-balance">
              {hero?.headline ??
                "Rooted in Africa. Operating everywhere that matters."}
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              {hero?.subtext}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground hover:bg-forest-deep transition-colors"
              >
                {hero?.ctaPrimary ?? "Explore services"}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-sm border border-foreground/20 px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                {hero?.ctaSecondary ?? "Schedule a consultation"}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 reveal">
            <div className="relative aspect-square w-full max-w-[520px] ml-auto">
              <GeometricMark className="w-full h-full rounded-sm" />
              <div className="absolute -bottom-5 -left-5 bg-ivory border border-border px-5 py-4 rounded-sm shadow-sm">
                <p className="eyebrow">Presence</p>
                <p className="mt-1 font-display text-xl">
                  {hero?.presenceLabel ?? "Africa · Global"}
                </p>
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
            <p className="eyebrow">{firm?.eyebrow ?? "The firm"}</p>
            <h2 className="mt-4 text-3xl md:text-4xl">
              {firm?.heading ??
                "Rigorous analysis. Grounded in the markets we serve."}
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 reveal">
            <p className="text-lg leading-relaxed text-foreground/85">
              {firm?.body1}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {firm?.body2}
            </p>
          </div>
        </div>
      </section>

      {/* CLIENT SECTIONS — carousel, scroll, reveal need client */}
      <HomeClient
        services={SERVICES.map((s) => ({
          id: s.id,
          slug: s.slug,
          title: s.title,
          body: s.body,
          image: s.image,
          imageAlt: s.imageAlt,
        }))}
        industries={INDUSTRIES.map((i) => i.title)}
        why={WHY.map((w) => ({ id: w.id, title: w.title, body: w.body }))}
        homeContent={{
          servicesEyebrow: homeContent?.servicesEyebrow ?? "What we do",
          servicesHeading:
            homeContent?.servicesHeading ??
            "Advisory across every dimension of the mandate.",
          whyEyebrow: homeContent?.whyEyebrow ?? "Why TEHGA",
          whyHeading:
            homeContent?.whyHeading ?? "Built for decisions that carry weight.",
          whySubtext:
            homeContent?.whySubtext ??
            "Retained by governments, institutions, and private sector leaders for mandates where the stakes are too high for generalist advice.",
          industriesEyebrow: homeContent?.industriesEyebrow ?? "Industries",
          industriesHeading:
            homeContent?.industriesHeading ?? "Sectors we serve.",
          industriesBody: homeContent?.industriesBody ?? "",
          industriesCta: homeContent?.industriesCta ?? "View all industries",
          ctaEyebrow: homeContent?.ctaEyebrow ?? "Engage TEHGA",
          ctaTitle:
            homeContent?.ctaTitle ??
            "Strategy without compromise. Outcomes without excuses.",
          ctaBody: homeContent?.ctaBody ?? "",
          ctaPrimary: homeContent?.ctaPrimary ?? "Start a conversation",
          ctaSecondary: homeContent?.ctaSecondary ?? "About the firm",
        }}
      />
    </>
  );
}
