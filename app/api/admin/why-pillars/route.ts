import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  return NextResponse.json(
    await prisma.whyPillar.findMany({ orderBy: { order: "asc" } }),
  );
}

export async function PUT(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const items = await req.json();
  await prisma.whyPillar.deleteMany();
  await prisma.whyPillar.createMany({ data: items });
  return NextResponse.json({ success: true });
}
