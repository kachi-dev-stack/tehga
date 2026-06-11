import { prisma } from "@/lib/prisma";
import { dbFetch } from "@/lib/db-fetch";
import {
  FALLBACK_INDUSTRIES,
  FALLBACK_INDUSTRIES_PAGE,
} from "@/lib/fallback-data";
import { PageHero } from "@/app/components/PageHero";
import { CtaBanner } from "@/app/components/CtaBanner";
import IndustriesClient from "./IndustriesClient";

export default async function IndustriesPage() {
  const [INDUSTRIES, pageContent] = await Promise.all([
    dbFetch(
      () => prisma.industry.findMany({ orderBy: { order: "asc" } }),
      FALLBACK_INDUSTRIES,
    ),
    dbFetch(
      () => prisma.industriesPageContent.findUnique({ where: { id: 1 } }),
      FALLBACK_INDUSTRIES_PAGE,
    ),
  ]);

  return (
    <>
      <PageHero
        eyebrow={pageContent?.heroEyebrow ?? "Industries"}
        title={pageContent?.heroTitle ?? ""}
        subtitle={pageContent?.heroSubtitle ?? ""}
      />

      <section className="container-tight py-12 md:py-16">
        <p className="reveal max-w-3xl text-xl md:text-2xl font-display leading-snug text-balance">
          {pageContent?.introPart1}{" "}
          <em className="text-primary not-italic">
            {pageContent?.introEmphasis}
          </em>{" "}
          {pageContent?.introPart2}
        </p>
      </section>

      <IndustriesClient
        industries={INDUSTRIES.map((i) => ({
          id: i.id,
          slug: i.slug,
          title: i.title,
          description: i.description,
        }))}
      />

      <CtaBanner
        eyebrow={pageContent?.ctaEyebrow ?? ""}
        title={pageContent?.ctaTitle ?? ""}
        body={pageContent?.ctaBody ?? ""}
        primary={{
          to: "/contact",
          label: pageContent?.ctaLabel ?? "Speak with an advisor",
        }}
      />
    </>
  );
}
