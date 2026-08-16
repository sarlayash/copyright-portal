"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Circle,
  Moon,
  Sun,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("sarlayash-theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      setDarkMode(prefersDark);
      document.documentElement.classList.toggle(
        "dark",
        prefersDark
      );
    }

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function toggleTheme() {
    const nextTheme = !darkMode;

    setDarkMode(nextTheme);

    document.documentElement.classList.toggle(
      "dark",
      nextTheme
    );

    localStorage.setItem(
      "sarlayash-theme",
      nextTheme ? "dark" : "light"
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#c9a227]/20 bg-[#050505]/95 backdrop-blur-xl">

      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-6 px-6">

        {/* Brand */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#c9a227]/50 bg-[#0b0b0b] text-[#d4af37] shadow-[0_0_24px_rgba(201,162,39,0.12)] transition group-hover:border-[#d4af37]">
            <ShieldCheck
              size={23}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h1 className="text-[15px] font-semibold tracking-wide text-[#f7f4ec]">
              SarlaYash Digital Trust Platform
            </h1>

            <p className="mt-0.5 text-[10px] tracking-[0.16em] text-[#b7b1a3]">
              LEGACY OF VALUES • FUTURE OF LEARNING
            </p>
          </div>
        </Link>

        {/* Public Navigation */}
        <nav className="hidden items-center gap-7 text-[13px] font-medium lg:flex">

          <Link
            href="/"
            className="text-[#e7e2d7] transition hover:text-[#d4af37]"
          >
            Home
          </Link>

          <Link
            href="/verify"
            className="text-[#e7e2d7] transition hover:text-[#d4af37]"
          >
            Verify Certificate
          </Link>

          <a
            href="https://sarlayash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#e7e2d7] transition hover:text-[#d4af37]"
          >
            SarlaYash
            <ExternalLink size={11} />
          </a>

          <a
            href="https://hackathons.sarlayash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e7e2d7] transition hover:text-[#d4af37]"
          >
            Hackathons
          </a>

          <a
            href="https://dawk.sarlayash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e7e2d7] transition hover:text-[#d4af37]"
          >
            DAWK
          </a>

          <a
            href="https://syaaas.sarlayash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e7e2d7] transition hover:text-[#d4af37]"
          >
            SYAAAS
          </a>

        </nav>

        {/* Right Controls */}
        <div className="flex shrink-0 items-center gap-3">

          {/* Live Status */}
          <div className="hidden rounded-lg border border-[#c9a227]/25 bg-[#0b0b0b] px-3 py-2 xl:block">

            <div className="flex items-center gap-2">

              <Circle
                size={8}
                className="fill-[#d4af37] text-[#d4af37]"
              />

              <span className="text-[11px] font-semibold tracking-[0.12em] text-[#d4af37]">
                LIVE
              </span>

            </div>

            <p className="mt-1 text-[10px] text-[#a8a294]">
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
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#c9a227]/25 bg-[#0b0b0b] text-[#d4af37] transition hover:border-[#d4af37] hover:bg-[#171717]"
              aria-label={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                darkMode
                  ? "Light Mode"
                  : "Dark Mode"
              }
            >
              {darkMode ? (
                <Sun
                  size={17}
                  strokeWidth={1.8}
                />
              ) : (
                <Moon
                  size={17}
                  strokeWidth={1.8}
                />
              )}
            </button>
          )}

          {/* Staff Login */}
          <Link
            href="/admin/login"
            className="rounded-lg border border-[#c9a227] bg-[#c9a227] px-4 py-2.5 text-[12px] font-semibold tracking-wide text-[#050505] transition hover:bg-[#d4af37]"
          >
            Staff Login
          </Link>

        </div>

      </div>
    </header>
  );
}