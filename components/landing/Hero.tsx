import Link from "next/link";
import {
  ShieldCheck,
  QrCode,
  Building2,
  BadgeCheck,
  Sparkles,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,.20),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,.18),transparent_40%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2">

        {/* LEFT */}

        <div className="flex flex-col justify-center">

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">

            <Sparkles size={16} />

            SARLAYASH DIGITAL TRUST PLATFORM

          </div>

          <h1 className="mt-8 text-5xl font-black leading-tight lg:text-7xl">

            Secure

            <span className="block text-emerald-400">

              Digital Credentials

            </span>

          </h1>

          <p className="mt-3 text-lg font-medium text-emerald-300">
            Legacy of Values • Future of Learning
          </p>

          <p className="mt-8 max-w-xl text-xl leading-9 text-slate-300">

            Issue, verify and manage secure digital certificates,
            achievements, academic credentials and institutional
            records through QR-powered verification trusted by
            organizations.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/verify"
              className="rounded-xl bg-emerald-600 px-7 py-4 font-semibold shadow-xl transition hover:bg-emerald-700"
            >
              Verify Certificate
            </Link>

            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-xl border border-slate-700 px-7 py-4 font-semibold transition hover:border-emerald-500"
            >
              Admin Portal

              <ArrowRight size={18} />

            </Link>

          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <div className="flex items-center gap-2 text-sm text-slate-300">

              <ShieldCheck
                className="text-emerald-400"
                size={18}
              />

              Enterprise Security

            </div>

            <div className="flex items-center gap-2 text-sm text-slate-300">

              <QrCode
                className="text-blue-400"
                size={18}
              />

              QR Verification

            </div>

            <div className="flex items-center gap-2 text-sm text-slate-300">

              <Building2
                className="text-orange-400"
                size={18}
              />

              Multi Organization

            </div>

            <div className="flex items-center gap-2 text-sm text-slate-300">

              <GraduationCap
                className="text-pink-400"
                size={18}
              />

              Academic Credentials

            </div>

            <div className="flex items-center gap-2 text-sm text-slate-300">

              <BadgeCheck
                className="text-yellow-400"
                size={18}
              />

              Trusted Verification

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center justify-center">

          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-white p-8 text-slate-900 shadow-[0_35px_90px_rgba(0,0,0,.45)]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">

                  SARLAYASH

                </p>

                <h3 className="mt-2 text-2xl font-bold">

                  Verified Digital Certificate

                </h3>

              </div>

              <div className="rounded-full bg-green-100 p-3">

                <BadgeCheck className="text-green-600" />

              </div>

            </div>

            <div className="mt-8 space-y-5">

              <div>

                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Recipient
                </p>

                <p className="font-semibold">
                  Riya Sharma
                </p>

              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Certificate
                </p>

                <p className="font-semibold">
                  Artificial Intelligence Bootcamp
                </p>

              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Certificate ID
                </p>

                <p className="font-mono">
                  SY-DTP-2026-000001
                </p>

              </div>

            </div>

            <div className="mt-10 rounded-2xl bg-slate-100 p-6">

              <div className="flex items-center justify-between">

                <span className="font-semibold">
                  Verification Status
                </span>

                <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-bold text-white">
                  VERIFIED
                </span>

              </div>

              <div className="mt-6 flex items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-8">

                <QrCode
                  size={80}
                  className="text-slate-700"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}