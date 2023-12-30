import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createMoleculeSchema = z.object({
  name: z.string().min(1).max(191),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createMoleculeSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const newMolecule = await prisma.molecule.create({
    data: { name: body.name },
  });

  return NextResponse.json(newMolecule, { status: 201 });
}
