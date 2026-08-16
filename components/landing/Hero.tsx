import Link from "next/link";
import {
  ShieldCheck,
  QrCode,
  Building2,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#050505] text-[#f7f4ec]">

      {/* Subtle gold atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-120px] top-[-160px] h-[520px] w-[520px] rounded-full bg-[#c9a227]/10 blur-[140px]" />
        <div className="absolute bottom-[-180px] left-[-120px] h-[420px] w-[420px] rounded-full bg-[#d4af37]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">

        {/* LEFT CONTENT */}
        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#c9a227]/40 bg-[#c9a227]/5 px-4 py-2 text-[10px] font-semibold tracking-[0.18em] text-[#d4af37]">
            <ShieldCheck size={15} strokeWidth={1.8} />
            SARLAYASH DIGITAL TRUST PLATFORM
          </div>

          <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#f7f4ec] sm:text-6xl lg:text-[4.25rem]">

            Digital Trust,

            <span className="block text-[#d4af37]">
              Built for the Future.
            </span>

          </h1>

          <div className="mt-6 h-px w-20 bg-[#c9a227]" />

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#b7b1a3]">
            Issue, verify and manage secure digital certificates,
            achievements, academic credentials and institutional
            records through QR-powered verification.
          </p>

          {/* ACTIONS */}
          <div className="mt-9 flex flex-wrap gap-3">

            <Link
              href="/verify"
              className="flex items-center gap-2 rounded-lg bg-[#c9a227] px-6 py-3.5 text-sm font-semibold text-[#050505] transition hover:bg-[#d4af37]"
            >
              Verify Certificate
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/admin/login"
              className="flex items-center gap-2 rounded-lg border border-[#c9a227]/50 bg-[#0b0b0b] px-6 py-3.5 text-sm font-semibold text-[#f7f4ec] transition hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              Staff Login
            </Link>

          </div>

          {/* TRUST PRINCIPLES */}
          <div className="mt-12 grid max-w-xl gap-5 sm:grid-cols-3">

            <div className="border-l border-[#c9a227]/40 pl-4">
              <ShieldCheck
                size={19}
                className="mb-2 text-[#d4af37]"
                strokeWidth={1.7}
              />

              <p className="text-sm font-semibold text-[#f7f4ec]">
                Trusted
              </p>

              <p className="mt-1 text-xs leading-5 text-[#8f8a80]">
                Verifiable digital credentials
              </p>
            </div>

            <div className="border-l border-[#c9a227]/40 pl-4">
              <QrCode
                size={19}
                className="mb-2 text-[#d4af37]"
                strokeWidth={1.7}
              />

              <p className="text-sm font-semibold text-[#f7f4ec]">
                QR Verified
              </p>

              <p className="mt-1 text-xs leading-5 text-[#8f8a80]">
                Instant certificate verification
              </p>
            </div>

            <div className="border-l border-[#c9a227]/40 pl-4">
              <Building2
                size={19}
                className="mb-2 text-[#d4af37]"
                strokeWidth={1.7}
              />

              <p className="text-sm font-semibold text-[#f7f4ec]">
                Institutional
              </p>

              <p className="mt-1 text-xs leading-5 text-[#8f8a80]">
                Built for organizations
              </p>
            </div>

          </div>

        </div>

        {/* CERTIFICATE PREVIEW */}
        <div className="flex justify-center lg:justify-end">

          <div className="w-full max-w-[470px]">

            <div className="mb-3 flex items-center justify-between px-1">

              <span className="text-[10px] tracking-[0.28em] text-[#8f8a80]">
                DIGITAL CREDENTIAL
              </span>

              <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] text-[#d4af37]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                VERIFIED
              </span>

            </div>

            <div className="overflow-hidden rounded-2xl border border-[#c9a227]/30 bg-[#f7f4ec] text-[#111111] shadow-[0_30px_100px_rgba(0,0,0,0.5)]">

              {/* CERTIFICATE HEADER */}
              <div className="border-b border-[#c9a227]/30 bg-[#0b0b0b] px-7 py-6 text-[#f7f4ec]">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-[10px] tracking-[0.35em] text-[#d4af37]">
                      SARLAYASH
                    </p>

                    <h2 className="mt-2 text-xl font-semibold">
                      Verified Digital Certificate
                    </h2>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a227]/40 bg-[#c9a227]/10">
                    <BadgeCheck
                      size={23}
                      className="text-[#d4af37]"
                      strokeWidth={1.8}
                    />
                  </div>

                </div>

              </div>

              {/* CERTIFICATE BODY */}
              <div className="p-7">

                <div className="grid gap-6 sm:grid-cols-2">

                  <div>
                    <p className="text-[10px] tracking-[0.18em] text-[#777267]">
                      RECIPIENT
                    </p>

                    <p className="mt-1 font-semibold">
                      Riya Sharma
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] tracking-[0.18em] text-[#777267]">
                      CREDENTIAL
                    </p>

                    <p className="mt-1 font-semibold">
                      Artificial Intelligence Bootcamp
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] tracking-[0.18em] text-[#777267]">
                      CERTIFICATE ID
                    </p>

                    <p className="mt-1 font-mono text-sm">
                      SY-DTP-2026-000001
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] tracking-[0.18em] text-[#777267]">
                      STATUS
                    </p>

                    <p className="mt-1 font-semibold text-[#8a6d12]">
                      Verified
                    </p>
                  </div>

                </div>

                {/* VERIFICATION */}
                <div className="mt-7 rounded-xl border border-[#d8d1c0] bg-white p-5">

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <p className="text-sm font-semibold">
                        Verification Status
                      </p>

                      <p className="mt-1 text-xs text-[#777267]">
                        Scan the QR code to verify this credential.
                      </p>

                    </div>

                    <span className="shrink-0 rounded-full border border-[#c9a227]/40 bg-[#c9a227]/10 px-3 py-1 text-[10px] font-bold tracking-wider text-[#8a6d12]">
                      VERIFIED
                    </span>

                  </div>

                  <div className="mt-5 flex justify-center rounded-lg border border-dashed border-[#c9a227]/40 bg-[#faf8f2] p-7">

                    <QrCode
                      size={112}
                      strokeWidth={1.4}
                      className="text-[#171717]"
                    />

                  </div>

                </div>

                {/* CERTIFICATE FOOTER */}
                <div className="mt-6 flex items-center justify-between border-t border-[#d8d1c0] pt-5">

                  <span className="text-[9px] tracking-[0.22em] text-[#777267]">
                    DIGITAL TRUST PLATFORM
                  </span>

                  <span className="text-[9px] font-semibold tracking-[0.16em] text-[#8a6d12]">
                    SARLAYASH
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}