import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const admins = await prisma.admin.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(admins);
}

export async function POST(request: Request) {
  const body = await request.json();

  const admin = await prisma.admin.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
      role: "ADMIN",
    },
  });

  return NextResponse.json(admin);
}