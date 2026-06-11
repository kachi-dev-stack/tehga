import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  const body = await req.json();
  const { id: _ignore, updatedAt, ...data } = body;
  const record = await prisma.caseStudy.update({
    where: { id: Number(id) },
    data,
  });
  return NextResponse.json(record);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  await prisma.caseStudy.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
