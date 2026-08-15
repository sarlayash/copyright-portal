import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import QRCode from "qrcode";

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: {
        issuedAt: "desc",
      },
    });

    return NextResponse.json(certificates);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}