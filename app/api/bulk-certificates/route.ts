import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateQRCode } from "@/lib/qr";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const rows = await request.json();

    if (!Array.isArray(rows)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid certificate data.",
        },
        {
          status: 400,
        }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://digitaltrustplatform.vercel.app";

    let inserted = 0;

    for (const row of rows) {
      const certificateId = `CERT-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;

      const verifyUrl = `${baseUrl}/verify/${certificateId}`;

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
    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

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