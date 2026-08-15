import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">

        <Link href="/" className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-wide text-slate-900">
              COPYRIGHT PORTAL
            </h1>

            <p className="text-xs text-slate-500">
              SarlaYash Mission
            </p>
          </div>

        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
          <a href="#features" className="transition hover:text-blue-600">
            Features
          </a>

          <a href="#verify" className="transition hover:text-blue-600">
            Verification
          </a>

          <a href="#about" className="transition hover:text-blue-600">
            About
          </a>

          <a href="#contact" className="transition hover:text-blue-600">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">

          <Link
            href="/verify"
            className="hidden rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:border-blue-500 hover:text-blue-600 md:block"
          >
            Verify
          </Link>

          <Link
            href="/admin"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            Admin Login
          </Link>

        </div>

      </div>
    </header>
  );
}