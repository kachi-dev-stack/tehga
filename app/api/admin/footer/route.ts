import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  return NextResponse.json(
    await prisma.footerContent.findUnique({ where: { id: 1 } }),
  );
}

export async function PUT(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const body = await req.json();
  const data = await prisma.footerContent.upsert({
    where: { id: 1 },
    update: body,
    create: { id: 1, ...body },
  });
  return NextResponse.json(data);
}
