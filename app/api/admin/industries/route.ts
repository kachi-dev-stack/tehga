import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { z } from "zod";

const Schema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().optional(),
});

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  return NextResponse.json(
    await prisma.industry.findMany({ orderBy: { order: "asc" } }),
  );
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const parsed = Schema.safeParse(await req.json());
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  const record = await prisma.industry.create({ data: parsed.data });
  return NextResponse.json(record, { status: 201 });
}
