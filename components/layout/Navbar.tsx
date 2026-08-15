"use client";

import Link from "next/link";
import { ShieldCheck, Circle, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              SarlaYash Digital Trust Platform
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Legacy of Values • Future of Learning
            </p>
          </div>
        </Link>

        {/* Public Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 dark:text-slate-300 lg:flex">

          <Link href="/" className="hover:text-emerald-600">
            Home
          </Link>

          <Link href="/verify" className="hover:text-emerald-600">
            Verify Certificate
          </Link>

          <a
            href="https://sarlayash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600"
          >
            SarlaYash
          </a>

          <a
            href="https://www.sarlayash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600"
          >
            SarlaYash Global
          </a>

          <a
            href="https://hackathons.sarlayash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600"
          >
            Hackathons
          </a>

          <a
            href="https://dawk.sarlayash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600"
          >
            DAWK
          </a>

          <a
            href="https://syaaas.sarlayash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600"
          >
            SYAAAS
          </a>

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Live Clock */}
          <div className="hidden rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 dark:border-emerald-900 dark:bg-emerald-950/30 lg:block">

            <div className="flex items-center gap-2">
              <Circle
                size={10}
                className="fill-emerald-500 text-emerald-500"
              />

              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                LIVE
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              {now.toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "medium",
                timeZone: "Asia/Kolkata",
              })}
            </p>

          </div>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="rounded-lg border border-slate-300 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              aria-label="Toggle Theme"
              title={isDark ? "Light Mode" : "Dark Mode"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          {/* Verify */}
          <Link
            href="/verify"
            className="hidden rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300 md:block"
          >
            Verify
          </Link>

          {/* Staff Login */}
          <Link
            href="/admin"
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
          >
            Staff Login
          </Link>

        </div>

      </div>
    </header>
  );
}