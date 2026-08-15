"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem("admin-auth");

    if (auth !== "true") {
      router.replace("/admin/login");
      return;
    }

    loadCertificates();
  }, [router]);

  async function loadCertificates() {
    const res = await fetch("/api/certificates");
    const data = await res.json();
    setCertificates(data);
  }

  function logout() {
    localStorage.removeItem("admin-auth");
    router.replace("/admin/login");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Digital Trust Platform
        </h1>

        <div className="flex gap-3">
          <Link
            href="/admin/issue"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + Issue Certificate
          </Link>

          <Link
            href="/admin/admins"
            className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Admins
          </Link>

          <Link
            href="/admin/organizations"
            className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          >
            Organizations
          </Link>

          <Link
            href="/admin/bulk-upload"
            className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
          >
            Bulk Upload
          </Link>

          <button
            onClick={logout}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Total Certificates</p>
          <h2 className="text-4xl font-bold">
            {certificates.length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Verified</p>
          <h2 className="text-4xl font-bold text-green-600">
            {certificates.filter((c) => c.status === "VERIFIED").length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Issued</p>
          <h2 className="text-4xl font-bold text-blue-600">
            {certificates.length}
          </h2>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left">Certificate ID</th>
              <th className="p-4 text-left">Recipient</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {certificates.map((cert) => (
              <tr
                key={cert.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">{cert.certificateId}</td>
                <td className="p-4">{cert.recipient}</td>
                <td className="p-4">{cert.title}</td>
                <td className="p-4">
                  <span className="rounded bg-green-100 px-3 py-1 text-green-700">
                    {cert.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}