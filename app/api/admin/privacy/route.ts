import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  return NextResponse.json(
    await prisma.privacyPage.findUnique({
      where: { id: 1 },
      include: { sections: { orderBy: { order: "asc" } } },
    }),
  );
}

export async function PUT(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { eyebrow, title, subtitle, sections } = await req.json();

  await prisma.privacyPage.upsert({
    where: { id: 1 },
    update: { eyebrow, title, subtitle },
    create: { id: 1, eyebrow, title, subtitle },
  });

  await prisma.privacySection.deleteMany({ where: { pageId: 1 } });
  if (sections?.length) {
    await prisma.privacySection.createMany({
      data: sections.map(
        (s: { title: string; body: string; order: number }) => ({
          ...s,
          pageId: 1,
        }),
      ),
    });
  }

  return NextResponse.json(
    await prisma.privacyPage.findUnique({
      where: { id: 1 },
      include: { sections: { orderBy: { order: "asc" } } },
    }),
  );
}
