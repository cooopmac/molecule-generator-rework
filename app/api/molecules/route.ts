import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createMoleculeSchema = z.object({
  name: z.string().min(1).max(191),
  file: z.string().min(0).max(1024),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  const validation = createMoleculeSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const parsedSDF = parseSDF(body.file);
  console.log(parsedSDF);
  const transaction = await prisma.$transaction(async (prisma) => {
    const newMolecule = await prisma.molecule.create({
      data: {
        name: body.name,
        science: parsedSDF.scienceName,
        atomCount: parsedSDF.atomCount,
        bondCount: parsedSDF.bondCount,
      },
    });
    for (const atom of parsedSDF.atoms) {
      await prisma.atom.create({
        data: {
          x: atom.x,
          y: atom.y,
          z: atom.z,
          element: atom.element,
          moleculeId: newMolecule.id, // Linking atom to the molecule
        },
      });
    }
    for (const bond of parsedSDF.bonds) {
      await prisma.bond.create({
        data: {
          a1: bond.a1,
          a2: bond.a2,
          moleculeId: newMolecule.id, // Linking bond to the molecule
        },
      });
    }
    return newMolecule;
  });

  return NextResponse.json(transaction, { status: 201 });
}

export async function GET(request: NextRequest) {
  navigator;
  const molecules = await prisma.molecule.findMany();
  return NextResponse.json(molecules, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const url = request.nextUrl;
  const id = url.searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ error: "No ID provided" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const numericId = parseInt(id);
  const deleteMolecule = await prisma.molecule.delete({
    where: {
      id: numericId,
    },
  });
  return NextResponse.json(deleteMolecule, { status: 201 });
}

function parseSDF(string: String) {
  const lines = string.trim().split("\n");
  const scienceName = lines[0];
  const counts = lines[3].trim().split(/\s+/);
  const atomCount = parseInt(counts[0]);
  const bondCount = parseInt(counts[1]);

  let atoms = [];
  let bonds = [];

  for (let i = 0; i < atomCount; i++) {
    const atomSpecs = lines[i + 4].trim().split(/\s+/);
    atoms.push({
      x: parseFloat(atomSpecs[0]),
      y: parseFloat(atomSpecs[1]),
      z: parseFloat(atomSpecs[2]),
      element: atomSpecs[3],
    });
  }

  for (let i = 0; i < bondCount; i++) {
    const bondSpecs = lines[i + 4 + atomCount].trim().split(/\s+/);
    bonds.push({
      a1: parseInt(bondSpecs[0]),
      a2: parseInt(bondSpecs[1]),
    });
  }
  return { atomCount, bondCount, atoms, bonds, scienceName };
}
