import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import QRCode from "qrcode";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();

    const certificates = await prisma.certificate.findMany({
      orderBy: {
        issuedAt: "desc",
      },
    });

    return NextResponse.json(certificates);
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
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    const certificateId = `DTP-${Date.now()}`;

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://digitaltrustplatform.vercel.app";

    const verifyUrl = `${baseUrl}/verify/${certificateId}`;

    const qrCode = await QRCode.toDataURL(verifyUrl);

    const certificate = await prisma.certificate.create({
      data: {
        certificateId,
        recipient: body.recipient,
        title: body.title,
        issuer: body.issuer,
        qrCode,
      },
    });

    return NextResponse.json(certificate);
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
      { error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}