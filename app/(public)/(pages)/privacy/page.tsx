import { prisma } from "@/lib/prisma";
import { dbFetch } from "@/lib/db-fetch";
import { FALLBACK_PRIVACY } from "@/lib/fallback-data";
import { LegalPage } from "@/app/components/LegalPage";

export default async function PrivacyPage() {
  const page = await dbFetch(
    () =>
      prisma.privacyPage.findUnique({
        where: { id: 1 },
        include: { sections: { orderBy: { order: "asc" } } },
      }),
    FALLBACK_PRIVACY,
  );

  return (
    <LegalPage
      eyebrow={page?.eyebrow ?? "Legal"}
      title={page?.title ?? "Privacy Policy"}
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
            We may update this policy from time to time. Continued use of our
            website after changes constitutes acceptance.
          </p>
        </>
      }
    />
  );
}
