import { prisma } from "@/lib/prisma";
import { dbFetch } from "@/lib/db-fetch";
import { FALLBACK_CONTACT_PAGE, FALLBACK_SERVICES } from "@/lib/fallback-data";
import ContactClient from "./ContactClient";

const FALLBACK_ENGAGEMENT_TYPES = [
  "Retained advisory",
  "Project-based engagement",
  "Exploratory conversation",
  "Not sure yet",
];

export default async function ContactPage() {
  const [content, services] = await Promise.all([
    dbFetch(
      () => prisma.contactPageContent.findUnique({ where: { id: 1 } }),
      FALLBACK_CONTACT_PAGE,
    ),
    dbFetch(
      () => prisma.service.findMany({ orderBy: { order: "asc" } }),
      FALLBACK_SERVICES,
    ),
  ]);

  const c = content ?? FALLBACK_CONTACT_PAGE;

  return (
    <ContactClient
      services={services}
      content={{
        heroEyebrow: c.heroEyebrow ?? "Contact",
        heroTitle: c.heroTitle ?? "Tell us what you are working on.",
        heroSubtitle: c.heroSubtitle ?? "",
        detailsEyebrow: c.detailsEyebrow ?? "Direct",
        email: c.email ?? "info@tehgaconsulting.com",
        officesLabel: c.officesLabel ?? "Offices",
        officesText: c.officesText ?? "Lagos · Nairobi\nLondon",
        officesNote: c.officesNote ?? "",
        expectEyebrow: c.expectEyebrow ?? "What to expect",
        expectStep1: c.expectStep1 ?? "",
        expectStep2: c.expectStep2 ?? "",
        expectStep3: c.expectStep3 ?? "",
        confirmTitle: c.confirmTitle ?? "We have received your brief.",
        confirmBody: c.confirmBody ?? "",
        confirmReset: c.confirmReset ?? "Submit another enquiry",
        engagementTypes:
          (c as any).engagementTypes ?? FALLBACK_ENGAGEMENT_TYPES,
      }}
    />
  );
}
