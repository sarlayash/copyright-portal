import Link from "next/link";
import {
  ShieldCheck,
  QrCode,
  Building2,
  BadgeCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.25),transparent_40%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">

            <Sparkles size={16} />

            DIGITAL TRUST PLATFORM

          </div>

          <h1 className="mt-8 text-5xl font-black leading-tight lg:text-7xl">

            Build

            <span className="block text-blue-400">

              Digital Trust

            </span>

          </h1>

          <p className="mt-8 max-w-xl text-xl leading-9 text-slate-300">

            COPYRIGHT PORTAL enables organizations to issue,
            verify and manage trusted digital certificates,
            copyright acknowledgements and secure credentials.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold shadow-xl transition hover:bg-blue-700"
            >
              Launch Dashboard

              <ArrowRight size={18} />

            </Link>

            <Link
              href="/verify"
              className="rounded-xl border border-slate-700 px-7 py-4 font-semibold transition hover:border-blue-500"
            >
              Verify Certificate
            </Link>

          </div>

          <div className="mt-14 flex flex-wrap gap-8 text-sm text-slate-300">

            <div className="flex items-center gap-2">

              <ShieldCheck className="text-green-400" size={18} />

              Enterprise Security

            </div>

            <div className="flex items-center gap-2">

              <QrCode className="text-blue-400" size={18} />

              QR Verification

            </div>

            <div className="flex items-center gap-2">

              <Building2 className="text-orange-400" size={18} />

              Multi Organization

            </div>

          </div>

        </div>

        <div className="flex items-center justify-center">

          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-white p-8 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,.45)]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-[0.3em] text-blue-600">

                  COPYRIGHT PORTAL

                </p>

                <h3 className="mt-2 text-2xl font-bold">

                  Digital Credential

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

                  Credential

                </p>

                <p className="font-semibold">

                  Copyright Excellence Award

                </p>

              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-slate-500">

                  Certificate ID

                </p>

                <p className="font-mono">

                  DTP-2026-000001

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

              <div className="mt-5 flex items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-8">

                <QrCode size={70} className="text-slate-700" />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}