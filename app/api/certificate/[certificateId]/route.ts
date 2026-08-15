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
  const { certificateId } = await params;

  const certificate = await prisma.certificate.findUnique({
    where: {
      certificateId,
    },
  });

  if (!certificate) {
    return NextResponse.json(
      { error: "Certificate not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(certificate);
}