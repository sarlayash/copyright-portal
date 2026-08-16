import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    certificateId: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const { certificateId } = await params;

    const certificate = await prisma.certificate.findUnique({
      where: {
        certificateId,
      },
      select: {
        certificateId: true,
        recipient: true,
        title: true,
        issuer: true,
        issuedAt: true,
        status: true,

        organization: {
          select: {
            name: true,
            website: true,
            logo: true,
            signature: true,
            seal: true,
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json(
        {
          error: "Certificate not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(certificate);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to verify certificate.",
      },
      {
        status: 500,
      }
    );
  }
}