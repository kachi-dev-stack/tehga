import { prisma } from "@/lib/prisma";
import { dbFetch } from "@/lib/db-fetch";
import { FALLBACK_CASES, FALLBACK_CASES_PAGE } from "@/lib/fallback-data";
import { PageHero } from "@/app/components/PageHero";
import { CtaBanner } from "@/app/components/CtaBanner";
import CasesClient from "./CasesClient";

export default async function CasePage() {
  const [CASES, pageContent] = await Promise.all([
    dbFetch(
      () => prisma.caseStudy.findMany({ orderBy: { order: "asc" } }),
      FALLBACK_CASES,
    ),
    dbFetch(
      () => prisma.casesPageContent.findUnique({ where: { id: 1 } }),
      FALLBACK_CASES_PAGE,
    ),
  ]);

  return (
    <>
      <PageHero
        eyebrow={pageContent?.heroEyebrow ?? "Case Studies"}
        title={pageContent?.heroTitle ?? ""}
        subtitle={pageContent?.heroSubtitle ?? ""}
      />

      <section className="container-tight py-12 md:py-16">
        <p className="reveal max-w-3xl text-xl md:text-2xl font-display leading-snug text-balance">
          {pageContent?.introPart1}{" "}
          <em className="text-primary not-italic">
            {pageContent?.introEmphasis}
          </em>
        </p>
      </section>

      <CasesClient
        cases={CASES.map((c) => ({
          id: c.id,
          client: c.client,
          sector: c.sector,
          region: c.region,
          body: c.body,
          outcome: c.outcome,
        }))}
      />

      <CtaBanner
        eyebrow={pageContent?.ctaEyebrow ?? ""}
        title={pageContent?.ctaTitle ?? ""}
        body={pageContent?.ctaBody ?? ""}
        primary={{
          to: "/contact",
          label: pageContent?.ctaLabel ?? "Brief our team",
        }}
      />
    </>
  );
}
