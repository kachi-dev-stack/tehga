import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { z } from "zod";

const Schema = z.object({
  client: z.string().min(1),
  sector: z.string().min(1),
  region: z.string().min(1),
  body: z.string().min(1),
  outcome: z.string().min(1),
  order: z.number().optional(),
});

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  return NextResponse.json(
    await prisma.caseStudy.findMany({ orderBy: { order: "asc" } }),
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
  const record = await prisma.caseStudy.create({ data: parsed.data });
  return NextResponse.json(record, { status: 201 });
}
