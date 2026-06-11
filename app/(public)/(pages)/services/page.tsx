import { prisma } from "@/lib/prisma";
import { PageHero } from "@/app/components/PageHero";
import { CtaBanner } from "@/app/components/CtaBanner";
import { dbFetch } from "@/lib/db-fetch";
import { FALLBACK_SERVICES, FALLBACK_SERVICES_PAGE } from "@/lib/fallback-data";
import ServicesClient from "./ServicesClient";

export default async function ServicesPage() {
  const [SERVICES, pageContent] = await Promise.all([
    dbFetch(
      () => prisma.service.findMany({ orderBy: { order: "asc" } }),
      FALLBACK_SERVICES,
    ),
    dbFetch(
      () => prisma.servicesPageContent.findUnique({ where: { id: 1 } }),
      FALLBACK_SERVICES_PAGE,
    ),
  ]);
  return (
    <>
      <PageHero
        eyebrow={pageContent?.heroEyebrow ?? "Services"}
        title={
          pageContent?.heroTitle ??
          "Advisory built around the decisions that define mandates."
        }
        subtitle={pageContent?.heroSubtitle ?? ""}
      />

      <section className="container-tight py-12 md:py-16">
        <p className="reveal max-w-3xl text-xl md:text-2xl font-display leading-snug text-balance">
          {pageContent?.introPart1 ?? "TEHGA delivers"}{" "}
          <em className="text-primary not-italic">
            {pageContent?.introEmphasis ?? "structured, evidence-led advisory"}
          </em>{" "}
          {pageContent?.introPart2 ?? ""}
        </p>
      </section>

      <ServicesClient
        services={SERVICES.map((s) => ({
          id: s.id,
          slug: s.slug,
          title: s.title,
          body: s.body,
          detail: s.detail,
          image: s.image,
          imageAlt: s.imageAlt,
        }))}
      />
      {pageContent?.ctaTitle && (
        <CtaBanner
          eyebrow={pageContent.ctaEyebrow}
          title={pageContent.ctaTitle}
          body={pageContent.ctaBody}
          primary={{ to: "/contact", label: pageContent.ctaLabel }}
        />
      )}
      <CtaBanner />
    </>
  );
}
