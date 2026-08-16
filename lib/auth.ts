import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "sarlayash-admin-session";

function getSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is not configured.");
  }

  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSecret())
    .update(value)
    .digest("hex");
}

export function createSession(username: string) {
  const payload = Buffer.from(
    JSON.stringify({
      username,
      role: "ADMIN",
      createdAt: Date.now(),
    })
  ).toString("base64url");

  const signature = sign(payload);

  return `${payload}.${signature}`;
}

export function verifySession(token: string | undefined) {
  if (!token) {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [payload, signature] = parts;

  try {
    const expected = sign(payload);

    const a = Buffer.from(signature);
    const b = Buffer.from(expected);

    if (a.length !== b.length) {
      return null;
    }

    if (!timingSafeEqual(a, b)) {
      return null;
    }

    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    if (!decoded.username || decoded.role !== "ADMIN") {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  return verifySession(token);
}

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}

export function getSessionCookieName() {
  return COOKIE_NAME;
}