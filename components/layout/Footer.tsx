import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#c9a227]/20 bg-[#050505] text-[#f7f4ec]">

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#c9a227]/40 bg-[#0b0b0b] text-[#d4af37]">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  SarlaYash Digital Trust Platform
                </h3>

                <p className="mt-1 text-[10px] tracking-[0.16em] text-[#8f8a80]">
                  POWERED BY KAPIL
                </p>
              </div>

            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-[#8f8a80]">
              A digital platform for issuing, managing and verifying
              trusted credentials and certificates.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.18em] text-[#d4af37]">
              PLATFORM
            </h4>

            <div className="mt-5 space-y-3 text-sm">

              <Link
                href="/"
                className="block text-[#b7b1a3] transition hover:text-[#d4af37]"
              >
                Home
              </Link>

              <Link
                href="/verify"
                className="block text-[#b7b1a3] transition hover:text-[#d4af37]"
              >
                Verify Certificate
              </Link>

              <Link
                href="/admin/login"
                className="block text-[#b7b1a3] transition hover:text-[#d4af37]"
              >
                Staff Login
              </Link>

            </div>
          </div>

          {/* SarlaYash */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.18em] text-[#d4af37]">
              SARLAYASH
            </h4>

            <div className="mt-5 space-y-3 text-sm">

              <a
                href="https://sarlayash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#b7b1a3] transition hover:text-[#d4af37]"
              >
                sarlayash.com
                <ExternalLink size={12} />
              </a>

              <a
                href="https://www.sarlayash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#b7b1a3] transition hover:text-[#d4af37]"
              >
                www.sarlayash.com
                <ExternalLink size={12} />
              </a>

              <a
                href="https://hackathons.sarlayash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b7b1a3] transition hover:text-[#d4af37]"
              >
                Hackathons
              </a>

              <a
                href="https://dawk.sarlayash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b7b1a3] transition hover:text-[#d4af37]"
              >
                DAWK
              </a>

              <a
                href="https://syaaas.sarlayash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b7b1a3] transition hover:text-[#d4af37]"
              >
                SYAAAS
              </a>

            </div>
          </div>

        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#c9a227]/15 pt-6 text-xs text-[#777267] md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 SarlaYash Mission • Powered By Kapil
          </p>

          <p>
            Digital Trust Platform
          </p>

        </div>

      </div>
    </footer>
  );
}