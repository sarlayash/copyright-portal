import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function PUT(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Organization ID is required." },
        { status: 400 }
      );
    }

    const organization = await prisma.organization.update({
      where: {
        id: body.id,
      },
      data: {
        logo: body.logo,
      },
    });

    return NextResponse.json(organization);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.error(error);

    return NextResponse.json(
      { error: "Failed to update logo." },
      { status: 500 }
    );
  }
}