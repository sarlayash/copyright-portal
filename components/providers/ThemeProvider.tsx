"use client";

import { ReactNode, useEffect, useState } from "react";

export default function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("sarlayash-theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      document.documentElement.classList.toggle(
        "dark",
        prefersDark
      );
    }

    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#f7f4ec] dark:bg-[#050505]" />
    );
  }

  return <>{children}</>;
}