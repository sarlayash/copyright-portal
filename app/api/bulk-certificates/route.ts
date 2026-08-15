import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateQRCode } from "@/lib/qr";

export async function POST(request: Request) {
  try {
    const rows = await request.json();

    let inserted = 0;

    for (const row of rows) {
      const certificateId = `CERT-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;

      const verifyUrl = `http://localhost:3000/verify/${certificateId}`;

      const qrCode = await generateQRCode(verifyUrl);

      await prisma.certificate.create({
        data: {
          certificateId,
          recipient: row.recipient,
          title: row.title,
          issuer: row.issuer,
          qrCode,
          status: "VERIFIED",
        },
      });

      inserted++;
    }

    return NextResponse.json({
      success: true,
      inserted,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to issue certificates.",
      },
      {
        status: 500,
      }
    );
  }
}