"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Award,
  Building2,
  FilePlus2,
  LogOut,
  ShieldCheck,
  Upload,
  Users,
} from "lucide-react";

type Certificate = {
  id: string;
  certificateId: string;
  recipient: string;
  title: string;
  status: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        if (!response.ok) {
          router.replace("/admin/login");
          return;
        }

        await loadCertificates();
      } catch (error) {
        console.error(error);
        router.replace("/admin/login");
      }
    }

    checkAuthentication();
  }, [router]);

  async function loadCertificates() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/certificates", {
        cache: "no-store",
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok || !Array.isArray(data)) {
        setCertificates([]);
        setError("Unable to load certificate records.");
        return;
      }

      setCertificates(data);
    } catch (error) {
      console.error(error);
      setCertificates([]);
      setError("Unable to connect to the certificate service.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error(error);
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  const verifiedCount = certificates.filter(
    (certificate) => certificate.status === "VERIFIED"
  ).length;

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#f7f4ec]">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#c9a227]/40 bg-[#0b0b0b] text-[#d4af37] shadow-[0_0_25px_rgba(201,162,39,0.08)]">
              <ShieldCheck size={24} />
            </div>

            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-[#d4af37]">
                SARLAYASH DIGITAL TRUST PLATFORM
              </p>

              <h1 className="mt-1 text-2xl font-semibold text-[#f7f4ec]">
                Administration Console
              </h1>

              <p className="mt-1 text-sm text-[#8f8a80]">
                Secure certificate and organization management.
              </p>
            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">

            <Link
              href="/admin/issue"
              className="flex items-center gap-2 rounded-lg bg-[#c9a227] px-4 py-2.5 text-sm font-semibold text-[#050505] transition hover:bg-[#d4af37]"
            >
              <FilePlus2 size={16} />
              Issue Certificate
            </Link>

            <Link
              href="/admin/admins"
              className="flex items-center gap-2 rounded-lg border border-[#c9a227]/30 bg-[#0b0b0b] px-4 py-2.5 text-sm font-medium text-[#d4af37] transition hover:border-[#c9a227] hover:bg-[#11100d]"
            >
              <Users size={16} />
              Admins
            </Link>

            <Link
              href="/admin/organizations"
              className="flex items-center gap-2 rounded-lg border border-[#c9a227]/30 bg-[#0b0b0b] px-4 py-2.5 text-sm font-medium text-[#d4af37] transition hover:border-[#c9a227] hover:bg-[#11100d]"
            >
              <Building2 size={16} />
              Organizations
            </Link>

            <Link
              href="/admin/bulk-upload"
              className="flex items-center gap-2 rounded-lg border border-[#c9a227]/30 bg-[#0b0b0b] px-4 py-2.5 text-sm font-medium text-[#d4af37] transition hover:border-[#c9a227] hover:bg-[#11100d]"
            >
              <Upload size={16} />
              Bulk Upload
            </Link>

            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 rounded-lg border border-red-900/50 bg-red-950/20 px-4 py-2.5 text-sm font-medium text-red-300 transition hover:border-red-700 hover:bg-red-950/40"
            >
              <LogOut size={16} />
              Logout
            </button>

          </div>
        </div>

        {/* Security status */}
        <div className="mb-8 flex items-center gap-3 rounded-xl border border-[#c9a227]/20 bg-[#0b0b0b] px-5 py-4">

          <div className="h-2.5 w-2.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.6)]" />

          <div>
            <p className="text-sm font-semibold text-[#f7f4ec]">
              Staff session active
            </p>

            <p className="text-xs text-[#8f8a80]">
              Administrative operations are restricted to authenticated staff.
            </p>
          </div>

        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-[#c9a227]/20 bg-[#0b0b0b] p-6">

            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#8f8a80]">
                TOTAL CERTIFICATES
              </p>

              <Award size={20} className="text-[#d4af37]" />
            </div>

            <p className="text-4xl font-semibold text-[#f7f4ec]">
              {loading ? "—" : certificates.length}
            </p>

            <p className="mt-2 text-xs text-[#625e56]">
              Certificate records
            </p>

          </div>

          <div className="rounded-2xl border border-[#c9a227]/20 bg-[#0b0b0b] p-6">

            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#8f8a80]">
                VERIFIED
              </p>

              <ShieldCheck size={20} className="text-[#d4af37]" />
            </div>

            <p className="text-4xl font-semibold text-[#d4af37]">
              {loading ? "—" : verifiedCount}
            </p>

            <p className="mt-2 text-xs text-[#625e56]">
              Active verified credentials
            </p>

          </div>

          <div className="rounded-2xl border border-[#c9a227]/20 bg-[#0b0b0b] p-6">

            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#8f8a80]">
                ISSUED
              </p>

              <FilePlus2 size={20} className="text-[#d4af37]" />
            </div>

            <p className="text-4xl font-semibold text-[#f7f4ec]">
              {loading ? "—" : certificates.length}
            </p>

            <p className="mt-2 text-xs text-[#625e56]">
              Credentials issued
            </p>

          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-900/50 bg-red-950/20 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Certificate Registry */}
        <section className="overflow-hidden rounded-2xl border border-[#c9a227]/20 bg-[#0b0b0b]">

          <div className="border-b border-[#34312b] px-6 py-5">

            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#d4af37]">
              CERTIFICATE REGISTRY
            </p>

            <h2 className="mt-1 text-xl font-semibold text-[#f7f4ec]">
              Issued Certificates
            </h2>

          </div>

          {loading ? (
            <div className="p-10 text-center text-sm text-[#8f8a80]">
              Loading certificate records...
            </div>
          ) : certificates.length === 0 ? (
            <div className="p-10 text-center text-sm text-[#8f8a80]">
              No certificate records available.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[760px]">

                <thead>
                  <tr className="border-b border-[#34312b] bg-[#080808]">

                    <th className="px-6 py-4 text-left text-[11px] font-semibold tracking-[0.12em] text-[#8f8a80]">
                      CERTIFICATE ID
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-semibold tracking-[0.12em] text-[#8f8a80]">
                      RECIPIENT
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-semibold tracking-[0.12em] text-[#8f8a80]">
                      TITLE
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-semibold tracking-[0.12em] text-[#8f8a80]">
                      STATUS
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {certificates.map((certificate) => (
                    <tr
                      key={certificate.id}
                      className="border-b border-[#24221e] transition hover:bg-[#11100d]"
                    >

                      <td className="px-6 py-4 font-mono text-xs text-[#d4af37]">
                        {certificate.certificateId}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#e7e2d7]">
                        {certificate.recipient}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#b7b1a3]">
                        {certificate.title}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={
                            certificate.status === "VERIFIED"
                              ? "inline-flex rounded-full border border-emerald-500/20 bg-emerald-950/30 px-3 py-1 text-xs font-semibold text-emerald-400"
                              : "inline-flex rounded-full border border-[#c9a227]/20 bg-[#11100d] px-3 py-1 text-xs font-semibold text-[#d4af37]"
                          }
                        >
                          {certificate.status}
                        </span>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </div>
    </main>
  );
}