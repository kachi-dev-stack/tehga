import { prisma } from "@/lib/prisma";
import { dbFetch } from "@/lib/db-fetch";
import { FALLBACK_TERMS } from "@/lib/fallback-data";
import { LegalPage } from "@/app/components/LegalPage";

export default async function TermsPage() {
  const page = await dbFetch(
    () =>
      prisma.termsPage.findUnique({
        where: { id: 1 },
        include: { sections: { orderBy: { order: "asc" } } },
      }),
    FALLBACK_TERMS,
  );

  return (
    <LegalPage
      eyebrow={page?.eyebrow ?? "Legal"}
      title={page?.title ?? "Terms of Use"}
      subtitle={page?.subtitle ?? ""}
      sections={
        page?.sections.map((s) => ({ title: s.title, body: s.body })) ?? []
      }
      footer={
        <>
          <p className="text-sm text-muted-foreground">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            For questions about these terms, contact us at{" "}
            <a
              href="mailto:info@tehgaconsulting.com"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              info@tehgaconsulting.com
            </a>
            .
          </p>
        </>
      }
    />
  );
}
