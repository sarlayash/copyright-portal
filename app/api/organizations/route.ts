import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const organizations = await prisma.organization.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(organizations);
}

export async function POST(request: Request) {
  const body = await request.json();

  const organization = await prisma.organization.create({
    data: {
      name: body.name,
      logo: body.logo,
    },
  });

  return NextResponse.json(organization);
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    await prisma.organization.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete organization.",
      },
      {
        status: 500,
      }
    );
  }
}