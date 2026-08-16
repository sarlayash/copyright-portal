import { NextResponse } from "next/server";
import { createSession, getSessionCookieName } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const username = String(body.username || "");
    const password = String(body.password || "");

    const expectedUsername = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedUsername || !expectedPassword) {
      return NextResponse.json(
        {
          error: "Authentication is not configured on the server.",
        },
        { status: 500 }
      );
    }

    if (
      username !== expectedUsername ||
      password !== expectedPassword
    ) {
      return NextResponse.json(
        {
          error: "Invalid username or password.",
        },
        { status: 401 }
      );
    }

    const session = createSession(username);

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set({
      name: getSessionCookieName(),
      value: session,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Login failed.",
      },
      { status: 500 }
    );
  }
}