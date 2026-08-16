"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid username or password.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError(
        "Unable to connect to the authentication server."
      );
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 py-12">
      <div className="w-full max-w-md">
        <form
          onSubmit={login}
          className="rounded-2xl border border-[#c9a227]/30 bg-[#0b0b0b] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#c9a227]/50 bg-[#111111] text-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.10)]">
              <ShieldCheck
                size={28}
                strokeWidth={1.7}
              />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-[#f7f4ec]">
              Staff Login
            </h1>

            <p className="mt-2 text-sm text-[#aaa398]">
              SarlaYash Digital Trust Platform
            </p>

            <div className="mx-auto mt-5 h-px w-16 bg-[#c9a227]/60" />
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-400/30 bg-red-950/30 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-[#d9d3c7]"
            >
              Username
            </label>

            <input
              id="username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter staff username"
              autoComplete="username"
              className="w-full rounded-lg border border-[#c9a227]/20 bg-[#111111] p-3 text-[#f7f4ec] placeholder:text-[#777268] outline-none transition focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/10"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#d9d3c7]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter staff password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-[#c9a227]/20 bg-[#111111] p-3 text-[#f7f4ec] placeholder:text-[#777268] outline-none transition focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/10"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg border border-[#c9a227] bg-[#c9a227] p-3 font-semibold tracking-wide text-[#050505] transition hover:bg-[#d4af37] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="mt-6 text-center text-[11px] tracking-wide text-[#777268]">
            AUTHORIZED STAFF ACCESS ONLY
          </p>
        </form>
      </div>
    </main>
  );
}