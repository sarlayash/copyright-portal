import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const organization = await prisma.organization.update({
      where: {
        id: body.id,
      },
      data: {
        logo: body.logo,
        signature: body.signature,
        seal: body.seal,
      },
    });

    return NextResponse.json(organization);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update organization branding." },
      { status: 500 }
    );
  }
}